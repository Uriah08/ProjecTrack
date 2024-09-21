
import SignIn from '@/src/components/sign-in'
import Image from 'next/image'
import React from 'react'

const LoginPage = () => {
  return (
    <div className='h-full w-full flex items-center justify-center'>
        <div className='p-8 border rounded-2xl dark:border-main border-follow flex flex-col items-center justify-center gap-5'>

                <div className='flex items-center gap-5'>
                    <Image src={'/logo.png'} width={40} height={40} alt='logo'/>
                    <h1 className='text-main font-semibold text-2xl'>Projec<span className='text-follow'>Track</span></h1>
                </div>
                <div className=' pb-5'>
                <h1 className='text-3xl font-bold'>Welcome to ProjecTrack!</h1>
                </div>

                <SignIn/>
        </div>
    </div>
  )
}

export default LoginPage