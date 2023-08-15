import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Config from 'react-native-config';

let headersData = {};

if (AsyncStorage.getItem("token")) {
    headersData["Authorization"] = `Bearer ${AsyncStorage.getItem("token")}`;
}

if (AsyncStorage.getItem("uid")) {
    headersData["uid"] = AsyncStorage.getItem("uid");
}

const APIHandler = axios.create({
    baseURL: Config.REACT_APP_API_BASE_URL,
    headers: headersData
})

APIHandler.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log("Error status: ", error.response.status);

        return Promise.reject(error);
    }
);

export const setAuthHeader = (uid, token) => {
    APIHandler.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    APIHandler.defaults.headers.common["uid"] = uid;
    AsyncStorage.setItem("token", token);                               //store as object {"token": token}
    AsyncStorage.setItem("uid", uid);
}

export const clearAuthHeader = () => {
    delete APIHandler.defaults.headers.common["Authorization"];
    delete APIHandler.defaults.headers.common["uid"];                   // delete operator remove a property (key-value pair) from object.
    AsyncStorage.clear();
}

export default APIHandler;
