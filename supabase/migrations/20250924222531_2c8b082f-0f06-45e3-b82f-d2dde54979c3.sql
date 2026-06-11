-- Grant superadmin access to agriverseph@gmail.com
DO $$
DECLARE
    target_user_id uuid;
BEGIN
    -- Check if user with email agriverseph@gmail.com exists in profiles
    SELECT id INTO target_user_id 
    FROM public.profiles 
    WHERE email = 'agriverseph@gmail.com';
    
    IF target_user_id IS NOT NULL THEN
        -- User exists, remove any existing roles and add superadmin
        DELETE FROM public.user_roles WHERE user_id = target_user_id;
        INSERT INTO public.user_roles (user_id, role) 
        VALUES (target_user_id, 'superadmin');
        
        RAISE NOTICE 'Superadmin role granted to existing user: agriverseph@gmail.com';
    ELSE
        RAISE NOTICE 'User agriverseph@gmail.com not found. They will get superadmin role when they sign up.';
    END IF;
END $$;

-- Update the handle_new_user function to automatically assign superadmin to agriverseph@gmail.com
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert profile
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  
  -- Assign role based on email
  IF NEW.email = 'agriverseph@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'superadmin');
  ELSE
    -- Assign customer role by default for other users
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'customer');
  END IF;
  
  RETURN NEW;
END;
$$;