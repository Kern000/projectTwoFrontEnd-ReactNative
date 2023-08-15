import React, {useEffect} from 'react';
import {    StyleSheet, 
            Text,
            View,
            ImageBackground, 
            TouchableWithoutFeedback} from 'react-native';
import {    Heading         } from 'native-base';
import {    useNavigation   } from '@react-navigation/native';

export default function LandingPage(){

    const navigation = useNavigation();

    const navigateToMain = () => {
        navigation.navigate('MainPage');
    }

    useEffect(()=> {
        const navigationTimeout = setTimeout(()=> navigateToMain(), 3000)
        return ()=> clearTimeout(navigationTimeout);
    }, [])

    const landingStyles = StyleSheet.create({
        landingContainer: {
            flex:1,
            justifyContent: 'center',
            alignContent: 'center',
            backgroundColor: 'white',
            padding: 0
        },
        title: {
            fontFamily: 'Montserrat-SemiBold',
            color: '#333333',
            paddingBottom: 2
        },
        imageBackground: {
            resizeMode:'center',                //I do not want the logo to scale to changing dimensions
        },
        subtitle: {
            fontFamily: 'Montserrat-Regular',
            color: '#333333',
            fontSize: 12,                       //(density-independent pixels)
            paddingTop: 2
        }
    })

    return(
        <TouchableWithoutFeedback onPress={navigateToMain}>
            <View style={landingStyles.landingContainer}>
                <Heading    size="md"
                            style={landingStyles.title}
                >
                    Scam Call Blocker
                </Heading>
                <ImageBackground    source={require('./assets/logo1.jpg')}
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