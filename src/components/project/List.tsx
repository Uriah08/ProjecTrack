import React from 'react'
import { useGetTasksQuery } from '@/store/api'
import { format } from 'date-fns'
import { Button } from '../ui/button'

import { Dialog, DialogTrigger } from '../ui/dialog';

import DialogContainer from '../containers/Dialog';
import { Filter, Search } from 'lucide-react';
import { Input } from '../ui/input';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Props = {
  projectId: string
}

const List = ({projectId}: Props) => {

  const [open, setOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedFilter, setSelectedFilter] = React.useState<'newest' | 'latest' | 'low' | 'medium' | 'high' | 'urgent' | ''>('');

  const { data: tasks, isLoading, error } = useGetTasksQuery(projectId)

  if(isLoading) {
    return <div>Loading...</div>
  }

  if(error) {
    return <div>Error fetching tasks</div>
  }

  if(tasks?.length === 0) {
    return <div className='w-full h-full flex justify-center items-center'>
      <h1 className='text-5xl font-bold mt-36 opacity-25 text-center'>No Tasks Found</h1>
    </div>
  }

  const filteredTasks = tasks
  ?.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesPriorityFilter = selectedFilter === 'low' ||
      selectedFilter === 'medium' ||
      selectedFilter === 'high' ||
      selectedFilter === 'urgent'
      ? task.priority?.toLowerCase() === selectedFilter
      : true;

    return matchesSearch && matchesPriorityFilter;
  })
  ?.sort((a, b) => {
    if (selectedFilter === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (selectedFilter === 'latest') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    return 0;
  });

  return (
    <>
    <div className='w-full flex justify-between mb-5'>
      <div className='relative w-fit border p-2 rounded-full'>
        <Input type='text' className='border-none focus:outline-none outline-none focus-visible:ring-0 pl-10' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks..."/>
      <Search className='absolute top-[13px] left-5'/>
      </div>
      <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
      <Filter size={28} className='cursor-pointer'/>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
      <DropdownMenuLabel>Filter</DropdownMenuLabel>
      <DropdownMenuItem onClick={() => setSelectedFilter('newest')}>Newest</DropdownMenuItem>
      <DropdownMenuItem onClick={() => setSelectedFilter('latest')}>Latest</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={() => setSelectedFilter('low')}>Low</DropdownMenuItem>
      <DropdownMenuItem onClick={() => setSelectedFilter('medium')}>Medium</DropdownMenuItem>
      <DropdownMenuItem onClick={() => setSelectedFilter('high')}>High</DropdownMenuItem>
      <DropdownMenuItem onClick={() => setSelectedFilter('urgent')}>Urgent</DropdownMenuItem>
      </DropdownMenuContent>
      </DropdownMenu>
    </div>
    
    <div className='grid grid-cols-1 lg:grid-cols-2 w-full gap-5'>
      {filteredTasks?.map((task) => (
        <div key={task.id} className='relative flex flex-col h-fit w-full z-0 p-10 gap-5 shadow-sm group hover:translate-x-3 transition-all duration-200'>
          <div className='absolute size-16 rounded-xl bg-follow dark:bg-main top-1.5 right-1.5 -z-10'></div>
          <div className='absolute size-16 rounded-xl bg-follow dark:bg-main opacity-50 group-hover:opacity-80 top-1.5 right-1.5 -z-10 blur-lg group-hover:blur-xl transition-all duration-200'></div>
          <div className='absolute inset-0 bg-myLight dark:bg-myDark w-full rounded-2xl [mask-image:linear-gradient(225deg,transparent_40px,black_40px)] -z-10'></div>
            <h1 className='text-xl lg:text-2xl font-bold'>{task.title}</h1>
            <p className='text-zinc-600 dark:text-zinc-400 text-base'>{task.description}</p>
            <div className='flex items-center gap-3'>
              <div className='p-2 dark:bg-main bg-follow rounded-lg'>
                <h1 className='w-fit dark:text-myDark text-myLight font-semibold '>{task.priority}</h1>
              </div>
              {task.tags ? task.tags.split(",").map((tag) => <p key={tag}>{tag}</p>) : []}
            </div>
            <p className='dark:text-zinc-600 text-zinc-400'>{format(new Date(task.createdAt), "MMMM d, yyyy")}</p>
            <div className='flex gap-3'>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant={'outline'}>Edit</Button>
                </DialogTrigger>
                <DialogContainer type='update-task' task={task}/>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant={'outline'}>Delete</Button>
                </DialogTrigger>
                <DialogContainer type='delete-task' task={task}/>
              </Dialog>
            </div>
        </div>
      ))}
    </div>
    </>
  )
}

export default List