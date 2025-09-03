import { ScrollArea } from "@/components/ui/scroll-area";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostsListProps {
  posts: Post[];
}

export function PostsList({ posts }: PostsListProps) {
  return (
    <ScrollArea className="h-[400px] rounded-md border p-4">
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="border-b pb-2">
            <h4 className="font-medium">{post.title}</h4>
            <p className="text-sm text-muted-foreground">{post.body}</p>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
