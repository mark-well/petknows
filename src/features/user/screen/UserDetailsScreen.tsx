import ActivityStatus from "@/components/ActivityStatus";
import { useAuth } from "@/providers/AuthContext";
import CustomButton from "@/shared/components/CustomButton";
import formatJoinedDate from "@/utils/formatJoinedDate";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useQueryClient } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import PersonalInformation from "../components/PersonalInformation";
import useUpdateUser from "../hooks/useUpdateUser";
import useUpdateUserAddress from "../hooks/useUpdateUserAddress";
import useUser from "../hooks/useUser";

export default function UserDetailsScreen() {
  const { userProfile } = useAuth();
  const queryClient = useQueryClient();
  const { profilePicture, profilePictureLoading } = useUser();
  const updateUserHook = useUpdateUser();
  const updateUserAddressHook = useUpdateUserAddress();
  const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);
  const [updateFailed, setUpdateFailed] = useState<boolean>(false);

  const handleSave = () => {
    updateUserHook.handleSubmit((data) => {
      // updateUserHook.submit(data);
      if (!userProfile || !userProfile.id) throw new Error("No user id");
      updateUserHook.updateMutation.mutate(
        { user_id: userProfile.id, updatedData: data },
        {
          onSuccess: () => {
            setUpdateSuccess(true);
            queryClient.invalidateQueries({ queryKey: ["userProfile"] });
          },
          onError: () => setUpdateFailed(true),
        },
      );
    })();
    updateUserAddressHook.handleSubmit((data) => updateUserAddressHook.submit(data))();
  };

  return (
    <>
      <Stack.Screen options={{ title: "Personal Information" }} />
      {/* ACTIVITY MODALS */}
      {updateSuccess && (
        <ActivityStatus
          status="success"
          title="Updated"
          message="Your changes resolved successfully."
          onClose={() => setUpdateSuccess(false)}
        />
      )}
      {updateFailed && (
        <ActivityStatus
          status="failed"
          title="Failed"
          message="Something went wrong."
          onClose={() => setUpdateFailed(false)}
        />
      )}
      <SafeAreaView edges={["bottom"]}>
        <KeyboardAwareScrollView extraScrollHeight={20} keyboardShouldPersistTaps="handled">
          <View style={styles.main}>
            <View style={styles.hero}>
              <View style={{ alignItems: "center", gap: 4 }}>
                {!profilePicture || profilePictureLoading ? (
                  <View style={[styles.profilePicture, styles.profilePictureEmpty]}>
                    <FontAwesome name="user" size={52} color="hsl(0 0% 48%)" />
                  </View>
                ) : (
                  <Image source={{ uri: profilePicture.publicUrl }} style={styles.profilePicture} />
                )}
                <Pressable
                  style={({ pressed }) => [
                    styles.changePhotoButton,
                    pressed && { backgroundColor: "hsl(10 100% 82%)" },
                  ]}>
                  <View style={{ flexDirection: "row", gap: 8, justifyContent: "center" }}>
                    <Text style={{ color: "hsl(19, 100%, 50%)", fontSize: 12 }}>Change Photo</Text>
                    <FontAwesome6 name="pen-to-square" size={14} color="hsl(19 100% 50%)" />
                  </View>
                </Pressable>
              </View>
              <View style={styles.userNameContainer}>
                <Text style={styles.userNameText}>{`${userProfile?.first_name} ${userProfile?.last_name}`}</Text>
                <Text style={styles.emailText}>{userProfile?.email}</Text>
              </View>
            </View>

            {/* USER DETAILS */}
            <PersonalInformation updateUserHook={updateUserHook} updateAddressHook={updateUserAddressHook} />
            <View style={styles.userDetailsWrapper}>
              <Text style={styles.groupLabel}>Other</Text>
              <View>
                <View>
                  <Text style={styles.rowPlaceholder}>Joined On</Text>
                  <TextInput
                    value={formatJoinedDate(new Date(userProfile?.created_at ?? ""))}
                    editable={false}
                    style={styles.rowInput}
                  />
                </View>
              </View>
              <CustomButton disabled={updateUserHook.updateMutation.isPending} onPress={handleSave}>
                Save
              </CustomButton>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingVertical: 32,
    gap: 32,
  },

  hero: {
    width: "100%",
    gap: 16,
  },

  userDetailsWrapper: {
    paddingHorizontal: 16,
    gap: 16,
  },

  groupLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "hsl(19, 100%, 61%)",
  },

  rowPlaceholder: {
    fontSize: 14,
    color: "hsl(0 0% 32%)",
  },

  rowInput: {
    fontSize: 16,
    fontWeight: "500",
    borderBottomWidth: 1,
    padding: 0,
    borderColor: "hsl(0 0% 82%)",
    width: "100%",
  },

  userNameContainer: {
    alignItems: "center",
  },

  userNameText: {
    fontSize: 22,
    fontWeight: "500",
    textTransform: "uppercase",
  },

  emailText: {
    fontSize: 14,
    color: "hsl(0 0% 32%)",
  },

  changePhotoButton: {
    backgroundColor: "hsl(10 100% 92%)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },

  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    aspectRatio: "1/1",
    borderWidth: 1,
    borderColor: "hsl(19 100% 61%)",
  },

  profilePictureEmpty: {
    backgroundColor: "hsl(0 0% 82%)",
    justifyContent: "center",
    alignItems: "center",
  },
});
