import { createContext, useContext } from "react";

const MyContext = createContext(null)

export const useMyContext = () => useContext(MyContext);

export const MyContextProvider = ({ children }) => {
    return (
        <MyContext.Provider value = {""}>
            {children}
        </MyContext.Provider>
    )
}
