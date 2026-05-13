import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MobileNav } from "@/components/layout/mobile-nav";

describe("MobileNav", () => {
  const user = userEvent.setup();

  afterEach(() => {
    document.body.style.overflow = "";
  });

  it("does not render when closed", () => {
    render(<MobileNav isOpen={false} onClose={jest.fn()} currentPath="/" />);
    expect(screen.queryByLabelText(/close menu/i)).not.toBeInTheDocument();
  });

  it("renders navigation links when open", () => {
    render(<MobileNav isOpen={true} onClose={jest.fn()} currentPath="/" />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Gallery")).toBeInTheDocument();
    expect(screen.getByText("Blog")).toBeInTheDocument();
    expect(screen.getByText("Shop")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });

  it("highlights active link", () => {
    render(<MobileNav isOpen={true} onClose={jest.fn()} currentPath="#blog" />);
    const blogLink = screen.getByText("Blog").closest("a");
    expect(blogLink).toHaveClass("bg-primary/10", "text-primary");
  });

  it("locks body scroll when open", () => {
    expect(document.body.style.overflow).toBe("");
    render(<MobileNav isOpen={true} onClose={jest.fn()} currentPath="/" />);
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("unlocks body scroll when unmounted", () => {
    const { unmount } = render(
      <MobileNav isOpen={true} onClose={jest.fn()} currentPath="/" />
    );
    expect(document.body.style.overflow).toBe("hidden");
    unmount();
    expect(document.body.style.overflow).toBe("");
  });

  it("calls onClose when Close button is clicked", async () => {
    const onClose = jest.fn();
    render(<MobileNav isOpen={true} onClose={onClose} currentPath="/" />);

    await user.click(screen.getByLabelText(/close menu/i));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when a nav link is clicked", async () => {
    const onClose = jest.fn();
    render(<MobileNav isOpen={true} onClose={onClose} currentPath="/" />);

    await user.click(screen.getByText("Gallery"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
