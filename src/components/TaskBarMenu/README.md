# TaskBar Menu System

## Overview

The TaskBar menu system provides a desktop-style navigation experience that adapts to mobile viewports. On mobile devices (viewport < 768px), the menu automatically truncates deep nesting and simplifies navigation to improve usability.

## Mobile Menu Behavior

### Viewport Detection
- **Breakpoint**: 768px (uses `useResponsive` hook)
- **Desktop**: Full menu structure with unlimited nesting
- **Mobile**: Simplified menu with maximum 2 levels of nesting

### Mobile Menu Structure

On mobile, the main navigation items are moved from the top-level menu bar into the logo menu dropdown. This consolidates navigation into a single menu button to save space.

```
Desktop: [Logo Menu] [Product OS] [Pricing] [Docs] [Library] [Company]
Mobile:  [Logo Menu ▼] (contains all navigation items)
```

## Mobile Menu Configuration

### 1. mobileDestination Property

Add to any menu item to control mobile behavior:

```typescript
{
    type: 'submenu',
    label: 'Handbook',
    link: '/handbook',
    items: processHandbookSidebar(handbookSidebar),
    mobileDestination: '/handbook', // On mobile, becomes a simple link
}
```

**Values:**
- `string` - URL to link to on mobile (converts submenu to simple link)
- `false` - Completely omit this item from mobile menu
- `undefined` - Use default mobile processing

### 2. mobileLink Property

Add to top-level menus to convert the menu trigger itself into a direct link on mobile:

```typescript
{
    trigger: 'Product OS',
    items: buildProductOSMenuItems(allProducts),
    mobileLink: '/products', // Entire menu becomes a link on mobile
}
```

### 3. Dynamic Product Links

The Docs menu automatically generates mobile destinations for product documentation based on product slugs:

```typescript
// Automatically converts:
'Product analytics' → '/docs/product-analytics'
'Session replay' → '/docs/session-replay'
'Feature flags' → '/docs/feature-flags'
// etc.
```

This uses the actual product data from `useProduct()` to ensure URLs stay synchronized when products are added or renamed.

## Implementation Details

### Menu Processing Flow

1. **useMenuData()** builds the menu structure
2. **processMobileNavItems()** processes items for mobile:
   - Converts menus with `mobileLink` to simple items
   - Filters out items with `mobileDestination: false`
   - Applies mobile destinations to docs items
   - Cleans up orphaned separators
3. **MenuBar component** renders the processed menu

### Separator Cleanup

When an item is omitted on mobile (`mobileDestination: false`), the system automatically removes preceding separators to prevent visual gaps:

```typescript
// Before filtering:
[Item A] [Separator] [Item B with mobileDestination: false]

// After filtering:
[Item A] // Separator is removed
```

### Nesting Reduction

Submenus are automatically converted to simple links on mobile:
- Submenus with `link` property → become direct links
- Submenus with `mobileDestination` → link to specified URL
- Deep nesting (3+ levels) → flattened to maximum 2 levels

## Examples

### Example 1: Omitting Items on Mobile

```typescript
{
    type: 'submenu',
    label: 'Like and subscribe',
    mobileDestination: false, // Hidden on mobile
    items: [
        { type: 'item', label: 'X', link: 'https://x.com/posthog' },
        { type: 'item', label: 'LinkedIn', link: 'https://linkedin.com/company/posthog' },
    ]
}
```

### Example 2: Direct Link on Mobile

```typescript
{
    trigger: 'Product OS',
    items: buildProductOSMenuItems(allProducts),
    mobileLink: '/products', // "Product OS" becomes a link to /products on mobile
}
```

### Example 3: Simplified Submenu

```typescript
{
    type: 'submenu',
    label: 'Handbook',
    link: '/handbook',
    items: processHandbookSidebar(handbookSidebar), // Complex nested structure
    mobileDestination: '/handbook', // Becomes simple link on mobile
}
```

## File Structure

- `menuData.tsx` - Menu data and mobile processing logic
- `index.tsx` - TaskBar component that renders the menu
- `../RadixUI/MenuBar.tsx` - Base menu component with mobile support

## Testing Mobile Menu

To test mobile menu behavior:

1. Open browser DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M or Cmd+Shift+M)
3. Set viewport width to < 768px
4. Refresh the page
5. Click the logo menu to see mobile navigation

## Key Functions

### processMobileNavItems()
Processes main navigation items for mobile display, handling:
- mobileLink conversion
- mobileDestination filtering
- Separator cleanup
- Docs menu special processing

### addDocsMenuMobileDestinations()
Dynamically adds mobile destinations to docs menu items based on product slugs from the product data.

### processMobileMenuItem() (in MenuBar.tsx)
Processes individual menu items for mobile display, converting submenus to simple links where appropriate.

## Maintenance Notes

- Product slugs for docs are pulled from `useProduct()` data, not hardcoded
- When adding new products, mobile destinations are automatically generated
- Test on actual mobile devices or browser mobile emulation
- The responsive state takes a moment to load, so initial render uses desktop layout