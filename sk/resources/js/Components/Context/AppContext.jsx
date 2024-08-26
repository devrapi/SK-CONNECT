import {  createContext, useEffect, useState } from "react";
import ApiService from "../Services/ApiService";

export const AppContext = createContext()

export default function AppProvider({children}){

    const[token , setToken] = useState(localStorage.getItem('token'));
    const[user , setUser] = useState(null);
    const[admin , setAdmin] = useState(null);
    const[event , setEvent] = useState({});
    const[profiles , setProfiles] = useState({})
    const[success , setSuccess] = useState(false);
    const [role , setRole] = useState(localStorage.getItem('role'));

    //get user data
    async function getUser(){
        const res = await ApiService.get("/user", {
            headers: {
                Authorization: `Bearer ${token}`,

        },
    });
    const data = await res.data;

        setUser(data)
    }

    //get user profiles

    async function getProfiles(){
        const res = await ApiService.get("/profiles");

        const data = await res.data;

        setProfiles(data);
    }

    // get events
    async function getEvents(){
        const res = await ApiService.get("/events");

        const data = await res.data;

        setEvent(data);
    }


//get admin data
    async function getAdmin(){
        const res = await ApiService.get("/user", {
            headers: {
                Authorization: `Bearer ${token}`,
        },
    });

    const data = await res.data;

        setAdmin(data);
    }


    useEffect(() => {
        getEvents();
    },[]);

    useEffect(() => {
        getProfiles();
    },[]);

    useEffect(() => {
        if(token){
            getUser();
        }
    }, [token])

    useEffect(() => {
        if(token){
            getAdmin();
        }
    }, [token])


    return (

        <AppContext.Provider value={{token , setToken ,
        user  , setUser ,
        setAdmin ,admin ,
        role , setRole ,
        success , setSuccess,
        event ,profiles

         }}>
            {children}
        </AppContext.Provider>
    )
}
