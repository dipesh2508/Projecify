"use client";

import { useSession } from "next-auth/react";
import { useApi } from "@/hooks/useApi";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Filter, Loader2 } from "lucide-react";
import { TaskStatusBadge } from "@/components/tasks/TaskStatusBadge";
import { TaskPriorityBadge } from "@/components/tasks/TaskPriorityBadge";
import { format } from "date-fns";
import { useState } from "react";
import { TasksPageSkeleton } from "@/components/tasks/TasksPageSkeleton";
import { Task } from "@/components/tasks";

type FilterValue = "all" | Task["status"] | Task["priority"];

export default function MyTasksPage() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const router = useRouter();

  const [statusFilter, setStatusFilter] = useState<FilterValue>("all");
  const [priorityFilter, setPriorityFilter] = useState<FilterValue>("all");

  const {
    data: tasks = [],
    error,
    isLoading,
  } = useApi<Task[]>(`/api/users/${session?.user?.id}/tasks`, {
    enabled: !!session?.user?.id,
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error loading tasks",
        description: error.message,
      });
    },
  });

  const filterTasks = (taskList: Task[]) => {
    return taskList.filter((task) => {
      const matchesStatus =
        statusFilter === "all" || task.status === statusFilter;
      const matchesPriority =
        priorityFilter === "all" || task.priority === priorityFilter;
      return matchesStatus && matchesPriority;
    });
  };

  const getTasksDueToday = (taskList: Task[]) => {
    return taskList.filter(
      (task) =>
        task.dueDate &&
        format(new Date(task.dueDate), "yyyy-MM-dd") ===
          format(new Date(), "yyyy-MM-dd")
    );
  };

  const getUpcomingTasks = (taskList: Task[]) => {
    return taskList.filter(
      (task) =>
        task.dueDate &&
        new Date(task.dueDate) > new Date() &&
        format(new Date(task.dueDate), "yyyy-MM-dd") !==
          format(new Date(), "yyyy-MM-dd")
    );
  };

  const getCompletedTasks = (taskList: Task[]) => {
    return taskList.filter((task) => task.status === "COMPLETED");
  };

  const getOverdueTasks = (taskList: Task[]) => {
    return taskList.filter(
      (task) =>
        task.dueDate &&
        new Date(task.dueDate) < new Date() &&
        task.status !== "COMPLETED" &&
        format(new Date(task.dueDate), "yyyy-MM-dd") !==
          format(new Date(), "yyyy-MM-dd")
    );
  };

  if (isLoading || !session?.user) {
    return <TasksPageSkeleton />;
  }

  if (error) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Something went wrong
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {error.message}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.reload()}
          >
            Try again
          </Button>
        </div>
      </div>
    );
  }

  const renderTaskCard = (task: Task) => (
    <Card key={task.id} className="hover:shadow-md transition-shadow">
      <CardContent className="flex items-center justify-between p-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{task.title}</h3>
            <TaskPriorityBadge priority={task.priority} />
            <TaskStatusBadge status={task.status} />
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Project: {task.project.name}</span>
            {task.dueDate && (
              <span>Due: {format(new Date(task.dueDate), "MMM dd, yyyy")}</span>
            )}
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            router.push(
              `/dashboard/projects/${task.project.id}/tasks/${task.id}`
            )
          }
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Tasks</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage and track your assigned tasks
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => router.push('my-tasks/calender')}>
            <Calendar className="mr-2 h-4 w-4" />
            Calendar View
          </Button>
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as FilterValue)}
          >
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="TODO">To Do</SelectItem>
              <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
              <SelectItem value="IN_REVIEW">In Review</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={priorityFilter}
            onValueChange={(value) => setPriorityFilter(value as FilterValue)}
          >
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="URGENT">Urgent</SelectItem>
              <SelectItem value="HIGH">High</SelectItem>
              <SelectItem value="MEDIUM">Medium</SelectItem>
              <SelectItem value="LOW">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="today">Due Today</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="overdue">Overdue</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <div className="grid gap-4">
            {filterTasks(tasks ?? []).map(renderTaskCard)}
          </div>
        </TabsContent>

        <TabsContent value="today" className="mt-4">
          <div className="grid gap-4">
            {filterTasks(getTasksDueToday(tasks ?? [])).map(renderTaskCard)}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="mt-4">
          <div className="grid gap-4">
            {filterTasks(getUpcomingTasks(tasks ?? [])).map(renderTaskCard)}
          </div>
        </TabsContent>

        <TabsContent value="overdue" className="mt-4">
          <div className="grid gap-4">
            {filterTasks(getOverdueTasks(tasks ?? [])).map(renderTaskCard)}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-4">
          <div className="grid gap-4">
            {filterTasks(getCompletedTasks(tasks ?? [])).map(renderTaskCard)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
