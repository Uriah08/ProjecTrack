"use client"

import { LineChart, Line, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Jan',
    income: 3400,
    expense: 2400,
    amt: 2400,
  },
  {
    name: 'Feb',
    income: 3400,
    expense: 1398,
    amt: 2210,
  },
  {
    name: 'Mar',
    income: 3400,
    expense: 9800,
    amt: 2290,
  },
  {
    name: 'Apr',
    income: 3400,
    expense: 3908,
    amt: 2000,
  },
  {
    name: 'May',
    income: 3400,
    expense: 4800,
    amt: 2181,
  },
  {
    name: 'Jun',
    income: 3400,
    expense: 3800,
    amt: 2500,
  },
  {
    name: 'Jul',
    income: 3400,
    expense: 4300,
    amt: 2100,
  },
  {
    name: 'Aug',
    income: 3400,
    expense: 4300,
    amt: 2100,
  },
  {
    name: 'Sep',
    income: 3400,
    expense: 4300,
    amt: 2100,
  },
  {
    name: 'Oct',
    income: 3400,
    expense: 4300,
    amt: 2100,
  },
  {
    name: 'Nov',
    income: 3400,
    expense: 4300,
    amt: 2100,
  },
  {
    name: 'Dec',
    income: 3400,
    expense: 4300,
    amt: 2100,
  },
];

const ProjectChart = () => {
  return (
    <div className="bg-myLight dark:bg-myDark rounded-xl w-full h-full p-4">
        <div className="flex justify-between items-center">
            <h1 className="text-lg font-semibold">Your Project Status</h1>
        </div>
        <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" color='#151515'/>
          <Tooltip />
          <Legend align='center' verticalAlign='top' wrapperStyle={{paddingTop:"10px", paddingBottom:"30px"}}/>
          <Line type="monotone" dataKey="income" stroke="#F0406F" activeDot={{ r: 3 }} strokeWidth={1}/>
          <Line type="monotone" dataKey="expense" stroke="#4D9AD0" strokeWidth={1}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ProjectChart