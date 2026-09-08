export default {
  expo: {
    name: "Petknows",
    slug: "petknows",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/logo.png",
    scheme: "petknows",
    userInterfaceStyle: "automatic",
    ios: {
      icon: "./assets/expo.icon",
    },
    android: {
      adaptiveIcon: {
        backgroundColor: "#FF7738",
        foregroundImage: "./assets/images/logo.png",
      },
      predictiveBackGestureEnabled: false,
      package: "com.avinanto.petknows",
    },
    web: {
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          backgroundColor: "#FF7738",
          image: "./assets/images/splash-icon.png",
          imageWidth: 76,
        },
      ],
      [
        "expo-camera",
        {
          cameraPermission: "Allow PetKnows to access your camera",
          microphonePermission: "Allow PetKnows to access your microphone",
          recordAudioAndroid: true,
          barcodeScannerEnabled: true,
        },
      ],
      [
        "react-native-maps",
        {
          androidGoogleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
        },
      ],
      "expo-sqlite",
      "expo-image",
      "expo-status-bar",
      "expo-web-browser",
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    extra: {
      router: {},
      eas: {
        projectId: "242b3088-03dc-4ee9-8c3a-59198de45cb0",
      },
    },
  },
};
