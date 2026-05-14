import type { VideoItem } from "@/lib/dummy-data";

export interface VideoThumbnailCardProps {
  video: VideoItem;
}

export function VideoThumbnailCard({ video }: VideoThumbnailCardProps) {
  const youtubeUrl = `https://www.youtube.com/watch?v=${video.youtubeId}`;

  return (
    <a
      href={youtubeUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Play video: ${video.title}`}
      className="group relative block aspect-video overflow-hidden rounded-xl border border-border
                 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none
                 transition-transform hover:scale-[1.02]"
    >
      <img
        src={video.thumbnailSrc}
        alt={video.title}
        className="h-full w-full object-cover"
        loading="lazy"
      />

      {/* Play icon overlay */}
      <div
        className="absolute inset-0 flex items-center justify-center
                   bg-black/30 transition-colors group-hover:bg-black/40"
        aria-hidden="true"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm transition-transform group-hover:scale-110">
          {/* Play triangle SVG */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="ml-1"
          >
            <path
              d="M5 3L19 12L5 21V3Z"
              fill="white"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </a>
  );
}
