import React, { useState } from 'react';
import { useInventoryStore } from '../store/inventoryStore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { BarChart3, TrendingUp, Activity } from 'lucide-react';

export function ForecastChart() {
  const { history, historyLoading, historyError } = useInventoryStore();
  const [chartType, setChartType] = useState<'line' | 'area' | 'bar'>('area');

  if (historyLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (historyError) {
    return (
      <div className="text-center text-red-600">
        Error loading forecast data: {historyError}
      </div>
    );
  }

  const data = history.map(item => ({
    date: new Date(item.timestamp).toLocaleDateString(),
    items: item.total_items,
    added: item.items_added,
    removed: item.items_removed,
    predicted: Math.round(item.total_items * (1 + Math.random() * 0.1)) // Simulated prediction
  }));

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 10, right: 30, left: 0, bottom: 0 }
    };

    switch (chartType) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="items" stroke="#4F46E5" name="Actual Items" />
            <Line type="monotone" dataKey="predicted" stroke="#059669" name="Predicted Items" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="added" stroke="#2563EB" name="Items Added" />
            <Line type="monotone" dataKey="removed" stroke="#DC2626" name="Items Removed" />
          </LineChart>
        );
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="items" stackId="1" stroke="#4F46E5" fill="#4F46E5" fillOpacity={0.3} name="Total Items" />
            <Area type="monotone" dataKey="predicted" stackId="2" stroke="#059669" fill="#059669" fillOpacity={0.3} name="Predicted Items" />
          </AreaChart>
        );
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="added" fill="#2563EB" name="Items Added" />
            <Bar dataKey="removed" fill="#DC2626" name="Items Removed" />
          </BarChart>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full">
      <div className="mb-4 flex justify-end space-x-2">
        <button
          onClick={() => setChartType('area')}
          className={`p-2 rounded-lg ${
            chartType === 'area' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'
          }`}
          title="Area Chart"
        >
          <TrendingUp className="h-5 w-5" />
        </button>
        <button
          onClick={() => setChartType('line')}
          className={`p-2 rounded-lg ${
            chartType === 'line' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'
          }`}
          title="Line Chart"
        >
          <Activity className="h-5 w-5" />
        </button>
        <button
          onClick={() => setChartType('bar')}
          className={`p-2 rounded-lg ${
            chartType === 'bar' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'
          }`}
          title="Bar Chart"
        >
          <BarChart3 className="h-5 w-5" />
        </button>
      </div>
      <div className="h-[calc(100%-2rem)]">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
}