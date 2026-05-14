export interface PhotoItem {
  id: string;
  type: "photo";
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface VideoItem {
  id: string;
  type: "video";
  youtubeId: string;
  title: string;
  thumbnailSrc: string;
}

export interface ProductItem {
  id: string;
  type: "product";
  name: string;
  price: number;
  imageSrc: string;
  description: string;
}

export type CarouselItem = PhotoItem | VideoItem | ProductItem;

export const photos: PhotoItem[] = [
  {
    id: "photo-1",
    type: "photo",
    src: "https://picsum.photos/seed/otwr1/800/600",
    alt: "Sunlight filtering through a dense forest canopy",
    width: 800,
    height: 600,
  },
  {
    id: "photo-2",
    type: "photo",
    src: "https://picsum.photos/seed/otwr2/800/600",
    alt: "A winding mountain trail at golden hour",
    width: 800,
    height: 600,
  },
  {
    id: "photo-3",
    type: "photo",
    src: "https://picsum.photos/seed/otwr3/800/600",
    alt: "Calm lake reflecting snow-capped peaks",
    width: 800,
    height: 600,
  },
  {
    id: "photo-4",
    type: "photo",
    src: "https://picsum.photos/seed/otwr4/800/600",
    alt: "Desert dunes stretching to the horizon",
    width: 800,
    height: 600,
  },
  {
    id: "photo-5",
    type: "photo",
    src: "https://picsum.photos/seed/otwr5/800/600",
    alt: "Coastal cliffs battered by ocean waves",
    width: 800,
    height: 600,
  },
  {
    id: "photo-6",
    type: "photo",
    src: "https://picsum.photos/seed/otwr6/800/600",
    alt: "Starry night sky over a remote campsite",
    width: 800,
    height: 600,
  },
];

export const videos: VideoItem[] = [
  {
    id: "video-1",
    type: "video",
    youtubeId: "dQw4w9WgXcQ",
    title: "Never Gonna Give You Up",
    thumbnailSrc: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
  },
  {
    id: "video-2",
    type: "video",
    youtubeId: "LXb3EKWsInQ",
    title: "Nature Relaxation: 4K Tropical Beach",
    thumbnailSrc: "https://img.youtube.com/vi/LXb3EKWsInQ/hqdefault.jpg",
  },
  {
    id: "video-3",
    type: "video",
    youtubeId: "1EYVO6NskA8",
    title: "Hiking the Pacific Crest Trail",
    thumbnailSrc: "https://img.youtube.com/vi/1EYVO6NskA8/hqdefault.jpg",
  },
  {
    id: "video-4",
    type: "video",
    youtubeId: "M7lc1UVf-VE",
    title: "YouTube Creator Academy: Getting Started",
    thumbnailSrc: "https://img.youtube.com/vi/M7lc1UVf-VE/hqdefault.jpg",
  },
];

export const products: ProductItem[] = [
  {
    id: "product-1",
    type: "product",
    name: "Wilderness Journal",
    price: 24.99,
    imageSrc: "https://picsum.photos/seed/otwrprod1/400/400",
    description:
      "A rugged, waterproof field notebook for documenting your adventures off the beaten path.",
  },
  {
    id: "product-2",
    type: "product",
    name: "Trail Map Print",
    price: 34.99,
    imageSrc: "https://picsum.photos/seed/otwrprod2/400/400",
    description:
      "Topographic art print of iconic hiking trails, printed on archival cotton paper.",
  },
  {
    id: "product-3",
    type: "product",
    name: "Summit Snapback",
    price: 29.99,
    imageSrc: "https://picsum.photos/seed/otwrprod3/400/400",
    description:
      "Lightweight, breathable cap with an adjustable strap—built for long days on the ridge.",
  },
  {
    id: "product-4",
    type: "product",
    name: "Alpine Lantern",
    price: 49.99,
    imageSrc: "https://picsum.photos/seed/otwrprod4/400/400",
    description:
      "Rechargeable LED lantern with a warm glow and 72-hour battery life for backcountry camps.",
  },
  {
    id: "product-5",
    type: "product",
    name: "Roamers Wool Socks",
    price: 19.99,
    imageSrc: "https://picsum.photos/seed/otwrprod5/400/400",
    description:
      "Merino-blend crew socks that stay dry and comfortable through every switchback.",
  },
];
