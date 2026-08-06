import Ionicons from "@react-native-vector-icons/ionicons";
import Lucide from "@react-native-vector-icons/lucide";
import { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Float } from "react-native/Libraries/Types/CodegenTypes";
import { supabase } from "../../../../lib/supabase";
import { Database } from "../../../shared/types/database.types";

type Props = {
  pet: any;
  confidence: Float;
};

type Owner = Database["public"]["Tables"]["profiles"]["Row"];
type UserContact = Database["public"]["Tables"]["user_contact"]["Row"];

export default function PetCard({ pet, confidence }: Props) {
  const { width } = useWindowDimensions();
  const [petPhoto, setPetPhoto] = useState<string>();
  const [petSpecies, setPetSpecies] = useState<string | null>();
  const [petStatus, setPetStatus] = useState<string | null>();
  const [placeOfRegistration, setPlaceOfRegistration] = useState<
    string | null
  >();
  const dateRegistered = new Date(pet.date_registered).toLocaleDateString(
    "en-GB",
  );
  const [ownerInformations, setOwnerInformations] = useState<Owner | null>();
  const [userContact, setUserContact] = useState<UserContact | null>();

  useEffect(() => {
    fetchPetPhoto();
    fetchPetStatus();
    fetchPlaceOfRegistration();
    fetchOwnerInformation();
    fetchOwnerContactNumber();
  }, []);

  const fetchPetPhoto = async () => {
    try {
      const { data } = supabase.storage
        .from("pet_avatars")
        .getPublicUrl(pet.avatar_url);

      if (data) setPetPhoto(data.publicUrl);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchPetStatus = async () => {
    try {
      const { data, error } = await supabase
        .from("pet_status")
        .select("*")
        .eq("id", pet.status)
        .single();

      if (error) throw error;
      setPetStatus(data.name);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchPlaceOfRegistration = async () => {
    try {
      const { data, error } = await supabase
        .from("mao")
        .select("*")
        .eq("id", pet.place_of_registration)
        .single();

      if (error) throw error;
      setPlaceOfRegistration(data.name);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchOwnerInformation = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", pet.owner)
        .single();

      if (error) throw error;
      setOwnerInformations(data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchOwnerContactNumber = async () => {
    try {
      const { data, error } = await supabase
        .from("user_contact")
        .select("*")
        .eq("user_id", pet.owner)
        .single();

      if (error) throw error;
      console.log(pet.owner);
      setUserContact(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={[styles.container, { width: width }]}>
      <View style={{ flex: 1 }}>
        <Image
          source={{ uri: petPhoto }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      <View style={{ flex: 1 }}>
        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "semibold",
              color: "hsl(0 0% 30%)",
            }}
          >
            Confidence
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
          }}
        >
          <View
            style={{
              flex: 2,
              height: 8,
              borderRadius: 8,
              backgroundColor: "hsl(0 0% 60%)",
            }}
          >
            <View
              style={{
                flex: 2,
                width: `${confidence * 100}%`,
                height: "auto",
                borderRadius: 8,
                backgroundColor: "hsl(0 0% 20%)",
              }}
            ></View>
          </View>
          <Text style={{ fontSize: 16, fontWeight: "semibold" }}>
            {confidence.toFixed(2)}
          </Text>
        </View>
      </View>

      <View
        style={{
          padding: 16,
          backgroundColor: "hsl(0 0% 90%)",
          borderRadius: 16,
          rowGap: 32,
        }}
      >
        <View style={styles.infoContainer}>
          <View style={styles.titleContainer}>
            <Lucide name="paw-print" size={24} color="#000" />
            <Text style={styles.title}>Pet Information</Text>
          </View>

          <View style={{ rowGap: 8 }}>
            <View style={styles.attributeContainer}>
              <Text style={styles.attributeTitle}>Name</Text>
              <Text style={styles.attribute}>{pet.name}</Text>
              <View style={styles.line}></View>
            </View>

            <View style={styles.attributeContainer}>
              <Text style={styles.attributeTitle}>Species</Text>
              <Text style={styles.attribute}>{pet.pet_type}</Text>
              <View style={styles.line}></View>
            </View>

            <View style={styles.attributeContainer}>
              <Text style={styles.attributeTitle}>Status</Text>
              <Text style={styles.attribute}>{petStatus}</Text>
              <View style={styles.line}></View>
            </View>

            <View style={styles.attributeContainer}>
              <Text style={styles.attributeTitle}>Registered at</Text>
              <Text style={styles.attribute}>{placeOfRegistration}</Text>
              <View style={styles.line}></View>
            </View>

            <View style={styles.attributeContainer}>
              <Text style={styles.attributeTitle}>Date registered</Text>
              <Text style={styles.attribute}>{dateRegistered}</Text>
              <View style={styles.line}></View>
            </View>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.titleContainer}>
            <Ionicons name="person-outline" size={24} color="#000" />
            <Text style={styles.title}>Owner Information</Text>
          </View>

          <View style={{ rowGap: 8 }}>
            <View style={styles.attributeContainer}>
              <Text style={styles.attributeTitle}>Name</Text>
              <Text style={styles.attribute}>
                {ownerInformations?.first_name} {ownerInformations?.last_name}
              </Text>
              <View style={styles.line}></View>
            </View>

            <View style={styles.attributeContainer}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <Lucide name="phone" size={16} color="hsl(0 0% 30%)" />
                <Text style={styles.attributeTitle}>Contact number</Text>
              </View>
              <Text style={[styles.attribute, { paddingLeft: 24 }]}>
                {userContact?.number}
              </Text>
              <View style={styles.line}></View>
            </View>

            <View style={styles.attributeContainer}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <Ionicons name="location" size={16} color="hsl(0 0% 30%)" />
                <Text style={styles.attributeTitle}>Address</Text>
              </View>
              <Text style={[styles.attribute, { paddingLeft: 24 }]}>
                {ownerInformations?.address}
              </Text>
              <View style={styles.line}></View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    rowGap: 16,
  },

  image: {
    flex: 1,
    width: "100%",
    aspectRatio: 1,
    borderRadius: 16,
  },

  infoContainer: {
    rowGap: 18,
  },

  line: {
    width: "100%",
    height: 1,
    backgroundColor: "hsl(0 0% 70%)",
    marginVertical: 8,
  },

  attributeContainer: {
    paddingLeft: 8,
  },

  titleContainer: {
    flexDirection: "row",
    columnGap: 8,
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "semibold",
  },

  attributeTitle: {
    fontSize: 16,
    color: "hsl(0 0% 30%)",
  },

  attribute: {
    fontSize: 18,
    color: "hsl(0 0% 10%)",
    textTransform: "capitalize",
  },
});
