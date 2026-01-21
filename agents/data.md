# Data hooks

Reference this guide when working with product, customer, or navigation data.

PostHog is a multi-product company. Data is stored in structured files in central locations for site-wide availability.

## Product data

1. **Primary source:** `src/hooks/useProduct.ts`
   - Check here first for product information
   - Contains beta products, unreleased products, and "apps" (Webhooks, Notebooks, etc.)
   - Used for displaying icons and metadata

2. **Extended data:** `src/hooks/useProducts.tsx`
   - Extends `useProduct.ts` when slug/handle isn't found
   - Always reference `useProduct.ts` in code—it handles the extending internally

## Customer data

**Source:** `src/hooks/useCustomers.ts`

Contains customer names, logos, and quotes used across the site.

## Navigation menus

**Source:** `src/navs/index.js`

All navigation data lives here:
- `companyMenu`
- `handbookSidebar`
- `communityMenu`
- `sexyLegalMenu`
- `docsMenu`
- `pricingMenu`
- `productMenu`
- `menu`

**Important:** This file is shared with the live website. During development, filter the JSON data on the front end rather than modifying this file directly.
