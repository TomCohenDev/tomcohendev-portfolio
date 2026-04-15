import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Screenshot {
  src: string;
  alt: string;
  title?: string;
}

interface ScreenshotGalleryProps {
  screenshots: Screenshot[];
  title?: string;
  columns?: 2 | 3 | 4;
}

const ScreenshotGallery = ({
  screenshots,
  title,
  columns = 3,
}: ScreenshotGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (selectedIndex === null) return;

    if (direction === "prev") {
      setSelectedIndex(
        selectedIndex === 0 ? screenshots.length - 1 : selectedIndex - 1
      );
    } else {
      setSelectedIndex(
        selectedIndex === screenshots.length - 1 ? 0 : selectedIndex + 1
      );
    }
  };

  return (
    <>
      {title && (
        <h3 className="text-2xl font-bold text-foreground mb-6">{title}</h3>
      )}
      <div className={`grid ${gridCols[columns]} gap-6`}>
        {screenshots.map((screenshot, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-lg border border-border bg-background cursor-pointer hover:border-primary/50 transition-all"
            onClick={() => openLightbox(index)}
          >
            <div className="aspect-video overflow-hidden bg-muted">
              <img
                src={screenshot.src}
                alt={screenshot.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            {screenshot.title && (
              <div className="p-4">
                <p className="text-sm font-medium text-foreground">
                  {screenshot.title}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-7xl w-full max-h-[90vh]">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 hover:bg-background text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("prev");
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 hover:bg-background text-foreground transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("next");
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 hover:bg-background text-foreground transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div
              className="flex items-center justify-center h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={screenshots[selectedIndex].src}
                alt={screenshots[selectedIndex].alt}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />
            </div>

            {screenshots[selectedIndex].title && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 px-4 py-2 rounded-lg">
                <p className="text-sm text-foreground">
                  {screenshots[selectedIndex].title}
                </p>
              </div>
            )}

            <div className="absolute bottom-4 right-4 bg-background/80 px-4 py-2 rounded-lg">
              <p className="text-sm text-muted-foreground">
                {selectedIndex + 1} / {screenshots.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ScreenshotGallery;

