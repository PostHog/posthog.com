# BuilderCommunityForm

A lightweight, no-login submission form for proposing a builder community to be listed on
[/cool-builder-communities](https://posthog.com/cool-builder-communities).

## How it works

The form does **not** write to any backend. On submit it fires a single PostHog analytics event and shows a thanks
message — the same pattern as `src/components/CommunityIncubatorForm.tsx`.

- **Event name:** `builder_community_submission`
- **Properties:** `communityName`, `location`, `website`, `type` (`builder-group` | `hacker-house` |
  `builder-collective`), `organizers`, `nextSessionLink`, `submitterName`, `email`, `notes`

## Reviewing submissions

Watch for `builder_community_submission` events in PostHog. To publish an approved submission, add an entry to
`src/data/builderCommunities.ts` (the template comment at the top of that file documents every field). Remember to
look up the lat/lng for the location so the community gets a pin on the map.

## Where it's used

Opened as an OS window from the "Submit a community" button on `src/pages/cool-builder-communities.tsx`. The window's
sizing is registered in `src/context/App.tsx` under the `'cool-builder-communities-add-a-community'` key, which must
match the `location.pathname` passed to `addWindow`.
