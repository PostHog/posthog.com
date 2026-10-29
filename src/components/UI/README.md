# UI library

Accessible UI primitives for PostHog.com, built on [Base UI](https://base-ui.com/react/overview/quick-start) (`@base-ui/react`) and styled with the site's Tailwind tokens.

See every component live at [`/components/ui`](/components/ui). Each component has its own page there, with live examples, their source code, usage notes, and the props that the library adds. See [Docs pages](#docs-pages).

## Why this exists

The site uses Radix UI wrappers (`src/components/RadixUI`), Headless UI, and many one-off components. This library is the single place for new UI primitives. Existing wrappers will move to it over time. Until then, do not add new Radix or Headless UI wrappers – add the component here.

## Components

Use `appearance` for shape and material. Card, Tabs, FeatureTabs, Badge, Menubar, NavigationMenu, Table, and Toolbar use this prop. Buttons use `variant` for meaning and color. Status components use `tone` for status color.

| Component | Import | Base UI docs |
| --- | --- | --- |
| Accordion | `components/UI/Accordion` | [Accordion](https://base-ui.com/react/components/accordion) |
| AlertDialog | `components/UI/AlertDialog` | [Alert Dialog](https://base-ui.com/react/components/alert-dialog) |
| Autocomplete | `components/UI/Autocomplete` | [Autocomplete](https://base-ui.com/react/components/autocomplete) |
| Avatar | `components/UI/Avatar` | [Avatar](https://base-ui.com/react/components/avatar) |
| Badge | `components/UI/Badge` | None (site component) |
| Banner | `components/UI/Banner` | None (site component) |
| Breadcrumbs | `components/UI/Breadcrumbs` | None (site component) |
| Button, IconButton, ButtonGroup, ButtonLink | `components/UI/Button` | [Button](https://base-ui.com/react/components/button) |
| Card | `components/UI/Card` | None (site component) |
| Checkbox and CheckboxGroup | `components/UI/Checkbox` | [Checkbox](https://base-ui.com/react/components/checkbox), [Checkbox Group](https://base-ui.com/react/components/checkbox-group) |
| Chip | `components/UI/Chip` | None (site component) |
| Choicebox | `components/UI/Choicebox` | None (site component) |
| CodeBlock | `components/UI/CodeBlock` | None (site component) |
| Collapsible | `components/UI/Collapsible` | [Collapsible](https://base-ui.com/react/components/collapsible) |
| Combobox | `components/UI/Combobox` | [Combobox](https://base-ui.com/react/components/combobox) |
| ContextMenu | `components/UI/ContextMenu` | [Context Menu](https://base-ui.com/react/components/context-menu) |
| CopyButton | `components/UI/CopyButton` | None (site component) |
| Dialog | `components/UI/Dialog` | [Dialog](https://base-ui.com/react/components/dialog) |
| Drawer | `components/UI/Drawer` | [Drawer](https://base-ui.com/react/components/drawer) |
| EmptyState | `components/UI/EmptyState` | None (site component) |
| Field | `components/UI/Field` | [Field](https://base-ui.com/react/components/field) |
| Fieldset | `components/UI/Fieldset` | [Fieldset](https://base-ui.com/react/components/fieldset) |
| Form | `components/UI/Form` | [Form](https://base-ui.com/react/components/form) |
| Input | `components/UI/Input` | [Input](https://base-ui.com/react/components/input) |
| Kbd and Kbd.Shortcut | `components/UI/Kbd` | None (site component) |
| Menu | `components/UI/Menu` | [Menu](https://base-ui.com/react/components/menu) |
| Menubar | `components/UI/Menubar` | [Menubar](https://base-ui.com/react/components/menubar) |
| Meter | `components/UI/Meter` | [Meter](https://base-ui.com/react/components/meter) |
| MiddleTruncate | `components/UI/MiddleTruncate` | None (site component) |
| NavigationMenu | `components/UI/NavigationMenu` | [Navigation Menu](https://base-ui.com/react/components/navigation-menu) |
| Note | `components/UI/Note` | None (site component) |
| NumberField | `components/UI/NumberField` | [Number Field](https://base-ui.com/react/components/number-field) |
| Pagination | `components/UI/Pagination` | None (site component) |
| Popover | `components/UI/Popover` | [Popover](https://base-ui.com/react/components/popover) |
| PreviewCard | `components/UI/PreviewCard` | [Preview Card](https://base-ui.com/react/components/preview-card) |
| Progress | `components/UI/Progress` | [Progress](https://base-ui.com/react/components/progress) |
| Radio and RadioGroup | `components/UI/Radio` | [Radio](https://base-ui.com/react/components/radio) |
| RelativeTime | `components/UI/RelativeTime` | None (site component) |
| ScrollArea | `components/UI/ScrollArea` | [Scroll Area](https://base-ui.com/react/components/scroll-area) |
| SearchInput | `components/UI/SearchInput` | None (site component) |
| Section | `components/UI/Section` | None (site component) |
| Select | `components/UI/Select` | [Select](https://base-ui.com/react/components/select) |
| Separator | `components/UI/Separator` | [Separator](https://base-ui.com/react/components/separator) |
| Skeleton | `components/UI/Skeleton` | None (site component) |
| Slider | `components/UI/Slider` | [Slider](https://base-ui.com/react/components/slider) |
| Snippet and Snippet.Inline | `components/UI/Snippet` | None (site component) |
| Spinner | `components/UI/Spinner` | None (site component) |
| SplitButton | `components/UI/SplitButton` | None (site component) |
| Switch | `components/UI/Switch` | [Switch](https://base-ui.com/react/components/switch) |
| Table | `components/UI/Table` | None (site component) |
| Tabs | `components/UI/Tabs` | [Tabs](https://base-ui.com/react/components/tabs) |
| Textarea | `components/UI/Textarea` | [Input](https://base-ui.com/react/components/input) (renders a `<textarea>`) |
| Toast | `components/UI/Toast` | [Toast](https://base-ui.com/react/components/toast) |
| Toggle and ToggleGroup | `components/UI/Toggle` | [Toggle](https://base-ui.com/react/components/toggle) |
| Toolbar | `components/UI/Toolbar` | [Toolbar](https://base-ui.com/react/components/toolbar) |
| Tooltip | `components/UI/Tooltip` | [Tooltip](https://base-ui.com/react/components/tooltip) |
| Video | `components/UI/Video` | None (site component) |

## Conventions

### Same parts and props as Base UI

Each component exports a namespace with the Base UI part names: `Select.Root`, `Select.Trigger`, `Select.Item`, and so on. Each part accepts every Base UI prop, including `render`, `className` (a string or a function of state), and `style`. The [Base UI docs](https://base-ui.com/react/overview/quick-start) apply directly.

The library changes Base UI in only three ways:

1. **Default styles.** Each visible part has default classes. Your `className` merges on top with [`tailwind-merge`](https://github.com/dcastil/tailwind-merge), so `className="px-4"` replaces the default horizontal padding.
2. **Combined popup parts.** `Popup` renders Base UI's `Portal`, `Positioner`, and `Popup` together. Pass positioner props (`side`, `sideOffset`, `align`, `alignOffset`, `anchor`, `collisionPadding`, and others) and the portal's `container` prop to `Popup`.
3. **Built-in content where the site always shows it.** For example, `Select.Item` renders its check mark and text, `Accordion.Trigger` and `Collapsible.Trigger` render a chevron that turns when the panel opens, `Tooltip.Popup` renders an arrow, `Checkbox.Indicator` draws its check, and `Slider.Value` renders an odometer. Pass your own `children` to replace the default content.

Parts with no visual style (for example, `Root` on popups and most `Trigger` parts) are the Base UI parts with no change.

### Triggers and buttons

Unstyled triggers render a plain `<button>`. Use the `render` prop to show a library `Button`:

```tsx
<Popover.Trigger render={<Button appearance="raised" variant="primary" />}>Open</Popover.Trigger>
```

The `render` element must forward its `ref` and spread its props on the DOM node. `components/UI/Button` does this. `OSButton` does not, so do not pass it to `render`.

### Color schemes

Popups render in a portal at the end of `<body>`, outside the window that opened them. So each popup sets its own `data-scheme` (`primary` for most, `secondary` for tooltips). Colors use the scheme tokens (`bg-primary`, `bg-accent`, `border-primary`, `text-primary`, `text-secondary`, `text-muted`), so light mode, dark mode, and the classic skin work with no extra classes.

### Fields on see-through windows

Site windows are frosted glass, so the color behind a field changes with the wallpaper. Fields (inputs, selects, comboboxes, number and code fields), checkbox and radio boxes, tracks, and chips follow these rules. The classes are in `styles.ts` (`controlSurface`, `fieldSurface`, `fieldFocusVisible`, `fieldFocusWithin`, `fieldState`, `trackSurface`, `chip`).

- **Fill:** see-through white (50% in light mode, 8% in dark mode), so a field is lighter than the window behind it. Do not use a gray fill: a gray field looks disabled.
- **Edges and tints:** borders, dividers, and hover fills use the text color at low opacity, for example `rgb(var(--text-primary)/0.16)`. They darken a light window and lighten a dark one, so they work on every wallpaper. The top border is a little darker and a soft inner shadow makes the field look set into the glass.
- **Focus:** an orange border and a soft orange glow.
- **Disabled:** a dashed border, a hatched fill, and 70% opacity, with no inner shadow.
- **Solid surfaces:** only floating surfaces (popups, dialogs, drawers, toasts) use the solid `bg-primary`, because they sit above other content.
- **Dark mode:** a `data-[...]` or `focus-visible` state that changes a fill or shadow also needs a `dark:` copy, because Tailwind puts `dark:` rules after state rules.
- **Forms plugin:** `@tailwindcss/forms` gives every input a blue focus ring and padding. `textInput` and `bareInput` (for an input inside a group) include `formsPluginReset` to remove them.
- **Touch text size:** on a touch pointer, editable text is 16px at every size (`touchFieldText`), because iOS Safari zooms into a focused field whose text is smaller than 16px.

### Animation

Components animate with CSS only: transitions on `transform`, `opacity`, colors, SVG strokes, panel heights (Accordion, Collapsible), and popup size (NavigationMenu, when the user moves between panels), and one keyframe animation (the site's `shimmer`) for an indeterminate progress bar. No JavaScript runs per frame, so the components stay cheap on pages that use many of them.

- Checkbox and radio indicators stay mounted (`keepMounted`), so a toggle changes one attribute and the DOM does not change.
- Every animated part has `motion-reduce:transition-none`.
- Popups animate with Base UI's `data-[starting-style]` and `data-[ending-style]` attributes. Animations skip only when Base UI reports `data-instant="group"` (switching between menubar menus) or `"trigger-change"`. Do not skip on every `data-instant`: Base UI also sets it for keyboard and right-click opens.
- Popups that contain an arrow must be `relative`. Otherwise the arrow measures from the positioner when the opening transform ends, and moves by the popup's border width.
- `Slider.Value` rolls each digit as a column of 0–9 that CSS draws with `content`, so the digits are not DOM text. Each step is one line height, so keep that line height a whole number of pixels. The default `text-sm` gives 20px.

### Imports

Import each component from its own folder. There is no barrel file, so a page bundles only the components that it uses.

```tsx
import { Select } from 'components/UI/Select'
```

## Add a component

1. Create `src/components/UI/<Name>/index.tsx`. Import the Base UI part from its subpath, for example `@base-ui/react/meter`.
2. Style each visible part with `withClassName(BasePart, classes)` from `utils.ts`. Use a `React.forwardRef` component only when the part must render extra content.
3. For a popup, combine `Portal`, `Positioner`, and `Popup` with `splitProps(props, positionerPropNames)`. Set `data-scheme` on the popup element. Copy `Popover/index.tsx` as a starting point.
4. Use the shared classes in `styles.ts` (`focusRing`, `popupSurface`, `popupTransition`, `menuItem`, and others) so that components stay consistent.
5. Use only project color tokens. Use `@container` queries, not media queries, for layout that depends on width. Base UI state attributes use the Tailwind 3 syntax `data-[checked]:`, `data-[popup-open]:`, `data-[starting-style]:`. Put `before:` and `after:` classes only on the element that must have that pseudo-element: in Tailwind 3, every `before:` class also creates an empty `::before`, which becomes an extra flex item.
6. Add a docs page for it. See [Docs pages](#docs-pages).

## Known traps

Each of these caused a real bug in this library. Check for them when you add or change a component.

- `cn()` uses tailwind-merge. It reads an arbitrary value that contains `%` as a size, so `text-[color-mix(...70%...)]` removes `text-xs`, and `border-[color-mix(...)]` removes the border width. Add a type hint: `text-[color:...]`, `border-[color:...]`.
- Global CSS reaches into components. The global `code` rule adds a border and a background (use `plainCode`). The `.prose table` rules set cell borders and 15px text (Table sets its cell classes with `!`). `.border-primary` beats a one-sided override (use `border-[rgb(var(--border))]`). `fieldset legend` has a background.
- Webpack resolves only the aliases in `gatsby-node.ts` (`components`, `hooks`, `lib`, `types`, `images`, `constants`, `logic`, `~`). `context/App` type-checks but stops the dev build. Import `context` and `utils` with a relative path.
- In Tailwind 3, `dark:` rules come after `data-*` and `focus-visible` rules, so a state that changes a fill or a shadow needs a `dark:` copy.
- `dir="rtl"` on a span reorders punctuation at its edges. Wrap the text in an inner `dir="ltr"` span (see MiddleTruncate).
- There is one README for the library, this file. Put component notes on the docs page.

## Docs pages

The docs site at `/components/ui` lives in `src/components/UILibraryDocs`. It works like Storybook: one page per component, and each example is a small file whose exact source the page shows.

- `catalog.ts` lists every page: its slug, name, one-line description, and category. The sidebar and the overview cards come from it.
- `docs/<slug>/` holds one file per example (a default-exported component that imports from `components/UI/...`) and an `index.tsx` that exports `doc: ComponentDoc`: the examples, the usage notes ("Things to know"), and tables of the props that the library adds.
- `src/pages/components/ui/<slug>.tsx` is the route. It renders `<DocsPage doc={doc} />`.
- Import an example's source with `import fooSource from '!!../../rawSourceLoader!./Foo.tsx?raw'`. The `!!` prefix skips the site's loaders, and `rawSourceLoader.js` returns the file as a string. This needs no change to the Gatsby config.
- Usage notes for each component live in its `docs/<slug>/index.tsx`, not in this README. Read them there or on the page.
- Each preview's status bar has two icon buttons. One switches the site theme, the same as the site's own dark mode toggle. The other switches every preview between an opaque card and a transparent background. `UILibraryDocs/previewSurface.ts` keeps that choice in localStorage, so it applies to all previews and stays the same from page to page.

## Files

| File | Purpose |
| --- | --- |
| `utils.ts` | `withClassName` (adds default classes to a Base UI part), `mergeClassName`, `splitProps`, `positionerPropNames` |
| `styles.ts` | Shared Tailwind class strings: tones (`toneFill`, `toneBorder`, `toneText`, `toneSolid`, `toneIcon`), surfaces (`sectionSurface`, `cardLevels`, `surfacePaddings`, `surfaceDivider`), overlay shadows, focus rings, popup surface and transitions, menu and list items, menubar bars and triggers, text inputs, input groups, and field sizes, `plainCode`, dialog surfaces, progress bars |
| `toneIcons.ts` | The icon for each tone. Note, Banner, and Toast use it. |
