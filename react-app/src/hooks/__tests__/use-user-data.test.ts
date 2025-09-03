import { renderHook, act, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { useUserData } from "../use-user-data";
import * as userService from "@/services/user.service";
import * as postService from "@/services/post.service";

describe("useUserData", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should fetch and set user and posts successfully", async () => {
    vi.spyOn(userService, "fetchUser").mockResolvedValueOnce({
      id: 1,
      name: "John Doe",
      email: "john@example.com",
    });

    vi.spyOn(postService, "fetchPosts").mockResolvedValueOnce([
      { id: 1, title: "Post 1", body: "Body 1" },
      { id: 2, title: "Post 2", body: "Body 2" },
    ]);

    const { result } = renderHook(() => useUserData());

    act(() => {
      window.postMessage({ userId: 1 }, "*");
    });

    await waitFor(() => {
      expect(result.current.user?.name).toBe("John Doe");
      expect(result.current.posts).toHaveLength(2);
      expect(result.current.error).toBeNull();
    });
  });

  it("should set error if user is not found", async () => {
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
    });
  });
});
