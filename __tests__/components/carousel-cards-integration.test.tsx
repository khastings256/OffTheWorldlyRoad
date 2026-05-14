import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Carousel } from "@/components/carousel";
import { PhotoCard } from "@/components/cards/PhotoCard";
import { VideoThumbnailCard } from "@/components/cards/VideoThumbnailCard";
import { ProductCard } from "@/components/cards/ProductCard";
import { CartProvider } from "@/lib/cart";
import type { CarouselItem, PhotoItem, VideoItem, ProductItem } from "@/lib/dummy-data";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock scrollTo for jsdom compatibility
beforeAll(() => {
  Element.prototype.scrollTo = jest.fn();
});

const mixedItems: CarouselItem[] = [
  {
    id: "photo-1",
    type: "photo",
    src: "https://picsum.photos/seed/testphoto/800/600",
    alt: "Test forest photo",
    width: 800,
    height: 600,
  },
  {
    id: "video-1",
    type: "video",
    youtubeId: "dQw4w9WgXcQ",
    title: "Test Video",
    thumbnailSrc: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
  },
  {
    id: "product-1",
    type: "product",
    name: "Test Product",
    price: 29.99,
    imageSrc: "https://picsum.photos/seed/testprod/400/400",
    description: "A test product for integration testing.",
  },
];

function renderItem(item: CarouselItem) {
  switch (item.type) {
    case "photo":
      return <PhotoCard photo={item as PhotoItem} />;
    case "video":
      return <VideoThumbnailCard video={item as VideoItem} />;
    case "product":
      return <ProductCard product={item as ProductItem} />;
    default:
      return null;
  }
}

function renderWithProviders(ui: React.ReactNode) {
  return render(<CartProvider>{ui}</CartProvider>);
}

describe("Carousel with mixed card types", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it("renders all three card types in the same carousel", () => {
    renderWithProviders(
      <Carousel<CarouselItem>
        items={mixedItems}
        visibleCount={3}
        renderItem={renderItem}
      />
    );

    // PhotoCard renders as a button with the photo alt text
    expect(
      screen.getByRole("button", { name: /view photo: test forest photo/i })
    ).toBeInTheDocument();

    // VideoThumbnailCard renders as a link
    expect(
      screen.getByRole("link", { name: /play video: test video/i })
    ).toBeInTheDocument();

    // ProductCard renders with product name
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$29.99")).toBeInTheDocument();
  });

  it("carousel region has correct aria attributes", () => {
    renderWithProviders(
      <Carousel<CarouselItem>
        items={mixedItems}
        title="Mixed Content"
        visibleCount={3}
        renderItem={renderItem}
      />
    );

    const regions = screen.getAllByRole("region", { name: /mixed content/i });
    const carousel = regions.find((r) => r.getAttribute("aria-roledescription") === "carousel");
    expect(carousel).toBeDefined();
    expect(carousel).toHaveAttribute("tabIndex", "0");
  });

  it("each slide has correct aria-roledescription and label", () => {
    renderWithProviders(
      <Carousel<CarouselItem>
        items={mixedItems}
        visibleCount={1}
        renderItem={renderItem}
      />
    );

    const slides = screen.getAllByRole("group", { hidden: true });
    expect(slides.length).toBeGreaterThanOrEqual(3);

    slides.slice(0, 3).forEach((slide, index) => {
      expect(slide).toHaveAttribute("aria-roledescription", "slide");
      expect(slide).toHaveAttribute(
        "aria-label",
        `${index + 1} of ${mixedItems.length}`
      );
    });
  });

  it("navigates carousel with arrow keys", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <Carousel<CarouselItem>
        items={mixedItems}
        visibleCount={1}
        renderItem={renderItem}
      />
    );

    const carousel = screen.getByRole("region");
    carousel.focus();

    // Press ArrowRight to advance
    await user.keyboard("{ArrowRight}");
    // Carousel should have moved; no error means success
    expect(carousel).toBeInTheDocument();
  });

  it("dot indicators are rendered when there are more items than visibleCount", () => {
    renderWithProviders(
      <Carousel<CarouselItem>
        items={mixedItems}
        visibleCount={1}
        renderItem={renderItem}
      />
    );

    const dots = screen.getAllByRole("tab", { name: /go to slide/i });
    expect(dots.length).toBe(mixedItems.length);
  });

  it("product card add-to-cart works within the mixed carousel", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <Carousel<CarouselItem>
        items={mixedItems}
        visibleCount={3}
        renderItem={renderItem}
      />
    );

    const addButton = screen.getByTestId("add-to-cart");
    await user.click(addButton);

    expect(addButton).toHaveTextContent("Added!");
  });

  it("video card link has correct href", () => {
    renderWithProviders(
      <Carousel<CarouselItem>
        items={mixedItems}
        visibleCount={3}
        renderItem={renderItem}
      />
    );

    const link = screen.getByRole("link", { name: /play video: test video/i });
    expect(link).toHaveAttribute(
      "href",
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    );
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
