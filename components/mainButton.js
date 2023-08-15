import React, {useState} from 'react';
import { Text, TouchableHighlight } from 'react-native';
import { Heading, Button, Divider, Center, ScrollView, VStack, NativeBaseProvider } from 'native-base';
import { mainButtonStyle } from '../styles';
import { navigateToLogin } from '../navigation';

export default function MainButton(){

    const [mainSwitch, setMainSwitch] = useState(false);

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

