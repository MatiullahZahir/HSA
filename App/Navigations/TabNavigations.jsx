// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// import HomeScreen from "./../Screens/HomeScreen/HomeScreen";
// import ProfileScreen from "./../Screens/ProfileScreen/ProfileScreen";
// import BookingScreen from "./../Screens/BookingScreen/BookingScreen";
// const Tab = createBottomTabNavigator();

// export default function TabNavigations() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="home" component={HomeScreen} />
//       <Tab.Screen name="booking" component={BookingScreen} />
//       <Tab.Screen name="profile" component={ProfileScreen} />
//     </Tab.Navigator>
//   );
// }

import React from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";

//import HomeScreen from "./../Screens/HomeScreen/HomeScreen";
import ProfileScreen from "./../Screens/ProfileScreen/ProfileScreen";
import BookingScreen from "./../Screens/BookingScreen/BookingScreen";

import Colors from "./../Utils/Color";
import HomeNavigations from "./HomeNavigations";

const Tab = createBottomTabNavigator();

function TabNavigations() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: Colors.PRIMARY,
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        display: "flex",
        tabBarLabel: ({ focused, color }) => {
          let labelText;

          if (route.name === "home") {
            labelText = "Home";
          } else if (route.name === "booking") {
            labelText = "Booking";
          } else if (route.name === "profile") {
            labelText = "Profile";
          }

          return (
            <Text style={{ color, fontSize: 17, paddingBottom: 0 }}>
              {labelText}
            </Text>
          );
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "home") {
            iconName = "home";
          } else if (route.name === "booking") {
            iconName = "bookmark";
          } else if (route.name === "profile") {
            iconName = "user-circle";
          }

          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "black",
        inactiveTintColor: "gray",
        // style: {
        //   height: 20,
        // },
        // labelStyle: {
        //   fontSize: 45,
        // },
        iconStyle: {
          marginBottom: -5,
        },
      }}
    >
      <Tab.Screen name="home" component={HomeNavigations} />
      <Tab.Screen name="booking" component={BookingScreen} />
      <Tab.Screen name="profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default TabNavigations;
