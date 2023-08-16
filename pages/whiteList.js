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
    
    const { whiteList,
            setWhiteList,
          } = useContext(SettingsContext)

    useEffect(async () => {
        await APIHandler.get(`/entry/${paramsId}/whiteList`)
        .then(response => setWhiteList(response.data))
        .catch(error => console.error('Failed to retrieve data: ', error))  
    },[])

    const deleteWhiteListedNumber = async (number) => {
        await APIHandler.patch(`/entry/${paramsId}/whiteList/whiteListedNumber/${number}`)
    }

    const addBlockedNumber = async (number) => {
        await APIHandler.post(`/entry/${paramsId}/blockedNumbers`,
        {
            'blockedNumber': `${number}`,
            'timeStamp': Date.now()
        })
    }

    const conditionalRendering =(number)=>{
        if (toggleState == true){
            return(
                <Button onPress={handleWhiteList(number)}>
                    block
                </Button>
            )
        } else {
            return(
                <Text>
                    Number Blocked
                </Text>
            )
        }
    }

    const handleWhiteList = (number) => {
        deleteWhiteListedNumber(number);
        addBlockedNumber(number);
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
                        {whiteList.map((whiteListEntry, index) => (
                            <FormControl key={index}
                            >
                                <VStack>
                                    <Divider>
                                        <Text>
                                            {whiteListEntry.whiteListedNumber}
                                        </Text>
                                        {conditionalRendering(whiteListEntry.whiteListedNumber)}
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
