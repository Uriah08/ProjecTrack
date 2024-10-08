"use client"

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

import { projectSchema } from "@/src/schemas"

import { Project } from '@prisma/client'

type Props = {
    project?: Project
}

const UpdateProject = ({project}: Props) => {

    const form = useForm<z.infer<typeof projectSchema>>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            name: project?.name,
            description: project?.description || "",
            userId: project?.userId,
        },
    });

    const onSubmit = async (values: z.infer<typeof projectSchema>) => {
        console.log(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Project Name" {...field} />
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
                                <Textarea placeholder="Project description" {...field} className="resize-none" />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit" className="dark:bg-main dark:hover:bg-main2 hover:bg-follow2 bg-follow w-full">
                    Update
                </Button>
            </form>
        </Form>
    )
}

export default UpdateProject