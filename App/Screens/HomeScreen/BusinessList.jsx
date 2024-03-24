import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  FlatList,
} from "react-native";
import HeaderText from "../../Components/HeaderText";

import React, { useEffect, useState } from "react";
import { GlobalApi } from "./../../Utils/GlobalApi";
import Font from "../../Utils/Font";
import Color from "../../Utils/Color";
import BusinessListSmall from "./BusinessListSmall";
import { useNavigation } from "@react-navigation/native";
export default function BusinessList() {
  const navigation = useNavigation();
  const [businessList, setBusinessList] = useState([]);
  useEffect(() => {
    getBusiness();
  }, []);

  const getBusiness = () => {
    GlobalApi.getBusinessList().then((resp) => {
      //console.log("----------------------");
      //  console.log("res:", resp?.businessLists);
      setBusinessList(resp?.businessLists);
    });
  };

  return (
    <>
      <HeaderText text={"Latest Business"} isViewAll={true} />
      <FlatList
        data={businessList}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          //  console.log(item)
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.push("business-item-details", {
                  business: item,
                })
              }
            >
              <View style={{ marginRight: 10 }}>
                <BusinessListSmall business={item} />
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
}
