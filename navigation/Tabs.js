import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MovieScreen from "../screens/Movie";
import TvScreen from "../screens/Tv";
import SearchScreen from "../screens/Search";
import { useColorScheme } from "react-native";
import { YELLOW_COLOR, BLACK_COLOR } from "../colors";
import { Ionicons } from "@expo/vector-icons";
import Stack from "./Stack";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === "dark";

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDark ? BLACK_COLOR : "white",
        },
        tabBarActiveTintColor: isDark ? YELLOW_COLOR : BLACK_COLOR,
        headerStyle: {
          backgroundColor: isDark ? "#1e272e" : "white",
        },
        headerTitleStyle: {
          color: isDark ? "white" : BLACK_COLOR,
        },
      }}
    >
      <Tab.Screen
        name="Movie"
        component={MovieScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={"film-outline"} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Tv"
        component={TvScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="tv-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
