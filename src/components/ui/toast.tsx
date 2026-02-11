import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, XCircle } from 'lucide-react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'loading';
  duration?: number;
}

interface ToastContextValue {
  toasts: Toast[];
  addToast: (message: string, type: Toast['type'], duration?: number) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const addToast = useCallback((message: string, type: Toast['type'], duration: number = 2000) => {
    const id = Math.random().toString(36).substring(7);
    setToasts(prev => [...prev, { id, message, type, duration }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
        {toasts.map(toast => (
          <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleRemove = () => {
    setIsVisible(false);
    setTimeout(() => onRemove(toast.id), 300);
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-400" />,
    error: <XCircle className="w-5 h-5 text-red-400" />,
    info: <Info className="w-5 h-5 text-blue-400" />,
    loading: <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
  };

  const colors = {
    success: 'border-green-400/30 bg-green-950/50',
    error: 'border-red-400/30 bg-red-950/50',
    info: 'border-blue-400/30 bg-blue-950/50',
    loading: 'border-blue-400/30 bg-blue-950/50'
  };

  return (
    <div
      className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-lg border backdrop-blur-md shadow-lg transition-all duration-300 ${
        colors[toast.type]
      } ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
      style={{ minWidth: '300px' }}
    >
      {icons[toast.type]}
      <span className="flex-1 text-white text-sm font-medium">{toast.message}</span>
      <button
        onClick={handleRemove}
        className="text-gray-400 hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }

  return {
    success: (message: string, duration?: number) => context.addToast(message, 'success', duration),
    error: (message: string, duration?: number) => context.addToast(message, 'error', duration),
    info: (message: string, duration?: number) => context.addToast(message, 'info', duration),
    loading: (message: string) => context.addToast(message, 'loading', 0),
  };
}

// Export a global toast object for backward compatibility
let globalToastContext: ToastContextValue | null = null;

export function setGlobalToastContext(context: ToastContextValue) {
  globalToastContext = context;
}

export const toast = {
  success: (message: string, duration?: number) => {
    if (globalToastContext) {
      globalToastContext.addToast(message, 'success', duration);
    }
  },
  error: (message: string, duration?: number) => {
    if (globalToastContext) {
      globalToastContext.addToast(message, 'error', duration);
    }
  },
  info: (message: string, duration?: number) => {
    if (globalToastContext) {
      globalToastContext.addToast(message, 'info', duration);
    }
  },
  loading: (message: string) => {
    if (globalToastContext) {
      globalToastContext.addToast(message, 'loading', 0);
    }
  },
};
