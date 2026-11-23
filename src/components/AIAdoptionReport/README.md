# AI adoption report

The report shows models, labs, provider diversity, and frameworks as consecutive sections. A single month picker sets the ranking and the end of every chart. Each section has its own expandable rows and full ranking. Changes use percentage points.

The Gatsby page passes a series for each public label. Each point has a UTC month and a percentage from 0 to 100. A null percentage means the share is unavailable. An empty report shows an availability message.

Gatsby fetches `ai_adoption_public_leaderboard_monthly` at build time using the website's server-side `POSTHOG_APP_API_KEY`. Opening the report or changing the month uses the data from that build. As with the MCP leaderboard, builds without the key, including Cloudflare PR previews, have no report data.

Models use their lab's mark. Frameworks use their product or publisher mark. Grouped and unrecognized names use a neutral icon. In addition to the site's shared marks, the report uses artwork from [LobeHub Icons](https://github.com/lobehub/lobe-icons/tree/9752d967494e48d8f83f2808feb2b0207bf70997/packages/static-svg/icons) and the [Pi coding agent](https://pi.dev/favicon.svg). The SVG includes the LobeHub MIT license.
