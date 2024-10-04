import React from 'react'
import { useDeleteTaskMutation } from '@/store/api'
import { Button } from '../ui/button'

import { useToast } from '@/hooks/use-toast'
import { DialogClose } from '../ui/dialog'

type Props = {
    taskId?: string
  }

const DeleteTask = ({taskId}: Props) => {

    const { toast } = useToast()

    const [deleteTask] = useDeleteTaskMutation()

    const handleDelete = async () => {
        try {
            await deleteTask(taskId || "").unwrap()
        } catch {
            toast({
                title: "Error Deleting Task",
                description: "An error occurred while deleting your task. Please try again.",
            })
        }
    }

  return (
    <div className='flex justify-end gap-2'>
        <Button variant='outline' onClick={handleDelete} className='bg-red-800 hover:bg-destructive'>Delete</Button>
        <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
        </DialogClose>
    </div>
  )
}

export default DeleteTask