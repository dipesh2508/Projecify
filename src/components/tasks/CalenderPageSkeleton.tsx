export function CalendarPageSkeleton() {
    return (
      <div className="flex flex-col gap-6 p-6">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {/* Back button skeleton */}
            <div className="h-9 w-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
            <div>
              {/* Title skeleton */}
              <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded mb-2" />
              {/* Subtitle skeleton */}
              <div className="h-4 w-64 bg-gray-200 dark:bg-gray-800 rounded" />
            </div>
          </div>
        </div>
  
        {/* Calendar Skeleton */}
        <div className="border rounded-lg p-4">
          {/* Calendar Header */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2">
              {/* Navigation buttons */}
              <div className="h-9 w-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
              <div className="h-9 w-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
            </div>
            <div className="h-7 w-48 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
            <div className="h-9 w-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
          </div>
  
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Week days */}
            {[...Array(7)].map((_, i) => (
              <div
                key={`weekday-${i}`}
                className="h-8 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"
              />
            ))}
            
            {/* Calendar days */}
            {[...Array(35)].map((_, i) => (
              <div
                key={`day-${i}`}
                className="aspect-square bg-gray-100 dark:bg-gray-900 rounded p-2"
              >
                <div className="h-6 w-6 bg-gray-200 dark:bg-gray-800 rounded-full mb-2 animate-pulse" />
                {/* Event placeholders */}
                {i % 3 === 0 && (
                  <div className="h-5 w-4/5 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mt-1" />
                )}
                {i % 5 === 0 && (
                  <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mt-1" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }