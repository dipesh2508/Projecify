"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/useApi";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
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
  ClipboardList,
  Timer,
  GitPullRequest,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProjectPageSkeleton } from "@/components/projects/ProjectPageSkeleton";
import { Project, Task } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const statusConfig = {
  TODO: {
    label: "To Do",
    icon: <ClipboardList className="h-5 w-5 text-gray-500" />,
    color: "text-gray-700 dark:text-gray-300",
    gradient: "from-gray-600 to-slate-600",
  },
  IN_PROGRESS: {
    label: "In Progress",
    icon: <Timer className="h-5 w-5 text-blue-500" />,
    color: "text-blue-700 dark:text-blue-300",
    gradient: "from-blue-600 to-indigo-600",
  },
  IN_REVIEW: {
    label: "In Review",
    icon: <GitPullRequest className="h-5 w-5 text-yellow-500" />,
    color: "text-yellow-700 dark:text-yellow-300",
    gradient: "from-yellow-600 to-orange-600",
  },
  COMPLETED: {
    label: "Completed",
    icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
    color: "text-green-700 dark:text-green-300",
    gradient: "from-green-600 to-emerald-600",
  },
};

export default function ProjectPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const [taskId, setTaskId] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
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

  const { mutate: deleteTask, isLoading: isDeleting } = useApi(
    `/api/projects/${params.id}/tasks/${taskId}`,
    {
      method: "DELETE",
      enabled: false,
      onSuccess: () => {
        toast({
          title: "Deleted",
          description: "Task deleted successfully",
          className:
            "bg-red-100 dark:bg-slate-950 border-red-600 dark:border-red-800",
        });
        setShowDeleteDialog(false);
        router.refresh();
        setTimeout(() => {
          window.location.reload();
        }, 100);
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      },
    }
  );

  useEffect(() => {
    if (error) {
      router.push("/dashboard/projects");
    }
  }, [error, router]);

  if (isLoading || !project) {
    return <ProjectPageSkeleton />;
  }

  const handleDelete = () => {
    deleteTask();
  };

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Project Header */}
      <Card className="relative group overflow-hidden">
        <div className="absolute inset-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-500" />
        <div className="relative p-8">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {project.name}
                </h1>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    router.push(`/dashboard/projects/${project.id}/edit`)
                  }
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-2xl">
                {project.description || "No description available"}
              </p>
            </div>
            <ProjectStatusBadge status={project.status} className="text-sm" />
          </div>

          <div className="flex justify-between items-center mt-6">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Created: {new Date(project.createdAt).toLocaleDateString()}
                </span>
              </div>
              {project.dueDate && (
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Due: {new Date(project.dueDate).toLocaleDateString()}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {project.members.length} Members
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() =>
                  router.push(`/dashboard/team?projectId=${project.id}`)
                }
                className="flex items-center gap-2"
              >
                <Users className="h-5 w-5" />
                Manage Team
              </Button>
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
        </div>
      </Card>

      {/* Task Progress Bar */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Project Progress
        </h3>
        <Progress
          value={(() => {
            const totalTasks = project.tasks?.length || 0;
            const completedTasks =
              project.tasks?.filter((t) => t.status === "COMPLETED").length ||
              0;
            return totalTasks ? (completedTasks / totalTasks) * 100 : 0;
          })()}
          className="h-2"
        />
        <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {project.tasks?.filter((t) => t.status === "COMPLETED").length} of{" "}
          {project.tasks?.length} tasks completed
        </div>
      </Card>

      {/* Task Progress */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.values(TaskStatus).map((status) => {
          const tasksInStatus =
            project.tasks?.filter((t) => t.status === status) || [];
          return (
            <Card key={status} className="relative group overflow-hidden">
              <div className="absolute inset-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl" />
              <div
                className={`absolute inset-0 bg-gradient-to-br ${statusConfig[status].gradient} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-500`}
              />
              <div className="relative p-6">
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
                      className="group bg-gray-50 dark:bg-gray-800 p-4 rounded-lg hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div
                          onClick={() =>
                            router.push(
                              `/dashboard/projects/${params.id}/tasks/${task.id}`
                            )
                          }
                          className="flex-1 cursor-pointer"
                        >
                          <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {task.title}
                          </h4>
                          {task.dueDate && (
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-2">
                              <Clock className="h-4 w-4" />
                              {new Date(task.dueDate).toLocaleDateString()}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col items-end gap-2">
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
                                  router.push(
                                    `/dashboard/projects/${params.id}/tasks/${task.id}/edit`
                                  )
                                }
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <Dialog
                                open={showDeleteDialog}
                                onOpenChange={setShowDeleteDialog}
                              >
                                <DialogTrigger asChild>
                                  <DropdownMenuItem
                                    className="text-red-600"
                                    onSelect={(e) => {
                                      e.preventDefault();
                                      setTaskId(task.id);
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Are you sure?</DialogTitle>
                                    <DialogDescription>
                                      This action cannot be undone. This will
                                      permanently delete the task.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <DialogFooter>
                                    <Button
                                      variant="outline"
                                      onClick={() => setShowDeleteDialog(false)}
                                      disabled={isDeleting}
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      variant="destructive"
                                      onClick={handleDelete}
                                      disabled={isDeleting}
                                    >
                                      {isDeleting ? "Deleting..." : "Delete"}
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
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
            </Card>
          );
        })}
      </div>
    </MotionDiv>
  );
}
