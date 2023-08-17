import { createContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext= createContext();

const UserContextData = ({children}) => {

    const [userName, setUserName] = useState('');
    const [paramsId, setParamsId] = useState('');

    useEffect(()=> {
        const fetchData = async() => {
            try{
                let defaultUserName = await AsyncStorage.getItem("email")? AsyncStorage.getItem("email") : '';
                setUserName(defaultUserName);
            } catch (error) {
                console.error('Error in email retrieval', error)
            }
        }
        fetchData();
    }, [])

    return(
        <UserContext.Provider value={{userName, setUserName, paramsId, setParamsId}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextData;