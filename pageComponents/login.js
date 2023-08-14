// React and React Native
import React, {useState, useContext} from "react";
import { View, TextInput } from 'react-native';
import { NativeBaseProvider, Box, Heading, VStack, FormControl, Center, Button, HStack, Text, Link, Input } from "native-base"; // Import NativeBase components
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Context
import { UserContext } from "../context/userContext";

// Firebase
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import APIHandler, { clearAuthHeader, setAuthHeader } from "../APIHandler";

export default function Login (){

    // Context
    const { setUserName, setParamsId } = useContext(UserContext);

    // State
    const [userFormData, setUserFormData] = useState('');
    const [errorNotification, setErrorNotification] = useState('');
    
    // navigate
    const navigation = useNavigation();
    
    const navigateToRegister = () => {
        navigation.navigate('Register');
    }

    const navigateToSettings = () => {
        navigation.navigate('Settings');
    }

    // validation
    const emailValidationRegex = /^[a-zA-Z0-9._+-]+@[a-zA-Z.-]+\.[A-Za-z]{2,}$/;      // \ is used for the special chr . regex needed here because server need validation, not just at backend database

    const validatedEmail = (emailAddress) => {
        return emailValidationRegex.test(emailAddress);
    }

    // DOM
    const updateFormField = (event) => {
        let dataToUpdate = {[event.target.name]: event.target.value};
        setUserFormData({...userFormData,...dataToUpdate});
    }

    // Handle Authorization
    const handleSuccessfulLogin = (uid, emailAddress, idToken) => {

        setAuthHeader(uid, idToken);

        APIHandler.get("/user/login", {uid, emailAddress, idToken})
        .then((response)=> {
            setUserName(emailAddress);
            const paramsId = response.data;
            setParamsId(paramsId);
            AsyncStorage.setItem("emailAddress", emailAddress);
            navigateToSettings()
        }).catch((error) => {
            console.log('/user/login encountered error', error);
            clearAuthHeader();
        })
    }

    const submitLoginForm = (event) => {
        
        event.preventDefault();         //only want to change page when auth
        setErrorNotification('');       //refresh error state on each user attempt
        
        const {emailAddress, password} = userFormData;

        if (!validatedEmail(emailAddress)) {        //the if is looking when it is false, so !false = positive, it gets executed
            setErrorNotification("Enter valid email");
            return;
        }

        const auth = getAuth();                     // initialize Auth instance of firebase

        signInWithEmailAndPassword(auth, emailAddress, password)
        .then(async(userCredential) => {
                const user = userCredential.user;
                const idToken = await user.getIdToken();
                handleSuccessfulLogin(user.uid, user.email, idToken)    //note that firebase object is user.email, though in local case we will use emailAddress
        })
        .catch((error) => {
            console.log("Firebase Error:", error.code, error.message);
        })
    }

    return (
        <NativeBaseProvider>
            <Center flex={1} px="3">
                <Box safeArea flex={1} p={2} w="90%" mx="auto">
                    <Heading size="md" color="primary.500">
                        Welcome
                    </Heading>
                    <Heading color="muted.400" size="xs">
                        Log in to continue!
                    </Heading>

                    <VStack space={2} mt={5}>
                        <FormControl>
                            <FormControl.Label _text={{
                                color: 'muted.700',
                                fontSize: 'sm',
                                fontWeight: 600
                            }}>
                                Email ID
                            </FormControl.Label>
                            <TextInput  name="emailAddress"
                                        value={userFormData.emailAddress}
                                        onChangeText={updateFormField}
                            />
                        </FormControl>
                        
                        <FormControl mb={5}>
                            <FormControl.Label _text={{
                                color: 'muted.700',
                                fontSize: 'sm',
                                fontWeight: 600
                            }}>
                                Password
                            </FormControl.Label>
                            <Input  type="password"
                                    name="password"
                                    value={userFormData.password}
                                    onChangeText={updateFormField}
                            />
                        </FormControl>

                        <VStack space={2}>
                            <Button colorScheme="cyan" 
                                    _text={{color: 'white'}}
                                    name="loginButton"
                                    onPress={submitLoginForm}
                            >
                                Login
                            </Button>
                            <View>
                                {errorNotification}
                            </View>
                        </VStack>

                        <HStack justifyContent="center">
                            <Text   fontSize="sm" 
                                    color="muted.700" 
                                    fontWeight={400}

                            >
                                I'm a new user.{' '}
                            </Text>
                            <Link   _text={{
                                            color: 'cyan.500',
                                            bold: true,
                                            fontSize: 'sm'
                                            }} 
                                    href="#"
                                    onPress={navigateToRegister}
                            >
                                Sign Up
                            </Link>
                        </HStack>
                    </VStack>
                </Box>
            </Center>
        </NativeBaseProvider>
    )
}
