import { Controller } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import TextInput from "../../../components/InputText";
import { PetRegistrationStepProp } from "../types";

export default function FirstStepPetRegistration({ registerPet }: PetRegistrationStepProp) {
  const { control, provinces, selectedProvince, updateSelectedProvice, municipalAgricultureOffices } = registerPet;

  // === HANDLERS ===
  const handleProvinceSelection = (key: string) => {
    updateSelectedProvice(key);
  };

  return (
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
            name="petType"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="e.g. dog, cat"
                placeholderTextColor="hsl(0 0% 60%)"
                value={value}
                onChangeText={(text: string) => onChange(text.toLowerCase())}
              />
            )}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Breed</Text>
          <Controller
            control={control}
            name="breed"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Enter breed"
                placeholderTextColor="hsl(0 0% 60%)"
                value={value}
                onChangeText={(text: string) => onChange(text.toLowerCase())}
              />
            )}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Color</Text>
          <Controller
            control={control}
            name="color"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Enter the dominant color"
                placeholderTextColor="hsl(0 0% 60%)"
                value={value}
                onChangeText={(text: string) => onChange(text.toLowerCase())}
              />
            )}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Description</Text>
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Enter additional info (optional)"
                placeholderTextColor="hsl(0 0% 60%)"
                value={value}
                onChangeText={(text: string) => onChange(text.toLowerCase())}
              />
            )}
          />
        </View>
      </View>

      <View>
        <View style={{ rowGap: 8, marginBottom: 16 }}>
          <Text style={{ fontSize: 24, fontWeight: "medium" }}>Place of Registration</Text>
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
                render={({ field: { onChange } }) => (
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
  );
}

const styles = StyleSheet.create({
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

  disabledSelectList: {
    width: "100%",
    height: 46,
    borderColor: "hsl(0, 0%, 80%)",
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
});
