import React, {useState, useContext} from 'react';
import { ScrollView, Text, TextInput } from 'react-native';
import { NativeBaseProvider, Box, VStack, HStack, FormControl, Button } from 'native-base';
import { navigateToMain, 
         navigateToCountryCode, 
         navigateToBlockedNumbers, 
         navigateToWhiteList } from '../navigation';

import APIHandler from '../APIHandler';

import { UserContext } from '../context/userContext';
import { SettingsContext } from '../context/settingsContext';

import { settingsStyle } from '../styles';

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
    
    const updateCountryCode = () => {
        setCountryCode(
            [...countryCode, countryCodeToAdd]
        )
    }

    const validateCountryCode = /^[a-zA-Z0-9+ -]{0,8}$/;
    const validatePhoneNumber = /^[0-9+ -]{0,15}$/;

    const saveSettings = async() => {        
        try{
            const countryCodeValidation = validateCountryCode.test(countryCode);
            const hpNumberValidation = validatePhoneNumber.test(hpNumber);
            const officeNumberValidation = validatePhoneNumber.test(officeNumber);
            const homeNumberValidation = validatePhoneNumber.test(homeNumber);

            if (countryCodeValidation){
                await APIHandler.patch(`entry/${paramsId}/countryCode`, countryCode);
            } else {
                setCountryCodeError('invalid country code');
                return;
            }
            
            if (hpNumberValidation) {
                await APIHandler.patch(`entry/${paramsId}/hpNumber`, hpNumber);
            } else {
                setPhoneNumberError('invalid hp number');
                return;
            }

            if (officeNumberValidation){
                await APIHandler.patch(`entry/${paramsId}/officeNumber`, officeNumber);
            } else {
                setPhoneNumberError('invalid office number');
                return;
            }

            if (homeNumberValidation) {
                await APIHandler.patch(`entry/${paramsId}/homeNumber`, homeNumber);
            } else {
                setPhoneNumberError('invalid home number');
                return;
            }
            navigateToMain();

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
                                <Text>
                                {countryCodeError}
                                </Text>
                                <Text>
                                {phoneNumberError}
                                </Text>
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