import { getNotification } from "@/features/notification/services";
import getIdentificationRecord from "@/features/pet-identification/services/getIdentificationRecord";
import { formatDateTime } from "@/utils/formatDateTime";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import * as Location from "expo-location";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Linking, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  id: string;
};

export default function NotificationDetailsScreen({ id }: Props) {
  const [identificationAddress, setIdentificationAddress] = useState<Location.LocationGeocodedAddress[] | null>(null);
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery({
    queryKey: ["singleNotif"],
    queryFn: () => getNotification(id),
    enabled: !!id,
  });

  const { data: identificationRecord, isPending: recordLoading } = useQuery({
    queryKey: ["identificationRecord", data?.identification_record],
    queryFn: () => getIdentificationRecord(data?.identification_record ?? null),
    enabled: !!data?.identification_record,
  });

  useEffect(() => {
    const getAddress = async () => {
      try {
        // Check location permission
        let permission = await Location.getForegroundPermissionsAsync();

        if (permission.status !== Location.PermissionStatus.GRANTED) {
          permission = await Location.getForegroundPermissionsAsync();
        }

        // I user denied the permission
        if (permission.status !== Location.PermissionStatus.GRANTED) {
          Alert.alert("Location Permission Required", "Please allow location access the identification address.", [
            { text: "Cancel", style: "cancel" },
            { text: "Open Settings", onPress: () => Linking.openSettings() },
          ]);
          return null;
        }

        if (!identificationRecord?.latitude || !identificationRecord.longitude) return;
        const address = await Location.reverseGeocodeAsync({
          latitude: identificationRecord?.latitude,
          longitude: identificationRecord?.longitude,
        });

        setIdentificationAddress(address);
      } catch (e) {
        console.error();
        alert("Failed to get address");
      }
    };

    getAddress();
  }, [identificationRecord, data]);

  const refreshPage = () => {
    queryClient.invalidateQueries({ queryKey: ["singleNotif"] });
    queryClient.invalidateQueries({ queryKey: ["identificationRecord"] });
  };

  return (
    <>
      <Stack.Screen options={{ title: "Notifications" }} />
      <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
        <ScrollView
          style={[styles.main]}
          contentContainerStyle={{ gap: 32, paddingBottom: 64 }}
          refreshControl={<RefreshControl refreshing={recordLoading || isPending} onRefresh={refreshPage} />}>
          <View>
            <Text style={{ fontSize: 18, fontWeight: 600 }}>{data?.title}</Text>
            <View style={{ flexDirection: "row", columnGap: 8 }}>
              <Text style={{ color: "hsl(0 0% 32%)", textTransform: "capitalize" }}>{`${data?.type} By:`}</Text>
              <Text style={{ color: "hsl(0 0% 32%)" }}>{`${data?.sender?.first_name} ${data?.sender?.last_name}`}</Text>
            </View>
            <View style={{ flexDirection: "row", columnGap: 8 }}>
              <Text style={{ color: "hsl(0 0% 32%)", textTransform: "capitalize" }}>Contact #:</Text>
              <Text
                style={{
                  color: "hsl(0 0% 32%)",
                }}>{`${data?.sender?.contact_number}`}</Text>
            </View>
            <Text style={styles.message}>{data?.message}</Text>
          </View>

          <View style={{ width: "100%", height: 1, backgroundColor: "hsl(0 0% 64%)" }}></View>

          <View style={{ flex: 1, gap: 16 }}>
            <View>
              <View style={{ flexDirection: "row", gap: 8 }}>
                <Text style={{ fontSize: 16 }}>Date & Time:</Text>
                <Text style={{ fontSize: 16, color: "hsl(0 0% 32%)" }}>{formatDateTime(data?.created_at ?? "")}</Text>
              </View>
              <View style={{ flexDirection: "row", gap: 8 }}>
                <Text style={{ fontSize: 16 }}>Address:</Text>
                <Text style={{ fontSize: 16, color: "hsl(0 0% 32%)", flexShrink: 1 }}>
                  {identificationAddress?.[0].formattedAddress}
                </Text>
              </View>
            </View>

            {identificationRecord?.latitude != null && identificationRecord.longitude != null && (
              <View style={{ height: 400, borderRadius: 6, borderWidth: 1, borderColor: "#FF783A" }}>
                <MapView
                  provider={PROVIDER_GOOGLE}
                  style={{ flex: 1 }}
                  initialRegion={{
                    latitude: Number(identificationRecord?.latitude),
                    longitude: Number(identificationRecord?.longitude),
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}>
                  <Marker
                    coordinate={{
                      latitude: Number(identificationRecord.latitude),
                      longitude: Number(identificationRecord.longitude),
                    }}
                    title="Identification Location"
                  />
                </MapView>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff",
  },

  message: {
    fontSize: 16,
    marginTop: 16,
    color: "hsl(0 0% 16%)",
  },
});
