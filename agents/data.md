# Data hooks

Reference this guide when working with product, customer, or navigation data.

PostHog is a multi-product company. Data is stored in structured files in central locations for site-wide availability.

## Product data

1. **Tool identity:** `src/data/tools.ts`
   - Build-safe source for shared identity and descriptions
   - Search-only titles, descriptions, and aliases are explicitly named
   - Used by Gatsby as well as the runtime product hooks
   - Include only distinct Tools; duplicate or UI-only product cards stay in runtime data
   - Keep icons, billing, relationships, and presentation content in the existing runtime data

2. **Primary runtime source:** `src/hooks/useProduct.ts`
   - Check here first for product information
   - Contains beta products, unreleased products, and "apps" (Webhooks, Notebooks, etc.)
   - Combines Tool metadata with icons, relationships, and presentation content

3. **Billed product data:** `src/hooks/useProducts.tsx`
   - Enriches the paid product subset with billing data
   - Is consumed by `useProduct.ts`; use `useProduct.ts` for general product lookup

## Customer data

**Source:** `src/hooks/useCustomers.ts`

Contains customer names, logos, and quotes used across the site.

## Navigation menus

**Source:** `src/navs/index.js`

Most navigation data lives here:
- `companyMenu`
- `handbookSidebar`
- `communityMenu`
- `sexyLegalMenu`
- `docsMenu`
- `pricingMenu`
- `menu`

Other menu data lives in `src/components/TaskBarMenu/menuData.tsx`

**Important:** This file is shared with the live website. During development, filter the JSON data on the front end rather than modifying this file directly.
