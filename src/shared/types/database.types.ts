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
      identifications: {
        Row: {
          created_at: string
          id: string
          latitude: number | null
          location_accuracy: number | null
          longitude: number | null
          pet: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          latitude?: number | null
          location_accuracy?: number | null
          longitude?: number | null
          pet?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          latitude?: number | null
          location_accuracy?: number | null
          longitude?: number | null
          pet?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "identifications_pet_fkey"
            columns: ["pet"]
            isOneToOne: false
            referencedRelation: "pets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "identifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      mao: {
        Row: {
          barangay_id: string | null
          city_id: string | null
          created_at: string
          id: string
          name: string | null
          province_id: string | null
          status: string | null
        }
        Insert: {
          barangay_id?: string | null
          city_id?: string | null
          created_at?: string
          id?: string
          name?: string | null
          province_id?: string | null
          status?: string | null
        }
        Update: {
          barangay_id?: string | null
          city_id?: string | null
          created_at?: string
          id?: string
          name?: string | null
          province_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mao_barangay_id_fkey"
            columns: ["barangay_id"]
            isOneToOne: false
            referencedRelation: "address_barangay"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mao_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "address_city"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mao_province_id_fkey"
            columns: ["province_id"]
            isOneToOne: false
            referencedRelation: "address_province"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          identification_record: string | null
          is_read: boolean
          message: string | null
          recipient_id: string | null
          sender_id: string | null
          title: string | null
          type: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          identification_record?: string | null
          is_read?: boolean
          message?: string | null
          recipient_id?: string | null
          sender_id?: string | null
          title?: string | null
          type?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          identification_record?: string | null
          is_read?: boolean
          message?: string | null
          recipient_id?: string | null
          sender_id?: string | null
          title?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_identification_record_fkey"
            columns: ["identification_record"]
            isOneToOne: false
            referencedRelation: "identifications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pet_images: {
        Row: {
          created_at: string
          embedding: string | null
          folder_id: string | null
          id: string
          image_url: string | null
          model_version: string
          pet_id: string
        }
        Insert: {
          created_at?: string
          embedding?: string | null
          folder_id?: string | null
          id?: string
          image_url?: string | null
          model_version: string
          pet_id: string
        }
        Update: {
          created_at?: string
          embedding?: string | null
          folder_id?: string | null
          id?: string
          image_url?: string | null
          model_version?: string
          pet_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pet_images_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pets"
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
          breed: string | null
          color: string | null
          created_at: string
          date_registered: string | null
          embedding: string | null
          id: string
          name: string | null
          pet_type: string | null
          place_of_registration: string | null
          public_id: string
          status: string | null
          user_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          breed?: string | null
          color?: string | null
          created_at?: string
          date_registered?: string | null
          embedding?: string | null
          id?: string
          name?: string | null
          pet_type?: string | null
          place_of_registration?: string | null
          public_id?: string
          status?: string | null
          user_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          breed?: string | null
          color?: string | null
          created_at?: string
          date_registered?: string | null
          embedding?: string | null
          id?: string
          name?: string | null
          pet_type?: string | null
          place_of_registration?: string | null
          public_id?: string
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
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
          {
            foreignKeyName: "pets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          admin_at: string | null
          avatar_url: string | null
          barangay_id: string | null
          birth_date: string | null
          city_id: string | null
          created_at: string
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          province_id: string | null
          public_id: string
          role: Database["public"]["Enums"]["user_roles"]
          sex: Database["public"]["Enums"]["sex"]
        }
        Insert: {
          admin_at?: string | null
          avatar_url?: string | null
          barangay_id?: string | null
          birth_date?: string | null
          city_id?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          province_id?: string | null
          public_id?: string
          role?: Database["public"]["Enums"]["user_roles"]
          sex?: Database["public"]["Enums"]["sex"]
        }
        Update: {
          admin_at?: string | null
          avatar_url?: string | null
          barangay_id?: string | null
          birth_date?: string | null
          city_id?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          province_id?: string | null
          public_id?: string
          role?: Database["public"]["Enums"]["user_roles"]
          sex?: Database["public"]["Enums"]["sex"]
        }
        Relationships: [
          {
            foreignKeyName: "profiles_admin_at_fkey"
            columns: ["admin_at"]
            isOneToOne: false
            referencedRelation: "mao"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_barangay_id_fkey"
            columns: ["barangay_id"]
            isOneToOne: false
            referencedRelation: "address_barangay"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "address_city"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_province_id_fkey"
            columns: ["province_id"]
            isOneToOne: false
            referencedRelation: "address_province"
            referencedColumns: ["id"]
          },
        ]
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
      calculate_age: { Args: { date_of_birth: string }; Returns: number }
      custom_access_token_hook: { Args: { event: Json }; Returns: Json }
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
      match_pets: {
        Args: {
          match_count: number
          match_threshold: number
          query_embedding: string
          required_model_version: string
        }
        Returns: {
          distance: number
          name: string
          pet_id: string
        }[]
      }
    }
    Enums: {
      sex: "Male" | "Female" | "Other"
      user_roles: "user" | "admin" | "super_admin"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      sex: ["Male", "Female", "Other"],
      user_roles: ["user", "admin", "super_admin"],
    },
  },
} as const
