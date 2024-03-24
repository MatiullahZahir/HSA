// Slider.js
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from "react-native";

import React, { useEffect, useState } from "react";
import { GlobalApi } from "./../../Utils/GlobalApi";
import Font from "../../Utils/Font";
import HeaderText from "../../Components/HeaderText";

export default function Slider() {
  const [slider, setSlider] = useState([]);
  useEffect(() => {
    getSliders();
  }, []);

  const getSliders = () => {
    GlobalApi.getSlider().then((resp) => {
      //console.log("----------------------");
      //console.log("res:", resp?.sliders);
      setSlider(resp?.sliders);
    });
  };
  /*
  const renderItem = ({ item }) => {
    return (
      <View>
        <Text>{item.name}</Text>
        <Image source={{ uri: item?.image?.url }} style={style.SliderImage} />
      </View>
    );
  };
*/
  return (
    <View>
      <HeaderText text={"Offers For You"} />
      <FlatList
        data={slider}
        horizontal={true}
        showsHorizontalScrollIndicator={false} //sHorizontalScrollIndicator={fa} //sHorizontalScrollIndicator={fal} //
        renderItem={({ item, index }) => {
          return (
            <View>
              <Text style={style.sliderTxt}> {item.name}</Text>
              <Image
                source={{ uri: item?.image?.url }}
                style={style.SliderImage}
              />
            </View>
          );
        }}
      />
    </View>
  );
}
const style = StyleSheet.create({
  SliderImage: {
    width: 250,
    height: 180,
    borderRadius: 50,
    objectFit: "contain",
  },
  sliderTxt: {
    fontSize: 18,
    fontFamily: Font.OUTFIT_Bold,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
