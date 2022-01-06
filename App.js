import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { Asset, useAssets } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/Tabs";
import Stack from "./navigation/Stack";
import Root from "./navigation/Root";
import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "./styled";
import { useColorScheme } from "react-native";

export default function App() {
  const [assets] = useAssets([require("./berry.jpeg")]);
  const [loaded] = Font.useFonts(Ionicons.font);

  const isDark = useColorScheme() === "dark";
  if (!assets || !loaded) {
    return <AppLoading />;
  }
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <NavigationContainer>
        <Root />
        {/* <Tabs /> */}
        {/* <Stack /> */}
      </NavigationContainer>
    </ThemeProvider>
  );
}
