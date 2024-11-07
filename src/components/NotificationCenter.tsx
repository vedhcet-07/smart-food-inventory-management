import React from 'react';
import { Bell, X, AlertTriangle, Thermometer, Clock, Package } from 'lucide-react';
import { useInventoryStore } from '../store/inventoryStore';

export function NotificationCenter({ onClose }: { onClose: () => void }) {
  const { alerts } = useInventoryStore();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'TEMPERATURE_ALERT':
        return <Thermometer className="h-5 w-5" />;
      case 'EXPIRING_SOON':
        return <Clock className="h-5 w-5" />;
      case 'OUT_OF_STOCK':
        return <Package className="h-5 w-5" />;
      default:
        return <AlertTriangle className="h-5 w-5" />;
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-xl">
      <div className="h-full flex flex-col">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bell className="h-5 w-5 text-indigo-600" />
              <h2 className="ml-2 text-lg font-medium text-gray-900">Notifications</h2>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {alerts.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg ${
                  notification.priority === 'high'
                    ? 'bg-red-50'
                    : notification.priority === 'medium'
                    ? 'bg-yellow-50'
                    : 'bg-blue-50'
                }`}
              >
                <div className="flex">
                  <div className={`flex-shrink-0 ${
                    notification.priority === 'high'
                      ? 'text-red-600'
                      : notification.priority === 'medium'
                      ? 'text-yellow-600'
                      : 'text-blue-600'
                  }`}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {notification.message}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {new Date(notification.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}