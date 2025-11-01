# Competitor Data Standardization Plan

## Goals
1. Consistent feature keys across all competitors
2. Alphabetized features within each group
3. Logical feature organization (nested vs flat)
4. All competitors have same feature set (with values as true/false/strings)

## Standardized Structure

### Platform (All competitors)
```typescript
platform: {
  deployment: {
    eu_hosting: boolean | string
    managed_reverse_proxy: boolean | string
    open_source: boolean | string
    self_host: boolean | string
  },
  pricing: {
    free_tier: boolean | string
    transparent_pricing: boolean | string
    usage_based_pricing: boolean | string
  },
  developer: {
    api: boolean | string
    collaboration: boolean | string
    local_evaluation: boolean | string
    mobile_sdks: boolean | string
    native_data_sources: boolean | string
    proxies: boolean | string
    sdks: boolean | string
    server_side_sdks: boolean | string
    sql: boolean | string
  },
  integrations: {
    azure_blob: boolean | string
    bigquery: boolean | string
    cdp: boolean | string
    ci_cd_integrations: boolean | string
    community_integrations: boolean | string
    csv_exports: boolean | string
    customer_io: boolean | string
    data_warehouse: boolean | string
    email_reports: boolean | string
    exports: boolean | string
    gcs: boolean | string
    google_ads: boolean | string
    hubspot: boolean | string
    imports: boolean | string
    intercom: boolean | string
    microsoft_teams: boolean | string
    redshift: boolean | string
    rudderstack: boolean | string
    s3: boolean | string
    salesforce: boolean | string
    segment: boolean | string
    sentry: boolean | string
    slack: boolean | string
    snowflake: boolean | string
    stripe: boolean | string
    warehouse_import: boolean | string
    wordpress: boolean | string
    zapier: boolean | string
    zendesk: boolean | string
  },
  security: {
    bot_blocking: boolean | string
    cookieless_tracking: boolean | string
    data_anonymization: boolean | string
    data_retention: boolean | string
    gdpr_ready: boolean | string
    hipaa_ready: boolean | string
    history_audit_logs: boolean | string
    reverse_proxy: boolean | string
    saml_sso: boolean | string
    soc2_certified: boolean | string
    two_factor_auth: boolean | string
    user_privacy_options: boolean | string
  },
  analytics_integration: {
    built_in_analytics: boolean | string
  }
}
```

### Web Analytics
```typescript
web_analytics: {
  available: boolean | string,
  features: {
    advertising_analytics: boolean | string
    bounce_rate: boolean | string
    bounce_rate_tracking: boolean | string
    breakdown_by_device_and_browser: boolean | string
    breakdown_by_geoip: boolean | string
    clickmaps: boolean | string
    conversions: boolean | string
    cookieless_tracking: boolean | string
    custom_channel_types: boolean | string
    entry_exit_paths: boolean | string
    first_party_cookies: boolean | string
    heatmaps: boolean | string
    hipaa_compliance: boolean | string
    integration_with_feature_flags: boolean | string
    integration_with_session_replay: boolean | string
    integration_with_surveys: boolean | string
    migration: boolean | string
    movement_maps: boolean | string
    open_source: boolean | string
    outbound_clicks: boolean | string
    pageviews: boolean | string
    pre_configured_dashboards: boolean | string
    real_time_reporting: boolean | string
    revenue_tracking: boolean | string
    script_size: boolean | string
    scrollmaps: boolean | string
    session_and_duration_tracking: boolean | string
    sessions: boolean | string
    snippet_install: boolean | string
    traffic_breakdown: boolean | string
    utm_tracking: boolean | string
    visitor_and_view_tracking: boolean | string
    web_vitals: boolean | string
    web_vitals_reporting: boolean | string
  }
}
```

(Continue for all products...)

## Migration Steps

1. **Phase 1: Platform Standardization** (All 33 files)
   - Move flat platform features to nested structure
   - Add missing platform features with `false` values
   - Alphabetize platform features

2. **Phase 2: Web Analytics** (11 files with web_analytics)
   - Add all 32 web_analytics features to all competitors
   - Alphabetize features
   - Standardize naming

3. **Phase 3: Product Analytics** (Most complex - 15+ files)
   - Flatten nested structures where appropriate
   - Add all features to all competitors
   - Alphabetize features

4. **Phase 4: Session Replay** (9 files)
   - Standardize platform_support nesting
   - Add all features
   - Alphabetize

5. **Phase 5: Feature Flags** (6 files)
   - Add all features
   - Alphabetize

6. **Phase 6: Experiments** (7 files)
   - Add all features
   - Alphabetize

7. **Phase 7: Surveys** (4 files)
   - Standardize presentation nesting
   - Add all features
   - Alphabetize

8. **Phase 8: Other Products** (Heatmaps, Error Tracking, CDP, Data Warehouse, Dashboards)
   - Add missing features
   - Alphabetize

9. **Phase 9: Verification**
   - Check all blog comparison files
   - Update any incorrect feature paths
