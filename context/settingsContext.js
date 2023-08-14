import React, {useState, createContext, useMemo} from 'react';

export const SettingsContext = createContext();

const SettingsContextData = ({children}) => {

    const [settingsFormData, setSettingsFormData] = useState({});
    const [countryCode, setCountryCode] = useState([]);
    const [hpNumber, setHpNumber] = useState('');
    const [officeNumber, setOfficeNumber] = useState('');
    const [homeNumber, setHomeNumber] = useState('');
    const [blockedNumbers, setBlockedNUmbers] = useState([]);
    const [whiteList, setWhiteList] = useState([]);

    const contextValue = useMemo(()=>{
        return({       
            settingsFormData,
            setSettingsFormData,
            countryCode,
            setCountryCode,
            hpNumber,
            setHpNumber,
            officeNumber,
            setOfficeNumber,
            homeNumber,
            setHomeNumber,
            blockedNumbers,
            setBlockedNUmbers,
            whiteList,
            setWhiteList
        })
    },  [
            settingsFormData,
            setSettingsFormData,
            countryCode,
            setCountryCode,
            hpNumber,
            setHpNumber,
            officeNumber,
            setOfficeNumber,
            homeNumber,
            setHomeNumber,
            blockedNumbers,
            setBlockedNUmbers,
            whiteList,
            setWhiteList
        ]
    )

    return (
        <>
            <SettingsContext.Provider value={contextValue}>
                {children}
            </SettingsContext.Provider>        
        </>
    )
}

export default SettingsContextData;