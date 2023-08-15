import React from "react";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView,
         Platform } from 'react-native';
import { mainPageStyles } from "../styles";
import MainButton from "../components/mainButton";

export default function MainPage () {
    
    return(
        <SafeAreaView style={mainPageStyles.mainContainer}>
            <StatusBar  style={mainPageStyles.statusBar} 
                        translucent={true}
                        barStyle={Platform.OS ==='android'? 'white': 'gray'}
            />
            <MainButton />
        </SafeAreaView> 
    )    
}
