import React, { useState } from 'react';
import { AlertTriangle, Thermometer, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { useInventoryStore } from '../store/inventoryStore';

export function StockAlerts() {
  const { alerts, alertsLoading, alertsError } = useInventoryStore();
  const [expanded, setExpanded] = useState(false);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'TEMPERATURE_ALERT':
        return <Thermometer className="h-5 w-5" />;
      case 'EXPIRING_SOON':
        return <Clock className="h-5 w-5" />;
      default:
        return <AlertTriangle className="h-5 w-5" />;
    }
  };

  const getAlertStyle = (type: string) => {
    switch (type) {
      case 'OUT_OF_STOCK':
        return 'bg-red-50 text-red-800';
      case 'TEMPERATURE_ALERT':
        return 'bg-orange-50 text-orange-800';
      case 'EXPIRING_SOON':
        return 'bg-yellow-50 text-yellow-800';
      default:
        return 'bg-blue-50 text-blue-800';
    }
  };

  if (alertsLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (alertsError) {
    return (
      <div className="text-center text-red-600 p-4">
        Error loading alerts: {alertsError}
      </div>
    );
  }

  if (!alerts.length) {
    return (
      <div className="text-center text-gray-500 p-4">
        No alerts at this time
      </div>
    );
  }

  const displayedAlerts = expanded ? alerts : alerts.slice(0, 3);

  return (
    <div className="mt-4">
      <div className="space-y-4">
        {displayedAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-lg ${getAlertStyle(alert.type)} transition-all duration-200 hover:shadow-md`}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {getAlertIcon(alert.type)}
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium">
                  {alert.message}
                </p>
                <div className="mt-1 flex items-center">
                  <p className="text-sm text-gray-500">
                    {new Date(alert.timestamp).toLocaleString()}
                  </p>
                  <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    alert.priority === 'high' ? 'bg-red-100 text-red-800' :
                    alert.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {alert.priority.charAt(0).toUpperCase() + alert.priority.slice(1)} Priority
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {alerts.length > 3 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
        >
          {expanded ? (
            <>
              Show Less <ChevronUp className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Show All ({alerts.length - 3} more) <ChevronDown className="ml-2 h-4 w-4" />
            </>
          )}
        </button>
      )}
    </div>
  );
}