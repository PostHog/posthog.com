# Slack app page components

Sections for the `/slack` page (`src/pages/slack/index.tsx`). The page renders in `ReaderView`, so layouts use `@container/reader-content` queries, not media queries.

Not to be confused with `src/components/SlackPage`, the old "Our Slack community has moved" page.

## `SlackWindow`

An animated Slack window with the PostHog app, built like the agent windows on the homepage. It reuses `WindowFrame`, `LINE_ENTER`, and `Caret` from `Home/DataStory/Query/AgentWindow.tsx`, and `useEventClock` from `Home/DataStory/timeline.ts`. A change to those files can change the homepage too.

The window plays once when it scrolls into view, then holds its last frame. With reduced motion, it shows the last frame at once.

Pass a `SlackScene`: the active `channel`, `endAt`, a screen reader `summary` that says if it is sample data or a real thread, an optional `label` for the thread header ("Sample data" if you leave it out), and `messages`. Every message and block has an `at` time in ms.

- `person`: `name` is a full name from the team profiles. The photo and color come from `allSqueakProfile`, the same as `TeamMember`; without a profile, the avatar shows an initial. The message appears at `at`, already sent. Optional `attachment`, `reactedAt` (when the bot adds the 👀 reaction), and `heartAt` (when it adds a 🧡 next to the eyes, for a message that says please: an easter egg in the app). Reactions stay on, like in Slack, and each later message to the bot gets its own (the reactions are the one place the page uses emoji, because Slack shows them).
- `bot`: shows "is thinking…" until its first block. Then `blocks` and optional one-click `replies`.

Block types: `text` and `bullets` (streamed word by word), `plan` (each step has a `doneAt`), `insight` (a card like the image PostHog posts to Slack: the type and date range, the title, an optional description, the chart with dates and a legend. With `subscription`, it adds the buttons and the reply hint. The card stays white in dark mode, because in Slack it's an image), `pr` (a box with the state and the repo line, `opened` or `merged`, with no PR title; set `number` and `url` only in a real thread. With a `url`, the repo line is a link that opens the PR), and `report` (something PostHog posts on its own: `kind` is `scout` or `self-driving`, with optional `buttons`). In text, `@Name` shows as a mention and backticks show as inline code.

Props besides the `scene`: `variant`, `channels` (the sidebar channels; the scene's channel by default), `people` (the DMs in the sidebar), `onSelectChannel` (makes each channel a button), and `onDone`.

Layout by container width: under `lg`, only the thread pane shows, with the channels as tabs above it if you pass `onSelectChannel`. From `lg`, the sidebar shows too. From `3xl` (the full-width demo), the channel pane shows beside the thread: the first message appears in the channel, the thread pane opens with the first reply, and the channel shows the reply count. Corners stay small (`rounded-md` for the window and the large avatars, `rounded` or less for everything else), except the round reaction pills. Scenes are written at a brisk pace, and the window stretches every time by `PACE` (1.35), so write `at` times without it. After `endAt`, the window holds for 8 seconds, then calls `onDone`.

## `ThreadStarters`

The four ways a thread with PostHog starts: ask anything (or pull PostHog into a thread), reply to an alert or subscription, reply to a scout report, and reply to a Self-driving report. It's a `ThreadDemo` with `variant="thread"`, so the four ways are the list on the left, and the `SlackWindow` shows only the thread, with no window, sidebar, channel, or composer. The alert or subscription thread starts with a subscription: an `insight` card like the image PostHog posts to Slack, with its View in PostHog and Manage Subscription buttons and the reply hint. Write each `detail` so it says exactly what to do and what happens, in two lines or fewer at every width (about 60 characters, because the list is about 250px wide where the two columns start): where you tag @PostHog, and what you ask. A click sends `placement: 'slack_page_starters'`.

Paul's scout thread is based on his real one in #papercuts. The others are sample data. The "ask anything" thread is about the Slack app, so it reads like a thread at PostHog. The "Fix it, make no mistakes" button on the Self-driving report copies the suggested reply that Self-driving reports carry in Slack.

## `ThreadDemo`

A `SlackWindow` with a set of threads to pick from. It has two pickers:

- **The full window** (the workspace section above the try-it box): each thread is in its own channel, and the sidebar channels open them, like in Slack. Under the channels, a hint with a bouncing arrow says to click one (the arrow stays still with reduced motion). In a narrow window, the channels show as tabs. Until someone picks a channel, the threads play in turn. In the sidebar, the DMs are the people who start the threads. The Direct messages section starts closed, as an easter egg. It closes again when the thread changes. A DM opens the person's team profile in a new tab, and Apps > PostHog opens the Slack app docs in a new tab.
- **`variant="thread"`** (`ThreadStarters`): a list of prompts on the left and the thread on the right, like `PromptDemo` on `/mcp`. In two columns, the thread is as tall as the list. In one column, the list is above the thread, and the thread has a fixed height. Until someone picks a prompt, the threads play in turn.

Props: `demos` (the threads below by default), `variant` (passed to `SlackWindow`), and `placement` (for analytics). Each entry has a `title` (for analytics), a `label` (the button text and the prompt in analytics; match the first message of the scene, and a leading `@PostHog` shows in blue), an optional `detail` (the line under the button), an optional `Icon` and `color`, and the `scene`. In the full window, give each thread its own `channel`.

The PR cards in the window are links, but the window is hidden from screen readers and the keyboard. So `ThreadDemo` adds a link to the last PR of the active thread, which shows only when it has keyboard focus.

**The threads:** real requests from PostHog's Slack, each with the merged PR it produced. To find more, search for the footer that the Slack app adds to its PRs: `gh search prs --repo PostHog/posthog.com --merged '"from a Slack thread"'` (and the same for `PostHog/posthog`). Give each request the context the person gave (what is wrong and why), not only the command. Keep each thread on a different set of features:

- **#desktop: Fix a dead-end screen** (Cleo, posthog#120590): a marketer's change to product code, the live plan, and a new tracking event
- **#startups: Write the rule into the handbook** (Joe, #21655): one rule in two places (the handbook and the `/startups` FAQ)
- **#papercuts: Fix a papercut** (Paul, posthog#130036): a bug report, and the live plan with tests
- **#team-signals: Hide a button that adds nothing** (Andy, posthog#133502): a product fix in the main repo, and the live plan
- **#replay-vision: Fix a confusing pricing chart** (Kim, #22212): an explanation of the problem, what changed, and a page check
- **#team-posthog-ai: Keep the chart in view** (Vojta, posthog#133434): the cause of a bug, and the live plan
- **#sales: Share a sales tip** (Joey, #22187): a tip from one person, written up for the team
- **#events: Add a photo to the handbook** (Daniel, #22171): a photo attachment, and the live plan

A thread shows "Pull request merged" only when there is more chat between the PR opening and the merge. Directly after "Pull request opened", it adds nothing. Give each scene an `endAt` after its last text finishes streaming (16 ms a character), because reduced motion shows the frame at `endAt`.

The words come from the PR descriptions, not from the threads, and are cut short. The channel names, other than #papercuts, are a best guess. The scenes have no reply footer, because the real model and thread cost aren't in the PRs. Before you add a person or change their words, check that they're happy with it.

**Analytics:** a pick sends `ai_prompt_selected`, the same event as `/ai` and `/mcp`, with `trigger: 'channel'` in the full window (`placement: 'slack_page_workspace'`) and `trigger: 'list'` in the list. Auto-play sends no event. Clicks on the PR links are autocaptured.

## The page

Section order in `src/pages/slack/index.tsx`: hero (with the video) → one hog, two jobs (an analytics card and a coding card) → four ways to start a thread (`ThreadStarters`) → "If you can prompt, you can PostHog" (laid out like "Your product data wherever you work" on `/ai`: a wide card for what it sends back, a narrow card for the tools and context past PostHog, with the heart hog easter egg, then a small "Set it once" box with links to the settings docs) → everyone can ship now (a box like "Your agent gets the full spread" on `/mcp`: ideas a team can start, the PostHog-loves-Slack art with a link to Slack's customer story, then three cards for auto model choice, one-click replies, and link previews) → a divider → real things we're prompting that turn into PRs (`ThreadDemo`, the real threads) → "@PostHog from anywhere (literally)" (the try-it box) → FAQ → choose your fighter (a box like `AIEngineering` on `/ai`, with the fighters art and a caption beside it: PostHog AI in the browser, the Slack app, and your terminal or agent through the MCP, in `fighters`. They all use the PostHog MCP, so the list is about where you talk to it. Only each name is a link. Self-driving is not in the list, because it delivers into Slack). The FAQ answers come from `/docs/slack`, so check them against the docs when the Slack app changes. Open sections and boxed sections take turns, like on `/ai` and `/mcp`. Keep each chip grid to four items.

- **Art:** every illustration URL and its alt text is in the `ART` map at the top of the page. The current art is stand-in art from other pages. To replace an image, change its entry, and update the alt text and any caption that refers to it.
- **Scheduled reports:** the card in `stackCards` has a comment above it. Confirm the feature with the Slack app team before it ships, or remove the entry.

## Content rules

- Facts come from the [Slack app docs](/docs/slack). These features are on the page but not in the docs yet: thread cost in the footer, the live progress plan, your own MCP servers, and chart previews for ad hoc insights and experiment results. Add a docs link when they are documented.
- The window has no reply footer (View session, model, thread cost, project, Configure) yet. Copy it from a real reply when you add one. The plan card is an approximation; check it against a real thread before you change it.
- In `ThreadStarters`, names, numbers, repos, and links are sample data. In `ThreadDemo`, the people, PRs, and links are real.
