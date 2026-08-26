# SideProjects

Shared utilities and components behind the side projects gallery at `/side-projects` (`src/pages/side-projects.tsx`).

## Data contract

Projects live in the Squeak Strapi `side-projects` collection (same backend as `/events`) and are fetched client-side.

Fields (`SideProject`):

| Field | Required | Notes |
| --- | --- | --- |
| `id` | no | Strapi entry id |
| `title` | yes | Project name |
| `description` | no | One-liner shown on the card |
| `date` | no | `YYYY-MM-DD`; the date the project was added. Not used for ordering – the gallery rotates in a daily-seeded shuffle |
| `projectAuthor` | yes | Creator's full name; used to match their community profile |
| `authorGitHub` | no | GitHub username; preferred profile match key, also used for avatar fallback |
| `alumni` | no | Overrides the automatic current-team/alumni detection |
| `teamLink` | no | Fallback creator link when no community profile matches |
| `githubUrl` | no* | Repo URL |
| `liveUrl` | no* | Live app URL. *At least one of `githubUrl`/`liveUrl` is required – cards link to `liveUrl \|\| githubUrl`. Use relative URLs for pages on posthog.com |
| `projectThumbnail` | no | Optional upload (PNG, JPG, WebP, or GIF) shown as the card image; cards without one use `SideProjectGraphic` |
| `tags` | no | Lowercase kebab-case tags (json array); folded through `TAG_ALIASES` for the filter bar |

## Exports

- `useSideProjects()` – client-side fetch of all projects from Strapi, plus `loading`, `refreshProjects`, and `deleteProject`.
- `useCreatorProfiles()` – static query for all community (Squeak) profiles.
- `findCreatorProfile(profiles, { projectAuthor, authorGitHub })` – matches by GitHub username first, then full name.
- `SideProjectGraphic` – card header adapted from `EventGraphic`: profile color, `font-squeak` title and creator, circular portrait, and a PostHog + job-title bar.
- `SideProjectThumbnail` – card header for projects with an uploaded image: the image fills the card with a compact identity overlay (title, creator, role, portrait) on a bottom gradient.
- `normalizeTags(tags)` – dedupes and folds tags through `TAG_ALIASES` so the filter bar stays scannable. Keep raw tags in any search haystack so aliased one-offs stay findable.
- `isAlumniProject(profiles, project)` – the `alumni` flag wins; otherwise a profile with no small team is treated as alumni.
- `SideProjectForm` – the add/edit flow (see below).

## Contribution flow

Adding, editing, and deleting is gated to signed-in team members via the same `isModerator` check as `/events` (dev builds bypass the gate so previews can exercise the flow). Writes go straight to Strapi:

1. `SideProjectForm` collects the fields, optionally uploading a featured image (Squeak `uploadImage` with the user's JWT).
2. Submit `POST`s a new entry or `PUT`s the edited one to `/api/side-projects`, authorized with the user's JWT; the gallery refreshes on success.

The page opens the form in a window via `addWindow` (same pattern as community sign-in); each card shows Edit and Delete buttons on hover (moderators only).
