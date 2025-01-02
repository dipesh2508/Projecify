import { Badge } from "@/components/ui/badge"

type Priority = "HIGH" | "MEDIUM" | "LOW" | "URGENT"

const priorityConfig = {
  URGENT: { label: "Urgent", className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100" },
  HIGH: { label: "High", className: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100" },
  MEDIUM: { label: "Medium", className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100" },
  LOW: { label: "Low", className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" },
}

export function TaskPriorityBadge({ priority }: { priority: Priority }) {
  return (
    <Badge variant="secondary" className={priorityConfig[priority].className}>
      {priorityConfig[priority].label}
    </Badge>
  )
}