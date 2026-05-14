import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Lightbox } from "@/components/lightbox/Lightbox";
import type { PhotoItem } from "@/lib/dummy-data";

const mockPhotos: PhotoItem[] = [
  {
    id: "photo-1",
    type: "photo",
    src: "https://picsum.photos/seed/1/800/600",
    alt: "First photo",
    width: 800,
    height: 600,
  },
  {
    id: "photo-2",
    type: "photo",
    src: "https://picsum.photos/seed/2/800/600",
    alt: "Second photo",
    width: 800,
    height: 600,
  },
  {
    id: "photo-3",
    type: "photo",
    src: "https://picsum.photos/seed/3/800/600",
    alt: "Third photo",
    width: 800,
    height: 600,
  },
];

describe("Lightbox", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    document.body.style.overflow = "";
  });

  afterEach(() => {
    document.body.style.overflow = "";
  });

  it("renders when isOpen=true", () => {
    render(
      <Lightbox
        photos={mockPhotos}
        currentIndex={0}
        isOpen={true}
        onClose={jest.fn()}
      />
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByAltText("First photo")).toBeInTheDocument();
  });

  it("does not render when isOpen=false", () => {
    render(
      <Lightbox
        photos={mockPhotos}
        currentIndex={0}
        isOpen={false}
        onClose={jest.fn()}
      />
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("calls onClose when Escape is pressed", async () => {
    const handleClose = jest.fn();
    render(
      <Lightbox
        photos={mockPhotos}
        currentIndex={0}
        isOpen={true}
        onClose={handleClose}
      />
    );

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    fireEvent.keyDown(document, { key: "Escape" });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when backdrop is clicked", async () => {
    const handleClose = jest.fn();
    const { container } = render(
      <Lightbox
        photos={mockPhotos}
        currentIndex={0}
        isOpen={true}
        onClose={handleClose}
      />
    );

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    const backdrop = container.querySelector(".bg-black\\/80");
    expect(backdrop).toBeInTheDocument();

    if (backdrop) {
      await user.click(backdrop);
    }
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("calls onNavigate with previous index when ArrowLeft is pressed", async () => {
    const handleNavigate = jest.fn();
    render(
      <Lightbox
        photos={mockPhotos}
        currentIndex={1}
        isOpen={true}
        onClose={jest.fn()}
        onNavigate={handleNavigate}
      />
    );

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    fireEvent.keyDown(document, { key: "ArrowLeft" });
    expect(handleNavigate).toHaveBeenCalledWith(0);
  });

  it("calls onNavigate with next index when ArrowRight is pressed", async () => {
    const handleNavigate = jest.fn();
    render(
      <Lightbox
        photos={mockPhotos}
        currentIndex={1}
        isOpen={true}
        onClose={jest.fn()}
        onNavigate={handleNavigate}
      />
    );

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    fireEvent.keyDown(document, { key: "ArrowRight" });
    expect(handleNavigate).toHaveBeenCalledWith(2);
  });

  it("wraps to last photo when ArrowLeft pressed at index 0", async () => {
    const handleNavigate = jest.fn();
    render(
      <Lightbox
        photos={mockPhotos}
        currentIndex={0}
        isOpen={true}
        onClose={jest.fn()}
        onNavigate={handleNavigate}
      />
    );

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    fireEvent.keyDown(document, { key: "ArrowLeft" });
    expect(handleNavigate).toHaveBeenCalledWith(2);
  });

  it("wraps to first photo when ArrowRight pressed at last index", async () => {
    const handleNavigate = jest.fn();
    render(
      <Lightbox
        photos={mockPhotos}
        currentIndex={2}
        isOpen={true}
        onClose={jest.fn()}
        onNavigate={handleNavigate}
      />
    );

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    fireEvent.keyDown(document, { key: "ArrowRight" });
    expect(handleNavigate).toHaveBeenCalledWith(0);
  });

  it("does not show navigation arrows for single photo", () => {
    render(
      <Lightbox
        photos={[mockPhotos[0]]}
        currentIndex={0}
        isOpen={true}
        onClose={jest.fn()}
      />
    );
    expect(screen.queryByLabelText("Previous photo")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Next photo")).not.toBeInTheDocument();
  });

  it("shows photo counter when multiple photos", () => {
    render(
      <Lightbox
        photos={mockPhotos}
        currentIndex={1}
        isOpen={true}
        onClose={jest.fn()}
      />
    );
    expect(screen.getByText("2 / 3")).toBeInTheDocument();
  });

  it("does not show photo counter for single photo", () => {
    render(
      <Lightbox
        photos={[mockPhotos[0]]}
        currentIndex={0}
        isOpen={true}
        onClose={jest.fn()}
      />
    );
    expect(screen.queryByText(/\/ 1/)).not.toBeInTheDocument();
  });

  it("locks body scroll when open", () => {
    render(
      <Lightbox
        photos={mockPhotos}
        currentIndex={0}
        isOpen={true}
        onClose={jest.fn()}
      />
    );
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("unlocks body scroll when closed", () => {
    const { unmount } = render(
      <Lightbox
        photos={mockPhotos}
        currentIndex={0}
        isOpen={true}
        onClose={jest.fn()}
      />
    );
    expect(document.body.style.overflow).toBe("hidden");

    unmount();
    expect(document.body.style.overflow).toBe("");
  });

  it("calls onClose when close button is clicked", async () => {
    const handleClose = jest.fn();
    render(
      <Lightbox
        photos={mockPhotos}
        currentIndex={0}
        isOpen={true}
        onClose={handleClose}
      />
    );

    const closeButton = screen.getByLabelText("Close lightbox");
    await user.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("calls onNavigate when previous arrow button is clicked", async () => {
    const handleNavigate = jest.fn();
    render(
      <Lightbox
        photos={mockPhotos}
        currentIndex={1}
        isOpen={true}
        onClose={jest.fn()}
        onNavigate={handleNavigate}
      />
    );

    const prevButton = screen.getByLabelText("Previous photo");
    await user.click(prevButton);
    expect(handleNavigate).toHaveBeenCalledWith(0);
  });

  it("calls onNavigate when next arrow button is clicked", async () => {
    const handleNavigate = jest.fn();
    render(
      <Lightbox
        photos={mockPhotos}
        currentIndex={1}
        isOpen={true}
        onClose={jest.fn()}
        onNavigate={handleNavigate}
      />
    );

    const nextButton = screen.getByLabelText("Next photo");
    await user.click(nextButton);
    expect(handleNavigate).toHaveBeenCalledWith(2);
  });
});
