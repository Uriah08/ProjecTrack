import React, { useState, useEffect } from 'react';

const Time: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const hours = time.getHours() % 12 || 12;
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');
  const ampm = time.getHours() >= 12 ? 'PM' : 'AM';
  const day = time.toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div className="h-full w-full bg-follow dark:bg-main rounded-xl flex flex-col items-center justify-center">
      <h1 className="text-xl font-bold">{day}</h1>
      <div className="flex space-x-2 text-2xl font-normal">
        <span>{hours} : {minutes} : {seconds} {ampm}</span>
      </div>
    </div>
  );
};

export default Time;
