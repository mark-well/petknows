import ActivityStatus from "@/components/ActivityStatus";
import Button from "@/components/Button";
import LoadingModal from "@/components/LoadingModal";
import { useWatch } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";
import FirstStepPetRegistration from "../components/FirstStepPetRegistration";
import SecondStepPetRegistration from "../components/SecondStepPetRegistration";
import { useRegisterPet } from "../hooks/useRegisterPet";

export default function RegisterPetScreen() {
  const registerPet = useRegisterPet();
  const watchvalues = useWatch({ control: registerPet.control });
  const canProceedStep1 = Boolean(watchvalues.petName && watchvalues.petType && watchvalues.placeOfRegistrationId);
  const canSubmit = registerPet.selectedImage.length >= registerPet.imageLimit;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.stepBarContainer}>
        {[...new Array(registerPet.steps).keys()].map((s) => (
          <View
            key={s}
            style={[
              styles.stepBar,
              { backgroundColor: s + 1 <= registerPet.currentStep ? "#000" : "hsl(0, 0%, 80%)" },
            ]}></View>
        ))}
      </View>

      {registerPet.isSubmitting && (
        <LoadingModal title="Registering your pet..." message="Your pet is being registered, please be patient." />
      )}

      {registerPet.registrationFailed && (
        <ActivityStatus
          status="failed"
          title="Registration failed..."
          message="There was an error registering your pet."
          onClose={registerPet.failedFalse}
        />
      )}

      {registerPet.registrationSuccess && (
        <ActivityStatus
          status="success"
          title="Registration success"
          message="Your pet is now registered."
          onClose={registerPet.successFalse}
        />
      )}

      {/* Main */}
      <View style={styles.main}>
        {registerPet.currentStep === 1 && <FirstStepPetRegistration registerPet={registerPet} />}
        {registerPet.currentStep === 2 && <SecondStepPetRegistration registerPet={registerPet} />}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        {registerPet.currentStep > 1 && (
          <Button theme="primary" style={{ flex: 1 }} onPress={registerPet.previousStep}>
            Back
          </Button>
        )}
        {registerPet.currentStep < 2 && (
          <Button
            theme="primary"
            style={{ flex: 1 }}
            onPress={registerPet.nextStep}
            disabled={registerPet.currentStep === 1 && !canProceedStep1}>
            Next
          </Button>
        )}
        {registerPet.currentStep === 2 && (
          <Button
            theme="primary"
            style={{ flex: 1 }}
            onPress={registerPet.handleSubmit(registerPet.submit)}
            disabled={!canSubmit || registerPet.isSubmitting}>
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

  footer: {
    borderTopWidth: 1.5,
    borderColor: "hsl(0, 0%, 85%)",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    columnGap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
