interface BackgroundGridProps {
    className?: string
  }
  
  export function BackgroundGrid({ className = "" }: BackgroundGridProps) {
    return (
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 -z-20">
          <div className={`w-full h-full bg-grid-white/[0.05] bg-grid ${className}`} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/80 to-black -z-10" />
      </div>
    )
  }