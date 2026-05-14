import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PhotoCard } from "@/components/cards/PhotoCard";
import type { PhotoItem } from "@/lib/dummy-data";

const mockPhoto: PhotoItem = {
  id: "photo-test",
  type: "photo",
  src: "https://picsum.photos/seed/test/800/600",
  alt: "Test photo alt text",
  width: 800,
  height: 600,
};

describe("PhotoCard", () => {
  const user = userEvent.setup();

  it("renders image with correct alt text", () => {
    render(<PhotoCard photo={mockPhoto} />);
    const img = screen.getByAltText("Test photo alt text");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", mockPhoto.src);
  });

  it("calls onClick when clicked", async () => {
    const handleClick = jest.fn();
    render(<PhotoCard photo={mockPhoto} onClick={handleClick} />);

    const card = screen.getByRole("button", {
      name: /view photo: test photo alt text/i,
    });
    await user.click(card);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("calls onClick when Enter is pressed", async () => {
    const handleClick = jest.fn();
    render(<PhotoCard photo={mockPhoto} onClick={handleClick} />);

    const card = screen.getByRole("button", {
      name: /view photo: test photo alt text/i,
    });
    card.focus();
    await user.keyboard("{Enter}");
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("calls onClick when Space is pressed", async () => {
    const handleClick = jest.fn();
    render(<PhotoCard photo={mockPhoto} onClick={handleClick} />);

    const card = screen.getByRole("button", {
      name: /view photo: test photo alt text/i,
    });
    card.focus();
    await user.keyboard(" ");
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("has correct accessibility attributes", () => {
    render(<PhotoCard photo={mockPhoto} />);
    const card = screen.getByRole("button", {
      name: /view photo: test photo alt text/i,
    });
    expect(card).toHaveAttribute("tabIndex", "0");
    expect(card).toHaveAttribute(
      "aria-label",
      "View photo: Test photo alt text"
    );
  });

  it("does not throw if onClick is undefined", async () => {
    render(<PhotoCard photo={mockPhoto} />);
    const card = screen.getByRole("button", {
      name: /view photo: test photo alt text/i,
    });
    await user.click(card);
    await user.keyboard("{Enter}");
    // Should not throw
    expect(card).toBeInTheDocument();
  });
});
