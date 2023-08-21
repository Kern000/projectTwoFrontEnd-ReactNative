import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export let headersData = {};

const APIHandler = axios.create({
    'baseURL': "https://3001-kern000-projecttwobacke-4w513f06izs.ws-us104.gitpod.io",
})

export const setAuthHeader = async (token) => {

    if (await AsyncStorage.getItem("token")){
        let token1 = await AsyncStorage.getItem("token");
        headersData["Authorization"] = `Bearer ${token1}`;
    } else { 
        headersData["Authorization"] = `Bearer ${token}`;
        await AsyncStorage.setItem("token", token);
    }

    APIHandler.defaults.headers.common["Authorization"] = headersData["Authorization"];
}

export const clearAuthHeader = () => {
    delete APIHandler.defaults.headers.common["Authorization"];
    AsyncStorage.clear();
}

export default APIHandler;
