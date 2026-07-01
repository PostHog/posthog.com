# KoreanCookieBannerToast

Korean-only wrapper for the site cookie toast.

## Why this exists

The base cookie toast is emitted from shared site code with English copy. This component watches for that toast inside the `/ko` desktop shell and replaces it with Korean copy without changing the English experience.

## Copy guidance

- Keep the factual claims aligned with the original cookie banner.
- Avoid named political or celebrity references in this privacy-related surface.
- Keep the tone light, but do not make stronger privacy or legal claims than the original copy.

## Used by

Mounted from `src/components/Korean/KoreanDesktop/index.tsx`.
