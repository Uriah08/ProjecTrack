"use client"
import React from 'react'
import { Button } from '../ui/button'
import { DialogClose } from '../ui/dialog'

import { useUpdateProjectStatusMutation } from '@/store/api'
import { useParams } from 'next/navigation'

const FinishProject = () => {

    const [updateProjectStatus, { isLoading }] = useUpdateProjectStatusMutation();

    const { id } = useParams()

    const handleFinishProject = async () => {
        try {
          await updateProjectStatus({ id: id.toString(), status: 'Finished' }).unwrap();
        } catch (error) {
          console.error('Failed to finish project:', error);
        }
      };
    

  return (
    <div className='flex justify-end gap-3'>
        <Button
        onClick={handleFinishProject}
        disabled={isLoading}
        variant='outline' className='bg-green-600 hover:bg-green-700'>Finish</Button>
        <DialogClose asChild>
            <Button variant='default'>Cancel</Button>
        </DialogClose>
    </div>
  )
}

export default FinishProject