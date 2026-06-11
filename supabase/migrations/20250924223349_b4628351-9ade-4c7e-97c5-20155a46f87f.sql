-- Add sample products for each category
DO $$
DECLARE
    equipment_category_id uuid;
    fruits_category_id uuid;
    grains_category_id uuid;
    livestock_category_id uuid;
    others_category_id uuid;
    vegetables_category_id uuid;
    superadmin_user_id uuid;
BEGIN
    -- Get category IDs
    SELECT id INTO equipment_category_id FROM categories WHERE name = 'Equipment';
    SELECT id INTO fruits_category_id FROM categories WHERE name = 'Fruits';
    SELECT id INTO grains_category_id FROM categories WHERE name = 'Grains';
    SELECT id INTO livestock_category_id FROM categories WHERE name = 'Livestock';
    SELECT id INTO others_category_id FROM categories WHERE name = 'Others';
    SELECT id INTO vegetables_category_id FROM categories WHERE name = 'Vegetables';
    
    -- Get superadmin user ID
    SELECT id INTO superadmin_user_id FROM profiles WHERE email = 'agriverseph@gmail.com';
    
    -- Insert sample products for Equipment category
    INSERT INTO products (name, description, price, weight, stock_quantity, category_id, seller_id, status, is_available, approved_at, approved_by) VALUES
    ('Heavy Duty Tractor', 'Professional grade tractor suitable for large farming operations. Excellent condition with low hours.', 45000.00, 2500.00, 2, equipment_category_id, superadmin_user_id, 'approved', true, NOW(), superadmin_user_id),
    ('Irrigation System Set', 'Complete drip irrigation system including pipes, valves, and timers. Covers up to 5 acres.', 1200.00, 150.00, 5, equipment_category_id, superadmin_user_id, 'approved', true, NOW(), superadmin_user_id),
    ('Harvesting Tools Kit', 'Professional harvesting tools including sickles, pruning shears, and collection baskets.', 350.00, 25.00, 12, equipment_category_id, superadmin_user_id, 'approved', true, NOW(), superadmin_user_id);
    
    -- Insert sample products for Fruits category
    INSERT INTO products (name, description, price, weight, stock_quantity, category_id, seller_id, status, is_available, approved_at, approved_by) VALUES
    ('Fresh Organic Apples', 'Crisp and sweet organic apples from our mountain orchard. Perfect for snacking or baking.', 5.50, 1.00, 50, fruits_category_id, superadmin_user_id, 'approved', true, NOW(), superadmin_user_id),
    ('Premium Mangoes', 'Sweet and juicy mangoes harvested at peak ripeness. Rich in vitamins and absolutely delicious.', 8.75, 1.50, 30, fruits_category_id, superadmin_user_id, 'approved', true, NOW(), superadmin_user_id),
    ('Farm Fresh Strawberries', 'Locally grown strawberries, hand-picked daily. Perfect for desserts or eating fresh.', 12.00, 0.50, 25, fruits_category_id, superadmin_user_id, 'approved', true, NOW(), superadmin_user_id);
    
    -- Insert sample products for Grains category
    INSERT INTO products (name, description, price, weight, stock_quantity, category_id, seller_id, status, is_available, approved_at, approved_by) VALUES
    ('Premium Rice (50kg)', 'High-quality jasmine rice, perfect for daily meals. Grown using sustainable farming methods.', 45.00, 50.00, 100, grains_category_id, superadmin_user_id, 'approved', true, NOW(), superadmin_user_id),
    ('Organic Wheat (25kg)', 'Certified organic wheat flour, stone-ground for maximum nutrition and flavor.', 32.50, 25.00, 75, grains_category_id, superadmin_user_id, 'approved', true, NOW(), superadmin_user_id),
    ('Yellow Corn (20kg)', 'Premium yellow corn suitable for animal feed or processing. Non-GMO and pesticide-free.', 18.00, 20.00, 60, grains_category_id, superadmin_user_id, 'approved', true, NOW(), superadmin_user_id);
    
    -- Insert sample products for Livestock category
    INSERT INTO products (name, description, price, weight, stock_quantity, category_id, seller_id, status, is_available, approved_at, approved_by) VALUES
    ('Heritage Breed Chickens', 'Healthy heritage breed chickens, excellent for both eggs and meat production.', 25.00, 2.50, 20, livestock_category_id, superadmin_user_id, 'approved', true, NOW(), superadmin_user_id),
    ('Fresh Farm Eggs (dozen)', 'Free-range chicken eggs from pasture-raised hens. Rich and flavorful with bright orange yolks.', 6.50, 0.75, 40, livestock_category_id, superadmin_user_id, 'approved', true, NOW(), superadmin_user_id),
    ('Grass-Fed Beef (per lb)', 'Premium grass-fed beef from cattle raised on open pastures. No hormones or antibiotics.', 15.50, 1.00, 35, livestock_category_id, superadmin_user_id, 'approved', true, NOW(), superadmin_user_id);
    
    -- Insert sample products for Vegetables category
    INSERT INTO products (name, description, price, weight, stock_quantity, category_id, seller_id, status, is_available, approved_at, approved_by) VALUES
    ('Organic Tomatoes', 'Vine-ripened organic tomatoes with exceptional flavor. Perfect for salads and cooking.', 7.25, 1.00, 45, vegetables_category_id, superadmin_user_id, 'approved', true, NOW(), superadmin_user_id),
    ('Fresh Lettuce Mix', 'Mixed greens including romaine, spinach, and arugula. Harvested fresh daily.', 4.50, 0.25, 60, vegetables_category_id, superadmin_user_id, 'approved', true, NOW(), superadmin_user_id),
    ('Bell Pepper Variety Pack', 'Colorful mix of red, yellow, and green bell peppers. Crisp and sweet flavor.', 9.00, 1.25, 35, vegetables_category_id, superadmin_user_id, 'approved', true, NOW(), superadmin_user_id);
    
    -- Insert sample products for Others category
    INSERT INTO products (name, description, price, weight, stock_quantity, category_id, seller_id, status, is_available, approved_at, approved_by) VALUES
    ('Raw Honey (500ml)', 'Pure, unprocessed honey from local beehives. Rich flavor with natural crystallization.', 15.00, 0.60, 25, others_category_id, superadmin_user_id, 'approved', true, NOW(), superadmin_user_id),
    ('Organic Fertilizer (20kg)', 'Composted organic fertilizer made from farm waste. Excellent for soil improvement.', 22.00, 20.00, 30, others_category_id, superadmin_user_id, 'approved', true, NOW(), superadmin_user_id),
    ('Handmade Soap Set', 'Natural soaps made with farm-fresh goat milk and essential oils. Chemical-free and gentle.', 18.50, 0.30, 15, others_category_id, superadmin_user_id, 'approved', true, NOW(), superadmin_user_id);
    
    RAISE NOTICE 'Sample products added successfully to all categories!';
END $$;