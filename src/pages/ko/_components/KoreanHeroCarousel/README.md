# KoreanHeroCarousel

Korean-only fork of `src/components/Home/HeroCarousel`.

## Why this is forked

The `/ko` homepage is intentionally isolated from the English homepage so localization changes cannot affect the live English experience. This component duplicates the carousel structure and slide markup instead of translating the rendered DOM.

## Sync guidance

- Pull structural or accessibility fixes from `src/components/Home/HeroCarousel` when they affect carousel behavior.
- Keep Korean copy in JSX render paths, not in post-render DOM rewrites.
- Keep the GraphQL static query name unique to this fork.
- Keep product names and product descriptions routed through the passed `translate` function when they come from shared product data.

## Used by

Registered as the `HeroCarousel` MDX component in `src/pages/ko/_KoreanHome.tsx`.
