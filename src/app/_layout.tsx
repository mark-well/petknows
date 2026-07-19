import AuthProvider, { useAuth } from "@/providers/AuthContext";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export function RootLayoutNav() {
  const { claims } = useAuth();

  return (
    <Stack>
      {/* Authenticated users only */}
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

      {/* Available to everyone */}
      <Stack.Screen name="live-camera" options={{ title: "Live Camera" }} />
      <Stack.Screen
        name="result-screen"
        options={{ title: "Identificaiton Results" }}
      />
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
