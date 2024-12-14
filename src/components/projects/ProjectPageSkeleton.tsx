import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProjectPageSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <Card className="p-8">
        <div className="flex justify-between items-start">
          <div className="space-y-4">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96" />
          </div>
          <Skeleton className="h-6 w-24" />
        </div>
        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center gap-6">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-32" />
          </div>
          <Skeleton className="h-9 w-32" />
        </div>
      </Card>

      {/* Progress Bar Skeleton */}
      <Card className="p-6">
        <Skeleton className="h-6 w-48 mb-4" />
        <Skeleton className="h-2 w-full" />
        <Skeleton className="h-4 w-32 mt-2" />
      </Card>

      {/* Task Columns Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, index) => (
          <Card key={index} className="p-6">
            <div className="flex justify-between items-center mb-4">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-5 w-8" />
            </div>
            <div className="space-y-4">
              {[...Array(3)].map((_, taskIndex) => (
                <div
                  key={taskIndex}
                  className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
                >
                  <Skeleton className="h-5 w-full mb-2" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}