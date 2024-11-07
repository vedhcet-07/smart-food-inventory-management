-- Enable RLS
alter table inventory enable row level security;
alter table alerts enable row level security;
alter table inventory_history enable row level security;

-- Create policies
create policy "Enable read access for all users" on inventory for select using (true);
create policy "Enable insert for authenticated users" on inventory for insert with check (true);
create policy "Enable update for authenticated users" on inventory for update using (true);
create policy "Enable delete for authenticated users" on inventory for delete using (true);

create policy "Enable read access for all users" on alerts for select using (true);
create policy "Enable insert for authenticated users" on alerts for insert with check (true);
create policy "Enable update for authenticated users" on alerts for update using (true);
create policy "Enable delete for authenticated users" on alerts for delete using (true);

create policy "Enable read access for all users" on inventory_history for select using (true);
create policy "Enable insert for authenticated users" on inventory_history for insert with check (true);

-- Drop existing functions and triggers if they exist
drop trigger if exists check_inventory_trigger on inventory;
drop function if exists check_inventory_alerts();
drop function if exists check_stock_levels();

-- Create the alert function
create or replace function check_inventory_alerts()
returns trigger as $$
begin
  -- Check for out of stock
  if NEW.quantity = 0 then
    insert into alerts (item_id, type, message, priority)
    values (NEW.id, 'OUT_OF_STOCK', NEW.name || ' is out of stock', 'high');
  
  -- Check for low stock
  elsif NEW.quantity <= NEW.threshold then
    insert into alerts (item_id, type, message, priority)
    values (NEW.id, 'LOW_STOCK', NEW.name || ' is running low on stock', 'medium');
  end if;

  -- Check temperature thresholds
  case NEW.category
    when 'dairy' then
      if NEW.temperature > 6 then
        insert into alerts (item_id, type, message, priority)
        values (NEW.id, 'TEMPERATURE_ALERT', 'Temperature too high for ' || NEW.name, 'high');
      end if;
    when 'meat' then
      if NEW.temperature > -15 then
        insert into alerts (item_id, type, message, priority)
        values (NEW.id, 'TEMPERATURE_ALERT', 'Temperature too high for ' || NEW.name, 'high');
      end if;
    when 'produce' then
      if NEW.temperature > 12 then
        insert into alerts (item_id, type, message, priority)
        values (NEW.id, 'TEMPERATURE_ALERT', 'Temperature too high for ' || NEW.name, 'high');
      end if;
    else
      -- No temperature checks for other categories
      null;
  end case;

  -- Check expiry date
  if NEW.expiry_date - current_date <= 3 then
    insert into alerts (item_id, type, message, priority)
    values (NEW.id, 'EXPIRING_SOON', NEW.name || ' is expiring soon', 'medium');
  end if;

  return NEW;
end;
$$ language plpgsql;

-- Create trigger for inventory alerts
create trigger check_inventory_trigger
after insert or update on inventory
for each row
execute function check_inventory_alerts();

-- Create function for inventory history
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

-- Create trigger for inventory history
create trigger inventory_history_trigger
after insert or delete on inventory
for each row
execute function update_inventory_history();