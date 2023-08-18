import React, {useEffect} from 'react';
import Orientation from 'react-native-orientation-locker';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';  
import { NativeBaseProvider } from 'native-base';

import { initializeApp } from 'firebase/app';                       // initializeApp doesn't bring in modules, so next line is needed
import 'firebase/auth';                                             // on global level, import firebase functionality
// import firebaseConfig from './firebaseConfig';

import LandingPage from './pages/landingPage';
import MainPage from './pages/mainPage';
import Login from './pages/login';
import Register from './pages/register';
import Settings from './pages/settings';
import BlockedNumbers from './pages/blockedNumbers';
import WhiteList from './pages/whiteList';
import CountryCode from './pages/countryCodeWhiteList';

import UserContextData from './context/userContext';
import SettingsContextData from './context/settingsContext';

const Stack = createNativeStackNavigator();                                //defined outside to prevent rerender


export default function App() {

  // For project Purposes, firebaseConfig will be here, rather than .env

  const firebaseConfig = {
    apiKey: "AIzaSyCB79d50420NcWjP6S7if5xenNixoO9jo8",
    authDomain: "project-two-dwad-web.firebaseapp.com",
    projectId: "project-two-dwad-web",
    storageBucket: "project-two-dwad-web.appspot.com",
    messagingSenderId: "408313632630",
    appId: "1:408313632630:web:60695795156af82a5a4c57"
  };

  useEffect(()=> {

    Orientation.lockToPortrait;

    initializeApp(firebaseConfig);
  }
  ,[]);

  return (
    <UserContextData>
      <SettingsContextData>
        <NativeBaseProvider>
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
        </NativeBaseProvider>
      </SettingsContextData>
    </UserContextData>
  );
}