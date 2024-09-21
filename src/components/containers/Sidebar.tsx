"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import SidebarLinks from './SidebarLinks'
import { Gauge, FolderPlus, Search, Clock, Users, Settings, ChevronDown, ChevronUp, TriangleAlert, OctagonAlert, ShieldAlert, CircleAlert, SquareLibrary } from 'lucide-react'
import { Button } from '../ui/button'

type Props = {
    sidebarOpen: boolean
}

const Sidebar = ({sidebarOpen}:Props) => {

  const [openProjects, setOpenProjects] = useState(true)

  return (
    <div className={`fixed h-full min-w-[70px] md:min-w-[220px] dark:bg-myDark bg-myLight flex flex-col z-20 ${!sidebarOpen ? 'hidden':'block'}`}>
      <div className='overflow-y-auto'>
        <div className='flex items-center justify-center py-5 px-3 md:p-5 gap-2'>
            <Image src={'/logo.png'} width={40} height={40} alt='logo'/>
            <h1 className='font-semibold text-lg text-main hidden md:block'>Projec<span className='text-follow'>Track</span></h1>
        </div>
        <Button className='m-2 my-5 md:m-5 dark:bg-main dark:hover:bg-main2 bg-follow hover:bg-follow2 gap-2'><FolderPlus size={20}/><span className='hidden md:block'>Create Project</span></Button>
        <div className='py-2'/>
        <SidebarLinks label='Dashboard' icon={Gauge} link='/'/>
        <SidebarLinks label='Search' icon={Search} link='/search'/>
        <SidebarLinks label='Timeline' icon={Clock} link='/timeline'/>
        <SidebarLinks label='Group' icon={Users} link='/group'/>
        <SidebarLinks label='Settings' icon={Settings} link='/settings'/>
      

        <div className='px-5 pt-5 pb-3'>
        <h1 className='text-xs hidden md:block'>Priority</h1>
        </div>
        <SidebarLinks label='Urgent' icon={TriangleAlert} link='/category/technology'/>
        <SidebarLinks label='High' icon={OctagonAlert} link='/category/design'/>
        <SidebarLinks label='Medium' icon={CircleAlert} link='/category/business'/>
        <SidebarLinks label='Low' icon={ShieldAlert} link='/category/education'/>
        <SidebarLinks label='Backlog' icon={SquareLibrary} link='/category/health'/>
        <div className='px-5 py-3 flex pt-8 justify-center md:justify-between cursor-pointer' onClick={() => setOpenProjects(!openProjects)}>
        <h1 className='text-xs hidden md:block'>Projects</h1>
          {openProjects ? <ChevronUp size={15}/> : <ChevronDown size={15}/>}
        </div>
        </div>
    </div>
  )
}

export default Sidebar