# Slack app page components

Sections for `/slack` (`src/pages/slack/index.tsx`). Not to be confused with `src/components/SlackPage`, the old community page.

## `SlackWindow`

An animated Slack thread, built like the homepage agent windows. It reuses `WindowFrame` and `LINE_ENTER` from `Home/DataStory/Query/AgentWindow.tsx` and `useEventClock` from `Home/DataStory/timeline.ts`, so a change there can change the homepage too.

It plays once when it scrolls into view, then holds its last frame. With reduced motion, it shows the last frame at once.

A `SlackScene` has a `channel`, `messages`, `endAt`, a screen reader `summary`, and an optional `label` ("Sample data" by default). Every message and block has an `at` time in ms. The types in `SlackWindow.tsx` list the block types.

- Write `at` times at a brisk pace. `PLAYBACK` stretches them and sets how long the last frame holds.
- Set `endAt` after the last text finishes streaming, because reduced motion shows the frame at `endAt`.
- `person.name` must match a team profile to get a photo.
- In text, `@Name` shows as a mention and backticks show as inline code.

`variant="thread"` shows only the thread, with no window, sidebar, or composer.

## `ThreadDemo`

A `SlackWindow` with threads to pick from. Until someone picks one, the threads play in turn.

- **Default:** the full window. Each thread has its own channel, and the sidebar channels open them.
- **`variant="thread"`:** a list of prompts beside the thread.

The default threads are real requests from PostHog's Slack, cut short, with the PRs they shipped. Ask the person before you add them or change their words. To find more: `gh search prs --repo PostHog/posthog.com --merged '"from a Slack thread"'`.

A pick sends `ai_prompt_selected` (the same event as `/ai` and `/mcp`) with a `placement` and a `trigger`.

## `ThreadStarters`

The four ways to start a thread, as a `ThreadDemo` with `variant="thread"`. Keep each `detail` to two lines (about 60 characters). Sample data, except the scout thread, which is based on a real one.

## `ModelDemo`

A static exchange for the models box. It uses the message parts from `SlackWindow`.

## The page

- Art URLs and alt text are in `ART`. The current art is stand-in art.
- The chip grids are `IconChipRow` (shared with `/ai`) and `IconChipRows` (shared with `/mcp`). Keep each grid to four items.
- Check FAQ answers against [/docs/slack](/docs/slack) when the app changes.
