## Plan: Convert project to JS + fix gallery synchronization

### 1. Convert entire project from TypeScript → JavaScript
- Rename all `.ts`/`.tsx` → `.js`/`.jsx`, strip type annotations, interfaces, generics, and `as` casts.
  - Includes `src/main.tsx`, `src/App.tsx`, all of `src/components/**` (including `src/components/ui/**`), `src/hooks/**`, `src/lib/utils.ts`, `src/pages/**`, `src/test/**`.
- Delete TS-only files: `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `src/vite-env.d.ts`.
- Convert configs to JS: `vite.config.ts` → `vite.config.js`, `tailwind.config.ts` → `tailwind.config.js`, `vitest.config.ts` → `vitest.config.js`.
- Update `package.json`: remove `typescript`, `typescript-eslint`, `@types/*` devDependencies; keep vitest working with JS.
- Update `eslint.config.js` to drop `typescript-eslint` and lint `.js`/`.jsx` only.
- Update `index.html` script src to `/src/main.jsx`.
- Update `components.json` → `tsx: false` so future shadcn additions are JSX.
- Heads up: ~60 files touched. App look/behavior should be identical.

### 2. Fix true bidirectional sync in `ProductGallery.jsx`
- Keep both Swiper instances controlled via React state (`mainSwiper`, `thumbsSwiper`).
- Keep `Thumbs` module **only for active-thumbnail highlight styling**, not navigation.
- Add explicit, loop-safe handlers:
  - Main `onSlideChange` → `thumbsSwiper.slideToLoop(main.realIndex)`.
  - Thumbs `onSlideChange` → `mainSwiper.slideToLoop(thumbs.realIndex)`.
  - Thumbs `onClick` → read `clickedSlide.dataset.swiperSlideIndex` (loop-safe real index) → `slideToLoop` on both. Fixes "click thumb 4 → main jumps to 4" across loop duplicates.
  - Up/Down nav buttons → plain `onClick` calling `mainSwiper.slidePrev()` / `slideNext()`. Main's `slideChange` then auto-syncs thumbs. Fixes the current bug where buttons only moved thumbs.
- Use `isSyncingRef` flag to prevent ping-pong feedback loops.
- Drop the `Navigation` module from the thumbs swiper.
- Keep `loop`, `mousewheel`, `keyboard`, and 3-thumbnails-visible behavior unchanged.

### 3. Unchanged
- `src/components/gallery.css`, `src/index.css`, `src/App.css`, `public/*`.

### Result
- Pure JS/JSX/CSS/HTML — no TypeScript anywhere.
- In multi-image state: dragging main, dragging thumbs, clicking any thumbnail (incl. jumping #2 → #4), pressing up/down nav, mouse wheel on thumbs, and keyboard arrows all keep both sliders in perfect sync — including across loop boundaries.