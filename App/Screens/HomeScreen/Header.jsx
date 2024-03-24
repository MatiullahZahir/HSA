import React, { useCallback, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useUser } from "@clerk/clerk-expo";
import Colors from "../../Utils/Color";
import Font from "../../Utils/Font";
import { FontAwesome } from "@expo/vector-icons";

export default function Header() {
  const { user, isLoading } = useUser();
  //const { displayText,setDisplayedText } = useState('Nothing');
  const defaultImageUrl = require("../../../assets/favicon.png");

  const onPressSearch = React.useCallback(async () => {
   // console.log("searching...");
   // setDisplayedText('Test mar')
  }, []);

  return (
    <View style={HeaderStyle.container}>
      <View style={HeaderStyle.profileContainer}>
        <View style={HeaderStyle.profileContainer}>
          <Image
            source={{ uri: user?.imageUrl }}
            //source={defaultImageUrl}
            alt="Loading"
            style={HeaderStyle.userImage}
          />
          <View style={HeaderStyle.textContainer}>
            <Text style={{ color: Colors.WHITE, fontSize: 20,fontFamily:Font.OUTFIT_Regular }}>Welcome, </Text>
            <Text style={{ color: Colors.WHITE, fontSize: 30,fontFamily:Font.OUTFIT_Bold }}>
              {user.fullName}
            </Text>

          </View>
        </View>
        <TouchableOpacity>          
          <FontAwesome5 name="bookmark" size={25} style={HeaderStyle.bookmarkBtn} />
        </TouchableOpacity>

       
      </View>
      <View style={HeaderStyle.profileContainer }>
        <TextInput
          style={HeaderStyle.InputSearch}
          placeholder="Search here..."
        ></TextInput>
        

        <FontAwesome5 name="search" size={25} style={HeaderStyle.searchBtn} />
        <TouchableOpacity onPress={onPressSearch}></TouchableOpacity>
      </View>
    </View>
     
  );
}
const HeaderStyle = StyleSheet.create({
  bookmarkBtn: {    
    padding: 10,
    borderRadius: 5,
    color: Colors.WHITE,
    
  },
  
  searchBtn: {
    backgroundColor: Colors.WHITE,
    padding: 5,
    borderRadius: 5,
    color: Colors.PRIMARY,
  },
  
  InputSearch: {
    backgroundColor: Colors.WHITE,
    borderRadius: 5,
    padding: 7,
    paddingHorizontal: 16,
    width: "85%",
  },
  profileContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
     
    justifyContent: "space-between",
  },
  textContainer: {
    flexDirection: "column",
    justifyContent: "center",
    
  },
  container: {
    padding: 40,
    paddingTop: 60,
    backgroundColor: Colors.PRIMARY,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  userImage: {
    width: 45,
    height: 45,
    borderRadius:15
  },
});
