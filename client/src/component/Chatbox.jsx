import React, { useEffect, useRef, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets';
import Message from './Message';
import toast from 'react-hot-toast';

const Chatbox = () => {
  const{selectedChat , theme , user , axios , token} = useAppContext();
 const containerRef =useRef(null);
  const [messages,setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("")
  useEffect(()=>{
    if(selectedChat){
      setMessages(selectedChat.messages)
    }
  },[selectedChat]);

  useEffect(()=>{
    if(containerRef.current){
      containerRef.current.scrollTo({
        top:containerRef.current.scrollHeight,
        behaviour:"smooth",
      })
    }
  },[messages])

  const handleSubmit = async (e)=>{
    try {
      e.preventDefault();
      if(!user){
        return toast("Login to send message")
      }
       setLoading(true);
        const promptCopy = prompt;
        setPrompt("");
        setMessages(prev => [...prev, {role :"user" , content:prompt,timestamp :Date.now()}]);
         const {data} = await axios.post(`/api/message`,{chatId:selectedChat._id , prompt},{headers:{authorization:`Bearer ${token}`}})
         if(data.success){
          setMessages(prev=> [...prev , data.reply]);
         }
         else{
          toast.error(data.message);
          setPrompt(promptCopy);
         }
    } catch (error) {
        toast.error(error.message);
    }finally{
      setPrompt("");
      setLoading(false);
    }
  }

  return (
    <div className='flex-1 flex flex-col justify-between m-5 md:m-10 xl:mx-30 max-md:mt-14 2xl:pr-40 max-h-screen'>
      {/* chat message  */}
      <div className='flex-1 mb-5 overflow-y-scroll flex flex-col gap-3 ' ref={containerRef}>
{messages.length==0 && <div className='flex flex-col gap-3 justify-center items-center'>
  <div className='flex gap-3 items-center mt-20 '>
              <img src={assets.Gptlogo}  alt="" className='w-full max-w-18 '/>
             <p className='text-3xl '>GPTify</p>
            
          </div>
  <p className='text-3xl text-gray-500'>Ask me anything..</p>
  </div>}

  {messages.map((message,i)=><Message key={i} Message={message} />)}

  {/* loading  */}
{loading && <p className='flex items-center-safe gap-1.5  animate-pulse '>Ai is typing ...</p>}

      </div>
      {/* input box  */}
    <form className=' flex gap-2 p-2 px-4 bg-amber-50 dark:invert border rounded-full border-gray-400 justify-center items-center' onSubmit={handleSubmit}>
    <input onChange={(e)=>setPrompt(e.target.value)} type="text" value={prompt} placeholder='Type your prompt here..' className='w-full text-sm outline-none text-black ' required />
    <button type='submit' disabled={loading}>
      <img src={loading ? assets.stop_icon:assets.send_icon} className='h-8 ' alt="" />
    </button>
    </form>
    </div>
  )
}

export default Chatbox