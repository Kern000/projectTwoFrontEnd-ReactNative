import React, {useEffect, useState} from "react";
import {  NativeBaseProvider } from "native-base";
import {  StatusBar } from 'expo-status-bar';
import {  StyleSheet, 
          SafeAreaView,
          Platform } from 'react-native';
          
          function Example() {
            return <NativeBaseProvider>
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
                      <Input />
                    </FormControl>
                    <FormControl>
                      <FormControl.Label _text={{
                      color: 'muted.700',
                      fontSize: 'sm',
                      fontWeight: 600
                    }}>
                        Password
                      </FormControl.Label>
                      <Input type="password" />
                    </FormControl>
                    <FormControl>
                      <FormControl.Label _text={{
                      color: 'muted.700',
                      fontSize: 'sm',
                      fontWeight: 600
                    }}>
                        Confirm Password
                      </FormControl.Label>
                      <Input type="password" />
                    </FormControl>
                    <VStack space={2} mt={5}>
                      <Button colorScheme="cyan" _text={{
                      color: 'white'
                    }}>
                        SignUp
                      </Button>
          
                      <HStack justifyContent="center" alignItem="center">
                        <IconButton variant="unstyled" startIcon={<Icon as={<MaterialCommunityIcons name="facebook" />} color="muted.700" size="sm" />} />
                        <IconButton variant="unstyled" startIcon={<Icon as={<MaterialCommunityIcons name="google" />} color="muted.700" size="sm" />} />
                        <IconButton variant="unstyled" startIcon={<Icon as={<MaterialCommunityIcons name="github" />} color="muted.700" size="sm" />} />
                      </HStack>
                    </VStack>
                  </VStack>
                </Box>
              </NativeBaseProvider>;
          }
          
              export default () => {
                  return (
                    <NativeBaseProvider>
                      <Center flex={1} px="3">
                          <Example />
                      </Center>
                    </NativeBaseProvider>
                  );
              };
