import React from "react";
import {  StatusBar } from 'expo-status-bar';
import {  StyleSheet, 
          SafeAreaView,
          Platform } from 'react-native';
import MainButton from "../components/mainButton";

export default function MainPage () {
    
    const styles = StyleSheet.create({
        mainContainer: {
          flex: 1,
          backgroundColor: '#246EE9',       //royal blue
          justifyContent: 'center',         //along main axis //default flex direction is column in React Native
          alignContent: 'center',           //align the content as a whole - alignItems
          padding: 0
        },
        statusBar: {
          backgroundColor:"#5cb3ed",
        },
    })

    return(
        <SafeAreaView style={styles.mainContainer}>
            <StatusBar  style={styles.statusBar} 
                        translucent={true}
                        barStyle={Platform.OS ==='android'? 'white': 'gray'}
            />
            <MainButton />
        </SafeAreaView> 
    )    
}
