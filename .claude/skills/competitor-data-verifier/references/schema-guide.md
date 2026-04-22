# CompetitorData Schema Reference

This document maps competitorData TypeScript fields to verification strategies and common source locations.

## Schema Structure

```typescript
{
  name: string,
  key: string,
  assets: {
    icon: string,
    comparisonArticle: string,
  },
  products: {
    [product_name]: {
      available: boolean,
      pricing: {
        free_tier: string,
      },
      features: {
        [feature_name]: boolean | string,
      }
    }
  },
  platform: {
    deployment: { ... },
    pricing: { ... },
    integrations: { ... },
    security: { ... },
  }
}
```

## Verification Strategies by Category

### Product Availability

**Field**: `products.{product}.available`  
**Type**: boolean  
**Sources**:
- Product pages (e.g., `/products`, `/features`)
- Pricing page (shows available products)
- Main navigation menu
- Documentation index

**Verification Strategy**:
- Check if product is mentioned on main product pages
- Look for dedicated documentation section
- Verify pricing includes this product
- Confirm it's not marked as "deprecated" or "legacy"

**Common Patterns**:
- "Available now" → `true`
- "Coming soon" → `false` (unless already launched)
- "Beta" → `true` (if accessible)
- "Enterprise only" → Note in features

### Pricing Information

**Field**: `products.{product}.pricing.free_tier`  
**Type**: string  
**Sources**:
- `/pricing` page
- `/plans` page  
- Documentation "Getting Started" sections
- Plan comparison tables

**Verification Strategy**:
1. Find pricing page
2. Locate free tier or starter plan
3. Extract specific limits (events, users, recordings, etc.)
4. Note any "credit card required" stipulations

**Format Examples**:
- `"1 million events"`
- `"10k monthly tracked users"`
- `"5,000 recordings"`
- `"None"` (if no free tier)
- `"Paid only"`

**Common Gotchas**:
- Some competitors count users, others count events
- Free trials vs. free tiers are different
- "Forever free" vs. time-limited free usage

### Feature Availability

**Field**: `products.{product}.features.{feature_name}`  
**Type**: boolean | string  
**Sources**:
- Feature comparison pages
- Documentation feature lists
- Plan comparison tables
- Feature-specific docs pages

**Values**:
- `true` - Available on all plans
- `false` - Not available
- `"Paid only"` - Requires paid plan
- `"Enterprise"` - Enterprise plan only
- `"{Plan} plan or higher"` - Available from specific tier
- `"Add-on"` - Available as paid add-on
- `"Paid add-on"` - Additional cost on any plan

**Verification Strategy**:
1. Search docs for feature name
2. Check if feature page mentions plan requirements
3. Look at pricing page for feature gates
4. Verify in comparison tables

**Common Language to Look For**:
- "Available on" → Extract plan name
- "Requires" → Note requirement
- "Coming soon" → `false`
- "Beta" → Usually `true` if accessible
- "Enterprise feature" → `"Enterprise"`
- "Upgrade to access" → Check which plan
- "Add-on" → `"Add-on"` or `"Paid add-on"`

### Platform: Deployment

**Fields**:
- `platform.deployment.eu_hosting` - boolean
- `platform.deployment.open_source` - boolean  
- `platform.deployment.self_host` - boolean

**Sources**:
- Security/compliance pages
- Documentation deployment sections
- GitHub repository (for open source)
- Data residency pages

**Verification Strategy**:
- EU hosting: Look for "EU data residency", "European servers", "GDPR-compliant hosting"
- Open source: Check for GitHub repo, "open source" claims, license information
- Self-host: Look for "on-premise", "self-hosted", "deploy anywhere" options

### Platform: Pricing Model

**Fields**:
- `platform.pricing.free_tier` - boolean
- `platform.pricing.transparent_pricing` - boolean
- `platform.pricing.self_serve` - boolean | string

**Sources**:
- Pricing page
- Sign-up flow
- Documentation

**Verification**:
- Free tier: Any usage available without payment
- Transparent: Pricing published publicly (not "Contact Sales" only)
- Self-serve: Can sign up and use without sales contact

**Values for self_serve**:
- `true` - Fully self-serve
- `false` - Requires sales contact
- `"Limited"` - Some plans self-serve, others require sales
- `"{Plan} only"` - Specific plans are self-serve

### Platform: Integrations

**Field**: `platform.integrations.{integration_name}`  
**Type**: boolean  
**Sources**:
- Integrations page
- Marketplace
- Documentation integration sections
- API docs

**Common Integrations to Check**:
- segment
- rudderstack  
- slack
- microsoft_teams
- zapier
- sentry
- zendesk
- stripe
- hubspot
- intercom
- google_ads
- datadog

**Verification Strategy**:
1. Find integrations/marketplace page
2. Search for specific integration name
3. Verify it's currently available (not deprecated)
4. Check if it requires specific plan

### Platform: Security & Compliance

**Fields**:
- `platform.security.soc2_certified` - boolean
- `platform.security.hipaa_ready` - boolean
- `platform.security.gdpr_ready` - boolean
- `platform.security.saml_sso` - boolean | string
- `platform.security.two_factor_auth` - boolean

**Sources**:
- `/security` page
- `/compliance` page
- `/trust` page
- Footer links
- Documentation security section

**Verification Strategy**:
- Look for explicit "SOC 2 Type II certified"
- HIPAA: "HIPAA-ready", "BAA available"
- GDPR: "GDPR compliant", "data residency"
- SSO: Check if SAML available and on which plans
- 2FA: Look in account settings or security docs

**Common Patterns**:
- SSO often requires specific plan: `"Enterprise"` or `"Growth and Enterprise"`
- Certifications should be current (check report dates)

## Product-Specific Verification

### Product Analytics

**Key Features to Verify**:
- `autocapture` - Automatic event tracking
- `sql_editor` - SQL query access
- `group_analytics` - Account-level analytics
- `formula_mode` - Custom calculations
- `ai_insight_builder` - AI-powered insights

**Look for**:
- Documentation on "autocapture" or "automatic tracking"
- SQL access in "custom queries" or "advanced analytics"
- "Group analytics" or "account analytics"
- "Formula" or "calculated metrics"
- "AI insights" or "natural language queries"

### Session Replay

**Key Features to Verify**:
- `console_logs` - Developer console in replay
- `network_monitor` - Network requests visible
- `dom_explorer` - Inspect DOM during replay
- `performance_monitoring` - Performance metrics
- `privacy_masking` - PII protection

**Platform Support**:
- `web_app_recordings`
- `ios_recordings`
- `android_recordings`
- `react_native_recordings`
- `flutter_recordings`

**Look for**:
- "DevTools" integration
- "Network activity"
- "Inspect element"
- "Performance metrics" or "web vitals"
- Mobile SDK documentation

### Feature Flags

**Key Features**:
- `boolean_flags` - On/off flags
- `multivariate_flags` - A/B/n testing
- `json_payloads` - Complex configuration
- `local_evaluation` - Client-side evaluation
- `target_by_cohorts` - Cohort-based targeting

**Look for**:
- "Boolean flags" or "simple flags"
- "Multivariate" or "multiple variants"
- "JSON payloads" or "remote config"
- "Local evaluation" or "edge computing"
- "Targeting" or "audience segmentation"

### Experiments

**Key Features**:
- `custom_goals` - Custom success metrics
- `secondary_metrics` - Secondary KPIs
- `statistical_significance` - Significance calculations
- `statistics_engine` - Bayesian vs. Frequentist

**Test Types**:
- `ab_testing` - A/B tests
- `abn_testing` - Multi-variant tests
- `holdout_testing` - Holdout groups

**Look for**:
- "Custom metrics" or "success metrics"
- "Guardrail metrics" or "secondary metrics"
- "Statistical significance" or "confidence intervals"
- "Bayesian" or "Frequentist" methodology
- Test types in experimentation docs

## Confidence Scoring Guide

### High Confidence
- Explicit statement on official page
- Clear pricing table entry
- Feature listed in documentation index
- Screenshot showing feature
- Current (< 3 months old) source

### Medium Confidence  
- Implied from documentation
- Mentioned in blog post
- Visible in demo video
- Listed in changelog
- Source is 3-6 months old

### Low Confidence
- Inferred from marketing copy
- Third-party source (reviews, forums)
- Ambiguous documentation
- Conflicting information across pages
- Source is > 6 months old

## Quote Extraction Best Practices

**Good Quotes**:
- "SQL queries are now available to all Growth and Enterprise customers"
- "Free tier includes 5,000 session replays per month"
- "SOC 2 Type II certified as of March 2024"

**Avoid**:
- Marketing fluff without specifics
- Ambiguous statements
- Quotes taken out of context
- Quotes without clear feature names

**Format**:
Always include:
1. The exact quote (in quotation marks)
2. The source URL
3. The date accessed (if time-sensitive)
4. The page section (if long page)

## Common Verification Challenges

### Challenge: Feature Behind Login
**Solution**: Note "Requires account to verify" and use lower confidence

### Challenge: Conflicting Information
**Solution**: Document all sources and note the conflict explicitly

### Challenge: Regional Differences  
**Solution**: Note which region the information applies to

### Challenge: Beta Features
**Solution**: Mark as available if accessible, note beta status in findings

### Challenge: Deprecated Features
**Solution**: Check changelog for deprecation notices, mark as unavailable

### Challenge: Plan-Gated Features
**Solution**: Extract exact plan requirement, use format "{Plan} plan or higher"

## Update Format Templates

### Adding New Feature
```typescript
// Add to products.{product}.features
new_feature: true,  // with source URL comment
```

### Updating Pricing
```typescript
pricing: {
- free_tier: '1,000 recordings',
+ free_tier: '5,000 recordings',  // Updated {date} - {source_url}
}
```

### Changing Feature Availability  
```typescript
features: {
- sql_editor: false,
+ sql_editor: 'Growth plan or higher',  // Added {date} - {source_url}
}
```

### Adding New Product
```typescript
new_product: {
  available: true,  // Launched {date} - {source_url}
  pricing: {
    free_tier: '{limit}',
  },
  features: {
    // ... features
  }
}
```