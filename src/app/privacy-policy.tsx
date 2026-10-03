import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PrivacyPolicyScreen() {
  return (
    <>
      <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
        <ScrollView style={styles.main} contentContainerStyle={{ gap: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>Terms and Data Privacy Notice</Text>
          <View style={{ gap: 8, paddingLeft: 16 }}>
            <Text style={styles.p}>
              This application is a thesis prototype for a lost pet detection system. By registering, you explicitly
              consent to the collection of your Name, Address, and Contact Number for system performance and load
              testing.
            </Text>
            <Text style={styles.p}>
              In accordance with the Data Privacy Act of 2012 (RA 10173), the researchers assure that your information
              will be kept highly secure, will never be shared with third parties, and will be used strictly for
              academic evaluation. All account data and registration logs will be permanently deleted after our final
              thesis defense.
            </Text>
            <Text style={styles.p}>
              All account data and registration logs will be permanently deleted after our final thesis defense.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: "column",
    padding: 16,
  },

  p: {
    fontSize: 16,
  },
});
