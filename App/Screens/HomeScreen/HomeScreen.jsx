import { View, Text, ScrollView } from "react-native";
import React from "react";
import Header from "./Header";
import Slider from "./Slider";
import Category from "./Category";
import BusinessList from "./BusinessList";

export default function HomeScreen(route) {
  //const { displayText } = route.params;
  return (
    <View>
      <ScrollView nestedScrollEnabled={true} style={{ width: "100%" }}>
        <Header />
        <View style={{ padding: 20 }}>
          <Slider />
          <Category />
          <BusinessList />
        </View>
      </ScrollView>
    </View>
  );
}
