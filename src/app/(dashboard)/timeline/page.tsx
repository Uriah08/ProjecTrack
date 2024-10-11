"use client";

import { useGetProjectsQuery } from '@/store/api';
import { useSession } from 'next-auth/react';
import React, { useMemo, useState } from 'react';
import LoadingSpinner from '@/components/containers/LoadingSpinner';
import "gantt-task-react/dist/index.css";
import { DisplayOption, Gantt, Task, ViewMode } from 'gantt-task-react';

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

import { useTheme } from 'next-themes';

const TimelinePage = () => {

  const { theme } = useTheme();
  const { data: session } = useSession();

  // Fetching the projects
  const { data: projects = [], isLoading } = useGetProjectsQuery(session?.user?.id ?? '', {
    skip: !session?.user?.id,
  });

  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: 'en-US',
  });

  const ganttProjects: Task[] = useMemo(() => {
    return (
      projects?.map((project) => ({
        start: new Date(project.startDate),
        end: new Date(project.endDate),
        id: project.id,
        name: project.name,
        type: "task",
        progress: 100, // you can modify this based on real progress if needed
        isDisabled: false, // Change to true if you want to disable interactions
        styles: { backgroundColor: '#FF5733', progressColor: `${theme === 'dark' ? '#F0406F' : '#4D9AD0'}` }

      }))
    );
  }, [projects, theme]);

  // Show loading spinner while fetching projects
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!session) {
    return <LoadingSpinner />;
  }

  const handleViewModeChange = (value: ViewMode) => {
    setDisplayOptions((prev) => ({
      ...prev,
      viewMode: value
    }));
  };

  return (
    <div className="bg-myLightFollow dark:bg-myDarkFollow h-full p-5 md:p-10 flex flex-col gap-10">
      <h1 className='text-3xl font-semibold'>Timeline</h1>

      <div className='relative inline-block w-64'>
        <Select value={displayOptions.viewMode} onValueChange={handleViewModeChange}>
          <SelectTrigger className='w-full'>
            <SelectValue placeholder="Select view mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ViewMode.Day}>Day</SelectItem>
            <SelectItem value={ViewMode.Week}>Week</SelectItem>
            <SelectItem value={ViewMode.Month}>Month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Render the Gantt chart */}
      <div className='overflow-hidden rounded-md shadow'>
        {ganttProjects?.length === 0 ? (
          <div className='p-5 text-center'>No tasks available</div>
        ) : (
          <div className='timeline'>
            <Gantt
              todayColor=''
              fontFamily=""  // Use your custom Poppins font
              tasks={ganttProjects}
              {...displayOptions}
              columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
              listCellWidth='100px'
              projectBackgroundColor={theme === 'dark' ? "#454545" : "#aeb8c2"}
              projectBackgroundSelectedColor={theme === 'dark' ? "#ffffff" : "#9ba1e6"}
              projectProgressColor={theme === 'dark' ? "#353535" : "#aeb8c2"}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelinePage;
