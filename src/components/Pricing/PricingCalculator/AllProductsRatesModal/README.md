# AllProductsRatesModal

Modal listing every calculator product with its billed unit, first paid rate, and monthly free allocation. Opened from **See all products and per-unit rates** under the estimate rail.

Uses the window system (`addWindow` plus `pricing-all-rates` in `context/App.tsx`), same chrome as the sign-in and free-tier modals.

**Add** calls the calculator's `addProduct` and marks the row Added. The modal keeps its own added list because the window element is a snapshot and will not re-render when the rail updates. **Back to my estimate** closes the window.
