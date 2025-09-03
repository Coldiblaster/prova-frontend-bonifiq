import { env } from "@/lib/env";
import { http } from "./http";

export interface Post {
  id: number;
  title: string;
  body: string;
}

export function fetchPosts(userId: number) {
  return http<Post[]>(`${env.VITE_API_BASE_URL}/posts?userId=${userId}`);
}
