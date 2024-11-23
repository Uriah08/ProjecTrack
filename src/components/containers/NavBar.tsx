import React from 'react'
import { Search } from 'lucide-react'
import Profile from './Profile'
import { Dialog, DialogTrigger } from '../ui/dialog'
import DialogContainer from './Dialog'

import { Bell } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

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
            <Popover>
              <PopoverTrigger asChild>
                <div className='relative cursor-pointer'>
                <Bell size={25}/>
                <div className='flex justify-center items-center bg-red-500 text-[#f5f5f5] -top-[10px] -right-[10px] absolute rounded-full h-5 w-5'>3</div>
                </div>
              </PopoverTrigger>
              <PopoverContent className='dark:bg-[#141414] bg-[#f5f5f5] gap-4 flex flex-col max-h-[300px] h-full overflow-y-auto'>
                <div className='flex flex-col gap-3 pb-3 border-b border-gray-200 dark:border-gray-800'>
                  <h1 className='text-sm'>Project Name</h1>
                  <p className='text-xs fg'>Your Project will reach the deadline within 10days.</p>
                </div>
                <div className='flex flex-col gap-3 pb-3 border-b border-gray-200 dark:border-gray-800'>
                  <h1 className='text-sm'>Project Name</h1>
                  <p className='text-xs fg'>Your Project will reach the deadline within 10days.</p>
                </div>

                <div className='flex flex-col gap-3 pb-3 border-b border-gray-200 dark:border-gray-800'>
                  <h1 className='text-sm'>Project Name</h1>
                  <p className='text-xs fg'>Your Project will reach the deadline within 10days.</p>
                </div>
                <div className='flex flex-col gap-3 pb-3 border-b border-gray-200 dark:border-gray-800'>
                  <h1 className='text-sm'>Project Name</h1>
                  <p className='text-xs fg'>Your Project will reach the deadline within 10days.</p>
                </div>
                <div className='flex flex-col gap-3 pb-3 border-b border-gray-200 dark:border-gray-800'>
                  <h1 className='text-sm'>Project Name</h1>
                  <p className='text-xs fg'>Your Project will reach the deadline within 10days.</p>
                </div>
                <div className='flex flex-col gap-3 pb-3 border-b border-gray-200 dark:border-gray-800'>
                  <h1 className='text-sm'>Project Name</h1>
                  <p className='text-xs fg'>Your Project will reach the deadline within 10days.</p>
                </div>
              </PopoverContent>
            </Popover>
          <Profile/>
          </div>
        </div>
  )
}

export default NavBar