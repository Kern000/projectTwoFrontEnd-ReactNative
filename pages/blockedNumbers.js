import { useState, useContext, useCallback, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { NativeBaseProvider, Heading, VStack, FormControl, Button, Text, Link, Input } from "native-base";

import { UserContext } from '../context/userContext';
import { SettingsContext } from '../context/settingsContext';

import APIHandler from '../APIHandler';

import { useNavigation } from "@react-navigation/native";
import { listingsStyles } from '../styles';

export default function BlockedNumbers(){

    const { paramsId } = useContext(UserContext);
    const [ blockedNumberToAdd, setBlockedNumberToAdd ] = useState();
    const [ errorNotification, setErrorNotification] = useState('');
   
    const { blockedNumbers,
            setBlockedNumbers,
          } = useContext(SettingsContext)

    const navigation = useNavigation();

    const navigateGoBack = useCallback(()=>{
        navigation.goBack();
    }, [navigation])
      
    async function fetchData(){
        let response = await APIHandler.get(`/entry/${paramsId}/blockedNumbers`);
        console.log("Fetch blockedNumbers data=>", response.data);
        setBlockedNumbers(response.data);
    }

    useEffect(() => {
        try{
            fetchData();
            console.log("from blocked numbers component, blocked numbers", whiteList)
        } catch (error) {
            console.error('Failed to retrieve data: ', error)
        }  
    },[])

    const validatePhoneNumber = /^[0-9+ -]{0,15}$/;

    async function addBlockedNumber (number){
        const blockedNumberValidation = validatePhoneNumber.test(number);
        
        if (blockedNumberValidation){
            await APIHandler.post(`/entry/${paramsId}/blockedNumbers`,
            {
                'blockedNumber': `${number}`,
                'timeStamp': Date.now()
            })
            fetchData();
        } else {
            setErrorNotification('invalid phone number');
        }
    }

    async function addWhiteListNumber (number){
        await APIHandler.post(`/entry/${paramsId}/whiteList`,
        {
            'whiteListedNumber': `${number}`,
            'timeStamp': Date.now()
        })
        fetchData();
    }

    async function deleteBlockedNumber (number){
        try {
            await APIHandler.patch(`/entry/${paramsId}/blockedNumbers/blockedNumber/${number}`)
        } catch {
            console.error('failed to delete number')
        }
    }

    const handleNumberToWhiteList = (number) => {
        addWhiteListNumber(number);
        deleteBlockedNumber(number);
        fetchData();
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
                            <VStack>
                                <Input  value={blockedNumberToAdd}
                                        onChangeText={(value)=>setBlockedNumberToAdd(value)}
                                        w='180'
                                        mt="3"
                                        ml="3"
                                        mb="2"
                                />
                                <Text style={listingsStyles.subtitle}>
                                    Add Block Number
                                </Text>
                                <Button w="20"
                                        ml="3"
                                        onPress={()=>addBlockedNumber(blockedNumberToAdd)}>
                                    Add
                                </Button>
                                <Text>
                                    {errorNotification}
                                </Text>
                            </VStack>
                        </View>
                        <View>
                            <Heading>
                                Blocked Numbers
                            </Heading>
                        </View>
                        {blockedNumbers?.map((blockedNumberEntry, index) => (
                            <View>
                                <FormControl key={index}
                                >
                                    <VStack>
                                            <Text style={listingsStyles.listing}>
                                                Number: {blockedNumberEntry.blockedNumber}
                                            </Text>
                                            <Button onPress={()=>handleNumberToWhiteList(blockedNumberEntry.blockedNumber)}
                                                w="100"
                                                ml="2"
                                            >
                                                white list
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
