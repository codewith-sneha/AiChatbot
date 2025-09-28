import React, { createContext, useContext, useEffect, useState } from 'react'
import {dummyUserData ,dummyChats} from '../assets/assets'
import { Navigate, useNavigate } from 'react-router-dom';

export const AppContext = createContext();

export const AppContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [chat, setChat] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);

    const navigate = useNavigate();

    const [theme,setTheme] = useState(localStorage.getItem('theme') || "light");

    const fetchUser=()=>{
        setUser();
    }


    const fetchChat=()=>{
        setChat(dummyChats);
        setSelectedChat(dummyChats[0]);
    }

    useEffect(()=>{
        fetchUser();
    },[]);

    useEffect(()=>{
        if(user){
            fetchChat();
        }
        else{
            setChat([]);;
            setSelectedChat(null);
        }
    },[user]);

    useEffect(()=>{
        if(theme === "dark"){
            document.documentElement.classList.add('dark');
        }
        else{
             document.documentElement.classList.remove('dark');
        }
    },[theme])

    const value={user,chat,setChat,selectedChat,setSelectedChat,theme,setTheme,navigate};
  return (
    <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
  )
}

export const useAppContext =()=>{ 
    return useContext(AppContext); 
}