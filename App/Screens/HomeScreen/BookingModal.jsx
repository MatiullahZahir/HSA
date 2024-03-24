import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  ToastAndroid,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Font from "../../Utils/Font";
import CalendarPicker from "react-native-calendar-picker";
import Color from "../../Utils/Color";
import HeaderText from "../../Components/HeaderText";
import { KeyboardAvoidingView } from "react-native";
import { GlobalApi } from "../../Utils/GlobalApi";
import { useUser } from '@clerk/clerk-expo';

export default function BusinessModal({ businessid, hideModal }) {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState();
  const [chooseTime, setChooseTime] = useState();
  const [note, setNote] = useState();
  const {user}=useUser();

  const onDateChange = (date) => {
    setSelectedStartDate(date);
  };
  useEffect(() => {
    generateTime();
    
  }, []);

  

  const startDate = selectedStartDate ? selectedStartDate.toString() : "";

  function generateTime() {
    var timeArray = [];
    for (let index = 8; index <= 12; index++) {
      timeArray.push({ time: index + ":00 AM" });
      timeArray.push({ time: index + ":30 AM" });
    }
    for (let index = 1; index <= 8; index++) {
      timeArray.push({ time: index + ":00 PM" });
      timeArray.push({ time: index + ":30 PM" });
    }
    //console.log('first')
    setSelectedTime(timeArray);
  }



 
const createNewBookings = () => {
//console.log('show user data ----------------------------------------------------');
//console.log(user.primaryEmailAddress.emailAddress);
//console.log(user);
   if(!chooseTime || !startDate) 
   {
    ToastAndroid.show(`Please Select date & time`, ToastAndroid.SHORT);
    return;
   }
 const bookingData={
  userName:user?.fullName,
  userEmail:user?.primaryEmailAddress?.emailAddress,
  time:chooseTime,
  date:selectedStartDate,
  //note:note,
  businessid:businessid
 }

  GlobalApi.createBooking(bookingData).then((resp) => {
    
    //console.log('callback');
   // console.log(resp);
    //console.log(resp.publishManyBookings);
    ToastAndroid.show('Bookings created',ToastAndroid.LONG)
    hideModal();
  });
};


  return (
    <View style={{ paddingTop: 20 }}>
      <ScrollView>
        <KeyboardAvoidingView>
          <TouchableOpacity
            style={{ display: "flex", flexDirection: "row", gap: 10 }}
            onPress={() => {
              hideModal();
            }}
          >
            <Ionicons name="arrow-back-outline" size={24} color={"black"} />
            <Text style={{ fontSize: 25, fontFamily: Font.OUTFIT_Bold }}>
              Booking
            </Text>
          </TouchableOpacity>

          <View style={styles.container}>
            <HeaderText text={"Select Date"} />
            <CalendarPicker
              onDateChange={onDateChange}
              todayBackgroundColor={Color.PRIMARY}
              todayTextStyle={{ color: Color.WHITE }}
            />

            <View>
              <Text>SELECTED DATE:{startDate}</Text>
            </View>
          </View>

          <View style={{ padding: 10 }}>
            <HeaderText text={"Select Time"} />
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={true}
              data={selectedTime}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => setChooseTime(item.time)}
                  style={[
                    chooseTime == item.time
                      ? styles.selectedTime
                      : styles.unSelectedTime,
                  ]}
                >
                  <Text>{item.time} </Text>
                </TouchableOpacity>
              )}
            />
          </View>

          <View style={{ padding: 10 }}>
            <HeaderText text={"Any Suggestion Note"} />
            <TextInput
              placeholder={"Note"}
              style={styles.noteStyle}
            ></TextInput>

            <TouchableOpacity onPress={()=>createNewBookings()}>
              <Text style={styles.confirmButton}>Confirm & Book</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.LIGHT_PRIMARY,
    borderRadius: 20,
    marginTop: 10,
    padding: 10,
  },
  selectedTime: {
    padding: 20,
    borderRadius: 50,
    borderWidth: 1,
    paddingHorizontal: 20,
    borderColor: Color.PRIMARY,
    backgroundColor: Color.LIGHT_PRIMARY,
    marginRight: 5,
  },
  unSelectedTime: {
    padding: 20,
    borderRadius: 50,
    borderWidth: 1,
    paddingHorizontal: 20,
    borderColor: Color.PRIMARY,
    marginRight: 5,
  },
  noteStyle: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Color.PRIMARY,
    height: 70,
  },
  confirmButton: {    
    marginTop: 10,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Color.PRIMARY,
    textAlign: "center",
    backgroundColor: Color.PRIMARY,
    color: Color.WHITE,
  },
});
