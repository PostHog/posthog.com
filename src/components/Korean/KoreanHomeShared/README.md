# KoreanHomeShared

Korean-only fork of shared homepage MDX components from `src/components/Home/shared.tsx`.

## Why this is forked

The `/ko` homepage needs localized copy, Korea-specific playful phrasing, and layout safeguards without changing the English homepage. Some shared data, such as customer groupings, still comes from the English shared module because it is reference data rather than localized UI.

## Sync guidance

- Keep visible UI copy inside this fork or behind the passed `translate` function.
- Shared customer/product data imports are allowed when the data itself is not locale-specific.
- Pull bug fixes from the source component when they affect behavior, animation, or accessibility.
- Do not move Korean-specific CTA, pricing, or FAQ rendering back into the English shared component.

## Used by

Registered through `getKoreanSharedDescriptors()` in `src/pages/ko/_KoreanHome.tsx`.
