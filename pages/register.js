import React, {useState, useContext} from "react";
import { View, TextInput } from 'react-native';
import { NativeBaseProvider, Box, Heading, VStack, FormControl, Center, Button, HStack, Text, Link, Input } from "native-base"; // Import NativeBase components
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigateToLogin, navigateToSettings, goBack } from "../navigation";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { UserContext } from "../context/userContext";

import APIHandler, { clearAuthHeader, setAuthHeader } from "../APIHandler";

export default function Example() {

  const { setUserName, setParamsId } = useContext(UserContext);
  const [ userFormData, setUserFormData ] = useState('');
  const [ errorNotification, setErrorNotification ] = useState('');            

  const emailValidationRegex = /^[a-zA-Z0-9._+-]+@[a-zA-Z.-]+\.[A-Za-z]{2,}$/;
  
  const validatedEmail = (emailAddress) => {
    return emailValidationRegex.test(emailAddress);
  }
  
  const updateFormField = (event) => {
    let dataToUpdate = {[event.target.name]: event.nativeEvent.text};
    setUserFormData({...userFormData,...dataToUpdate});
  }

  const handleSuccessfulRegistration = (uid, emailAddress, idToken) => {

    setAuthHeader(uid, idToken);

    APIHandler.post("/user/register", {uid, emailAddress, idToken})
    .then((response)=> {
        setUserName(emailAddress);
        const paramsId = response.data;
        setParamsId(paramsId);
        AsyncStorage.setItem("emailAddress", emailAddress);
        navigateToSettings();
    }).catch((error) => {
        console.log('/user/register encountered error', error);
        clearAuthHeader();
    })
  }

  const submitRegistrationForm = (event) => {
        
    event.preventDefault();                                           //only want to change page when auth
    setErrorNotification('');                                         //refresh error state on each user attempt
    
    const {emailAddress, password, passwordConfirmation} = userFormData;

    if (!validatedEmail(emailAddress)) {
      setErrorNotification("Enter valid email");
      return;
    }

    if (password !== passwordConfirmation){
      setErrorNotification("Passwords do not match!");
      return;
    }

    const auth = getAuth();

    createUserWithEmailAndPassword(auth, emailAddress, password)
    .then(async(userCredential) => {
            const user = userCredential.user;
            const idToken = await user.getIdToken();
            handleSuccessfulRegistration(user.uid, user.email, idToken)       //firebase is user.email
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
                  <Heading size="lg" color="primary.500">
                    Welcome
                  </Heading>
                  <Heading color="muted.400" size="xs">
                    Sign up to continue!
                  </Heading>
          
                  <VStack space={2} mt={5}>
                    <FormControl>
                      <FormControl.Label _text={{
                        color: 'muted.700',
                        fontSize: 'sm',
                        fontWeight: 600
                      }}>
                        Email
                      </FormControl.Label>
                      <TextInput  name="emailAddress"
                                  value={userFormData.emailAddress}
                                  onChangeText={updateFormField}
                      />
                    </FormControl>
                    
                    <FormControl>
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
                    
                    <FormControl>
                      <FormControl.Label _text={{
                        color: 'muted.700',
                        fontSize: 'sm',
                        fontWeight: 600
                      }}>
                        Confirm Password
                      </FormControl.Label>
                      <Input  type="password"
                              name="passwordConfirmation"
                              value={userFormData.passwordConfirmation}
                              onChangeText={updateFormField}
                      />
                    </FormControl>

                    <VStack space={2} mt={5}>
                      <Button colorScheme="cyan" 
                              _text={{color: 'white'}}
                              onPress={submitRegistrationForm}
                      >
                        SignUp
                      </Button>
                      <View>
                        {errorNotification}
                      </View>
          
                      <HStack justifyContent="center">
                        <Text fontSize="sm" 
                              color="muted.700" 
                              fontWeight={400}
                        >
                          I'm an existing user.{' '}
                        </Text>
                        <Link _text={{
                                        color: 'cyan.500',
                                        bold: true,
                                        fontSize: 'sm'
                                        }} 
                              href="#"
                              onPress={navigateToLogin}
                        >
                          Log in
                        </Link>
                      </HStack>
                    </VStack>
                  </VStack>
                </Box>
              </Center>
            </NativeBaseProvider>
          )
}
          
