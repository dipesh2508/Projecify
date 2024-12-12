import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ProjectsListSkeleton() {
  return (
    <>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Card key={i} className="space-y-4">
          <CardHeader>
            <Skeleton className="h-6 w-3/4" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex items-center gap-2 mt-4">
              <Skeleton className="h-6 w-6 rounded-full" /> {/* Avatar skeleton */}
              <Skeleton className="h-4 w-24" /> {/* Name skeleton */}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Skeleton className="h-4 w-20" /> {/* Tasks count skeleton */}
            <Skeleton className="h-4 w-32" /> {/* Due date skeleton */}
          </CardFooter>
        </Card>
      ))}
    </>
  )
}