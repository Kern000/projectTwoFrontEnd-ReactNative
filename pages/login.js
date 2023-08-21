import React, {useState, useCallback, useContext} from "react";
import { TouchableHighlight, View, Text } from 'react-native';
import { NativeBaseProvider, Box, Heading, VStack, FormControl, Center, Button, HStack, Input } from "native-base";

import { UserContext } from "../context/userContext";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import APIHandler, { clearAuthHeader, setAuthHeader } from "../APIHandler";

import { useNavigation } from "@react-navigation/native";

import { linkToPreviousPageStyles } from "../styles";

export default function Login (){

    const { userName, setUserName, setParamsId } = useContext(UserContext);
    const [ userFormData, setUserFormData ] = useState(
        {
            emailAddress:'',
            password:''
        }
    );
    const [ errorNotification, setErrorNotification ] = useState('');

    const navigation = useNavigation();

    const navigateGoBack = useCallback(()=>{
        navigation.goBack()
    }, [navigation]);

    const navigateToRegister = useCallback(()=>{
        navigation.navigate('Register')
    }, [navigation]);

    const navigateToSettings = useCallback(()=>{
        navigation.navigate('Settings')
    }, [navigation]);

    const emailValidationRegex = /^[a-zA-Z0-9._+-]+@[a-zA-Z.-]+\.[A-Za-z]{2,}$/;

    const validatedEmail = (emailAddress) => {
        return emailValidationRegex.test(emailAddress);
    }

    const updateFormField = (fieldName, value) => {
        setUserFormData((prevData) => ({...prevData, [fieldName]:value}));
    }

    const handleSuccessfulLogin = async (emailAddress, idToken) => {

        setAuthHeader(idToken);

        console.log('handleLogin', emailAddress)
        console.log('idtoken123', idToken)

        try{
            let response = await APIHandler.post("/user/login", {'emailAddress':emailAddress, 'idToken':idToken})

            setUserName(emailAddress);

            const paramsId = response.data;
            setParamsId(paramsId);

            console.log('Login Successful', paramsId);
            navigateToSettings();

        } catch(error) {
            console.log('/user/login encountered error', error);
            clearAuthHeader();
        }
    }

    const submitLoginForm = (event) => {
        
        event.preventDefault();
        setErrorNotification('');
        
        const {emailAddress, password} = userFormData;
        console.log('handlelogin123=>', emailAddress, password)

        if (!validatedEmail(emailAddress)) {
            setErrorNotification("Enter valid email");
            return;
        }

        const auth = getAuth();

        signInWithEmailAndPassword(auth, emailAddress, password)
        .then(async(userCredential) => {
                const user = userCredential.user;
                const idToken = await user.getIdToken();
                handleSuccessfulLogin(user.email, idToken)    //firebase is user.email
        })
        .catch((error) => {
            if (error === "auth/user-not-found") {
                setErrorNotification('user not found');
            } else {
                console.log("Firebase Error:", error.code, error.message);
                setErrorNotification(`Firebase Error => ${error.code} ${error.message}`);
        }
        })
    }

    return (
        <NativeBaseProvider>
            <View>
                <TouchableHighlight>
                    <Text   style={linkToPreviousPageStyles.link}
                            onPress={navigateGoBack}
                    > 
                        Previous Page
                    </Text>
                </TouchableHighlight>
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
                            <Input  name="emailAddress"
                                        value={userFormData.emailAddress}
                                        onChangeText={(value)=>updateFormField('emailAddress', value)}
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
                                    onChangeText={(value)=>updateFormField('password', value)}
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
                                <Text>
                                {errorNotification}
                                </Text>
                            </View>
                        </VStack>

                        <HStack justifyContent="center">
                            <Text   fontSize="sm" 
                                    color="muted.700" 
                                    fontWeight={400}

                            >
                                I'm a new user.{' '}
                            </Text>
                            <TouchableHighlight onPress={navigateToRegister}>
                                <Text   style={linkToPreviousPageStyles.swapPage}
                                > 
                                    Sign up
                                </Text>
                            </TouchableHighlight>
                        </HStack>
                    </VStack>
                    <View>
                        <Text>
                            {errorNotification}
                        </Text>
                    </View>
                </Box>
            </Center>
        </NativeBaseProvider>
    )
}
