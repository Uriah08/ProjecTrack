import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { auth } from '@/auth'

const  Profile = async () => {

  const session = await auth()

  return (
    <Link href={'/settings'} className='flex items-center gap-3'>
        <div className='sm:flex flex-col items-end hidden'>
            <h1 className='font-medium'>{session?.user?.name}</h1>
            <p className='text-xs text-[#868686]'>{session?.user?.email}</p>
        </div>
        <Image src={session?.user?.image ?? '/logo.png'} width={40} height={40} alt='profile picture' className='rounded-full'/>
    </Link>
  )
}

export default Profile