import React, {useEffect} from 'react';
import { Text,
         View,
         ImageBackground, 
         TouchableWithoutFeedback} from 'react-native';
import { Heading } from 'native-base';
import { landingStyles } from '../styles';
import { navigateToMain } from '../navigation';

export default function LandingPage(){

    useEffect(()=> {
        const navigationTimeout = setTimeout(()=> navigateToMain(), 3000)
        return ()=> clearTimeout(navigationTimeout);
    }, [])

    return(
        <TouchableWithoutFeedback onPress={navigateToMain}>
            <View style={landingStyles.landingContainer}>
                <Heading    size="md"
                            style={landingStyles.title}
                >
                    Scam Call Blocker
                </Heading>
                <ImageBackground    source={require('../assets/logo1.jpg')}
                                    style={landingStyles.imageBackground}
                >
                </ImageBackground>
                <Text style={landingStyles.subtitle}>
                    Filter calls based on privacy preferences
                </Text>
            </View>
        </TouchableWithoutFeedback>
    )
}