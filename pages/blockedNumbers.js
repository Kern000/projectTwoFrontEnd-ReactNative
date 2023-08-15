import { useContext, useEffect, useState } from 'react';
import { NativeBaseProvider, Heading, ScrollView, VStack, FormControl, Button, Text, Link } from "native-base";

import { UserContext } from '../context/userContext';
import { SettingsContext } from '../context/settingsContext';

import { APIHandler } from '../APIHandler'
import { goBack } from '../navigation'

export default function BlockedNumbers(){

    const { paramsId } = useContext(UserContext);
    
    const { blockedNumbers,
            setBlockedNumbers,
          } = useContext(SettingsContext)

    useEffect(async () => {
        await APIHandler.get(`/entry/${paramsId}/blockedNumbers`)
        .then(response => setBlockedNumbers(response.data))
        .catch(error => console.error('Failed to retrieve data: ', error))  
    },[paramsId, setBlockedNumbers])

    // use delete from axios.patch, then remove the button and render (whitelisted) - this is the easier way without re-rendering and dealing with large state datas and changes
    // const deleteMatchingInNestedArray = async (userId, fieldWithDataArrayAsValue, nestedObjectKey, itemMatchCondition)
    // do not depend on state because of App life cycle
    // await addArrayItem(userId, fieldWithDataArrayAsValue, data); use this to update whiteList
    // remember to add Date.Now() in the data for Axios

    // const WhiteListBlockedNumber = (number) => {
    //     removeBlockedNumber();
    //     addToWhiteList();
    //     APIHandler.patch

    // }

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
                                Blocked Numbers
                            </Heading>
                        </View>
                        {blockedNumbers.map((blockedNumberEntry, index) => (
                            <FormControl key={index}
                            >
                                <VStack>
                                    <Text>
                                        {blockedNumberEntry.blockedNumber}
                                    </Text>
                                    <Button onPress={}>
                                        WhiteList
                                    </Button>
                                </VStack>
                            </FormControl>
                        ))}
                    </VStack>
                </ScrollView>
            </NativeBaseProvider>
        </>
    )
}
