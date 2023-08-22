import { useState, useContext, useEffect, useCallback } from 'react';
import { ScrollView } from 'react-native';
import { NativeBaseProvider, Heading, VStack, FormControl, Button, Text, Link, Input } from "native-base";

import { UserContext } from '../context/userContext';
import { SettingsContext } from '../context/settingsContext';

import APIHandler from '../APIHandler';

import { useNavigation } from "@react-navigation/native";
import { listingsStyles } from '../styles';

export default function WhiteList (){

    const { paramsId } = useContext(UserContext);
    const [ whiteListNumberToAdd, setwhiteListNumberToAdd ] = useState('');
    const [ errorNotification, setErrorNotification] = useState('');
    const { whiteList,
            setWhiteList,
          } = useContext(SettingsContext)

    const navigation = useNavigation();

    const navigateGoBack = useCallback(()=>{
        navigation.goBack();
    },[navigation])

    async function fetchData(){
        let response = await APIHandler.get(`/entry/${paramsId}/whiteList`);
        console.log("Fetch white list data=>", response.data);
        setWhiteList(response.data);
    }

    useEffect(async () => {
        try{
            fetchData();
            console.log("from white list component, white list numbers", whiteList)
        } catch (error) {
            console.error('Failed to retrieve data: ', error)
        }
    },[])


    const validatePhoneNumber = /^[0-9+ -]{0,15}$/;

    const addWhiteListNumber = async (number) => {

        const whiteListNumberValidation = validatePhoneNumber.test(number);
        
        if (whiteListNumberValidation){        
            await APIHandler.post(`/entry/${paramsId}/whiteList`,
            {
                'whiteListedNumber': `${number}`,
                'timeStamp': Date.now()
            })
            fetchData();
        } else {
            setErrorNotification('invalid phone number');
        }
    }

    async function deleteWhiteListedNumber (number){
        await APIHandler.patch(`/entry/${paramsId}/whiteList/whiteListedNumber/${number}`)
    }

    async function addBlockedNumber (number){
        await APIHandler.post(`/entry/${paramsId}/blockedNumbers`,
        {
            'blockedNumber': `${number}`,
            'timeStamp': Date.now()
        })
    }

    const handleNumberToBlock = async (number) => {
        deleteWhiteListedNumber(number);
        addBlockedNumber(number);
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
                            <VStack>
                                <Input  value={whiteListNumberToAdd}
                                        onChangeText={setwhiteListNumberToAdd}
                                        w='150'
                                        mt="2"
                                        ml="2"
                                />
                                <Text>
                                    Add white list number
                                </Text>
                                <Button w="80"
                                        onPress={()=>addWhiteListNumber(whiteListNumberToAdd)}>
                                    Add
                                </Button>
                                <Text>
                                    {errorNotification}
                                </Text>
                            </VStack>
                        </View>
                        <View>
                            <Heading>
                                WhiteList
                            </Heading>
                        </View>
                        {whiteList?.map((whiteListEntry, index) => (
                            <View>
                                <FormControl key={index}
                                >
                                    <VStack>
                                        <Text style={listingsStyles.listing}>
                                            {whiteListEntry.whiteListedNumber}
                                        </Text>
                                        <Button onPress={()=>handleNumberToBlock(whiteListEntry.whiteListedNumber)}
                                                w="100"
                                                ml="4"
                                        >
                                            block
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
