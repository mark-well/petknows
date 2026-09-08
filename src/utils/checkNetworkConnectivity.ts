import NetInfo from "@react-native-community/netinfo";

// Returns true if the device is connected to the internet
export default async function isConnectedToInernet() {
  const netInfo = await NetInfo.fetch();
  if (netInfo.isConnected) {
    return true;
  } else {
    return false;
  }
}
