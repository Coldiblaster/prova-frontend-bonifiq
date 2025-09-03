import { useState, useCallback } from "react";
import { usePostMessage } from "./use-post-message";
import { fetchUser, type User } from "@/services/user.service";
import { fetchPosts, type Post } from "@/services/post.service";

interface WidgetMessage {
  userId?: number;
}

export function useUserData() {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (userId: number) => {
    try {
      setLoading(true);
      setError(null);

      const [userData, postsData] = await Promise.all([
        fetchUser(userId),
        fetchPosts(userId),
      ]);

      setUser(userData);
      setPosts(postsData);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }, []);

  usePostMessage<WidgetMessage>((data) => {
    if (data.userId) {
      fetchData(data.userId);
    }
  });

  return { user, posts, loading, error };
}
