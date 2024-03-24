import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Color from "../../Utils/Color";
import Font from "../../Utils/Font";

import { Ionicons } from "@expo/vector-icons";
import BookingModal from "./BookingModal";
export default function BusinessItemDetails() {
  const businessParameters = useRoute().params;
  const [business, setBusiness] = useState(businessParameters.business);
  const [isReadMore, setIsReadMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    // console.log(businessParameters.business);
  }, []);
  return (
    business && (
      <View>
        <ScrollView style={{ height: "93%" }}>
          <TouchableOpacity
            style={{
              position: "absolute",
              marginTop: 30,
              padding: 20,
              zIndex: 10,
            }}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="arrow-back-outline"
              size={30}
              color={Color.WHITE}
            ></Ionicons>
          </TouchableOpacity>
          <Image
            style={{ width: "100%", height: 350 }}
            source={{ uri: business?.images[0].url }}
          ></Image>
          <View style={{ padding: 20, paddingTop: 10 }}>
            <Text style={{ fontSize: 30, fontFamily: Font.OUTFIT_Bold }}>
              {business?.name}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 5,
                paddingTop: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: Color.PRIMARY,
                  fontFamily: Font.OUTFIT_Medium,
                }}
              >
                {business?.contactPerson}
              </Text>
              <Text
                style={{
                  backgroundColor: Color.LIGHT_PRIMARY,
                  alignItems: "center",
                  color: Color.BLACK,
                  borderRadius: 5,
                  padding: 3,
                }}
              >
                {business.category?.name}
              </Text>
            </View>
            <Text style={{ paddingTop: 10 }}>
              <Ionicons
                name="location-sharp"
                size={15}
                style={{ color: Color.PRIMARY }}
              />{" "}
              {business?.address}
            </Text>
            <View
              style={{
                borderWidth: 0.4,
                borderColor: Color.MEDIUM_GRAY,
                marginTop: 10,
              }}
            ></View>
            <Text
              style={{
                paddingTop: 10,
                fontSize: 18,
                fontFamily: Font.OUTFIT_Bold,
              }}
            >
              {"About Me"}
            </Text>
            <Text
              style={{
                paddingTop: 20,
                fontFamily: Font.OUTFIT_Regular,
                lineHeight: 22,
                textAlign: "justify",
              }}
              numberOfLines={!isReadMore ? 5 : 20}
            >
              {business?.about}
              {business?.about}
            </Text>
            <TouchableOpacity onPress={() => setIsReadMore(!isReadMore)}>
              <Text
                style={{
                  paddingTop: 10,
                  fontFamily: Font.OUTFIT_Regular,
                  color: Color.PRIMARY,
                }}
              >
                {!isReadMore ? "Read More" : "Read Less"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View
          style={{ display: "flex", flexDirection: "row", gap: 5, margin: 8 }}
        >
          <TouchableOpacity style={styles.Btn_Container}>
            <Text style={styles.Btn_Msg}>Message</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowModal(true)}
            style={[styles.Btn_Container, { backgroundColor: Color.PRIMARY }]}
          > 
          <Text style={styles.Btn_Booking}>Booking</Text>
          </TouchableOpacity>
        </View>
        <Modal animationType="slide" visible={showModal}>
          <BookingModal businessid={business.id} hideModal={() => setShowModal(false)} />
        </Modal>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  Btn_Container: {
    padding: 10,
    backgroundColor: Color.LIGHT_GRAY,
    borderRadius: 80,
    borderColor: Color.PRIMARY,
    borderWidth: 1,
    flex: 1,
    // textAlign: 'center',
  },
  Btn_Msg: {
    textAlign: "center",
    fontFamily: Font.OUTFIT_Regular,
    fontSize: 18,
  },

  Btn_Booking: {
    textAlign: "center",
    fontFamily: Font.OUTFIT_Regular,
    fontSize: 18,
    color: Color.WHITE,
  },
});
// {
// "about": "exper in kitchen cleaning ...",
// "address": "Saddar road Peshawar, Pakistan",
// "category": {"id": "clt4aq3s6cqfa07jxdnbx440s",
// "name": "Cleaning"},
// "contactPerson":
// "Saddam Hussain ",
// "email": "saddam@yahoo.com",
// "id": "clt6vdpkb2zmp07lfbzt54ppb",
// "images": [{"url": "https://media.graphassets.com/lpwWbDcRsCWCSIwZ71vX"}],
// "name": "Kitchen Expert"
// }
