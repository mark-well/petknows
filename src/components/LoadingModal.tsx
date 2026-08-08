import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

type Props = {
  onClose?: () => void;
  title?: string;
  message?: string;
};

export default function LoadingModal({ onClose, title, message }: Props) {
  return (
    <>
      <View style={styles.backdrop}></View>
      <View style={styles.container}>
        <ActivityIndicator size="large" color="hsl(15 100% 54%)" />
        <Text style={styles.title}>{title || "Loading..."}</Text>
        <Text style={styles.message}>{message || "Loading..."}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 300,
    height: 300,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    zIndex: 4,
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: 16,
    padding: 16,
    rowGap: 16,
  },

  backdrop: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
    opacity: 0.3,
    position: "absolute",
    zIndex: 2,
  },

  title: {
    fontSize: 20,
    fontWeight: "semibold",
    textAlign: "center",
  },

  message: {
    fontSize: 16,
    textAlign: "center",
    color: "hsl(0 0% 40%)",
  },
});
