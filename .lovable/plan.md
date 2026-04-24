# Synchronized Product Gallery with SwiperJS

## Goal
Build a product gallery using **SwiperJS** with bidirectional synchronization between a main slider and a vertical thumbnail slider. Layout order (left → right):

**Main image · Vertical thumbnail swiper · Product info + CTA**

## Three States (driven by image count)

1. **1 image** — Main slider only (no thumbnails). Product info to the right.
2. **2 images** — Main slider + vertical thumbnail column showing both thumbs. No nav buttons needed.
3. **5+ images** — Main slider + vertical thumbnail column with **3 thumbnails visible**, plus `ChevronUp` / `ChevronDown` navigation buttons above and below the thumbnail strip.

## Synchronization
Using Swiper's `thumbs` module + a controlled `activeIndex`:
- Drag/swipe on either slider updates the other.
- Click a thumbnail → main slider jumps to it.
- Click up/down nav buttons → both sliders advance.
- Keyboard arrows work on the focused slider and propagate.

## Files

### New
- `src/components/ProductGallery.tsx` — accepts `images: string[]`, renders the correct state, owns both Swiper instances and the sync logic.
- `src/components/ProductInfo.tsx` — placeholder title, description, price, and a CTA `Button` (shadcn).
- `src/components/gallery.css` — minimal overrides for Swiper (thumbnail active border, nav button styling).

### Modified
- `src/pages/Index.tsx` — demo page with a small toggle (1 / 2 / 5 images) to showcase all three states. Layout: gallery on the left, `ProductInfo` on the right.
- `package.json` — add `swiper` dependency.

## Layout details
- Desktop and mobile both keep vertical thumbnails (per your earlier choice).
- Main image uses an aspect-ratio container so it stays stable across states.
- Thumbnail column width is fixed (~80–96px). Active thumb gets a primary-colored border.
- Nav buttons (multi state only) are circular `ghost` buttons with Lucide `ChevronUp` / `ChevronDown`, disabled at start/end.

## Demo data
Three sample arrays using Unsplash placeholder images: 1 image, 2 images, 5 images. A simple segmented control in `Index.tsx` switches between them so you can verify all states.

## Out of scope
No backend, no real product data, no zoom/lightbox (can be added later).

Ready to implement on approval.
