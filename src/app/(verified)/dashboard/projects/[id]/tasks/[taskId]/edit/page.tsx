"use client";

import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/useApi";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import MotionDiv from "@/components/animations/MotionDiv";
import { useState, useEffect } from "react";
import { LoadingButton } from "@/components/shared/LoadingButton";
import { Skeleton } from "@/components/ui/skeleton";
import { ProjectMember, Task } from "@/types";

const formSchema = z.object({
  title: z.string().min(1, "Task title is required"),
  description: z.string().optional(),
  status: z.enum(["TODO", "IN_PROGRESS", "IN_REVIEW", "COMPLETED"]),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
  dueDate: z.string().optional(),
  assignedToId: z.string().optional(),
});
export default function EditTaskPage({
  params,
}: {
  params: { id: string; taskId: string };
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Fetch task details
  const { data: taskData, isLoading: taskLoading } = useApi<Task>(
    `/api/projects/${params.id}/tasks/${params.taskId}`,
    {
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Error loading task",
          description: error.message,
        });
      },
    }
  );
  // Fetch project members
  const { data: projectMembers = [], isLoading: membersLoading } = useApi<
    ProjectMember[]
  >(`/api/projects/${params.id}/members`, {
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error loading project members",
        description: error.message,
      });
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "TODO",
      priority: "MEDIUM",
      dueDate: "",
      assignedToId: "",
    },
  });
  // Update form when task data is loaded
  useEffect(() => {
    if (taskData) {
      form.reset({
        title: taskData.title,
        description: taskData.description || "",
        status: taskData.status || "TODO",
        priority: taskData.priority || "MEDIUM",
        dueDate: taskData.dueDate
          ? new Date(taskData.dueDate).toISOString().split("T")[0]
          : "",
        assignedToId: taskData.assignedToId || "",
      });
    }
  }, [taskData, form]);
  const { mutate, isLoading } = useApi(
    `/api/projects/${params.id}/tasks/${params.taskId}`,
    {
      method: "PUT",
      enabled: false,
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Task updated successfully",
          className:
            "bg-green-100 dark:bg-slate-950 border-green-600 dark:border-green-800",
        });
        router.push(`/dashboard/projects/${params.id}`);
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
        setIsSubmitting(false);
      },
    }
  );
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await mutate({ body: values });
    } catch (error) {
      console.error("Error updating task:", error);
      setIsSubmitting(false);
    }
  };
  // Render skeleton while loading
  if (taskLoading || membersLoading) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="p-6 border rounded-lg space-y-6">
          {/* Title skeleton */}
          <Skeleton className="h-8 w-48" />
          {/* Form field skeletons */}
          <div className="space-y-6">
            {/* Task Title field */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
            {/* Description field */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-24 w-full" />
            </div>
            {/* Status field */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
            {/* Priority field */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            {/* Due Date field */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            {/* Assign To field */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            {/* Buttons */}
            <div className="flex justify-end gap-4">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">Edit Task</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter task title"
                      {...field}
                      disabled={isLoading || taskLoading}
                    />
                  </FormControl>
                  <FormMessage />
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
                    <Textarea
                      placeholder="Enter task description"
                      className="resize-none"
                      {...field}
                      disabled={isLoading || taskLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isLoading || taskLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select task status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="TODO">To Do</SelectItem>
                        <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                        <SelectItem value="IN_REVIEW">In Review</SelectItem>
                        <SelectItem value="COMPLETED">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isLoading || taskLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="LOW">Low</SelectItem>
                        <SelectItem value="MEDIUM">Medium</SelectItem>
                        <SelectItem value="HIGH">High</SelectItem>
                        <SelectItem value="URGENT">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      disabled={isLoading || taskLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="assignedToId"
              render={({ field }) => {
                const members = projectMembers || [];
                return (
                  <FormItem>
                    <FormLabel>Assign To</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isLoading || taskLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select member" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {members.map((member) => (
                          <SelectItem
                            key={member.user.id}
                            value={member.user.id}
                          >
                            {member.user.name || member.user.email}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isLoading || taskLoading}
              >
                Cancel
              </Button>
              <LoadingButton
                type="submit"
                className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500"
                isLoading={isLoading}
                loadingText="Updating..."
              >
                Update Task
              </LoadingButton>
            </div>
          </form>
        </Form>
      </Card>
    </MotionDiv>
  );
}
