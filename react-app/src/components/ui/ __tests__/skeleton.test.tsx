import { render, screen } from "@testing-library/react";
import { Skeleton } from "../skeleton";

describe("Skeleton", () => {
  it("should render skeleton element", () => {
    render(<Skeleton className="h-4 w-20" />);
    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });

  it("should apply custom classes", () => {
    render(<Skeleton className="h-10" />);
    expect(screen.getByTestId("skeleton").className).toContain("h-10");
  });
});
