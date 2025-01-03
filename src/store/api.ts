import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Project, Task } from '@prisma/client';

interface AIResponse {
  data: {
    text: string;
  };
}

type NotificationResponse = {
  notifications: Project[]
}

export const projectsApi = createApi({
  reducerPath: 'projectsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Project', 'Task','AI'],
  endpoints: (builder) => ({
    getProjects: builder.query<Project[], string>({
      query: (userId) => `/projects?userId=${userId}`,
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
      invalidatesTags: ['Project'], 
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
    updateProjectStatus: builder.mutation<Project, { id: string, status: string }>({
      query: ({ id, status }) => ({
        url: `/projects/${id}`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Project', id }],
    }),
    getTasks: builder.query<Task[], string>({
      query: (projectId) => `/tasks?projectId=${projectId}`,
      providesTags: (result = []) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Task' as const, id })), 'Task']
          : ['Task'],
    }),
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
    updateTask: builder.mutation<Task, { id: string; data: Partial<Task> }>({
      query: ({ id, data }) => ({
        url: `/tasks?taskId=${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Task', id }],
    }),
    deleteTask: builder.mutation<void, string>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Task', id }],
    }),
    askAI: builder.mutation<AIResponse, { title: string }>({
      query: ({ title }) => ({
        url: '/ask',
        method: 'POST',
        body: { title  },
      }),
      invalidatesTags: ['AI'],
    }),
    getNotifications: builder.query<NotificationResponse, void>({
      query: () => '/notifications',
      providesTags: ['Project'],
    }),
    markNotificationsAsRead: builder.mutation({
      query: () => ({
        url: '/notifications',
        method: 'POST',
      }),
      invalidatesTags: ['Project'],
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
  useGetTasksQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useAskAIMutation,
  useUpdateProjectStatusMutation,
  useGetNotificationsQuery,
  useMarkNotificationsAsReadMutation,
} = projectsApi;
