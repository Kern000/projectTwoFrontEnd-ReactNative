import { useState, useContext, useCallback, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { NativeBaseProvider, Heading, VStack, Divider, FormControl, Button, Text, Link } from "native-base";

import { UserContext } from '../context/userContext';
import { SettingsContext } from '../context/settingsContext';

import APIHandler from '../APIHandler';

import { useNavigation } from "@react-navigation/native";

export default function BlockedNumbers(){

    const { paramsId } = useContext(UserContext);
    const [toggleState, setToggleState] = useState(true);
    
    const { blockedNumbers,
            setBlockedNumbers,
          } = useContext(SettingsContext)

    const navigation = useNavigation();

    const navigateGoBack = useCallback(()=>{
        navigation.goBack();
    }, [navigation])
      
    useEffect(async () => {
        await APIHandler.get(`/entry/${paramsId}/blockedNumbers`)
        .then(response => setBlockedNumbers(response.data))
        .catch(error => console.error('Failed to retrieve data: ', error))  
    },[])

    const deleteBlockedNumber = async (number) => {
        await APIHandler.patch(`/entry/${paramsId}/blockedNumbers/blockedNumber/${number}`)
    }

    const addWhiteListNumber = async (number) => {
        await APIHandler.post(`/entry/${paramsId}/whiteList`,
        {
            'whiteListedNumber': `${number}`,
            'timeStamp': Date.now()
        })
    }

    const conditionalRendering =(number)=>{
        if (toggleState == true){
            return(
                <Button onPress={handleBlockedNumber(number)}>
                    whiteList
                </Button>
            )
        } else {
            return(
                <Text>
                    Number WhiteListed
                </Text>
            )
        }
    }

    const handleBlockedNumber = (number) => {
        deleteBlockedNumber(number);
        addWhiteListNumber(number);
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
                                onPress={navigateGoBack}
                            >
                                Previous Page
                            </Link>
                        </View>
                        <View>
                            <Heading>
                                Blocked Numbers
                            </Heading>
                        </View>
                        {blockedNumbers.map((blockedNumberEntry, index) => (
                            <FormControl key={index}
                            >
                                <VStack>
                                    <Divider>
                                        <Text>
                                            {blockedNumberEntry.blockedNumber}
                                        </Text>
                                        {conditionalRendering(blockedNumberEntry.blockedNumber)}
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
