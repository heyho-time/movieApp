import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { Asset, useAssets } from "expo-asset";

export default function App() {
  const [assets] = useAssets([require("./berry.jpeg")]);
  const [loaded] = Font.useFonts(Ionicons.font);
  if (!assets || !loaded) {
    return <AppLoading />;
  }
  return <Text> all done !</Text>;
}
