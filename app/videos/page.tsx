"use client";

import { Carousel } from "@/components/carousel";
import { VideoThumbnailCard } from "@/components/cards/VideoThumbnailCard";
import { videos, type VideoItem } from "@/lib/dummy-data";

export default function VideosPage() {
  return (
    <div className="flex flex-col flex-1 bg-background transition-colors duration-300">
      <main className="flex flex-1 w-full flex-col py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Carousel<VideoItem>
          title="Latest Films"
          subtitle="Moments captured in motion — click to watch on YouTube"
          items={videos}
          visibleCount={3}
          renderItem={(video) => <VideoThumbnailCard video={video} />}
        />
      </main>
    </div>
  );
}
