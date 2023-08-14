import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const headersData = {};

// set Header based on token received from firebase

if (AsyncStorage.getItem("token")) {
    headersData["Authorization"] = `Bearer ${AsyncStorage.getItem("token")}`;
}

if (AsyncStorage.getItem("uid")) {
    headersData["uid"] = AsyncStorage.getItem("uid");
}

const APIHandler = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: headersData
})

// axios.create create an instance of Axios HTTP client.

APIHandler.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log("Error status: ", error.response.status);

        return Promise.reject(error);
    }
);
// intercept error in centralized manner, prevent .then from executing, and funnel into catch

export const setAuthHeader = (uid, token) => {
    APIHandler.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    APIHandler.defaults.headers.common["uid"] = uid;
    AsyncStorage.setItem("token", token);               //store as object {"token": token}
    AsyncStorage.setItem("uid", uid);
}

// defaults object within an instance allows setting of default configuration applied to all requests made using that instance
// The common headers are sent with every request, regardless of the HTTP method used.

export const clearAuthHeader = () => {
    delete APIHandler.defaults.headers.common["Authorization"];
    delete APIHandler.defaults.headers.common["uid"];
    AsyncStorage.clear();
}

// delete operator is used to remove a property (key-value pair) from an object.

export default APIHandler;


