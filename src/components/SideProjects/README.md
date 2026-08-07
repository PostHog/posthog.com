# SideProjects

Shared utilities and components behind the side projects gallery at `/side-projects` (`src/pages/side-projects.tsx`).

## Data contract

Projects live in the Squeak Strapi `side-projects` collection (same backend as `/events`) and are fetched client-side. `src/data/sideProjects.json` is the bundled seed: it renders immediately, stays up if the API is unreachable, and any seed entry whose title isn't in the API yet remains visible under the API results. `scripts/seed-side-projects.mjs` migrates the seed into Strapi.

Fields (`SideProject`):

| Field | Required | Notes |
| --- | --- | --- |
| `id` | no | Strapi entry id; seed entries don't have one until migrated |
| `title` | yes | Project name |
| `description` | no | One-liner shown on the card |
| `date` | no | `YYYY-MM-DD`; drives "newest first" ordering – undated legacy entries sort last |
| `projectAuthor` | yes | Creator's full name; used to match their community profile |
| `authorGitHub` | no | GitHub username; preferred profile match key, also used for avatar fallback |
| `alumni` | no | Overrides the automatic current-team/alumni detection |
| `teamLink` | no | Fallback creator link when no community profile matches |
| `githubUrl` | no* | Repo URL |
| `liveUrl` | no* | Live app URL. *At least one of `githubUrl`/`liveUrl` is required – cards link to `liveUrl \|\| githubUrl`. Use relative URLs for pages on posthog.com |
| `projectThumbnail` | no | Card image URL; omitted projects get a generated `SideProjectGraphic` |
| `tags` | no | Lowercase kebab-case tags (json array); folded through `TAG_ALIASES` for the filter bar |

## Exports

- `useSideProjects()` – client-side fetch of all projects with the seed fallback, plus `refreshProjects` and `deleteProject`.
- `useCreatorProfiles()` – static query for all community (Squeak) profiles.
- `findCreatorProfile(profiles, { projectAuthor, authorGitHub })` – matches by GitHub username first, then full name.
- `Creator` – avatar + name (+ role) byline, linking to the community profile, `teamLink`, or GitHub.
- `SideProjectGraphic` – generated card art for projects without a thumbnail: deterministic profile color from the title, display type, creator avatar breaking out of a circle (adapted from `EventGraphic`).
- `normalizeTags(tags)` – dedupes and folds tags through `TAG_ALIASES` so the filter bar stays scannable. Keep raw tags in any search haystack so aliased one-offs stay findable.
- `isAlumniProject(profiles, project)` – the `alumni` flag wins; otherwise a profile with no small team is treated as alumni.
- `SideProjectForm` – the add/edit flow (see below).

## Contribution flow

Adding, editing, and deleting is gated to signed-in team members via the same `isModerator` check as `/events` (dev builds bypass the gate so previews can exercise the flow). Writes go straight to Strapi:

1. `SideProjectForm` collects the fields, optionally uploading a featured image (Squeak `uploadImage` with the user's JWT).
2. Submit `POST`s a new entry or `PUT`s the edited one to `/api/side-projects`, authorized with the user's JWT; the gallery refreshes on success.
3. Editing a not-yet-migrated seed entry creates a Strapi entry that shadows the seed one by title.

The page renders the form in a `SideModal`; each card shows Edit and Delete buttons on hover (moderators only).
