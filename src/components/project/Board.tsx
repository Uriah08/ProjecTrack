import React from 'react';
import { useGetTasksQuery, useUpdateTaskStatusMutation } from '@/store/api';
import { Task as TaskType } from '@prisma/client';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { format } from 'date-fns';
import { EllipsisVertical, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogTrigger } from '../ui/dialog';
import DialogContainer from '../containers/Dialog';
import { TouchBackend } from 'react-dnd-touch-backend'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Skeleton } from '../ui/skeleton';

type Props = {
  projectId: string;
};

const taskStatus = ['To Do', 'In Progress', 'Completed', 'Cancelled'];

const Board = ({ projectId }: Props) => {

  const isMobileDevice = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
  };

  const backend = isMobileDevice() ? TouchBackend : HTML5Backend;

  const { data: tasks = [], isLoading, error } = useGetTasksQuery(projectId);
  const [updateTaskStatus] = useUpdateTaskStatusMutation();

  // Move task to a new status and update in the backend
  const moveTask = async (id: string, toStatus: string) => {
    try {
      // Send a PATCH request to update the task status
      await updateTaskStatus({ id, status: toStatus }).unwrap();
      console.log(`Task ${id} moved to ${toStatus}`);
    } catch (err) {
      console.error('Error updating task status', err);
    }
  };

  if(error) {
    return <div>Error fetching tasks</div>;
  }

  return (
    <DndProvider backend={backend}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {taskStatus.map((status) => (
          <TaskColumn key={status} status={status} tasks={tasks} moveTask={moveTask} />
        ))}
      </div>
      {isLoading && (
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-4 px-2">
        <Skeleton className='w-full h-[180px]'/>
        <Skeleton className='w-full h-[180px]'/>
        <Skeleton className='w-full h-[180px]'/>
        <Skeleton className='w-full h-[180px]'/>
        <Skeleton className='w-full h-[180px]'/>
        <Skeleton className='w-full h-[180px]'/>
        <Skeleton className='w-full h-[180px]'/>
        <Skeleton className='w-full h-[180px]'/>
        </div>
      )}
      {tasks.length === 0 && !isLoading && (
      <div className='w-full h-full flex justify-center items-center'>
        <h1 className='text-5xl font-bold mt-36 opacity-25 text-center'>No Tasks Found</h1>
      </div>)}
    </DndProvider>
  );
};

interface TaskColumnProps {
  status: string;
  tasks: TaskType[];
  moveTask: (id: string, toStatus: string) => void;
}

const TaskColumn = ({ status, tasks, moveTask }: TaskColumnProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'task',
    drop: (item: { id: string }) => moveTask(item.id, status), // Handle task drop
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const tasksInColumn = tasks.filter((task) => task.status === status);

  return (
    <div ref={(instance) => {drop(instance)}} className={`sl:py-4 rounded-lg py-2 xl:px-2 ${isOver ? 'bg-blue-100 dark:bg-gray-800' : ''}`}>
      <div className="mb-3 flex w-full">
        <div className="flex w-full items-center justify-between rounded-lg bg-myLight dark:bg-myDark px-5 py-4">
          <h3 className="flex items-center text-lg font-semibold">{status}</h3>
          <span className="font-bold text-sm">{tasksInColumn.length}</span>
        </div>
      </div>

      {tasksInColumn.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};

interface TaskProps {
  task: TaskType
}

const Task = ({ task }: TaskProps) => {

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id : task.id},
    collect: (monitor) => ({
      isDragging:!!monitor.isDragging(),
    }),
  }));

  const taskTagsSplit = task.tags ? task.tags.split(",") : []

  const formattedStartDate = task.createdAt ? format(new Date(task.createdAt), "P") : '';

  const PriorityTag = ({ priority }: { priority: TaskType["priority"]}) => (
    <div className={`rounded-full px-2 py-1 text-xs font-semibold ${priority === "Urgent" ? "bg-red-200 text-red-700" : priority === "High" ? "bg-yellow-200 text-yellow-700" : priority === "Medium" ? "bg-green-200 text-green-700" : priority === "Low" ? "bg-blue-200 text-blue-700": "bg-gray-200 text-gray-700"}`}>
      {priority}
    </div>
  )

  return (
    <div ref={(instance) => {
      drag(instance)
    }} className={`mb-4 rounded-md dark:bg-myDark bg-myLight shadow ${isDragging ? "opacity-50":"opacity-100"}`}>
      <div className='p-4 md:p-6'>
        <div className='flex justify-between'>
          <div className='flex flex-1 flex-wrap items-center gap-2'>
          {task.priority && <PriorityTag priority={task.priority}/>}
          <div className='flex gap-2'>
            {taskTagsSplit.map((tag,i) => (
              <div key={i} className='rounded-full px-2 py-1 text-xs'>
                {" "}
                {tag}
              </div>
            ))}
            </div>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <button>
                <EllipsisVertical size={20}/>
              </button>
            </PopoverTrigger>
            <PopoverContent className='mr-[50px] bg-myLight dark:bg-myDark flex flex-col'>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant={'outline'} className='w-full border-none'>Update</Button>
                </DialogTrigger>
                <DialogContainer type='update-task' task={task}/>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant={'outline'} className='w-full border-none bg-red-800 hover:bg-destructive'>Delete</Button>
                </DialogTrigger>
                <DialogContainer type='delete-task' task={task}/>
              </Dialog>
            </PopoverContent>
          </Popover>
        </div>
        <div className='my-3 flex justify-between'>
          <h4 className='text-md font-bold'>{task.title}</h4>
        </div>

        <p className='text-sm'>
          {task.description}
        </p>

        <div className='flex justify-between items-center mt-2'>
          {formattedStartDate && <span className='text-xs text-gray-500'>Created on {formattedStartDate}</span>}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={'outline'} className='flex gap-2 bg-follow dark:bg-main dark:text-myDark text-myLight'>
                <Sparkles size={20}/> AI Help
              </Button>
            </DialogTrigger>
            <DialogContainer type='AI' task={task}/>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

export default Board;