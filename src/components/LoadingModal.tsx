import Ionicons from "@react-native-vector-icons/ionicons";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import Button from "./Button";

type Props = {
  failed?: boolean;
  success?: boolean;
  loading?: boolean;
  onClose?: () => void;
};

export default function LoadingModal({
  failed,
  success,
  loading,
  onClose,
}: Props) {
  if (loading) {
    return (
      <>
        <View style={styles.backdrop}></View>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="hsl(15 100% 54%)" />
          <Text style={styles.title}>Loding...</Text>
          <Text style={styles.message}>
            Your pet is being registered, please be patient.
          </Text>
        </View>
      </>
    );
  } else if (success) {
    return (
      <>
        <View style={styles.backdrop}></View>
        <View style={styles.container}>
          <View style={styles.iconSuccess}>
            <Ionicons
              name="checkmark-sharp"
              size={48}
              color="hsl(111 100% 31.9%)"
            />
          </View>
          <Text style={styles.title}>Registraion Successful.</Text>
          <Text style={styles.message}>Your pet is now registered.</Text>
          <Button onPress={onClose} style={styles.button}>
            Continue
          </Button>
        </View>
      </>
    );
  } else if (failed) {
    return (
      <>
        <View style={styles.backdrop}></View>
        <View style={styles.container}>
          <View style={styles.iconFailed}>
            <Ionicons name="close" size={48} color="hsl(0 100% 41.5%)" />
          </View>
          <Text style={styles.title}>Registraion failed.</Text>
          <Text style={styles.message}>
            Your pet wasn't able to be registered.
          </Text>
          <Button onPress={onClose} style={styles.button}>
            Continue
          </Button>
        </View>
      </>
    );
  }
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

  button: {
    flex: 0,
    width: "100%",
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

  iconFailed: {
    backgroundColor: "hsl(0 100% 91.1%)",
    padding: 16,
    borderRadius: "50%",
  },

  iconSuccess: {
    backgroundColor: "hsl(111 100% 91.1%)",
    padding: 16,
    borderRadius: "50%",
  },
});
