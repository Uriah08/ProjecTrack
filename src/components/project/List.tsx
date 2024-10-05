import React from 'react'
import { useGetTasksQuery } from '@/store/api'
import { format } from 'date-fns'
import { Button } from '../ui/button'

import { Dialog, DialogTrigger } from '../ui/dialog';

import DialogContainer from '../containers/Dialog';

type Props = {
  projectId: string
}

const List = ({projectId}: Props) => {

  const { data: tasks, isLoading, error } = useGetTasksQuery(projectId)

  if(isLoading) {
    return <div>Loading...</div>
  }

  if(error) {
    return <div>Error fetching tasks</div>
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 w-full gap-5'>
      {tasks?.map((task) => (
        <div key={task.id} className='relative flex flex-col h-fit w-full z-0 p-10 gap-5 shadow-sm group hover:translate-x-3 transition-all duration-200'>
          <div className='absolute size-16 rounded-xl bg-follow dark:bg-main top-1.5 right-1.5 -z-10'></div>
          <div className='absolute size-16 rounded-xl bg-follow dark:bg-main opacity-50 group-hover:opacity-80 top-1.5 right-1.5 -z-10 blur-lg group-hover:blur-xl transition-all duration-200'></div>
          <div className='absolute inset-0 bg-myLight dark:bg-myDark w-full rounded-2xl [mask-image:linear-gradient(225deg,transparent_40px,black_40px)] -z-10'></div>
            <h1 className='text-xl lg:text-2xl font-bold'>{task.title}</h1>
            <p className='text-zinc-600 dark:text-zinc-400 text-base'>{task.description}</p>
            <div className='flex items-center gap-3'>
              <div className='p-2 bg-main rounded-lg'>
                <h1 className='w-fit dark:text-myDark text-myLight font-semibold '>{task.priority}</h1>
              </div>
              {task.tags ? task.tags.split(",").map((tag) => <p key={tag}>{tag}</p>) : []}
            </div>
            <p className='dark:text-zinc-600 text-zinc-400'>{format(new Date(task.createdAt), "MMMM d, yyyy")}</p>
            <div className='flex gap-3'>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant={'outline'}>Edit</Button>
                </DialogTrigger>
                <DialogContainer type='update-task' task={task}/>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant={'outline'}>Delete</Button>
                </DialogTrigger>
                <DialogContainer type='delete-task' task={task}/>
              </Dialog>
            </div>
        </div>
      ))}
    </div>
  )
}

export default List