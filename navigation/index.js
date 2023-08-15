import {useNavigation} from '@react-navigation/native';

const navigation = useNavigation();

export const navigateToMain = () => {
    navigation.navigate('MainPage');
}

export const navigateToLogin = () => {
    navigation.navigate('Login');
}

export const navigateToRegister = () => {
    navigation.navigate('Register');
}

export const navigateToSettings = () => {
    navigation.navigate('Settings');
}

export const goBack = () => {
    navigation.goBack();
}

export const navigateToCountryCode = () => {
    navigation.navigate('CountryCode')
}

export const navigateToBlockedNumbers = () => {
    navigation.navigate('BlockedNumbers')
}

export const navigateToWhiteList = () => {
    navigation.navigate('WhiteList')
}
