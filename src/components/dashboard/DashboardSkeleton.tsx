import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      {/* Project Statistics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-8">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="relative p-6">
            <Skeleton className="h-4 w-24 mb-2" /> {/* Title */}
            <Skeleton className="h-8 w-16" /> {/* Value */}
          </Card>
        ))}
      </div>

      {/* Alerts and Deadlines */}
      <div className="grid gap-4 md:grid-cols-2">
        {[1, 2].map((i) => (
          <Card key={i} className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Skeleton className="h-5 w-5 rounded-full" /> {/* Icon */}
              <Skeleton className="h-6 w-32" /> {/* Title */}
            </div>
            <Skeleton className="h-8 w-16 mb-2" /> {/* Value */}
            <Skeleton className="h-4 w-48" /> {/* Description */}
          </Card>
        ))}
      </div>

      {/* Recent Projects */}
      <div className="space-y-4">
        <Skeleton className="h-7 w-40" /> {/* Section title */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-6">
              <Skeleton className="h-6 w-3/4 mb-2" /> {/* Project name */}
              <Skeleton className="h-4 w-full mb-2" /> {/* Description line 1 */}
              <Skeleton className="h-4 w-2/3 mb-4" /> {/* Description line 2 */}
              <div className="flex justify-between items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((j) => (
                    <Skeleton key={j} className="h-8 w-8 rounded-full border-2 border-background" />
                  ))}
                </div>
                <Skeleton className="h-4 w-16" /> {/* Tasks count */}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}