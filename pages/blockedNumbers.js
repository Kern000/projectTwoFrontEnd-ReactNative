import { useState, useContext, useCallback, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { NativeBaseProvider, Heading, VStack, FormControl, Button, Text, Link, Input, HStack, Divider } from "native-base";

import { UserContext } from '../context/userContext';
import { SettingsContext } from '../context/settingsContext';

import APIHandler from '../APIHandler';

import { useNavigation } from "@react-navigation/native";
import { listingsStyles } from '../styles';

export default function BlockedNumbers(){

    const { paramsId } = useContext(UserContext);
    const [ blockedNumberToAdd, setBlockedNumberToAdd ] = useState();
    const [ errorNotification, setErrorNotification] = useState('');

    const [searchParams, setSearchParams] = useState('');
    const [foundSearchNumber, setFoundSearchNumber] = useState('');
    const [searchNotification, setSearchNotification] = useState('');
   
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
    },[foundSearchNumber])

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

    const searchFullNumber = async (number) => {

        setSearchNotification('');

        const blockedNumberValidation = validatePhoneNumber.test(number);

        if (blockedNumberValidation) {
            try{
                let response = await APIHandler.get(`/entry/${paramsId}/blockedNumbers/blockedNumber?search=${searchParams}`);
                console.log(response.data);
                setFoundSearchNumber(response.data); 
            } catch {
                setSearchNotification('No matching number found');
            }
        } else {
            setSearchNotification('invalid number format');
        }
    }

    const searchPlusNumber = async () => {

        setErrorNotification('');

        const blockedNumberValidation = validatePhoneNumber.test(number);

        if (blockedNumberValidation){
            try {
                let response = await APIHandler.get(`/entry/${paramsId}/blockedNumbers/blockedNumber/searchPlus`)
                console.log('response.data here', response.data);
                setFoundSearchNumber(response.data);
            } catch (error) {
                setErrorNotification('No matching numbers');
            }
        } else {
            setErrorNotification('invalid number format');
        }
    }
    
    const searchMinusNumber = async () => {

        setErrorNotification('');

        const blockedNumberValidation = validatePhoneNumber.test(number);

        if (blockedNumberValidation) {
            try{
                let response = await APIHandler.get(`/entry/${paramsId}/blockedNumbers/blockedNumber/searchMinus`)
                console.log('response.data here', response.data);
                setFoundSearchNumber(response.data);
            } catch (error) {
                setErrorNotification('No matching numbers');
            }
        } else {
            setErrorNotification('invalid number format');
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
                            <Text style={listingsStyles.subtitle}>
                                Search For Blocked Number
                            </Text>
                            <VStack>
                                <Input  value={searchParams}
                                        onChangeText={(value)=>setSearchParams(value)}
                                        w='180'
                                        mt="3"
                                        ml="3"
                                        mb="2"
                                />
                                <Button w="20"
                                        ml="3"
                                        onPress={()=>searchFullNumber(searchParams)}
                                        style={{fontSize:'10px'}}   
                                    >
                                    Full No.
                                </Button>
                                <Divider></Divider>
                                <View>
                                    Or Filter based on:
                                </View>
                                <Button w="50"
                                        ml="3"
                                        onPress={()=>searchPlusNumber()}
                                        style={{fontSize:'10px'}}
                                >
                                    find all '+' nos.
                                </Button>
                                <Button w="50"
                                        ml="3"
                                        onPress={()=>searchMinusNumber()}
                                        style={{fontSize:'10px'}}
                                >
                                    find all '-' nos.
                                </Button>
                                <Text>
                                    {searchNotification}
                                </Text>
                            </VStack>
                        </View>
                        <View>
                            <View>
                                {searchNotification}
                            </View>
                        {foundSearchNumber?.map((foundSearchNumber, index) => (
                            <View>
                                <View>
                                    Search Results
                                </View>
                                <FormControl key={index}
                                >
                                    <VStack>
                                            <Text style={listingsStyles.listing}>
                                                Number: {foundSearchNumber.blockedNumber}
                                            </Text>
                                            <Button onPress={()=>handleNumberToWhiteList(foundSearchNumber.blockedNumber)}
                                                w="100"
                                                ml="2"
                                            >
                                                white list
                                            </Button>
                                    </VStack>
                                </FormControl>
                            </View>
                        ))}
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
