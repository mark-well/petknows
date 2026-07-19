import Button from "@/components/Button";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LiveCamera() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraReady, setCameraReady] = useState<boolean>(false);
  const [imageUri, setImageUri] = useState<string | null>();
  const cameraRef = useRef<CameraView | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission}> Grant Permission </Button>
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const takePicture = async () => {
    if (!cameraRef.current) return;
    if (!cameraReady) return;

    try {
      const image = await cameraRef.current.takePictureAsync({
        quality: 1,
        skipProcessing: false,
        shutterSound: false,
      });

      setImageUri(image.uri);
    } catch (e) {
      console.log(e);
    }
  };

  const identifyPet = async () => {
    if (!imageUri) return;
    navigateToResultScreen(imageUri);
  };

  const navigateToResultScreen = (imageUri: string) => {
    router.push({
      pathname: "/result-screen",
      params: {
        data: imageUri,
      },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <View style={styles.mainContainer}>
        {imageUri ? (
          <View style={{ flex: 4 }}>
            <Image
              source={{ uri: imageUri }}
              style={styles.preview}
              resizeMode="cover"
            />
          </View>
        ) : (
          <CameraView
            style={styles.camera}
            facing={facing}
            ref={cameraRef}
            onCameraReady={() => setCameraReady(true)}
          />
        )}
        <View style={styles.info}>
          {imageUri ? (
            <View style={styles.buttonContainer1}>
              <Button onPress={() => setImageUri(null)}>Retake</Button>
              <Button onPress={identifyPet} disabled={loading}>
                Identify
              </Button>
            </View>
          ) : (
            <Pressable onPress={takePicture}>
              <View style={styles.shutterButton}>
                <View style={styles.innerShutter}></View>
              </View>
            </Pressable>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },

  info: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonContainer1: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 16,
  },

  shutterButton: {
    width: 70,
    height: 70,
    borderRadius: "50%",
    borderWidth: 4,
    borderColor: "hsl(0 0% 20%)",
    padding: 3,
  },

  innerShutter: {
    width: "100%",
    height: "100%",
    backgroundColor: "hsl(0 0% 20%)",
    borderRadius: "50%",
  },

  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },

  preview: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    borderRadius: 4,
  },

  camera: {
    flex: 4,
    borderRadius: 6,
  },

  buttonContainer: {
    position: "absolute",
    bottom: 64,
    flexDirection: "row",
    backgroundColor: "transparent",
    width: "100%",
    paddingHorizontal: 64,
  },
  button: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
