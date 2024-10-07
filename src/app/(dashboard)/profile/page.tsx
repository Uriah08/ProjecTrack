import React from 'react'
import { auth } from '@/auth'
import SignOut from '@/components/sign-out'

const ProfilePage = async () => {

  const session = await auth()

  return (
    <div className='bg-myLightFollow dark:bg-myDarkFollow h-full'>
      <h1>{JSON.stringify(session)}</h1>
      <SignOut/>
    </div>
  )
}

export default ProfilePage