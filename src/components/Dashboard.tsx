import React, { useEffect, useState } from 'react';
import { BarChart3, Package, AlertTriangle, TrendingUp, Plus, Bell } from 'lucide-react';
import { InventoryList } from './InventoryList';
import { StockAlerts } from './StockAlerts';
import { InventoryStats } from './InventoryStats';
import { ForecastChart } from './ForecastChart';
import { AddItemForm } from './AddItemForm';
import { Toast } from './Toast';
import { NotificationCenter } from './NotificationCenter';
import { useInventoryStore } from '../store/inventoryStore';

export function Dashboard() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info', message: string } | null>(null);
  
  const { items, alerts, fetchInventory, fetchAlerts, setupRealtimeSubscription } = useInventoryStore();

  useEffect(() => {
    fetchInventory();
    fetchAlerts();
    setupRealtimeSubscription();
  }, [fetchInventory, fetchAlerts, setupRealtimeSubscription]);

  const totalItems = items.length;
  const lowStockItems = items.filter(item => item.quantity > 0 && item.quantity <= item.threshold).length;
  const outOfStockItems = items.filter(item => item.quantity === 0).length;
  const forecastAccuracy = 96.8;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {toast && (
        <div className="fixed top-4 right-4 z-50">
          <Toast
            type={toast.type}
            message={toast.message}
            onClose={() => setToast(null)}
          />
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowNotifications(true)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Bell className="h-5 w-5 mr-2" />
            <span className="relative">
              Notifications
              {alerts.length > 0 && (
                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
              )}
            </span>
          </button>
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Item
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <InventoryStats
          title="Total Items"
          value={totalItems.toString()}
          icon={<Package className="h-6 w-6 text-blue-600" />}
          trend="+2.5%"
        />
        <InventoryStats
          title="Low Stock"
          value={lowStockItems.toString()}
          icon={<AlertTriangle className="h-6 w-6 text-yellow-600" />}
          trend="-4.3%"
        />
        <InventoryStats
          title="Out of Stock"
          value={outOfStockItems.toString()}
          icon={<BarChart3 className="h-6 w-6 text-red-600" />}
          trend="+0.5%"
        />
        <InventoryStats
          title="Forecast Accuracy"
          value={`${forecastAccuracy}%`}
          icon={<TrendingUp className="h-6 w-6 text-green-600" />}
          trend="+1.2%"
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900">Inventory Forecast</h2>
            <div className="mt-4 h-72">
              <ForecastChart />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900">Stock Alerts</h2>
            <StockAlerts />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900">Current Inventory</h2>
            <InventoryList />
          </div>
        </div>
      </div>

      {showAddForm && (
        <AddItemForm onClose={() => setShowAddForm(false)} />
      )}

      {showNotifications && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-gray-500 bg-opacity-75" onClick={() => setShowNotifications(false)} />
          <NotificationCenter onClose={() => setShowNotifications(false)} />
        </div>
      )}
    </div>
  );
}