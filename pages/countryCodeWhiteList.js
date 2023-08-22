import { useContext, useCallback, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { NativeBaseProvider, Heading, VStack, FormControl, Button, Text, Link } from "native-base";

import { UserContext } from '../context/userContext';
import { SettingsContext } from '../context/settingsContext';

import { listingsStyles } from '../styles';

import APIHandler from '../APIHandler';

import { useNavigation } from "@react-navigation/native";

export default function CountryCode(){

    const { paramsId } = useContext(UserContext);
    const { countryCodeList, setCountryCodeList} = useContext(SettingsContext)
    
    const navigation = useNavigation();
    
    const navigateGoBack = useCallback(()=>{
        navigation.goBack();
    }, [navigation])

    async function fetchData() {
        let response = await APIHandler.get(`/entry/${paramsId}/countryCode`);
        console.log("Fetch Data for country =>", response.data);
        setCountryCodeList(response.data);
    }

    useEffect(async () => {        
        try{
            fetchData();
            console.log("from country code component, context country code", countryCodeList);
        } catch (error) {
            console.error('Failed to retrieve data: ', error)  
        }
    },[])

    const deleteCountryCode = async (number) => {
        await APIHandler.patch(`/entry/${paramsId}/countryCode/code/${number}`);
        fetchData();
    }

    return (
        <>
            <NativeBaseProvider>
                <ScrollView style={listingsStyles.background}>
                    <VStack>
                        <View>
                            <Link _text={{
                                            color: 'blue',
                                            bold: true,
                                            fontSize: 'sm'
                                        }} 
                                href="#"
                                onPress={navigateGoBack}
                            >
                                Previous Page
                            </Link>
                        </View>
                        <View>
                            <Heading>
                                WhiteList
                            </Heading>
                        </View>
                            {countryCodeList?.map((countryCodeEntry, index) => (
                            <View>
                                <FormControl key={index}
                                >
                                    <VStack ml="4">
                                            <View>
                                                <Text style={listingsStyles.listing}>
                                                    {countryCodeEntry.code}
                                                </Text>
                                            </View>
                                            <Button onPress={()=>deleteCountryCode(countryCodeEntry.code)}
                                                    w="100"
                                                    ml="4">
                                                remove
                                            </Button>
                                    </VStack>
                                </FormControl>
                            </View>
                        ))}
                    </VStack>
                </ScrollView>
            </NativeBaseProvider>
        </>
    )
}
