# Components

Reference this guide when working on UI components.

Many commonly-used form components can be seen at [/components](src/pages/components/index.tsx). Always use these patterns when possible.

## Radix UI

We use Radix UI components. To match our design, we create custom wrappers in `/src/components/RadixUI`.

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

- Radix wrapper needed → `/src/components/RadixUI`
- Custom component needed → `/src/components/OS[Name]`
