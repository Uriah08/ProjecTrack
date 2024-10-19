
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "../ui/form";

import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";

import { Button } from "../ui/button";

import { projectSchema } from "@/src/schemas";
import { useSession } from "next-auth/react";
import { useCreateProjectMutation } from "@/src/store/api";
import { useToast } from "@/src/hooks/use-toast";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";

const CreateProject: React.FC = () => {
    const { data: session } = useSession();
    const { toast } = useToast();
    const [createProject, { isLoading }] = useCreateProjectMutation();

    const form = useForm<z.infer<typeof projectSchema>>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            name: "",
            description: "",
            userId: session?.user?.id
        },
    });

    const onSubmit = async (values: z.infer<typeof projectSchema>) => {
      const projectData = {
          ...values,
          userId: session?.user?.id,
          startDate: new Date(values.startDate),
          endDate: new Date(values.endDate),
      };
  
      try {
          await createProject(projectData).unwrap();
          toast({
              title: "Project Created",
              description: "Your project has been created successfully!",
          });
          form.reset();
      } catch (error) {
          console.log(error);
          toast({
              title: "Error Creating Project",
              description: "An error occurred while creating your project. Please try again.",
          });
      }
  };
  

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
                <div className="flex justify-between">
                    <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Start Date</FormLabel>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={'outline'}
                                                className={`w-[220px] ${!field.value && "text-muted-foreground"}`}
                                            >
                                                {field.value ? format(new Date(field.value), "PPP") : <span>Pick a date</span>}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </DialogTrigger>
                                    <DialogContent aria-describedby={undefined} className="w-auto p-4 dark:bg-myDark bg-myLight">
                                      <DialogTitle>Start Date</DialogTitle>
                                        <Calendar
                                            mode="single"
                                            selected={field.value ? new Date(field.value) : undefined}
                                            onSelect={(date) => date && field.onChange(date.toISOString())}
                                            initialFocus
                                        />
                                    </DialogContent>
                                </Dialog>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>End Date</FormLabel>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={'outline'}
                                                className={`w-[220px] ${!field.value && "text-muted-foreground"}`}
                                            >
                                                {field.value ? format(new Date(field.value), "PPP") : <span>Pick a date</span>}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </DialogTrigger>
                                    <DialogContent aria-describedby={undefined} className="w-auto p-4 dark:bg-myDark bg-myLight">
                                    <DialogTitle>End Date</DialogTitle>
                                        <Calendar
                                            mode="single"
                                            selected={field.value ? new Date(field.value) : undefined}
                                            onSelect={(date) => date && field.onChange(date.toISOString())}
                                            initialFocus
                                        />
                                    </DialogContent>
                                </Dialog>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit" className="dark:bg-main dark:hover:bg-main2 hover:bg-follow2 bg-follow w-full">
                    {isLoading ? 'Creating...' : 'Create'}
                </Button>
            </form>
        </Form>
    );
};

export default CreateProject;
