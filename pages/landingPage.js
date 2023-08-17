import React, {useCallback} from 'react';
import { Text,
         View,
         Image,
         TouchableOpacity} from 'react-native';
import { NativeBaseProvider, Heading, Center } from 'native-base';
import { landingStyles } from '../styles';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function LandingPage(){

    const navigation = useNavigation();

    const navigateToMain = useCallback(()=>{
        navigation.navigate('MainPage')
    }, [navigation]);                               //prevent rerender, to prevent multiple instance on rerender because it leads to error (autonavi during testing)

    useFocusEffect(()=> {
        const navigationTimeout = setTimeout(navigateToMain, 4000)
        return ()=> clearTimeout(navigationTimeout);
    })

    return (
        <NativeBaseProvider>
            <Center flex={1} w="100%" h="100%">
                <View style={landingStyles.landingContainer}>
                    <Heading size="lg" style={landingStyles.title}>
                        Scam Call Blocker
                    </Heading>
                        <TouchableOpacity onPress={navigateToMain}>
                            <Image source={require('../assets/logo1.png')}
                                                style={landingStyles.imageBackground}
                            />
                        </TouchableOpacity>
                    <Text style={landingStyles.subtitle}>
                        Filter calls based on privacy preferences
                    </Text>
                </View>
            </Center>
        </NativeBaseProvider>
    )
}