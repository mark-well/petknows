import { useAuth } from "@/providers/AuthContext";
import { Redirect } from "expo-router";

export default function Index() {
  const { claims } = useAuth();

  return claims ? (
    <Redirect href="/(tabs)" />
  ) : (
    <Redirect href="/(auth)/signin" />
  );
}
