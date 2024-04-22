import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import useAuth from "../hooks/useGoogle";
import { signInUser } from "../redux/slice/authenticationSlice";

import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import ButtonComponent from "../components/Button";
import Input from "../components/Input";
import useYupValidation from "../hooks/useYupValidation";
import { setIsDoctor } from "../redux/slice/authenticationSlice";

import {
  emailValidationSchema,
  passwordValidationSchema,
} from "../validation/auth";

const LoginScreen = () => {
  const { signInWithGoogle } = useAuth();
  const {
    value: email,
    error: emailError,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
  } = useYupValidation("", emailValidationSchema);
  const {
    value: password,
    error: passwordError,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
  } = useYupValidation("", passwordValidationSchema);

  // //JWT
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // const handleUserLogin = async () => {
  //   try {
  //     await dispatch(signInUser({ email, password }));
  //     const result = dispatch(signInUser({ email, password }));
  //     if (result.payload) {
  //       navigation.navigate("Home");
  //       dispatch(setJwtToken(result.payload.token));
  //     }
  //       else{
  //        Alert.alert("Login failed","Invalid credentials")
  //      }
  //   } catch (error) {
  //     Alert.alert("Invalid Crendentials", error.message);
  //   }
  // };

  const handleUserLogin = async () => {
    const userCredentials = {
      email: "john@gmail.com",
      password: "secretpassword1@",
    };
    try {
      const result = await dispatch(signInUser(userCredentials));
      //const result = await dispatch(signInUser({ email, password }).unwrap());

      if (result.payload.token) {
        dispatch(
          setIsDoctor({ user: { isDoctor: result.payload.user.isDoctor } })
        );
      }
    } catch (error) {
      Alert.alert("Invaid Credentials");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -500}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, zIndex: 50 }}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
      >
        <View className="bg-white h-full w-full">
          <StatusBar styles="white" />

          <Animated.Image
            entering={FadeInUp.delay(200).duration(1000).springify()}
            className="h-full w-full absolute"
            source={require("../assets/images/background.jpg")}
          />
          {/* light */}
          <View className="flex-row justify-around w-full absolute">
            <Animated.Image
              entering={FadeInUp.delay(200).duration(1000).springify()}
              className="h-[255] w-[90]"
              source={require("../assets/images/light.png")}
            />

            <Image
              className="h-[160] w-[65]"
              source={require("../assets/images/light.png")}
            />
          </View>

          {/* title and form */}
          <View className="h-full w-full flex justify-around pt-40 pb-10">
            {/* title */}
            <View className="flex items-center -pt-10">
              <Animated.Text
                entering={FadeInUp.duration(1000).springify().damping(100)}
                className="text-white/90 text-5xl font-bold tracking-tighter "
              >
                Login
              </Animated.Text>
            </View>
            {/* form */}

            <View className="flex items-center mx-4 space-y-6">
              <Input
                placeholder="Email"
                value={email}
                onChangeText={handleEmailChange}
                onBlur={handleEmailBlur}
                error={emailError}
              />

              <Input
                placeholder="Password"
                value={password}
                onChangeText={handlePasswordChange}
                onBlur={handlePasswordBlur}
                //secureTextEntry
                error={passwordError}
              />

              {/* Button */}
              <Animated.View
                entering={FadeInDown.delay(600).duration(1000).springify()}
                className="w-full"
              >
                <ButtonComponent
                  className="w-full bg-blue-700/70 p-3 rounded-2xl mb-3"
                  handleOnPress={handleUserLogin}
                >
                  <Text className="text-xl font-mulishsemibold text-white text-center">
                    Login
                  </Text>
                </ButtonComponent>
              </Animated.View>

              <Animated.View
                entering={FadeInDown.delay(800).duration(1000).springify()}
                className="flex-row justify-center p-0"
              >
                <Text className="font-mulishextrabold">
                  Don't have an account ?
                </Text>
                <Pressable onPress={() => navigation.push("Register")}>
                  <Text className="font-extralight text-blue-800/95">
                    {" "}
                    Register
                  </Text>
                </Pressable>
              </Animated.View>

              <Animated.View
                entering={FadeInDown.delay(900).duration(1000).springify()}
                className="flex flex-row justify-center"
              >
                <GoogleSigninButton
                  style={{ paddingBottom: 15 }}
                  accessibilityHint="accessibilityHint"
                  size={GoogleSigninButton.Size.Standard}
                  color={GoogleSigninButton.Color.Dark}
                  onPress={signInWithGoogle}
                />
              </Animated.View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
