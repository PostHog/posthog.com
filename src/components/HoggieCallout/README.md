# HoggieCallout

A callout that sends readers to another page. It has two variants:

- `default`: the callout on the live pages in the "Used by" table. The rest of this section is about this variant.
- `yellow`: a yellow box with a hog that readers can poke. Use it in docs and handbook pages. See [Yellow variant](#yellow-variant).

In the default variant, a hoggie sits on the left, the copy sits next to it, and a button sits on the right. The hoggie breaks out of the top border, or stands on the bottom border inside the callout (see [Hoggie size and placement](#hoggie-size-and-placement)). In a narrow container, the button moves under the copy.

The button opens its link in a new window, with `state={{ newWindow: true }}` on `OSButton`.

## Used by

| Component or page | Variant | Where it shows |
| --- | --- | --- |
| `MCPLeaderboardCallout` | `default` | `/mcp-analytics` (the leaderboard section) |
| `EvalsPlaygroundCallout` | `default` | `/docs/ai-evals` and `/docs/ai-evals/offline-evals` |
| `contents/handbook/wizard-and-docs/mdx-and-components.mdx` | `yellow` | `/handbook/wizard-and-docs/mdx-and-components` (the live example) |

For the default variant in a `.tsx` page, make a small wrapper component for each callout, so a page imports one component with no props. Put the copy in the wrapper. In MDX, use the yellow variant directly, with no wrapper.

Add a row here when you add a callout to a page.

`FieldGuideCallout` in `src/components/FieldGuide/` has a similar layout, but it does not use this component. It uses an image file instead of a hoggie, a secondary `CallToAction`, and the `reader-content` container.

## Usage

```tsx
import { HedgehogJudge } from '@posthog/brand/hoggies'
import HoggieCallout from 'components/HoggieCallout'

export default function EvalsPlaygroundCallout({ className = '' }: { className?: string }): JSX.Element {
    return (
        <HoggieCallout
            hoggie={HedgehogJudge}
            hoggieTitle="A hedgehog judge in a robe and lace collar, raising a gavel"
            hoggieAlign="bottom"
            hoggieBreakout={false}
            ariaLabel="Evals playground"
            title="Before you ship, or after?"
            description="Learn the differences between offline and online evals in our live playground."
            buttonLabel="Evals playground"
            to="/learn/ai-observability/live-playground/online-and-offline-evals"
            className={className}
        />
    )
}
```

## Props

| Prop | Type | Description |
| --- | --- | --- |
| `hoggie` | component | A hoggie from `@posthog/brand/hoggies`. It gets the `title` and the position classes. |
| `hoggieTitle` | `string` | Describes what the art shows, for screen readers. |
| `hoggieAlign` | `'top'`, `'center'`, or `'bottom'` | The height the hoggie sits at. Defaults to `top`, or `bottom` for `yellow`. See [Hoggie size and placement](#hoggie-size-and-placement). |
| `hoggieBreakout` | `boolean` | Lets the hoggie go past the border it is aligned to. Defaults to `true`, or `false` for `yellow`. |
| `hoggieSize` | `'sm'`, `'md'`, or `'lg'` | The size of the hoggie. Defaults to `md`, the size the callouts had before this prop. |
| `ariaLabel` | `string` | Label for the outer `aside`. |
| `title` | `string` | Bold first line. |
| `description` | `ReactNode` | Text under the title. |
| `buttonLabel` | `string` | Button text. |
| `to` | `string` | Button link. |
| `className` | `string` | Classes for the outer `aside`, for spacing. The default margin is `my-6`, or `mt-12 mb-8` for `yellow`. |
| `variant` | `'default'` or `'yellow'` | `yellow` turns on the yellow layout and the hog interactions. Defaults to `default`. |
| `hoggieSide` | `'left'` or `'right'` | Yellow only. The side the hog sits on in a medium or wide container. In a narrow container, the hog is always centered. Defaults to `left`. |
| `interactive` | `boolean` | Yellow only. Turns on the hover nudge and the poke. Defaults to `true`. |
| `hoggieLines` | `string[]` | Yellow only. Extra speech bubble lines for the chosen hog. They are added to the standard lines, not used instead of them. |

## Hoggie size and placement

Three props control the hoggie in both variants. Each one works with any value of the other two.

- `hoggieAlign`: the height the hoggie sits at: `top`, `center`, or `bottom`.
- `hoggieBreakout`: when `true`, the hoggie goes past the border it is aligned to. `top` goes over the top border, `bottom` goes under the bottom border, and `center` goes past the side border. When `false`, the hoggie stays inside the box.
- `hoggieSize`: `sm`, `md`, or `lg`. Use a size, not a pixel value: Tailwind only makes classes that it finds in the source.

The box padding changes with the size, so the copy never goes under the hoggie. The box also gets a minimum height, so the hoggie only goes past the border that it breaks out of. Two cases keep the layout they had before these props: breakout at the top, and inside at the bottom, where a short box lets the hoggie go over the top border.

Use `hoggieAlign="bottom"` with `hoggieBreakout={false}` for a hoggie whose art is cut off at the bottom, like `HedgehogJudge`. The cut edge then sits on the bottom border.

Default variant. The defaults are `hoggieAlign="top"` and `hoggieBreakout={true}`:

| `hoggieBreakout` | `top` | `center` | `bottom` |
| --- | --- | --- | --- |
| `true` | 16px over the top border | 16px past the left border | 16px under the bottom border |
| `false` | 16px below the top border | Centered from top to bottom | On the bottom border |

| `hoggieSize` | Width, breakout | Width, inside |
| --- | --- | --- |
| `sm` | 80px, and 96px from `@xl` | 64px, and 80px from `@xl` |
| `md` (default) | 96px, and 128px from `@xl` | 80px, and 96px from `@xl` |
| `lg` | 112px, and 160px from `@xl` | 96px, and 128px from `@xl` |

Yellow variant. The defaults are `hoggieAlign="bottom"` and `hoggieBreakout={false}`. In a narrow container, the hoggie is always above the copy and 32px over the top border, and only `hoggieSize` has an effect. In a medium or wide container:

| `hoggieBreakout` | `top` | `center` | `bottom` |
| --- | --- | --- | --- |
| `true` | 32px over the top border | 16px past the side border (`hoggieSide`) | 16px under the bottom border |
| `false` | 16px below the top border | Centered from top to bottom | 16px above the bottom border |

| `hoggieSize` | Hoggie height, narrow | Hoggie height and column width, medium and wide |
| --- | --- | --- |
| `sm` | 96px | 128px tall, 112px column |
| `md` (default) | 120px | 176px tall, 152px column |
| `lg` | 144px | 224px tall, 192px column |

## Layout

The outer `aside` is a size container (`@container`). The hoggie and the button row change at `@xl`, so the callout responds to its own width, not to the window width.

## Yellow variant

`variant="yellow"` renders `YellowHoggieCallout.tsx`. It is a global MDX component, so docs and handbook pages can use it with no wrapper.

### When to use it

Suggest one when a page links to a marketing asset, a tool, a playground, a leaderboard, or a weird, fun, or sparks-joy page. Use one per page at most. Don't use it for warnings or required steps – use `CalloutBox` for those.

### Add one to a page

```mdx
import { HedgehogBasketballCoach } from "@posthog/brand/hoggies"

<HoggieCallout
    variant="yellow"
    hoggie={HedgehogBasketballCoach}
    hoggieTitle="A hedgehog basketball coach spinning a ball, holding a clipboard"
    ariaLabel="[Add callout label]"
    title="[Add title - max 45 characters]"
    description="[Add description - max 160 characters]"
    buttonLabel="[Add button label - max 24 characters]"
    to="/relative/link"
    hoggieLines={["[Optional line for this hog - max 24 characters]"]}
/>
```

1. **Change the copy.** Replace the title, description, button label, link, and `ariaLabel`. Keep the title to 45 characters or fewer (about 36 fit on one line in the docs column), the description to 160, and the button label to 24.
2. **Pick a hog** that fits the topic from [brand.posthog.com/hoggies](https://brand.posthog.com/hoggies). It shows the import line for each hog. Put the import at the top of the `.mdx` file, under the frontmatter. Write a `hoggieTitle` that describes the art. Never draw or generate a hog.
3. **Review the speech bubble lines.** Read the standard lines below and check that they suit the page. You can add `hoggieLines` that fit the hog. See [Rules for new lines](#rules-for-new-lines).
4. **Turn off the hog on sensitive pages**, such as incidents, billing errors, or data deletion, with `interactive={false}`.

`@posthog/brand` has no lookup that returns a hoggie component by slug. It can lazy-load an SVG string or a PNG URL by slug, but then the hog is not in the server-rendered HTML, and an SVG string needs `dangerouslySetInnerHTML`. So you import the hoggie by name.

### Layouts

The outer `aside` is a size container. The layout changes on the callout's width:

| Container | Layout | Hog |
| --- | --- | --- |
| Below `@xl` (36rem) | The hog, then the copy, then a full-width button | 120px tall, centered, 32px over the top border |
| `@xl` to `@4xl` | A 152px hog column next to the copy. The button is under the description. | 176px tall, 16px above the bottom border. It goes over the top border only when the box is shorter than the hog. |
| `@4xl` (56rem) and up | One row: the hog, the copy, then the button | As in the medium layout. The box has a minimum height of 168px, so the hog goes 24px over the top border. |

The box uses `bg-lemon-lighter` (`#FFEBA3`) in light mode and `bg-accent` in dark mode.

### Interactions

When `interactive` is `true`:

- **Hover nudge:** when the pointer enters the hog, the hog hops 8px and tilts 1.5°, then settles in about 500ms. It uses transitions, not keyframes.
- **Poke:** the hog is a button labeled "Poke the hog". A click or tap plays `animate-wiggle`, like `CampfireHog`, and shows a speech bubble above the hog for 1.8 seconds. The bubble says a random line from the standard lines and `hoggieLines`. It never says the same line two times in a row. Screen readers announce the line through `role="status"`.
- With `prefers-reduced-motion`, the hog does not move, but the bubble still shows.
- The interactions do not move the copy or the button.

With `interactive={false}`, the hog is a plain image, and there is no button or bubble.

### Standard lines

The standard lines are in `lines.ts`:

- Hedgehog. Not a pig.
- Event fired: $hog_poke
- I read the docs. Twice.
- Spines are decorative.
- I'm not a bug, promise.
- No sales call needed.
- Docs > meetings.
- This is my good side.
- Hogs love docs.
- Just doing hog business.
- Beep boop!
- Pssst. Keep reading.

### Rules for new lines

- 24 characters or fewer. In development, a longer line logs a warning, but it still shows.
- The hog talks about itself or is warm to the reader. It never tells the reader to stop, go away, or do better.
- No escalation, innuendo, or jokes about bodies, death, money, politics, or AI replacing people.
- No links. Lines are plain text.
- If a line would be awkward on the most serious docs page, cut it.
