import { create } from 'zustand';
import { 
  fetchInventoryItems, 
  fetchAlerts, 
  addInventoryItem, 
  deleteInventoryItem,
  deleteAlert,
  subscribeToInventoryChanges,
  fetchInventoryHistory 
} from '../lib/supabase';
import type { InventoryItem, StockAlert, InventoryHistory } from '../types';

interface InventoryStore {
  items: InventoryItem[];
  alerts: StockAlert[];
  history: InventoryHistory[];
  loading: boolean;
  error: string | null;
  alertsLoading: boolean;
  alertsError: string | null;
  historyLoading: boolean;
  historyError: string | null;
  fetchInventory: () => Promise<void>;
  fetchAlerts: () => Promise<void>;
  fetchHistory: () => Promise<void>;
  addItem: (item: Omit<InventoryItem, 'id'>) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  setupRealtimeSubscription: () => void;
}

export const useInventoryStore = create<InventoryStore>((set, get) => ({
  items: [],
  alerts: [],
  history: [],
  loading: false,
  error: null,
  alertsLoading: false,
  alertsError: null,
  historyLoading: false,
  historyError: null,

  fetchInventory: async () => {
    set({ loading: true, error: null });
    try {
      const items = await fetchInventoryItems();
      set({ items, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  fetchAlerts: async () => {
    set({ alertsLoading: true, alertsError: null });
    try {
      const alerts = await fetchAlerts();
      set({ alerts, alertsLoading: false });
    } catch (error) {
      set({ alertsError: (error as Error).message, alertsLoading: false });
    }
  },

  fetchHistory: async () => {
    set({ historyLoading: true, historyError: null });
    try {
      const history = await fetchInventoryHistory();
      set({ history, historyLoading: false });
    } catch (error) {
      set({ historyError: (error as Error).message, historyLoading: false });
    }
  },

  addItem: async (item) => {
    set({ loading: true, error: null });
    try {
      const newItem = await addInventoryItem(item);
      set((state) => ({
        items: [...state.items, newItem],
        loading: false
      }));
      get().fetchAlerts();
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
      throw error;
    }
  },

  deleteItem: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteInventoryItem(id);
      set((state) => ({
        items: state.items.filter(item => item.id !== id),
        loading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
      throw error;
    }
  },

  deleteNotification: async (id) => {
    try {
      await deleteAlert(id);
      set((state) => ({
        alerts: state.alerts.filter(alert => alert.id !== id)
      }));
    } catch (error) {
      throw error;
    }
  },

  setupRealtimeSubscription: () => {
    const subscription = subscribeToInventoryChanges((payload) => {
      get().fetchInventory();
      get().fetchAlerts();
      get().fetchHistory();
    });

    window.addEventListener('beforeunload', () => {
      subscription.unsubscribe();
    });
  }
}));