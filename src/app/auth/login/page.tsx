
import SignIn from '@/src/components/sign-in'
import Image from 'next/image'
import React from 'react'

const LoginPage = () => {
  return (
    <div className='h-full w-full flex px-10 lg:px-20 pt-20 flex-col bg-myDarkFollow relative overflow-x-hidden'>
      <div className='flex gap-6 md:gap-8 items-center z-20 self-center'>
        <Image src={'/logo.png'} width={80} height={80} alt='logo' className='w-[50px] md:w-[60px]'/>
        <h1 className='text-3xl md:text-4xl font-bold text-main'>Projec<span className='text-follow'>Track</span></h1>
      </div>

      <h1 className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mt-20 z-20 self-center text-center text-myLight'>Your Ultimate Project Management Solution!</h1>

      <div className='mt-8 md:mt-16 self-center text-center md:text-justify'>
        <p className='text-base md:text-xl text-myLight'>ProjecTrack is a powerful, easy-to-use project management system designed to help you organize, track, and streamline your projects from start to finish. Whether you’re managing personal tasks or project, ProjecTrack offers a complete toolkit to break down complex projects into manageable tasks, assign deadlines, and track progress.</p>
      </div>
      <div className='w-[300px] self-center mt-10'>
      <SignIn/>
      </div>
      <div className='relative w-full h-[1200px] mt-20 overflow-y-hidden'>
      <Image draggable={false} src={'/Hero.png'} width={1200} height={1200} alt='HeroImage' className='absolute z-10 left-1/2 transform -translate-x-1/2'/>
      </div>

        {/* <div className='p-8 border rounded-2xl dark:border-main border-follow flex flex-col items-center justify-center gap-5'>

                <div className='flex items-center gap-5'>
                    <Image src={'/logo.png'} width={40} height={40} alt='logo'/>
                    <h1 className='text-main font-semibold text-2xl'>Projec<span className='text-follow'>Track</span></h1>
                </div>
                <div className=' pb-5'>
                <h1 className='text-3xl font-bold'>Welcome to ProjecTrack!</h1>
                </div>

                <SignIn/>
        </div> */}

    </div>
  )
}

export default LoginPage