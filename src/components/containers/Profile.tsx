import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Profile = () => {
  return (
    <Link href={'/profile'} className='flex items-center gap-3'>
        <div className='flex flex-col items-end'>
            <h1 className='font-medium'>John Doe</h1>
            <p className='text-xs text-[#868686]'>johndoe@sample.com</p>
        </div>
        <Image src={'/logo.png'} width={40} height={40} alt='profile picture'/>
    </Link>
  )
}

export default Profile