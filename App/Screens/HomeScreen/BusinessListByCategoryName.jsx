import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";
import Font from "../../Utils/Font";
import Color from "../../Utils/Color";
import { GlobalApi } from "../../Utils/GlobalApi";
import BusinessListItems from "./BusinessListItems";
export default function BusinessListByCategoryName() {
  const [showText, setShowText] = useState(false);

  const [businessList, setBuisnessList] = useState([]);
  const navigation = useNavigation();
  const params_ = useRoute().params;
  useEffect(() => {
    params_ && getBusinessByCategoryName();

    const timeout = setTimeout(() => {
      setShowText(true);
    }, 200);
    return () => clearTimeout(timeout);
  }, [params_]);

  const getBusinessByCategoryName = () => {
    GlobalApi.getBusinessListByCategoryName(params_.category).then((res) => {
      // console.log(res.businessLists);
      setBuisnessList(res.businessLists);
    });
  };

  return (
    <View
      style={{
        padding: 20,
        paddingTop: 50,
      }}
    >
      <TouchableOpacity
        style={{ display: "flex", flexDirection: "row", gap: 10 }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons
          name="arrow-back-outline"
          size={24}
          color={"black"}
        ></Ionicons>
        <Text style={{ fontSize: 25, fontFamily: Font.OUTFIT_Bold }}>
          {params_.category}
        </Text>
      </TouchableOpacity>
      {businessList.length > 0 ? (
        <FlatList
          data={businessList}
          renderItem={({ item, index }) => (
            <BusinessListItems business={item} />
          )}
        />
      ) : (
        <Text
          style={{
            fontSize: 25,
            fontFamily: Font.OUTFIT_Regular,
            color: Color.MEDIUM_GRAY,
            textAlign: "center",
            paddingTop: "80%",
          }}
        >
          {showText ? "No Record Found" : null}
        </Text>
      )}
    </View>
  );
}
