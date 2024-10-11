import { LucideProps } from 'lucide-react'
import React, { ForwardRefExoticComponent, RefAttributes } from 'react'

type Props = {
    label: string
    icon: ForwardRefExoticComponent<LucideProps & RefAttributes<SVGSVGElement>>
    projects?: number
    color: string
}

const DashboardCard = ({label, icon: Icon, projects, color}: Props) => {

  return (
    <div className={`flex shadow-md flex-col flex-1 rounded-xl p-5 bg-${color} dark:text-myDark text-myLight gap-3`}>
        <div className='flex gap-2 items-center'>
        <div className='dark:bg-myDark bg-myLight rounded-full p-2 w-fit'>
            <Icon size={20} className={`rounded-full ${label === 'Current' ? 'text-blue-500': label === 'Finished' ? 'text-green-500':label === 'Late' ? 'text-yellow-500':'text-red-500'}`}/>
        </div>
        <h1 className='text-normal lg:text-lg font-medium'>{label}</h1>
        </div>
        <h1 className='font-bold lg:text-5xl text-4xl'>{projects}</h1>
    </div>
  )
}

export default DashboardCard