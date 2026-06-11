-- Fix RLS policy for products to allow superadmin and admin to insert products
DROP POLICY IF EXISTS "Sellers can insert products" ON public.products;

CREATE POLICY "Sellers and admins can insert products" 
ON public.products 
FOR INSERT 
WITH CHECK (
  (auth.uid() = seller_id AND has_role(auth.uid(), 'seller'::user_role))
  OR has_role(auth.uid(), 'superadmin'::user_role)
  OR has_role(auth.uid(), 'admin'::user_role)
);

-- Add DELETE policy for admins (was missing)
CREATE POLICY "Admins can delete products"
ON public.products
FOR DELETE
USING (
  has_role(auth.uid(), 'superadmin'::user_role) 
  OR has_role(auth.uid(), 'admin'::user_role)
);

-- Add foreign key constraint for seller_id to profiles for proper joins
ALTER TABLE public.products
DROP CONSTRAINT IF EXISTS products_seller_id_fkey;

ALTER TABLE public.products
ADD CONSTRAINT products_seller_id_fkey 
FOREIGN KEY (seller_id) REFERENCES public.profiles(id) ON DELETE SET NULL;