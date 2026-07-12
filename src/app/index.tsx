import Login from "@/components/Login";
import { useAuth } from "@/providers/AuthContext";
import { Redirect } from "expo-router";
import { StyleSheet } from "react-native";

export default function Index() {
  const { claims } = useAuth();

  if (claims) {
    return <Redirect href={"/(tabs)"} />;
  }

  return <Login />;
}

const styles = StyleSheet.create({});
