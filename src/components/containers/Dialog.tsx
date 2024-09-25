import React from 'react'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import CreateProject from '../forms/CreateProject'

const DialogContainer = ({type}:{type: string}) => {
  return (
    <DialogContent aria-describedby={undefined} className="sm:max-w-[500px] bg-myLight dark:bg-myDark gap-10">
        <DialogHeader>
            <DialogTitle>
                {type === 'project'? 'Create Project' : 'Add Task'}
            </DialogTitle>
        </DialogHeader>
        {type === 'project' ? (<CreateProject/>): (<></>)}
    </DialogContent>
  )
}

export default DialogContainer