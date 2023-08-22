import React, {useState, useCallback, useContext} from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { NativeBaseProvider, Box, VStack, HStack, FormControl, Button, Input } from 'native-base';

import APIHandler, { setAuthHeader, headersData } from '../APIHandler';

import { UserContext } from '../context/userContext';
import { SettingsContext } from '../context/settingsContext';

import { settingsStyle } from '../styles';

import { useNavigation,  } from "@react-navigation/native";

export default function Settings (){

    const { paramsId } = useContext(UserContext);
    const { countryCode,
            setCountryCode,
            hpNumber,
            setHpNumber,
            officeNumber,
            setOfficeNumber,
            homeNumber,
            setHomeNumber,
          } = useContext(SettingsContext);

    const [countryCodeToAdd, setCountryCodeToAdd] = useState('');
    const [countryCodeError, setCountryCodeError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    
    const validateCountryCode = /^[0-9+ -]{0,8}$/;
    const validatePhoneNumber = /^[0-9+ -]{0,15}$/;

    const navigation = useNavigation();

    const navigateToMain = useCallback(()=>{
        navigation.navigate('MainPage')
    }, [navigation]);

    const navigateToWhiteList = useCallback(()=>{
        navigation.navigate('WhiteList')
    }, [navigation]);

    const navigateToBlockedNumbers = useCallback(()=>{
        navigation.navigate('BlockedNumbers')
    }, [navigation]);

    const navigateToCountryCode = useCallback(()=>{
        navigation.navigate('CountryCode')
    }, [navigation]);

    const updateCountryCode = useCallback(() => {
        setCountryCode(
            countryCodeToAdd
        )
    },[countryCodeToAdd])

    const navigateGoBack = useCallback(()=>{
        navigation.goBack()
    }, [navigation]);
      
    const saveSettings = async() => {        
        try{
            const countryCodeValidation = validateCountryCode.test(countryCodeToAdd);
            const hpNumberValidation = validatePhoneNumber.test(hpNumber);
            const officeNumberValidation = validatePhoneNumber.test(officeNumber);
            const homeNumberValidation = validatePhoneNumber.test(homeNumber);

            console.log(paramsId)
            setAuthHeader(headersData.idToken)
            
            // updateCountryCode()

            if (countryCodeValidation){
                console.log("called countryCode form")
                await APIHandler.post(`/entry/${paramsId}/countryCode`, 
                    {
                        'code': countryCode,    
                        'timeStamp': Date.now()
                    }
                );
            } else {
                setCountryCodeError('invalid country code');
                return;
            }
            
            if (hpNumberValidation) {
                await APIHandler.patch(`/entry/${paramsId}/hpNumber`, {'hpNumber': hpNumber});
            } else {
                setPhoneNumberError('invalid hp number');
                return;
            }

            if (officeNumberValidation){
                await APIHandler.patch(`/entry/${paramsId}/officeNumber`, {'officeNumber': officeNumber});
            } else {
                setPhoneNumberError('invalid office number');
                return;
            }

            if (homeNumberValidation) {
                await APIHandler.patch(`/entry/${paramsId}/homeNumber`, {'homeNumber': homeNumber});
            } else {
                setPhoneNumberError('invalid home number');
                return;
            }
            // navigateToMain();

        } catch(error) {
            console.error('cannot save data', error)
            throw new error;
        }
    }

    // 
    return (
        <>
            <NativeBaseProvider>
                <Box>
                    <ScrollView>
                        <TouchableOpacity onPress={navigateGoBack}>
                            <Text>
                                Go back
                            </Text>
                        </TouchableOpacity>
                        <VStack>
                            <Text style={settingsStyle.title}>
                                How to use: numbers that do not match your provided formats will be blocked. Leave blank if too strict.
                            </Text>
                            <FormControl>
                                <VStack>
                                    <FormControl.Label ml='1'>
                                        Whitelist a country code. Incl the '+' and '-'.
                                        Use only if you are not expecting overseas calls
                                    </FormControl.Label>
                                    <Input  name="countryCode"
                                                value={countryCode}
                                                onChangeText={(value)=>setCountryCode(value)}
                                                w='70%'
                                                mt="2"
                                                ml="2"
                                                />
                                    <HStack>
                                        <Button size="sm" 
                                                colorScheme="secondary"
                                                onPress={navigateToCountryCode}
                                                ml="2"
                                                mb="3"
                                                mt="3"
                                        >
                                            Manage list
                                        </Button>
                                    </HStack>
                                </VStack>
                            </FormControl>
                            <FormControl>
                                <VStack>
                                    <FormControl.Label ml='2'>
                                        Enter Handphone Number Format
                                    </FormControl.Label>
                                    <Input  name="hpNumber"
                                                value={hpNumber}
                                                onChangeText={(value)=> setHpNumber(value)}
                                                w='70%'
                                                mt="2"
                                                ml="2"
                                    />
                                </VStack>
                            </FormControl>
                            <FormControl>
                                <VStack>
                                    <FormControl.Label ml='2'>
                                        Enter Office Number Format
                                    </FormControl.Label>
                                    <Input  name="officeNumber"
                                                value={officeNumber}
                                                onChangeText={(value)=> setOfficeNumber(value)}
                                                w='70%'
                                                mt="2"
                                                ml="2"            
                                    />
                                </VStack>
                            </FormControl>
                            <FormControl>
                                <VStack>
                                    <FormControl.Label ml='2'>
                                        Enter Home Number Format
                                    </FormControl.Label>
                                    <Input  name="homeNumber"
                                                value={homeNumber}
                                                onChangeText={(value)=> setHomeNumber(value)}
                                                w='70%'
                                                mt="2"
                                                ml="2"
                                    />
                                </VStack>
                            </FormControl>
                            <FormControl>
                                <VStack>
                                    <FormControl.Label ml='2'>
                                        Blocked Numbers List
                                    </FormControl.Label>
                                        <Button size="sm" 
                                                colorScheme="secondary"
                                                onPress={navigateToBlockedNumbers}
                                                w='70%'
                                                ml="2"
                                                mt="1"
                                                mb="2"
                                        >
                                            Manage list
                                        </Button>
                                </VStack>
                            </FormControl>
                            <FormControl>
                                <VStack>
                                    <FormControl.Label ml='2'>
                                        WhiteListed Numbers
                                    </FormControl.Label>
                                        <Button size="sm"
                                                colorScheme="secondary"
                                                onPress={navigateToWhiteList}
                                                w='70%'
                                                mt="1"
                                                ml="2"
                                                mb="2"
                                        >
                                            Manage list
                                        </Button>
                                </VStack>
                            </FormControl>
                            <VStack>
                                <View>
                                    <Text style={settingsStyle.error}>
                                    {countryCodeError}
                                    </Text>
                                </View>
                                <View>
                                    <Text style={settingsStyle.error}>
                                    {phoneNumberError}
                                    </Text>
                                </View>
                            </VStack>
                            <Button w="100%"
                                    onPress={saveSettings}
                            >
                                Save Settings
                            </Button>
                        </VStack>
                    </ScrollView>
                </Box>
            </NativeBaseProvider>
        </>
    )
}