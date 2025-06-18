import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "~/screens/bottom-navs/HomeScreen";
import LoginScreen from "~/screens/auth/LoginScreen";
import MessageHost from "~/components/toasts/MessageHost";
import ToastHost from "~/components/toasts/ToastHost";

const Stack = createNativeStackNavigator();

export default function App() {


  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
  
      </Stack.Navigator>
      <ToastHost />
      <MessageHost />

    </NavigationContainer>
  );
}
