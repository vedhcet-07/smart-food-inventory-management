export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      inventory: {
        Row: {
          id: string
          name: string
          sku: string
          quantity: number
          location: string
          supplier: string
          threshold: number
          last_updated: string
          price: number
          expiry_date: string
          category: 'dairy' | 'produce' | 'meat' | 'bakery' | 'pantry'
          temperature: number
          unit: 'kg' | 'lbs' | 'units' | 'liters'
        }
        Insert: Omit<Database['public']['Tables']['inventory']['Row'], 'id' | 'last_updated'>
        Update: Partial<Database['public']['Tables']['inventory']['Row']>
      }
      alerts: {
        Row: {
          id: string
          item_id: string
          type: 'LOW_STOCK' | 'OUT_OF_STOCK' | 'REORDER' | 'EXPIRING_SOON' | 'TEMPERATURE_ALERT'
          message: string
          timestamp: string
          priority: 'high' | 'medium' | 'low'
        }
        Insert: Omit<Database['public']['Tables']['alerts']['Row'], 'id' | 'timestamp'>
        Update: Partial<Database['public']['Tables']['alerts']['Row']>
      }
    }
  }
}