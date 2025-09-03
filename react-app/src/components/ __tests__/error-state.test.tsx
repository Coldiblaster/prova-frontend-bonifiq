import { render, screen, fireEvent } from "@testing-library/react";
import { ErrorState } from "../error-state";

describe("ErrorState", () => {
  it("should render default error message", () => {
    render(<ErrorState message="Something went wrong" />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("should render friendly message for user not found", () => {
    render(<ErrorState message="Usuário não encontrado" />);
    expect(
      screen.getByText(/Usuário não encontrado. Verifique o ID/i)
    ).toBeInTheDocument();
  });

  it("should call onRetry when retry button is clicked", () => {
    const retry = vi.fn();
    render(<ErrorState message="Error" onRetry={retry} />);
    fireEvent.click(screen.getByRole("button", { name: /tentar novamente/i }));
    expect(retry).toHaveBeenCalled();
  });
});
