import React from 'react';

interface InventoryStatsProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
}

export function InventoryStats({ title, value, icon, trend }: InventoryStatsProps) {
  const trendIsPositive = trend.startsWith('+');

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className="p-2 bg-gray-100 rounded-lg">{icon}</div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className="flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            <span
              className={`ml-2 text-sm font-medium ${
                trendIsPositive ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {trend}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}