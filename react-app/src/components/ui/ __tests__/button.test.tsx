import { render, screen } from "@testing-library/react";
import { Button } from "../button";

describe("Button", () => {
  it("should render with default variant", () => {
    render(<Button>Click me</Button>);
    const btn = screen.getByRole("button", { name: /click me/i });
    expect(btn).toBeInTheDocument();
  });

  it("should apply destructive variant", () => {
    render(<Button variant="destructive">Delete</Button>);
    const btn = screen.getByRole("button", { name: /delete/i });
    expect(btn.className).toContain("bg-destructive");
  });

  it("should render as child when asChild=true", () => {
    render(
      <Button asChild>
        <a href="/home">Go</a>
      </Button>
    );
    const link = screen.getByRole("link", { name: /go/i });
    expect(link).toBeInTheDocument();
  });
});
