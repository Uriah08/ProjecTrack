import { useEffect } from 'react';
import { useAskAIMutation } from '@/store/api';
import { Task } from '@prisma/client';

import { Skeleton } from '../ui/skeleton';

type Props = {
  task: Task;
};


const AI = ({ task }: Props) => {
  const [askAI, { isLoading, isError, isSuccess, data }] = useAskAIMutation();

  useEffect(() => {
    if (task) {
      const { title } = task;
      askAI({ title });
    }
  }, [task, askAI]);

  const answer : string = data?.data.text || "No AI response"

  return (
    <div className='flex flex-col justify-center items-center p-4'>
      <h1 className='text-2xl font-bold mb-4'>{task.title}</h1>

      {isLoading && <Skeleton className='w-full h-[100px]'/>}

      {isSuccess && data && (
        <div className='mt-4 p-4 '>
          <p className='text-center'>{answer}</p>
        </div>
      )}

      {isError && (
        <p className='mt-4 text-red-600'>Error asking AI!</p>
      )}
    </div>
  );
};

export default AI;
