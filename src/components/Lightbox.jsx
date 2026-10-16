import { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar, Tag } from 'lucide-react';

export default function Lightbox({
  images = [],
  currentIndex = 0,
  isOpen = false,
  onClose,
  onPrev,
  onNext,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];
  if (!currentImage) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Image Lightbox Viewer"
      onClick={onClose}
    >
      {/* Close button top right (>= 44px touch target) */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 p-2.5 min-w-[44px] min-h-[44px] rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer flex items-center justify-center touch-manipulation active:scale-95"
        aria-label="Close Lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev button (>= 44px touch target) */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50 p-3 min-w-[44px] min-h-[44px] rounded-full bg-white/10 hover:bg-[#F28C28] text-white transition-all cursor-pointer backdrop-blur-xs flex items-center justify-center touch-manipulation active:scale-95"
        aria-label="Previous Image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next button (>= 44px touch target) */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 p-3 min-w-[44px] min-h-[44px] rounded-full bg-white/10 hover:bg-[#F28C28] text-white transition-all cursor-pointer backdrop-blur-xs flex items-center justify-center touch-manipulation active:scale-95"
        aria-label="Next Image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Lightbox content container */}
      <div
        className="max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative overflow-hidden rounded-xl bg-black/40 max-h-[70vh] sm:max-h-[75vh] flex items-center justify-center shadow-2xl">
          <img
            src={currentImage.url}
            alt={currentImage.title}
            width={1200}
            height={800}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = `https://picsum.photos/seed/iti-gal-${currentImage.id}/1200/800`;
            }}
            className="max-h-[70vh] sm:max-h-[75vh] w-auto max-w-full object-contain rounded-xl select-none"
          />
        </div>

        {/* Caption & Metadata */}
        <div className="mt-3 sm:mt-4 text-center text-white max-w-2xl px-4">
          <div className="flex items-center justify-center gap-2.5 text-xs text-slate-300 mb-1 flex-wrap">
            <span className="bg-[#F28C28] text-white font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {currentImage.category}
            </span>
            {currentImage.date && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {currentImage.date}
              </span>
            )}
            <span className="text-slate-400">
              {currentIndex + 1} / {images.length}
            </span>
          </div>

          <h3 className="text-base sm:text-xl font-bold tracking-tight">
            {currentImage.title}
          </h3>
          {currentImage.caption && (
            <p className="text-xs sm:text-sm text-slate-300 mt-1 line-clamp-2 sm:line-clamp-none">
              {currentImage.caption}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
