"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import SidebarLinks from './SidebarLinks'
import { Folder, Ban, Gauge, FolderPlus, Search, Clock, Users, Settings, ChevronDown, ChevronUp, TriangleAlert, OctagonAlert, ShieldAlert, CircleAlert, SquareLibrary } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import DialogContainer from './Dialog'

import { Project } from '@prisma/client'

type Props = {
    sidebarOpen: boolean
}

const Sidebar = ({sidebarOpen}:Props) => {

  const [openProjects, setOpenProjects] = useState(true)

  const [projects, setProjects] = useState<Project[]>([]);

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch('/api/projects')
      if(!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      const data = await response.json()
      setProjects(data)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error:any) {
        setError(error.message)
      }
    }

    fetchProject()
  },[])

  return (
    <div className={`fixed h-full min-w-[70px] md:min-w-[220px] dark:bg-myDark bg-myLight flex flex-col z-20 ${!sidebarOpen ? 'hidden':'block'}`}>
      <div className='overflow-y-auto'>
        <div className='flex items-center justify-center py-5 px-3 md:p-5 gap-2'>
            <Image src={'/logo.png'} width={40} height={40} alt='logo'/>
            <h1 className='font-semibold text-lg text-main hidden md:block'>Projec<span className='text-follow'>Track</span></h1>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className='m-2 my-5 md:m-5 w-fit md:w-[180px] dark:bg-main dark:hover:bg-main2 bg-follow hover:bg-follow2 gap-2'><FolderPlus size={20}/>
              <span className='hidden md:block'>
                Create Project
              </span>
            </Button>
          </DialogTrigger>
          <DialogContainer type='project'/>
        </Dialog>

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
        {openProjects ? (
          error ? (
            <div className={`relative flex items-center gap-2 h-[40px] duration-200 transition-all hover:bg-myLightFollow dark:hover:bg-myDarkFollow`}>
            <div className='w-full flex justify-center items-center md:justify-start md:ml-5 gap-4'>
                <Ban size={20}/>
                <h1 className='hidden md:block'>Error getting projects</h1>
            </div>
          </div>
          ) : (
            projects.map(project => (
              <SidebarLinks key={project.id} label={project.name} icon={Folder} link={`/project/${project.id}`}/>
            ))
          )
        ) : (<></>)}
        </div>
    </div>
  )
}

export default Sidebar