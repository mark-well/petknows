import AuthProvider, { useAuth } from "@/providers/AuthContext";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export function RootLayoutNav() {
  const { claims } = useAuth();

  return (
    <Stack>
      <Stack.Protected guard={!!claims}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={!claims}>
        <Stack.Screen
          name="index"
          options={{ title: "Login", headerShown: false }}
        />
        <Stack.Screen name="signup" options={{ title: "Signup" }} />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <RootLayoutNav />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
