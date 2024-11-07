import { InventoryItem, StockAlert, ForecastData } from '../types';

export const mockInventoryData: InventoryItem[] = [
  {
    id: '1',
    name: 'Fresh Milk',
    sku: 'DY-001',
    quantity: 150,
    location: 'Cold Storage A',
    supplier: 'Local Dairy Farm',
    threshold: 50,
    lastUpdated: '2024-03-10',
    price: 3.99,
    expiryDate: '2024-03-17',
    category: 'dairy',
    temperature: 4,
    unit: 'liters'
  },
  {
    id: '2',
    name: 'Organic Apples',
    sku: 'PR-002',
    quantity: 25,
    location: 'Produce Section',
    supplier: 'Organic Farms Co',
    threshold: 30,
    lastUpdated: '2024-03-09',
    price: 2.49,
    expiryDate: '2024-03-20',
    category: 'produce',
    temperature: 10,
    unit: 'kg'
  },
  {
    id: '3',
    name: 'Premium Ground Beef',
    sku: 'MT-003',
    quantity: 0,
    location: 'Freezer B',
    supplier: 'Quality Meats Inc',
    threshold: 20,
    lastUpdated: '2024-03-08',
    price: 8.99,
    expiryDate: '2024-03-15',
    category: 'meat',
    temperature: -18,
    unit: 'kg'
  },
  {
    id: '4',
    name: 'Sourdough Bread',
    sku: 'BK-004',
    quantity: 45,
    location: 'Bakery Display',
    supplier: 'Artisan Bakery',
    threshold: 20,
    lastUpdated: '2024-03-10',
    price: 4.99,
    expiryDate: '2024-03-12',
    category: 'bakery',
    temperature: 20,
    unit: 'units'
  },
  {
    id: '5',
    name: 'Pasta Sauce',
    sku: 'PN-005',
    quantity: 75,
    location: 'Dry Storage',
    supplier: 'Italian Imports',
    threshold: 40,
    lastUpdated: '2024-03-09',
    price: 3.49,
    expiryDate: '2024-09-09',
    category: 'pantry',
    temperature: 22,
    unit: 'units'
  }
];

export const mockAlerts: StockAlert[] = [
  {
    id: '1',
    itemId: '3',
    type: 'OUT_OF_STOCK',
    message: 'Premium Ground Beef is out of stock',
    timestamp: '2 hours ago',
    priority: 'high'
  },
  {
    id: '2',
    itemId: '4',
    type: 'EXPIRING_SOON',
    message: 'Sourdough Bread expires in 2 days',
    timestamp: '4 hours ago',
    priority: 'medium'
  },
  {
    id: '3',
    itemId: '1',
    type: 'TEMPERATURE_ALERT',
    message: 'Milk storage temperature above threshold',
    timestamp: '1 hour ago',
    priority: 'high'
  }
];

export const mockForecastData: ForecastData[] = [
  { date: 'Mon', predicted: 220, actual: 215 },
  { date: 'Tue', predicted: 230, actual: 225 },
  { date: 'Wed', predicted: 240, actual: 245 },
  { date: 'Thu', predicted: 235, actual: 230 },
  { date: 'Fri', predicted: 250, actual: 255 },
  { date: 'Sat', predicted: 245, actual: 240 },
  { date: 'Sun', predicted: 260, actual: 0 }
];