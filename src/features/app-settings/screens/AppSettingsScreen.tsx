import LoadingModal from "@/components/LoadingModal";
import useUser from "@/features/user/hooks/useUser";
import { useAuth } from "@/providers/AuthContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import SettingsItem from "../components/SettingsItem";

export default function AppSettingsScreen() {
  const { signOut, loading, userProfile } = useAuth();
  const { profilePicture, profilePictureLoading } = useUser();

  const handleSignOut = async () => {
    signOut();
  };

  const navigateToUserDetailsScreen = () => {
    router.push("/user");
  };

  const navigateToUserAboutScreen = () => {
    router.push("/about");
  };

  return (
    <>
      {loading && <LoadingModal title="Signing Out" message="Signing you out, please wait..." />}
      <View style={styles.main}>
        <View style={styles.userInfoContainer}>
          {!profilePicture || profilePictureLoading ? (
            <View style={[styles.profilePicture, styles.profilePictureEmpty]}>
              <FontAwesome name="user" size={28} color="hsl(0 0% 48%)" />
            </View>
          ) : (
            <Image source={{ uri: profilePicture.publicUrl }} style={styles.profilePicture} />
          )}
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "hsl(0 0% 16%)",
              }}>{`Hi, ${userProfile?.first_name} ${userProfile?.last_name}`}</Text>
            <Text style={{ fontSize: 14, color: "hsl(0 0% 48%)" }}>{userProfile?.email}</Text>
          </View>
        </View>

        <View>
          <SettingsItem icon="user-circle-o" text="Personal Information" onPress={navigateToUserDetailsScreen} />
          <SettingsItem icon="info-circle" text="About Petknows" onPress={navigateToUserAboutScreen} />
          <SettingsItem icon="sign-out" text="Logout" onPress={handleSignOut} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  main: {
    paddingVertical: 8,
  },

  profilePicture: {
    width: 48,
    height: 48,
    aspectRatio: "1/1",
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: "hsl(19 100% 61%)",
  },

  profilePictureEmpty: {
    backgroundColor: "hsl(0 0% 82%)",
    justifyContent: "center",
    alignItems: "center",
  },

  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
});
