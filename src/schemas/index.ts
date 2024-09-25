import { z } from 'zod';

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
