# SideProjects

Shared utilities and components behind the side projects gallery at `/side-projects` (`src/pages/side-projects.tsx`).

## Data contract

Projects are MDX files in `contents/side-projects/<slug>/index.mdx`. Frontmatter (`SideProjectFrontmatter`):

| Field | Required | Notes |
| --- | --- | --- |
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
| `filters.tags` | no | Lowercase kebab-case tags; folded through `TAG_ALIASES` for the filter bar |

## Exports

- `useCreatorProfiles()` – static query for all community (Squeak) profiles.
- `findCreatorProfile(profiles, { projectAuthor, authorGitHub })` – matches by GitHub username first, then full name.
- `Creator` – avatar + name (+ role) byline, linking to the community profile, `teamLink`, or GitHub.
- `SideProjectGraphic` – generated card art for projects without a thumbnail: deterministic profile color from the title, display type, creator avatar breaking out of a circle (adapted from `EventGraphic`).
- `normalizeTags(tags)` – dedupes and folds tags through `TAG_ALIASES` so the filter bar stays scannable. Keep raw tags in any search haystack so aliased one-offs stay findable.
- `isAlumniProject(profiles, frontmatter)` – frontmatter `alumni` flag wins; otherwise a profile with no small team is treated as alumni.
- `SideProjectForm` – the add-a-project flow (see below).
- `buildSideProjectMdx(values)` / `getNewProjectUrl(values)` / `getEditProjectUrl(relativePath)` – MDX generation and GitHub hand-off URLs. Frontmatter values are serialized as single-quoted YAML scalars.

## Contribution flow

Adding and editing is gated to signed-in team members via the same `isModerator` check as `/events` (dev builds bypass the gate so previews can exercise the flow). There is no write API:

1. `SideProjectForm` collects the fields, optionally uploading a featured image (Squeak `uploadImage` with the user's JWT).
2. Submit opens a GitHub "create new file" page prefilled via `getNewProjectUrl` – the tab is opened synchronously on submit (before the upload await) so popup blockers don't eat it; if blocked anyway, we fall back to same-tab navigation.
3. Committing the file on GitHub opens a normal pull request; the project appears in the gallery once merged.

Each card also shows an Edit pencil (moderators only) linking to GitHub's edit page for that MDX file.
