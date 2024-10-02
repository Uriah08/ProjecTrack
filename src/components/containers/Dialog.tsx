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

const DialogContainer = ({type}:{type: string}) => {
  return (
    <DialogContent aria-describedby={undefined} className="sm:max-w-[500px] bg-myLight dark:bg-myDark gap-10">
      {type === 'delete' ? (
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
      ) : (
        <>
        <DialogHeader>
            <DialogTitle>
                {type === 'project'? 'Create Project' : 'Add Task'}
            </DialogTitle>
        </DialogHeader>
        {type === 'project' ? (<CreateProject/>): (<CreateTask/>)}
        </>
      )}
    </DialogContent>
  )
}

export default DialogContainer