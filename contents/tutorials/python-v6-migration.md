---
title: Migrating to PostHog Python SDK V6
date: 2025-07-29
author:
  - vincent-ge
showTitle: true
sidebar: Docs
tags:
  - product-os
---

import { CalloutBox } from 'components/Docs/CalloutBox'

> If you're just looking for instructions to upgrade to `6.x`, skip directly to the [migration guide](#migrating-from-v5-to-v6).

Version `6.x` of the PostHog Python SDK introduces a new [`context()`](/docs/libraries/python#contexts) API for scope-based state sharing across captures along with a series of breaking changes. This guide walks through changes introduced and how to migrate from `5.x` to `6.x`.

## Overview

Here are the major changes from `5.x` to `6.x`:

| Type | Summary |
|------|--------|
| **New** | [Scoped contexts](#new-feature-contexts) for state management across event captures |
| **New** | [Django contexts middleware](/docs/libraries/django#django-contexts-middleware) wraps all requests in a context, extracts user and session information from headers automatically |
| **Breaking** | The `identify()` method is deprecated in favor of contexts |
| **Breaking** | Deprecated `page()` and `screen()` methods. Prefer use of `capture()` on the backend or capturing page/screen view events on the client-end |
| **Breaking** | Order of arguments updated for capture-related methods. You must update calls to use kwargs before upgrading |
| **Breaking** | Capture methods now return the UUID of the captured event, rather than the full event object |
| **Breaking** | Deletes unmaintained exception capture integrations, which is replaced by the general purpose Django middleware |

<CalloutBox icon="IconInfo" title="Upgrade best practices">

You should always pin versions using the [compatible release clause](https://packaging.python.org/en/latest/specifications/version-specifiers/#compatible-release) to avoid auto-upgrading to an uncompatible version accidentally.

</CalloutBox>

## New feature: contexts

Version `6.x` introduces contexts. Events captured under the same context scope will share properties set on the context. This can be used to identify who, where, and when an event is triggered.

This is very convenient for server-side use cases like [Django](/docs/libraries/django#django-contexts-middleware) apps, where each request might be handled for a different user. 

```python
from posthog import new_context, tag, set_context_session, identify_context

with new_context():
  # Identify user and session
  set_context_session(session_id)
  identify_context(user_id)

  # Set properties share by events in the context
  tag("transaction_id", "abc123")

  # This event is captured with the distinct ID, session ID, and tags set above
  posthog.capture("order_processed")
```

Contexts can be passed down the call tree. You can iteratively add tags to the context to keep track of events leading up to a capture call. For example:

```python
from django.http import HttpResponse
from posthog import new_context, tag, set_context_session, identify_context, capture
from posthog.contexts import get_tags

def handle_order(request):
    with new_context():
        set_context_session(session_id)
        identify_context(user_id)
        validate_order()
    return HttpResponse("Hello, World!")

def validate_order():
    tag("order_steps", ["validate_order"])
    process_payment()

def process_payment():
    tag("order_steps", [*get_tags()["order_steps"], "process_payment"])
    update_inventory()

def update_inventory():
    tag("order_steps", [*get_tags()["order_steps"], "update_inventory"])
    capture("order_completed")
```

When `capture` is finally called, the `order_completed` event will have a custom event property called `order_steps` with a list of values `"validate_order"`, `"process_payment"`, and `"update_inventory"`.

Contexts can also be nested. This means that:

- Parent context values are shared with child contexts. 
- Child contexts can override parent context value within the child context's scope.
- When a child context exits, the overridden parent context is restored.

```python
from posthog import new_context, tag

with new_context():
    tag("some-key", "value-1")
    tag("some-other-key", "another-value")
    with new_context():
        tag("some-key", "value-2")
        # This event is captured with some-key="value-2" and some-other-key="another-value"
        posthog.capture("order_processed")

    # This event is captured with some-key="value-1" and some-other-key="another-value"
    posthog.capture("order_processed")
```

Learn more about contexts in the [Python SDK docs](/docs/libraries/python#contexts).

## New: Django contexts middleware

The new [contexts middleware for Django](/docs/libraries/django#django-contexts-middleware) wraps every request in a context. The context will automatically capture the following information:

| Property | Source |
| --- | --- |
| Session ID | From `X-POSTHOG-SESSION-ID` header, if present |
| Distinct ID | From `X-POSTHOG-DISTINCT-ID` header, if present |
| `$current_url` | Current URL |
| `$request_method` | Request method |

If you're using the PostHog JavaScript web SDK on the client-side, [enabling tracing headers](/docs/data/sessions#automatically-sending-session-ids) will populate these headers automatically.

This middleware will also automatically capture exceptions. You can learn more about this middle ware in the [Django integration docs](/docs/libraries/django#django-contexts-middleware).

## Breaking change: identification

The `identify()` method no longer exists in the Python SDK. On client SDKs, `identify()` declares which user is using the device. This pattern doesn't apply to server SDKs, where each request handled could belong to a different user.

The preferred way to identify events in `6.x` is to use contexts. For example, when handling requests from the client, you can parse the [distinct ID](/docs/data/persons) and [session ID](/docs/data/sessions) from the incoming request and set this information on a context.

```python
# Using contexts
from posthog import new_context, identify_context, set_context_session

@scoped(fresh=True)
def handle_request(request):
  identify_context(request.get_header('X-POSTHOG-DISTINCT-ID'))
  set_context_session(request.get_header("X-POSTHOG-SESSION-ID"))
  posthog.capture('event_name')
```

All events captured under this context's scope, which is all events captured during the handling of this request will be identified by the distinct ID of the user and session ID.

Alternatively, you can specify distinct ID explicitly during a capture and set persons properties:

```python
posthog.capture(
  'event_name',
  distinct_id='user-distinct-id',
  properties={
    '$set': {'name': 'Max Hedgehog'},
    '$set_once': {'initial_url': '/blog'}
  }
)
```

## Breaking change: capture method signature

Distinct ID is no longer a required first argument for capture methods like `capture()` and `capture_exception()`. This is a consequence of preferring contexts to identify events. When you specify a distinct ID in a `identify_context()`, you won't need to pass it in again when capturing events.

Here's a before and after of what this might look like:

```python
# BEFORE: capturing in 5.x
posthog.capture('distinct_id_of_the_user', 'user_signed_up')

# AFTER: capturing in 6.x
with new_context():
    identify_context('distinct_id_of_the_user')
    posthog.capture('user_signed_up')
```

You can still capture events with an explicit `distinct_id` like before, but it must be passed in as a keyword argument:

```python 
# You can also capture events with a specific distinct_id
posthog.capture('some-custom-action', distinct_id='distinct_id_of_the_user')
```
Capture methods also now return the event UUID instead of the full event object. You can find the exact function signature in the [Python SDK reference](/docs/references/posthog-python#capture).

## Breaking change: Django error tracking integration

You might be using the old Django error tracking integration like this in `5.x`:

```python
from posthog import Posthog
from posthog.exception_capture import Integrations

Posthog("<ph_project_api_key>", enable_exception_autocapture=True, exception_autocapture_integrations = [Integrations.Django])
```

This is deprecated and no longer necessary in `6.x`, instead, the general purpose [context middleware](/docs/libraries/django#django-contexts-middleware) also handles error capturing.

## Migrating from V5 to V6

If you're planning to upgrade from `5.x` to `6.x` of the Python SDK, here are the changes you need to make to complete the migration. You can do this by installing `"posthog~=6.0.0"` using your package manager of choice.

### 1. Replace `identify()` calls

The `identify()` method is removed. You can instead set properties during capture or explicitly use `set()` to set persons properties to create [person profiles](/docs/data/persons).

**Before:**

```python
posthog.identify(
    distinct_id='user123',
    properties={'name': 'John Doe', 'email': 'john@example.com'}
)
```

**Now:**

```python
# Captures identified events if the current context is identified
# Or if you pass a distinct ID explicitly. 
posthog.capture(
    'event_name',
    distinct_id='user-distinct-id',
    properties={
        '$set': {'name': 'Max Hedgehog'},
        '$set_once': {'initial_url': '/blog'}
    }
)

# Using contexts
from posthog import new_context, identify_context
with new_context():
    identify_context('user-distinct-id')
    posthog.capture('event_name')

# Or set explicitly
posthog.set(
    distinct_id='userb',
    properties={'name': 'John Doe', 'email': 'john@example.com'}
)
```

### 2. Replace `screen()` and `page()` calls

The methods `screen()` and `page()` are removed. They are aliases for the `capture()` method. Instead, use `capture()` explicitly to capture `$pageview` events. You can check the [activity tab](https://app.posthog.com/activity/explore) to see what properties are captured in a `$pageview` event.

**Before:**

```python
posthog.page(
    distinct_id=user_id,
    url=url,
    properties={...}
)
```

**Now:**

```python
from posthog import identify_context, capture

identify_context(user_id)
capture('$pageview', 
    properties={
        '$current_url': url,
        ...
    }
)
```

### 3. Update `capture()` and `capture_exception()` calls

The `capture()` and `capture_exception()` methods now take keyword arguments instead of positional arguments. The distinct ID is now optional.

**Before:**

```python
posthog.capture("user123", "button_clicked", {"button_id": "123"})
```

**Now:**
```python
### New pattern with contexts
with posthog.new_context():
    posthog.identify_context("user123")
    posthog.tag("button_id": "123")
    # The event name is the first argument, and can be passed positionally, or as a keyword argument in a later position
    posthog.capture("button_pressed")

# Or explicitly state distinct ID
posthog.capture(distinct_id="user123", event="button_clicked", properties={"button_id": "123"})
```

### 4. Replace the Django error handling integration

The `exception_capture` module is removed. Instead, use the [context middleware](/docs/libraries/django#django-contexts-middleware) to capture exceptions.

**Before:**

```python
from posthog import Posthog
from posthog.exception_capture import Integrations

Posthog("<ph_project_api_key>", enable_exception_autocapture=True, exception_autocapture_integrations = [Integrations.Django])
```

**Now:**

```python
# In your Django `settings.py` file
MIDDLEWARE = [
    # ... other middleware
    'posthog.integrations.django.PosthogContextMiddleware',
    # ... other middleware
]

POSTHOG_MW_CAPTURE_EXCEPTIONS = True
```

### 5. Adopt contexts

Contexts are new. While they're not a breaking change, we recommend that you adopt the contexts pattern for easier management of state between captured events. See the [context docs](docs/libraries/python) to learn more.

## Further reading

- [Python SDK docs](/docs/libraries/python)
- [Full Python SDK reference](/docs/references/posthog-python)
- [Django contexts middleware docs](/docs/libraries/django#django-contexts-middleware)
- [Contexts docs](/docs/libraries/python#contexts)
- [Identification](/docs/product-analytics/identify)
