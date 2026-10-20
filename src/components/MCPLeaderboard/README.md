# MCPLeaderboard

The page at `/mcp/leaderboard`. It shows which models, clients, spec versions, and tools agents use with the PostHog MCP server. Every number is relative: shares, error rates, latency, and a growth index. The page never shows raw counts. Each chart has a note that says what it measures. Keep the notes in sync with the queries.

## Data flow

1. The PostHog MCP server sends a `$mcp_tool_call` event for each tool call to project 2 (MCP analytics dogfooding).
2. Two endpoints in project 2 run HogQL over those events and refresh daily:
   - [`mcp_public_leaderboard_weekly`](https://us.posthog.com/project/2/endpoints/mcp_public_leaderboard_weekly): every facet, by week, since June 22, 2026
   - [`mcp_public_leaderboard_daily`](https://us.posthog.com/project/2/endpoints/mcp_public_leaderboard_daily): the charted facets, by day, for the last 60 days. The model facets only have rows from September 9, 2026, when `$mcp_llm_model` was first captured.
3. `sourceMCPLeaderboard` in `gatsby/sourceNodes.ts` calls both endpoints at build time, in one request each. A personal API key cannot use OFFSET, so the build asks for up to 50000 rows and fails the fetch if there are more. The build keeps the full history only for the weekly facets the page charts over time (`total` and `model_vendor`) and for the daily facets, the last two weeks for `model` and `client` (the lists show the change from the week before), and the latest week for the rest. Every chart covers the same last 60 days (`MAX_DAYS`), and every chart is daily, except the growth chart, which shows every week since June 22, 2026. A stacked chart starts at its first period with data and shows a later empty period as a gap, so the model charts start on September 9, 2026, until the window passes that day. The result is one `McpLeaderboard` node (schema in `gatsby/createSchemaCustomization.ts`).
4. `src/pages/mcp/leaderboard.tsx` queries the node and renders this component.

The fetch needs `POSTHOG_APP_API_KEY`. Put it in `.env.development.local` locally, which git ignores. Do not put it in `.env.development`, which git tracks. If the key is not set, or a fetch fails, the node is not created and the page shows a "No data in this build" state. The build does not fail.

**The endpoint output is public.** Anything the endpoints return ends up in the page data. Do not add absolute counts.

## Row shape

Both endpoints return one row per period, facet, group, and label:

| Column | Meaning |
| --- | --- |
| `week` | Monday of the week for weekly facets, or the day for `*_daily` facets, as `YYYY-MM-DD`. Complete periods only. |
| `facet` | Weekly: `total`, `client`, `model`, `model_validation`, `model_vendor`, `model_vendor_by_client`, `protocol_version`, `auth_method`, `tool_category`, `tool`, `model_source`, `intent_source`, `error_type`. Daily: `total_daily`, `model_daily`, `model_vendor_daily`, `protocol_version_daily`, `auth_method_daily`, `model_source_daily`. |
| `grp` | Empty, except for `model_vendor_by_client`, where it is the client |
| `label` | The value. Labels with fewer than 25 users in a period fold into `Other`. |
| `calls_pct` | Share of tool calls in the period, facet, and group. Adds up to 100. |
| `users_pct` | Share of users in the period with at least one call. Does not add up to 100. Null for `Other`. |
| `error_rate_pct` | Failed calls as a share of the label's calls. |
| `p50_ms`, `p95_ms` | Call duration. Null for `Other`. |
| `calls_index`, `users_index` | `total` facet only. The first week is 100. |

`error_type` shares are shares of failed calls only. `model_validation` has the same rows as `model`, except that `error_rate_pct` counts only calls rejected for bad arguments (`$mcp_error_type = 'validation'`). Between October 2 and 7, 2026, the server started to file bad arguments as `validation`. Before that, most of them were `internal`, so the split before then is not comparable.

The queries bucket by week and day in the project's time zone (Pacific).

## Files

- `index.tsx`: page layout and sections
- `data.ts`: selectors, lab and client-maker maps, and colors. Color means one of three things: a lab (`LAB_HUES`, and `labColor` wherever a lab is a single fill), a failure (`errorColor`), or anything else (`dataColor`, and `rampColors` for charts with several labels). Do not add colors outside these. Unknown labels are dropped and the remaining calls shares are renormalized to 100. Calls shares add up, so `groupedSeries` can safely sum clients into makers. `labShades` gives each lab's models shades of one color.
- `BrandLogo.tsx`: marks for AI labs (Anthropic, OpenAI, xAI, Google, Cursor) and agent apps (opencode, Amp, OpenClaw, Linear, Devin, MCPorter, Executor), plus a laptop for custom code. The scoreboard and the model list show the lab, and the harness list shows the app, or its maker if the app has no mark. Paths are from Simple Icons (CC0), and xAI, Amp, OpenClaw, and Devin are from LobeHub icons (MIT). MCPorter's mark comes from the social card in its repo (MIT). Executor only publishes a raster mark, so it is a PNG (its favicon, MIT) in `src/images/mcp-leaderboard/`.
- `categories.ts`: the icon (a PostHog product's icon and color, or its own) and the docs page for each MCP tool category in `src/data/mcp-tools.json`. The "Tool categories" labels link to these pages. A new category shows no icon and no link until it is added here.
- `CampfireHog.tsx`: an easter egg next to the install CTA. Each click wiggles the hog and escalates its complaint, then gives a link to a random fun page (`ESCAPES`) on most clicks and cowboy wisdom (`WISDOM`) on the rest. Keep the links pointing at pages that exist.
- `charts.tsx`: `StackedShareChart` and `LineChart` (chart.js), plus `ShareBars` and `SplitBar` (plain HTML, so they follow the theme)

## Changing the queries

Update the endpoints in PostHog, and keep these in sync:

- Client labels mirror `products/mcp_analytics/backend/mcp_harness.py` in the PostHog repo, with a few extra labels for open-source agents and "Custom code". Since v9, the weekly endpoint also names apps that hid in "Custom code" or "Other" because they send a generic client name: Devin and Cloudflare MCP Portal (by user agent), Claude.ai (`claude` with the `Claude-User` agent), Claude artifacts, opencode (by user agent), Paperclip, Executor, and MCPorter. The harness list leaves out "Custom code", and its note gives the share of it and of "Other". `CLIENT_MAKER` in `data.ts` maps each label to its maker. A new label with no entry shows as "Other apps".
- The model normalization and the model-to-lab regex are the same in both endpoints, and `modelVendor` in `data.ts` repeats the regex.
