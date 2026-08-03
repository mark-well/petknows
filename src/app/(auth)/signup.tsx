import Button from "@/components/Button";
import CustomDatePicker from "@/components/CustomDatePicker";
import InputText from "@/components/InputText";
import { useAuth } from "@/providers/AuthContext";
import { SignupFormType } from "@/types";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type FormErrors = Partial<Record<keyof SignupFormType, string>>;

export default function Signup() {
  const { signUp, loading } = useAuth();
  const [form, setForm] = useState<SignupFormType>({
    firstName: "",
    lastName: "",
    birthDate: null,
    fullAddress: "",
    contactNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Sign up account
  const handleSumbit = () => {
    if (validateForm()) {
      signUp(form);
    }
  };

  // Updates the fields in the signup form based on the key
  const updateField = <K extends keyof SignupFormType>(
    key: K,
    value: SignupFormType[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // ==== VALIDATION FUNCTIONS ====
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const validateEmail = (email: string) => {
    if (!email.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Invalid email";
    return "";
  };

  const validateRequired = (value: string) => {
    if (!value.trim()) return "This field is required.";
    return "";
  };

  const validateTenDigitPhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "");
    if (!phone.trim()) return "Phone is required.";
    if (!/^\d{11}$/.test(cleaned)) return "Invalid phone number";
    return "";
  };

  const validatePassword = (pass: string) => {
    const requiredLength = 8;
    if (!pass) return "Password is required";
    if (pass.length < requiredLength)
      return `Password must be at least ${requiredLength} characters.`;
    return "";
  };

  const validateForm = () => {
    const errors: FormErrors = {};

    let firstnameError = validateRequired(form.firstName);
    if (firstnameError) errors.firstName = firstnameError;

    let lastnameError = validateRequired(form.lastName);
    if (lastnameError) errors.lastName = lastnameError;

    let addressError = validateRequired(form.fullAddress);
    if (addressError) errors.fullAddress = addressError;

    let contactError = validateRequired(form.contactNumber);
    if (contactError) errors.contactNumber = contactError;

    let emailError = validateEmail(form.email);
    if (emailError) errors.email = emailError;

    let passError = validatePassword(form.password);
    if (passError) errors.password = passError;

    if (form.password !== form.confirmPassword)
      errors.confirmPassword = "Password does not match";

    // Set the errors
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={{ rowGap: 32 }}
      >
        {/* Hero */}
        <View style={styles.heroContainer}>
          <View style={styles.logo}>
            <Ionicons name="camera-outline" size={32} color="#fff" />
          </View>
          <Text style={[styles.textDefault, styles.heading]}>
            Create Account
          </Text>
          <Text style={[{ color: "hsl(0, 0%, 40%)" }]}>
            Register for PetKnows
          </Text>
        </View>

        {/* Inputs */}
        <View style={styles.inputGroup}>
          <View style={styles.inputContainer}>
            <Text style={[styles.textDefault]}>
              Firtname <Text style={{ color: "hsl(0 100% 50%)" }}>*</Text>
            </Text>
            <InputText
              placeholder="Enter your first name"
              style={[styles.input, formErrors.firstName && styles.inputDanger]}
              onChangeText={(text: string) => updateField("firstName", text)}
            />
            {formErrors.firstName && (
              <Text style={styles.errorText}>{formErrors.firstName}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.textDefault]}>
              Lastname <Text style={{ color: "hsl(0 100% 50%)" }}>*</Text>
            </Text>
            <InputText
              placeholder="Enter your last name"
              style={[styles.input, formErrors.lastName && styles.inputDanger]}
              onChangeText={(text: string) => updateField("lastName", text)}
            />
            {formErrors.lastName && (
              <Text style={styles.errorText}>{formErrors.lastName}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.textDefault]}>Birthdate</Text>
            <CustomDatePicker
              style={{ height: 50 }}
              onConfirm={(date: Date) => updateField("birthDate", date)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.textDefault]}>
              Full address <Text style={{ color: "hsl(0 100% 50%)" }}>*</Text>
            </Text>
            <InputText
              placeholder="Enter your full address"
              style={[styles.input, formErrors.lastName && styles.inputDanger]}
              onChangeText={(text: string) => updateField("fullAddress", text)}
            />
            {formErrors.fullAddress && (
              <Text style={styles.errorText}>{formErrors.fullAddress}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.textDefault]}>
              Email <Text style={{ color: "hsl(0 100% 50%)" }}>*</Text>
            </Text>
            <InputText
              placeholder="youremail@gmail.com"
              style={[styles.input, formErrors.email && styles.inputDanger]}
              onChangeText={(text: string) => updateField("email", text)}
            />
            {formErrors.email && (
              <Text style={styles.errorText}>{formErrors.email}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.textDefault]}>
              Contact Number <Text style={{ color: "hsl(0 100% 50%)" }}>*</Text>
            </Text>
            <InputText
              placeholder="e.g. 0923456789"
              style={[
                styles.input,
                formErrors.contactNumber && styles.inputDanger,
              ]}
              onChangeText={(text: string) =>
                updateField("contactNumber", text)
              }
            />
            {formErrors.contactNumber && (
              <Text style={styles.errorText}>{formErrors.contactNumber}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.textDefault]}>
              Password <Text style={{ color: "hsl(0 100% 50%)" }}>*</Text>
            </Text>
            <InputText
              placeholder="Enter your password"
              style={[styles.input, formErrors.password && styles.inputDanger]}
              onChangeText={(text: string) => updateField("password", text)}
              secureTextEntry={true}
            />
            {formErrors.password && (
              <Text style={styles.errorText}>{formErrors.password}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.textDefault]}>
              Confirm Password{" "}
              <Text style={{ color: "hsl(0 100% 50%)" }}>*</Text>
            </Text>
            <InputText
              placeholder="Confirm your password"
              style={[
                styles.input,
                formErrors.confirmPassword && styles.inputDanger,
              ]}
              onChangeText={(text: string) =>
                updateField("confirmPassword", text)
              }
              secureTextEntry={true}
            />
            {formErrors.confirmPassword && (
              <Text style={styles.errorText}>{formErrors.confirmPassword}</Text>
            )}
          </View>
        </View>

        {/* Signup Button */}
        <View style={{ flex: 1, marginBottom: 40 }}>
          <Button onPress={handleSumbit} disabled={loading}>
            Signup
          </Button>
        </View>
      </ScrollView>
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
    backgroundColor: "hsl(0 0% 0%)",
    padding: 20,
    borderRadius: "50%",
  },

  textDefault: {
    fontSize: 16,
    color: "hsl(0 0% 30%)",
  },

  heading: {
    fontSize: 24,
    fontWeight: "semibold",
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
});
