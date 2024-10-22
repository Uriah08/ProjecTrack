"use client";

import { Project } from '@prisma/client';
import { LineChart, Line, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

type Props = {
  Projects: Project[];
};

interface CustomTooltipProps {
  active?: boolean; // active can be optional
  payload?: Array<{
    payload: {
      name: string;
      Projects: number;
    };
    value: number;
  }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-myLightFollow dark:bg-myDarkFollow border border-gray-300 rounded-lg p-2 shadow-lg">
        <p className="dark:text-myLight text-myDark font-semibold">{`${payload[0].payload.name}`}</p>
        <p className="dark:text-myLight text-myDark">{`Projects: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const ProjectChart = ({ Projects = [] }: Props) => {
  const monthCounts = Array(12).fill(0);

  Projects.forEach(project => {
    const month = new Date(project.startDate).getMonth();
    monthCounts[month] += 1;
  });

  const data = monthCounts.map((count, index) => ({
    name: format(new Date(0, index), 'MMM'),
    Projects: count,
  }));

  return (
    <div className="bg-zinc-200 dark:bg-zinc-800 rounded-xl w-full h-full p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Your Project Status</h1>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <Tooltip content={<CustomTooltip />} />
          <Legend align='center' verticalAlign='top' wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }} />
          <Line type="monotone" dataKey="Projects" stroke="#F0406F" activeDot={{ r: 3 }} strokeWidth={1} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProjectChart;
