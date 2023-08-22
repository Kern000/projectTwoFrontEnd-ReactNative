import React, {useState, createContext, useMemo} from 'react';

export const SettingsContext = createContext();

const SettingsContextData = ({children}) => {

    const [countryCode, setCountryCode] = useState([])
    const [hpNumber, setHpNumber] = useState('');
    const [officeNumber, setOfficeNumber] = useState('');
    const [homeNumber, setHomeNumber] = useState('');
    const [blockedNumbers, setBlockedNumbers] = useState([]);
    const [whiteList, setWhiteList] = useState([]);
    const [countryCodeList, setCountryCodeList] = useState([])

    const contextValue = useMemo(()=>{
        return({
            countryCodeList, 
            setCountryCodeList,   
            countryCode,
            setCountryCode,
            hpNumber,
            setHpNumber,
            officeNumber,
            setOfficeNumber,
            homeNumber,
            setHomeNumber,
            blockedNumbers,
            setBlockedNumbers,
            whiteList,
            setWhiteList
        })
    },  [
            countryCodeList, 
            setCountryCodeList,
            countryCode,
            setCountryCode,
            hpNumber,
            setHpNumber,
            officeNumber,
            setOfficeNumber,
            homeNumber,
            setHomeNumber,
            blockedNumbers,
            setBlockedNumbers,
            whiteList,
            setWhiteList
        ]
    )

    return (
        <SettingsContext.Provider value={contextValue}>
            {children}
        </SettingsContext.Provider>        
    )
}

export default SettingsContextData;