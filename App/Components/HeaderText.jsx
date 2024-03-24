import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Font from "../Utils/Font";
export default function HeaderText({ text, isViewAll = false }) {
  return (
    <View style={styles.CategoryContent}>
      <Text style={styles.titleHeading}>{text} </Text>
      {isViewAll && <Text>View All</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  titleHeading: {
    fontSize: 20,
    fontFamily: Font.OUTFIT_Bold,
    marginBottom: 10,
  },

  CategoryContent: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
  },
});
