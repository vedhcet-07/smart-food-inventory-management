import React, { useEffect } from 'react';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';

interface ToastProps {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  onClose: () => void;
}

export function Toast({ type, message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <CheckCircle className="h-5 w-5 text-green-400" />,
    error: <XCircle className="h-5 w-5 text-red-400" />,
    info: <Info className="h-5 w-5 text-blue-400" />,
    warning: <AlertTriangle className="h-5 w-5 text-yellow-400" />
  };

  const styles = {
    success: 'bg-green-50 text-green-800',
    error: 'bg-red-50 text-red-800',
    info: 'bg-blue-50 text-blue-800',
    warning: 'bg-yellow-50 text-yellow-800'
  };

  return (
    <div className={`rounded-md p-4 ${styles[type]}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          {icons[type]}
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              onClick={onClose}
              className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                type === 'success' ? 'hover:bg-green-100 focus:ring-green-600' :
                type === 'error' ? 'hover:bg-red-100 focus:ring-red-600' :
                type === 'info' ? 'hover:bg-blue-100 focus:ring-blue-600' :
                'hover:bg-yellow-100 focus:ring-yellow-600'
              }`}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}