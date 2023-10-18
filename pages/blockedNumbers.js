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

    const [searchParams, setSearchParams] = useState('');
    const [foundSearchNumber, setFoundSearchNumber] = useState();
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
        console.log("Fetched blockedNumbers data=>", response.data);
        setBlockedNumbers(response.data);
    }

    useEffect(() => {
        try{
            fetchData();
            console.log("from blocked numbers component, blocked numbers use effect end here")
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
                if (response.data.length === 0){
                    setSearchNotification("No matching number found")
                }
            } catch {
                setSearchNotification('Error fetching searched number');
            }
        } else {
            setSearchNotification('invalid number format');
        }
    }

    const searchPlusNumber = async () => {

        setErrorNotification('');

        try {
            setFoundSearchNumber();
            let response = await APIHandler.get(`/entry/${paramsId}/blockedNumbers/blockedNumber/searchPlus`)
            console.log('response.data here for search plus', response.data);
            if (response.data.length !== 0){
                let array = response.data.map(item => item.blockedNumbers)
                console.log('modified array here', array)
                setFoundSearchNumber(array);
            } else {    
                setSearchNotification('No matching numbers')
            }
        } catch (error) {
            setSearchNotification('Error in search');
        }

    }
    
    const searchMinusNumber = async () => {

        setErrorNotification('');

        try{
            setFoundSearchNumber();
            let response = await APIHandler.get(`/entry/${paramsId}/blockedNumbers/blockedNumber/searchMinus`)
            console.log('response.data here for search minus', response.data);
            if (response.data.length !== 0){
                let array = response.data.map(item => item.blockedNumbers)
                console.log('modified array here', array)
                setFoundSearchNumber(array);
            } else {
                setSearchNotification('No matching numbers');
            }
        } catch (error) {
            setSearchNotification('Error searching for numbers');
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
                            <Link ml="1" _text={{
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
                                        mb="3"
                                />
                                <Text mb="3" ml="3" style={{fontSize:18, fontWeight:600, textDecorationLine:'underline'}}>
                                    Add Block Number
                                </Text>
                                <Button w="20"
                                        ml="3"
                                        mb="3"
                                        onPress={()=>addBlockedNumber(blockedNumberToAdd)}>
                                    Add
                                </Button>
                                <Text>
                                    {errorNotification}
                                </Text>
                            </VStack>
                        </View>
                        <View>
                            <Text   style={{fontSize:18, fontWeight:600, textDecorationLine:'underline'}}
                                    mb="3"
                                    ml="3"
                            >
                                Search For Blocked Number
                            </Text>
                            <VStack>
                                <Input  value={searchParams}
                                        onChangeText={(value)=>setSearchParams(value)}
                                        w='180'
                                        mt="3"
                                        ml="3"
                                        mb="3"
                                />
                                <Button w="20"
                                        ml="3"
                                        mb="3"
                                        onPress={()=>searchFullNumber(searchParams)}
                                        style={{fontSize:10}}   
                                    >
                                    Full No.
                                </Button>
                                <View style={{marginTop:10}}>
                                    <Text   style={{fontSize:18, fontWeight:600, textDecorationLine:'underline'}}
                                    mb="3"
                                    ml="3"
                                    >                           
                                        Or Filter based on:
                                    </Text>
                                </View>
                                <Button w="100"
                                        ml="3"
                                        mb="3"
                                        onPress={()=>searchPlusNumber()}
                                        style={{fontSize:10}}
                                >
                                    find all '+' nos.
                                </Button>
                                <Button w="100"
                                        ml="3"
                                        mb="3"
                                        onPress={()=>searchMinusNumber()}
                                        style={{fontSize:10}}
                                >
                                    find all '-' nos.
                                </Button>
                            </VStack>
                        </View>
                        <View>
                            <View>
                                <Text style={{color: 'red'}} ml="2">
                                    {searchNotification}
                                </Text>
                            </View>
                            <View>
                            {foundSearchNumber? (
                                <View>
                                    <Text   style={{fontSize:21, fontWeight:600, textDecorationLine:'underline'}}
                                            mb="3"
                                            ml="3"
                                            mt="1"
                                            >
                                                Search Results
                                    </Text>
                                </View>
                                ) : (<View></View>)
                            }
                            </View>
                            <View>
                            {foundSearchNumber?
                                (foundSearchNumber.map((foundSearchNumber) => (                            
                                    <View key={foundSearchNumber._id}>
                                        <FormControl>
                                            <VStack>
                                                    <Text style={listingsStyles.listing}
                                                        ml="2"
                                                    >
                                                        Number: {foundSearchNumber.blockedNumber}
                                                    </Text>
                                                    <Button onPress={()=>handleNumberToWhiteList(foundSearchNumber.blockedNumber)}
                                                        w="100"
                                                        ml="2"
                                                        mb="3"
                                                    >
                                                        white list
                                                    </Button>
                                            </VStack>
                                        </FormControl>
                                    </View>
                                    ))
                                ): (<View><Text></Text></View>)}
                            </View>
                        </View>
                        <View>
                            <Heading ml="3">
                                Blocked Numbers
                            </Heading>
                        </View>
                        {blockedNumbers?.map((blockedNumberEntry) => (
                            <View key={blockedNumberEntry._id}>
                                <FormControl>
                                    <VStack>
                                            <Text style={listingsStyles.listing} ml="3">
                                                Number: {blockedNumberEntry.blockedNumber}
                                            </Text>
                                            <Button onPress={()=>handleNumberToWhiteList(blockedNumberEntry.blockedNumber)}
                                                w="100"
                                                ml="3"
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
