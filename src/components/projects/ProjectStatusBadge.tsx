import { Badge } from "@/components/ui/badge"
import { ProjectStatus } from "@prisma/client"

const statusConfig = {
  NOT_STARTED: { label: "Not Started", variant: "secondary" },
  IN_PROGRESS: { label: "In Progress", variant: "default" },
  COMPLETED: { label: "Completed", variant: "success" },
  ON_HOLD: { label: "On Hold", variant: "warning" },
} as const

interface ProjectStatusBadgeProps {
  status: ProjectStatus;
  className?: string;
}

export function ProjectStatusBadge({ status, className }: ProjectStatusBadgeProps) {
  const config = statusConfig[status]
  
  return (
    <Badge variant={config.variant as any} className={className}>
      {config.label}
    </Badge>
  )
} 