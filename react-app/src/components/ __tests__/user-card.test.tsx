import { render, screen } from "@testing-library/react";
import { UserCard } from "../user-card";

describe("UserCard", () => {
  it("should render user name and email", () => {
    render(<UserCard name="Jane Doe" email="jane@example.com" />);

    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("jane@example.com")).toBeInTheDocument();
  });
});
