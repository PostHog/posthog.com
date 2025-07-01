## Contexts

The Python SDK uses nested contexts for managing state that's shared across events. Each context carries tags and can be associated with a [session ID](/docs/data/sessions) and [distinct ID](/docs/getting-started/identify-users). Contexts are the recommended way to manage things like "which user is taking this action" (through `identify_context`), rather than manually passing user state through your apps stack.

When an event (including exceptions) is captured in a context, the event properties include the context tags. If the context has been associated with a session or distinct ID, the event will be too. This is useful for adding properties to multiple events during a single user's interaction with your product.

You can enter a context using the `with` statement:

```python
with posthog.new_context():
    posthog.tag("transaction_id", "abc123")
    posthog.tag("some_arbitrary_value", {"tags": "can be dicts"})

    # Posthog sessions are UUIDv7's, used to track a sequence of events that occur within a single user session
    # See https://posthog.com/docs/data/sessions
    posthog.set_context_session(session_id)

    # Setting the context-level distinct-id. See below for more details
    posthog.identify_context(user_id)

    # This event will be captured with the tags set above, and associated session "test"
    posthog.capture("order_processed")
```

Contexts are persisted across function calls, so if you enter one and then call a function, and capture an event in the called function, it'll use the context tags and session ID set in the parent context:

```python
def some_function():
    # When called from `outer_function`, this event will be captured with the property some-key="value-4"
    posthog.capture("order_processed")


def outer_function():
    with posthog.new_context():
        posthog.tag("some-key", "value-4")
        some_function()

```

Contexts are nested, so tags added to a parent context are inherited by child contexts. If you set the same tag in both a parent and child context, the child context's value overrides the parent's at event capture (but the parent context won't be affected). This nesting also applies to session ID's and distinct ID's.

```python
with posthog.new_context():
    posthog.tag("some-key", "value-1")
    posthog.tag("some-other-key", "another-value")
    with posthog.new_context():
        posthog.tag("some-key", "value-2")
        # This event is captured with some-key="value-2" and some-other-key="another-value"
        posthog.capture("order_processed")

    # This event is captured with some-key="value-1" and some-other-key="another-value"
    posthog.capture("order_processed")

```

You can disable this nesting behavior by passing `fresh=True` to `new_context`:

```python
with posthog.new_context(fresh=True):
    posthog.tag("some-key", "value-2")
    # This event only has the property some-key="value-2" from the fresh context
    posthog.capture("order_processed")

```

> **Note:** Distinct IDs, session IDs, and properties passed directly to calls to `capture` and related functions override context state in the final event captured.

### Contexts and user identification

Contexts can be associated with a distinct ID by calling `posthog.identify_context`:

```python
posthog.identify_context("distinct-id")
```

Within a context associated with a distinct ID, all events captured will be associated with that user. You can override the distinct ID for a specific event by passing a `distinct_id` argument to `capture`:

```python
with posthog.new_context():
    posthog.identify_context("distinct-id")
    posthog.capture("order_processed") # will be associated with distinct-id
    posthog.capture("order_processed", distinct_id="another-distinct-id") # will be associated with another-distinct-id
```

### Contexts and sessions

Contexts can be associated with a session ID by calling `posthog.set_context_session`. Session ID's are UUIDv7 strings. If you're using the posthog JS SDK on your frontend, that SDK will generate a session ID for you, and you can retrieve it by calling `posthog.get_session_id()` there. We recommend passing session ID's to your backend by setting the `X-POSTHOG-SESSION-ID` header, and extracting it in your request handler (if you're using our Django middleware, this will happen automatically).

```python
with posthog.new_context():
    posthog.set_context_session(request.get_header("X-POSTHOG-SESSION-ID"))
```

If you associate a context with a session, you'll be able to do things like:
- See backend events on the session timeline when viewing session replays
- View session replays for users that triggered a backend exception in error tracking

### Exception capture

By default exceptions raised within a context are captured and available in the [error tracking](/docs/error-tracking) dashboard. You can override this behavior by passing `capture_exceptions=False` to `new_context`:

```python
with posthog.new_context(capture_exceptions=False):
    posthog.tag("transaction_id", "abc123")
    posthog.tag("some_arbitrary_value", {"tags": "can be dicts"})

    # This event will be captured with the tags set above
    posthog.capture("order_processed")
    # This exception will not be captured
    raise Exception("Order processing failed")
```

### Decorating functions

The SDK exposes a function decorator. It takes the same arguments as `new_context` and provides a handy way to mark a whole function as being in a new context. For example:

```python
@posthog.scoped(fresh=True)
def process_order(order_id):
    # This event will be captured with the transaction_id set above
    posthog.capture("order_processed")
    # This exception will be captured with the transaction_id set above
    raise Exception("Order processing failed")
```
