'use client'

import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Sidebar from './Sidebar'

const SideBarLayout = () => {

const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <>
    <div onClick={toggleSidebar} className={`fixed cursor-pointer bg-[#e4e4e4] dark:bg-[#2c2c2c] h-[50px] w-[30px] z-10 flex items-center justify-center rounded-e-md ${sidebarOpen ? 'left-[70px] md:left-[220px]':'left-0'} bottom-[50%]`}>
        {sidebarOpen ? <ChevronLeft size={25}/> : <ChevronRight size={25}/>}
      </div>
      <Sidebar sidebarOpen={sidebarOpen}/></>
  )
}

export default SideBarLayout