import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Project } from '@prisma/client';

export const projectsApi = createApi({
  reducerPath: 'projectsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Project'],
  endpoints: (builder) => ({
    getProjects: builder.query<Project[], void>({
      query: () => '/projects',
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
    })
  }),
});

export const { useGetProjectsQuery, useCreateProjectMutation, useGetProjectByIdQuery } = projectsApi;
