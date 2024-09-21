import React from 'react'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import Profile from './Profile'
import ToggleTheme from '../toggle-theme'

const NavBar = () => {
  return (
    <div className='w-full h-[80px] bg-myLightFollow dark:bg-myDarkFollow flex justify-between items-center px-5 md:px-10 py-14'>
      <div className='relative w-fit border p-2 rounded-full'>
      <Input className='w-[150px] md:w-[200px] ml-9 border-none focus-visible:ring-0 focus-visible:outline-none shadow-none' placeholder='Search...'/>
      <Search className='absolute top-[13px] left-5'/>
      </div>
      <div className='flex gap-5 items-center'>
        <ToggleTheme/>
      <Profile/>
      </div>
    </div>
  )
}

export default NavBar