import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets';
import SupportComponent from './SupportComponent';
import moment from 'moment/moment';

const Sidebar = ({isMenuOpen,setIsMenuOpen}) => {
    const {chat,selectedChat, theme , setTheme , user , navigate ,setSelectedChat } = useAppContext();
     const [isActive, setisActive] = useState(true);
      const ToggleMenu =()=>{
        setisActive(!isActive);
    }

  return (
    
    <div className={`flex flex-col p-5 justify-between max-w-80 dark:bg-gray-900 h-screen border-r border-[#B0609F]/30 backdrop:backdrop-blur-3xl transition-all duration-500 max-md:absolute left-0 z-1 not-dark:bg-gray-50 ${!isMenuOpen&&"max-md:-translate-x-full"}`}>
  
<div className='flex flex-col gap-6 dark:bg-gray-900  '>
        
    
        {/* logo */}
        <div className='flex justify-between'>
        <div className='flex gap-3 items-center '>
            <img src={assets.Gptlogo}  alt="" className='w-full max-w-18 '/>
           <p className='text-3xl '>GPTify</p>
          
        </div>
      <div className='h-6 not-dark:invert  md:hidden'>
         <img src={assets.CrossBtn} alt="" className='w-6 cursor-pointer' onClick={()=>setIsMenuOpen(false)} />
      </div>
      
</div>
        {/* new chat button */}
        <div className={`flex justify-center p-2 items-center ${theme === "dark"?"bg-gray-800":"bg-blue-200 cursor-pointer"} rounded-2xl max-w-50`}>
             <img src={assets.plus} alt="plus Icon" className='h-15 dark:invert ' />
    {isActive?<>
    <p className={`text-xl  ${isActive ? "opacity-100 ml-2 w-auto" : "opacity-0 w-0"}`}>New Chat</p>
    </>:
    <></>}

 </div>
 
    {/* recent chat  */}
    <div className='min-w-60 flex flex-col gap-2'>
        {chat.length>0 && <p className='text-lg'>Recent Chats</p>}
        <div className='flex flex-col gap-3 '>
            {chat.map((chat)=>(
                <div key={chat._id} onClick={()=>{navigate('/'); setIsMenuOpen(false); setSelectedChat(chat);}} className='p-2 px-4 dark:bg-[#57317C]/10 border border-gray-300 dark:border-[#80609F]/15 rounded-md cursor-pointer flex justify-between group '>
                    <div className='text-gray-900 dark:text-gray-200'>
                        <p className='truncate w-full'>
                        {chat.message && chat.message.length > 0
  ? chat.message[0].content.slice(0, 32)
  : chat.name}

                    </p>
                    <p className='text-xs text-gray-700 dark:text-gray-300 '>
                        {moment(chat.updatedAt).fromNow()}
                    </p>
                    </div>
                    <img src={assets.bin_icon} alt="bin" className='cursor-pointer hidden group-hover:block w-5 not-dark:invert' />
                </div>
            ))}
        </div>
    </div>
       
       </div>
       <div className=' flex flex-col gap-4' >

    {/* dark mode toggle  */}
    <div className='p-4 px-4 dark:bg-[#57317C]/10 border border-gray-300 dark:border-[#80609F]/15 rounded-md cursor-pointer flex gap-2 group justify-between '>
   <div className='flex gap-2 items-center'>
     <img src={assets.theme_icon} alt="theme" className='not-dark:invert' />
<p>Dark Mode</p>
   </div>

<label className='relative inline-flex cursor-pointer'>
    <input type="checkbox" className='sr-only peer' checked={theme=='dark'}  onClick={()=>setTheme(theme==='dark' ? 'light':'dark')}/>

<div className='w-12 h-5 bg-gray-400 rounded-full peer-checked:bg-purple-600 transition-all'></div>
    <span className='absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-7'></span>
</label>
</div>

{/* user account */}
<div className='flex group items-center p-3 border-gray-300 border gap-2 dark:border-gray-800 dark:bg-gray-900 rounded-md'>
    <img className='w-7 rounded-full' src={assets.user_icon} alt="userIcon" />
    <p className='flex-1 text-sm dark:text-primary truncate'>{user ? user.name : "login your Account"}</p>
    {user && <img src={assets.logout_icon} className='h-5 cursor-pointer hidden not-dark:invert group-hover:block'></img>}
</div>
</div>

          {/* {isActive?<>
        <div className="body mx-4 mt-8">
<h2 className=''>Recent</h2>
<div className="chatHistory flex flex-col gap-2 ">
<div className="chat flex gap-2 items-center">
    <img src={assets.message_icon} alt="messagIcon"  className='h-7'/>
    <h4 className='text-l text-gray-500 '>what is react . . . </h4>
</div>
</div>
        </div>
        </>:
        <></>} */}
        {/* <div className="bottom mt-auto mx-4 mb-0 flex flex-col gap-2 ">
    <SupportComponent data="Help" isshow={isActive} icon={assets.question_icon} />
<SupportComponent data="Activity" isshow={isActive} icon={assets.history_icon} />

<SupportComponent data="Setting" isshow={isActive} icon={assets.setting_icon} />

        </div> */}
    </div>
  )
}

export default Sidebar