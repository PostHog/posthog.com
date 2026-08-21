# NotificationBadge

An iOS-style unread badge: a small red mark that sits on the top-right corner of an icon.

`count` is optional. Without it the badge is empty; with it the badge shows the number. Both are the same size — a 12px circle that only grows wider for a 2+ digit number — so adding or dropping the count never moves the badge.

## Usage

The badge positions itself with `absolute`, so its nearest positioned ancestor must be a box the size of the icon:

```tsx
import NotificationBadge from 'components/NotificationBadge'
;<span className="relative inline-flex">
    <SomeIcon />
    <NotificationBadge />
</span>
```

Desktop and taskbar icons have a `badge` slot on their `AppItem`. It takes the element itself, so the badge's own props stay the only place they are declared:

```tsx
{
    label: 'Store',
    Icon: <GlassIcon path={STORE_SILHOUETTE} />,
    url: '/merch',
    source: 'desktop',
    badge: <NotificationBadge count={3} />,
}
```

`AppLink` renders whatever it is given into a wrapper it makes `inline-flex`, which is the positioning context the badge needs. It does not know about `NotificationBadge` itself.

### Desktop icons

Do **not** hard-code `badge` in the `apps` array in `components/Desktop` — that array is module-level data and cannot react to state. Add the rule to [`hooks/useDesktopBadges.tsx`](../../hooks/useDesktopBadges.tsx) instead, keyed by the app's `url`. It returns rendered badges, and `Desktop` merges them into each `AppItem` at render time. The Store icon works this way: its badge is the number of items in the merch cart.

## Props

| Prop        | Type     | Default | Description                                                                    |
| ----------- | -------- | ------- | ------------------------------------------------------------------------------ |
| `count`     | `number` | –       | Unread count. Omit it for an empty badge. The component renders `null` at 0 or less. |
| `max`       | `number` | `99`    | Highest number shown. Above it, the badge shows `{max}+`.                       |
| `color`     | `NotificationBadgeColor` | `'red'` | Background color. See the swatch list below.                  |
| `className` | `string` | `''`    | Extra classes, e.g. to nudge the position.                                      |

## Colors

`color` picks a background from the project's color tokens:

| `color`   | Token     | Text color |
| --------- | --------- | ---------- |
| `red`     | `bg-red`  | white      |
| `orange`  | `bg-orange` | dark     |
| `yellow`  | `bg-yellow` | dark     |
| `green`   | `bg-green`  | white    |
| `blue`    | `bg-blue`   | white    |
| `purple`  | `bg-purple` | white    |
| `teal`    | `bg-teal`   | dark     |
| `salmon`  | `bg-salmon` | white    |

Text color is paired with the background, not chosen separately — the light swatches (`yellow`, `orange`, `teal`) take dark text because white on them is unreadable at 8px.

To add a swatch, add a row to the `COLORS` map in `index.tsx`. Write the whole class name (`bg-lilac text-white`). Tailwind scans source for literal classes, so a built-up `bg-${color}` is never generated.

## Animation

The badge springs in (scale + fade) and leaves quickly without the overshoot — an arrival is worth noticing, a dismissal is not. Under `prefers-reduced-motion` it fades only, so nothing moves.

`AnimatePresence` lives **inside** the component, so the exit plays when `count` drops to 0. It cannot help when a parent stops rendering the badge altogether — that unmounts the element outright and the exit is skipped. This is why [`useDesktopBadges`](../../hooks/useDesktopBadges.tsx) keeps the Store badge mounted at `count={0}` rather than removing its entry from the map.

If you render this component conditionally yourself, do the same: keep it mounted and let `count` fall to 0.

## Notes

- The number is `aria-hidden`; a `sr-only` sibling reads out "3 unread" (or just "unread" with no count) so the count is not announced as a bare digit next to the link label.
- The white outline is real badge background + padding, not a CSS ring. This keeps the outline and colored center in the same transformed layer during desktop icon hover animations.
- An **inline** wrapper does not work: absolute children of an inline element anchor to the text line box, so the badge lands near the baseline instead of the icon's top corner. Use `inline-flex` (or `block`) on the wrapper.
