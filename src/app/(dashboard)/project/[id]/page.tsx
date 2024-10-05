'use client'

import React from 'react'
import { useParams } from 'next/navigation'

import { useGetProjectByIdQuery } from '@/src/store/api'
import { Button } from '@/src/components/ui/button'
import DialogContainer from '@/src/components/containers/Dialog'
import { Dialog, DialogTrigger } from '@/src/components/ui/dialog'
import { ClipboardPlus, Grid3X3Icon, BetweenHorizonalEnd, List, Trash } from "lucide-react"
import Table from '@/src/components/project/Table'
import ProjectList from '@/src/components/project/List'

import Board from '@/src/components/project/Board'

const ProjectsPage = () => {

  const { id } = useParams()
  const { data: project, isLoading, error} = useGetProjectByIdQuery(id.toString())

  const [openTab, setOpenTab] = React.useState('board')

  if (isLoading) return <div className='bg-myLightFollow dark:bg-myDarkFollow h-full'>Loading...</div>
  if (error) return <div className='bg-myLightFollow dark:bg-myDarkFollow h-full'>Error fetching data</div>

  return (
    <div className="bg-myLightFollow dark:bg-myDarkFollow h-full p-5 md:p-10 flex flex-col gap-10">
      <div className='flex justify-between items-center'>
      <h1 className='text-3xl font-semibold'>{project?.name}</h1>
      <div className='flex gap-3'>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={'outline'} className='dark:bg-main bg-follow hover:bg-follow2 dark:hover:bg-main2 text-myLight dark:text-myDark flex gap-2'>
            <ClipboardPlus size={20}/>
            <span className='hidden sm:block'>Add Task</span>
          </Button>
        </DialogTrigger>
        <DialogContainer type='task'/>
      </Dialog>
      <Dialog>
        <DialogTrigger asChild>
          <Button className='bg-red-800 flex gap-2 hover:bg-red-900'>
            <Trash size={20}/>
            <span className='hidden sm:block'>Delete Project</span>
          </Button>
        </DialogTrigger>
        <DialogContainer type='delete-project'/>
      </Dialog>
      </div>
      </div>
      <div className='flex justify-between items-center'>
        <div className='flex gap-2'>
          <div className={`flex border-b border-transparent px-2 py-2 items-center gap-1 cursor-pointer hover:text-follow dark:hover:text-main hover:border-follow dark:hover:border-main duration-200 transition-all ${openTab === 'board' ? 'text-follow dark:text-main border-follow dark:border-main':''}`} onClick={() => setOpenTab('board')}>
            <Grid3X3Icon size={20}/>
            <span className='text-[15px] font-light hidden sm:block'>Board</span>
          </div>
          <div className={`flex border-b border-transparent px-2 py-2 items-center gap-1 cursor-pointer hover:text-follow dark:hover:text-main hover:border-follow dark:hover:border-main duration-200 transition-all ${openTab === 'table' ? 'text-follow dark:text-main border-follow dark:border-main':''}`} onClick={() => setOpenTab('table')}>
            <BetweenHorizonalEnd size={20}/>
            <span className='text-[15px] font-light hidden sm:block'>Table</span>
          </div>
          <div className={`flex border-b border-transparent px-2 py-2 items-center gap-1 cursor-pointer hover:text-follow dark:hover:text-main hover:border-follow dark:hover:border-main duration-200 transition-all ${openTab === 'list' ? 'text-follow dark:text-main border-follow dark:border-main':''}`} onClick={() => setOpenTab('list')}>
            <List size={20}/>
            <span className='text-[15px] font-light hidden sm:block'>List</span>
          </div>
        </div>
      </div>
      <div className='w-full h-fit'>
        {openTab === 'board' && <Board projectId={id.toString()}/>}
        {openTab === 'table' && <Table projectId={id.toString()}/>}
        {openTab === 'list' && <ProjectList projectId={id.toString()}/>}
      </div>
    </div>
  )
}

export default ProjectsPage