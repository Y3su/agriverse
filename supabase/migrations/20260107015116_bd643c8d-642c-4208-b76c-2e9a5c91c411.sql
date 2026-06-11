-- Create activity log action types enum
CREATE TYPE public.activity_action_type AS ENUM (
  'create',
  'update', 
  'delete',
  'purchase',
  'login',
  'logout',
  'role_change',
  'status_change'
);

-- Create activity log entity types enum
CREATE TYPE public.activity_entity_type AS ENUM (
  'product',
  'order',
  'user',
  'announcement',
  'category'
);

-- Create the activity_logs table
CREATE TABLE public.activity_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  action_type activity_action_type NOT NULL,
  entity_type activity_entity_type NOT NULL,
  entity_id UUID,
  entity_name TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_email TEXT,
  user_name TEXT,
  user_role TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Only superadmins can view activity logs
CREATE POLICY "Only superadmins can view activity logs"
ON public.activity_logs
FOR SELECT
USING (has_role(auth.uid(), 'superadmin'::user_role));

-- System can insert logs (using service role or triggers)
CREATE POLICY "System can insert activity logs"
ON public.activity_logs
FOR INSERT
WITH CHECK (true);

-- Create function to log activities
CREATE OR REPLACE FUNCTION public.log_activity(
  p_action_type activity_action_type,
  p_entity_type activity_entity_type,
  p_entity_id UUID DEFAULT NULL,
  p_entity_name TEXT DEFAULT NULL,
  p_metadata JSONB DEFAULT '{}'
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
  v_user_email TEXT;
  v_user_name TEXT;
  v_user_role TEXT;
  v_log_id UUID;
BEGIN
  -- Get current user info
  v_user_id := auth.uid();
  
  IF v_user_id IS NOT NULL THEN
    SELECT email, full_name INTO v_user_email, v_user_name
    FROM public.profiles
    WHERE id = v_user_id;
    
    SELECT role::TEXT INTO v_user_role
    FROM public.user_roles
    WHERE user_id = v_user_id
    LIMIT 1;
  END IF;

  INSERT INTO public.activity_logs (
    action_type,
    entity_type,
    entity_id,
    entity_name,
    user_id,
    user_email,
    user_name,
    user_role,
    metadata
  ) VALUES (
    p_action_type,
    p_entity_type,
    p_entity_id,
    p_entity_name,
    v_user_id,
    v_user_email,
    v_user_name,
    v_user_role,
    p_metadata
  )
  RETURNING id INTO v_log_id;

  RETURN v_log_id;
END;
$$;

-- Create trigger function for product changes
CREATE OR REPLACE FUNCTION public.log_product_changes()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_action activity_action_type;
  v_metadata JSONB;
BEGIN
  IF TG_OP = 'INSERT' THEN
    v_action := 'create';
    v_metadata := jsonb_build_object(
      'name', NEW.name,
      'price', NEW.price,
      'stock', NEW.stock_quantity,
      'status', NEW.status
    );
    PERFORM log_activity(v_action, 'product'::activity_entity_type, NEW.id, NEW.name, v_metadata);
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    -- Check if it's a status change
    IF OLD.status IS DISTINCT FROM NEW.status THEN
      v_action := 'status_change';
      v_metadata := jsonb_build_object(
        'old_status', OLD.status,
        'new_status', NEW.status,
        'name', NEW.name
      );
    ELSE
      v_action := 'update';
      v_metadata := jsonb_build_object(
        'name', NEW.name,
        'old_price', OLD.price,
        'new_price', NEW.price,
        'old_stock', OLD.stock_quantity,
        'new_stock', NEW.stock_quantity
      );
    END IF;
    PERFORM log_activity(v_action, 'product'::activity_entity_type, NEW.id, NEW.name, v_metadata);
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    v_action := 'delete';
    v_metadata := jsonb_build_object(
      'name', OLD.name,
      'price', OLD.price
    );
    PERFORM log_activity(v_action, 'product'::activity_entity_type, OLD.id, OLD.name, v_metadata);
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

-- Create trigger for products
CREATE TRIGGER on_product_change
AFTER INSERT OR UPDATE OR DELETE ON public.products
FOR EACH ROW EXECUTE FUNCTION public.log_product_changes();

-- Create trigger function for order changes
CREATE OR REPLACE FUNCTION public.log_order_changes()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_action activity_action_type;
  v_metadata JSONB;
  v_customer_name TEXT;
BEGIN
  -- Get customer name
  SELECT full_name INTO v_customer_name FROM public.profiles WHERE id = NEW.user_id;

  IF TG_OP = 'INSERT' THEN
    v_action := 'purchase';
    v_metadata := jsonb_build_object(
      'total_amount', NEW.total_amount,
      'status', NEW.status,
      'customer_name', v_customer_name,
      'shipping_address', NEW.shipping_address
    );
    PERFORM log_activity(v_action, 'order'::activity_entity_type, NEW.id, 'Order #' || LEFT(NEW.id::TEXT, 8), v_metadata);
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.status IS DISTINCT FROM NEW.status THEN
      v_action := 'status_change';
      v_metadata := jsonb_build_object(
        'old_status', OLD.status,
        'new_status', NEW.status,
        'customer_name', v_customer_name
      );
    ELSE
      v_action := 'update';
      v_metadata := jsonb_build_object(
        'total_amount', NEW.total_amount,
        'status', NEW.status
      );
    END IF;
    PERFORM log_activity(v_action, 'order'::activity_entity_type, NEW.id, 'Order #' || LEFT(NEW.id::TEXT, 8), v_metadata);
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$;

-- Create trigger for orders
CREATE TRIGGER on_order_change
AFTER INSERT OR UPDATE ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.log_order_changes();

-- Create trigger function for user role changes
CREATE OR REPLACE FUNCTION public.log_role_changes()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_metadata JSONB;
  v_user_email TEXT;
  v_user_name TEXT;
BEGIN
  -- Get affected user's info
  SELECT email, full_name INTO v_user_email, v_user_name
  FROM public.profiles
  WHERE id = NEW.user_id;

  IF TG_OP = 'UPDATE' AND OLD.role IS DISTINCT FROM NEW.role THEN
    v_metadata := jsonb_build_object(
      'old_role', OLD.role,
      'new_role', NEW.role,
      'affected_user_email', v_user_email,
      'affected_user_name', v_user_name
    );
    PERFORM log_activity('role_change'::activity_action_type, 'user'::activity_entity_type, NEW.user_id, v_user_name, v_metadata);
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger for user roles
CREATE TRIGGER on_role_change
AFTER UPDATE ON public.user_roles
FOR EACH ROW EXECUTE FUNCTION public.log_role_changes();

-- Create index for faster queries
CREATE INDEX idx_activity_logs_created_at ON public.activity_logs(created_at DESC);
CREATE INDEX idx_activity_logs_action_type ON public.activity_logs(action_type);
CREATE INDEX idx_activity_logs_entity_type ON public.activity_logs(entity_type);
CREATE INDEX idx_activity_logs_user_id ON public.activity_logs(user_id);