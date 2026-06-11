-- Add sample images to products that match their names
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500&h=400&fit=crop' WHERE name = 'Heavy Duty Tractor';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=400&fit=crop' WHERE name = 'Irrigation System Set';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=400&fit=crop' WHERE name = 'Harvesting Tools Kit';

UPDATE products SET image_url = 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&h=400&fit=crop' WHERE name = 'Fresh Organic Apples';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&h=400&fit=crop' WHERE name = 'Premium Mangoes';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1464965911861-746a04b4beb6?w=500&h=400&fit=crop' WHERE name = 'Farm Fresh Strawberries';

UPDATE products SET image_url = 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=400&fit=crop' WHERE name = 'Premium Rice (50kg)';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&h=400&fit=crop' WHERE name = 'Organic Wheat (25kg)';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=500&h=400&fit=crop' WHERE name = 'Yellow Corn (20kg)';

UPDATE products SET image_url = 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=500&h=400&fit=crop' WHERE name = 'Heritage Breed Chickens';

-- Add more sample products with unique images
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=500&h=400&fit=crop' WHERE name LIKE '%Dairy Cow%';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop' WHERE name LIKE '%Goat%';

UPDATE products SET image_url = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&h=400&fit=crop' WHERE name LIKE '%Tomato%';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1583297379440-2856a2a2b596?w=500&h=400&fit=crop' WHERE name LIKE '%Carrot%';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1609501676725-7186f73b5b04?w=500&h=400&fit=crop' WHERE name LIKE '%Potato%';

UPDATE products SET image_url = 'https://images.unsplash.com/photo-1605300840663-7823de3e3d82?w=500&h=400&fit=crop' WHERE name LIKE '%Fertilizer%';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=400&fit=crop' WHERE name LIKE '%Seed%';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1416736193302-e65b2ed2329a?w=500&h=400&fit=crop' WHERE name LIKE '%Tool%';