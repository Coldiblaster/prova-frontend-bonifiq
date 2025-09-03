import { render, screen } from "@testing-library/react";
import { PostsList } from "../posts-list";

describe("PostsList", () => {
  it("should render all posts with title and body", () => {
    const posts = [
      { id: 1, title: "Post 1", body: "Body 1" },
      { id: 2, title: "Post 2", body: "Body 2" },
    ];

    render(<PostsList posts={posts} />);

    expect(screen.getByText("Post 1")).toBeInTheDocument();
    expect(screen.getByText("Body 2")).toBeInTheDocument();
  });

  it("should render inside a scroll area", () => {
    const posts = [{ id: 1, title: "Post", body: "Body" }];

    render(<PostsList posts={posts} />);

    expect(screen.getByTestId("scroll-area-viewport")).toBeInTheDocument();
  });
});
