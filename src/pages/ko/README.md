# Korean homepage experiment

This directory contains the isolated `/ko` homepage test.

The implementation intentionally does not modify shared homepage or desktop components such as:

- `src/components/Desktop`
- `src/components/Home/Test`
- `src/components/TaskBarMenu`

Instead, `/ko/index.tsx` renders the local `_KoreanHome.tsx` copy with local translation helpers from
`_translations.ts`. The app shell uses `/ko`-scoped copies in `components/KoreanDesktop` and
`components/KoreanTaskBarMenu` when the current pathname starts with `/ko`. This keeps the Korean experiment easy to
roll back by removing this directory and the `/ko` branch in `src/components/Wrapper/index.tsx`, and avoids changing the
English homepage test surface.

Translation source: Google Sheet `1Rm9ttecZWmsFCQURJ8xmaWNkvejfmUy80tS5owUwydE`.

Rules:

- Use translated Korean text only when the sheet has a Korean value.
- Leave untranslated rows in the original English.
- Keep translations scoped to this directory unless the Korean page graduates from experiment to shared production
  behavior.
