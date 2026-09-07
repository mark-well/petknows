import { useAuth } from "@/providers/AuthContext";
import useAddresses from "@/shared/hooks/useAddresses";
import formatAddress from "@/utils/formatAddress";
import formatJoinedDate from "@/utils/formatJoinedDate";
import { Host, Picker } from "@expo/ui";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";
import useUpdateUser from "../hooks/useUpdateUser";
import useUpdateUserAddress from "../hooks/useUpdateUserAddress";
import useUser from "../hooks/useUser";
import ToggleTwoIconButtons from "./ToggleTwoIconButtons";

type Props = {
  updateUserHook: ReturnType<typeof useUpdateUser>;
  updateAddressHook: ReturnType<typeof useUpdateUserAddress>;
};

export default function PersonalInformation({ updateUserHook, updateAddressHook }: Props) {
  const { userProfile } = useAuth();
  const { userAddress } = useUser();
  const { provinces, cities, barangay, setSelectedProvince, setSelectedCity, setSelectedBarangay } = useAddresses();
  const [editFirstName, setEditFirstName] = useState<boolean>(false);
  const [editLastName, setEditLastName] = useState<boolean>(false);
  const [editPhone, setEditPhone] = useState<boolean>(false);
  const [editAddress, setEditAddress] = useState<boolean>(false);

  useEffect(() => {
    if (userProfile) {
      updateAddressHook.reset({
        provinceId: userProfile.province_id ?? "",
        cityId: userProfile.city_id ?? "",
        barangayId: userProfile.barangay_id ?? "",
      });

      setSelectedProvince(userProfile.province_id ?? "");
      setSelectedCity(userProfile.city_id ?? "");
      setSelectedBarangay(userProfile.barangay_id ?? "");
    }
  }, [userProfile]);

  const toggleEditables = (currentState: boolean) => {
    if (currentState === true) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      <View style={styles.userDetailsWrapper}>
        <Text style={styles.groupLabel}>Personal Information</Text>
        <View style={styles.inputContainer}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowPlaceholder}>First Name</Text>
              <Controller
                control={updateUserHook.control}
                name="first_name"
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    value={value ?? ""}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onSubmitEditing={() => setEditFirstName(false)}
                    returnKeyType="done"
                    style={[styles.rowInput, editFirstName && styles.editableInput]}
                    editable={editFirstName}
                  />
                )}
              />
            </View>
            <ToggleTwoIconButtons
              toggle={editFirstName}
              onPress={() => setEditFirstName(() => toggleEditables(editFirstName))}
              icon1={<AntDesign name="close" size={18} color="hsl(19, 100%, 61%)" />}
              icon2={<FontAwesome5 name="pen" size={14} color="hsl(19, 100%, 61%)" />}
            />
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowPlaceholder}>Last Name</Text>
              <Controller
                control={updateUserHook.control}
                name="last_name"
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    value={value ?? ""}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onSubmitEditing={() => setEditLastName(false)}
                    returnKeyType="done"
                    style={[styles.rowInput, editLastName && styles.editableInput]}
                    editable={editLastName}
                  />
                )}
              />
            </View>
            <ToggleTwoIconButtons
              toggle={editLastName}
              onPress={() => setEditLastName(() => toggleEditables(editLastName))}
              icon1={<AntDesign name="close" size={18} color="hsl(19, 100%, 61%)" />}
              icon2={<FontAwesome5 name="pen" size={14} color="hsl(19, 100%, 61%)" />}
            />
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowPlaceholder}>Phone</Text>
              <Controller
                control={updateUserHook.control}
                name="contact_number"
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    value={value ?? ""}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onSubmitEditing={() => setEditPhone(false)}
                    returnKeyType="done"
                    style={[styles.rowInput, editPhone && styles.editableInput]}
                    editable={editPhone}
                  />
                )}
              />
            </View>
            <ToggleTwoIconButtons
              toggle={editPhone}
              onPress={() => setEditPhone(() => toggleEditables(editPhone))}
              icon1={<AntDesign name="close" size={18} color="hsl(19, 100%, 61%)" />}
              icon2={<FontAwesome5 name="pen" size={14} color="hsl(19, 100%, 61%)" />}
            />
          </View>
          <View>
            <Text style={styles.rowPlaceholder}>Date of Birth</Text>
            <TextInput
              value={formatJoinedDate(new Date(userProfile?.birth_date ?? ""))}
              editable={false}
              style={styles.rowInput}
            />
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowPlaceholder}>Address</Text>
              {!editAddress ? (
                <TextInput
                  value={formatAddress(
                    userAddress?.province?.name,
                    userAddress?.city?.name,
                    userAddress?.barangay?.name,
                  )}
                  editable={false}
                  style={[styles.rowInput, { textTransform: "capitalize" }]}
                />
              ) : (
                <View style={{ gap: 16, marginTop: 8 }}>
                  <View style={{ gap: 8 }}>
                    <Text style={{ color: "hsl(0 0% 32%)" }}>Province</Text>
                    <Controller
                      control={updateAddressHook.control}
                      name="provinceId"
                      render={({ field: { value, onChange } }) => (
                        <Host matchContents={{ vertical: true }} style={{ width: "100%" }} seedColor="#FF783A">
                          <Picker
                            selectedValue={value}
                            onValueChange={(value) => {
                              onChange(value);
                              setSelectedProvince(value);
                            }}
                            appearance="wheel">
                            {provinces?.map((province) => (
                              <Picker.Item
                                key={province.id}
                                label={`${province.name?.charAt(0).toUpperCase()}${province.name?.slice(1)}`}
                                value={province.id}
                              />
                            ))}
                          </Picker>
                        </Host>
                      )}
                    />
                  </View>

                  <View style={{ gap: 8 }}>
                    <Text style={{ color: "hsl(0 0% 32%)" }}>City</Text>
                    <Controller
                      control={updateAddressHook.control}
                      name="cityId"
                      render={({ field: { value, onChange } }) => (
                        <Host matchContents={{ vertical: true }} style={{ width: "100%" }} seedColor="#FF783A">
                          <Picker
                            selectedValue={value}
                            onValueChange={(value) => {
                              onChange(value);
                              setSelectedCity(value);
                            }}
                            appearance="wheel">
                            {cities?.map((city) => (
                              <Picker.Item
                                key={city.id}
                                label={`${city.name?.charAt(0).toUpperCase()}${city.name?.slice(1)}`}
                                value={city.id}
                              />
                            ))}
                          </Picker>
                        </Host>
                      )}
                    />
                  </View>

                  <View style={{ gap: 8 }}>
                    <Text style={{ color: "hsl(0 0% 32%)" }}>Barangay</Text>
                    <Controller
                      control={updateAddressHook.control}
                      name="barangayId"
                      render={({ field: { value, onChange } }) => (
                        <Host matchContents={{ vertical: true }} style={{ width: "100%" }} seedColor="#FF783A">
                          <Picker
                            selectedValue={value}
                            onValueChange={(value) => {
                              onChange(value);
                              setSelectedBarangay(value);
                            }}
                            appearance="wheel">
                            {barangay?.map((brgy) => (
                              <Picker.Item
                                key={brgy.id}
                                label={`${brgy.name?.charAt(0).toUpperCase()}${brgy.name?.slice(1)}`}
                                value={brgy.id}
                              />
                            ))}
                          </Picker>
                        </Host>
                      )}
                    />
                  </View>
                </View>
              )}
            </View>
            <ToggleTwoIconButtons
              toggle={editAddress}
              onPress={() => setEditAddress(() => toggleEditables(editAddress))}
              icon1={<AntDesign name="close" size={18} color="hsl(19, 100%, 61%)" />}
              icon2={<FontAwesome5 name="pen" size={14} color="hsl(19, 100%, 61%)" />}
            />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  rowInput: {
    fontSize: 16,
    fontWeight: "500",
    borderBottomWidth: 1,
    padding: 0,
    borderColor: "hsl(0 0% 82%)",
    width: "100%",
  },

  editableInput: {
    borderColor: "hsl(19, 100%, 61%)",
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

  inputContainer: {
    gap: 24,
  },

  rowPlaceholder: {
    fontSize: 14,
    color: "hsl(0 0% 32%)",
  },
});
