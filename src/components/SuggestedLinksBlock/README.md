# SuggestedLinksBlock Component

A reusable component for displaying suggested links in a grid layout with dynamic column sizing.

## Features

-   **Dynamic grid columns**: Automatically adjusts from `grid-cols-2` to `grid-cols-4` based on the number of links
-   **Responsive design**: Uses Tailwind CSS classes for consistent styling
-   **Reusable**: Can be used across different pages with different data
-   **Accessible**: Includes proper alt text for images

## Usage

```tsx
import SuggestedLinksBlock from 'components/SuggestedLinksBlock'

// Show all three links
<SuggestedLinksBlock links={["sales", "pricing", "careers"]} />

// Show only two links
<SuggestedLinksBlock links={["sales", "pricing"]} />

// Show only one link
<SuggestedLinksBlock links={["careers"]} />
```

## Data Structure

The component expects an array of string keys that reference predefined suggested links:

```typescript
interface SuggestedLinksBlockProps {
    links: string[] // Array of link keys like ["sales", "pricing", "careers"]
    className?: string
}
```

## Available Link Keys

-   `"sales"` - How we (don't) do sales
-   `"pricing"` - Usage-based pricing
-   `"careers"` - Want to work here?

## Props

-   `links`: Array of string keys referencing predefined links (required)
-   `className`: Additional CSS classes (optional)

## Grid Behavior

-   2 items → `grid-cols-2`
-   3 items → `grid-cols-3`
-   4 items → `grid-cols-4`

The component automatically determines the grid columns based on the length of the `links` array.

## Styling

Uses PostHog's design system:

-   `bg-accent` for circular backgrounds
-   `divide-primary` for dividers
-   `text-primary` for headings
-   Secondary button variant for CTAs
