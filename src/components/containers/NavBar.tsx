import React from 'react'
import { Search } from 'lucide-react'
import Profile from './Profile'
import { Dialog, DialogTrigger } from '../ui/dialog'
import DialogContainer from './Dialog'

const NavBar = () => {
  return (
        <div className='w-full h-[80px] bg-myLightFollow dark:bg-myDarkFollow flex justify-between items-center px-5 md:px-10 py-14'>
          <div className='relative w-fit border p-2 rounded-full'>
          <Dialog>
            <DialogTrigger asChild>
                <button className='w-[150px] p-2 font-light bg-none text-start md:w-[200px] ml-9 border-none focus-visible:ring-0 focus-visible:outline-none shadow-none cursor-text'>Search...</button>
            </DialogTrigger>
            <DialogContainer type='search'/>
          </Dialog>
          <Search className='absolute top-[13px] left-5'/>
          </div>
          <div className='flex gap-5 items-center'>
          <Profile/>
          </div>
        </div>
  )
}

export default NavBar