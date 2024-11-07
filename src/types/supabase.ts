export interface Database {
  public: {
    Tables: {
      inventory: {
        Row: {
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
        };
        Insert: Omit<Database['public']['Tables']['inventory']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['inventory']['Row']>;
      };
      alerts: {
        Row: {
          id: string;
          itemId: string;
          type: 'LOW_STOCK' | 'OUT_OF_STOCK' | 'REORDER' | 'EXPIRING_SOON' | 'TEMPERATURE_ALERT';
          message: string;
          timestamp: string;
          priority: 'high' | 'medium' | 'low';
        };
        Insert: Omit<Database['public']['Tables']['alerts']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['alerts']['Row']>;
      };
      suppliers: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          address: string;
          products: string[];
          performance: number;
          lastDelivery: string;
        };
        Insert: Omit<Database['public']['Tables']['suppliers']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['suppliers']['Row']>;
      };
    };
  };
}