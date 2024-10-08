"use client"

import React from 'react'
import { Button } from '../ui/button'
import { DialogClose } from '@radix-ui/react-dialog'
import { useDeleteProjectMutation } from '@/store/api';
import { useParams, useRouter } from 'next/navigation';


const DeleteProject = () => {

    const router = useRouter()

    const [deleteProject] = useDeleteProjectMutation();

    const { id } = useParams()

    const handleDelete = async () => {
        
        try {
          router.push('/')
          await deleteProject(id.toString()).unwrap();
        } catch (error) {
          console.error('Failed to delete the project:', error);
        }
      };

  return (
    <div className='flex justify-end gap-3'>
        <Button onClick={handleDelete} variant='outline' className='bg-red-800 hover:bg-red-900'>Delete</Button>
        <DialogClose asChild>
            <Button variant='default'>Cancel</Button>
        </DialogClose>
    </div>
  )
}

export default DeleteProject