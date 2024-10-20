'use client'

// import Image from 'next/image';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import { useTheme } from 'next-themes';
import { Project } from '@prisma/client';

type Props = {
  projects: Project[]
}

const CountChart = ({projects}: Props) => {

    const { theme } = useTheme() 

    const cancelled = projects?.filter(project => project.status === 'Cancelled').length
    const late = projects?.filter(project => project.status === 'Late').length
    const current = projects?.filter(project => project.status === 'Current').length
    const finished = projects?.filter(project => project.status === 'Finished').length
    const total = projects.length

    const data = [
      {
            name: 'Total',
            count: total,
            fill: `${theme === 'dark' ? '#141414' : '#f5f5f5'}`,
      },
      {
        name: 'Cancelled',
        count: cancelled,
        fill: '#EF4444',
      },
      {
        name: 'Late',
        count: late,
        fill: '#F59E0B',
      },
      {
        name: 'Finished',
        count: finished,
        fill: '#22C55E',
      },
      {
        name: 'Current',
        count: current,
        fill: '#3B82F6',
      },
    ];

  return (
    <div className='dark:bg-myDark bg-myLight rounded-xl w-full h-full p-4'>
        <div className='flex justify-between items-center'>
            <h1 className='text-lg font-semibold'>Your Projects</h1>
            {/* <Image src={'/moreDark.png'} alt='logo' width={20} height={20}/> */}
        </div>
        <div className='w-full h-[75%] relative'>
        <ResponsiveContainer>
        <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="100%" barSize={32} data={data}>
          <RadialBar
            dataKey="count"
          />
        </RadialBarChart>
      </ResponsiveContainer>
      {/* <Image src={'/maleFemale.png'} width={50} height={50} alt='image' className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'/> */}
        </div>
        <div className='flex justify-center gap-16 flex-wrap'>
            <div className='flex flex-col gap-1'>
              <div className='flex gap-1'>
              <div className='w-5 h-5 bg-[#3B82F6] rounded-full'></div>
              <h1 className='font-bold'>{current}</h1>
              </div>
                    <h2 className='text-xs text-gray-500'>Current ({Math.round((current / total) * 100)}%)</h2>
            </div>
            <div className='flex flex-col gap-1'>
              <div className='flex gap-1'>
              <div className='w-5 h-5 bg-[#22C55E] rounded-full'></div>
              <h1 className='font-bold'>{finished}</h1>
              </div>
                    <h2 className='text-xs text-gray-500'>Finished ({Math.round((finished / total) * 100)}%)</h2>
            </div>
            <div className='flex flex-col gap-1'>
              <div className='flex gap-1'>
              <div className='w-5 h-5 bg-[#F59E0B] rounded-full'></div>
              <h1 className='font-bold'>{late}</h1>
              </div>
                    <h2 className='text-xs text-gray-500'>Late ({Math.round((late / total) * 100)}%)</h2>
            </div>
            <div className='flex flex-col gap-1'>
              <div className='flex gap-1'>
              <div className='w-5 h-5 bg-[#EF4444] rounded-full'></div>
              <h1 className='font-bold'>{cancelled}</h1>
              </div>
                    <h2 className='text-xs text-gray-500'>Cancelled ({Math.round((cancelled / total) * 100)}%)</h2>
            </div>
        </div>
    </div>
  )
}

export default CountChart