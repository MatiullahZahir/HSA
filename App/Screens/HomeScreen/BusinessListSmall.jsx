import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Font from "../../Utils/Font";
import Color from "../../Utils/Color";

export default function BusinessListSmall({ business }) {
  //console.log(business.category.name)
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: business?.images[0]?.url }} />

      <View style={styles.Textcontainer}>
        <Text style={{ fontFamily: Font.OUTFIT_Bold, fontSize: 19 }}>
          {business.name}
        </Text>

        <Text style={{ fontFamily: Font.OUTFIT_Medium, fontSize: 15 }}>
          {business.contactPerson}
        </Text>
        <Text
          style={{
            fontFamily: Font.OUTFIT_Regular,
            fontSize: 12,
            backgroundColor: Color.LIGHT_PRIMARY,
            borderRadius: 3,
            paddingHorizontal: 5,
            padding: 3,
          }}
        >
          {business.category.name}
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 80,
    borderRadius: 10,
  },
  container: {
    borderRadius: 10,
    backgroundColor: Color.WHITE,
    padding: 10,
  },
  Textcontainer: {
    paddingTop: 5,
    borderRadius: 10,
    //  backgroundColor: Color.WHITE,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});
