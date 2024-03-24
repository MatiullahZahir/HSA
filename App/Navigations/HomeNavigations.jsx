import { View, Text } from "react-native";
import React from "react";

import HomeScreen from "./../Screens/HomeScreen/HomeScreen";
import  BusinessListByCategoryName  from "../Screens/HomeScreen/BusinessListByCategoryName";
import BusinessItemDetails from "../Screens/HomeScreen/BusinessItemDetails";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

export default function HomeNavigations() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen
        name="business-list-by-category"
        component={BusinessListByCategoryName}
      />
      <Stack.Screen name="business-item-details" component={BusinessItemDetails} />
    </Stack.Navigator>
  );
}
