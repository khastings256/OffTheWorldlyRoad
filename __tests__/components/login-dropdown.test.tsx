import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginDropdown } from "@/components/layout/login-dropdown";

describe("LoginDropdown", () => {
  const user = userEvent.setup();

  it("renders Sign In button initially", () => {
    render(<LoginDropdown />);
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  it("opens dropdown when Sign In is clicked", async () => {
    render(<LoginDropdown />);
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    // Form submit button is the second "Sign In" button
    expect(
      screen.getAllByRole("button", { name: /^sign in$/i })[1]
    ).toBeInTheDocument();
  });

  it("allows typing email and password", async () => {
    render(<LoginDropdown />);
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, "kenneth@offtheworldlyroad.com");
    await user.type(passwordInput, "password123");

    expect(emailInput).toHaveValue("kenneth@offtheworldlyroad.com");
    expect(passwordInput).toHaveValue("password123");
  });

  it("simulates login and shows user state", async () => {
    render(<LoginDropdown />);
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    await user.type(screen.getByLabelText(/email/i), "test@example.com");
    await user.type(screen.getByLabelText(/password/i), "secret");
    await user.click(
      screen.getAllByRole("button", { name: /^sign in$/i })[1]
    );

    await waitFor(
      () => {
        expect(screen.getByText("Kenneth")).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    expect(screen.queryByLabelText(/email/i)).not.toBeInTheDocument();
  });

  it("closes dropdown when clicking outside", async () => {
    render(
      <div>
        <LoginDropdown />
        <button data-testid="outside">Outside</button>
      </div>
    );

    await user.click(screen.getByRole("button", { name: /sign in/i }));
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();

    await user.click(screen.getByTestId("outside"));
    await waitFor(() => {
      expect(screen.queryByLabelText(/email/i)).not.toBeInTheDocument();
    });
  });

  it("logs out and returns to Sign In state", async () => {
    render(<LoginDropdown />);
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    await user.type(screen.getByLabelText(/email/i), "test@example.com");
    await user.type(screen.getByLabelText(/password/i), "secret");
    await user.click(
      screen.getAllByRole("button", { name: /^sign in$/i })[1]
    );

    await waitFor(
      () => {
        expect(screen.getByText("Kenneth")).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    await user.click(screen.getByText("Kenneth"));
    await user.click(screen.getByRole("button", { name: /sign out/i }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
    });
  });
});
