// Carousel item type - intentionally generic; the caller decides what T is
export interface CarouselProps<T> {
  /** Items to render in the carousel */
  items: T[];
  /** Render function for each item */
  renderItem: (item: T, index: number) => React.ReactNode;
  /** Optional section title */
  title?: string;
  /** Optional section subtitle/description */
  subtitle?: string;
  /** Optional CTA link rendered after the carousel */
  cta?: {
    label: string;
    href: string;
  };
  /** Additional classes for the root element */
  className?: string;
  /** Additional classes for each slide container */
  itemClassName?: string;
  /** Number of visible items at a time (default: 3) */
  visibleCount?: number;
  /** Show prev/next arrows (default: true) */
  showArrows?: boolean;
  /** Show dot indicators (default: true) */
  showDots?: boolean;
  /** Auto-advance slides (default: false) */
  autoPlay?: boolean;
  /** Auto-play interval in ms (default: 5000) */
  autoPlayInterval?: number;
  /** Pause auto-play on hover (default: true) */
  pauseOnHover?: boolean;
}

/** CarouselItem wrapper props - internal use */
export interface CarouselItemProps {
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
}

/** Navigation arrow props - internal use */
export interface CarouselArrowProps {
  direction: "prev" | "next";
  onClick: () => void;
  disabled?: boolean;
  label?: string;
}

/** Dot indicator props - internal use */
export interface CarouselDotProps {
  index: number;
  isActive: boolean;
  onClick: () => void;
  total: number;
}
