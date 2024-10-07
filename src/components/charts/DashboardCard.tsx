import { LucideProps } from 'lucide-react'
import React, { ForwardRefExoticComponent, RefAttributes } from 'react'

type Props = {
    label: string
    icon: ForwardRefExoticComponent<LucideProps & RefAttributes<SVGSVGElement>>
}

const DashboardCard = ({label, icon: Icon}: Props) => {
  return (
    <div className='flex flex-col flex-1 rounded-xl p-5 bg-follow dark:bg-main dark:text-myDark text-myLight gap-3'>
        <div className='flex gap-2 items-center'>
        <div className='dark:bg-myDark bg-myLight rounded-full p-2 w-fit'>
            <Icon size={20} className='text-follow dark:text-main'/>
        </div>
        <h1 className='text-normal lg:text-lg font-medium'>{label}</h1>
        </div>
        <h1 className='font-bold lg:text-5xl text-4xl'>3745</h1>
    </div>
  )
}

export default DashboardCard