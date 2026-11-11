# SourcePage

Building blocks for the source pages under `/data-pipelines/sources/`. Each source page uses the same sections, jump links, and card style. Put them here, not in the page file, so that the pages stay the same.

```tsx
import {
    CARD,
    GuideCardActions,
    HIGHLIGHT_COLOR,
    JumpLinks,
    SECTION,
    Section,
    maxPromptUrl,
} from 'components/DataPipelines/SourcePage'
```

## Exports

| Export | What it is |
|---|---|
| `Section` | A page section with a top divider, an `h2` title, an optional intro, and an `id` for the jump links. |
| `JumpLinks` | The "On this page" row under the hero. Each button scrolls to the section with that `id`. |
| `DEFAULT_JUMP_LINKS` | The four sections that every source page has: `what-syncs`, `connect`, `questions`, `across-posthog`. |
| `CARD` | Class names for a card: border, background, padding, and `flex-col` so `GuideCardActions` pins to the bottom. |
| `GuideCardActions` | The "Read the guide" and "Copy skill" buttons for a card that links to a pocket guide. See below. |
| `SECTION` | Class names for a section divider. Use it for a section that has no `Section` heading, such as the closing call to action. |
| `HIGHLIGHT_COLOR` | The hero highlight color, the same as `/enterprise`. |
| `maxPromptUrl(prompt)` | A link that opens PostHog AI with `prompt` pre-filled but not sent, so the reader can fill in the `[placeholders]` first. |

## Usage

```tsx
const pageRef = React.useRef<HTMLDivElement>(null)

<div ref={pageRef} className="@container ...">
    <header>...</header>
    <JumpLinks pageRef={pageRef} />
    <Section id="what-syncs" title="What syncs from Postgres" intro="...">
        <div className={CARD}>...</div>
    </Section>
</div>
```

`JumpLinks` finds the targets inside `pageRef`, not in the whole document. Another open window can have a section with the same `id`. It uses `scrollIntoView` and does not change the URL hash, because the page opens in a window.

To show other sections, pass `links`:

```tsx
<JumpLinks pageRef={pageRef} links={[{ id: 'connect', label: 'How to connect' }]} />
```

## GuideCardActions

```tsx
<div className={CARD}>
    <h4>Which accounts actually activate?</h4>
    <p>...</p>
    <GuideCardActions href="/learn/warehouse/pocket-guide/activation-metrics" />
</div>
```

- **Read the guide** opens the pocket guide at `href`.
- **Copy skill** copies the guide's `SKILL.md` to the clipboard. The button is disabled if the guide has no skill file. If the browser blocks the clipboard, the button shows "Couldn't copy".

`href` can use any pocket guide path form. The component resolves it with `pocketGuideDestination`, so it finds the skill file and links to the current guide URL. It uses `mt-auto`, so put it at the end of a `flex flex-col` card (such as `CARD`) to pin the buttons to the bottom.

## Notes

`maxPromptUrl` links to `app.posthog.com` (US). EU users land in the US app.

Used on `/data-pipelines/sources/postgres`.
