"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/useApi";
import { useToast } from "@/hooks/use-toast";
import Loader from "@/components/shared/Loader";
import MotionDiv from "@/components/animations/MotionDiv";
import { ProjectStatusBadge } from "@/components/projects/ProjectStatusBadge";
import { TaskStatus, Priority, ProjectStatus } from "@prisma/client";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Users,
  PlusCircle,
  Edit,
  Trash2,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ClipboardList,
  Timer,
  GitPullRequest,
  CheckCircle2,
} from "lucide-react";

const statusConfig = {
  TODO: {
    label: "To Do",
    icon: <ClipboardList className="h-5 w-5 text-gray-500" />,
    color: "text-gray-700 dark:text-gray-300",
  },
  IN_PROGRESS: {
    label: "In Progress",
    icon: <Timer className="h-5 w-5 text-blue-500" />,
    color: "text-blue-700 dark:text-blue-300",
  },
  IN_REVIEW: {
    label: "In Review",
    icon: <GitPullRequest className="h-5 w-5 text-yellow-500" />,
    color: "text-yellow-700 dark:text-yellow-300",
  },
  COMPLETED: {
    label: "Completed",
    icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
    color: "text-green-700 dark:text-green-300",
  },
};

type Task = {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: Priority;
  dueDate: Date | null;
};

type Project = {
  id: string;
  name: string;
  description: string | null;
  status: ProjectStatus;
  createdAt: Date;
  updatedAt: Date;
  dueDate: Date | null;
  tasks: Task[];
  members: { id: string; name: string }[];
};

export default function ProjectPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { toast } = useToast();

  const {
    data: project,
    error,
    isLoading,
  } = useApi<Project>(`/api/projects/${params.id}`, {
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error loading project",
        description:
          "Please try again later or contact support if the problem persists.",
      });
      console.error("Error fetching project:", error);
    },
  });

  useEffect(() => {
    if (error) {
      router.push("/dashboard/projects");
    }
  }, [error, router]);

  if (isLoading) {
    return <Loader />;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto p-6 space-y-8"
    >
      {/* Project Header */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl p-8 shadow-lg">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                {project.name}
              </h1>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  router.push(`/dashboard/projects/${project.id}/edit`)
                }
                className="hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-2xl">
              {project.description || "No description available"}
            </p>
          </div>
          <ProjectStatusBadge status={project.status} className="text-sm" />
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Created: {new Date(project.createdAt).toLocaleDateString()}
              </span>
            </div>
            {project.dueDate && (
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Due: {new Date(project.dueDate).toLocaleDateString()}
                </span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {project.members.length} Members
              </span>
            </div>
          </div>
          <Button
            onClick={() =>
              router.push(`/dashboard/projects/${project.id}/tasks/new`)
            }
            className="flex items-center gap-2"
          >
            <PlusCircle className="h-5 w-5" />
            Add Task
          </Button>
        </div>
      </div>

      {/* Task Progress Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
        <h3 className="text-lg font-semibold mb-4">Project Progress</h3>
        <Progress
          value={
            (project.tasks.filter((t) => t.status === "COMPLETED").length /
              project.tasks.length) *
            100
          }
          className="h-2 bg-gray-200 dark:bg-gray-700"
        />
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          {project.tasks.filter((t) => t.status === "COMPLETED").length} of{" "}
          {project.tasks.length} tasks completed
        </div>
      </div>

      {/* Task Progress */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.values(TaskStatus).map((status) => {
          const tasksInStatus = project.tasks.filter(
            (t) => t.status === status
          );
          return (
            <div
              key={status}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  {statusConfig[status].icon}
                  <h3
                    className={`text-lg font-semibold ${statusConfig[status].color}`}
                  >
                    {statusConfig[status].label}
                  </h3>
                </div>
                <Badge variant="secondary">{tasksInStatus.length}</Badge>
              </div>
              <div className="space-y-4">
                {tasksInStatus.map((task) => (
                  <div
                    key={task.id}
                    className="group bg-gray-50 dark:bg-gray-700 p-4 rounded-lg hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div
                        onClick={() =>
                          router.push(`/dashboard/tasks/${task.id}`)
                        }
                        className="flex-1 cursor-pointer"
                      >
                        <h4 className="font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {task.title}
                        </h4>
                        {task.dueDate && (
                          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-2">
                            <Clock className="h-4 w-4" />
                            {new Date(task.dueDate).toLocaleDateString()}
                          </div>
                        )}
                      </div>

                      <div className="flex items-start gap-2">
                        <Badge
                          variant={
                            task.priority === Priority.URGENT
                              ? "destructive"
                              : task.priority === Priority.HIGH
                              ? "destructive"
                              : task.priority === Priority.MEDIUM
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {task.priority}
                        </Badge>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() =>
                                router.push(`/dashboard/tasks/${task.id}/edit`)
                              }
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                ))}
                {tasksInStatus.length === 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                    No tasks in {status.toLowerCase()}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </MotionDiv>
  );
}
