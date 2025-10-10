# Presentation System

The Presentation system is a flexible framework for creating custom sales presentations and demos. It uses JSON configuration files to define slide content and templates that render the slides.

## Directory Structure

```
src/
├── components/Presentation/
│   ├── Templates/          # Slide templates
│   │   ├── StackedTemplate.tsx
│   │   ├── ColumnsTemplate.tsx
│   │   ├── ProductTemplate.tsx
│   │   ├── PricingTemplate.tsx
│   │   └── BookingTemplate.tsx
│   └── Utilities/          # Shared utilities
└── presentations/          # JSON configuration files
    ├── default.json
    ├── product-managers.json
    ├── product-engineers.json
    ├── product-directors.json
    └── engineering-managers.json
```

## Creating a Presentation

Presentations are defined in JSON files in the `src/presentations/` directory. Each file contains:

```json
{
  "name": "Presentation Name",
  "slides": {
    "slide_key": {
      "template": "template_name",
      "name": "Slide Name",
      // ... template-specific props
    }
  }
}
```

## Available Templates

### 1. StackedTemplate

A simple template with header, description, and optional image. Best for overview slides.

**Template Key:** `"stacked"`

**Schema:**
```json
{
  "template": "stacked",
  "name": "Overview",
  "title": "Your slide title",
  "description": "HTML description goes here",
  "descriptionWidth": "@2xl:w-1/2",
  "image": "/path/to/image.png",
  "imageDark": "/path/to/dark-mode-image.png",
  "imageAlt": "Alt text for image",
  "bgColor": "light",
  "textColor": "text-primary"
}
```

**Props:**
- `title` (string, required) - Main heading
- `description` (string, optional) - HTML content for description
- `descriptionWidth` (string, optional) - Tailwind class for description width (e.g., `@2xl:w-1/2`)
- `image` (string, optional) - Path to image
- `imageDark` (string, optional) - Path to dark mode version of image
- `imageAlt` (string, optional) - Alt text for image
- `bgColor` (string, optional) - Background color class (default: `light`)
- `textColor` (string, optional) - Text color class (default: `text-primary`)

**Special Behavior:**
- When `slideKey === 'overview'`, displays Hogzilla background image and special title/description formatting

**Example:**
```json
{
  "template": "stacked",
  "name": "Overview",
  "title": "PostHog can help {companyName} build better products.",
  "description": "By integrating PostHog into your app, you'll understand users better.",
  "descriptionWidth": "@2xl:w-1/2"
}
```

---

### 2. ColumnsTemplate

Multi-column layout for displaying multiple products or features side-by-side. Dynamically renders content from product data hooks.

**Template Key:** `"columns"`

**Schema:**
```json
{
  "template": "columns",
  "name": "All-in-one",
  "title": "PostHog apps work together",
  "description": "Understand usage, identify friction, assign issues – all in one place.",
  "bgColor": "light",
  "textColor": "text-primary",
  "content": [
    {
      "handle": "product_analytics",
      "title": "Product Analytics",
      "description": "<p>Description here</p>",
      "screenshot": "home"
    }
  ]
}
```

**Props:**
- `title` (string, required) - Main heading
- `description` (string, optional) - Subheading text
- `content` (array, optional) - Array of product items to display
  - `handle` (string, required) - Product handle (matches product data file name)
  - `title` (string, required) - Product title
  - `description` (string, required) - HTML description
  - `screenshot` (string, required) - Screenshot key from product data
- `bgColor` (string, optional) - Background color class
- `textColor` (string, optional) - Text color class

**Special Behavior:**
- Fetches product data (icons, screenshots) from `hooks/productData/{handle}.tsx`
- Renders products in flexible columns that adapt to the number of items
- When `slideKey === 'cta'`, renders a centered call-to-action layout instead

**Example:**
```json
{
  "template": "columns",
  "name": "All-in-one",
  "title": "PostHog apps work together",
  "description": "Understand usage, identify friction, assign issues – all in one place.",
  "content": [
    {
      "handle": "product_analytics",
      "title": "Product Analytics",
      "description": "<p>Easily uncover user friction by following the drop-offs in a funnel.</p>",
      "screenshot": "home"
    },
    {
      "handle": "session_replay",
      "title": "Session Replay",
      "description": "<p>Watch session recordings to understand friction in the user experience.</p>",
      "screenshot": "home"
    },
    {
      "handle": "error_tracking",
      "title": "Error Tracking",
      "description": "<p>Assign issues to engineers to get user problems solved quickly.</p>",
      "screenshot": "home"
    }
  ]
}
```

---

### 3. ProductTemplate

Displays a single product with screenshot and description. Fetches product data from hooks.

**Template Key:** `"product"`

**Schema:**
```json
{
  "template": "product",
  "name": "Product Analytics",
  "handle": "product_analytics",
  "screenshot": "overview",
  "screenshotClasses": "rounded-md shadow-2xl overflow-hidden",
  "title": "Understand your users",
  "description": "<p>Track events, visualize trends, and build dashboards.</p>",
  "contentWidth": "@2xl:basis-4/12",
  "bgColor": "blue",
  "textColor": "text-white"
}
```

**Props:**
- `handle` (string, required) - Product handle (e.g., `product_analytics`, `session_replay`)
- `screenshot` (string, optional) - Screenshot key from product data
- `screenshotClasses` (string, optional) - CSS classes for screenshot wrapper
- `title` (string, required) - Slide title
- `description` (string, optional) - HTML description
- `contentWidth` (string, optional) - Tailwind width class for content area (default: `@2xl:basis-4/12`)
- `bgColor` (string, optional) - Background color (uses product's default color if not specified)
- `textColor` (string, optional) - Text color (uses product's default if not specified)

**How it Works:**
- Uses the `useProduct` hook to fetch product data from `hooks/productData/{handle}.tsx`
- Product data includes: name, icon, color, screenshots, and more
- Automatically displays product icon and name in the footer

**Example:**
```json
{
  "template": "product",
  "handle": "session_replay",
  "screenshot": "overview",
  "title": "See what users actually do",
  "description": "<p>Watch real user sessions to understand UX issues, debug problems, and see where users get stuck.</p>"
}
```

---

### 4. PricingTemplate

Specialized template for displaying pricing information with free tier and usage tiers.

**Template Key:** `"pricing"`

**Schema:**
```json
{
  "template": "pricing",
  "name": "Pricing",
  "title": "Pricing",
  "description": "PostHog offers usage-based pricing...",
  "image": "/images/products/product-analytics/screenshot-billing.png",
  "bgColor": "white",
  "textColor": "text-black"
}
```

**Props:**
- `title` (string, required) - Main heading
- `description` (string, optional) - Description text
- `image` (string, optional) - Path to billing screenshot
- `imageDark` (string, optional) - Dark mode version
- `imageAlt` (string, optional) - Alt text
- `bgColor` (string, optional) - Background color
- `textColor` (string, optional) - Text color

**Special Features:**
- Displays PostHog's free tier products automatically
- Shows expandable pricing tiers accordion
- Includes expand/collapse all functionality

**Example:**
```json
{
  "template": "pricing",
  "name": "Pricing",
  "title": "Usage-based pricing with a monthly free tier",
  "description": "PostHog offers usage-based pricing. This means you only pay for what you use.",
  "image": "/images/products/product-analytics/screenshot-billing.png"
}
```

---

### 5. BookingTemplate

Two-column layout with content on the left and a booking form on the right.

**Template Key:** `"booking"`

**Schema:**
```json
{
  "template": "booking",
  "name": "Get a demo",
  "title": "Get a demo",
  "description": "<p><strong>No demos required</strong> – you can try PostHog without ever talking to us. But if you'd like personalized demo, book a time.</p>",
  "bgColor": "gradient-to-b from-[#FFF1D5] to-[#DAE0EB]",
  "textColor": "text-black"
}
```

**Props:**
- `title` (string, required) - Main heading
- `description` (string, optional) - HTML description
- `bgColor` (string, optional) - Background color/gradient
- `textColor` (string, optional) - Text color

**Special Features:**
- Left column: Company info, sales rep details, CTA button
- Right column: Booking scheduler with cookie consent
- Scheduler only loads after user clicks "Load scheduler" button
- Includes "Skip the call" button linking to signup

**Example:**
```json
{
  "template": "booking",
  "name": "Get a demo",
  "title": "Get a demo",
  "description": "<p><strong>No demos required</strong> – you can try PostHog without ever talking to us. But if you'd like personalized demo, book a time.</p>"
}
```

---

## Dynamic Variables

All templates support dynamic variable replacement:

- `{companyName}` - Replaced with the company name from the URL or data

**Example:**
```json
{
  "title": "PostHog can help {companyName} build better products."
}
```

## Common Props

These props are available across all templates (automatically passed by the presentation system):

- `companyLogo` (string) - URL to company logo
- `companyName` (string) - Company name
- `salesRep` (object) - Sales representative data
  - `name` (string)
  - `title` (string)
  - `email` (string)
  - `photo` (string)
  - `color` (string)
- `slideKey` (string) - Unique identifier for the slide

## Product Data Integration

Templates like `ProductTemplate` and `ColumnsTemplate` fetch data from product hooks located in `hooks/productData/`.

**Product handles:**
- `product_analytics`
- `session_replay`
- `feature_flags`
- `experiments`
- `surveys`
- `error_tracking`
- `data_warehouse`
- `web_analytics`
- And more...

**Product data includes:**
- `name` - Product name
- `Icon` - React component for product icon
- `color` - Product color theme
- `screenshots` - Object mapping screenshot keys to image data
  - `src` - CloudinaryImage URL
  - `srcDark` - Dark mode version (optional)
  - `alt` - Alt text

**Example product data structure:**
```typescript
{
  Icon: IconGraph,
  name: 'Product Analytics',
  color: 'blue',
  screenshots: {
    overview: {
      src: 'https://res.cloudinary.com/...',
      srcDark: 'https://res.cloudinary.com/...',
      alt: 'Product analytics screenshot'
    },
    home: {
      src: 'https://res.cloudinary.com/...',
      alt: 'Analytics home'
    }
  }
}
```

## Best Practices

### 1. Use HTML in Descriptions
Descriptions support HTML for formatting:
```json
{
  "description": "<p>First paragraph.</p><p>Second paragraph with <strong>bold text</strong>.</p>"
}
```

### 2. Provide Alt Text
Always include alt text for images:
```json
{
  "image": "/path/to/image.png",
  "imageAlt": "Screenshot showing dashboard with graphs"
}
```

### 3. Use Dark Mode Images
When available, provide dark mode versions:
```json
{
  "image": "/images/screenshot-light.png",
  "imageDark": "/images/screenshot-dark.png"
}
```

### 4. Leverage Product Data
Instead of hardcoding product information, use product handles to fetch data:
```json
{
  "template": "product",
  "handle": "session_replay",
  "screenshot": "overview"
}
```

### 5. Organize Slides Logically
Structure presentations in a logical flow:
1. Overview
2. Product features
3. Pricing
4. Call to action

## Creating New Templates

To create a new template:

1. Create a new file in `Templates/` directory
2. Define the props interface
3. Export a default function component
4. Register the template in `[...path].tsx` switch statement

**Example template structure:**
```tsx
import React from 'react'

interface MyTemplateProps {
  title: string
  // ... other props
}

export default function MyTemplate({
  title,
  // ... destructure props
}: MyTemplateProps) {
  return (
    <div>
      <h1>{title}</h1>
      {/* Template content */}
    </div>
  )
}
```

## Routing

Presentations are accessed via the URL pattern:
```
/for/{company-domain}/{role-or-id}
```

**Example:**
```
/for/acme-corp/product-managers
/for/example.com/engineering-managers
```

The system will:
1. Look up company data from Clearbit or URL
2. Load the appropriate presentation JSON
3. Render slides with company-specific data
4. Display sales rep information if available

## Responsive Design

All templates use container queries (`@2xl:`) for responsive layouts:
- Mobile: Single column, stacked layout
- Desktop: Multi-column, side-by-side layout

Templates automatically adapt based on viewport size and presentation mode.

## Related Files

- **Main renderer:** `src/pages/for/[...path].tsx`
- **Product data:** `src/hooks/productData/*.tsx`
- **Product hook:** `src/hooks/useProduct.ts`
- **Presentation data:** `src/presentations/*.json`
