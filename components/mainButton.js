import React, {useState, useCallback} from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { Heading, Button, Divider, Center, VStack, NativeBaseProvider } from 'native-base';
import { mainButtonStyle as buttonStyle } from '../styles';
import { useNavigation } from '@react-navigation/native';

export default function MainButton(){

    const [mainSwitch, setMainSwitch] = useState(false);

    const toggleSwitch = () => {
        setMainSwitch(!mainSwitch);
    }

    const mainButtonStyle = buttonStyle(mainSwitch);

    const navigation = useNavigation();

    const navigateToLogin = useCallback(()=>{
        navigation.navigate('Login')
    }, [navigation]);
  
    return (
        <NativeBaseProvider>
            <Center flex={1} px={4}>
                <View>            
                    <VStack w="100%" space={5} px="2" mt="4" alignItems="center" justifyContent="center">

                        <Heading size="sm" style={mainButtonStyle.title}>
                            Block Scam Calls Based on Settings
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
                </View>
            </Center>
        </NativeBaseProvider>
    )
};