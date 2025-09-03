import { act, render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import App from "./App";

import * as userService from "@/services/user.service";
import * as postService from "@/services/post.service";

import { mockUser } from "@/__mocks__/user.mock";
import { mockPosts } from "@/__mocks__/posts.mock";

describe("App", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should render skeleton when loading", async () => {
    vi.spyOn(userService, "fetchUser").mockImplementation(
      () => new Promise(() => {}) // nunca resolve
    );
    vi.spyOn(postService, "fetchPosts").mockResolvedValue([]);

    render(<App />);

    act(() => {
      window.dispatchEvent(
        new MessageEvent("message", { data: { userId: 1 } })
      );
    });

    expect(await screen.findByTestId("skeleton-header")).toBeInTheDocument();
    expect(await screen.findAllByTestId("skeleton-post")).toHaveLength(4);
  });

  it("should render user and posts on success", async () => {
    vi.spyOn(userService, "fetchUser").mockResolvedValue(mockUser);
    vi.spyOn(postService, "fetchPosts").mockResolvedValue(mockPosts);

    render(<App />);

    act(() => {
      window.dispatchEvent(
        new MessageEvent("message", { data: { userId: 1 } })
      );
    });

    await waitFor(() => {
      expect(screen.getByText(mockUser.name)).toBeInTheDocument();
      expect(screen.getByText(mockUser.email)).toBeInTheDocument();
      expect(screen.getByText("Post 1")).toBeInTheDocument();
      expect(screen.getByText("Body 2")).toBeInTheDocument();
    });
  });

  it("should render friendly error message when user not found", async () => {
    vi.spyOn(userService, "fetchUser").mockRejectedValue(
      new Error("Usuário não encontrado")
    );
    vi.spyOn(postService, "fetchPosts").mockResolvedValue([]);

    render(<App />);

    act(() => {
      window.dispatchEvent(
        new MessageEvent("message", { data: { userId: 999 } })
      );
    });

    await waitFor(() => {
      expect(
        screen.getByText("Usuário não encontrado. Verifique o ID informado.")
      ).toBeInTheDocument();

      expect(
        screen.getByRole("button", { name: /tentar novamente/i })
      ).toBeInTheDocument();
    });
  });
});
