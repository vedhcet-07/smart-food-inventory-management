import { createClient } from '@supabase/supabase-js';
import type { Database } from './supabase-types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export async function fetchInventoryItems() {
  const { data, error } = await supabase
    .from('inventory')
    .select('*')
    .order('name');

  if (error) throw error;
  return data;
}

export async function addInventoryItem(item: Omit<Database['public']['Tables']['inventory']['Insert'], 'id'>) {
  const { data, error } = await supabase
    .from('inventory')
    .insert([item])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteInventoryItem(id: string) {
  const { error } = await supabase
    .from('inventory')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function updateInventoryItem(id: string, updates: Partial<Database['public']['Tables']['inventory']['Update']>) {
  const { data, error } = await supabase
    .from('inventory')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function fetchAlerts() {
  const { data, error } = await supabase
    .from('alerts')
    .select('*')
    .order('timestamp', { ascending: false });

  if (error) throw error;
  return data;
}

export async function deleteAlert(id: string) {
  const { error } = await supabase
    .from('alerts')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function createAlert(alert: Omit<Database['public']['Tables']['alerts']['Insert'], 'id'>) {
  const { data, error } = await supabase
    .from('alerts')
    .insert([alert])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function fetchInventoryHistory() {
  const { data, error } = await supabase
    .from('inventory_history')
    .select('*')
    .order('timestamp', { ascending: true });

  if (error) throw error;
  return data;
}

// Real-time subscription setup
export function subscribeToInventoryChanges(callback: (payload: any) => void) {
  return supabase
    .channel('inventory_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'inventory'
      },
      callback
    )
    .subscribe();
}