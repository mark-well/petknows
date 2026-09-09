import Button from "@/components/Button";
import InputText from "@/components/InputText";
import { useAuth } from "@/providers/AuthContext";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

export default function ForgotPassword() {
  const { sendPasswordResetEmail, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      Alert.alert("No Email", "Please add an email.");
      return;
    }
    const ok = await sendPasswordResetEmail(email);
    if (ok) setSent(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Reset your password</Text>

      {sent ? (
        <Text style={styles.text}>Check your email for a reset link.</Text>
      ) : (
        <>
          <InputText placeholder="Enter your email" value={email} onChangeText={setEmail} style={styles.input} />
          <Button style={{ width: "100%", flex: 0 }} onPress={handleSubmit} disabled={loading}>
            Send Reset Link
          </Button>
        </>
      )}

      <Text style={styles.text} onPress={() => router.back()}>
        Back to Login
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 32, justifyContent: "center", rowGap: 16 },
  heading: { fontSize: 24, fontWeight: "600" },
  input: { height: 50 },
  text: { color: "hsl(0 0% 40%)" },
});
