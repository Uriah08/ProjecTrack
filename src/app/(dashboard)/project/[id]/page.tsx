'use client'

import React from 'react'
import { useParams } from 'next/navigation'

import { useGetProjectByIdQuery } from '@/src/store/api'
import { Button } from '@/src/components/ui/button'

const ProjectsPage = () => {

  const { id } = useParams()
  const { data: project, isLoading, error} = useGetProjectByIdQuery(id.toString())

  const [openTab, setOpenTab] = React.useState('board')

  if (isLoading) return <div className='bg-myLightFollow dark:bg-myDarkFollow h-full'>Loading...</div>
  if (error) return <div className='bg-myLightFollow dark:bg-myDarkFollow h-full'>Error fetching data</div>

  return (
    <div className="bg-myLightFollow dark:bg-myDarkFollow h-full p-5 md:p-10 flex flex-col">
      <div className='flex justify-between items-center'>
      <h1 className='text-2xl font-semibold'>{project?.name}</h1>
      <Button className='dark:bg-main bg-follow' variant={'outline'}>
        Create Task
      </Button>
      </div>
    </div>
  )
}

export default ProjectsPage