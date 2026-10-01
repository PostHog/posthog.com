# Museum

Components for [/museum](/museum). Content lives in Strapi (`museum-artifact`, `museum-exhibit`, `museum-category`, `museum-type`, `museum-collection`); data hooks are in `src/hooks/useMuseum.ts`.

- `MuseumCard` – image card used for artifacts and exhibits. The image is always cropped to 16:9; artifact and exhibit pages show it whole. Props: `to`, `image`, `title`, `meta`, `newWindow`.
- `MuseumMenu` – `TreeMenu` of exhibits and artifacts for the detail pages' left sidebar. `PERMANENT_EXHIBITS` lists exhibits that are pages in this repo (see below) rather than Strapi entries.
- `ArtifactForm` / `useArtifactForm()` – add or edit an artifact in a window.
- `ExhibitForm` / `useExhibitForm()` – curate an exhibit: pick artifacts, drag to order, add a label per stop.

Only show the form triggers to `useUser().isModerator`; Strapi enforces the same role.

## Lobby (`src/pages/museum/index.tsx`)

- **Header** – each category and collection gets its own hog and intro line from `WINGS`, keyed by slug. A Strapi `description` replaces the intro line. A slug that is not in `WINGS` gets the lobby hog. The "Free admission" starburst shows on the lobby only.
- **Exhibits** – on the lobby only. The exhibit with `featured` set (or the first one) shows as "Now showing". Other exhibits show in a horizontal strip below it.
- **Made by** – crests for the teams in `CREATIVE_TEAMS`, through `SmallTeam` with `variant="crest"`.

## Permanent exhibits

Some exhibits are too custom for a Strapi exhibit (charts, tables, people walls), so they're pages under `src/pages/museum/exhibits/`:

- `evolution.tsx` – *The Evolution of Marketing*, a data-driven walk through how marketing grew from 2020 to 2026. All copy and numbers are constants at the top of the file; the 2026 figures are year to date (September 30, 2026) and need a refresh if the numbers go stale.
