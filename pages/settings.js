// React and React Native
import React, {useState, useContext} from 'react';
import { ScrollView, Text, TextInput } from 'react-native';
import { NativeBaseProvider, Box, VStack, HStack, FormControl, Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';

// API interaction
import APIHandler from '../APIHandler';

// Context
import { UserContext } from '../context/userContext';
import { SettingsContext } from '../context/settingsContext';

export default function Settings (){

    // Utility
    const validateCountryCode = /^[a-zA-Z0-9+ -]{0,8}$/;

    const validatePhoneNumber = /^[0-9+ -]{0,15}$/;

    // Context
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
    
    // State Change for array
    const updateCountryCode = () => {
        setCountryCode(
            [...countryCode, countryCodeToAdd]
        )
    }

    // Save to Settings to Database
    const saveSettings = async() => {        
        try{
            const countryCodeValidation = validateCountryCode.test(countryCode);
            const hpNumberValidation = validatePhoneNumber.test(hpNumber);
            const officeNumberValidation = validatePhoneNumber.test(officeNumber);
            const homeNumberValidation = validatePhoneNumber.test(homeNumber);

            if (countryCodeValidation){
                await APIHandler.patch(`user/${paramsId}/countryCode`, countryCode);
            } else {
                setCountryCodeError('invalid country code');
                return;
            }
            
            if (hpNumberValidation) {
                await APIHandler.patch(`user/${paramsId}/hpNumber`, hpNumber);
            } else {
                setPhoneNumberError('invalid hp number');
                return;
            }

            if (officeNumberValidation){
                await APIHandler.patch(`user/${paramsId}/officeNumber`, officeNumber);
            } else {
                setPhoneNumberError('invalid office number');
                return;
            }

            if (homeNumberValidation) {
                await APIHandler.patch(`user/${paramsId}/homeNumber`, homeNumber);
            } else {
                setPhoneNumberError('invalid home number');
                return;
            }
            navigation.navigate("MainPage");

        } catch(error) {
            console.error('cannot save data', error)
            throw new error;
        }
    }

    // Navigation
    const navigation = useNavigation();

    const navigateToCountryCode = () => {
        navigation.navigate('CountryCode')
    }
    const navigateToBlockedNumbers = () => {
        navigation.navigate('BlockedNumbers')
    }
    const navigateToWhiteList = () => {
        navigation.navigate('WhiteList')
    }

    // Styling
    const settingsStyle = StyleSheet.create({
        title:  {
                    color: 'black',
                    fontSize: 10
                }
    })

    // 
    return (
        <>
            <NativeBaseProvider>
                <Box>
                    <ScrollView>
                        <VStack>
                            <Text style={settingsStyle.title}>
                                Privacy: numbers that do not match your provided formats will be blocked. Leave blank if too strict.
                            </Text>
                            <FormControl>
                                <VStack>
                                    <FormControl.Label>
                                        Filter based on country code. Incl the '+' and '-'.
                                        Use only if you are not expecting overseas calls
                                    </FormControl.Label>
                                    <TextInput  name="countryCode"
                                                value={countryCodeToAdd}
                                                onChangeText={event=> setCountryCodeToAdd(event.nativeEvent.text)}
                                                />
                                    <HStack>
                                        <Button size="sm" 
                                                colorScheme="secondary"
                                                onPress={updateCountryCode}
                                        >
                                            Add
                                        </Button>
                                        <Button size="sm" 
                                                colorScheme="secondary"
                                                onPress={navigateToCountryCode}
                                        >
                                            Manage list
                                        </Button>
                                    </HStack>
                                </VStack>
                            </FormControl>

                            <FormControl>
                                <VStack>
                                    <FormControl.Label>
                                        Enter Handphone Number Format
                                    </FormControl.Label>
                                    <TextInput  name="hpNumber"
                                                value={hpNumber}
                                                onChangeText={event=> setHpNumber(event.nativeEvent.text)}
                                    />
                                </VStack>
                            </FormControl>
                            
                            <FormControl>
                                <VStack>
                                    <FormControl.Label>
                                        Enter Office Number Format
                                    </FormControl.Label>
                                    <TextInput  name="officeNumber"
                                                value={officeNumber}
                                                onChangeText={event=> setOfficeNumber(event.nativeEvent.text)}
                                                />
                                </VStack>
                            </FormControl>
                            
                            <FormControl>
                                <VStack>
                                    <FormControl.Label>
                                        Enter Home Number Format
                                    </FormControl.Label>
                                    <TextInput  name="homeNumber"
                                                value={homeNumber}
                                                onChangeText={event=> setHomeNumber(event.nativeEvent.text)}
                                                />
                                </VStack>
                            </FormControl>

                            <FormControl>
                                <VStack>
                                    <FormControl.Label>
                                        Blocked Numbers List
                                    </FormControl.Label>
                                        <Button size="sm" 
                                                colorScheme="secondary"
                                                onPress={navigateToBlockedNumbers}
                                        >
                                            Manage list
                                        </Button>
                                </VStack>
                            </FormControl>

                            <FormControl>
                                <VStack>
                                    <FormControl.Label>
                                        WhiteListed Numbers
                                    </FormControl.Label>
                                        <Button size="sm"
                                                colorScheme="secondary"
                                                onPress={navigateToWhiteList}
                                        >
                                            Manage list
                                        </Button>
                                </VStack>
                            </FormControl>
                            <VStack>
                                {countryCodeError}
                                {phoneNumberError}
                            </VStack>
                            <Button w="80%"
                                    onPress={saveSettings}
                            >
                                Save Settings and Return
                            </Button>

                        </VStack>
                    </ScrollView>
                </Box>
            </NativeBaseProvider>
        </>
    )
}