-- Add inventory_history table
create table inventory_history (
  id uuid default gen_random_uuid() primary key,
  timestamp timestamp with time zone default now(),
  total_items integer not null,
  items_added integer not null default 0,
  items_removed integer not null default 0
);

-- Sample data for inventory
INSERT INTO inventory (name, sku, quantity, location, supplier, threshold, price, expiry_date, category, temperature, unit) VALUES
('Organic Whole Milk', 'DY-001', 75, 'Cold Storage A', 'Local Dairy Farm', 20, 4.99, current_date + interval '7 days', 'dairy', 4, 'liters'),
('Fresh Strawberries', 'PR-001', 30, 'Produce Section', 'Berry Best Farms', 15, 3.99, current_date + interval '5 days', 'produce', 8, 'kg'),
('Premium Ground Beef', 'MT-001', 45, 'Freezer A', 'Quality Meats Inc', 10, 8.99, current_date + interval '30 days', 'meat', -18, 'kg'),
('Sourdough Bread', 'BK-001', 25, 'Bakery Display', 'Artisan Bakery', 8, 5.99, current_date + interval '2 days', 'bakery', 20, 'units'),
('Organic Pasta', 'PN-001', 100, 'Dry Storage', 'Italian Imports', 30, 2.99, current_date + interval '180 days', 'pantry', 22, 'units'),
('Greek Yogurt', 'DY-002', 50, 'Cold Storage B', 'Mediterranean Dairy', 15, 3.49, current_date + interval '14 days', 'dairy', 4, 'units'),
('Fresh Spinach', 'PR-002', 20, 'Produce Section', 'Green Fields Farm', 10, 2.99, current_date + interval '4 days', 'produce', 6, 'kg'),
('Chicken Breast', 'MT-002', 35, 'Freezer B', 'Poultry Plus', 12, 7.99, current_date + interval '45 days', 'meat', -18, 'kg'),
('Multigrain Bagels', 'BK-002', 40, 'Bakery Display', 'Morning Fresh Bakery', 15, 4.99, current_date + interval '3 days', 'bakery', 20, 'units'),
('Olive Oil', 'PN-002', 60, 'Dry Storage', 'Mediterranean Imports', 20, 12.99, current_date + interval '365 days', 'pantry', 22, 'liters');

-- Create trigger for inventory history
create or replace function update_inventory_history()
returns trigger as $$
declare
  items_count integer;
  added integer;
  removed integer;
begin
  select count(*) into items_count from inventory;
  
  if TG_OP = 'INSERT' then
    added := 1;
    removed := 0;
  elsif TG_OP = 'DELETE' then
    added := 0;
    removed := 1;
  end if;

  insert into inventory_history (total_items, items_added, items_removed)
  values (items_count, added, removed);

  return NEW;
end;
$$ language plpgsql;

create trigger inventory_history_trigger
after insert or delete on inventory
for each row
execute function update_inventory_history();