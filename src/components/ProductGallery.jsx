import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Thumbs, Navigation, Keyboard, Mousewheel } from "swiper/modules";
import { ChevronUp, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/navigation";
import "./gallery.css";






const ProductGallery = ({ images, className }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [mainSwiper, setMainSwiper] = useState(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);

  // Reset swipers when image set changes (e.g. demo state toggle)
  useEffect(() => {
    setThumbsSwiper(null);
    setMainSwiper(null);
  }, [images]);

  if (!images.length) return null;

  const count = images.length;
  const isSingle = count === 1;
  const isMulti = count > 2;
  const showThumbs = count >= 2;
  const showNavButtons = isMulti;

  return (
    <div className={cn("flex w-full gap-4", className)}>
      {/* Main image slider */}
      <div className="min-w-0 flex-1">
        <div className="aspect-square w-full">
          <Swiper
            modules={[Thumbs, Keyboard]}
            onSwiper={setMainSwiper}
            thumbs={{
              swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
            }}
            spaceBetween={10}
            keyboard={{ enabled: true }}
            allowTouchMove={!isSingle}
            loop={isMulti}
            className="gallery-main h-full w-full">
            
            {images.map((src, i) =>
            <SwiperSlide key={`${src}-${i}`}>
                <img
                src={src}
                alt={`Product image ${i + 1}`}
                className="h-full w-full object-cover"
                draggable={false} />
              
              </SwiperSlide>
            )}
          </Swiper>
        </div>
      </div>

      {/* Vertical thumbnail slider */}
      {showThumbs &&
      <div className="flex w-20 shrink-0 flex-col items-center gap-2 sm:w-24">
          {showNavButtons &&
        <Button
          ref={prevBtnRef}
          variant="outline"
          size="icon"
          className="h-8 w-8 shrink-0 rounded-full"
          aria-label="Previous image">
          
              <ChevronUp className="h-4 w-4" />
            </Button>
        }

          <div
          className={cn(
            "min-h-0 w-full flex-1",
            // Constrain thumb column height so it visually matches the main image
            isMulti ? "max-h-[calc(100%-5rem)]" : ""
          )}
          style={{
            // For 2-image state: height = main aspect / 2 roughly handled by aspect on slides
            height: isMulti ? undefined : "100%"
          }}>
          
            <Swiper
            modules={[Thumbs, Navigation, Mousewheel]}
            onSwiper={setThumbsSwiper}
            direction="vertical"
            spaceBetween={10}
            slidesPerView={isMulti ? 3 : 2}
            watchSlidesProgress
            loop={isMulti}

            mousewheel={{ forceToAxis: true }}
            navigation={
            showNavButtons ?
            {
              prevEl: prevBtnRef.current,
              nextEl: nextBtnRef.current
            } :
            false
            }
            onBeforeInit={(swiper) => {
              if (showNavButtons && swiper.params.navigation && typeof swiper.params.navigation === "object") {
                const nav = swiper.params.navigation;
                nav.prevEl = prevBtnRef.current;
                nav.nextEl = nextBtnRef.current;
              }
            }}
            onClick={(swiper) => {
              // Ensure clicking a thumb syncs main slider (defensive — thumbs module already handles)
              if (mainSwiper && !mainSwiper.destroyed) {
                mainSwiper.slideTo(swiper.clickedIndex);
              }
            }}
            className="gallery-thumbs aspect-[1/3] h-full w-full"
            style={{
              // 2-image state: shorter column (2 squares stacked)
              aspectRatio: isMulti ? "1 / 3" : "1 / 2"
            }}>
            
              {images.map((src, i) =>
            <SwiperSlide key={`thumb-${src}-${i}`}>
                  <img
                src={src}
                alt={`Thumbnail ${i + 1}`}
                className="h-full w-full object-cover"
                draggable={false} />
              
                </SwiperSlide>
            )}
            </Swiper>
          </div>

          {showNavButtons &&
        <Button
          ref={nextBtnRef}
          variant="outline"
          size="icon"
          className="h-8 w-8 shrink-0 rounded-full"
          aria-label="Next image">
          
              <ChevronDown className="h-4 w-4" />
            </Button>
        }
        </div>
      }
    </div>);

};

export default ProductGallery;