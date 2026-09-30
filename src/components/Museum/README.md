# Museum

Components for [/museum](/museum). Content lives in Strapi (`museum-artifact`, `museum-exhibit`, `museum-category`, `museum-type`, `museum-collection`); data hooks are in `src/hooks/useMuseum.ts`.

- `MuseumCard` – image card used for artifacts and exhibits. Props: `to`, `image`, `title`, `meta`.
- `ArtifactForm` / `useArtifactForm()` – add or edit an artifact in a window.
- `ExhibitForm` / `useExhibitForm()` – curate an exhibit: pick artifacts, drag to order, add a label per stop.

Only show the form triggers to `useUser().isModerator`; Strapi enforces the same role.
