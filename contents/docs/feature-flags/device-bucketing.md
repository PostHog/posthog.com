---
title: Device bucketing for anonymous users
showTitle: true
sidebar: Docs
---

By default, feature flags use the user's distinct ID to determine which value (or variant) to return. This is called **user bucketing** — the distinct ID is hashed against the flag key to assign a result.

**Device bucketing** uses the device ID instead. This means the flag result is tied to the device rather than the user, which keeps the experience consistent even when the user's distinct ID changes — such as when they log in or create an account.

This distinction matters most for **multivariate flags and experiments**, where you need anonymous visitors to stay in the same variant throughout their session.

## When to use device bucketing

Device bucketing is useful when the flag targets users who aren't yet identified:

- **Signup and onboarding flows:** A user sees a new signup form before logging in. Device bucketing ensures they continue seeing the same variant after they create an account.
- **Pre-authentication pages:** Landing pages, pricing pages, or other features shown before a user is identified.
- **Experiments on anonymous traffic:** When running A/B tests on pages visited by both anonymous and logged-in users, device bucketing prevents users from switching variants mid-experiment.

## User bucketing vs. device bucketing

| | User bucketing | Device bucketing |
|---|---|---|
| **Hashes on** | User's distinct ID | Device ID |
| **Best for** | Logged-in, identified users | Anonymous or pre-login experiences |
| **Consistent across login** | May change if distinct ID changes | Stays consistent on the same device |
| **Cross-device consistency** | Yes, if user is identified | No, each device is evaluated independently |

## How to set it up

When creating or editing a feature flag, change the **Match by** dropdown under **Release conditions** from **User** to **Device**.

That's it — PostHog will now use the device ID to determine the flag value for that release condition.

## Relationship to persisting flags across authentication

PostHog also offers [persisting feature flags across authentication steps](/docs/feature-flags/creating-feature-flags#persisting-feature-flags-across-authentication-steps-optional), which keeps the flag value the same before and after login. However, that feature comes with significant tradeoffs: it's incompatible with local evaluation and bootstrapping, requires person profiles, and introduces slower flag responses.

Device bucketing is a simpler alternative. If your flag only needs to be consistent on the same device through the login flow, device bucketing achieves this without the performance tradeoffs of flag persistence.

## Further reading

- [Creating feature flags](/docs/feature-flags/creating-feature-flags)
- [Feature flag best practices](/docs/feature-flags/best-practices)
- [Target flags with groups, pages, machines, and more](/docs/feature-flags/targeting-groups)
