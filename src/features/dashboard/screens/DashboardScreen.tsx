import IconButton from "@/components/IconButton";
import { useAuth } from "@/providers/AuthContext";
import Ionicons from "@react-native-vector-icons/ionicons";
import { Lucide } from "@react-native-vector-icons/lucide";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import { getPetCount } from "../services";

export default function DashboardScreen() {
  const [totalPetsRegistered, setTotalPetRegistered] = useState<number>(0);
  const { userProfile } = useAuth();
  const [pageRefreshing, setPageRefreshing] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { data: species = [] } = useQuery({
    queryKey: ["petCount", userProfile?.id],
    queryFn: () => getPetCount(userProfile?.id ?? null),
    enabled: !!userProfile?.id,
  });

  //Count total pets
  useEffect(() => {
    setTotalPetRegistered(species.reduce((sum, pet) => sum + pet.count, 0));
  }, [species]);

  //Refresh the page
  const onRefresh = async () => {
    setPageRefreshing(true);

    try {
      await queryClient.invalidateQueries({
        queryKey: ["unreadNotification"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["petCount"],
      });
    } finally {
      setPageRefreshing(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ rowGap: 32 }}
      refreshControl={<RefreshControl refreshing={pageRefreshing} onRefresh={onRefresh} />}>
      {/* Hero Section */}
      <View style={styles.heroContainer}>
        <Text style={styles.heroTitle}>Welcome to PetKnows</Text>
        <Text style={styles.heroSubTitle}>
          Hello,{" "}
          <Text style={{ fontWeight: "bold", color: "#000" }}>
            {userProfile?.first_name} {userProfile?.last_name}!
          </Text>{" "}
          Manage your pet registrations and identifications.
        </Text>
      </View>

      {/* Statistics section */}
      <View style={styles.statisticsContainer}>
        <Text style={styles.statisticsTitle}>Your Statistics</Text>

        {/* Total pets card */}
        <View style={[styles.cards, styles.totalPetContainer]}>
          <View>
            <Text style={[{ color: "hsl(0, 0%, 95%)" }]}>Total Pets Registered</Text>
            <Text
              style={[
                {
                  color: "hsl(0, 0%, 100%)",
                  fontSize: 36,
                  fontWeight: "semibold",
                },
              ]}>
              {totalPetsRegistered}
            </Text>
          </View>
          <View>
            <View
              style={[
                {
                  backgroundColor: "hsl(0, 0%, 20%)",
                  padding: 12,
                  borderRadius: "50%",
                },
              ]}>
              <Lucide name="paw-print" size={32} color="#fff" />
            </View>
          </View>
        </View>

        {/* Species breakdown card */}
        <View style={[styles.cards, styles.speciesBreakdownContainer]}>
          <View style={{ flexDirection: "row", columnGap: 8, marginBottom: 12 }}>
            <Ionicons name="trending-up" size={24} color="#000" />
            <Text style={{ fontWeight: "medium" }}>Species Breakdown</Text>
          </View>

          {species.length > 0 ? (
            <View style={styles.speciesContainer}>
              {species.map((pet) => (
                <View style={styles.speciesRow} key={pet.name}>
                  <Text style={styles.speciesTitle}>{pet.name}</Text>
                  <View style={styles.barContainer}>
                    <View style={styles.bar}>
                      <View
                        style={[
                          styles.innerBar,
                          {
                            width: `${(pet.count / totalPetsRegistered) * 100}%`,
                          },
                        ]}></View>
                    </View>
                    <Text style={styles.speciesCount}>{pet.count}</Text>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <Text>You have no registered pet.</Text>
          )}
        </View>
      </View>

      {/* Quick Actions card*/}
      <View style={styles.quickActionsContainer}>
        <Text style={{ fontSize: 20, fontWeight: "medium" }}>Quick Actions</Text>

        <IconButton
          icon={<Lucide name="paw-print" size={24} color="#fff" />}
          theme="primary"
          title="Register New Pet"
          subTitle="Add a pet to the system"
          onPress={() => {
            router.push("/(tabs)/register");
          }}
        />

        <IconButton
          icon={<Lucide name="camera" size={24} color="#000" />}
          title="Identify Pet"
          subTitle="Find a pet by photo"
          onPress={() => {
            router.push("/identify");
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 16,
    marginBottom: 16,
    flexDirection: "column",
  },

  heroContainer: {
    paddingTop: 32,
    gap: 8,
  },

  heroTitle: {
    fontSize: 28,
    fontWeight: "medium",
  },

  heroSubTitle: {
    color: "hsl(0, 0%, 40%)",
    fontSize: 16,
  },

  statisticsContainer: {
    gap: 16,
  },

  statisticsTitle: {
    fontSize: 20,
  },

  cards: {
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  },

  totalPetContainer: {
    width: "100%",
    backgroundColor: "hsl(0, 0%, 0%)",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  speciesBreakdownContainer: {
    width: "100%",
    backgroundColor: "hsl(0, 0%, 88%)",
    borderRadius: 16,
    padding: 16,
  },

  speciesContainer: {
    rowGap: 8,
  },

  speciesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  speciesTitle: {
    color: "hsl(0, 0%, 30%)",
    fontWeight: "medium",
  },

  speciesCount: {
    fontWeight: "medium",
    textAlign: "right",
    width: 32,
  },

  barContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  bar: {
    height: 8,
    width: "40%",
    minWidth: 128,
    backgroundColor: "hsl(0, 0%, 95%)",
    borderRadius: 6,
  },

  innerBar: {
    height: "100%",
    backgroundColor: "hsl(0, 0%, 0%)",
    borderRadius: 6,
  },

  quickActionsContainer: {
    rowGap: 8,
  },
});
