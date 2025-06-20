### Contexts

The Python SDK exposes nested contexts for managing state that's shared across events. Each context carries tags and can be associated with a [session ID](/docs/data/sessions) and [distinct ID](/docs/getting-started/identify-users). 

When an event (including exceptions) is captured in a context, the event properties include the context tags. If the context has been associated with a session or distinct ID, the event will be too. This is useful for adding properties to multiple events during a single user's interaction with your product.

You can enter a context using the `with` statement:

```python
with posthog.new_context():
    posthog.tag("transaction_id", "abc123")
    posthog.tag("some_arbitrary_value", {"tags": "can be dicts"})

    posthog.set_context_session("test")

    # This event will be captured with the tags set above, and associated session "test"
    posthog.capture("distinct-id", "order_processed")
```

Contexts are nested, so tags added to a parent context are inherited by child contexts. If you set the same tag in both a parent and child context, the child context's value overrides the parent's at event capture (but the parent context won't be affected). This nesting behavior also applies to session and distinct ID associations.

```python
with posthog.new_context():
    posthog.tag("some-key", "value-1")
    posthog.tag("some-other-key", "another-value")
    with posthog.new_context():
        posthog.tag("some-key", "value-2")
        # This event is captured with some-key="value-2" and some-other-key="another-value"
        posthog.capture("distinct-id", "order_processed")

    # This event is captured with some-key="value-1" and some-other-key="another-value"
    posthog.capture("distinct-id", "order_processed")

```

You can disable this nesting behavior by passing `fresh=True` to `new_context`:

```python
with posthog.new_context(fresh=True):
    posthog.tag("some-key", "value-2")
    # This event only has the property some-key="value-2" from the fresh context
    posthog.capture("order_processed")

```

> **Note:** Distinct IDs, session IDs, and properties passed directly to calls to `capture` and related functions override context tags in the final event properties.

### Exception capture

By default exceptions raised within a context are captured   and available in the [error tracking](https://posthog.com/docs/error-tracking) dashboard. You can override this behavior by passing `capture_exceptions=False` to `new_context`:

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

### Context identification

In current versions of the SDK, the module level `capture` and related functions require a `distinct_id` to be passed explicitly, and so will never use the context `distinct_id`. Exception autocapture uses the context `distinct_id` if available, as it does not require a `distinct_id` to be passed explicitly. 

Future versions of the SDK will relax this constraint, and it is recommended to call `posthog.identify_context` as early as possible.
