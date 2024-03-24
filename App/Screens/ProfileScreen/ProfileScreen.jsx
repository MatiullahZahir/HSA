import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Font from "../../Utils/Font";
import Color from "../../Utils/Color";
import { useClerk, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons"; 
import { useNavigation } from "@react-navigation/native";
//import { useNavigation } from "@react-navigation/native";

const windowHeight = Dimensions.get("window").height;

export default function ProfileScreen() {
//	const navigation = useNavigation();
  const { user } = useUser();
  const { signOut } = useClerk();  
  const navigation = useNavigation();

  const linksArray = [
    { text: "Home", icon: "home" },
    { text: "Booking", icon: "calendar" },
    { text: "Logout", icon: "log-out" },
  ];
 

  const handlePress = (screen) => {
    // Perform different actions based on the button clicked
    switch (screen) {
      case "Home":
        navigation.navigate('home')
        break;
      case "Booking":
        navigation.navigate('booking') 
        break;
      case "Logout":            
      signOut();      
        break;
      default:
        break;
    }
  };


  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.profileText}>Profile</Text>

        <View style={styles.profileContainer}>
          <Image
            source={{ uri: user?.imageUrl }}
            alt="Loading"
            style={styles.userImage}
          />
          <View style={{ alignItems: "center", paddingTop: 10 }}>
            <Text
              style={{
                color: Color.BLACK,
                fontSize: 30,
                fontFamily: Font.OUTFIT_Bold,
              }}
            >
              {user.fullName}
            </Text>
            <Text
              style={{
                color: Color.MEDIUM_GRAY,
                fontSize: 20,
                fontFamily: Font.OUTFIT_Regular,
              }}
            >
              {user?.primaryEmailAddress?.emailAddress}
            </Text>
          </View>
        </View>
  
      </View>
	  <View style={{alignItems:'center' ,paddingTop:80 }} >
		
	  <FlatList
          data={linksArray}
          renderItem={({ item, index }) => (
            

			<TouchableOpacity 
      style={styles.container_} 
      onPress={() => handlePress(item.text)}
      >
			         <Ionicons
                name={item.icon}
                size={30}
                color={Color.PRIMARY}
              ></Ionicons>
			<View style={styles.textViewStyle}>
			  <Text style={{ fontSize: 20, color: Color.MEDIUM_GRAY }}>
				{item.text}
			  </Text> 			  
			</View>
		  </TouchableOpacity>












            // <TouchableOpacity
            //   style={{ display: "flex", flexDirection: "row", gap: 10}}
               
            // >
            //   <Ionicons
            //     name={item.icon}
            //     size={30}
            //     color={Color.PRIMARY}
            //   ></Ionicons>
            //   <Text style={{ fontSize: 30, fontFamily: Font.OUTFIT_Regular }}>
            //     {item.text}			  
            //   </Text>
            // </TouchableOpacity>
          )}
        ></FlatList>
	  </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: windowHeight * 0.4, // Set the height to 30% of the screen height
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.PRIMARY,
  },
  profileContainer: {
    padding: 40,
    alignItems: "center",
    top: 30,
    backgroundColor: Color.WHITE,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  profileText: {
    marginTop: 110,
    fontSize: 35,
    fontFamily: Font.OUTFIT_Bold,
    color: Color.WHITE,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 80,
  },


  
  container_: {
	borderLeftColor: Color.PRIMARY,
	borderLeftWidth:2,	
    backgroundColor: Color.WHITE,
    borderRadius: 15,
    marginTop: 10,
    padding: 20,
    display: "flex",
    flexDirection: "row",
    gap: 50,
  },
});
