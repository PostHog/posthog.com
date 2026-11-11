# Components

Reference this guide when working on UI components.

Many commonly-used form components can be seen at [/components](src/pages/components/index.tsx). Always use these patterns when possible.

## UI library (Base UI)

New UI primitives live in `/src/components/UI`. They are built on [Base UI](https://base-ui.com/react/overview/quick-start) and keep its part names and props, so the Base UI docs apply. See them live at [/components/ui](src/pages/components/ui/index.tsx), one page per component, and read the [library README](src/components/UI/README.md) before you add or change one. Components in this library do not get their own `README.md`. Put anything a user must know in the "Things to know" notes of its docs page (`src/components/UILibraryDocs/docs/<slug>/index.tsx`), and add an example there for each new variant or state.

```tsx
import { Select } from "components/UI/Select"
```

## Radix UI (legacy)

Existing components use Radix UI wrappers in `/src/components/RadixUI`. These will move to the UI library over time. Do not add new Radix wrappers.

**Import pattern:** Use `Radix` prefix for imports, then wrap with simple names:

```tsx
import { Tabs as RadixTabs } from "radix-ui"

// Use as:
<Tabs />
```

This allows simple naming conventions like `<Tabs />`, `<Dialog />`, etc.

## OS-prefixed components

Custom components (outside Radix scope) use the `OS` prefix:

| Component | Location |
|-----------|----------|
| `<OSButton />` | `/src/components/OSButton` |
| `<OSFieldset />` | `/src/components/OSFieldset` |
| `<OSIcons />` | `/src/components/OSIcons` |
| `<OSTable />` | `/src/components/OSTable` |
| `<OSTabs />` | `/src/components/OSTabs` |

## When to create new components

- Accessible primitive needed (menu, dialog, select, tooltip, and so on) → `/src/components/UI`
- Custom component needed → `/src/components/OS[Name]`
