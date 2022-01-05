import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MovieScreen from "../screens/Movie";
import TvScreen from "../screens/Tv";
import SearchScreen from "../screens/Search";

const Tab = createBottomTabNavigator();

const Tabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Movie" component={MovieScreen} />
    <Tab.Screen name="Tv" component={TvScreen} />
    <Tab.Screen name="Search" component={SearchScreen} />
  </Tab.Navigator>
);

export default Tabs;
