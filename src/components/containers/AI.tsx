import { Task } from '@prisma/client'
import React from 'react'

type Props = {
    task?: Task
}

const AI = ({task}: Props) => {
  return (
    <div className='flex flex-col justify-center items-center'>
        <h1 className='text-2xl font-bold'>{task?.title}</h1>
        {task?.status}
    </div>
  )
}

export default AI