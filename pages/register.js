import React, {useState, useCallback, useContext} from "react";
import { View, TouchableHighlight } from 'react-native';
import { NativeBaseProvider, Box, Heading, VStack, FormControl, Center, Button, HStack, Text, Input } from "native-base"; // Import NativeBase components
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { UserContext } from "../context/userContext";

import APIHandler, { clearAuthHeader, setAuthHeader } from "../APIHandler";

import { useNavigation } from "@react-navigation/native";

import { linkToPreviousPageStyles } from "../styles";

export default function Example() {

  const { setUserName, setParamsId } = useContext(UserContext);
  const [ userFormData, setUserFormData ] = useState(
    {
      'emailAddress': '',
      'password':'',
      'passwordConfirmation':''
    }
  );
  const [ errorNotification, setErrorNotification ] = useState('');            
 
  const navigation = useNavigation();

  const navigateGoBack = useCallback(()=>{
      navigation.goBack()
  }, [navigation]);

  const navigateToLogin = useCallback(()=>{
      navigation.navigate('Login')
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

  const handleSuccessfulRegistration = async (emailAddress, idToken) => {

    console.log('handle successful registration hit');
    try {
      await setAuthHeader(idToken);
      console.log('set auth header completed')
    
      try {
          console.log('using API hit')
          let response = await APIHandler.post("/user/register", {'emailAddress': emailAddress})
          
          setUserName(emailAddress);
          const paramsId = response.data;

          setParamsId(paramsId);
          console.log('paramsId:', paramsId)

          await AsyncStorage.setItem("token", idToken);

          navigateToSettings();

        } catch (error) {
          console.log('/user/register encountered error', error);
          setErrorNotification('An error occurred in registration, please try again')
          clearAuthHeader();
        }
    } catch (error){
      setErrorNotification('Email/user already in use')
    }
  }

  const submitRegistrationForm = (event) => {
        
    event.preventDefault();                                           //only want to change page when auth
    setErrorNotification('');                                         //refresh error state on each user attempt
    
    const {emailAddress, password, passwordConfirmation} = userFormData;

    console.log(emailAddress, password, passwordConfirmation)

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
            handleSuccessfulRegistration(user.email, idToken)       //firebase is user.email
    })
    .catch((error) => {
        console.log("Firebase Error:", error.code, error.message);
        setErrorNotification('Firebase error')
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
                      <Input  name="emailAddress"
                                  value={userFormData.emailAddress.toString()}
                                  onChangeText={(value)=>updateFormField('emailAddress', value)}
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
                              value={userFormData.password.toString()}
                              onChangeText={(value)=>updateFormField('password', value)}
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
                              value={userFormData.passwordConfirmation.toString()}
                              onChangeText={(value)=>updateFormField('passwordConfirmation', value)}
                      />
                    </FormControl>

                    <VStack space={2} mt={5}>
                      <Button colorScheme="cyan" 
                              _text={{color: 'white'}}
                              onPress={submitRegistrationForm}
                      >
                        SignUp
                      </Button>         
                      <HStack justifyContent="center">
                        <Text fontSize="sm" 
                              color="muted.700" 
                              fontWeight={400}
                        >
                          I'm an existing user.{' '}
                        </Text>
                        <TouchableHighlight onPress={navigateToLogin}>
                          <Text   style={linkToPreviousPageStyles.swapPage}> 
                            Login
                          </Text>
                        </TouchableHighlight>
                      </HStack>
                      <View>
                        {errorNotification?
                          (<Text style={{color:'red', fontSize:16}}>
                            {errorNotification}
                          </Text>) : (<Text></Text>)
                        }
                      </View>
                    </VStack>
                  </VStack>
                </Box>
              </Center>
            </NativeBaseProvider>
          )
}
          
