import Button from "@/components/Button";
import LoadingModal from "@/components/LoadingModal";
import { useAuth } from "@/providers/AuthContext";
import { SelectListType } from "@/types";
import Ionicons from "@react-native-vector-icons/ionicons";
import Lucide from "@react-native-vector-icons/lucide";
import { decode } from "base64-arraybuffer";
import { File } from "expo-file-system";
import * as FileSystem from "expo-file-system/legacy";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { supabase } from "../../../../lib/supabase";

type PetRegistrationForm = {
  petName?: string;
  petSpeciesId?: string;
  ownerId?: string;
  statusId?: string;
  placeOfRegistrationId?: string;
  avatarUrl?: string;
  embedding?: number[];
};

enum PetStatus {
  registered = "registered",
  missing = "missing",
}
export default function RegisterPetScreen() {
  const snnApiUrl = process.env.EXPO_PUBLIC_MODEL_BACKEND_URL;
  const { claims } = useAuth();
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<PetRegistrationForm>();
  const [selectedImage, setSelectedImage] = useState<
    ImagePicker.ImagePickerAsset | undefined
  >(undefined);
  const [provinces, setProvinces] = useState<SelectListType[]>([]);
  const [cities, setCities] = useState<SelectListType[]>([]);
  const [petSpecies, setPetSpecies] = useState<SelectListType[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>();
  const [selectedPetType, setSelectedPetType] = useState<string>();
  const [selectedCity, setSelectedCity] = useState<string>();
  const [selectedPetSpecies, setSelectedPetSpecies] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [registrationSuccess, setRegistrationSuccess] =
    useState<boolean>(false);
  const [registrationFailed, setRegistrationFailed] = useState<boolean>(false);
  const [showLoadingModal, setShowLoadingModal] = useState<boolean>(false);

  // Fetch provinces
  useEffect(() => {
    getProvinces();
  }, [selectedProvince]);

  // Fetch cities
  useEffect(() => {
    setCities([]);
    if (selectedProvince) getMunicipalities(selectedProvince);
  }, [selectedProvince]);

  const getProvinces = async () => {
    const { data, error } = await supabase
      .from("address_province")
      .select("key:id, value:name")
      .overrideTypes<SelectListType[]>();
    if (!error) {
      setProvinces(data ?? []);
    }
  };

  const getMunicipalities = async (provinceId: string) => {
    const { data, error } = await supabase
      .from("mao")
      .select("key:id, value:name, addresses (province_id)")
      .eq("addresses.province_id", provinceId)
      .overrideTypes<SelectListType[]>();
    if (!error) {
      setCities(data ?? []);
    }
  };

  const handleProvinceSelection = (key: string) => {
    setSelectedProvince(key);
  };

  const handleCitySelection = (key: string) => {
    setSelectedCity(key);
    setFormData({ ...formData, placeOfRegistrationId: key });
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
    }
  };

  const uploadPetAvatar = async (file: ImagePicker.ImagePickerAsset) => {
    const base64 = await convertImageToBase64(file);
    const contentType = file.mimeType || "image/jpeg";
    const fileName = `${Date.now()}_${file.fileName}`;

    const { data, error } = await supabase.storage
      .from("pet_avatars")
      .upload(`private/${fileName}`, decode(base64), {
        contentType: contentType,
      });

    if (!error) {
      return data;
    } else {
      console.log(error);
    }
  };

  const canProceedStep1 =
    formData?.petName &&
    formData.petSpeciesId &&
    formData.placeOfRegistrationId;
  const canSubmit = selectedImage;

  const registerPet = async () => {
    setShowLoadingModal(true);
    if (canProceedStep1 && canSubmit) {
      const petAvatarFromDb = await uploadPetAvatar(selectedImage);
      const statusId = await getPetStatusIdFromDb(PetStatus.registered);
      const petImageEmbedding: number[] = await getEmbedding(selectedImage);
      const completePetRecord = buildRegisterPetForm(
        claims?.sub,
        formData,
        petAvatarFromDb?.path,
        statusId,
        petImageEmbedding,
      );

      if (!petImageEmbedding) {
        // Alert.alert("Registration Failed", "Registration aborted");
        setRegistrationFailed(true);
        return;
      }

      try {
        setLoading(true);
        const { data, error } = await supabase.from("pets").insert({
          pet_type: completePetRecord.petSpecies,
          name: completePetRecord.petName,
          status: completePetRecord.petStatusId,
          owner: completePetRecord.ownerId,
          place_of_registration: completePetRecord.placeOfRegistrationId,
          avatar_url: completePetRecord.avatarUrl,
          embedding: toVectorLiteral(completePetRecord.embedding),
        });

        if (error) throw error;
        console.log(data);
        setRegistrationSuccess(true);
        resetInputs();
      } catch (e) {
        console.log(e);
        setRegistrationFailed(true);
      } finally {
        setLoading(false);
      }
    }
  };

  const resetInputs = () => {
    setFormData({});
    setSelectedImage(undefined);
    setSelectedPetSpecies(undefined);
    setSelectedPetType(undefined);
    setSelectedCity(undefined);
    setSelectedProvince(undefined);
    setStep(1);
  };

  const toVectorLiteral = (embedding: number[]): string =>
    `[${embedding.join(",")}]`;

  const buildRegisterPetForm = (
    user_id: string | undefined,
    formData: PetRegistrationForm,
    avatarUrl: string | undefined,
    petStatusId: string | undefined,
    embedding: number[],
  ) => {
    let data = {
      petName: formData.petName,
      petSpecies: formData.petSpeciesId,
      petStatusId: petStatusId,
      ownerId: user_id,
      placeOfRegistrationId: formData.placeOfRegistrationId,
      avatarUrl: avatarUrl,
      embedding: embedding,
    };

    return data;
  };

  const convertImageToBase64 = async (file: ImagePicker.ImagePickerAsset) => {
    return await FileSystem.readAsStringAsync(file.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
  };

  const getEmbedding = async (image: ImagePicker.ImagePickerAsset) => {
    const file = new File(image.uri);
    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const response = await fetch(`${snnApiUrl}/get_embedding`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data) return data.embedding;
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const getPetStatusIdFromDb = async (statusName: PetStatus) => {
    const { data, error } = await supabase
      .from("pet_status")
      .select("id, name")
      .eq("name", statusName)
      .single();

    if (!error) {
      return data.id;
    }
  };

  const closeLoadingModal = () => {
    setRegistrationSuccess(false);
    setLoading(false);
    setRegistrationFailed(false);
    setShowLoadingModal(false);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      {showLoadingModal && (
        <LoadingModal
          loading={loading}
          failed={registrationFailed}
          success={registrationSuccess}
          onClose={closeLoadingModal}
        />
      )}

      <View style={styles.stepBarContainer}>
        {[1, 2].map((s) => (
          <View
            key={s}
            style={[
              styles.stepBar,
              { backgroundColor: s <= step ? "#000" : "hsl(0, 0%, 80%)" },
            ]}
          ></View>
        ))}
      </View>

      {/* Main */}
      <View style={styles.main}>
        {/* First Step */}
        {step === 1 && (
          <View style={{ rowGap: 32 }}>
            <View style={{ rowGap: 16 }}>
              <View style={{ rowGap: 4, marginBottom: 16 }}>
                <Text style={{ fontSize: 24, fontWeight: "medium" }}>
                  Pet Information
                </Text>
                <Text style={{ color: "hsl(0, 0%, 30%)", fontSize: 16 }}>
                  Enter the pet's details
                </Text>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Pet Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter pet's name"
                  onChangeText={(text) =>
                    setFormData({ ...formData, petName: text })
                  }
                  value={formData?.petName}
                  placeholderTextColor="hsl(0 0% 60%)"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Species</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. dog, cat"
                  placeholderTextColor="hsl(0 0% 60%)"
                  onChangeText={(text) => {
                    setFormData({ ...formData, petSpeciesId: text });
                  }}
                />
              </View>
            </View>

            <View>
              <View style={{ rowGap: 8, marginBottom: 16 }}>
                <Text style={{ fontSize: 24, fontWeight: "medium" }}>
                  Place of Resitraion
                </Text>
                <Text style={{ color: "hsl(0, 0%, 30%)", fontSize: 16 }}>
                  Enter your address
                </Text>
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
                  <Text style={styles.inputLabel}>
                    Municipal Agriculture Office
                  </Text>
                  {selectedProvince ? (
                    <SelectList
                      data={cities}
                      setSelected={(key: string) => handleCitySelection(key)}
                      save="key"
                      inputStyles={{ textTransform: "capitalize" }}
                      dropdownTextStyles={{ textTransform: "capitalize" }}
                      search={false}
                    />
                  ) : (
                    <View style={styles.disabledSelectList}>
                      <Text style={{ color: "hsl(0, 0%, 60%)" }}>
                        Select Option
                      </Text>
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
              <Text style={{ fontSize: 24, fontWeight: "medium" }}>
                Pet Photo
              </Text>
              <Text style={{ color: "hsl(0, 0%, 30%)" }}>
                Upload an image of your pet
              </Text>
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
                    <Pressable onPress={() => setSelectedImage(undefined)}>
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
                  <Pressable onPress={pickImage}>
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
          <Button theme="primary" onPress={() => setStep(step - 1)}>
            Back
          </Button>
        )}
        {step < 2 && (
          <Button
            theme="primary"
            onPress={() => setStep(step + 1)}
            disabled={step === 1 && !canProceedStep1}
          >
            Next
          </Button>
        )}
        {step === 2 && (
          <Button
            theme="primary"
            onPress={registerPet}
            disabled={!canSubmit || loading}
          >
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
