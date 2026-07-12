import { JwtPayload } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { supabase } from "../../lib/supabase";

type AuthContextType = {
  claims: JwtPayload | undefined;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  userProfile: UserProfile | undefined;
};

type Props = {
  children: React.ReactNode;
};

type UserProfile = {
  id: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  birth_date: string | null;
  created_at: string | null;
  address: string | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: Props) {
  const [claims, setClaims] = useState<JwtPayload | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfile>();

  useEffect(() => {
    supabase.auth.getClaims().then(async ({ data }) => {
      setClaims(data?.claims);
      setUserProfile(
        data?.claims ? await getUserProfile(data?.claims.sub) : undefined,
      );
    });

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      supabase.auth.getClaims().then(async ({ data }) => {
        setClaims(data?.claims);
        setUserProfile(
          data?.claims ? await getUserProfile(data?.claims.sub) : undefined,
        );
      });
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const getUserProfile = async (
    userId: string | undefined,
  ): Promise<UserProfile | undefined> => {
    if (!userId) return;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (!error) {
      return data;
    } else {
      return undefined;
    }
  };

  // Sign in using email and password
  const signInWithEmail = async (email: string, password: string) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert("Login Error " + error.message);
    setLoading(false);
  };

  const signOut = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();

    if (error) Alert.alert("Error signing out");
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{ claims, loading, signInWithEmail, userProfile, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
