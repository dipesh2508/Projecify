import { Badge } from "@/components/ui/badge"

type TaskStatus = "COMPLETED" | "IN_PROGRESS" | "IN_REVIEW" | "TODO"

const statusConfig = {
  TODO: { label: "To Do", className: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100" },
  IN_PROGRESS: { label: "In Progress", className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100" },
  IN_REVIEW: { label: "In Review", className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100" },
  COMPLETED: { label: "Completed", className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" },
}

export function TaskStatusBadge({ status }: { status: TaskStatus }) {
  return (
    <Badge variant="secondary" className={statusConfig[status].className}>
      {statusConfig[status].label}
    </Badge>
  )
}