"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel,
    FormMessage
} from "../ui/form"

import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"

import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { Calendar } from "../ui/calendar"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "../ui/button"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import { formatISO } from 'date-fns'
import { useParams } from "next/navigation"
import { taskSchema } from "@/src/schemas"

const CreateTask = () => {

    const { id } = useParams()

    const form = useForm<z.infer<typeof taskSchema>>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            title: "",
            priority: "Low",
            status: "To Do",
            projectId: id.toString(),
        },
    })

    const onSubmit = async (values: z.infer<typeof taskSchema>) => {
        console.log(values);
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
            <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                    <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col flex-1">
                                <FormLabel>Start Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={'outline'}
                                                className={`${!field.value && "text-muted-foreground"}`}>
                                                {field.value ? (
                                                    format(new Date(field.value), "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value ? new Date(field.value) : undefined}
                                            onSelect={(date) => field.onChange(date?.toISOString())}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col flex-1">
                                <FormLabel>End Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={'outline'}
                                                className={`${!field.value && "text-muted-foreground"}`}>
                                                {field.value ? (
                                                    format(new Date(field.value), "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value ? new Date(field.value) : undefined}
                                            onSelect={(date) => field.onChange(date?.toISOString())}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button variant={'outline'} className="w-full text-myLight hover:bg-follow2 dark:hover:bg-main2 dark:text-myDark bg-follow dark:bg-main">Create Task</Button>
        </form>
    </Form>
  )
}

export default CreateTask