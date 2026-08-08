---
date: "2026-07-07"
title: "How to build a PostHog integration with the provisioning API"
featuredImage: https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/posthog-engineering-blog.png
featuredImageType: full
author:
  - matt-brooker
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
category: Engineering
tags:
  - Engineering
seo:
  metaTitle: "How to set up embedded analytics with the PostHog provisioning API"
  metaDescription: "I built a fake farm-website company on PostHog's provisioning API. Here's how it creates accounts for its users and reads their analytics back, with the gotchas I hit."
---

I live on a little farm and recently built a [website](https://creeksidefields.com/) to sell shares of hogs. My fellow farmers are better versed in the subtle arts of soil, plants, and animals than the [latest coding tool](/desktop), so I threw together a website builder for them: HogFarm.

Knowing who you're selling to is critical to generating demand, so wiring up PostHog for product analytics, session replay, and error reporting was a no-brainer. But farmers want to farm, not sign up for accounts and copy-paste API keys. So HogFarm provisions a PostHog account for each farm behind the scenes, then reads the analytics back into a dashboard the farmer sees without ever leaving HogFarm.

The code is [on GitHub](https://github.com/Brooker-Fam/hogfarm) and there's a [live version](https://hogfarm-guava-tri.vercel.app) you can click around. Here's how I built it.

![The HogFarm builder: a farmer enters their farm name and what they grow](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/builder_landing_8dd50079e6.png)

## Registering your OAuth client

To register my OAuth client, I added a small JSON file on my own domain and pointed PostHog at it. There's no signup form: the file's URL *is* my `client_id`. It's called a [Client ID Metadata Document](/docs/api/oauth#client-id-metadata-document-cimd), or CIMD.

It looks like this:

```json
{
  "client_id": "https://hogfarm-guava-tri.vercel.app/.well-known/posthog-client-v6.json",
  "client_name": "HogFarm",
  "redirect_uris": ["https://hogfarm-guava-tri.vercel.app/api/oauth/callback"],
  "token_endpoint_auth_method": "none",
  "grant_types": ["authorization_code"],
  "response_types": ["code"],
  "com.posthog": {
    "scopes": ["endpoint:read", "endpoint:write", "query:read", "session_recording:read", "sharing_configuration:write", "project:write"]
  }
}
```

The `client_id` has to be the exact URL the file is served from, or it won't register. The `com.posthog.scopes` list is a ceiling: tokens can never go above it, whatever an individual request asks for. These scopes are everything the dashboard needs later: reading the analytics back and embedding a session recording. More on both below.

Because HogFarm holds no secret (`token_endpoint_auth_method` is `"none"`), I use PKCE to prove the token exchange. I generate a random verifier and send only its SHA-256 hash with the first call. The verifier gets replayed at token exchange.

```ts
const verifier = base64url(randomBytes(32))
const challenge = base64url(sha256(verifier))
```

`"none"` makes HogFarm a *public* client, which is all it needs. If you want the GitHub grant endpoints, which hand PostHog a GitHub OAuth code so the user's GitHub tokens stay server-side, you need a *confidential* client instead: set `token_endpoint_auth_method` to `"private_key_jwt"`, publish a `jwks_uri`, and sign a short-lived assertion per request. A CIMD client can never hold a plain client secret, since there's no registration step where PostHog could hand you one.

With the file live, I register it. That's the call that turns the JSON into an OAuth app, and it's the first thing you do. The [provisioning docs have an interactive version](/docs/integrate/provisioning#register-your-client) where you paste your document URL and it registers for you, which is easier than assembling the call by hand.

What I'd flag is the response, because it's more useful than a bare success. It reports each check separately, so a broken setup tells you which piece is wrong instead of surfacing later as an opaque `401`, and a `capabilities` block spells out which endpoints you qualify for. Discovering that from a `403` three calls in is much less pleasant.

The one thing worth knowing up front: registration is per region. US and EU are separate deployments with separate databases, so if you serve both you register twice, and PostHog won't do the second one for you.

## Creating an account the farmer never sees

With HogFarm registered, the first call creates the farmer's PostHog account. I request the account on their behalf and PostHog provisions it in the background.

```ts
await fetch(`${HOST}/api/agentic/provisioning/account_requests`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    id: crypto.randomUUID(),
    email,
    name,
    client_id: clientId,
    code_challenge: challenge,
    code_challenge_method: "S256",
    scopes: ["endpoint:read", "endpoint:write", "query:read", "session_recording:read", "sharing_configuration:write", "project:write"],
    configuration: { region: "US", organization_name: farmName },
  }),
})
```

There are a few cases to handle for this response:

- **A new email** comes back as `{ type: "oauth", oauth: { code } }`. The account gets created and linked quietly, I get a code on the spot, and the farmer gets a welcome email to set their password.
- **An email that's already a PostHog user** comes back as `{ type: "requires_auth", requires_auth: { url } }`. They have to consent in the browser first, so I send them to `url` and PostHog redirects back to my `redirect_uri` with a code.

These are the only two cases: an email that already has a PostHog account always goes through the browser, whatever my app is allowed to do. Proving I control HogFarm is not the same as proving I control somebody's inbox, so PostHog will not quietly attach an existing account to me. Plan for the redirect as a normal branch.

## Getting the farmer's project key

The account exists but it's empty. Two calls fix that: one to trade the code for an access token, replaying the PKCE verifier to prove it's me, then another to provision the project. Here's the token swap:

```ts
const res = await fetch(`${HOST}/api/agentic/oauth/token`, {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({ grant_type: "authorization_code", code, code_verifier: verifier, client_id: clientId }),
})
const { access_token: accessToken, refresh_token: refreshToken } = await res.json()
```

The next call provisions a project:

```ts
await fetch(`${HOST}/api/agentic/provisioning/resources`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
  body: JSON.stringify({
    label_prefix: farmName,
    configuration: { project_name: `${farmName} site` },
  }),
})
```

The response carries `complete.access_configuration.api_key` (the `phc_` token) and `host`, plus a top-level `id`: the team id for the project it just created, which I hold onto for every read below (it shows up as `teamId`). That key goes into the farm site HogFarm generates, so visits start landing in PostHog right away.

Access tokens last an hour, so anything long-lived means holding onto the refresh token. I store both encrypted in Postgres with AES-256-GCM, and the key lives only in the environment, never in the database.

![The generated farm site, with the PostHog snippet already wired in](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/generated_farm_site_af6902b4a8.png)

## Reading the data back to the farmer

Now for the fun part, giving farmers access to useful info about their users. The dashboard reads through [Endpoints](/docs/endpoints): named saved queries you publish once and call by name, versioned and rate-limited as a first-class API. That's the right tool when the same query runs over and over, which is exactly what a dashboard does. At provision time I publish each read once with `endpoint:write`:

```ts
await fetch(`${HOST}/api/projects/${teamId}/endpoints/`, {
  method: "POST",
  headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "dashboard_trend",
    query: {
      kind: "HogQLQuery",
      query: `SELECT toDate(timestamp) AS d, count() AS c FROM events
              WHERE event = '$pageview' AND timestamp > now() - INTERVAL 7 DAY
              GROUP BY d ORDER BY d`,
    },
  }),
})
```

That publishes the seven-day trend; two more cover unique visitors and top pages. Endpoints live in the project, so I create all three in each farm's project right after I provision it. I also seed a week of demo pageviews at the same time, so a brand-new dashboard has something to show (a trap there, see below). From then on the dashboard just calls them by name with `endpoint:read`:

```ts
const res = await fetch(
  `${HOST}/api/projects/${teamId}/endpoints/dashboard_trend/run`,
  {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({ refresh: "force" }),
  },
)
const { results } = await res.json()
```

I didn't have the `refresh` in there at first, and the dashboard froze on an empty read for the first minute after provisioning. An Endpoint caches its result by default, so my very first call, fired before the seeded events had landed, cached an empty answer and kept handing it back, at the moment the dashboard needs to look alive. Adding `refresh: "force"` fixed it: it recomputes on every call, so the dashboard always reflects what's actually in the project. That default caching is the whole point of an Endpoint when a query runs constantly, but for a fresh project viewed a handful of times right after setup it was working against me. A busier dashboard would drop the `force` and let the cache do its job.

## Kicking off session replays

The farm site loads the PostHog snippet with session recording turned on, but that alone records nothing: a brand-new project is opted out at the project level, and the client-side switch can't override it. So at provision time I flip it on with `project:write`:

```ts
await fetch(`${HOST}/api/projects/${teamId}/`, {
  method: "PATCH",
  headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
  body: JSON.stringify({ session_recording_opt_in: true }),
})
```

Now every visit records. On the dashboard I play the most recent one inline. Finding it is one HogQL query, which is what `query:read` is for:

```ts
const recRes = await fetch(`${HOST}/api/projects/${teamId}/query/`, {
  method: "POST",
  headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
  body: JSON.stringify({
    query: {
      kind: "HogQLQuery",
      query: `SELECT session_id FROM raw_session_replay_events
              ORDER BY max_last_timestamp DESC LIMIT 1`,
    },
  }),
})
const [[recordingId]] = (await recRes.json()).results
```

The provisioning token also has `sharing_configuration:write`, so I flip on public sharing for that recording and get an embed token back:

```ts
const res = await fetch(
  `${HOST}/api/projects/${teamId}/session_recordings/${recordingId}/sharing/`,
  {
    method: "PATCH",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({ enabled: true }),
  },
)
const { access_token } = await res.json()
// /embedded is the one PostHog page built to be iframed
const embedUrl = `https://us.posthog.com/embedded/${access_token}`
```

I drop that URL in an iframe and the farmer watches real visitors move through their site. The recording lives in their own project; HogFarm just borrows a public view of the latest one. (A shared recording is viewable by anyone with the link, which is fine for a demo, but a real builder would gate or expire it.)

![The farmer's dashboard: pageview KPIs, a seven-day trend, an inline session replay, and top pages, all read live from their own PostHog project](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/analytics_dashboard_61b7b99cc4.png)

## The stuff that bit me

These are the things that weren't obvious until I hit them:

- **Your CIMD URL has to be reachable.** I deployed behind Vercel's default deployment protection and registration just failed. PostHog couldn't fetch the metadata document through the SSO gate. The registration endpoint tells you this directly now, as a failed `metadata_document` check, but if you're staring at one, open the `.well-known` URL in an incognito window and make sure it loads.
- **Register in both regions if you serve both.** US and EU are separate deployments with separate databases. Registering against `us.posthog.com` does nothing for `eu.posthog.com`, and PostHog won't do it for you. I only serve US, so I register once, but the day I add EU it's a second call.
- **Don't reach for `historical_migration` to seed backdated events.** I seed a week of demo pageviews so a new farm's dashboard isn't empty on day one, and my first instinct was the `historical_migration` flag since the timestamps are in the past. That flag routes the batch to a throttled ingestion pipeline that can take many minutes to become queryable, so the dashboard sat empty right after provisioning, the opposite of what I wanted. The regular capture pipeline takes backdated timestamps fine (it stores the event timestamp, not arrival time) and they show up in seconds. For a week-old seed, skip the flag.

## Give the gift of PostHog to your users

Check out the HogFarm repo and the provisioning docs to give your users access to data about their users.

- Code: [github.com/Brooker-Fam/hogfarm](https://github.com/Brooker-Fam/hogfarm)
- Docs: [Provisioning API](/docs/integrate/provisioning) and [OAuth + CIMD](/docs/api/oauth)
