import { render, screen } from "@testing-library/react";
import { ScrollArea } from "../scroll-area";

describe("ScrollArea", () => {
  it("should render children inside viewport", () => {
    render(
      <ScrollArea>
        <p>Scrollable content</p>
      </ScrollArea>
    );

    expect(screen.getByText("Scrollable content")).toBeInTheDocument();
    expect(screen.getByTestId("scroll-area-viewport")).toBeInTheDocument();
  });
});
