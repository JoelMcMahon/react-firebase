import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen, HomeScreen, RegistrationScreen } from "./src/screens";
import { decode, encode } from "base-64";
import PictureFeedScreen from "./src/screens/PictureFeed/PictureFeedScreen";
import Auth from "./src/hooks/auth";
import VideoScreen from "./src/screens/VideoScreen/VideoScreen";
import FeedScreen from "./src/screens/FeedScreen/FeedScreen";

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();

export default function App() {
  const { user, setUser } = Auth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Home">
              {(props) => (
                <HomeScreen {...props} extraData={user} setUser={setUser} />
              )}
            </Stack.Screen>
            <Stack.Screen name="Pictures">
              {(props) => <PictureFeedScreen {...props} />}
            </Stack.Screen>
            <Stack.Screen name="VideoScreen">
              {(props) => <VideoScreen {...props} />}
            </Stack.Screen>
            <Stack.Screen name="FeedScreen">
              {(props) => <FeedScreen {...props} />}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen name="Login">
              {(props) => (
                <LoginScreen {...props} setUser={setUser} user={user} />
              )}
            </Stack.Screen>
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
