import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginDropdown } from "@/components/layout/login-dropdown";
import { useSession, signIn, signOut } from "next-auth/react";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

const mockUseSession = useSession as jest.Mock;
const mockSignIn = signIn as jest.Mock;
const mockSignOut = signOut as jest.Mock;

describe("LoginDropdown", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders Sign In button when unauthenticated", () => {
    mockUseSession.mockReturnValue({ data: null, status: "unauthenticated" });
    render(<LoginDropdown />);
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  it("opens dropdown with OAuth buttons when Sign In is clicked", async () => {
    mockUseSession.mockReturnValue({ data: null, status: "unauthenticated" });
    render(<LoginDropdown />);
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(screen.getByRole("button", { name: /continue with github/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /continue with google/i })).toBeInTheDocument();
  });

  it("calls signIn with 'github' when GitHub button is clicked", async () => {
    mockUseSession.mockReturnValue({ data: null, status: "unauthenticated" });
    render(<LoginDropdown />);
    await user.click(screen.getByRole("button", { name: /sign in/i }));
    await user.click(screen.getByRole("button", { name: /continue with github/i }));

    expect(mockSignIn).toHaveBeenCalledWith("github");
  });

  it("calls signIn with 'google' when Google button is clicked", async () => {
    mockUseSession.mockReturnValue({ data: null, status: "unauthenticated" });
    render(<LoginDropdown />);
    await user.click(screen.getByRole("button", { name: /sign in/i }));
    await user.click(screen.getByRole("button", { name: /continue with google/i }));

    expect(mockSignIn).toHaveBeenCalledWith("google");
  });

  it("shows user avatar and name when authenticated", () => {
    mockUseSession.mockReturnValue({
      data: {
        user: {
          name: "Kenneth Hastings",
          email: "kenneth@offtheworldlyroad.com",
          image: "/images/logo.jpg",
        },
      },
      status: "authenticated",
    });
    render(<LoginDropdown />);

    expect(screen.getByText("Kenneth")).toBeInTheDocument();
  });

  it("opens user menu when avatar is clicked", async () => {
    mockUseSession.mockReturnValue({
      data: {
        user: {
          name: "Kenneth Hastings",
          email: "kenneth@offtheworldlyroad.com",
          image: "/images/logo.jpg",
        },
      },
      status: "authenticated",
    });
    render(<LoginDropdown />);
    await user.click(screen.getByText("Kenneth"));

    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Orders")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign out/i })).toBeInTheDocument();
  });

  it("closes dropdown when clicking outside", async () => {
    mockUseSession.mockReturnValue({ data: null, status: "unauthenticated" });
    render(
      <div>
        <LoginDropdown />
        <button data-testid="outside">Outside</button>
      </div>
    );

    await user.click(screen.getByRole("button", { name: /sign in/i }));
    expect(screen.getByRole("button", { name: /continue with github/i })).toBeInTheDocument();

    await user.click(screen.getByTestId("outside"));
    await waitFor(() => {
      expect(screen.queryByRole("button", { name: /continue with github/i })).not.toBeInTheDocument();
    });
  });

  it("calls signOut when Sign Out is clicked", async () => {
    mockUseSession.mockReturnValue({
      data: {
        user: {
          name: "Kenneth Hastings",
          email: "kenneth@offtheworldlyroad.com",
          image: "/images/logo.jpg",
        },
      },
      status: "authenticated",
    });
    render(<LoginDropdown />);
    await user.click(screen.getByText("Kenneth"));
    await user.click(screen.getByRole("button", { name: /sign out/i }));

    expect(mockSignOut).toHaveBeenCalled();
  });
});
