import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Font from "../../Utils/Font";
import Color from "../../Utils/Color";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function BusinessListItems({ business }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.push("business-item-details",{business:business})}
    >
      <Image
        style={styles.imageStyle}
        source={{ uri: business?.images[0]?.url }}
      ></Image>
      <View style={styles.textViewStyle}>
        <Text style={{ fontSize: 15, color: Color.MEDIUM_GRAY }}>
          {business.contactPerson}
        </Text>
        <Text style={{ fontStyle: Font.OUTFIT_Bold, fontSize: 22 }}>
          {business.name}
        </Text>
        <Text
          style={{
            fontStyle: Font.OUTFIT_Bold,
            fontSize: 12,
            color: Color.MEDIUM_GRAY,
          }}
        >
          <Ionicons
            name="location-sharp"
            size={15}
            style={{ color: Color.PRIMARY }}
          />
          {business.address}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  imageStyle: {
    width: 100,
    height: 80,
    borderRadius: 15,
  },
  container: {
    backgroundColor: Color.WHITE,
    borderRadius: 15,
    marginTop: 10,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  textViewStyle: {},
});
