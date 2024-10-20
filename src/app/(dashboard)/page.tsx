"use client"

import React from 'react'
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { FolderPlus } from 'lucide-react';
import DashboardCard from '@/components/charts/DashboardCard';

import { Book, BookMarked, BookX, BookCheck } from 'lucide-react';
import CountChart from '@/components/charts/CountChart';
import StatusChart from '@/components/charts/StatusChart';
import ProjectChart from '@/components/charts/ProjectChart';
import { Calendar } from '@/components/ui/calendar';
import { useGetProjectsQuery } from '@/store/api';
import ProjectSection from '@/components/charts/ProjectSection';

import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import DialogContainer from '@/components/containers/Dialog';
import Time from '@/components/charts/Time';
import Recommendation from '@/components/charts/Recommendation';
import LoadingSpinner from '@/components/containers/LoadingSpinner';

export default function Home() {

  const { data: session} = useSession()

  const { data: projects = [], isLoading, refetch } = useGetProjectsQuery(session?.user?.id ?? '',{
    skip: !session?.user?.id
  });

  React.useEffect(() => {
    if (session?.user?.id) {
      refetch();
    }
  }, [refetch, session?.user?.id]);

  if(!session) {
    return (
      <LoadingSpinner/>
    )
  }

  const statuses = [
    {label: 'Current', color: 'blue-500', icon: Book},
    {label: 'Finished', color: 'green-500', icon: BookCheck},
    {label: 'Late', color: 'yellow-500', icon: BookMarked},
    {label: 'Cancelled', color: 'red-500', icon: BookX}
  ]  

  return (
    <div className="bg-myLightFollow dark:bg-myDarkFollow h-full p-5 md:p-10 flex xl:flex-row flex-col gap-8">
      <div className='w-full flex flex-col xl:w-2/3 h-fit gap-5'>
        <div className='w-full dark:bg-myDark gap-5 p-5 rounded-xl flex justify-between items-center shadow-md bg-myLight'>
          <h1 className='text-xl xl:text-2xl font-bold'>Hi <span className='text-follow dark:text-main'>{session?.user?.name}!</span> Welcome to ProjecTrack</h1>
          <Dialog>
            <DialogTrigger asChild>
            <Button className='dark:bg-main bg-follow gap-2'>
            <FolderPlus size={20}/> <span className='hidden md:block'>Create Project</span>
            </Button>
            </DialogTrigger>
            <DialogContainer type='project'/>
          </Dialog>
        </div>
        <div className='flex flex-wrap w-full gap-5'>
          {statuses.map(({label,color, icon}) => (
            <DashboardCard key={label} label={label} color={color} icon={icon} projects={projects?.filter(project => project.status === label).length}/>
          ))}
        </div>
        <div className='flex xl:flex-row flex-col gap-5'>
          <div className='flex-1 shadow-md rounded-lg'>
            <CountChart projects={projects}/>
          </div>
          <div className='flex-1 shadow-md rounded-lg'>
            <StatusChart projects={projects}/>
          </div>
        </div>
        <div className='flex w-full h-[500px] shadow-md rounded-lg'>
          <ProjectChart Projects={projects}/>
        </div>
      </div>
      <div className='w-full xl:w-1/3 gap-5 flex flex-col'>
        <div className='flex gap-5 sm:flex-row flex-col'>
          <div className="flex justify-center items-center">
          <Calendar/>
          </div>
        <Time/>
        </div>
        <ProjectSection projects={projects || []} isLoading={isLoading} statuses={statuses}/>
        <Recommendation/>
      </div>
    </div>
  );
};
