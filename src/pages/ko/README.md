# Korean homepage experiment

This directory contains the isolated `/ko` homepage test.

The implementation intentionally does not modify shared homepage or desktop components such as:

- `src/components/Desktop`
- `src/components/Home/Test`
- `src/components/Wrapper`
- `src/components/TaskBarMenu`

Instead, `/ko/index.tsx` renders the local `_KoreanHome.tsx` copy with local translation helpers from
`_translations.ts`. The app shell uses the `/ko`-scoped `src/components/Korean/KoreanWrapper`, which in turn uses
local copies in `src/components/Korean/KoreanDesktop` and `src/components/Korean/KoreanTaskBarMenu`. Gatsby selects
the Korean wrapper only for `/ko` routes. The Korean shell components live under `src/components/` rather than under
`src/pages/ko/` because Gatsby's page-creator only ignores files whose basename starts with `_` — keeping helper
modules like `KoreanDesktop/lottieAnimations.ts` under `src/pages/` causes the build to fail with
"A page component must export a React component".
This keeps the Korean experiment easy to roll back by removing this directory plus `src/components/Korean/` and
the small `/ko` route selection in `gatsby-browser.tsx` and `gatsby-ssr.js`, and avoids changing the English
homepage test surface.

Rules:

- Use translated Korean text only when the sheet has a Korean value.
- Leave untranslated rows in the original English.
- Keep translations scoped to this directory unless the Korean page graduates from experiment to shared production
  behavior.
