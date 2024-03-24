import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderText from "../../Components/HeaderText";
import { GlobalApi } from "../../Utils/GlobalApi";
import { useUser } from "@clerk/clerk-expo";
//import BusinessListSmall from "../HomeScreen/BusinessListSmall";
import Color from "../../Utils/Color";
import Font from "../../Utils/Font";

export default function BookingScreen() {
  const { user } = useUser();
  const [bookingList, setBookingList] = useState([]);
  const [loading,setLoading] = useState(false);
  const fnLoadUserBookings = () => {
	setLoading(false);
    GlobalApi.GetUserBookings(user.primaryEmailAddress.emailAddress)
      .then((response) => {
        //  console.log('resss');
        //  console.log(response.bookings[0].businessList);
        //console.log(response.businessList);
        setBookingList(response.bookings);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
      });
  };

  useEffect(() => {
    user && fnLoadUserBookings();
  }, [user]);
  return (
    <View>
      <View style={{ marginTop: 50,padding:10 }}>
        <HeaderText text={"My Bookings"} isViewAll={false} />
      </View>

      <FlatList
	  onRefresh={() => fnLoadUserBookings()}
	   refreshing={loading}
        data={bookingList}
        // showsHorizontalScrollIndicator={false}
        // horizontal={true}
        // keyExtractor={(item, index) => index.toString()}
        renderItem={({ item,index }) => {
          //console.log(item);
          //console.log("loop");
          //console.log(bookingList[index]?.businessList);

		  const status = item.bookingStatus;
          const statusColor =
            status === "Booked" ? Color.BOOKED :
            status === "Completed" ? Color.COMPLETED :
            status === "Cancelled" ? Color.CANCELLED :
            Color.LIGHT_GRAY; // Default color if status is not recognized
          return (
            <TouchableOpacity>
              <View style={{ marginRight: 10 }}>
                <View style={styles.container}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: bookingList[index]?.businessList?.images[0]?.url,
                    }}
                  />

                  <View style={styles.Textcontainer}>
                    <Text
                      style={{ fontFamily: Font.OUTFIT_Bold, fontSize: 20 }}
                    >
                      {bookingList[index]?.businessList?.name}
                    </Text>

                    <Text
					
                      style={{
                        fontFamily: Font.OUTFIT_Regular,
                        fontSize: 14,
                        backgroundColor: statusColor ,
                        borderRadius: 3,
                        paddingHorizontal: 5,
                        padding: 3,
                      }}
                    >
                      {item.bookingStatus}
                    </Text>
                    <Text
                      style={{
                        fontFamily: Font.OUTFIT_Bold,
                        fontSize: 13,
                        color: Color.BLACK,
                      }}
                    >
                      {item.time} - {new Date(item.date).toLocaleDateString()}
                    </Text>
                    <Text
                      style={{
                        fontFamily: Font.OUTFIT_Bold,
                        fontSize: 14,
                        color: Color.LIGHT_PRIMARY,
                      }}
                    >
                      {bookingList[index]?.businessList?.contactPerson}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 100,
    borderRadius: 10,
  },
  container: {
    borderRadius: 10,
    backgroundColor: Color.WHITE,
    padding: 10,
    display: "flex",
    flexDirection: "row",
  },
  Textcontainer: {
    padding: 15,
    borderRadius: 10,
    //  backgroundColor: Color.WHITE,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});
