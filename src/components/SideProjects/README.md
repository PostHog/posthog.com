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
| `projectThumbnail` | no | Optional upload (PNG, JPG, WebP, or GIF) shown as the card image – 16:9, 1280×720 recommended (see [Card image](#card-image)); cards without one use `SideProjectGraphic` |
| `tags` | no | Lowercase kebab-case tags (json array); folded through `TAG_ALIASES` for the filter bar |

## Card image

`SideProjectThumbnail` renders the upload as a plain `<img className="aspect-video w-full object-cover">`. There is no `srcset` and no resize step – Strapi stores the file, the card serves it as-is – so the uploaded dimensions are the dimensions that ship. Two things follow from that:

- **Recommend 16:9 at 1280×720, with 800×450 as the floor.** The grid (`grid-cols-1 @xl:grid-cols-2 @3xl:grid-cols-3 @5xl:grid-cols-4`, inside a `max-w-7xl` container) keeps cards small: measured in the browser, the image renders ~285px wide at 4-up in a maximized window, ~250–350px at 2-up and 3-up, and at most ~550px at 1-up in a narrow window. 1280×720 clears the widest of those on a 2× display and still costs little to download. Below 800×450 the common 2× card starts to look soft.
- **The bottom half is spoken for.** The identity overlay (title, creator, role, portrait) sits on a gradient that measures 46% of the image height at every card size, so detail low in the frame is covered. Anything off 16:9 is center-cropped by `object-cover`.

`SideProjectForm`'s "Featured image" hint states the same numbers – keep the two in sync.

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
