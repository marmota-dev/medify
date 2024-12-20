import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import Profile from "./Profile";

export default createBottomTabNavigator({
  screenOptions: {
    title: "hello word",
  },
  screens: {
    home: { screen: Home, options: { title: "hello" } },
    profile: { screen: Profile, options: { title: "word" } },
  },
});
