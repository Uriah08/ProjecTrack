'use client'

import React, { ReactNode, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Sidebar from '@/components/containers/Sidebar'
import NavBar from '@/components/containers/NavBar'

type Props = {
  children: ReactNode,
}

const MainLayout = ({children}:Props) => {

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className='relative w-full h-[100%] flex'>
      <div onClick={toggleSidebar} className={`absolute cursor-pointer bg-[#c5c5c5] dark:bg-[#2c2c2c] h-[50px] w-[30px] z-10 flex items-center justify-center rounded-e-md ${sidebarOpen ? 'left-[70px] md:left-[220px]':'left-0'} bottom-[50%]`}>
        {sidebarOpen ? <ChevronLeft size={25}/> : <ChevronRight size={25}/>}
      </div>
      <Sidebar sidebarOpen={sidebarOpen}/>
      <div className='flex flex-col w-full h-[100%]'>
      <NavBar/>
      {children}
      </div>
    </div>
  )
}

export default MainLayout