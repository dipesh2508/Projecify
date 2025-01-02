export function TasksPageSkeleton() {
    return (
      <div className="flex flex-col gap-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded mb-2" />
            <div className="h-4 w-64 bg-gray-200 dark:bg-gray-800 rounded" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-9 w-32 bg-gray-200 dark:bg-gray-800 rounded" />
            <div className="h-9 w-44 bg-gray-200 dark:bg-gray-800 rounded" />
            <div className="h-9 w-44 bg-gray-200 dark:bg-gray-800 rounded" />
          </div>
        </div>
  
        <div className="space-y-6">
          <div className="h-10 w-96 bg-gray-200 dark:bg-gray-800 rounded" />
          <div className="grid gap-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    )
  }