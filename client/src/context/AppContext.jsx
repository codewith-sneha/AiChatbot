import React, { createContext, useContext, useEffect, useState } from 'react'
import {dummyUserData ,dummyChats} from '../assets/assets'
import { Navigate, useNavigate } from 'react-router-dom';
import axios, { Axios } from 'axios';
import toast from 'react-hot-toast';

export const AppContext = createContext();

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

export const AppContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [chat, setChat] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [token,setToken] = useState(localStorage.getItem('token') || null);
    const navigate = useNavigate();
    const [userLoading ,setUserLoading]=useState(true);
    const [theme,setTheme] = useState(localStorage.getItem('theme') || "light");

    const fetchUser=async()=>{
        try
        { 
            const {data} = await axios.get("/api/user/getuser",{headers:{
            Authorization:`Bearer ${token}`
        }})
        if(data.success){
            setUser(data.user);
        }
        else{
            toast.error(data.message);
        }
    }catch(error){
        toast.error(error.message); 
    }finally{
        setUserLoading(false);
    }
    }

    const createNewChat = async()=>{
        try {
            await axios.post("/api/chat/create",{},{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            fetchUserChat();
        } catch (error) {
            
        }
    } 


    const fetchUserChat=async()=>{
      try {
            const {data} = await axios.get("/api/chat",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            if(data.success){
                if(data.chats.length=== 0){
                    await createNewChat();
                    return fetchUserChat();
                }
                else{
                    setSelectedChat(data.chats[0]);
                    setChat(data.chats)
                }
            }
            else{
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        if(token){
            fetchUser();
        }
        else{
            setUserLoading(false);
            setUser(null);
        }
    },[token]);

    useEffect(()=>{
        if(user){
            fetchUserChat();
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

    const value={user,chat,setChat,selectedChat,setSelectedChat,theme,setTheme,navigate,userLoading,setUserLoading,createNewChat,fetchUserChat,token , axios  , setToken};
  return (
    <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
  )
}

export const useAppContext =()=>{ 
    return useContext(AppContext); 
}