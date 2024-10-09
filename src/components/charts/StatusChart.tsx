import { Project } from '@prisma/client';
import React from 'react';
import { BarChart, Bar, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from 'next-themes';

// Define a new type that includes the _count property
type ExtendedProject = Project & {
  _count?: {
    tasks: number;
  };
};

type Props = {
  projects: ExtendedProject[];
};

const StatusChart = ({ projects }: Props) => {
  const { theme } = useTheme();

  const currentProjects = projects.filter(project => project.status === 'Current') || [];
  const finishedProjects = projects.filter(project => project.status === 'Finished') || [];
  const lateProjects = projects.filter(project => project.status === 'Late') || [];
  const cancelledProjects = projects.filter(project => project.status === 'Cancelled') || [];

  const currentTasks = currentProjects.reduce((sum, project) => sum + (project._count?.tasks || 0), 0);
  const finishedTasks = finishedProjects.reduce((sum, project) => sum + (project._count?.tasks || 0), 0);
  const lateTasks = lateProjects.reduce((sum, project) => sum + (project._count?.tasks || 0), 0);
  const cancelledTasks = cancelledProjects.reduce((sum, project) => sum + (project._count?.tasks || 0), 0);

  const data = [
    {
      name: 'Current',
      Projects: currentProjects.length,
      Tasks: currentTasks,
    },
    {
      name: 'Finished',
      Projects: finishedProjects.length,
      Tasks: finishedTasks,
    },
    {
      name: 'Late',
      Projects: lateProjects.length,
      Tasks: lateTasks,
    },
    {
      name: 'Cancelled',
      Projects: cancelledProjects.length,
      Tasks: cancelledTasks,
    },
  ];

  return (
    <div className='bg-myLight dark:bg-myDark rounded-lg p-4 h-full'>
      <div className='flex justify-between items-center'>
        <h1 className='text-lg font-semibold'>Your Project Tasks</h1>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart width={500} height={300} data={data} barSize={20}>
          <Legend align='left' verticalAlign='top' wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }} />
          <Tooltip cursor={{ fill: `${theme === 'light' ? '#ebe8e8' : '#212121'}` }} contentStyle={{ borderRadius: "10px", backgroundColor: `${theme === 'light' ? '#ebe8e8' : '#212121'}` }} />
          <Bar dataKey="Projects" fill="#F0406F" legendType='circle' />
          <Bar dataKey="Tasks" fill="#4D9AD0" legendType='circle' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatusChart;
