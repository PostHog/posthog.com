# Standard.site

[Standard.site](https://standard.site) lexicons publish the PostHog blog to the AT Protocol network (the same network as Bluesky), making it discoverable, subscribable, and full-text searchable by atproto readers/search engines — as records owned on PostHog's own PDS, under the `posthog.com` identity.

A *publication* is a collection (the blog); a *document* is an individual post within it.

## Identity

| | |
|---|---|
| DID | `did:plc:go7eemqz4y5nhonj4kg5w2p6` |
| PDS | `milkcap.us-west.host.bsky.network` (resolved at runtime) |
| Publication | `at://did:plc:go7eemqz4y5nhonj4kg5w2p6/site.standard.publication/blog` |

## Publication (already live)

The blog is registered as a `site.standard.publication` (`url: https://posthog.com/blog`) and verified by the file **`static/.well-known/site.standard.publication/blog`**, which serves the publication's AT-URI at `https://posthog.com/.well-known/site.standard.publication/blog`. This is a one-time record; it doesn't need re-creating.

## Documents (per blog post)

Two pieces, both keyed off the **same deterministic rkey** = the post's filename (= the last segment of its `/blog/<slug>`). Blog slugs are always `/blog/<filename>` with no frontmatter overrides, so the rendered tag and the record always agree on the AT-URI — no build-time PDS lookup needed.

1. **`<link rel="site.standard.document">` tag** — emitted in each post's `<head>` by `src/templates/BlogPost.tsx` → `src/components/seo.tsx` (`documentRkey` prop). Gated to `/blog/` posts only, since `BlogPost.tsx` is shared with other sections. No PDS dependency; works for every post including future ones, automatically.

2. **`site.standard.document` records** — created/updated at build time by `gatsby/standardSite.ts`, called from `gatsby/onPostBuild.ts`. For every `/blog/` post it writes a record with `site`, `path`, `title`, `description`, `publishedAt`, `tags`, and a plain-text `textContent` (full body). It is **changed-only**: a build with no blog changes writes nothing.

A manifest of everything the sync would write is always emitted to **`public/standard-site-documents.json`** for inspection.

### How the sync runs

| Env var | Effect |
|---|---|
| `AWS_CODEPIPELINE=true` | Production build → sync runs (this is the normal CI path). |
| `STANDARD_SITE_SYNC=true` | Forces the sync to run in any build (e.g. locally). |
| `STANDARD_SITE_DRY_RUN=true` | Computes records + writes the manifest, but makes **no** PDS calls. |
| `BSKY_APP_PASSWORD` | A `posthog.com` Bluesky app password. Required for real writes; if absent the sync logs and no-ops (never fails the build). |

The sync never throws fatally — any error is logged and the build continues.

### CI setup (one time)

Add **`BSKY_APP_PASSWORD`** as a secret in the production build environment (AWS CodePipeline). Generate it while signed in as `posthog.com` at https://bsky.app/settings/app-passwords. Once set, every production deploy keeps the document records in sync (just like the RSS feed regenerates — but as authenticated PDS writes).

### Local preview (no writes)

```bash
STANDARD_SITE_SYNC=true STANDARD_SITE_DRY_RUN=true BSKY_APP_PASSWORD=dummy pnpm build
# then inspect:
cat public/standard-site-documents.json | head
```

(`BSKY_APP_PASSWORD` isn't actually used in dry-run, but the var keeps the gate happy without one.)

## Verifying

Confirm a document record exists (no auth):

```bash
curl "https://milkcap.us-west.host.bsky.network/xrpc/com.atproto.repo.getRecord?repo=did:plc:go7eemqz4y5nhonj4kg5w2p6&collection=site.standard.document&rkey=clickhouse-vs-snowflake"
```

Confirm the rendered tag matches (after deploy):

```bash
curl -sL https://posthog.com/blog/clickhouse-vs-snowflake | grep site.standard.document
```

The `<link>` href, the record's AT-URI, and `at://<DID>/site.standard.document/clickhouse-vs-snowflake` should all match. Browse records at https://pdsls.dev.

## Adding more publications later

`/founders`, `/newsletter`, `/product-engineers` could each become their own publication: create a `site.standard.publication` record with a distinct rkey + `url`, add a verification file at `static/.well-known/site.standard.publication/<name>`, and extend the document sync/tag logic to that section.

## Limitations

- `textContent` is best-effort plain text from rendered HTML; component-heavy MDX posts may have partial body text (same limitation the RSS feed has).
- The lexicon has no per-document author yet, so the publication ("PostHog Blog") is the author.
- Orphan records (from deleted/renamed posts) are cleaned up on the next sync, but skipped with a warning if that would delete >20% of records at once (guards against a partial/broken query).
