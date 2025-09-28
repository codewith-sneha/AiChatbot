import React from 'react'
import { assets } from '../assets/assets'
import moment from 'moment'
import Markdown from 'react-markdown'
const Message = ({Message}) => {
  return (
    <div>
      {Message.role ==='user' ? (
        <div className='flex items-start justify-end my-4 gap-2'>
           <div className='flex flex-col items-end gap-2 p-2 px-4 bg-slate-50 dark:bg-[#57317C]/30'>
            <p className='text-sm dark:text-primary'>{Message.content}</p>
            <span className='text-xs text-gray-400 '>{moment(Message.timestamp).fromNow()}</span>
           </div>
           <img src={assets.user_icon} alt="" className='w-8 rounded-full' />
        </div>
      ):(
        <div className=' inline-flex flex-col gap-2 p-2 px-4 justify-start max-w-2xl bg-primary/20 dark:bg-[#57317C]/30  border dark:border-gray-700 border-gray-100 rounded-md my-4'>
          
            <p className='text-sm dark:text-primary r reset-tw'><Markdown>{Message.content}</Markdown></p>
            <span className='text-xs text-gray-400 '>{moment(Message.timestamp).fromNow()}</span>
        </div>
      
      )}
    </div>
  )
}

export default Message