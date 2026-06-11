-- Add image_url column to announcements table for promotional images
ALTER TABLE public.announcements 
ADD COLUMN image_url text;

-- Add comment for documentation
COMMENT ON COLUMN public.announcements.image_url IS 'URL of the promotional image for the announcement';