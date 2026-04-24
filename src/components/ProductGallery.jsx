import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Keyboard, Mousewheel } from "swiper/modules";
import { ChevronUp, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import "swiper/css";
import "swiper/css/thumbs";
import "./gallery.css";

const ProductGallery = ({ images, className }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [mainSwiper, setMainSwiper] = useState(null);
  const isSyncingRef = useRef(false);

  // Reset both swipers when image set changes (demo state toggle)
  useEffect(() => {
    setThumbsSwiper(null);
    setMainSwiper(null);
  }, [images]);

  if (!images || !images.length) return null;

  const count = images.length;
  const isSingle = count === 1;
  const isMulti = count > 2;
  const showThumbs = count >= 2;
  const showNavButtons = isMulti;

  // Helper: jump both sliders to a real index, guarded against feedback loops
  const syncTo = (realIndex) => {
    if (isSyncingRef.current) return;
    isSyncingRef.current = true;
    try {
      if (mainSwiper && !mainSwiper.destroyed && mainSwiper.realIndex !== realIndex) {
        if (mainSwiper.params.loop) mainSwiper.slideToLoop(realIndex);
        else mainSwiper.slideTo(realIndex);
      }
      if (thumbsSwiper && !thumbsSwiper.destroyed && thumbsSwiper.realIndex !== realIndex) {
        if (thumbsSwiper.params.loop) thumbsSwiper.slideToLoop(realIndex);
        else thumbsSwiper.slideTo(realIndex);
      }
    } finally {
      // release on next tick so the resulting slideChange events don't bounce back
      setTimeout(() => { isSyncingRef.current = false; }, 0);
    }
  };

  return (
    <div className={cn("flex w-full gap-4", className)}>
      {/* Main image slider */}
      <div className="min-w-0 flex-1">
        <div className="aspect-square w-full">
          <Swiper
            modules={[Thumbs, Keyboard]}
            onSwiper={setMainSwiper}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            spaceBetween={10}
            keyboard={{ enabled: true }}
            allowTouchMove={!isSingle}
            loop={isMulti}
            onSlideChange={(s) => syncTo(s.realIndex)}
            className="gallery-main h-full w-full"
          >
            {images.map((src, i) => (
              <SwiperSlide key={`main-${i}`}>
                <img
                  src={src}
                  alt={`Product image ${i + 1}`}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Vertical thumbnail slider */}
      {showThumbs && (
        <div className="flex w-20 shrink-0 flex-col items-center gap-2 sm:w-24">
          {showNavButtons && (
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 shrink-0 rounded-full"
              aria-label="Previous image"
              onClick={() => {
                if (mainSwiper && !mainSwiper.destroyed) mainSwiper.slidePrev();
              }}
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
          )}

          <div
            className={cn("min-h-0 w-full flex-1", isMulti ? "max-h-[calc(100%-5rem)]" : "")}
            style={{ height: isMulti ? undefined : "100%" }}
          >
            <Swiper
              modules={[Thumbs, Mousewheel]}
              onSwiper={setThumbsSwiper}
              direction="vertical"
              spaceBetween={10}
              slidesPerView={isMulti ? 3 : 2}
              watchSlidesProgress
              loop={isMulti}
              mousewheel={{ forceToAxis: true }}
              onSlideChange={(s) => syncTo(s.realIndex)}
              onClick={(s) => {
                // Loop-safe real index from the clicked slide's data attribute
                const slide = s.clickedSlide;
                if (!slide) return;
                const attr = slide.getAttribute("data-swiper-slide-index");
                const realIndex = attr !== null ? parseInt(attr, 10) : s.clickedIndex;
                if (Number.isNaN(realIndex)) return;
                syncTo(realIndex);
              }}
              className="gallery-thumbs h-full w-full"
              style={{ aspectRatio: isMulti ? "1 / 3" : "1 / 2" }}
            >
              {images.map((src, i) => (
                <SwiperSlide key={`thumb-${i}`}>
                  <img
                    src={src}
                    alt={`Thumbnail ${i + 1}`}
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {showNavButtons && (
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 shrink-0 rounded-full"
              aria-label="Next image"
              onClick={() => {
                if (mainSwiper && !mainSwiper.destroyed) mainSwiper.slideNext();
              }}
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
