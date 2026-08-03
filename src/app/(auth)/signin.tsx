import { useAuth } from "@/providers/AuthContext";
import { Link } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Button from "../../components/Button";
import {
  default as Input,
  default as InputText,
} from "../../components/InputText";

export default function Login() {
  const { signInWithEmail, loading } = useAuth();
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const handleSignIn = () => {
    if (!email || !password) {
      Alert.alert(
        "Missing input",
        "You are either missing an email or a password, make sure to fill in all.",
      );
      return;
    }

    signInWithEmail(email, password);
  };

  //   TODO: Make loading screen
  return (
    <View style={styles.container}>
      {loading && <Text>Logging you in</Text>}
      <View style={{ width: "100%", rowGap: 8 }}>
        <Text style={styles.text}>Email</Text>
        <InputText
          placeholder="Enter your email"
          placeholderTextColor="hsl(0 0% 60%)"
          onChangeText={(text) => setEmail(text)}
        />
      </View>

      <View style={{ width: "100%", rowGap: 8 }}>
        <Text style={styles.text}>Password</Text>
        <Input
          placeholder="Enter your password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <Button style={{ flex: 0, width: "100%" }} onPress={handleSignIn}>
        Login
      </Button>

      <View>
        <Text style={[styles.text, { color: "hsl(0, 0%, 30%)" }]}>
          Don't have an account?{" "}
          <Link href={"/signup"} style={{ color: "#000" }}>
            Register here
          </Link>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    padding: 32,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 16,
  },

  text: {
    fontSize: 16,
  },

  input: {
    borderWidth: 1,
    borderColor: "hsl(0 0% 80%)",
    backgroundColor: "hsl(0 0% 90%)",
    color: "#000",
    marginTop: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    fontSize: 16,
    lineHeight: 16 * 1.3,
  },
});
