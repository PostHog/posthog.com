# MCPPage

The page at `/mcp`. It has two readers: a person, and the agent that person asked to compare MCP servers.

## Files

- `index.tsx`: the page. A small "Are you an agent?" link in the header swaps the page for the agent brief. The brief has a "Back to the page for humans" link.
- `agentBrief.ts`: the agent brief. `buildMcpBrief()` returns plain markdown.
- `agentBrief.test.ts`: checks the brief against the docs. Run `node --test src/components/MCPPage/agentBrief.test.ts`.
- `WaitingRoom.tsx`: the closing section. Magazine covers for agents that wait to be tool-called.

## The agent brief

One source, two ways in:

1. The build writes it to `/mcp.md` (`generateMcpMd` in `gatsby/rawMarkdownUtils.ts`), with the build date and the live tool list from `src/data/mcp-tools.json`.
2. The "Are you an agent?" link in the header renders the same text on the page.
3. `middleware.ts` serves `/mcp.md` as `text/markdown` when an agent fetches `/mcp` (`Accept: text/markdown`, or a user agent such as `Claude-User`). `/mcp` is in the middleware `config.matcher`, and `middleware.test.ts` covers it.
4. The page adds `<link rel="alternate" type="text/markdown" href="https://posthog.com/mcp.md">` with Helmet. `seo.tsx` does not add it, because `/mcp/leaderboard` has no Markdown version.

### Keep it from going stale

- Do not hard-code data that the build has. The tool count and categories come from the tool schema.
- Link to details that change often. Rate limit numbers, which client gets which tool mode, and the tested client list belong to the [MCP FAQ](/docs/model-context-protocol/faq).
- Put every param, header, URL, and command in backticks or a `bash` block. The test fails when one of them is no longer in `contents/docs` or the install schema, and when a linked docs page no longer exists.
- Write for the question an agent gets from a user: connect PostHog, use it, decide if it fits, fix a failure. The "What to do for your user" section and the client list answer those.
- Keep it factual. An agent will quote it to its user. No demo output and no claims that the docs do not make.

## The header

The header copies the `/ai` hero: a `SlotMachineText` bar ("Use PostHog without tabs, dashboards, sidebars, filter menus, clicking, the browser"), an h1 with a blue highlighted word, a short paragraph, the install card, and a hero image. The copy comes from the [MCP docs](/docs/model-context-protocol). Keep new copy true to the docs. The hero image floats (`framer-motion`, a 6 px rise over 4 seconds, off with reduced motion). From `lg`, a small "Are you an agent?" link sits under the image and opens the brief. Under `lg`, the same link sits at the end of the header.

The header is one grid, and the layout follows the reader width (container queries, not the screen):

- From `lg` (512 px): two columns. The copy and the install card take the left column. The image takes the right column and spans the rows. The image column grows from 10 rem to 16 rem, and from `3xl` the two columns are equal.
- Under `lg`: the image moves next to the title (8 rem), and the paragraph takes the full width. A phone visitor is unlikely to run the install command, so the install card is hidden and a "Read the setup guide" button links to the MCP docs instead.

## What it is, and where it runs

`WhatIsMCP` copies the "PostHog AI in PostHog Web" and "PostHog in your coding agent" cards of the `/ai` page: two bordered cards side by side (2:1, from the `3xl` reader width), each with a title that has one highlighted word, a short text, icon chips or the install card, and a footer under a divider. `Highlight` and `IconChipRow` are local copies, because the `/ai` versions are not shared.

- The left card, "What is the PostHog MCP?", says that the hosted endpoint carries PostHog data into any MCP client, and lists the clients. It has a link to the client setup section of the [MCP overview](/docs/model-context-protocol#get-started-in-30-seconds), four chips (light on context, read-only, free to connect, pin it to a project), the `hog_bottle` image with the caption "PostHog, bottled for any MCP client." The Context & MCP team crest sits at the top right of the card, beside the title and the description (`SmallTeam` with `variant="crest"`, slug `context-and-mcp`). It links to the team page. The team name is visible to screen readers only. Check the client list against the MCP overview before you change it.
- The right card, "Where does it run?", has the hosted endpoint, the OAuth region routing, a leaderboard note with the crown sticker from the leaderboard page (the leaderboard shows shares and never raw counts, and it refreshes daily: see `src/components/MCPLeaderboard/README.md`), and an enterprise footer. It has no install card, because the header and the closing box have one. The old `#installation` anchor points at it.

## MCP Analytics

`MCPAnalyticsStrip` is a small strip with a blue tint and border between "What is the PostHog MCP?" and "What can you do with it?". It is only about MCP Analytics: a one-line heading for people who run their own MCP server, a short sentence, and a plain link (no inner box) to the [MCP Analytics docs](/docs/mcp-analytics). Keep the copy true to the docs.

## The use cases and the closing box

- "What can you do with it?" has a two-column check list that is only as wide as its text (`w-fit`). To its right (from the `4xl` reader width) are the heading, the lede, the list, and a large potato hog picture with a one-line caption. The picture cross-fades between the first and last potato hog images every 3.5 seconds (`transition-opacity`; the two images share one box). With reduced motion, it shows the first image and does not change. On narrow windows, the picture sits under the list. The dark terminal follows below. The hero keeps the `headless_horsehog` image.
- The sections are separate blocks with equal gaps. There is no divider line between "What is the PostHog MCP?" and "What can you do with it?".

## You don't need to use PostHog to use PostHog

`NoUISection` is a plain section, not a colored box. A divider line under it (`border-b`) separates it from the closing box. Under a `SectionHeading`, the copy and the "But I like the PostHog UI" note are on the left, and four small complaint cards are on the right (from the `3xl` reader width, two rows that fill the height of the left column; narrow windows stack them at their own height). The copy comes from the earlier live version of this page. A card has the quote, the author's handle, and a green "Should've used MCP" badge, in the flat card style of "Go deeper". The note links to a team member with `TeamMember`. The cards are made-up quotes and are a joke, so do not change them into real quotes.

## The closing box, and go deeper

- `MCPCTA` copies the "Try it" box of the `/ai` page: a tinted box with a border (`purple`), a small heading and a short text on the left (the first line is "Get started – free."), and the install card on the right (from the `3xl` reader width; narrow windows stack them).
- "Go deeper" (`MCPResources`) copies the "Agents that keep working" cards of the `/ai` page: three bordered cards, each with a colored icon, a title, one sentence, and a link that opens a docs window. It comes after the closing box.

## The FAQ

`MCPFaq` copies the FAQ of the `/ai` page: the `Accordion` component, one open item at a time, each answer with a link to the matching section of the [MCP FAQ](/docs/model-context-protocol/faq). It sits after "Go deeper". Each answer is a short version of the docs answer. Check the docs before you change a number, such as a rate limit. A link anchor is the slug of a docs heading, so update the link when the heading changes.

## The waiting room

A heading with a hedgehog that sits on a divider line (the hog is shifted down 10% so its seat is on the line and its feet hang below). Under it, a row with all eight covers.

- The covers shuffle after mount (`useEffect`), so the server HTML and the first client render match. Until then, four empty boxes hold the space. Each page load shows the covers in a new order.
- The row is a horizontal scroll container with scroll snap. It shows four covers from the `2xl` reader width and two on narrow windows. A visitor scrolls it with a swipe or a trackpad, or with the previous and next buttons on each side of the row (centered on the covers). The row has a small padding at both ends (`px-2`, with `scroll-px-2` so the snap points match), and each cover has a gutter (`px-4`). The padding and the gutter give the shadows of the first and last covers room, because a scroll container clips anything that goes past its edge. The gutter is wider than the padding, so the tilted corner of the next cover does not show at the edge. At rest, the row shows only whole covers.
- The row loops. It holds three copies of the eight covers (`COPIES`), and the visitor stays in the middle copy. Before each button press, and after each scroll ends, the row jumps by one copy length to the identical position in the middle copy. The copy length is the cover width times the number of covers (`copyWidth`), not `scrollWidth / COPIES`, because of the padding. The jump check allows 1 px, because `scrollLeft` is a whole number and the cover width is not. The jump looks the same, so there is no end. The first and third copies are `aria-hidden` and not focusable. The buttons never turn off. A press moves one page (the number of covers in view), to an exact cover boundary, and fast presses add up. With reduced motion, the row jumps and does not animate.
- In the wide layout, every second cover sits lower. The covers do not overlap: each has a gap. A cover that you point at or pick comes to the front (`z-index`).
- Each cover has its own tilt, from its position in the row. The tilt, shadow, and hover styles sit on the `<img>`, not on the button around it, so the shadow follows the image edge. On hover, the cover lifts and straightens. The motion runs only when the visitor allows motion (`motion-safe:`).
- A click or tap on a cover keeps it lifted and shows its caption under the row (`role="status"`, so a screen reader reads it). Each caption is one dry sentence about a headline on that cover. It does not address the reader.

To add a cover, add an entry to `magazines` with a title, an image, and a caption. The covers are 10:13. Use that ratio for a new cover.
