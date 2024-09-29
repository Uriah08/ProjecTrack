import { z } from 'zod';

export const taskSchema = z.object({
    title: z.string().min(3, {
        message: "Task title must be at least 3 characters long"
    }).max(100, {
        message: "Task title must be at most 100 characters long"
    }),
    description: z.string().optional(),
    tags: z.string().optional(),
    priority: z.string(),
    status: z.string(),
    startDate: z.string().refine(value => !isNaN(Date.parse(value)), {
        message: "End date must be a valid date"
    }),
    endDate: z.string().refine(value =>!isNaN(Date.parse(value)), {
        message: "End date must be a valid date"
    }),
    projectId: z.string()
}).refine(data => new Date(data.endDate) > new Date(data.startDate), {
    message: "End date must be after start date",
    path: ["endDate"],
});

export const projectSchema = z.object({
    name: z.string().min(3, {
        message: "Project name must be at least 3 characters long"
    }),
    description: z.string(),
    startDate: z.string().refine(value => !isNaN(Date.parse(value)), {
        message: "Start date must be a valid date"
    }),
    endDate: z.string().refine(value => !isNaN(Date.parse(value)), {
        message: "End date must be a valid date"
    }),
    userId: z.string()
}).refine(data => new Date(data.endDate) > new Date(data.startDate), {
    message: "End date must be after start date",
    path: ["endDate"],
});
