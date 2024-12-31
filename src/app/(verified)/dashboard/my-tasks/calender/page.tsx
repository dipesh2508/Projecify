"use client";

import { useSession } from "next-auth/react";
import { useApi } from "@/hooks/useApi";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { CalendarPageSkeleton } from "@/components/tasks/CalenderPageSkeleton";
import { Task, calendarCustomStyles } from "@/components/tasks";

export default function CalendarPage() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const router = useRouter();

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

  if (isLoading || !session?.user) {
    return <CalendarPageSkeleton />;
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

  const calendarEvents = tasks?.map((task) => ({
    id: task.id,
    title: task.title,
    start: task.dueDate,
    allDay: true,
    classNames: [
      task.status === "COMPLETED" ? "completed-task" : "",
      `priority-${task.priority.toLowerCase()}`,
    ],
    extendedProps: {
      projectId: task.project.id,
      taskId: task.id,
    },
  }));

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col items-start gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/dashboard/my-tasks")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to List View
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Calendar View</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              View your tasks in calendar format
            </p>
          </div>
        </div>
      </div>

      <Card className="p-4">
        <style jsx global>
          {`
            ${Object.entries(calendarCustomStyles)
              .map(
                ([selector, styles]) =>
                  `${selector} { ${Object.entries(styles)
                    .map(([prop, value]) => `${prop}: ${value};`)
                    .join(" ")} }`
              )
              .join("\n")}
          `}
        </style>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={calendarEvents}
          eventClick={(info) => {
            const { projectId, taskId } = info.event.extendedProps;
            router.push(`/dashboard/projects/${projectId}/tasks/${taskId}`);
          }}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,dayGridWeek",
          }}
          buttonText={{
            today: "Today",
            month: "Month",
            week: "Week",
          }}
          dayMaxEvents={3}
          eventTimeFormat={{
            hour: "numeric",
            minute: "2-digit",
            meridiem: "short",
          }}
          eventDisplay="block"
          eventClassNames="rounded-md shadow-sm"
        />
      </Card>
    </div>
  );
}
