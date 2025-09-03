import { ScrollArea } from "@/components/ui/scroll-area";
import { useUserData } from "@/hooks/use-user-data";

import { Header } from "./components/header";
import { WidgetSkeleton } from "./components/widget-skeleton";
import { ErrorState } from "./components/error-state";

export default function App() {
  const { user, posts, loading, error } = useUserData();

  return (
    <div className="md:w-[320px] md:h-[600px] w-screen h-screen flex flex-col bg-background text-foreground border border-border md:rounded-md rounded-none overflow-hidden">
      {!loading && !error && <Header user={user} />}

      <div className="flex-1 overflow-hidden">
        {loading && <WidgetSkeleton />}

        {error && (
          <ErrorState
            message={error}
            onRetry={() => window.location.reload()}
          />
        )}

        {!loading && !error && posts.length > 0 && (
          <ScrollArea className="h-full overflow-x-hidden p-4">
            <div className="space-y-3 w-full">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="p-3 border rounded-md bg-card shadow-sm w-full"
                >
                  <h4 className="font-semibold text-sm mb-1 break-words">
                    {post.title}
                  </h4>
                  <p className="text-xs text-muted-foreground break-words">
                    {post.body}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
}
