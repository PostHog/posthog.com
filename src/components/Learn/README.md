# Learn

Components for the Learn section at `/learn`: the shell and sidebar, the hub pages, the pocket guide reader, and the interactive figures they share.

## Folders

| Folder | Contents |
| --- | --- |
| `Learn/` | The shell (`LearnShell`, `LearnPage`), hub pages (`LearnLanding`, `ProductAnalyticsLearnLanding`, `AgentPromptsPage`, `AgentTeachingActions`, `LivePlaygroundPage`), Learn tracking, and the figure parts that both subfolders use: `Figure`, `FigureMarker`, `ExhibitResetButton`, `PostHogInspector`, `PostHogEventInspector`, `SessionReplayInspector`, and `TraceTree` |
| [`TwigExhibits/`](TwigExhibits/README.md) | Components that render Twig UI from `@posthog/twig-components`. Guides, hub overviews, and Live playground pages use them |
| [`PocketGuides/`](PocketGuides/README.md) | The guide reader, book model, covers, MDX components, and figures that only chapters use |

Put a new component in the folder that matches these rules:

- If it imports `@posthog/twig-components`, or only wraps a component that does, put it in `TwigExhibits/`.
- If it is a frame or a mock PostHog panel that does not render Twig, and more than one folder uses it, put it in `Learn/`.
- If only guide chapters use it, put it in `PocketGuides/`.

Hub pages import from both subfolders. `PocketGuides/` imports from `TwigExhibits/`. Both subfolders import figure parts from `Learn/`. `TwigExhibits/` does not import from `PocketGuides/`.

## Learn integration

Pocket guides open and remain inside their product's Learn tab, with chapters in the product sidebar. Guides without a Learn tab render inside their product's docs. There is no standalone book reader.

The rendering path is:

1. `gatsby/createPages.ts` builds one page per chapter. `pocketGuidePageContext` in `src/constants/pocketGuides.ts` maps each source file to its volume's `learnPath`, and every page uses `src/templates/PocketGuide.tsx`. Full and minimal builds share this helper. Each chapter has its own title and canonical URL in the initial HTML. There are no client-only chapter routes.
2. The template renders `LearnPage` for products with a Learn tab, or `DocsPocketGuide` for Self-driving. `LearnShell.tsx` reads `pocketGuideVolume` from product data and supplies the product navigation through `ReaderView`. `AppWindow` renders `LearnShell` around every `/learn/<product>` page, so the sidebar stays mounted when the reader moves between Learn pages. `LearnPage` renders only the page content inside it. `PocketGuides/DocsPocketGuide.tsx` supplies the product's existing docs `TreeMenu`, without product tabs.
3. `PocketGuides/LearnSurface.tsx` renders the chapter from page context, using `useBookPages(volumeId)` for reading order. An empty or unknown chapter falls back to the introduction.
4. `EntryProvider` supplies page data and the guide's `basePath`. `MDXProvider` uses `bookMdxComponents`, including `ReaderWrapper`, to render the body.

### Routes

| Volume | Public URL |
| --- | --- |
| Product Analytics | Overview at `/learn/product-analytics`; guide at `/learn/product-analytics/pocket-guide`; also `/agent-prompts-and-mcp` and `/live-playground` |
| AI Observability, Session Replay, Feature Flags | Overview at `/learn/<product>`; guide at `/learn/<product>/pocket-guide` |
| Self-driving | `/docs/self-driving/pocket-guide` |
| Data Stack | Warehouse Learn tab at `/learn/warehouse`, which opens on the first "Ask a quick question" chapter; guide at `/learn/warehouse/pocket-guide` |

Each volume with `learnHub` in `src/constants/pocketGuides.ts` has an overview page at `src/pages/learn/<product>/index.tsx`, which renders `LearnLanding.tsx`. Every Learn page shows the same flat sidebar, with no section anchors or Back to Learn mode. A hub lists Overview and Pocket guide (chapters nested under it), each with an icon, then the extra pages in `learnHub.pages`. Every hub has Agent prompts and MCP. Product Analytics, AI Observability, and Session Replay also have Live playground, because Twig has labs for them. Feature Flags has no Twig lab yet. Volumes without `learnHub` list their chapters. Chapters are numbered in the sidebar ("1. Events"), and each chapter page shows a "Chapter 01" eyebrow above its heading. The number sits outside the `h1`, so the heading and page title stay the chapter's own title. The former `/docs/<product>/learn` and `/pocket-guides/<volume>` URLs redirect permanently to these routes in one hop, including chapter and `.md` paths. The source folder names the course, not the URL, so a route change is one edit to the volume's `learnPath`.

## Learn hub pages

- `LearnLanding.tsx` renders every hub overview: the product name, an intro line, a Learn through a story section with the cover, a Learn with your agent preview when the hub lists `agent-prompts-and-mcp`, and a Learn by doing preview when the page passes `playground`. The intro defaults to the page description, and the story text defaults to the volume description.
- `ProductAnalyticsLearnLanding.tsx` passes its own copy and its Twig filter preview to `LearnLanding`. The AI Observability and Session Replay overview pages pass a Twig figure. Session Replay sets `playground.fullWidth` to place its player and event inspector below the introduction. The replay panels sit side by side when the figure has enough room, with a scrollable inspector and bounded height.
- `AgentPromptsPage.tsx` renders each hub's `agent-prompts-and-mcp` page: MCP setup steps, a starter prompt, and one prompt per topic, each with Claude Code and Codex actions. Each product page passes its name, docs slug, starter focus, and topic prompts.
- `LivePlaygroundPage.tsx` renders the shared top of each hub's `live-playground` page: the title, the Twig introduction, and the Explore Twig link. Each page writes its own sections as children, a `SectionIntro` followed by its figure. By convention, every playground opens with the Twig session replay (`SessionReplayLinkFigure`). `TwigExhibits/AiObservabilityPlaygroundExhibits.tsx` builds its trace, event, and code figures from the `@posthog/twig-components/ai-lab` fixtures and reducer. `TwigExhibits/SessionReplayPlaygroundExhibits.tsx` shows input masking with the `replay-lab` `searchValue` helper. These are focused views; the full labs stay on Twig.com. The dedicated `src/pages/learn/product-analytics/agent-prompts-and-mcp.tsx` and `live-playground.tsx` own their full page content. Overview and page copy can change separately. Both pages pass their content to the shared `LearnPage` as children; the overview uses its `landing` prop.
- `AgentTeachingActions.tsx` shares the teaching prompt and the Claude Code and Codex launch controls. It exports `agentTeachingPrompt()` for every product's starter prompt, and `AGENT_TEACHING_PROMPT` for Product Analytics, so the displayed and launched instructions stay identical. Keep the prompt text unchanged unless someone asks for an instruction change. Pass a chapter-specific prompt through the optional `prompt` prop.
- The Live playground page stacks `SessionReplayLinkFigure` (pass `autoPlay` for muted, looping playback), `TwigEventFigure`, and `BookingStepsFigure`. Chapter embeds keep manual playback.

## Tests

`pnpm test:navs` runs `learnRoutes.test.ts` and `learnTracking.test.ts`. Run it when you change routes, redirects, navigation helpers, or Learn tracking.
