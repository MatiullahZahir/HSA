import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../../hooks/useWarmUpBrowser";
import Color from "../../Utils/Color";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPressTabNavigation = React.useCallback(async () => {
    console.log("onPressTabNavigation");
  }, []);
  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  return (
    <View>
      <Image
        source={require("./../../../assets/loginScreen.jpg")}
        style={style_Login.loginImage}
      />
      <View style={style_Login._SubView}>
        <Text style={{ fontSize: 27, color: Color.WHITE, textAlign: "center" }}>
          {" "}
          Let's Find
          <Text style={{ fontWeight: "bold" }}>
            {" "}
            Professional Cleaning and repair{" "}
          </Text>
          Service
        </Text>
        <TouchableOpacity style={{ marginTop: 50 }} onPress={onPress}>
          <Text style={style_Login.Btn}>Let's get Started.</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginTop: -50 }}
          onPress={onPressTabNavigation}
        >
          <Text style={style_Login.BtnDashboard}>Goto Dashboard.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style_Login = StyleSheet.create({
  loginImage: {
    alignSelf: "center",
    marginTop: 50,
    width: 270,
    height: 470,
    borderWidth: 5,
    borderColor: Color.BLACK,
    borderRadius: 10,
  },
  _SubView: {
    padding: 10,
    paddingTop: 40,
    backgroundColor: Color.PRIMARY,
    width: "100%",
    height: "40%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  Btn: {
    padding: 10,
    textAlign: "center",
    backgroundColor: Color.WHITE,
    color: Color.PRIMARY,
    width: "100%",
    height: "40%",
    borderRadius: 30,
  },
  BtnDashboard: {
    padding: 15,
    textAlign: "center",
    backgroundColor: Color.WHITE,
    color: Color.PRIMARY,
    width: "100%",
    height: "40%",
    borderRadius: 30,
  },
});
