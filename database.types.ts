export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      address_barangay: {
        Row: {
          city_id: string | null
          created_at: string
          id: string
          name: string | null
        }
        Insert: {
          city_id?: string | null
          created_at?: string
          id?: string
          name?: string | null
        }
        Update: {
          city_id?: string | null
          created_at?: string
          id?: string
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "address_barangay_city_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "address_city"
            referencedColumns: ["id"]
          },
        ]
      }
      address_city: {
        Row: {
          created_at: string
          id: string
          name: string | null
          province_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
          province_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
          province_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "address_city_province_fkey"
            columns: ["province_id"]
            isOneToOne: false
            referencedRelation: "address_province"
            referencedColumns: ["id"]
          },
        ]
      }
      address_province: {
        Row: {
          created_at: string
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      addresses: {
        Row: {
          barangay_id: string | null
          city_id: string | null
          created_at: string
          id: string
          province_id: string | null
        }
        Insert: {
          barangay_id?: string | null
          city_id?: string | null
          created_at?: string
          id?: string
          province_id?: string | null
        }
        Update: {
          barangay_id?: string | null
          city_id?: string | null
          created_at?: string
          id?: string
          province_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "addresses_barangay_fkey"
            columns: ["barangay_id"]
            isOneToOne: false
            referencedRelation: "address_barangay"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "addresses_city_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "address_city"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "addresses_province_fkey"
            columns: ["province_id"]
            isOneToOne: false
            referencedRelation: "address_province"
            referencedColumns: ["id"]
          },
        ]
      }
      mao: {
        Row: {
          address_id: string | null
          created_at: string
          id: string
          name: string | null
          status: string | null
        }
        Insert: {
          address_id?: string | null
          created_at?: string
          id?: string
          name?: string | null
          status?: string | null
        }
        Update: {
          address_id?: string | null
          created_at?: string
          id?: string
          name?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mao_address_fkey"
            columns: ["address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
        ]
      }
      pet_status: {
        Row: {
          created_at: string
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      pets: {
        Row: {
          avatar_url: string | null
          created_at: string
          date_registered: string | null
          embedding: string | null
          id: string
          name: string | null
          owner: string | null
          pet_type: string | null
          place_of_registration: string | null
          status: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          date_registered?: string | null
          embedding?: string | null
          id?: string
          name?: string | null
          owner?: string | null
          pet_type?: string | null
          place_of_registration?: string | null
          status?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          date_registered?: string | null
          embedding?: string | null
          id?: string
          name?: string | null
          owner?: string | null
          pet_type?: string | null
          place_of_registration?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pets_owner_fkey"
            columns: ["owner"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pets_place_of_registration_fkey"
            columns: ["place_of_registration"]
            isOneToOne: false
            referencedRelation: "mao"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pets_status_fkey"
            columns: ["status"]
            isOneToOne: false
            referencedRelation: "pet_status"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          birth_date: string | null
          created_at: string
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
        }
        Insert: {
          address?: string | null
          birth_date?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
        }
        Update: {
          address?: string | null
          birth_date?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
        }
        Relationships: []
      }
      user_contact: {
        Row: {
          created_at: string
          id: string
          number: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          number?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          number?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_contact_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_species_counts:
        | {
            Args: never
            Returns: {
              count: number
              name: string
            }[]
          }
        | {
            Args: { uid: string }
            Returns: {
              count: number
              name: string
            }[]
          }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
