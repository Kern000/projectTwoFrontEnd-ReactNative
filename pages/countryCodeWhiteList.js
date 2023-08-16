import { useState, useContext, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { NativeBaseProvider, Heading, VStack, Divider, FormControl, Button, Text, Link } from "native-base";

import { UserContext } from '../context/userContext';
import { SettingsContext } from '../context/settingsContext';

import APIHandler from '../APIHandler';
import { goBack } from '../navigation';

export default function whiteList(){

    const { paramsId } = useContext(UserContext);
    const [toggleState, setToggleState] = useState(true);
    
    const { countryCode,
            setCountryCode,
          } = useContext(SettingsContext)

    useEffect(async () => {
        await APIHandler.get(`/entry/${paramsId}/countryCode`)
        .then(response => setCountryCode(response.data))
        .catch(error => console.error('Failed to retrieve data: ', error))  
    },[])

    const deleteCountryCode = async (number) => {
        await APIHandler.patch(`/entry/${paramsId}/countryCode/code/${number}`)
    }

    const conditionalRendering =(number)=>{
        if (toggleState == true){
            return(
                <Button onPress={handleCountryCode(number)}>
                    remove
                </Button>
            )
        } else {
            return(
                <Text>
                    CountryCode Removed
                </Text>
            )
        }
    }

    const handleCountryCode = (number) => {
        deleteCountryCode(number);
        setToggleState(true)
    }

    return (
        <>
            <NativeBaseProvider>
                <ScrollView>
                    <VStack>
                        <View>
                            <Link _text={{
                                            color: 'blue',
                                            bold: true,
                                            fontSize: 'sm'
                                        }} 
                                href="#"
                                onPress={goBack}
                            >
                                Previous Page
                            </Link>
                        </View>
                        <View>
                            <Heading>
                                WhiteList
                            </Heading>
                        </View>
                        {countryCode.map((countryCodeEntry, index) => (
                            <FormControl key={index}
                            >
                                <VStack>
                                    <Divider>
                                        <Text>
                                            {countryCodeEntry.code}
                                        </Text>
                                        {conditionalRendering(countryCodeEntry.code)}
                                    </Divider>
                                </VStack>
                            </FormControl>
                        ))}
                    </VStack>
                </ScrollView>
            </NativeBaseProvider>
        </>
    )
}
