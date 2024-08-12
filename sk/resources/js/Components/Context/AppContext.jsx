import {  createContext, useEffect, useState } from "react";
import ApiService from "../Services/ApiService";

export const AppContext = createContext()

export default function AppProvider({children}){

    const[token , setToken] = useState(localStorage.getItem('token'));
    const[user , setUser] = useState(null);

    async function getUser(){
        const res = await ApiService.get("/user", {
            headers: {
                Authorization: `Bearer ${token}`,

        },
    });

    const data = await res.data;

        setUser(data)
    }

    useEffect(() => {
        if(token){
            getUser();
        }
    }, [token])



    return (

        <AppContext.Provider value={{token , setToken , user  , setUser}}>
            {children}
        </AppContext.Provider>
    )
}
