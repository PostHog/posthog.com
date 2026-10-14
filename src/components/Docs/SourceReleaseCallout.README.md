# SourceReleaseCallout

Renders the alpha or beta callout at the top of a data warehouse source doc page.

## Why it exists

The release status of a source lives in `posthog/posthog`, as `releaseStatus` on the source's
`SourceConfig`. Before this component, each page under `contents/docs/cdp/sources/` carried its own
hardcoded callout, so every promotion out of alpha needed a docs PR. Over 700 pages drifted out of
date this way.

`gatsby/sourceNodes.ts` already fetches `/api/public_source_configs` at build time and creates a
`PostHogSource` node per source. That payload carries `releaseStatus`, so the callout can follow the
code instead of a person.

## How a page gets one

Nothing on the page itself. `src/templates/Handbook.tsx` reads `releaseStatus` from the
`PostHogSource` node that the page's `sourceId` frontmatter resolves to, and passes this component
to `ReaderView` as `beforeContent`. A page without a matching `sourceId` gets no callout.

## Props

| Prop | Type | Notes |
| --- | --- | --- |
| `releaseStatus` | `'alpha' \| 'beta' \| 'ga' \| null` | Renders nothing for `ga` or null. |

## Do not hardcode a release callout

A hardcoded alpha or beta callout under `contents/docs/cdp/sources/` goes stale, and now also
duplicates the automatic one. `scripts/check-source-release-callouts.js` fails CI on one. To change
the wording for every source, edit this component. To change one source's status, change
`releaseStatus` in `posthog/posthog`.
