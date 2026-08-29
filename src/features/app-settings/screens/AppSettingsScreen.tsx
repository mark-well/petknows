import Button from "@/components/Button";
import { useAuth } from "@/providers/AuthContext";
import { StyleSheet, View } from "react-native";

export default function AppSettingsScreen() {
  const { signOut, loading } = useAuth();

  const handleSignOut = async () => {
    signOut();
  };

  return (
    <>
      <View style={styles.main}>
        <Button onPress={handleSignOut} disabled={loading}>
          Sign out
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  main: {
    padding: 16,
  },
});
