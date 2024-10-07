import { Project } from '@prisma/client'
import React from 'react'
import { format } from 'date-fns'
import Link from 'next/link'
import { Skeleton } from '../ui/skeleton'

type Props = {
    projects: Project[]
    isLoading: boolean
}

const ProjectSection = ({projects, isLoading}: Props) => {
  return (
    <div className='flex flex-col'>
        <h1 className='text-xl font-bold mb-5'>Recent Projects</h1>
        {isLoading && (
            <div className='gap-3'>
            <Skeleton className="h-[75px] w-[580px] pr-3 border-t-4 border-follow dark:border-main mt-3"/>
            <Skeleton className="h-[75px] w-[580px] pr-3 border-t-4 border-follow dark:border-main mt-3"/>
            <Skeleton className="h-[75px] w-[580px] pr-3 border-t-4 border-follow dark:border-main mt-3"/>
            <Skeleton className="h-[75px] w-[580px] pr-3 border-t-4 border-follow dark:border-main mt-3"/>
            </div>
        )}
        <div className='flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-3 pt-3'>
        {projects && [...projects].reverse().map((project) => (
        <Link href={`/project/${project.id}`} key={project.id} className='relative p-5 flex justify-between bg-myLight dark:bg-zinc-800 rounded-lg border-t-4 border-follow dark:border-main hover:-translate-y-1 duration-200 transition-all'>
            <div className='absolute w-full h-[5px] -top-[5px] left-0 bg-main -z-10 blur-sm hover:blur-xl rounded-full duration-200 transition-all'/>
            <h1 className='text-xl font-medium'>{project.name}</h1>
            <div className='text-zinc-500'>
                <h1>{format(new Date(project.startDate), "MMM d, yyyy")} - {format(new Date(project.endDate), "MMM d, yyyy")}</h1>
            </div>
        </Link>
))}

    </div>
    </div>
  )
}

export default ProjectSection