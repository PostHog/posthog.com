# MCPPage

The page at `/mcp`. It has two readers: a person, and the agent that person asked to compare MCP servers.

## Files

- `index.tsx`: the page. A small "Are you an agent?" link in the header swaps the page for the agent brief. The brief has a "Back to the page for humans" link.
- `agentBrief.ts`: the agent brief. `buildMcpBrief()` returns plain Markdown.
- `agentBrief.test.ts`: checks the brief against the docs. Run `node --test src/components/MCPPage/agentBrief.test.ts`.
- `WaitingRoom.tsx`: the closing section. Magazine covers for agents that wait to be tool-called.

## The agent brief

One source, two ways in:

1. The build writes it to `/mcp.md` (`generateMcpMd` in `gatsby/rawMarkdownUtils.ts`), with the build date and the live tool list from `src/data/mcp-tools.json`.
2. The "Are you an agent?" link in the header renders the same text on the page.
3. `middleware.ts` serves `/mcp.md` as `text/markdown` when an agent fetches `/mcp` (`Accept: text/markdown`, or a user agent such as `Claude-User`). `/mcp` is in the middleware `config.matcher`, and `middleware.test.ts` covers it.
4. The page adds `<link rel="alternate" type="text/markdown" href="https://posthog.com/mcp.md">` with Helmet. `seo.tsx` does not add it, because `/mcp/leaderboard` has no Markdown version.
5. `llms.txt` links to `/mcp.md` in its "MCP and AI tools" instruction (`generateLlmsTxt`).

Coding agents such as Claude Code, Cursor, and Copilot ask for Markdown, and Codex follows the `alternate` link. Chat assistants such as ChatGPT, the Claude app, and Perplexity ask for HTML, so they read the page for humans and not the brief.

### Keep it from going stale

- Do not hard-code data that the build has. The tool count and categories come from the tool schema.
- Link to details that change often. Rate limit numbers, which client gets which tool mode, and the tested client list belong to the [MCP FAQ](/docs/model-context-protocol/faq).
- Put every param, header, URL, and command in backticks or a `bash` block. The test fails when one of them is no longer in `contents/docs` or the install schema, and when a linked docs page no longer exists.
- Write for the question an agent gets from a user: connect PostHog, use it, decide if it fits, fix a failure. The "What to do for your user" section and the client list answer those.
- Keep it factual. An agent will quote it to its user. No demo output and no claims that the docs do not make.

## The header

The header copies the `/ai` hero: a `SlotMachineText` bar ("Use PostHog without tabs, dashboards, sidebars, filter menus, clicking, the browser"), an h1 with a blue highlighted word, a short paragraph, the install card, and a hero image. The copy comes from the [MCP docs](/docs/model-context-protocol). Keep new copy true to the docs. The hero image floats (`framer-motion`, a 6-pixel rise over 4 seconds, off with reduced motion). From `lg`, a small "Are you an agent?" link sits under the image and opens the brief. Under `lg`, the same link sits at the end of the header.

The header is one grid, and the layout follows the reader width (container queries, not the screen):

- From `lg` (512 pixels): two columns. The copy and the install card take the left column. The image takes the right column and spans the rows. The image column grows from 10 rem to 16 rem, and from `3xl` the two columns are equal.
- Under `lg`: the image moves next to the title (8 rem), and the paragraph takes the full width. A phone visitor is unlikely to run the install command, so the install card is hidden and a "Read the setup guide" button links to the MCP docs instead.

## What the agent gets, and where it runs

`MCPConnectors` is a plain section. It comes right after the terminal demo (`MCPUseCases`, which comes after `MCPNoUI`). `WhatIsMCP` is one bordered card. It comes right after `MCPConnectors`. `Highlight` and `IconChipRow` are local copies of the `/ai` page parts, because the `/ai` versions are not shared. `Highlight` has a `red` prop for the "use PostHog" heading.

- The card, "Your agent gets the full spread" (large heading, red emphasis on "full spread"), has the toast hog on the right (above the heading on narrow cards) with the centered caption "PostHog. Part of the agentic breakfast of champions. See the leaderboard.", where only "leaderboard" links to the [MCP leaderboard](/mcp/leaderboard) (the leaderboard shows shares and never raw counts, and it refreshes daily: see `src/components/MCPLeaderboard/README.md`), and the heading with four chips (`whatItIs`, two rows of two) on the left. The card has generous padding and spacing, so it does not feel dense. The chips, in order: every product, read and write (one server for all the products, and the agent can ship changes such as a feature flag); the Scale and Enterprise add-on (approvals from the agent, and [enterprise-managed authorization](/docs/model-context-protocol/enterprise-managed-authorization) through your identity provider); uses your metric definitions (links to the [semantic layer](/docs/semantic-layer); every session gets the same answer); and light on context (the copy says "In most clients, the agent only looks tools up as it needs them (tokenminning is tokenwinning)"; true in CLI mode, the default in Claude, Claude Code, Cowork, and Codex, but not in tools mode, the default in Cursor). Divider lines separate the rows of chips (`IconChipRow` makes rows of two). A chip has no code mention, is plain, and fits in two lines. Cost is in the CTA and the FAQ. The card does not say what the MCP is, because the header does.
- `MCPConnectors`, "Which agents can use it?" (anchor `#installation`), has a smaller heading with no emphasis. Its description is plain text, with no URL: any client can connect, PostHog hosts the server, and sign-in routes you to your US or EU region. The endpoint URL is in the setup guides and in `/mcp.md`. Below are eight connector tiles with the client logo (`connectors`): ChatGPT (plugin), Claude (connector directory), Cursor, Codex, VS Code, Windsurf, and Zed (setup guides), and Gemini CLI (the AI plugin). Each tile has a right arrow, inline after the link label ("Setup guide", "Plugin", and so on). Two columns on narrow windows, four from the `3xl` reader width. Under the tiles, a "Want skills too?" note explains the [PostHog AI plugin](https://github.com/PostHog/ai-plugin): the plugin is the same MCP server plus more than 30 bundled PostHog skills in one install, for Claude Code, Codex, Cursor, and Gemini CLI (the plugin README also lists Antigravity, Grok, and Claude Cowork). Connecting by hand gives the same tools without the skills. It has no install card, because the header and the CTA boxes have one. Check the client list against the MCP overview before you change it.

## MCP Analytics

## The use cases

- "What can you do with the PostHog MCP?" has a two-column check list that is only as wide as its text (`w-fit`). Each item is an action a product engineer does, in plain words, and links to the docs page for that product (`checklist` holds the label and the link). Check that each link still exists when you change an item. To its right (from the `4xl` reader width) are the heading, the lede, the list, and a large `hog_bottle` picture with the caption "All your product context, bottled up for agents". On narrow windows, the picture sits under the list. The dark terminal follows below. The semantic layer has a chip in "Your agent gets the full spread", so the terminal has no note under it. The agents list (`MCPConnectors`) follows the terminal. The hero keeps the `headless_horsehog` image.
- The sections are separate blocks with equal gaps. The only divider line in the body is above this section (`border-t`), so it separates the no-UI section from the use cases.

## No UI, and customer quotes

`MCPNoUI`, "You don't need to use PostHog to use PostHog" (`#no-ui`), comes right after the header. It is a plain section, not a colored box, and it has no install card (the header and the last CTA box have one).

From the `3xl` reader width, the section has two columns: the copy on the left and a card grid on the right. Narrow windows stack them.

- Left: the heading (red emphasis on "use PostHog") with the copy from the earlier live version of this page as the lede (it ends with a bold "That's where the MCP comes in."). Under the lede, a bordered box (`bg-primary`, `max-w-md`, the same width as the header install card, so their edges align) holds "But I like the PostHog UI" and a reply that links to the new navigation beta on the roadmap (`/roadmap?feature=today-rail-nav`) and to Team Surfaces with `SmallTeam`.
- Right: three small bordered cards in a grid. All three use `StoryCard`, so they have the same style, copied from the stat card of the customers page (`QuoteCard`): a title at the top left, the logo at the top right, the text (`text-sm`, `text-secondary`), and a link to the source at the bottom right ("Read the story" by default). From the `xl` reader width, the grid has two columns: the first quote gets the big card (two rows tall), and the second quote and the stat card stack next to it. On narrow windows, each card takes one row.
  - On a quote card, the title is the name and the role, and the text is the quote.
  - On the stat card, the title is a big number. It is the only larger text in the cards. `mcpStat` holds one fact from the blog post [How AI agents behave](/blog/how-ai-agents-behave): in one month, agents made 2.5 times more insights through the MCP than people made in the web app. The card has the PostHog logo, and its link says "Read the post" (`to` and `linkLabel` on `StoryCard`). Use only a number that a published post or story gives. Do not make one up.

The quotes come from `useCustomers`. Each is the `mcp` product quote (`quotes.<author>.products.mcp`) of a person in `mcpQuotes`. Use only a real quote from a published customer story, word for word. Mark a cut with `[…]`. Now there are two: SoundBoost (`contents/customers/soundboost.md`) and Qred (`contents/customers/qred.md`). Put the longest quote first, because it gets the big card. To add a quote, add the `mcp` product quote to the person in `useCustomers`, then add the person to `mcpQuotes`.

## The CTA boxes, and go deeper

Both boxes copy the "Try it" box of the `/ai` page: a tinted box with a border. `ctaBoxClassName` has the shape, and each box adds its color.

- `MCPSetupCTA`, "No PostHog in your app yet? Your agent can add it" (`#setup`), is green. It comes after "Go deeper", above the FAQ. The copy comes from "Install PostHog from chat" in the [MCP use cases](/docs/model-context-protocol/use-cases): the agent starts a cloud run of the [PostHog wizard](/docs/ai-engineering/ai-wizard), which makes the code changes and opens a pull request. No other part of the page says this. From the `3xl` reader width, the heading, the copy, and the install card take two of three columns, and the picture of the hedgehog toy in pieces (`Group_144404`) takes the third. The picture has the hover text "Mr. Potato Hog, now with context included." (`title`). The caption, "Some assembly required (by your agent)", has the same style as the header image caption (not italic). Narrow windows put the picture under the text, smaller.

- `MCPCTA`, "Don't keep your agent waiting" (`#connect`), is purple. It comes after the waiting room, at the end of the page. A small heading with the `StickerAi` sparkles and a short text on the left (the first line is "Get started – free.", and the text names the agents that the wizard sets up: Claude Code, Codex, Cursor, VS Code, and Zed), and the install card on the right (from the `3xl` reader width; narrow windows stack them). It has the bottom margin (`mb-20`), and a negative top margin (`-mt-6`) moves it closer to the waiting room.
- "Go deeper" (`MCPResources`) has the same heading size as "Which agents can use it?" (`text-2xl`, smaller than `SectionHeading`). It copies the "Agents that keep working" cards of the `/ai` page: three bordered cards, each with a colored icon, a title, one sentence, and a link that opens a docs window. It comes after `WhatIsMCP`. Each sentence says what the reader finds on the page, in plain words.

## FAQ

`MCPFaq` copies the FAQ of the `/ai` page: the `Accordion` component, one open item at a time, each answer with a link to the matching section of the [MCP FAQ](/docs/model-context-protocol/faq). It sits after `MCPSetupCTA`. Each answer is a short version of the docs answer. Check the docs before you change a number, such as a rate limit. A link anchor is the slug of a docs heading, so update the link when the heading changes.

## The waiting room

A heading with a hedgehog that sits on a divider line (the hog is shifted down 10% so its seat is on the line and its feet hang below). Under it, a row with all nine covers.

- The covers shuffle after mount (`useEffect`), so the server HTML and the first client render match. Until then, four empty boxes hold the space. Each page load shows the covers in a new order.
- The row is a horizontal scroll container with scroll snap. It shows four covers from the `2xl` reader width and two on narrow windows. A visitor scrolls it with a swipe or a trackpad, or with the previous and next buttons on each side of the row (centered on the covers). The row has a small padding at both ends (`px-2`, with `scroll-px-2` so the snap points match), and each cover has a gutter (`px-4`). The padding and the gutter give the shadows of the first and last covers room, because a scroll container clips anything that goes past its edge. The gutter is wider than the padding, so the tilted corner of the next cover does not show at the edge. At rest, the row shows only whole covers.
- The row loops. It holds three copies of the nine covers (`COPIES`), and the visitor stays in the middle copy. Before each button press, and after each scroll ends, the row jumps by one copy length to the identical position in the middle copy. The copy length is the cover width times the number of covers (`copyWidth`), not `scrollWidth / COPIES`, because of the padding. The jump check allows 1 pixel, because `scrollLeft` is a whole number and the cover width is not. The jump looks the same, so there is no end. The first and third copies are `aria-hidden` and not focusable. The buttons never turn off. A press moves one cover, to an exact cover boundary, and fast presses add up. When a press comes during a page, the target moves with the jump to the middle copy. The target stops at the last cover boundary, so very fast presses cannot go past the end of the row. With reduced motion, the row jumps and does not animate.
- In the wide layout, every second cover sits lower. The covers do not overlap: each has a gap. A cover that you point at or pick comes to the front (`z-index`).
- Each cover has its own tilt, from its position in the row. The tilt, shadow, and hover styles sit on the `<img>`, not on the button around it, so the shadow follows the image edge. On hover, the cover lifts and straightens. The motion runs only when the visitor allows motion (`motion-safe:`).
- A click or tap on a cover keeps it lifted and shows its caption under the row (`role="status"`, so a screen reader reads it). Each caption is one dry sentence about a headline on that cover. It does not address the reader.

To add a cover, add an entry to `magazines` with a title, an image, and a caption. The covers are 10:13. Use that ratio for a new cover.
