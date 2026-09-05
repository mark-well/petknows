import ActivityStatus from "@/components/ActivityStatus";
import LoadingModal from "@/components/LoadingModal";
import CustomButton from "@/shared/components/CustomButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import getPetImages from "../api/getPetImages";
import getSinglePet from "../api/getSinglePet";
import PetStatusBadge from "../components/PetStatusBadge";
import useUpdatePet from "../hooks/useUpdatePet";

type Props = {
  petId: string;
};

export default function PetDetailsScreen({ petId }: Props) {
  const queryClient = useQueryClient();
  const { control, reset, submit, handleSubmit, isPending: updatePending } = useUpdatePet(petId);
  const [editDetails, setEditDetails] = useState<boolean>(false);
  const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);
  const [updateFailed, setUpdateFailed] = useState<boolean>(false);

  // Get the pet
  const { data: pet, isPending: petLoading } = useQuery({
    queryKey: ["getPet", petId],
    queryFn: () => getSinglePet(petId!),
    enabled: Boolean(petId),
  });

  // Set the form default
  useEffect(() => {
    if (pet) {
      reset({
        name: pet.name,
        pet_type: pet.pet_type,
        breed: pet.breed,
        color: pet.color,
        description: pet.description,
      });
    }
  }, [pet, reset]);

  // Get the pet images
  const { data: petImages } = useQuery({
    queryKey: ["getPetImages", petId],
    queryFn: () => getPetImages(petId!),
    enabled: Boolean(petId),
  });

  const onRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["getPet"] });
  };

  const toggleEditDetails = () => {
    if (editDetails) {
      setEditDetails(false);
    } else {
      setEditDetails(true);
    }
  };

  const handleUpdate = () => {
    handleSubmit((data) =>
      submit(data, {
        onSuccess: () => {
          setEditDetails(false);
          setUpdateSuccess(true);
          queryClient.invalidateQueries({ queryKey: ["getPet", petId] });
        },
      }),
    )();
  };

  if (petLoading) return <Text>Loading...</Text>;
  if (!pet) return <Text>Pet not found!</Text>;
  return (
    <>
      <Stack.Screen options={{ title: "Pet Details" }} />
      {/* Activity Indicators */}
      {updatePending && <LoadingModal title="Updating..." message="Updating pet details, please wait." />}
      {updateSuccess && (
        <ActivityStatus
          status="success"
          title="Update Success"
          message="Your pet details has been successfully updated."
          onClose={() => setUpdateSuccess(false)}
        />
      )}
      {updateFailed && (
        <ActivityStatus
          status="failed"
          title="Update Failed"
          message="Pet details failed to be updated."
          onClose={() => setUpdateFailed(false)}
        />
      )}
      <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <KeyboardAwareScrollView
            style={style.rootContainer}
            contentContainerStyle={style.rootContainerContent}
            enableOnAndroid
            extraScrollHeight={20}
            keyboardShouldPersistTaps="handled"
            refreshControl={<RefreshControl refreshing={petLoading} onRefresh={onRefresh} />}>
            {/* ===== PHOTO DISPLAY ===== */}
            <View style={style.photoDisplayContainer}>
              <View style={{ borderBottomWidth: 1, borderColor: "hsl(0 0% 64%)", paddingBottom: 8 }}>
                <Text style={style.petNameText}>{pet.name}</Text>
                <Text>{`Registered on: ${new Date(pet.created_at).toLocaleDateString()}`}</Text>
              </View>

              {pet.publicAvatarUrl ? (
                <Image
                  source={pet.publicAvatarUrl ? { uri: pet.publicAvatarUrl } : require("@/assets/images/icon.png")}
                  style={style.avatar}
                />
              ) : (
                <View style={[style.avatar, style.emptyAvatar]}>
                  <Text style={{ fontSize: 24, fontWeight: 500, color: "hsl(0 0% 48%)" }}>No Avatar</Text>
                </View>
              )}

              {/* Images */}
              <View style={style.imagesContainer}>
                {petImages?.map((image) => (
                  <Image
                    key={image.publicUrl}
                    source={image.publicUrl ? { uri: image.publicUrl } : require("@/assets/images/icon.png")}
                    style={style.image}
                  />
                ))}

                {Array.from({ length: Math.max(0, 5 - (petImages?.length ?? 0)) }).map((_, index) => (
                  <View key={`empty-${index}`} style={[style.image, style.emptyImage]}></View>
                ))}
              </View>
            </View>

            {/* === PET DESCRIPTION === */}
            <View>
              <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 16 }}>
                <View style={{ height: 1, width: "100%", backgroundColor: "hsl(0 0% 64%)" }} />
                <Text style={{ fontSize: 18, color: "hsl(0 0% 32%)" }}>Description</Text>
                <View style={{ height: 1, width: "100%", backgroundColor: "hsl(0 0% 64%)" }} />
              </View>

              <Controller
                control={control}
                name="description"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    multiline={true}
                    style={[style.petDetailsItem, { fontSize: 16, width: "100%", minHeight: 100 }]}
                    value={value ?? ""}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    editable={editDetails}
                  />
                )}
              />
            </View>

            {/* ===== PET DETAILS ===== */}
            <View style={style.petDetailsContainer}>
              <View style={style.petDetailsHeader}>
                <Text style={{ fontSize: 20, fontWeight: 500, color: "hsl(0 0% 42%)" }}>Details</Text>
                <View style={{ flexDirection: "row", gap: 16, justifyContent: "center", alignItems: "center" }}>
                  {editDetails && (
                    <CustomButton onPress={handleUpdate} disabled={updatePending}>
                      Update
                    </CustomButton>
                  )}
                  <Pressable onPress={toggleEditDetails}>
                    {editDetails ? (
                      <AntDesign name="close" size={22} color="hsl(0 0% 32%)" />
                    ) : (
                      <FontAwesome5 name="pen" size={18} color="hsl(0 0% 32%)" />
                    )}
                  </Pressable>
                </View>
              </View>

              <View style={style.petDetailsRow}>
                <View style={style.petDetailsColumnKey}>
                  <Text style={style.petDetailsItemKey}>ID:</Text>
                </View>
                <View style={style.petDetailsColumnValue}>
                  <TextInput style={style.petDetailsItem} defaultValue={pet.public_id} editable={false} />
                </View>
              </View>

              <View style={style.petDetailsRow}>
                <View style={style.petDetailsColumnKey}>
                  <Text style={style.petDetailsItemKey}>Name:</Text>
                </View>
                <View style={style.petDetailsColumnValue}>
                  <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={style.petDetailsItem}
                        value={value ?? ""}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        editable={editDetails}
                      />
                    )}
                  />
                </View>
              </View>

              <View style={style.petDetailsRow}>
                <View style={style.petDetailsColumnKey}>
                  <Text style={style.petDetailsItemKey}>Species:</Text>
                </View>
                <View style={style.petDetailsColumnValue}>
                  <Controller
                    control={control}
                    name="pet_type"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={[style.petDetailsItem, { textTransform: "capitalize" }]}
                        value={value ?? ""}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        editable={editDetails}
                      />
                    )}
                  />
                </View>
              </View>

              <View style={style.petDetailsRow}>
                <View style={style.petDetailsColumnKey}>
                  <Text style={style.petDetailsItemKey}>Breed:</Text>
                </View>
                <View style={style.petDetailsColumnValue}>
                  <Controller
                    control={control}
                    name="breed"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={style.petDetailsItem}
                        value={value ?? ""}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        editable={editDetails}
                      />
                    )}
                  />
                </View>
              </View>

              <View style={style.petDetailsRow}>
                <View style={style.petDetailsColumnKey}>
                  <Text style={style.petDetailsItemKey}>Color:</Text>
                </View>
                <View style={style.petDetailsColumnValue}>
                  <Controller
                    control={control}
                    name="color"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={style.petDetailsItem}
                        value={value ?? ""}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        editable={editDetails}
                      />
                    )}
                  />
                </View>
              </View>

              <View style={style.petDetailsRow}>
                <View style={style.petDetailsColumnKey}>
                  <Text style={style.petDetailsItemKey}>Status:</Text>
                </View>
                <View style={[style.petDetailsColumnValue, { paddingVertical: 6 }]}>
                  <PetStatusBadge status={pet.status ?? "registered"} />
                </View>
              </View>

              <View style={style.petDetailsRow}>
                <View style={style.petDetailsColumnKey}>
                  <Text style={style.petDetailsItemKey}>Registered:</Text>
                </View>
                <View style={style.petDetailsColumnValue}>
                  <TextInput
                    style={style.petDetailsItem}
                    defaultValue={new Date(pet.created_at).toLocaleDateString()}
                    editable={false}
                  />
                </View>
              </View>

              <View style={style.petDetailsRow}>
                <View style={style.petDetailsColumnKey}>
                  <Text style={style.petDetailsItemKey}>MAO:</Text>
                </View>
                <View style={style.petDetailsColumnValue}>
                  <TextInput style={style.petDetailsItem} defaultValue={pet.mao?.name ?? ""} editable={false} />
                </View>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const style = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },

  rootContainerContent: {
    gap: 16,
    padding: 16,
  },

  photoDisplayContainer: {
    gap: 16,
  },

  avatar: {
    width: "100%",
    height: 280,
    borderRadius: 6,
    objectFit: "cover",
  },

  emptyAvatar: {
    backgroundColor: "hsl(0 0% 86%)",
    justifyContent: "center",
    alignItems: "center",
  },

  petNameText: {
    fontSize: 24,
    fontWeight: "500",
  },

  imagesContainer: {
    gap: 8,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
  },

  image: {
    width: 84,
    height: 84,
    aspectRatio: "1/1",
    borderRadius: 6,
    objectFit: "cover",
  },

  emptyImage: {
    backgroundColor: "hsl(0 0% 86%)",
    borderRadius: 6,
    borderColor: "hsl(0 0% 64%)",
    borderWidth: 0.5,
  },

  petDetailsContainer: {
    borderRadius: 6,
    borderColor: "hsl(0 0% 64%)",
    borderWidth: 0.5,
  },

  petDetailsHeader: {
    backgroundColor: "hsl(0 0% 86%)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderColor: "hsl(0 0% 64%)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  petDetailsRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "hsl(0 0% 64%)",
  },

  petDetailsItem: {
    fontSize: 16,
    width: "100%",
    color: "#000",
  },

  petDetailsItemKey: {
    fontSize: 16,
    fontWeight: "500",
    color: "hsl(0 0% 32%)",
  },

  petDetailsColumnKey: {
    width: "30%",
  },

  petDetailsColumnValue: {
    width: "70%",
    alignItems: "flex-start",
  },
});
