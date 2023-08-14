// React and React Native
import React, {useState, useContext, createContext} from 'react';
import { ScrollView, TextInput } from 'react-native';
import { NativeBaseProvider, Heading, VStack, HStack, FormControl, Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';

// Context
import { UserContext } from '../context/userContext';
import { SettingsContext } from '../context/settingsContext';

export default function Settings (){

    // Utility
    const currentDateTime = new Date();
    const utcTimeStamp = currentDateTime.getTime();
    console.log(utcTimeStamp);

    // Context
    const { paramsId } = useContext(UserContext);
    const { settingsFormData,
            setSettingsFormData,
            countryCode,
            setCountryCode,
            hpNumber,
            setHpNumber,
            officeNumber,
            setOfficeNumber,
            homeNumber,
            setHomeNumber,
            blockedNumbers,
            setBlockedNUmbers,
            whiteList,
            setWhiteList
          } = useContext(SettingsContext);

    // State Change
    const updateSettingsFormField = (event) => {
        setSettingsFormData(
            {...settingsFormData,
            [event.target.name] : event.target.value
            }
        )
    }

    // Navigation
    const navigation = useNavigation();

    const navigateToBlockedNumbers = () => {
        navigation.navigate('BlockedNumbers')
    }
    const navigateToWhiteList = () => {
        navigation.navigate('WhiteList')
    }

            








}