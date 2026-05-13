import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "@/components/layout/header";

describe("Header", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
    document.documentElement.style.cssText = "";
  });

  it("renders logo and OTWR wordmark", () => {
    render(<Header />);
    expect(screen.getByAltText(/off the worldly road/i)).toBeInTheDocument();
    expect(screen.getByText("OTWR")).toBeInTheDocument();
  });

  it("renders desktop navigation links", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: /^home$/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /gallery/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /blog/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /shop/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /about/i })).toBeInTheDocument();
  });

  it("marks Home as active by default", () => {
    render(<Header />);
    const homeLink = screen.getByRole("link", { name: /^home$/i });
    expect(homeLink).toHaveClass("text-primary");
  });

  it("switches active state on nav click", async () => {
    render(<Header />);

    const blogLink = screen.getByRole("link", { name: /blog/i });
    await user.click(blogLink);

    expect(blogLink).toHaveClass("text-primary");
    expect(screen.getByRole("link", { name: /^home$/i })).not.toHaveClass(
      "text-primary"
    );
  });

  it("renders theme toggle and login on desktop", () => {
    render(<Header />);
    expect(screen.getByRole("button", { name: /canyon/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /pine/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  it("renders mobile hamburger button", () => {
    render(<Header />);
    expect(screen.getByLabelText(/open menu/i)).toBeInTheDocument();
  });

  it("opens mobile nav when hamburger is clicked", async () => {
    render(<Header />);
    await user.click(screen.getByLabelText(/open menu/i));
    expect(screen.getByLabelText(/close menu/i)).toBeInTheDocument();
  });
});
