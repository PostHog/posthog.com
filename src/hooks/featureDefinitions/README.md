# Feature Definitions

This directory contains feature definitions for all products and platform features. These definitions provide consistent names and descriptions that are referenced by competitor festivalCompetitor data files and comparison table components.

## File Structure

Each file exports an object organized by feature sets and individual features:

```typescript
export const productFeatures = {
  featureSet: {
    featureKey: {
      name: string        // Display name
      description: string  // Description text
    }
  }
}
```

## Files

-   `error_tracking.tsx` - Error tracking features
-   `session_replay.tsx` - Session replay features
-   `platform.tsx` - Platform-level features (deployment, pricing, etc.)
-   (Additional product feature files to be added)

## Feature Organization

Features are grouped into logical sets:

### Error Tracking

-   `core` - Core error tracking features
-   `monitoring` - Monitoring and performance features
-   `integrations` - Integration capabilities

### Session Replay

-   `ai` - AI-powered features
-   `platform_support` - Platform/framework support
-   `targeting` - Recording targeting options
-   `detection` - Automatic detection features
-   `privacy` - Privacy and compliance
-   `export` - Export capabilities

### Platform

-   `deployment` - Deployment options
-   `pricing` - Pricing model features
-   `support` - Support capabilities
-   `integrations` - CI/CD and tool integrations

## Usage

Feature definitions are referenced in:

-   Competitor data files (`competitorData/*.tsx`)
-   Comparison table row configurations
-   The ProductComparisonTable component

When using in row configs, reference features with shorthand notation:

-   `product.featureSet` - Entire feature set
-   `product.featureSet.featureKey` - Specific feature

## Adding Features

When adding a new feature:

1. Add to the appropriate product feature definition file
2. Update competitor data files as needed
3. Feature key should be snake_case
