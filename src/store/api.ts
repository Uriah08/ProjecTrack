import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Project, Task } from '@prisma/client';

export const projectsApi = createApi({
  reducerPath: 'projectsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Project', 'Task'],
  endpoints: (builder) => ({
    getProjects: builder.query<Project[], string>({
      query: (userId) => `/projects?userId=${userId}`, // Updated API endpoint to match the Next.js API route
      providesTags: (result = []) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Project' as const, id })), 'Project']
          : ['Project'],
    }),    
    createProject: builder.mutation<Project, Partial<Project>>({
      query: (newProject) => ({
        url: '/projects',
        method: 'POST',
        body: newProject,
      }),
      invalidatesTags: ['Project'], // This tells RTK Query to refetch the projects after creating a new one
    }),
    getProjectById: builder.query<Project, string>({
      query: (id) => `/projects/${id}`,
      providesTags: (result, error, id) => [{ type: 'Project', id}]
    }),
    deleteProject: builder.mutation<void, string>({
      query: (id) => ({
        url: `/projects/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Project', id }],
    }),
    getTasks: builder.query<Task[], string>({
      query: (projectId) => `/tasks?projectId=${projectId}`,
      providesTags: (result = []) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Task' as const, id })), 'Task']
          : ['Task'],
    }),
    // getTasks: builder.query<Task[], string>({
    //   query: (projectId) => `/projects/${projectId}/tasks`,
    //   providesTags: (result = []) =>
    //     result
    //       ? [...result.map(({ id }) => ({ type: 'Task' as const, id })), 'Task']
    //       : ['Task'],
    // }),
    updateTaskStatus: builder.mutation<Task, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `/tasks/${id}`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Task', id }],
    }),
    createTask: builder.mutation<Task, Partial<Task>>({
      query: (newTask) => ({
        url: '/tasks',
        method: 'POST',
        body: newTask,
      }),
      invalidatesTags: ['Task']
    }),
  }),
});

export const { 
  useGetProjectsQuery, 
  useCreateProjectMutation, 
  useGetProjectByIdQuery, 
  useDeleteProjectMutation,
  useCreateTaskMutation, 
  useUpdateTaskStatusMutation,
  useGetTasksQuery
} = projectsApi;
