---
title: App navigation
sidebar: Docs
showTitle: true
---

This page contains the navigation scheme and current navigation elements. It is used to provide guidance when adding new features and to document navigation within the app.

Navigation is accomplished with a main navigation bar (also called a sidebar) and a secondary navigation bar (also called a top bar).

## Main navigation
The main bar holds the most used features (e.g. funnels) and all feature groups (e.g. live stream).

- The main navigation bar should not hold more than 12 elements. Having more elements will introduce too much noise, reduce relevancy for key elements, and add more complexity and strain to the navigation process. The current design should be rethinked if more elements are needed.
- Feature groups are menu items that encompass multiple different features into a single view because of the relationship between those features makes it more intuitive for them to be found together.

The main navigation bar contains the following elements (nested elements are feature groups):

```
.
├── Dashboards
├── Funnels
├── Insights
│   └── Trends
│   └── User Paths
│   └── Sessions
├── Retention
├── Feature Flags  
├── Actions & Events
├── Sessions
├── Persons
├── Cohorts
├── Plugins
├── Project
└── Toolbar
```

### Transient
- It might make sense to move plugins in the future to the settings page, but as this is a new feature, we keep it in the main navigation to increase discoverability.


## Secondary navigation
The top bar is used to aid in some secondary navigation, mainly for configuration or billing settings that don't require continuous acccess. The secondary navigation also allows switching between projects and organizations. The following items are navigated primarily from the secondary navigation:
- User account settings (e.g. password changing, personal API keys, ...)
- Project settings (e.g. ingestion key, permitted domains, toolbar settings, ...)
- Organization & billing (cloud only) settings (e.g. invite members, ...)
    - Licenses management (self-hosted only)
- Instance status page (self-hosted only)


## Adding navigation items
When adding features, the following guidelines can be followed to understand where to place the navigation items.
- If the new feature is part of a feature group, add it there.
    - Same thing if the new feature introduces a new feature group (e.g. adding a rolling retention feature).
- If the new feature is related to some configuration or other type of setting, it's better to keep it in the secondary navigation.
- When introducing brand-new features it will likely make sense to introduce a whole new element to the navigation bar.
- When adding new elements to the main navigation bar, it's good to review usage of the different features to consider creating new feature groups (i.e. grouping more features). 

**Please note that the above are guidelines, and there might be cases where a different approach makes sense, always keep in mind the most important thing is a great user experience, and testing is the best way to find out the right approach.**