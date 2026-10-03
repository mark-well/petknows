import Button from "@/components/Button";
import CustomDatePicker from "@/components/CustomDatePicker";
import InputText from "@/components/InputText";
import { SelectListType } from "@/features/pet-registration/types";
import { useAuth } from "@/providers/AuthContext";
import useAddresses from "@/shared/hooks/useAddresses";
import { SignupFormType, UserSex } from "@/shared/types";
import { Checkbox, Host } from "@expo/ui";
import Ionicons from "@react-native-vector-icons/ionicons";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

type FormErrors = Partial<Record<keyof SignupFormType, string>>;

export default function Signup() {
  const { signUp, loading } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<SignupFormType>();
  const {
    provinces,
    cities,
    barangay,
    selectedProvince,
    selectedCity,
    setSelectedProvince,
    setSelectedCity,
    setSelectedBarangay,
  } = useAddresses();
  const [mappedProvince, setMappedProvince] = useState<SelectListType[]>([]);
  const [mappedCities, setMappedCities] = useState<SelectListType[]>([]);
  const [mappedBarangay, setMappedBarangay] = useState<SelectListType[]>([]);
  const userSex: UserSex[] = ["Male", "Female", "Other"];
  const mappedUserSex: SelectListType[] = userSex.map((s) => ({ key: s, value: s }));
  const [passwordNotMatch, setPasswordNotMatch] = useState<boolean>(false);
  const [invalidPhone, setInvalidPhone] = useState<boolean>(false);
  const [acceptPrivacyPolicy, setAcceptPrivacyPolicy] = useState<boolean>(false);

  useEffect(() => {
    setMappedProvince(provinces?.map((p) => ({ key: p.id, value: p.name ?? "" })) ?? []);
  }, [provinces]);

  useEffect(() => {
    setMappedCities(cities?.map((c) => ({ key: c.id, value: c.name ?? "" })) ?? []);
  }, [cities]);

  useEffect(() => {
    setMappedBarangay(barangay?.map((b) => ({ key: b.id, value: b.name ?? "" })) ?? []);
  }, [barangay]);

  // Sign up account
  const handleSignup = () => {
    handleSubmit((data) => {
      setPasswordNotMatch(false);
      setInvalidPhone(false);

      if (!passwordMatched(data.password, data.confirmPassword)) {
        setPasswordNotMatch(true);
        return;
      }

      if (!validateTenDigitPhone(data.contact_number ?? "")) {
        setInvalidPhone(true);
        return;
      }

      // Sign up
      signUp(data);
    })();
  };

  const passwordMatched = (password: string, confirmPassword: string) => {
    if (password === confirmPassword) return true;
    return false;
  };

  const validateTenDigitPhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "");
    if (!/^\d{11}$/.test(cleaned)) return false;
    return true;
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom", "top"]}>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        style={styles.mainContainer}
        contentContainerStyle={{ rowGap: 32 }}>
        {/* Hero */}
        <View style={styles.heroContainer}>
          <View style={styles.logo}>
            <Ionicons name="paw" size={32} color="#fff" />
          </View>
          <Text style={[styles.textDefault, styles.heading]}>Create Account</Text>
          <Text style={[{ color: "hsl(0, 0%, 40%)" }]}>Register for PetKnows</Text>
        </View>

        {/* Inputs */}
        <View style={styles.inputGroup}>
          <View style={styles.inputContainer}>
            <Text style={[styles.textDefault]}>
              Firt Name <Text style={{ color: "hsl(0 100% 50%)" }}>*</Text>
            </Text>
            <Controller
              control={control}
              name="first_name"
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <InputText
                  placeholder="Enter your first name"
                  style={[styles.input, formErrors.first_name && styles.inputDanger]}
                  value={value ?? ""}
                  onChangeText={onChange}
                />
              )}
            />
            {formErrors.first_name && <Text style={styles.errorText}>First name is required</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.textDefault]}>
              Last Name <Text style={{ color: "hsl(0 100% 50%)" }}>*</Text>
            </Text>
            <Controller
              control={control}
              name="last_name"
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <InputText
                  placeholder="Enter your last name"
                  style={[styles.input, formErrors.last_name && styles.inputDanger]}
                  value={value ?? ""}
                  onChangeText={onChange}
                />
              )}
            />
            {formErrors.last_name && <Text style={styles.errorText}>Last name is required</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.textDefault]}>Birth Date</Text>
            <Controller
              control={control}
              name="birth_date"
              render={({ field: { onChange } }) => (
                <CustomDatePicker
                  style={{ height: 50 }}
                  onConfirm={(date: Date) => onChange(date.toISOString().split("T")[0])}
                />
              )}
            />
          </View>

          <View style={{ gap: 8 }}>
            <Text style={{ color: "hsl(0 0% 32%)" }}>Sex</Text>
            <Controller
              control={control}
              name="sex"
              render={({ field: { onChange } }) => (
                <SelectList
                  data={mappedUserSex}
                  setSelected={(key: string) => {
                    onChange(key);
                    setSelectedBarangay(key);
                  }}
                  save="key"
                  inputStyles={{ textTransform: "capitalize" }}
                  dropdownTextStyles={{ textTransform: "capitalize" }}
                  search={false}
                />
              )}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.textDefault]}>
              Email <Text style={{ color: "hsl(0 100% 50%)" }}>*</Text>
            </Text>
            <Controller
              control={control}
              name="email"
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <InputText
                  placeholder="e.g. youremail@gmail.com"
                  style={[styles.input, formErrors.email && styles.inputDanger]}
                  value={value ?? ""}
                  onChangeText={onChange}
                />
              )}
            />
            {formErrors.email && <Text style={styles.errorText}>Email is required</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.textDefault]}>
              Phone <Text style={{ color: "hsl(0 100% 50%)" }}>*</Text>
            </Text>
            <Controller
              control={control}
              name="contact_number"
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <InputText
                  placeholder="e.g. 09123456789"
                  style={[styles.input, (formErrors.contact_number || invalidPhone) && styles.inputDanger]}
                  value={value ?? ""}
                  onChangeText={onChange}
                />
              )}
            />
            {formErrors.contact_number && <Text style={styles.errorText}>Phone number is required</Text>}
            {invalidPhone && <Text style={styles.errorText}>Invalid phone number</Text>}
          </View>

          <View style={{ gap: 16, marginTop: 8 }}>
            <View style={{ gap: 8 }}>
              <Text style={{ color: "hsl(0 0% 32%)" }}>Province</Text>
              <Controller
                control={control}
                name="province_id"
                render={({ field: { onChange } }) => (
                  <SelectList
                    data={mappedProvince}
                    setSelected={(key: string) => {
                      onChange(key);
                      setSelectedProvince(key);
                    }}
                    save="key"
                    inputStyles={{ textTransform: "capitalize" }}
                    dropdownTextStyles={{ textTransform: "capitalize" }}
                    search={false}
                  />
                )}
              />
            </View>

            <View style={{ gap: 8 }}>
              <Text style={{ color: "hsl(0 0% 32%)" }}>City</Text>
              <Controller
                control={control}
                name="city_id"
                render={({ field: { onChange } }) => {
                  if (!selectedProvince)
                    return (
                      <View style={styles.disabledSelectList}>
                        <Text style={{ color: "hsl(0, 0%, 60%)" }}>Select Option</Text>
                      </View>
                    );
                  return (
                    <SelectList
                      data={mappedCities}
                      setSelected={(key: string) => {
                        onChange(key);
                        setSelectedCity(key);
                      }}
                      save="key"
                      inputStyles={{ textTransform: "capitalize" }}
                      dropdownTextStyles={{ textTransform: "capitalize" }}
                      search={false}
                    />
                  );
                }}
              />
            </View>

            <View style={{ gap: 8 }}>
              <Text style={{ color: "hsl(0 0% 32%)" }}>Barangay</Text>
              <Controller
                control={control}
                name="barangay_id"
                render={({ field: { onChange } }) => {
                  if (!selectedCity)
                    return (
                      <View style={styles.disabledSelectList}>
                        <Text style={{ color: "hsl(0, 0%, 60%)" }}>Select Option</Text>
                      </View>
                    );
                  return (
                    <SelectList
                      data={mappedBarangay}
                      setSelected={(key: string) => {
                        onChange(key);
                        setSelectedBarangay(key);
                      }}
                      save="key"
                      inputStyles={{ textTransform: "capitalize" }}
                      dropdownTextStyles={{ textTransform: "capitalize" }}
                      search={false}
                    />
                  );
                }}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.textDefault]}>
              Password <Text style={{ color: "hsl(0 100% 50%)" }}>*</Text>
            </Text>
            <Controller
              control={control}
              name="password"
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <InputText
                  placeholder="Enter your password"
                  style={[styles.input, (formErrors.password || passwordNotMatch) && styles.inputDanger]}
                  value={value ?? ""}
                  onChangeText={onChange}
                  secureTextEntry={true}
                />
              )}
            />
            {formErrors.password && <Text style={styles.errorText}>Password is required</Text>}
            {passwordNotMatch && <Text style={styles.errorText}>Password does not match</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.textDefault]}>
              Confirm password <Text style={{ color: "hsl(0 100% 50%)" }}>*</Text>
            </Text>
            <Controller
              control={control}
              name="confirmPassword"
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <InputText
                  placeholder="Confirm your password"
                  style={[styles.input, (formErrors.confirmPassword || passwordNotMatch) && styles.inputDanger]}
                  value={value ?? ""}
                  onChangeText={onChange}
                  secureTextEntry={true}
                />
              )}
            />
            {formErrors.confirmPassword && <Text style={styles.errorText}>Confirm your password</Text>}
            {passwordNotMatch && <Text style={styles.errorText}>Password does not match</Text>}
          </View>
        </View>

        {/* Signup Button */}
        <View style={{ flex: 1, marginBottom: 40, gap: 16 }}>
          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <Host matchContents>
              <Checkbox value={acceptPrivacyPolicy} onValueChange={setAcceptPrivacyPolicy} />
            </Host>
            <Text style={{ flexShrink: 1, fontSize: 14 }}>
              I have read the{" "}
              <Link href={"/privacy-policy"} style={{ textDecorationLine: "underline", color: "#0000ff" }}>
                Data Privacy Notice
              </Link>{" "}
              and consent to the secure collection of my data for this academic study.
            </Text>
          </View>

          <Button onPress={handleSignup} disabled={loading || !acceptPrivacyPolicy}>
            Signup
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 32,
  },

  heroContainer: {
    justifyContent: "center",
    alignItems: "center",
    rowGap: 8,
  },

  logo: {
    backgroundColor: "hsl(19 100% 61%)",
    padding: 20,
    borderRadius: 24,
  },

  textDefault: {
    fontSize: 16,
    color: "hsl(0 0% 30%)",
  },

  heading: {
    fontSize: 28,
    fontWeight: "500",
  },

  subHeading: {
    fontSize: 18,
    fontWeight: "semibold",
  },

  inputGroup: {
    rowGap: 16,
  },

  inputSection: {
    rowGap: 8,
  },

  inputContainer: {
    rowGap: 8,
  },

  input: {
    height: 50,
  },

  inputDanger: {
    borderColor: "hsl(0 100% 60.2%)",
    backgroundColor: "hsl(0 100% 95%)",
  },

  errorText: {
    color: "hsl(0 100% 60.2%)",
    fontSize: 12,
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
