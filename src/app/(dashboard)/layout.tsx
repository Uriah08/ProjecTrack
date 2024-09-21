import React, { ReactNode } from 'react'

import NavBar from '@/components/containers/NavBar'
import SideBarLayout from '@/src/components/containers/SideBarLayout'

type Props = {
  children: ReactNode,
}

const MainLayout = ({children}:Props) => {

  return (
    <div className='relative w-full h-[100%] flex'>
      <SideBarLayout/>
      <div className='flex flex-col w-full h-[100%]'>
      <NavBar/>
      {children}
      </div>
    </div>
  )
}

export default MainLayout