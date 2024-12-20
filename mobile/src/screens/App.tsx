import * as React from "react";
import { registerRootComponent } from "expo";
import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";

const RootStack = createNativeStackNavigator({
  screens: {
    home: () => <Text>asd</Text>,
  },
});

const Navigation = createStaticNavigation(RootStack);
registerRootComponent(() => <Navigation />);
