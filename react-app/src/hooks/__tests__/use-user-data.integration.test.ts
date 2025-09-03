import { renderHook, act, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { useUserData } from "../use-user-data";
import * as userService from "@/services/user.service";
import * as postService from "@/services/post.service";

describe("useUserData integration with usePostMessage", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should load user and posts after receiving postMessage", async () => {
    vi.spyOn(userService, "fetchUser").mockResolvedValueOnce({
      id: 42,
      name: "Jane Doe",
      email: "jane@example.com",
    });

    vi.spyOn(postService, "fetchPosts").mockResolvedValueOnce([
      { id: 1, title: "Post 1", body: "Content 1" },
      { id: 2, title: "Post 2", body: "Content 2" },
    ]);

    const { result } = renderHook(() => useUserData());

    act(() => {
      window.postMessage({ userId: 42 }, "*");
    });

    await waitFor(() => {
      expect(result.current.user?.name).toBe("Jane Doe");
      expect(result.current.posts).toHaveLength(2);
      expect(result.current.error).toBeNull();
      expect(result.current.loading).toBe(false);
    });
  });

  it("should set error state when fetchUser fails", async () => {
    vi.spyOn(userService, "fetchUser").mockRejectedValueOnce(
      new Error("Usuário não encontrado")
    );
    vi.spyOn(postService, "fetchPosts").mockResolvedValueOnce([]);

    const { result } = renderHook(() => useUserData());

    act(() => {
      window.postMessage({ userId: 999 }, "*");
    });

    await waitFor(() => {
      expect(result.current.error).toContain("Usuário não encontrado");
      expect(result.current.user).toBeNull();
      expect(result.current.posts).toHaveLength(0);
      expect(result.current.loading).toBe(false);
    });
  });
});
