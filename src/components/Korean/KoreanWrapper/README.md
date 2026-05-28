# KoreanWrapper

Korean-only copy of `src/components/Wrapper`.

This wrapper keeps the `/ko` desktop shell isolated from the shared English shell while preserving the same window
management, footer, cookie toast, and close-all-windows behavior.

## Usage

`gatsby-browser.tsx` and `gatsby-ssr.js` select this wrapper only when the route path is `/ko` or starts with `/ko/`.

## Maintenance

- Keep changes in this wrapper scoped to the Korean homepage experiment.
- Do not import `KoreanDesktop` or `KoreanTaskBarMenu` from the shared `src/components/Wrapper`.
- When shared wrapper behavior changes, copy only the behavior needed by `/ko`.
