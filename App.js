// React Native Functionality
import React from 'react';
import Orientation from 'react-native-orientation-locker';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';  //Router
import * as Font from 'expo-font';                             //defined under asset bundle in app.json

// Firebase
import { initializeApp } from 'firebase/app';                 // initializeApp doesn't bring in modules, so next line is needed
import 'firebase/auth';                                     // on global level, import firebase functionality
import firebaseConfig from './firebaseConfig';

// Components
import LandingPage from './pageComponents/landingPage';
import MainPage from './pageComponents/mainPage';
import Login from './pageComponents/login';
import Register from './pageComponents/register';
import Settings from './pageComponents/settings';
import BlockedNumbers from './pageComponents/blockedNumbers';
import WhiteList from './pageComponents/whiteList';
import CountryCode from './pageComponents/countryCodeWhiteList';
import UserContextData from './context/userContext';
import SettingsContextData from './context/settingsContext';

const Stack = createStackNavigator();                       //defined outside to prevent rerender

export default function App() {

  useEffect(()=> {

    Orientation.lockToPortrait();       // lock phone orientation

    initializeApp(firebaseConfig);      // initialize firebase config

    async function loadFonts(){
      await Font.loadAsync({
          'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
          'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf')
      })
      console.log('component did mount, fonts loaded')
    }
    loadFonts()                         // load fonts
  }
  ,[]                                   // when component mounted
  );

  return (
    <UserContextData>
      <SettingsContextData>
        <NavigationContainer>      
          <Stack.Navigator initialRouteName="LandingPage">
            <Stack.Screen name="LandingPage" component={LandingPage} />
            <Stack.Screen name="MainPage" component={MainPage} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="CountryCode" component={CountryCode} />
            <Stack.Screen name="BlockedNumbers" component={BlockedNumbers} />
            <Stack.Screen name="WhiteList" component={WhiteList} />
          </Stack.Navigator>
        </NavigationContainer>
      </SettingsContextData>
    </UserContextData>
  );
}

// UserContextData will pass in userName state and setUserName method