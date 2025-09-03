import { render, screen } from "@testing-library/react";
import { Header } from "../header";

describe("Header", () => {
  it("should render user data", () => {
    render(
      <Header user={{ id: 1, name: "Jane Doe", email: "jane@example.com" }} />
    );

    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("jane@example.com")).toBeInTheDocument();
  });

  it("should show user initial in avatar", () => {
    render(
      <Header user={{ id: 1, name: "Jane Doe", email: "jane@example.com" }} />
    );

    expect(screen.getByText("J")).toBeInTheDocument();
  });

  it("should render close button", () => {
    render(
      <Header user={{ id: 1, name: "Jane Doe", email: "jane@example.com" }} />
    );

    expect(screen.getByRole("button", { name: "✕" })).toBeInTheDocument();
  });
});
