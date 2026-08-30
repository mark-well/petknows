import AuthProvider, { useAuth } from "@/providers/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

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
      <Stack.Screen name="pet-identification/result" options={{ title: "Identificaiton Results" }} />
    </Stack>
  );
}

const queryClient = new QueryClient();

export default function RootLayout() {
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
