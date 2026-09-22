# CustomerCards

A grid of customer cards. Each card shows the logo, a flag and badges, and then **the best content we
have permission to show** — a quote if somebody gave us one, the customer's `notes` line if not.

This is the middle rung of the proof ladder on `/customers`:

| Rung | What it needs | Where it lives |
| --- | --- | --- |
| Case study | An interview and the customer's sign-off | `contents/customers/*.md` |
| **Card** | **One permissioned sentence, or nothing at all** | **this component** |
| Logo | Nothing | `components/CustomerShuffle` |

The point of the middle rung is that a company can sit there with no new content at all. 61 of 66
customers already have a `notes` one-liner, and those lines are good ("The MacOS Spotlight that Apple
should have built"). A card upgrades itself to a quote the day somebody sends one.

## Usage

```tsx
import CustomerCards from 'components/CustomerCards'

<CustomerCards
    customers={aiTeamsWithoutAStory}
    people={quotesBySlug}
    hasCaseStudy={hasCaseStudy}
/>
```

## Props

| Prop | Type | Default | What it does |
| --- | --- | --- | --- |
| `customers` | `Customer[]` | required | The customers to show. Renders nothing when empty. |
| `people` | `Record<string, CustomerPerson>` | `{}` | Keyed by slug. A customer with an entry shows that quote instead of its `notes`. |
| `hasCaseStudy` | `(slug) => boolean` | — | Adds a "Read the story" link for customers that have one. |
| `className` | `string` | `''` | Applied to the grid. |

`CustomerCard`, `CustomerBadges`, and `RegionFlag` are exported separately for reuse.

## Two rules

**Never put an internal note on a card.** A card is public. Sales commentary, spend, and Slack threads
about a customer are not customer quotes and must not reach `people`. A quote goes on a card only when
that customer has agreed to it — see [#18885](https://github.com/PostHog/posthog.com/issues/18885).

**A missing flag shows nothing.** `RegionFlag` reads `StickerFlag{region}` from `components/Stickers`.
Only 35 countries have an asset, so a customer in an unlisted country renders no flag rather than a
wrong one or a question mark. India has no flag asset yet; add one before leaning on an Indian
customer as a proof point.
