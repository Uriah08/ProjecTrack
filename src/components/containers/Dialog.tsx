import React from 'react'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import CreateProject from '../forms/CreateProject'
import CreateTask from '../forms/CreateTask'
import DeleteProject from './DeleteProject'
import AI from './AI'
import { Task, Project } from '@prisma/client'

import { Sparkles } from 'lucide-react'
import UpdateTask from '../forms/UpdateTask'
import UpdateProject from '../forms/UpdateProject'

type Props = {
  type: string,
  task?: Task
  project?: Project
}

const DialogContainer = ({type, task, project}: Props) => {
  return (
    <DialogContent aria-describedby={undefined} className="sm:max-w-[500px] bg-myLight dark:bg-myDark gap-10">
      {type === 'delete-project' && (
        <>
        <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this project?
            </DialogTitle>
            <DialogDescription className='pt-5'>
              Make sure to delete all the task before deleting the project
            </DialogDescription>
        </DialogHeader>
        <DeleteProject/>
        </>
      )}
      {type === 'update-project' && (
        <>
        <DialogHeader>
            <DialogTitle>
                Update Project
            </DialogTitle>
        </DialogHeader>
        <UpdateProject project={project}/>
        </>
      )}
      {type === 'project' && (
        <>
        <DialogHeader>
            <DialogTitle>
                Create Project
            </DialogTitle>
        </DialogHeader>
        <CreateProject/>
        </>
      )}
      {type === 'task' && (
        <>
        <DialogHeader>
            <DialogTitle>
                Add Task
            </DialogTitle>
        </DialogHeader>
        <CreateTask/>
        </>
      )}
      {type === 'AI' && (
        <>
        <DialogHeader>
            <DialogTitle className='flex items-center gap-3'>
              <Sparkles size={30} className='text-follow dark:text-main'/>
                <span className='font-semibold text-main'>Projec<span className='text-follow'>Track AI</span></span>
            </DialogTitle>
        </DialogHeader>
        <AI task={task}/>
        </>
      )}
      {type === 'update-task' && (
        <>
        <DialogHeader>
          <DialogTitle>
                Update Task
            </DialogTitle>
        </DialogHeader>
        <UpdateTask task={task}/>
        </>
      )}
      {type === 'delete-task' && (
        <>
        <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this task?
            </DialogTitle>
            <DialogDescription className='pt-5'>
              This action cannot be undone.
            </DialogDescription>
        </DialogHeader>
        <DeleteProject/>
        </>
      )}
    </DialogContent>
  )
}

export default DialogContainer