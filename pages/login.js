import React, {useState, useContext} from "react";
import { View, TextInput } from 'react-native';
import { NativeBaseProvider, Box, Heading, VStack, FormControl, Center, Button, HStack, Text, Link, Input } from "native-base"; // Import NativeBase components
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigateToRegister, navigateToSettings, goBack } from "../navigation";

import { UserContext } from "../context/userContext";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import APIHandler, { clearAuthHeader, setAuthHeader } from "../APIHandler";

export default function Login (){

    const { setUserName, setParamsId } = useContext(UserContext);
    const [ userFormData, setUserFormData ] = useState('');
    const [ errorNotification, setErrorNotification ] = useState('');
        
    const emailValidationRegex = /^[a-zA-Z0-9._+-]+@[a-zA-Z.-]+\.[A-Za-z]{2,}$/;

    const validatedEmail = (emailAddress) => {
        return emailValidationRegex.test(emailAddress);
    }

    const updateFormField = (event) => {
        let dataToUpdate = {[event.target.name]: event.target.value};
        setUserFormData({...userFormData,...dataToUpdate});
    }

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
        
        event.preventDefault();
        setErrorNotification('');
        
        const {emailAddress, password} = userFormData;

        if (!validatedEmail(emailAddress)) {
            setErrorNotification("Enter valid email");
            return;
        }

        const auth = getAuth();

        signInWithEmailAndPassword(auth, emailAddress, password)
        .then(async(userCredential) => {
                const user = userCredential.user;
                const idToken = await user.getIdToken();
                handleSuccessfulLogin(user.uid, user.email, idToken)    //firebase is user.email
        })
        .catch((error) => {
            console.log("Firebase Error:", error.code, error.message);
        })
    }

    return (
        <NativeBaseProvider>
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
