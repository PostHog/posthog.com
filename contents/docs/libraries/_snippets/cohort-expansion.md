
**Cohort expansion**

To support feature flags that depend on cohorts locally as well, we translate the cohort definition into person properties, so that the person properties you set can be used to evaluate cohorts as well.

However, there are a few constraints here and we don't support doing this for arbitrary cohorts. Cohorts won't be evaluated locally if:

1. They have non-person properties
2. There's more than one cohort in the feature flag definition.
3. The cohort in the feature flag is in the same group as another condition.
4. The cohort has nested AND-OR filters. Only simple cohorts that have a top level OR group, and inner level ANDs will be evaluated locally.

Note that this restriction is for local evaluation only. If you're hitting PostHog's servers, all of these cohorts will be evaluated as expected.
