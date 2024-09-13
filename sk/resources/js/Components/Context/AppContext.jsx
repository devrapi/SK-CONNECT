import {  createContext, useEffect, useState } from "react";
import ApiService from "../Services/ApiService";

export const AppContext = createContext()

export default function AppProvider({children}){

    const[token , setToken] = useState(localStorage.getItem('token'));
    const[user , setUser] = useState(null);
    const[admin , setAdmin] = useState(null);
    const[event , setEvent] = useState({});
    const[dailyLogin , setDailyLogin] = useState([])
    const[rewards , setRewards] = useState({});
    const[task , setTask] = useState({});
    const[ticket , setTicket] = useState([]);
    const[history , setHistory] = useState([]);
    const[profiles , setProfiles] = useState({})
    const[success , setSuccess] = useState(false);
    const [role , setRole] = useState(localStorage.getItem('role'));

      //get task data
      async function getTask(){
        const res = await ApiService.get("task",);
        const data = await res.data;

        setTask(data)
    }

       //get Daily Login
       async function getDailyLogin(){
        const res = await ApiService.get("dailyLogin",);
        const data = await res.data;

        setDailyLogin(data)
    }

     //get ticket data
     async function getTicket(){
        const res = await ApiService.get("/rewards/claim/all",);
        const data = await res.data;

        setTicket(data)
    }

       //get ticket data
       async function getHistory(){
        const res = await ApiService.get("/rewards/claim/history",);
        const data = await res.data;

        setHistory(data)
    }

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

     // get rewards
     async function getRewards(){
        const res = await ApiService.get("/rewards");

        const data = await res.data;

        setRewards(data);
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
        getTask();
    },[]);

    useEffect(() => {
        getDailyLogin();
    },[]);

    useEffect(() => {
        getHistory();
    },[]);

    useEffect(() => {
        getEvents();
    },[]);

    useEffect(() => {
        getTicket();
    },[]);

    useEffect(() => {
        getRewards();
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
        event ,profiles , rewards ,ticket,history ,task, dailyLogin

         }}>
            {children}
        </AppContext.Provider>
    )
}
