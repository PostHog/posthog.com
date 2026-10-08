# Laptop Mode

A closed laptop lid on a community profile, backed by Squeak's sticker catalog and permanent placements. Uses existing sticker SVGs, media images, Framer Motion, and a native WebGL peel renderer.

`profileId` identifies the viewed layout, and `active` controls visibility and entrance animation. Key the component by profile ID. The component uses `useUser` to show the library only to the owner. Other viewers can inspect attached stickers but cannot add or remove them; the server independently enforces ownership.

## Data and ownership

- `GET /api/profiles/:id/laptop` loads the public layout.
- `GET /api/me/stickers` loads the owner's library, grouped by collection. Locked stickers show their achievement requirement. Library cache keys include the signed-in user ID.
- `POST /api/me/laptop/stickers` saves a completed placement. The server supplies fixed size, order, and persistent ID and enforces unlocks and the placement limit.
- `POST /api/me/laptop/stickers/:id/remove` turns an attached sticker and its overlapping upper layers into permanent stains. Retrying the same placement ID returns the same stain.
- Click or activate an attached sticker to read its details in the existing Radix popover. Owners also get **Peel off sticker**, with a notice that the stain is permanent.
- Catalog images override built-in artwork. Relative image URLs resolve against the configured Squeak host. The eight built-in SVGs remain available as starter artwork without a media upload.

The backend models, admin setup, and endpoint contract are documented in `squeak-strapi/src/api/laptop/README.md` in the adjacent repository.

## Interaction

The edit view has a **Library** heading and a collection grid with uniform 72 px previews beside the laptop. On narrow windows, the laptop comes before the library. Selecting a sticker scrolls the view to the top and opens a plain paper-backed Radix dialog. The sticker previews at its final size on the laptop, with the paper expanding to fit larger stickers. Press and drag to peel manually: the curl follows the pointer, and progress measures the travel needed to move the crease past the far edge. Completion uses the same fold geometry as the renderer, including the grab position, drag direction, and curl radius. Releasing early resets the peel. A complete pull closes the dialog and pins the sticker to the pointer at its configured canvas size. Escape or the close button cancels the selection.

Hold Shift and move vertically to rotate in place. The last physical pointer position is tracked separately from the artwork's position, so Shift gestures do not translate the sticker and releasing Shift does not make it jump. Placement uses the artwork's current position. A Shift keycap beneath the laptop shows the shortcut and highlights during rotation.

Press and hold on the laptop for 650 ms to stick it down. Releasing early leaves it in hand and sends no request. The completed hold sends one save, fixes its position, and shows saving feedback. An uncertain failure exposes **Retry save**, preserving the exact payload and request UUID so a lost response cannot produce a duplicate. An explicit rejection releases it back into hand and refreshes the layout and library. Escape and Cancel work before saving; an in-flight write is not represented as cancelable.

Touch uses tap, press-and-drag, then press-and-hold. The release click after placing does not open the new sticker's details. Pointer cancellation, window blur, leaving Laptop Mode, and unmounting stop an incomplete hold. Already-submitted requests may still complete on the server.

To remove a sticker, choose **Peel off sticker** in its details and drag the artwork directly on the lid. The selected sticker and overlapping stickers above it lift as one sheet. Overlap follows the layer order transitively: a sticker resting on another lifted sticker comes off too. Rotated image bounds determine overlap; transparent padding is included. The same peel renderer reveals a separate artwork-shaped stain beneath each sticker. Releasing early rewinds; Escape or Cancel exits before a completed peel. Completion saves removal and frees a slot for each peeled sticker. Uncertain responses show **Retry removal**; explicit server rejection restores the sticker. Keyboard users can peel gradually with arrow keys or activate Enter/Space for a complete peel animation. Reduced motion and unavailable WebGL use a fade while retaining the gesture and progress feedback.

Keyboard: Enter/Space selects a sticker and focuses its peel control. Arrow keys adjust peel progress, or Enter/Space completes the peel. Once detached, arrow keys position it, Shift + Up/Down rotates it, holding Enter/Space places it, and Escape cancels before saving. Attached stickers and their information popovers are keyboard accessible.

## Rendering

The lid uses `static/images/light_mode_laptop.png` and `dark_mode_laptop.png`, switched by the site's dark-mode class. These files include the logo, hinge, and lighting; no extra lid chrome is drawn. Both align to the light image's 933 × 729 frame, including its shadow. The sticker surface stays 3:2 within that frame (starting at approximately 84, 10 with a width of 768 pixels), so saved sticker coordinates and sizes retain their proportions. View-only sizing fits the full image and shadow.

The catalog's `holographic` flag adds a rainbow foil finish to library thumbnails, held stickers, and attached stickers in either viewing mode. A shared SVG filter preserves artwork transparency and dark ink, with saturated rainbow reflections and dense glitter that shift with pointer movement. The WebGL peel shader applies the finish to the printed face using the curled surface normals; the reverse stays paper-colored. A per-layer mask keeps ordinary stickers plain when a mixed stack is peeled. Backing silhouettes and permanent stains omit the finish. Reduced motion uses a static reflection. Flat stickers use SVG compositing so a full library does not allocate a WebGL context per sticker.

Coordinates and saved widths are fractions of lid dimensions, so a layout has the same proportions on every screen. A ResizeObserver keeps held artwork at its configured canvas size as the window changes. Library thumbnails are independent of that size. The lid has a fixed 3:2 aspect ratio, and rotated stickers are constrained to its bounds. View-only mode measures both available width and height, including room for the hinge and shadow, to keep the entire laptop visible without scrolling. In the edit view the laptop stays beside the scrollable library on wide windows.

New placements go on top, up to 24 attached stickers. Removed placements remain in the response with `removedAt` and render beneath attached stickers. The stain filters the original artwork to a faint silhouette, preserving its transparency, saved size, position, and rotation. Transparent artwork is required for a shaped silhouette; an opaque image leaves a rectangular stain. No separate mask upload or cross-origin pixel access is needed for residue.

Held and peeling artwork render in pointer-transparent portals, so the fold can follow the pointer outside the paper or laptop without being clipped. The native WebGL renderer textures a subdivided surface with the artwork, bends it around a moving cylindrical crease, and shades the front, paper underside, and shadow. Pointer movement sets the curl direction, and the crease is solved so the grabbed point stays under the pointer, including on rotated stickers. The library backing is a fixed, single-color silhouette; laptop removal exposes the existing residue. Uploaded artwork is fitted to a square texture without stretching. Rendering updates on movement, rewind, scrolling, and resizing, and GPU resources are disposed on exit. Reduced motion or unavailable WebGL translates and fades the foreground artwork over the same fixed silhouette while retaining the gesture and progress feedback. Cross-origin image hosting must permit CORS to use the peel renderer.

No layout is stored in localStorage. SWR loads saved placements when a profile opens and updates the cache after a successful save or removal. Loading and failed reads have feedback and retry controls. Other visitors see only the saved laptop, including stains, with clickable details on attached stickers.

Run the geometry check with Node 22:

```sh
node --experimental-strip-types --test src/components/LaptopMode/layout.test.ts src/components/LaptopMode/peelRenderer.test.ts
```

## Sharing

**Share laptop** in the profile footer opens an image preview. **Share image** uses the native share sheet when file sharing is supported; **Download PNG** works as the fallback. The file is prepared before the share click to preserve browser user activation. **Copy link** copies `/community/laptops/:profileId?theme=light|dark`; a selectable field remains available if clipboard access is unavailable.

The share URL returns server-rendered Open Graph and Twitter metadata, with a 1200 × 630 PNG of saved stickers and stains from `/api/laptop-share?profileId=…&format=png&theme=…`. The PNG uses the lid theme selected at sharing time, retains layer order and transparency, and includes a static glitter finish. Visitors are sent to `/community/profiles/:id?laptop=1`, which opens Laptop Mode. Other profiles remain view-only.

`api/laptop-share.js` runs as a Vercel function and through Gatsby's existing development middleware. Restart the **posthog.com** development server after adding the middleware routes. Public link previews require a publicly reachable website and a Squeak API reachable by the renderer; a localhost link cannot unfurl on another service. The renderer reads `SQUEAK_SOURCE_HOST`, falling back to `GATSBY_SQUEAK_AUTH_HOST` or `GATSBY_SQUEAK_API_HOST` and does not require user tokens. Arbitrary remote images must use HTTPS, resolve to public addresses, and stay within the image size limits; configured Squeak `/uploads/` URLs also work locally. Unavailable artwork causes an explicit retryable error rather than an incomplete export.

Responses have a 60-second CDN cache and revisioned image URLs. Social apps may keep their own previews longer. The built-in SVGs are generated from the existing React artwork into `static/stickers/laptop`; regenerate them after changing the illustrations with `node scripts/export-laptop-stickers.cjs`. Vercel's function configuration bundles those SVGs and both lid PNGs.

Sharing checks (no application server required):

```sh
node --test scripts/laptop-share.test.cjs
node --experimental-strip-types --test src/components/LaptopMode/ShareLaptop.test.ts src/components/LaptopMode/stickers.test.ts
```
