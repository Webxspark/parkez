import React, {useState, createContext} from "react";

export const LoginStatusContext = createContext();

export const LoginStatusProvider = ({children}) => {
    const [loginStatus, setLoginStatus] = useState(false);
    return (
        <LoginStatusContext.Provider value={{loginStatus, setLoginStatus}}>
            {children}
        </LoginStatusContext.Provider>
    )
}