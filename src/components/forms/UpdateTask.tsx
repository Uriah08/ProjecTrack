"use client"

import { Task } from '@prisma/client'
import React from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel,
} from "../ui/form"

import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"

import { Button } from "../ui/button"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import { useParams } from "next/navigation"
import { taskSchema } from "@/src/schemas"

import { useToast } from "@/src/hooks/use-toast"

import { useUpdateTaskMutation } from '@/store/api'

type Props = {
    task?: Task
}

const UpdateTask = ({task}:  Props) => {

    const [updateTask, { isLoading, error }] = useUpdateTaskMutation();

    const { toast } = useToast()
    const { id } = useParams()

    const form = useForm<z.infer<typeof taskSchema>>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            title: task?.title,
            description: task?.description || "",
            priority: task?.priority || "",
            status: task?.status || "",
            tags: task?.tags || "",
            projectId: id.toString(),
        },
    })

    const onSubmit = async (values: z.infer<typeof taskSchema>) => {
        try {
            updateTask({
                id: task?.id || "",
                data:{
                    title: values.title,
                    description: values.description,
                    priority: values.priority,
                    status: values.status,
                    tags: values.tags,
                    projectId: values.projectId,
                }
            }).unwrap()
            toast({
                title: "Task updated successfully!",
                description: `Task: ${values.title} with a priority of ${values.priority}`,
            });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast({
                title: "Error updating task",
                description: `An error occurred while updating your task. Please try again.`,
            })
        }
    }

    if(error) {
        toast({
            title: "Error updating task",
            description: "An error occurred while updating your task. Please try again.",
        })
    }
  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                        <Input placeholder="Task Title" {...field} />
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
                        <Textarea placeholder="Description" {...field} className="resize-none"/>
                    </FormControl>
                </FormItem>
            )}
            />
            <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                    <FormItem className="flex flex-col flex-1">
                        <FormLabel>Tags</FormLabel>
                        <FormControl>
                            <Input placeholder="Tags (comma-separated)" {...field} />
                        </FormControl>
                    </FormItem>
                )}
            />
            <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
            <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
                <FormItem className="flex flex-col flex-1">
                <FormLabel>Status</FormLabel>
                <FormControl>
                    <Select
                    onValueChange={(value) => {
                        field.onChange(value); // Update form state
                    }}
                    defaultValue={field.value}
                    >
                    <SelectTrigger>
                        <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="To Do">To Do</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                    </Select>
                </FormControl>
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
                <FormItem className="flex flex-col flex-1">
                <FormLabel>Priority</FormLabel>
                <FormControl>
                    <Select
                    onValueChange={(value) => {
                        field.onChange(value); // Update form state
                    }}
                    defaultValue={field.value}
                    >
                    <SelectTrigger>
                        <SelectValue placeholder="Select Priority" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectItem value="Backlog">Backlog</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Urgent">Urgent</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                    </Select>
                </FormControl>
                </FormItem>
            )}
            />
            </div>
                <Button variant={'outline'} className="w-full text-myLight hover:bg-follow2 dark:hover:bg-main2 dark:text-myDark bg-follow dark:bg-main">
                    {isLoading ? "Updating..." : "Update"}
                </Button>
        </form>
    </Form>
  )
}

export default UpdateTask