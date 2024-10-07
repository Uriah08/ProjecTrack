"use client"

import React from 'react'

import { BarChart, Bar, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Mon',
    present: 80,
    absent: 34,
  },
  {
    name: 'Tue',
    present: 64,
    absent: 32,
  },
  {
    name: 'Wed',
    present: 89,
    absent: 12,
  },
  {
    name: 'Thu',
    present: 56,
    absent: 54,
  },
  {
    name: 'Fri',
    present: 78,
    absent: 32,
  },
  {
    name: 'Sat',
    present: 89,
    absent: 15,
  },
  {
    name: 'Sun',
    present: 78,
    absent: 23,
  },
];

const StatusChart = () => {
  return (
    <div className='bg-myLight dark:bg-myDark rounded-lg p-4 h-full'>
        <div className='flex justify-between items-center'>
            <h1 className='text-lg font-semibold'>Your Tasks Status</h1>
        </div>
        <ResponsiveContainer width="100%" height="90%">
        <BarChart
          width={500}
          height={300}
          data={data}
          barSize={20}
        >
            <Legend align='left' verticalAlign='top' wrapperStyle={{paddingTop:"20px", paddingBottom:"40px"}}/>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke='#ddd'/>
          <Tooltip contentStyle={{borderRadius:"10px", borderColor:"pink"}}/>
          <Bar dataKey="present" fill="#F0406F" legendType='circle' />
          <Bar dataKey="absent" fill="#4D9AD0" legendType='circle'/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default StatusChart