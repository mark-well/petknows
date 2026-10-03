import AuthProvider, { useAuth } from "@/providers/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as Linking from "expo-linking";
import { router, Stack } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { supabase } from "../../lib/supabase";

export function RootLayoutNav() {
  const { claims } = useAuth();

  return (
    <Stack>
      {/* Authenticated users only */}
      <Stack.Protected guard={!!claims}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="notification" options={{ headerShown: true, title: "Notifications" }} />
      </Stack.Protected>

      <Stack.Protected guard={!claims}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>

      {/* Available to everyone */}
      <Stack.Screen name="pet-identification/live-camera" options={{ title: "Live Camera" }} />
      <Stack.Screen name="pet-identification/result" options={{ title: "Identification Results" }} />
      <Stack.Screen name="reset-password" options={{ title: "Set New Password" }} />
      <Stack.Screen name="privacy-policy" options={{ title: "Data Privacy Notice" }} />
    </Stack>
  );
}

const queryClient = new QueryClient();

export default function RootLayout() {
  useEffect(() => {
    const handleUrl = async (url: string | null) => {
      if (!url) return;
      const parsed = Linking.parse(url);
      // Supabase puts tokens in the URL fragment: #access_token=...&refresh_token=...&type=recovery
      const fragment = url.split("#")[1];
      if (!fragment) return;

      const params = new URLSearchParams(fragment);
      const access_token = params.get("access_token");
      const refresh_token = params.get("refresh_token");
      const type = params.get("type");

      if (type === "recovery" && access_token && refresh_token) {
        await supabase.auth.setSession({ access_token, refresh_token });
        router.push("/reset-password");
      }
    };

    Linking.getInitialURL().then(handleUrl);
    const sub = Linking.addEventListener("url", (e) => handleUrl(e.url));
    return () => sub.remove();
  }, []);

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RootLayoutNav />
        </AuthProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
