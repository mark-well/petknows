import Button from "@/components/Button";
import { useAuth } from "@/providers/AuthContext";
import Ionicons from "@react-native-vector-icons/ionicons";
import Lucide from "@react-native-vector-icons/lucide";
import { Image } from "expo-image";
import { Controller } from "react-hook-form";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { useRegisterPet } from "../hooks/useRegisterPet";
import { RegisterPetForm } from "../types";

export default function RegisterPetScreen() {
  const { claims } = useAuth();
  const {
    step,
    previousStep,
    nextStep,
    handleImagePicker,
    selectedImage,
    removeSelectedImage,
    selectedProvince,
    provinces,
    updateSelectedProvice,
    municipalAgricultureOffices,
    control,
    watch,
    handleSubmit,
  } = useRegisterPet();

  // === HANDLERS ===
  const handleProvinceSelection = (key: string) => {
    updateSelectedProvice(key);
  };

  const canProceedStep1 = watch("petName") && watch("petSpeciesId") && watch("placeOfRegistrationId");
  const canSubmit = selectedImage;
  const onSubmit = async (data: RegisterPetForm) => {
    console.log(data);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.stepBarContainer}>
        {[1, 2].map((s) => (
          <View key={s} style={[styles.stepBar, { backgroundColor: s <= step ? "#000" : "hsl(0, 0%, 80%)" }]}></View>
        ))}
      </View>

      {/* Main */}
      <View style={styles.main}>
        {/* First Step */}
        {step === 1 && (
          <View style={{ rowGap: 32 }}>
            <View style={{ rowGap: 16 }}>
              <View style={{ rowGap: 4, marginBottom: 16 }}>
                <Text style={{ fontSize: 24, fontWeight: "medium" }}>Pet Information</Text>
                <Text style={{ color: "hsl(0, 0%, 30%)", fontSize: 16 }}>Enter the pet's details</Text>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Pet Name</Text>
                <Controller
                  control={control}
                  name="petName"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="Enter pet's name"
                      onChangeText={onChange}
                      value={value}
                      placeholderTextColor="hsl(0 0% 60%)"
                    />
                  )}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Species</Text>
                <Controller
                  control={control}
                  name="petSpeciesId"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="e.g. dog, cat"
                      placeholderTextColor="hsl(0 0% 60%)"
                      value={value}
                      onChangeText={onChange}
                    />
                  )}
                />
              </View>
            </View>

            <View>
              <View style={{ rowGap: 8, marginBottom: 16 }}>
                <Text style={{ fontSize: 24, fontWeight: "medium" }}>Place of Resitraion</Text>
                <Text style={{ color: "hsl(0, 0%, 30%)", fontSize: 16 }}>Enter your address</Text>
              </View>

              <View style={{ rowGap: 16 }}>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Province</Text>
                  <SelectList
                    data={provinces}
                    setSelected={(key: string) => handleProvinceSelection(key)}
                    save="key"
                    inputStyles={{ textTransform: "capitalize" }}
                    dropdownTextStyles={{ textTransform: "capitalize" }}
                    search={false}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Municipal Agriculture Office</Text>
                  {selectedProvince ? (
                    <Controller
                      control={control}
                      name="placeOfRegistrationId"
                      render={({ field: { onChange, value } }) => (
                        <SelectList
                          data={municipalAgricultureOffices}
                          setSelected={(key: string) => onChange(key)}
                          save="key"
                          inputStyles={{ textTransform: "capitalize" }}
                          dropdownTextStyles={{ textTransform: "capitalize" }}
                          search={false}
                        />
                      )}
                    />
                  ) : (
                    <View style={styles.disabledSelectList}>
                      <Text style={{ color: "hsl(0, 0%, 60%)" }}>Select Option</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Second Step */}
        {step === 2 && (
          <View style={{ display: "flex", flex: 1 }}>
            <View style={{ rowGap: 4 }}>
              <Text style={{ fontSize: 24, fontWeight: "medium" }}>Pet Photo</Text>
              <Text style={{ color: "hsl(0, 0%, 30%)" }}>Upload an image of your pet</Text>
            </View>

            {selectedImage ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: "80%",
                  }}
                >
                  <View
                    style={{
                      zIndex: 2,
                      position: "absolute",
                      padding: 8,
                      backgroundColor: "hsl(0 100% 60%)",
                      borderRadius: "50%",
                      right: -10,
                      top: -10,
                    }}
                  >
                    <Pressable onPress={removeSelectedImage}>
                      <Ionicons name="close" size={24} color="hsl(0 0% 100%)" />
                    </Pressable>
                  </View>
                  <Image
                    style={{
                      resizeMode: "cover",
                      aspectRatio: "1/1",
                      borderRadius: 16,
                    }}
                    source={selectedImage.uri}
                  />
                </View>
              </View>
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <View style={styles.uploadButtonContainer}>
                  <Pressable onPress={handleImagePicker}>
                    <Lucide name="upload" size={64} color="hsl(0, 0%, 60%)" />
                  </Pressable>
                </View>
              </View>
            )}
          </View>
        )}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        {step > 1 && (
          <Button theme="primary" onPress={previousStep}>
            Back
          </Button>
        )}
        {step < 2 && (
          <Button theme="primary" onPress={nextStep} disabled={step === 1 && !canProceedStep1}>
            Next
          </Button>
        )}
        {step === 2 && (
          <Button theme="primary" onPress={handleSubmit(onSubmit)} disabled={!canSubmit}>
            Rigister
          </Button>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    display: "flex",
  },

  stepBarContainer: {
    width: "100%",
    flexDirection: "row",
    columnGap: 4,
    paddingBottom: 32,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },

  stepBar: {
    flex: 1,
    height: 4,
    borderRadius: 32,
  },

  main: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  inputContainer: {
    rowGap: 4,
  },

  inputLabel: {
    fontSize: 16,
  },

  input: {
    width: "100%",
    height: 50,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "hsl(0, 0%, 85%)",
    backgroundColor: "hsl(0, 0%, 90%)",
    fontSize: 16,
  },

  uploadButtonContainer: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "hsl(0, 0%, 60%)",
    padding: 32,
    borderRadius: 8,
  },

  disabledSelectList: {
    width: "100%",
    height: 46,
    borderColor: "hsl(0, 0%, 80%)",
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 16,
  },

  footer: {
    width: "100%",
    borderTopWidth: 1.5,
    borderColor: "hsl(0, 0%, 85%)",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    columnGap: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});
