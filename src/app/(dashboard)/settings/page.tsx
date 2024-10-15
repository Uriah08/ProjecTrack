import React from 'react'
import LoadingSpinner from '@/components/containers/LoadingSpinner'
import Image from 'next/image'
import SignOut from '@/components/sign-out'
import { auth } from '@/auth'
import ToggleTheme from '@/components/toggle-theme'

const SettingsPage = async () => {

  const session = await auth()

  if(!session) {
    return (
      <LoadingSpinner/>
    )
  }

  return (
    <div className="bg-myLightFollow dark:bg-myDarkFollow h-full p-5 md:p-10 flex flex-col gap-10">
      <h1 className='text-3xl font-semibold'>Settings</h1>
      <div className='flex flex-col justify-center w-full items-center mt-20'>
        <Image src={session.user?.image || ''} width={100} height={100} alt='profile logo' className='rounded-full'/>
        <h1 className='text-2xl font-semibold mt-5'>{session.user?.name}</h1>
        <h1 className='text-xl font-semibold mt-1'>{session.user?.email}</h1>
        <div className='flex items-center gap-3 mt-10 mb-5'>
          <h1 className='text-xl font-semibold'>Theme:</h1>
          <ToggleTheme/>
        </div>
        <SignOut/>
      </div>
    </div>
  )
}

export default SettingsPage