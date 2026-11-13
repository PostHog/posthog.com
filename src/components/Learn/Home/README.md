# Learn home

The Learn home at `/learn`. It uses the Reader template: a docs-style sidebar on the left and one section in the main column.

## Pages

| Route | Page file | Section |
| --- | --- | --- |
| `/learn` | `src/pages/learn/index.tsx` | Pocket guides: one collection of every volume in `POCKET_GUIDE_VOLUMES` |
| `/learn/prompts` | `src/pages/learn/prompts.tsx` | Prompt library: every prompt from `learnPrompts.ts`, with search and a product filter |
| `/learn/playground` | `src/pages/learn/playground.tsx` | Tinker with Twig: an Explore Twig link and a preview of Twig with its PostHog panel |

Each page renders `<LearnHome section="..." />`. Every section shows the same sidebar and hero.

## Files

| File | Contents |
| --- | --- |
| `index.tsx` | `LearnHome`: SEO, the `ReaderView` shell, the sidebar items, the hero, and the pocket guide collection |
| `PromptLibrary.tsx` | The prompt library. It reads `LEARN_PROMPT_SETS` and `learnPrompts()`, so it copies the same text as the product prompt pages. Each prompt is a `Learn/PromptSnippet`. Each product heading uses the product's icon and color from `useProduct()`, the same as the Products menu |
| `PlaygroundPreview.tsx` | The Playground section. The preview is a screenshot of twig.com with the PostHog Playground open (on Cloudinary), in a browser frame. Retake it when Twig's Playground changes |

## Sidebar

The sidebar is a `TreeMenu` with `appearance="sidebar"`.

- **Videos** has no page yet. It uses `disabled: true` with a "Coming soon" badge, so it shows grayed out and is not a link. When videos exist, add a page, give the item a `url`, and remove `disabled` and the badge.
- **Founders hub** links to the existing `/founders` page. Learn does not have its own Founders hub.

## Search

Each section has its own search on the page, so a reader searches only that section. `LearnHome` passes `hideSidebarSearch` to `ReaderView`, so the sidebar has no search box. Search fields use the `pill` appearance of `UI/SearchInput`. The prompt library filters by product with a `RadixUI/Select` next to the search, the same pattern as the integrations library.

## Pocket guides

The search matches each volume's title and description. The collection is one grid. When there are more volumes, group them into shelves by topic.

## Hero

- `LearnLogo` is the "PostHog Learn" lockup: the hedgehog logomark from `@posthog/brand/logo`, then "PostHog Learn" in RoundHog (`font-rounded`). The mark size, gap, and baseline follow the brand's landscape lockup. Dark mode uses the mono white mark, the same as the homepage.
- "data and agents" uses the same highlight classes as the homepage headline (`Home/HeroCopy`).
- The start links open the Product Analytics pocket guide and the Product Analytics starter prompt.

## Analytics

- A copy in the prompt library sends `learn_prompt_copied` with `surface: 'prompt_library'`, the volume, and the prompt's `resource`.
- Explore Twig sends `learn_resource_selected` with `surface: 'learn_home'`, then hands off to Twig with `handOffToTwig`.
