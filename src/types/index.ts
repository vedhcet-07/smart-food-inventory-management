export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  location: string;
  supplier: string;
  threshold: number;
  lastUpdated: string;
  price: number;
  expiryDate: string;
  category: 'dairy' | 'produce' | 'meat' | 'bakery' | 'pantry';
  temperature: number;
  unit: 'kg' | 'lbs' | 'units' | 'liters';
}

export interface StockAlert {
  id: string;
  itemId: string;
  type: 'LOW_STOCK' | 'OUT_OF_STOCK' | 'REORDER' | 'EXPIRING_SOON' | 'TEMPERATURE_ALERT';
  message: string;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
}

export interface InventoryHistory {
  id: string;
  timestamp: string;
  total_items: number;
  items_added: number;
  items_removed: number;
}