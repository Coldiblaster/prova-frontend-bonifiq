import { env } from "@/lib/env";
import { http } from "./http";

export interface User {
  id: number;
  name: string;
  email: string;
}

export function fetchUser(userId: number) {
  return http<User>(`${env.VITE_API_BASE_URL}/users/${userId}`);
}
