-- Insert sample inventory items
INSERT INTO inventory (name, sku, quantity, location, supplier, threshold, price, expiry_date, category, temperature, unit) VALUES
('Fresh Milk', 'DY-001', 5, 'Cold Storage A', 'Local Dairy Farm', 20, 3.99, CURRENT_DATE + INTERVAL '2 days', 'dairy', 7, 'liters'),
('Organic Apples', 'PR-001', 0, 'Produce Section', 'Organic Farms Co', 15, 2.49, CURRENT_DATE + INTERVAL '4 days', 'produce', 13, 'kg'),
('Ground Beef', 'MT-001', 8, 'Freezer A', 'Quality Meats Inc', 10, 8.99, CURRENT_DATE + INTERVAL '30 days', 'meat', -14, 'kg');

-- The triggers will automatically create relevant alerts for:
-- 1. Temperature alert for milk (> 6°C)
-- 2. Out of stock alert for apples
-- 3. Low stock alert for ground beef (below threshold of 10)