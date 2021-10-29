import 'react-native-gesture-handler';
import { Button, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, HomeScreen, RegistrationScreen } from './src/screens'
import { decode, encode } from 'base-64'
import { firebase } from './src/firebase/config'
import PictureFeedScreen from './src/screens/PictureFeed/PictureFeedScreen';
import { ViewComponent } from 'react-native';
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

export default function App() {

  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)



  useEffect(() => {
    setLoading(true)
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
          })
          .catch((error) => {
            setLoading(false)
          });
      } else {
        setLoading(false)
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Home">
              {props => <HomeScreen {...props} extraData={user} setUser={setUser} />}
            </Stack.Screen>
            <Stack.Screen name="Pictures" >
              {props => <PictureFeedScreen {...props} />}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen name="Login" >
              {(props) => <LoginScreen {...props} setUser={setUser} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        )}
      </Stack.Navigator>

    </NavigationContainer>
  );
}