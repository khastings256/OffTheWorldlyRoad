import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { ThemeProvider } from "@/components/theme/theme-provider";

describe("ThemeToggle", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    // Reset localStorage and document theme
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
    document.documentElement.style.cssText = "";
  });

  it("renders Canyon and Pine buttons", () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    expect(screen.getByRole("button", { name: /canyon/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /pine/i })).toBeInTheDocument();
  });

  it("marks Canyon as pressed by default", () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const canyonBtn = screen.getByRole("button", { name: /canyon/i });
    expect(canyonBtn).toHaveAttribute("aria-pressed", "true");

    const pineBtn = screen.getByRole("button", { name: /pine/i });
    expect(pineBtn).toHaveAttribute("aria-pressed", "false");
  });

  it("switches to Pine when clicked", async () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const pineBtn = screen.getByRole("button", { name: /pine/i });
    await user.click(pineBtn);

    expect(pineBtn).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: /canyon/i })).toHaveAttribute(
      "aria-pressed",
      "false"
    );
    expect(document.documentElement.getAttribute("data-theme")).toBe("pine");
  });

  it("switches back to Canyon from Pine", async () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    await user.click(screen.getByRole("button", { name: /pine/i }));
    await user.click(screen.getByRole("button", { name: /canyon/i }));

    expect(document.documentElement.getAttribute("data-theme")).toBe("canyon");
  });

  it("persists theme choice to localStorage", async () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    await user.click(screen.getByRole("button", { name: /pine/i }));
    expect(localStorage.getItem("otwr-theme")).toBe("pine");
  });
});
