# Competitor Data

This directory contains centralized competitor comparison data. Each file represents a single competitor and includes all their product offerings and platform features.

## File Structure

Each competitor file exports a single object with the following structure:

```typescript
export const competitorName = {
  name: string           // Display name
  key: string           // Unique identifier
  assets: {
    icon?: string       // Path to icon/logo
    comparisonArticle?: string  // Link to comparison article
  }
  products: {
    [productHandle]: {
      available: boolean     // Does this product exist for this competitor?
      beta?: boolean         // Is it in beta?
      features: {
        [featureKey]: boolean | string  // Feature support (true/false or descriptive string)
      }
      integrations?: {       // Integration-specific features
        [integrationKey]: boolean
      }
    }
  }
  platform: {
    [platformFeature]: boolean | string  // Platform-level features
  }
  pricing: {
    model?: string       // Pricing model description
  }
}
```

## Product Handles

-   `error_tracking`
-   `session_replay`
-   `product_analytics`
-   `feature_flags`
-   `experiments`
-   `surveys`
-   `web_analytics`
-   `llm_analytics`
-   `revenue_analytics`
-   `data_warehouse`
-   `cdp`

## Usage

Competitor data is loaded dynamically by the `ProductComparisonTable` component and used to generate feature comparison tables across the site.

## Adding a New Competitor

1. Create a new file in this directory (e.g., `competitor-name.tsx`)
2. Export an object matching the structure above
3. Populate with available product and platform features
4. Reference feature keys from the `featureDefinitions/` directory

## Example

See `posthog.tsx` and `sentry.tsx` for complete examples.
