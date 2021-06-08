---
title: Feature Flags Spec
sidebar: Handbook
showTitle: true
---

Client-side PostHog libraries (like `posthog-js`) are able to have a rather simple feature flags implementation, given that they only ever have to deal with one user. As such, we can make a request at the start of a session to fetch feature flags that are enabled for a user, keep those on memory, and periodically check for updates. 

On server-side libraries, however, we need to be able to handle _n_ distinct IDs. As such, we are unable to fetch user-specific flags proactively, since there is an infinite number of possible distinct IDs that one can call `isFeatureEnabled` with. As a result, we've developed an approach to implementing feature flags on our server-side libraries, described in this doc.

## A note: simple flags

To improve performance of feature flag methods on the server, all PostHog feature flags have a property `is_simple_flag`. A simple flag is one that does not rely on any filters, so calculating if it is on for a given user or not depends entirely on two things: rollout percentage and user distinct ID. 

Distinct ID is passed in by the user, so all we need is the rollout percentage to determine if a flag is on without having to offload the calculation to the PostHog instance. 

## Pseudocode Implementation

```python

class FeatureFlagsPoller:
    constructor():
        # Check if there's a Personal API Key available in addition to the Project API Key

    poll() -> void:
        # 1. Set up a poller to fetch a list of available flags from api/feature_flag using the Personal API Key
        # 2. Store the result

    isFeatureEnabled(key: string, distinctId: string, defaultValue: boolean) -> boolean:
        flag = flagObjectOrNull(key)

        if !flag:
            return defaultValue
        
        result = defaultValue
        if flag['is_simple_flag']:
            result = isSimpleFlagEnabled(key, distinctId, flag['rollout_percentage'])
        else:
            # Send a POST request to /decide passing the user distinct_id in the request data
            # Authenticate with the Project API Key
            response = post('/decide/', data={ 'distinct_id': distinctId  })
            result = key in response.data.featureFlags
        
        # Capture a posthog event called $feature_flag_called, passing the properties $feature_flag (the key) and $feature_flag_response
        client.capture('$feature_flag_called', { '$feature_flag': key, '$feature_flag_response': result })
        return result

    isSimpleFlagEnabled(key: string, distinctId: string, rolloutPercentage: int) -> boolean:
        if (!rolloutPercentage):
            return true

        # 1. Get the SHA1 hash of the a string in the following format: key.distinctId
        # 2. Convert it to hex format and take the first 15 chars
        # 3. Cast it to an integer from base16
        # 4. Divide it by the following hexadecimal number: 0xfffffffffffffff (1152921504606847000)
        # 5. Return: (hashToInteger / 0xfffffffffffffff) <= (rolloutPercentage / 100)
```

### Ensuring consistency with isSimpleFlagEnabled

To check if your `isSimpleFlag` implementation is in accordance with others, the following should be true:

1. `SHA1('a.b')` should equal `'69f6642c9d71b463485b4faf4e989dc3fe77a8c6'`
2. The integer value for the hash of `'a.b'` should equal `0.4139158829615955`