'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import LoadingSpinner from '@/components/containers/LoadingSpinner'
import Image from 'next/image'

const SettingsPage = () => {

  const session = useSession()

  if(!session) {
    return (
      <LoadingSpinner/>
    )
  }

  return (
    <div className="bg-myLightFollow dark:bg-myDarkFollow h-full p-5 md:p-10 flex flex-col gap-10">
      <h1 className='text-3xl font-semibold'>Settings</h1>
      <div className='flex flex-col'>
        <Image src={session.data?.user?.image || ''} width={100} height={100} alt='profile logo' className='rounded-full'/>
        <h1 className='text-2xl font-semibold mt-5'>{session.data?.user?.name}</h1>
        <h1 className='text-2xl font-semibold mt-5'>{session.data?.user?.email}</h1>
      </div>
    </div>
  )
}

export default SettingsPage