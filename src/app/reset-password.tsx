import Button from "@/components/Button";
import InputText from "@/components/InputText";
import { useAuth } from "@/providers/AuthContext";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

export default function ResetPassword() {
  const { updatePassword, loading } = useAuth();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = async () => {
    if (password !== confirm) {
      Alert.alert("Passwords don't match");
      return;
    }
    const ok = await updatePassword(password);
    if (ok) {
      Alert.alert("Success", "Password updated. Please sign in again.");
      router.replace("/(auth)/signin");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Set a new password</Text>
      <InputText
        placeholder="New password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <InputText
        placeholder="Confirm password"
        secureTextEntry
        value={confirm}
        onChangeText={setConfirm}
        style={styles.input}
      />
      <Button style={{ width: "100%", flex: 0 }} onPress={handleSubmit} disabled={loading}>
        Update Password
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 32, justifyContent: "center", rowGap: 16 },
  heading: { fontSize: 24, fontWeight: "600" },
  input: { height: 50 },
});
