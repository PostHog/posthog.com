# AI adoption report

The report shows monthly organization shares for models, labs, provider diversity, and frameworks. The selected month sets the ranking and the end of each chart. Expand a row to read its monthly values. Changes use percentage points.

The Gatsby page passes a series for each public label. Each point has a UTC month and a percentage from 0 to 100. A null percentage means the share is unavailable. An empty report shows an availability message.

For local design review, run `AI_ADOPTION_PREVIEW_DATA=true pnpm start`. The leaderboard PR preview sets the same flag. It generates ten months of illustrative rankings at build time and labels the report as synthetic. Model and lab rows use the site's existing brand marks.
