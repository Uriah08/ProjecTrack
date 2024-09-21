"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"

const CreateProject = () => {

    const projectSchema = z.object({
        name: z.string().min(3,{
            message: "Project name must be at least 3 characters long"
        }),
        description: z.string(),
        startDate: z.date(),
        endDate: z.date()
    }).refine(data => data.endDate > data.startDate, {
        message: "End date must be after start date",
        path: ["endDate"],
    })

    const form = useForm<z.infer<typeof projectSchema>>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            name: "",
            description: "",
            startDate: new Date(),
            endDate: new Date(),
        },
    })

  return (
    <Form {...form}>
        <form className="space-y-6">
            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input placeholder="Project Name" {...field}/>
                    </FormControl>
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                        <Textarea placeholder="Project description" {...field} className="resize-none"/>
                    </FormControl>
                </FormItem>
            )}
            />
            <div className="flex">
                
            </div>
        </form>
    </Form>
  )
}

export default CreateProject