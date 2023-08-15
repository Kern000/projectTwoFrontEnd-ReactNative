import React, {useState} from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';
import { Heading, Button, Divider, Center, ScrollView, VStack, NativeBaseProvider } from 'native-base';
import { useNavigation } from '@react-navigation/native';

export default function MainButton(){

    const [mainSwitch, setMainSwitch] = useState(false);

    const navigation = useNavigation();

    const navigateToLogin = () => {
        navigation.navigate('Login');
    }

    const mainButtonStyle= StyleSheet.create({

        title:              {
                                color: 'white',
                                fontFamily: 'Montserrat-SemiBold',
                                textAlign: 'center'
                            },
        roundButton:        {
                                borderRadius: 50,
                                paddingHorizontal: 20,
                                paddingVertical: 20,
                                backgroundColor: mainSwitch ? '#32CD32' : '#7F00FF',
                                flexWrap: 'wrap',
                                alignItems: 'center',
                                justifyContent: 'center'
                            },
        buttonText:         {
                                fontWeight: 'bold',
                                color: 'white',
                                fontFamily: 'Montserrat-SemiBold',
                                textAlign: 'center'
                            },
        settingsButton:     {
                                width: 250,
                                height: 120,
                                backgroundColor: '#E5E4E2',
                                flexWrap: 'Wrap',
                                alignItems: 'center',
                                justifyContent: 'center'
                            },
        settingsButtonText: {
                                color: '#6082B6',
                                fontFamily: 'Montserrat-SemiBold',
                                textAlign: 'center'
                            }
    })

    const toggleSwitch = () => {
        setMainSwitch(!mainSwitch)
    }

    return (
        <NativeBaseProvider>
            <Center flex={1} px={4}>
                <ScrollView showsVerticalScrollIndicator={false}>            
                    <VStack w="100%" space={5} px="2" mt="4" alignItems="center" justifyContent="center">

                        <Heading size="sm" style={mainButtonStyle.title}>
                            Block Scam Calls Based on Privacy
                        </Heading>

                        <TouchableHighlight activeOpacity={0.7}>
                            <Button size="lg"
                                    style={mainButtonStyle.roundButton}
                                    onPress={toggleSwitch}
                            >
                                <Text style={mainButtonStyle.buttonText}>
                                    {mainSwitch ? "Privacy is On" : "Privacy is Off"}
                                </Text>
                            </Button>
                        </TouchableHighlight>

                        <Divider w="100%" />

                        <TouchableHighlight activeOpacity={0.7}>
                            <Button style={mainButtonStyle.settingsButton}
                                    onPress={navigateToLogin}
                            >
                                <Text style={mainButtonStyle.settingsButtonText}>
                                    Privacy Settings
                                </Text>
                            </Button>
                        </TouchableHighlight>

                    </VStack>
                </ScrollView>
            </Center>
        </NativeBaseProvider>
    )
};

