import { render, screen } from "@testing-library/react";
import { VideoThumbnailCard } from "@/components/cards/VideoThumbnailCard";
import type { VideoItem } from "@/lib/dummy-data";

const mockVideo: VideoItem = {
  id: "video-test",
  type: "video",
  youtubeId: "dQw4w9WgXcQ",
  title: "Test Video Title",
  thumbnailSrc: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
};

describe("VideoThumbnailCard", () => {
  it("renders thumbnail image with correct alt text", () => {
    render(<VideoThumbnailCard video={mockVideo} />);

    const img = screen.getByAltText("Test Video Title");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", mockVideo.thumbnailSrc);
  });

  it("contains a link with href pointing to the correct YouTube URL", () => {
    render(<VideoThumbnailCard video={mockVideo} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute(
      "href",
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    );
  });

  it("link has target='_blank' and rel='noopener noreferrer'", () => {
    render(<VideoThumbnailCard video={mockVideo} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("play icon overlay is present", () => {
    render(<VideoThumbnailCard video={mockVideo} />);

    const overlay = screen.getByLabelText("Play video: Test Video Title")
      .querySelector("div[aria-hidden='true']");
    expect(overlay).toBeInTheDocument();

    const svg = screen.getByLabelText("Play video: Test Video Title").querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("has correct accessibility attributes", () => {
    render(<VideoThumbnailCard video={mockVideo} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("aria-label", "Play video: Test Video Title");
  });

  it("applies lazy loading to the image", () => {
    render(<VideoThumbnailCard video={mockVideo} />);

    const img = screen.getByAltText("Test Video Title");
    expect(img).toHaveAttribute("loading", "lazy");
  });
});
