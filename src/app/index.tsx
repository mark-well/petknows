import { Redirect, router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  let user = true;

  if (user) {
    return <Redirect href={"/(tabs)"} />;
  }

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => router.replace("/(tabs)")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    backgroundColor: "#a29bfe",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
