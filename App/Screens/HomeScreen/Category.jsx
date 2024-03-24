import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderText from "../../Components/HeaderText";
import { GlobalApi } from "../../Utils/GlobalApi";
import Color from "../../Utils/Color";
import Font from "../../Utils/Font";
import { useNavigation } from "@react-navigation/native";

export default function Category() {
  const [category, SetCategory] = useState([]);
  //NAVIGATION
  const navigation = useNavigation();

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = () => {
    GlobalApi.getCategories().then((resp) => {
      SetCategory(resp?.categories);
    });
  };

  return (
    <View style={{ paddingTop: 20 }}>
      <HeaderText text={"Category"} isViewAll={true} />

      <FlatList
        data={category}
        numColumns={4}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          if (index <= 3) {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.push("business-list-by-category", {
                    category: item.name,
                  })
                }
              >
                <View style={styles.mainContainter}>
                  <View style={styles.iconContainer}>
                    <Image
                      style={{ width: 40, height: 40 }}
                      source={{ uri: item?.image?.url }}
                    />
                    <Text style={[Font.OUTFIT_Bold, { marginTop: 5 }]}>
                      {" "}
                      {item.name}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainter: {
    flex: 1,
    alignContent: "center",
  },
  iconContainer: {
    backgroundColor: Color.LIGHT_GRAY,
    padding: 18,
    borderRadius: 30,
  },
});
