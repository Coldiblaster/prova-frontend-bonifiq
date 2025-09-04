import { render, screen, within } from "@testing-library/react";
import { WidgetSkeleton } from "../widget-skeleton";

describe("WidgetSkeleton", () => {
  it("should render header skeleton with avatar and user info placeholders", () => {
    render(<WidgetSkeleton />);

    const header = screen.getByTestId("skeleton-header");
    expect(header).toBeInTheDocument();

    const skeletons = within(header).getAllByTestId("skeleton");
    expect(skeletons.length).toBeGreaterThanOrEqual(3);
  });

  it("should render exactly 4 post skeleton blocks", () => {
    render(<WidgetSkeleton />);

    const posts = screen.getAllByTestId("skeleton-post");
    expect(posts).toHaveLength(4);
  });

  it("should render multiple skeleton lines inside each post block", () => {
    render(<WidgetSkeleton />);

    const posts = screen.getAllByTestId("skeleton-post");
    posts.forEach((post) => {
      const skeletons = within(post).getAllByTestId("skeleton");
      expect(skeletons.length).toBeGreaterThan(1);
    });
  });
});
