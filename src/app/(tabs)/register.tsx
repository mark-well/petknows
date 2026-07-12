import Button from "@/components/Button";
import Ionicons from "@react-native-vector-icons/ionicons";
import Lucide from "@react-native-vector-icons/lucide";
import { decode } from "base64-arraybuffer";
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
import { supabase } from "../../../lib/supabase";

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

type SelectListType = {
  key: string;
  value: string;
};

export default function Register() {
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

  // Fetch provinces
  useEffect(() => {
    getProvinces();
  }, [selectedProvince]);

  // Fetch cities
  useEffect(() => {
    setCities([]);
    if (selectedProvince) getMunicipalities(selectedProvince);
  }, [selectedProvince]);

  // Fetch pet species
  useEffect(() => {
    getPetSpecies();
  }, []);

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
      .from("municipalities")
      .select("key:id, value:name")
      .eq("province", provinceId)
      .overrideTypes<SelectListType[]>();
    if (!error) {
      setCities(data ?? []);
    }
  };

  const getPetSpecies = async () => {
    const { data, error } = await supabase
      .from("pet_type")
      .select("key:id, value:name")
      .overrideTypes<SelectListType[]>();
    if (!error) {
      setPetSpecies(data ?? []);
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

  const canProceedStep1 =
    formData?.petName &&
    formData.petSpeciesId &&
    formData.placeOfRegistrationId;
  const canSubmit = selectedImage;

  const registerPet = async () => {
    if (canProceedStep1 && canSubmit) {
      const petAvatarFromDb = await uploadPetAvatar(selectedImage);
      const statusId = await getPetStatusIdFromDb(PetStatus.registered);
      const completePetRecord = buildRegisterPetForm(
        formData,
        petAvatarFromDb?.path,
        statusId,
        [
          -0.018724544, 0.0871729, -0.1338118, 0.24561365, -0.0108350925,
          0.01926025, 0.09412708, 0.19504897, -0.06505953, -0.01001002,
          0.13896921, -0.043924224, 0.016643455, -0.06955613, -0.016381823,
          0.11011992, -0.05095357, 0.009413234, 0.024169184, -0.037141968,
          -0.12720415, -0.12939934, -0.09602696, -0.048552617, -0.13127334,
          -0.17314415, -0.0026629816, -0.15020667, -0.03952566, -0.04382802,
          0.14478123, 0.09656204, -0.049164396, 0.06667282, -0.03793976,
          0.060693976, -0.01161344, 0.096060686, 0.072679006, -0.15139507,
          0.0039623957, -0.1412226, 0.05238393, 0.0045834216, 0.15702435,
          -0.058405098, 0.098531544, -0.02498881, -0.046516, -0.07364081,
          -0.034715533, -0.07524352, 0.0026773424, 0.016683629, 0.01937853,
          0.020065058, -0.049041618, 0.17989154, 0.0201712, -0.07567347,
          -0.017638657, 0.056118302, 0.05148049, 0.051670425, 0.111042894,
          0.112765275, 0.07729869, 0.034142613, 0.049187686, 0.032354448,
          0.0033249746, -0.017411683, -0.084852874, 0.074786134, -0.033911124,
          0.108146034, 0.18113731, 0.004715255, 0.040752836, 0.044108223,
          0.19789125, 0.034513433, -0.09932174, 0.04851853, 0.0038872752,
          0.055277817, 0.028886179, 0.12419873, -0.014938769, -0.02669604,
          0.21174173, 0.018644162, -0.07833555, -0.069901496, -0.00581578,
          -0.007438498, -0.14577791, -0.09476656, 0.12729424, 0.016608737,
          -0.05513015, -0.10585093, 0.09114717, 0.033886686, -0.0026676871,
          -0.05077771, -0.01941989, 0.06543434, 0.023029046, -0.034317747,
          -0.007958519, 0.010344064, 0.19510737, -0.06683947, 0.009731004,
          0.077590734, -0.21087244, 0.018573664, 0.100717746, -0.12431518,
          -0.15657404, 0.0019534305, -0.05297001, -0.12865219, 0.070936695,
          0.026608618, -0.12076236, 0.069251925,
        ],
      );

      const { data, error } = await supabase.from("pets").insert({
        type: completePetRecord.petSpecies,
        name: completePetRecord.petName,
        status: completePetRecord.petStatusId,
        owner: completePetRecord.ownerId,
        place_of_registration: completePetRecord.placeOfRegistrationId,
        avatar_url: completePetRecord.avatarUrl,
        embedding: completePetRecord.embedding,
      });

      // TODO: ADD LOADING BARRR
      if (!error) {
      } else {
      }
    }
  };

  const buildRegisterPetForm = (
    formData: PetRegistrationForm,
    avatarUrl: string | undefined,
    petStatusId: string,
    embedding: number[],
  ) => {
    let data = {
      petName: formData.petName,
      petSpecies: formData.petSpeciesId,
      petStatusId: petStatusId,
      ownerId: "ca56cd1c-619e-4274-b3bc-3db09ffb8418",
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

  const uploadPetAvatar = async (file: ImagePicker.ImagePickerAsset) => {
    const base64 = await convertImageToBase64(file);
    const contentType = file.mimeType || "image/jpeg";
    const fileName = `${Date.now()}_${file.fileName}`;

    const { data, error } = await supabase.storage
      .from("pet_avatars")
      .upload(`public/${fileName}`, decode(base64), {
        contentType: contentType,
      });

    if (!error) {
      return data;
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

  const generateEmbedding = async () => {};

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
    >
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
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Species</Text>
                <SelectList
                  data={petSpecies}
                  setSelected={(key: string) =>
                    setFormData({ ...formData, petSpeciesId: key })
                  }
                  save="key"
                  inputStyles={{ textTransform: "capitalize" }}
                  dropdownTextStyles={{ textTransform: "capitalize" }}
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
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>City</Text>
                  {selectedProvince ? (
                    <SelectList
                      data={cities}
                      setSelected={(key: string) => handleCitySelection(key)}
                      save="key"
                      inputStyles={{ textTransform: "capitalize" }}
                      dropdownTextStyles={{ textTransform: "capitalize" }}
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
          <Button theme="primary" onPress={registerPet} disabled={!canSubmit}>
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
