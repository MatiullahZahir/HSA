import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Login from "./App/Screens/LoginScreen/Login";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";

import { NavigationContainer } from "@react-navigation/native";
import TabNavigations from "./App/Navigations/TabNavigations";
import { useFonts } from 'expo-font';

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function App() {

  const [fontsLoaded, fontError] = useFonts({
    'Outfit-Bold': require('./assets/fonts/Outfit/Outfit-Bold.ttf'),
    'Outfit-Medium': require('./assets/fonts/Outfit/Outfit-Medium.ttf'),
    'Outfit-Regular': require('./assets/fonts/Outfit/Outfit-Regular.ttf'),
    
  });
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey="pk_test_dGhvcm91Z2gtbGFicmFkb3ItMzguY2xlcmsuYWNjb3VudHMuZGV2JA"
    >
      <View style={styles.container}>
        {/* Signin Component */}
        <SignedIn>
          <NavigationContainer>
            <TabNavigations />
          </NavigationContainer>
        </SignedIn>

        {/* Signout Component */}
        <SignedOut>
          <Login />
        </SignedOut>

        <StatusBar style="auto" />
      </View>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
      // paddingBottom:10,
    justifyContent: "flex-end",
  },
});
