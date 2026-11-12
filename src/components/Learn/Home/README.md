# Learn home

The Learn home at `/learn`. It uses the Reader template: a docs-style sidebar on the left and one section in the main column.

## Pages

| Route | Page file | Section |
| --- | --- | --- |
| `/learn` | `src/pages/learn/index.tsx` | Pocket guides: one collection of every volume in `POCKET_GUIDE_VOLUMES` |
| `/learn/prompts` | `src/pages/learn/prompts.tsx` | Prompt library: every prompt from `learnPrompts.ts`, with search and a product filter |
| `/learn/playground` | `src/pages/learn/playground.tsx` | Tinker with Twig: an Explore Twig link and a preview of Twig with its PostHog panel |

Each page renders `<LearnHome section="..." />`. Every section shows the same sidebar, breadcrumb, and hero.

## Files

| File | Contents |
| --- | --- |
| `index.tsx` | `LearnHome`: SEO, the `ReaderView` shell, the sidebar items, the hero (with the Learn TV), and the pocket guide collection |
| `PromptLibrary.tsx` | The prompt library. It reads `LEARN_PROMPT_SETS` and `learnPrompts()`, so it copies the same text as the product prompt pages |
| `PlaygroundPreview.tsx` | The Playground section. The Twig part of the preview is `TwigExhibits/TwigHomePreview.tsx` |

## Sidebar

The sidebar is a `TreeMenu` with `appearance="sidebar"`.

- **Videos** has no page yet. It uses `disabled: true` with a "Coming soon" badge, so it shows grayed out and is not a link. When videos exist, add a page, give the item a `url`, and remove `disabled` and the badge.
- **Founders hub** links to the existing `/founders` page. Learn does not have its own Founders hub.

## Pocket guides

The collection is one grid. When there are more volumes, group them into shelves by topic.

## Hero

- The start links open the Product Analytics pocket guide and the Product Analytics starter prompt.
- The Learn TV is decorative. It opens `/changelog`.

## Analytics

- A copy in the prompt library sends `learn_prompt_copied` with `surface: 'prompt_library'`, the volume, and the prompt's `resource`.
- Explore Twig sends `learn_resource_selected` with `surface: 'learn_home'`, then hands off to Twig with `handOffToTwig`.
