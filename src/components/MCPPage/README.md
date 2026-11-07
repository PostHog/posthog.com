# MCPPage

The page at `/mcp`. It has two readers: a person, and the agent that the person asked to compare MCP servers.

## Files

- `index.tsx`: the page and most of its sections.
- `PromptDemo.tsx`, `promptDemo.data.ts`: the prompt list and the terminal demo.
- `WaitingRoom.tsx`: the magazine covers near the end of the page.
- `Highlight.tsx`: the highlighted word in headings (`red` for red). It is a copy of the `/ai` part, because that one is not shared.
- `agentBrief.ts`: `buildMcpBrief()` returns the agent brief as Markdown.
- `agentBrief.test.ts`, `promptDemo.test.ts`: run them before you change the brief or the demo.

```bash
node --test src/components/MCPPage/agentBrief.test.ts src/components/MCPPage/promptDemo.test.ts
```

## Section order

`MCPHeader` → `MCPNoUI` → `MCPUseCases` (checklist and `PromptDemo`) → `MCPConnectors` → `WhatIsMCP` → `MCPResources` → `MCPSetupCTA` → `MCPFaq` → `WaitingRoom` → `MCPCTA`.

The layout uses container queries on the reader width (`@lg/reader-content`, and so on), not media queries.

## The agent brief

One source, used in five places:

1. The build writes it to `/mcp.md` (`generateMcpMd` in `gatsby/rawMarkdownUtils.ts`), with the build date and the tool list from `src/data/mcp-tools.json`.
2. The "Are you an agent?" link in the header shows the same text on the page.
3. `middleware.ts` serves `/mcp.md` when an agent fetches `/mcp` (`Accept: text/markdown`, or a user agent such as `Claude-User`). `middleware.test.ts` covers it.
4. The page adds a `<link rel="alternate" type="text/markdown">` with Helmet. `seo.tsx` doesn't, because `/mcp/leaderboard` has no Markdown version.
5. `llms.txt` links to it (`generateLlmsTxt`).

Coding agents (Claude Code, Cursor, Copilot) ask for Markdown, and Codex follows the `alternate` link. Chat assistants (ChatGPT, the Claude app, Perplexity) ask for HTML, so they read the page for humans.

To keep the brief true:

- Don't hard-code data that the build has, such as the tool count and categories.
- Link to facts that change often (rate limits, tool modes per client, the tested clients) in the [MCP FAQ](/docs/model-context-protocol/faq). Don't copy them.
- Put every param, header, URL, and command in backticks or a `bash` block. The test fails when one is no longer in `contents/docs` or the install schema, or when a linked docs page is gone.
- Keep it factual. An agent quotes it to its user.

## The prompt demo

`PromptDemo` shows 4 prompts and a terminal. A click on a prompt starts a run that shows the MCP tool calls an agent makes, then its answer. The runs play in turn while the terminal is on screen, and stop on the prompt that the visitor picks. With reduced motion, each run shows its final state.

- **To add or change a run:** edit `flows` in `promptDemo.data.ts`. `PromptDemo` calculates the timings.
  - Use a real tool name, and a real argument name from the tool's input schema (`info <tool>` through the PostHog MCP). The test checks the tool names only, because `mcp-tools.json` has no input schemas.
  - Keep each run plain: a one-sentence question that a user would ask, and the tool that a user has for each step, in the order an agent would call them (for example, look up an ID before you use it).
  - Each answer must agree with the results above it. Keep each result short, so each call fits on one line.
  - Keep at least one run that writes. Now the signup run turns off a flag, and the dashboard run creates a dashboard and an insight.
- **Space:** in two columns, the prompts are on the left and the terminal (`h-80`) is on the right. They fit in one window together, and a click never scrolls the page. Think about this before you add a prompt or make the terminal taller. In one column, the terminal is below all the prompts, so a click on a prompt scrolls the terminal into view.
- **Analytics:** a click sends `ai_prompt_selected` with `placement: 'mcp_page'` and `trigger: 'list'` or `'terminal'`. `/ai` sends the same event with `placement: 'ai_page'`. Auto-play sends no event.
- **The terminal** is the homepage `ClaudeTerminal` in `src/components/Home/DataStory/Query/AgentWindow.tsx`. It uses `defineTrace` from `Query/trace.tsx`, so a change to those files can change the homepage too.
  - `/mcp` makes it smaller (`className`, `lightSize`), sets `cwd` to `~/hogflix`, and gives it a `suggestion`. Without these props, it shows as it does on the homepage.
  - After the answer, the input line suggests the next prompt as a button. The button goes away when the run starts, so focus moves to that prompt in the list.
  - The icons under each prompt come from `PRODUCT_ICONS` in `trace.tsx`. Add a new product icon there.

## Content rules

- **Quotes** (`MCPNoUI`): each is the `mcp` product quote (`quotes.<author>.products.mcp`) of a person in `mcpQuotes`, from `useCustomers`. Use only a real quote from a published customer story, word for word. Mark a cut with `[…]`. The first quote gets the big card, so put the longest one first.
- **Stat** (`mcpStat`): use only a number from a published post. The current one is from [How AI agents behave](/blog/how-ai-agents-behave).
- **Chips** (`whatItIs` in `WhatIsMCP`): one plain claim each, in two lines or fewer. "Light on context" is true in CLI mode (the default in Claude, Claude Code, Cowork, and Codex), not in tools mode (the default in Cursor).
- **Clients** (`connectors`): check the list against the [MCP overview](/docs/model-context-protocol) before you change it. The "Want skills too?" note describes the [PostHog AI plugin](https://github.com/PostHog/ai-plugin).
- **FAQ** (`faq`): each answer is a short version of an [MCP FAQ](/docs/model-context-protocol/faq) answer, and links to that heading. Check the docs before you change a number. Update the link anchor when a docs heading changes.
- **Setup CTA** (`MCPSetupCTA`): the copy comes from "Install PostHog from chat" in the [MCP use cases](/docs/model-context-protocol/use-cases).
- **Header:** the copy comes from the [MCP docs](/docs/model-context-protocol). Under `lg`, the install card is hidden and a "Read the setup guide" button shows, because a phone visitor is unlikely to run an install command.

## The waiting room

Nine covers in a horizontal scroll row with scroll snap and previous and next buttons. To add a cover, add an entry to `magazines` with a title, an image (10:13), and a caption (one dry sentence about a headline on the cover).

Things that aren't obvious from the code:

- The covers shuffle after mount, so the server HTML and the first client render match.
- The row loops. It holds three copies of the covers (`COPIES`) and jumps back to the middle copy after each scroll and before each button press. The copy length is the cover width times the count (`copyWidth`), not `scrollWidth / COPIES`, because of the row padding. The first and third copies are `aria-hidden` and not focusable.
- The row padding and the cover gutter give the shadows room, because a scroll container clips its content.
- A click on a cover shows its caption in a `role="status"` element, so a screen reader reads it.
