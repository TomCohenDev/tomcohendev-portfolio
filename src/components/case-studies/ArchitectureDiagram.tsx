import { useState } from "react";
import { X, ZoomIn, ZoomOut } from "lucide-react";

interface ArchitectureDiagramProps {
  src: string;
  alt: string;
  title: string;
  description?: string;
}

const ArchitectureDiagram = ({
  src,
  alt,
  title,
  description,
}: ArchitectureDiagramProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.5));
  };

  const resetZoom = () => {
    setZoom(1);
  };

  return (
    <>
      <div
        className="group relative overflow-hidden rounded-lg border border-border bg-background cursor-pointer hover:border-primary/50 transition-all"
        onClick={() => setIsOpen(true)}
      >
        <div className="aspect-video overflow-hidden bg-muted">
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <h4 className="text-lg font-semibold text-foreground mb-2">
            {title}
          </h4>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => {
            setIsOpen(false);
            resetZoom();
          }}
        >
          <div className="relative max-w-7xl w-full max-h-[90vh]">
            <button
              onClick={() => {
                setIsOpen(false);
                resetZoom();
              }}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 hover:bg-background text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="absolute top-4 right-16 flex gap-2 z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleZoomOut();
                }}
                className="p-2 rounded-full bg-background/80 hover:bg-background text-foreground transition-colors"
                aria-label="Zoom Out"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleZoomIn();
                }}
                className="p-2 rounded-full bg-background/80 hover:bg-background text-foreground transition-colors"
                aria-label="Zoom In"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
            </div>

            <div
              className="flex items-center justify-center h-full overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={src}
                alt={alt}
                className="max-w-full max-h-[90vh] object-contain rounded-lg transition-transform duration-300"
                style={{ transform: `scale(${zoom})` }}
              />
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 px-4 py-2 rounded-lg">
              <h4 className="text-sm font-semibold text-foreground">{title}</h4>
              {description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ArchitectureDiagram;

