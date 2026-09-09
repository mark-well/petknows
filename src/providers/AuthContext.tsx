import getUserProfile from "@/features/user/services/getUserProfile";
import { SignupFormType } from "@/shared/types";
import isConnectedToInernet from "@/utils/checkNetworkConnectivity";
import { JwtPayload } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { supabase } from "../../lib/supabase";
import { Database } from "../shared/types/database.types";

type AuthContextType = {
  claims: JwtPayload | undefined;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUp: (signupForm: SignupFormType) => Promise<void>;
  signOut: () => void;
  sendPasswordResetEmail: (email: string) => Promise<boolean>;
  updatePassword: (newPassword: string) => Promise<boolean>;
  userProfile: UserProfile | undefined;
};

type Props = {
  children: React.ReactNode;
};

type UserProfile = Database["public"]["Tables"]["profiles"]["Row"];

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: Props) {
  const [claims, setClaims] = useState<JwtPayload | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  // Get the user's profile from the database
  const { data: userProfile } = useQuery({
    queryKey: ["userProfile", claims?.sub],
    queryFn: () => getUserProfile(claims?.sub!),
    enabled: Boolean(claims?.sub),
  });

  useEffect(() => {
    supabase.auth.getClaims().then(async ({ data }) => {
      setClaims(data?.claims);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      supabase.auth.getClaims().then(async ({ data }) => {
        setClaims(data?.claims);
      });
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // Sign in using email and password
  const signInWithEmail = async (email: string, password: string) => {
    setLoading(true);

    //Check connectivity before sign in
    if (!(await isConnectedToInernet())) {
      Alert.alert("No Internet", "Please connect to the internet and try again.");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        Alert.alert("Login Error", "There was an error while trying to login.");
        console.error("Login Error: ", error);
        return;
      }
    } catch (error) {
      Alert.alert("Connection Error", "We couldn't connect to the server. Please try again.");
      console.error("Connection Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const signOut = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();

    if (error) Alert.alert("Error signing out");
    setLoading(false);
  };

  const signUp = async (signupForm: SignupFormType) => {
    setLoading(true);

    //Check connectivity before sign up
    if (!(await isConnectedToInernet())) {
      Alert.alert("No Internet", "Please connect to the internet and try again.");
      setLoading(false);
      return;
    }

    if (!signupForm.email) throw new Error("No email, provide an email for sign up");
    try {
      const { data, error } = await supabase.auth.signUp({
        email: signupForm.email,
        password: signupForm.password,
      });

      if (error) {
        Alert.alert("Signup Error: " + error.message);
        console.error("Signup Error: ", error);
        return;
      }

      if (data.user && data.session) {
        const { error } = await supabase
          .from("profiles")
          .update({
            first_name: signupForm.first_name,
            last_name: signupForm.last_name,
            birth_date: signupForm.birth_date,
            province_id: signupForm.province_id,
            city_id: signupForm.city_id,
            barangay_id: signupForm.barangay_id,
            contact_number: signupForm.contact_number,
            sex: signupForm.sex,
          })
          .eq("id", data.user.id);

        if (error) {
          if (error) throw error;
        }
        router.replace("/(tabs)");
      }
    } catch (error) {
      Alert.alert("Connection Error", "We couldn't connect to the server. Please try again.");
      console.error("Connection Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  // inside AuthProvider, alongside signInWithEmail
  const sendPasswordResetEmail = async (email: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "petknows://reset-password",
      });
      if (error) {
        Alert.alert("Error", "Could not send reset email. Please try again.");
        console.error("Reset email error:", error);
        return false;
      }
      return true;
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (newPassword: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) {
        Alert.alert("Error", "Could not update password.");
        console.error("Update password error:", error);
        return false;
      }
      return true;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        claims,
        loading,
        signInWithEmail,
        userProfile,
        signOut,
        signUp,
        sendPasswordResetEmail,
        updatePassword,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
