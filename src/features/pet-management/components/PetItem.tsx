import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  petId: string;
  petName: string;
  petSpecies: string;
  petStatus: string;
  avatarUrl: string | null;
};

export default function PetItem({ petId, petName, petSpecies, petStatus, avatarUrl }: Props) {
  const statusStyles = {
    registered: styles.registered,
    missing: styles.missing,
  };

  const navigateToDetailsPage = () => {
    router.push({
      pathname: "/pet-management/[id]",
      params: {
        id: petId,
      },
    });
  };

  return (
    <>
      <Pressable onPress={navigateToDetailsPage} style={({ pressed }) => [pressed && styles.pressedEffect]}>
        <View style={styles.mainContainer}>
          <Image source={avatarUrl ? { uri: avatarUrl } : require("@/assets/images/icon.png")} style={styles.image} />
          <View>
            <Text style={styles.textName}>{petName}</Text>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Text style={styles.textSub}>{petSpecies}</Text>
              <Text style={styles.textSub}>•</Text>
              <Text style={[styles.textSub, statusStyles[petStatus.toLowerCase() as keyof typeof statusStyles]]}>
                {petStatus}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    columnGap: 16,
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "hsl(0 0% 86%)",
    width: "100%",
  },

  pressedEffect: {
    backgroundColor: "hsl(0 0% 86%)",
    transitionDuration: 200,
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
    aspectRatio: "1/1",
  },

  textName: {
    fontSize: 18,
    fontWeight: 600,
  },

  textSub: {
    fontSize: 16,
    fontWeight: 400,
    textTransform: "capitalize",
    color: "hsl(0 0% 32%)",
  },

  registered: {
    color: "hsl(133 66% 52%)",
  },

  missing: {
    color: "hsl(0 89% 52%)",
  },
});
