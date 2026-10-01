# Museum

Components for [/museum](/museum). Content lives in Strapi (`museum-artifact`, `museum-exhibit`, `museum-category`, `museum-type`, `museum-collection`); data hooks are in `src/hooks/useMuseum.ts`.

- `MuseumCard` – image card used for artifacts and exhibits. Props: `to`, `image`, `title`, `meta`, `number` (optional placard number, shown as "No. 003". The lobby passes the Strapi ID, so a number never changes), `newWindow`.
- `MuseumMenu` – `TreeMenu` of exhibits and artifacts for the detail pages' left sidebar.
- `ArtifactForm` / `useArtifactForm()` – add or edit an artifact in a window.
- `ExhibitForm` / `useExhibitForm()` – curate an exhibit: pick artifacts, drag to order, add a label per stop.

Only show the form triggers to `useUser().isModerator`; Strapi enforces the same role.

## Lobby (`src/pages/museum/index.tsx`)

- **Header** – each category and collection gets its own hog and intro line from `WINGS`, keyed by slug. A Strapi `description` replaces the intro line. A slug that is not in `WINGS` gets the lobby hog. The "Free admission" starburst shows on the lobby only.
- **Exhibits** – on the lobby only. The exhibit with `featured` set (or the first one) shows as "Now showing". Other exhibits show in a horizontal strip below it.
- **Made by** – crests for the teams in `CREATIVE_TEAMS`, through `SmallTeam` with `variant="crest"`.
