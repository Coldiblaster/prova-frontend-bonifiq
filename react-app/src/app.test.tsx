import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import * as userService from "@/services/user.service";
import * as postService from "@/services/post.service";

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

    // espera aparecer os blocos de skeleton
    expect(await screen.findByTestId("skeleton-header")).toBeInTheDocument();
    expect(await screen.findAllByTestId("skeleton-post")).toHaveLength(4);
  });

  it("should render user and posts on success", async () => {
    vi.spyOn(userService, "fetchUser").mockResolvedValue({
      id: 1,
      name: "John Doe",
      email: "john@example.com",
    });
    vi.spyOn(postService, "fetchPosts").mockResolvedValue([
      { id: 1, title: "Post 1", body: "Body 1" },
      { id: 2, title: "Post 2", body: "Body 2" },
    ]);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("john@example.com")).toBeInTheDocument();
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

    await waitFor(() => {
      // a mensagem renderizada é a amigável do ErrorState
      expect(
        screen.getByText("Usuário não encontrado. Verifique o ID informado.")
      ).toBeInTheDocument();

      expect(
        screen.getByRole("button", { name: /tentar novamente/i })
      ).toBeInTheDocument();
    });
  });
});
