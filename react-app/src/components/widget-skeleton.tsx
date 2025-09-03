import { Skeleton } from "@/components/ui/skeleton";

export function WidgetSkeleton() {
  return (
    <div className="flex flex-col" data-testid="skeleton">
      <div
        className="flex items-center gap-3 px-2 py-4 border-b bg-muted/30"
        data-testid="skeleton-header"
      >
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex flex-col gap-1 flex-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>

      <div
        className="flex-1 p-4 space-y-3 overflow-hidden"
        data-testid="skeleton-posts"
      >
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="p-3 border rounded-md bg-card shadow-sm"
            data-testid="skeleton-post"
          >
            <Skeleton className="h-4 w-40 mb-2" />
            <Skeleton className="h-3 w-full mb-1" />
            <Skeleton className="h-3 w-full mb-1" />
            <Skeleton className="h-3 w-full mb-1" />
            <Skeleton className="h-3 w-5/6" />
          </div>
        ))}
      </div>
    </div>
  );
}
