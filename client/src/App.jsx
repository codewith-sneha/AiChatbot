import React, { useState } from 'react'
import Sidebar from './component/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Chatbox from './component/Chatbox'
import { assets } from './assets/assets'
import { useAppContext } from './context/AppContext'
import Login from './pages/Login'

const App = () => {
     const [isMenuOpen, setIsMenuOpen] = useState(false);
     const {user}=useAppContext();
  return (
    <>
    {!isMenuOpen && <img src={assets.menu_icon} alt="" className='w-10 absolute top-3 left-3 not-dark:invert cursor-pointer md:hidden '   onClick={()=>setIsMenuOpen(true)} />}
  {user?
  <>
    <div className='dark:bg-gradient-to-b from-[#242124] to-black dark:text-white'>
      <div className='flex h-screen w-screen'>
      <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <Routes>
        <Route path='/' element={<Chatbox/>} />
      </Routes>
      </div>
      
    </div>
  </>
  :
  <Login/>
   }
    </>
  )
}

export default App