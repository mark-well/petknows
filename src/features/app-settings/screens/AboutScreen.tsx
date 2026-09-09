import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

const PRIMARY = "#FF7138";

const FEATURES: {
  icon: IconName;
  title: string;
  description: string;
}[] = [
  {
    icon: "paw-outline",
    title: "Pet Registration",
    description: "Register and manage important information about pets in one place.",
  },
  {
    icon: "scan-outline",
    title: "Pet Identification",
    description: "Identify registered pets using their stored identification records.",
  },
  {
    icon: "person-add-outline",
    title: "User Registration",
    description: "Create an account and securely access PetKnows services.",
  },
  {
    icon: "grid-outline",
    title: "Dashboard",
    description: "View important pet and account information from one central dashboard.",
  },
];

const TECHNOLOGIES: {
  icon: IconName;
  name: string;
  description: string;
}[] = [
  {
    icon: "logo-react",
    name: "React",
    description: "Application development",
  },
  {
    icon: "server-outline",
    name: "Supabase",
    description: "Backend and database",
  },
  {
    icon: "logo-python",
    name: "Python",
    description: "Supporting development tools",
  },
];

const CONTRIBUTORS: {
  icon: IconName;
  name: string;
  role: string;
}[] = [
  {
    icon: "code-slash-outline",
    name: "Merto, Mark Well A.",
    role: "Developer",
  },
  {
    icon: "star-outline",
    name: "Avila, Jedrick Owen E.",
    role: "Lead",
  },
  {
    icon: "document-text-outline",
    name: "Fernandez, Gayle Francine M.",
    role: "Documentation",
  },
];

export default function AboutScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "About" }} />
      <SafeAreaView style={styles.safeArea} edges={["bottom"]}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          {/* Hero */}
          <View style={styles.hero}>
            <View style={styles.logo}>
              <Ionicons name="paw" size={34} color="#FFFFFF" />
            </View>

            <Text style={styles.appName}>PetKnows</Text>

            <Text style={styles.tagline}>Pet Registration & Identification System</Text>
          </View>

          {/* About */}
          <View style={styles.card}>
            <SectionTitle title="About PetKnows" />

            <Text style={styles.paragraph}>
              PetKnows is a pet registration and identification system developed by{" "}
              <Text style={styles.emphasis}>Merto, Mark Well A.</Text>,{" "}
              <Text style={styles.emphasis}>Avila, Jedrick Owen E.</Text>, and{" "}
              <Text style={styles.emphasis}>Fernandez, Gayle Francine M.</Text>.
            </Text>

            <Text style={[styles.paragraph, styles.lastParagraph]}>
              The system was developed by students of{" "}
              <Text style={styles.emphasis}>Laguna State Polytechnic University – Siniloan Campus</Text> as part of
              their undergraduate thesis requirements.
            </Text>
          </View>

          {/* Features */}
          <View style={styles.section}>
            <SectionTitle title="Features" />

            <View style={styles.featureGrid}>
              {FEATURES.map((feature) => (
                <View key={feature.title} style={styles.featureCard}>
                  <View style={styles.featureIcon}>
                    <Ionicons name={feature.icon} size={23} color={PRIMARY} />
                  </View>

                  <Text style={styles.featureTitle}>{feature.title}</Text>

                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Technology */}
          <View style={styles.card}>
            <SectionTitle title="Technology" />

            <Text style={styles.cardDescription}>
              PetKnows is built using modern technologies to support its registration, identification, and data
              management features.
            </Text>

            {TECHNOLOGIES.map((technology) => (
              <View key={technology.name} style={styles.techRow}>
                <View style={styles.techIcon}>
                  <Ionicons name={technology.icon} size={22} color={PRIMARY} />
                </View>

                <View style={styles.techDetails}>
                  <Text style={styles.techName}>{technology.name}</Text>

                  <Text style={styles.techDescription}>{technology.description}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Contributors */}
          <View style={styles.section}>
            <SectionTitle title="Contributors" />

            {CONTRIBUTORS.map((contributor) => (
              <View key={contributor.name} style={styles.contributorCard}>
                <View style={styles.contributorIcon}>
                  <Ionicons name={contributor.icon} size={20} color={PRIMARY} />
                </View>

                <View style={styles.contributorDetails}>
                  <Text style={styles.contributorName}>{contributor.name}</Text>

                  <Text style={styles.contributorRole}>{contributor.role}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Academic Project */}
          <View style={styles.academicCard}>
            <View style={styles.academicIcon}>
              <Ionicons name="school-outline" size={27} color="#FFFFFF" />
            </View>

            <Text style={styles.academicTitle}>Academic Project</Text>

            <Text style={styles.academicText}>
              This project was developed as part of the undergraduate thesis requirements at{" "}
              <Text style={styles.academicEmphasis}>Laguna State Polytechnic University – Siniloan Campus</Text>.
            </Text>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Ionicons name="paw-outline" size={16} color="#A0A5A1" />

            <Text style={styles.footerName}>PetKnows</Text>

            <Text style={styles.footerText}>Pet Registration & Identification System</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <Text style={styles.sectionTitle}>{title}</Text>;
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FAFAF9",
  },

  container: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },

  /* Hero */
  hero: {
    alignItems: "center",
    paddingVertical: 30,
  },

  logo: {
    width: 72,
    height: 72,
    borderRadius: 23,
    backgroundColor: PRIMARY,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,

    shadowColor: PRIMARY,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },

  appName: {
    fontSize: 32,
    fontWeight: "800",
    color: "#252525",
    letterSpacing: -0.7,
  },

  tagline: {
    marginTop: 6,
    fontSize: 13,
    color: "#777777",
    textAlign: "center",
  },

  /* Cards */
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#EEEEEC",
  },

  section: {
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#252525",
    marginBottom: 14,
  },

  paragraph: {
    fontSize: 14,
    lineHeight: 22,
    color: "#666666",
    marginBottom: 14,
  },

  lastParagraph: {
    marginBottom: 0,
  },

  emphasis: {
    fontWeight: "700",
    color: "#333333",
  },

  /* Features */
  featureGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  featureCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    minHeight: 165,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#EEEEEC",
  },

  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#FFF0EA",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 13,
  },

  featureTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#292929",
    marginBottom: 7,
  },

  featureDescription: {
    fontSize: 12,
    lineHeight: 18,
    color: "#7A7A7A",
  },

  /* Technology */
  cardDescription: {
    fontSize: 13,
    lineHeight: 20,
    color: "#7A7A7A",
    marginTop: -4,
    marginBottom: 12,
  },

  techRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },

  techIcon: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: "#FFF0EA",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },

  techDetails: {
    flex: 1,
  },

  techName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#292929",
  },

  techDescription: {
    fontSize: 12,
    color: "#7A7A7A",
    marginTop: 3,
  },

  /* Contributors */
  contributorCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#EEEEEC",
  },

  contributorIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#FFF0EA",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },

  contributorDetails: {
    flex: 1,
  },

  contributorName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#292929",
  },

  contributorRole: {
    fontSize: 12,
    color: PRIMARY,
    fontWeight: "600",
    marginTop: 3,
  },

  /* Academic Project */
  academicCard: {
    backgroundColor: PRIMARY,
    borderRadius: 22,
    padding: 23,
    alignItems: "center",
    marginBottom: 28,
  },

  academicIcon: {
    width: 54,
    height: 54,
    borderRadius: 17,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  academicTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 9,
  },

  academicText: {
    fontSize: 13,
    lineHeight: 20,
    color: "#FFF2ED",
    textAlign: "center",
  },

  academicEmphasis: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  /* Footer */
  footer: {
    alignItems: "center",
  },

  footerName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#5F625F",
    marginTop: 5,
  },

  footerText: {
    fontSize: 11,
    color: "#A0A5A1",
    marginTop: 4,
  },
});
