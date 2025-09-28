import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets';
import moment from 'moment/moment';
import toast from 'react-hot-toast';

const Sidebar = ({ isMenuOpen, setIsMenuOpen }) => {
  const { chat, selectedChat, theme, setTheme, user, navigate, setSelectedChat, createNewChat, setToken, token, axios, setChat } = useAppContext();

  const logOut = () => {
    localStorage.removeItem("token");
    setToken(null);
    toast.success("Logout successful");
  }

  const handleDelete = async (chatId) => {
    try {
      const confirm = window.confirm('Are you sure you want to delete the chat?');
      if (!confirm) return;

      const { data } = await axios.delete("/api/chat", {
        headers: { authorization: `Bearer ${token}` },
        data: { chatId }
      });

      if (data.success) {
        setChat(prev => prev.filter(chat => chat._id !== chatId));
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className={`flex flex-col justify-between h-screen p-5 min-w-70 dark:bg-gray-900 border-r border-[#B0609F]/30 backdrop-blur-3xl transition-all duration-500 max-md:absolute left-0 z-10 ${!isMenuOpen && "max-md:-translate-x-full"}`}>

      {/* Top Section: Logo + New Chat */}
      <div className='flex flex-col gap-4'>
        {/* Logo */}
        <div className='flex gap-3 justify-between '>
          <div className='flex gap-3 items-center'>
            <img src={assets.Gptlogo} alt="" className='w-full max-w-18' />
            <p className='text-3xl'>GPTify</p>
          </div>
          <div className='h-6 md:hidden '>
            <img src={assets.CrossBtn} alt="" className='w-6 cursor-pointer' onClick={() => setIsMenuOpen(false)} />
          </div>
        </div>

        {/* New Chat Button */}
        <div onClick={createNewChat} className={`flex justify-center items-center p-2 rounded-2xl max-w-50 ${theme === "dark" ? "bg-gray-800" : "bg-blue-200 cursor-pointer"}`}>
          <img src={assets.plus} alt="plus" className='h-15 dark:invert' />
          <p className="text-xl opacity-100 ml-2 w-auto">New Chat</p>
        </div>
      </div>

      {/* Scrollable Recent Chats */}
      <div className='flex-1 overflow-y-auto mt-2 mb-4'>
        {chat.length > 0 && <p className='text-lg mb-2'>Recent Chats</p>}
        <div className='flex flex-col gap-3'>
          {chat.map(chat => (
            <div
              key={chat._id}
              onClick={() => { navigate('/'); setIsMenuOpen(false); setSelectedChat(chat); }}
              className='p-2 px-4 dark:bg-[#57317C]/10 border border-gray-300 dark:border-[#80609F]/15 rounded-md cursor-pointer flex justify-between group w-full'>
              <div className=' text-gray-900 dark:text-gray-200'>
                <p className='truncate w-[170px] '>
                  {chat.messages && chat.messages.length > 0 ? chat.messages[0].content.slice(0, 32) : chat.name}
                </p>
                <p className='text-xs text-gray-700 dark:text-gray-300'>
                  {moment(chat.updatedAt).fromNow()}
                </p>
              </div>
              <img src={assets.bin_icon} alt="bin" className='cursor-pointer hidden group-hover:block w-5 not-dark:invert' onClick={() => handleDelete(chat._id)} />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section: Dark Mode + User */}
      <div className='flex flex-col gap-4'>
        {/* Dark Mode Toggle */}
        <div className='p-4 flex justify-between items-center border border-gray-300 dark:border-[#80609F]/15 rounded-md cursor-pointer'>
          <div className='flex gap-2 items-center'>
            <img src={assets.theme_icon} alt="theme" className='not-dark:invert' />
            <p>Dark Mode</p>
          </div>
          <label className='relative inline-flex cursor-pointer'>
            <input type="checkbox" className='sr-only peer' checked={theme === 'dark'} onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
            <div className='w-12 h-5 bg-gray-400 rounded-full peer-checked:bg-purple-600 transition-all'></div>
            <span className='absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-7'></span>
          </label>
        </div>

        {/* User Account */}
        <div className='flex items-center p-3 border border-gray-300 dark:border-gray-800 dark:bg-gray-900 rounded-md gap-2 group'>
          <img className='w-7 rounded-full' src={assets.user_icon} alt="userIcon" />
          <p className='flex-1 text-sm dark:text-primary truncate'>{user ? user.name : "Login to your account"}</p>
          {user && <img src={assets.logout_icon} onClick={logOut} className='h-5 cursor-pointer hidden group-hover:block not-dark:invert' />}
        </div>
      </div>

    </div>
  )
}

export default Sidebar;
