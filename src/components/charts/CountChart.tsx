'use client'

// import Image from 'next/image';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import { useTheme } from 'next-themes';

const CountChart = () => {

    const { theme } = useTheme()

    const data = [
        {
            name: 'Total',
            count: 102,
            fill: `${theme === 'dark' ? '#141414' : '#f5f5f5'}`,
          },
      {
        name: 'Girls',
        count: 53,
        fill: '#F0406F',
      },
      {
        name: '25-29',
        count: 50,
        fill: '#F0406F',
      },
    ];

  return (
    <div className='dark:bg-myDark bg-myLight rounded-xl w-full h-full p-4'>
        <div className='flex justify-between items-center'>
            <h1 className='text-lg font-semibold'>Projects</h1>
            {/* <Image src={'/moreDark.png'} alt='logo' width={20} height={20}/> */}
        </div>
        <div className='w-full h-[75%] relative'>
        <ResponsiveContainer>
        <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="100%" barSize={32} data={data}>
          <RadialBar
            label={{ position: 'insideStart', fill: `${theme === 'light' ? '#141414' : '#f5f5f5'}` }}
            dataKey="count"
          />
        </RadialBarChart>
      </ResponsiveContainer>
      {/* <Image src={'/maleFemale.png'} width={50} height={50} alt='image' className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'/> */}
        </div>
        <div className='flex justify-center gap-16'>
            <div className='flex flex-col gap-1'>
                <div className='w-5 h-5 bg-uriSky rounded-full'></div>
                    <h1 className='font-bold'>1,321</h1>
                    <h2 className='text-xs text-gray-500'>Boys (55%)</h2>
            </div>
            <div className='flex flex-col gap-1'>
                <div className='w-5 h-5 bg-uriYellow rounded-full'></div>
                    <h1 className='font-bold'>1,321</h1>
                    <h2 className='text-xs text-gray-500'>Girls (45%)</h2>
            </div>
        </div>
    </div>
  )
}

export default CountChart