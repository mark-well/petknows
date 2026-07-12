import AuthProvider, { useAuth } from "@/providers/AuthContext";
import { Stack } from "expo-router";

export function RootLayoutNav() {
  const { claims } = useAuth();

  return (
    <Stack>
      <Stack.Protected guard={!!claims}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Screen
        name="index"
        options={{ title: "Login", headerShown: false }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
