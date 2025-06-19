### Django Middleware

The Python SDK provides Django middleware that automatically wraps all requests with PostHog contexts. This middleware extracts session and user information from request headers and tags all events captured during the request with relevant metadata.

#### Basic Setup

Add the middleware to your Django settings:

```python
MIDDLEWARE = [
    # ... other middleware
    'posthog.integrations.django.PosthogContextMiddleware',
    # ... other middleware
]
```

The middleware automatically extracts and uses:
- **Session ID** from the `X-POSTHOG-SESSION-ID` header
- **Distinct ID** from the `X-POSTHOG-DISTINCT-ID` header
- **Current URL** as `$current_url`
- **Request method** as `$request_method`

All events captured during the request (including exceptions) will include these properties and be associated with the extracted session and distinct ID.

#### Exception Capture

By default, the middleware captures exceptions and sends them to PostHog's error tracking. Disable this by setting:

```python
# settings.py
POSTHOG_MW_CAPTURE_EXCEPTIONS = False
```

#### Adding Custom Tags

Use `POSTHOG_MW_EXTRA_TAGS` to add custom properties to all requests:

```python
# settings.py
def add_user_tags(request):
    # type: (HttpRequest) -> Dict[str, Any]
    tags = {}
    if hasattr(request, 'user') and request.user.is_authenticated:
        tags['user_id'] = request.user.id
        tags['email'] = request.user.email
    return tags

POSTHOG_MW_EXTRA_TAGS = add_user_tags
```

#### Filtering Requests

Skip tracking for certain requests using `POSTHOG_MW_REQUEST_FILTER`:

```python
# settings.py
def should_track_request(request):
    # type: (HttpRequest) -> bool
    # Don't track health checks or admin requests
    if request.path.startswith('/health') or request.path.startswith('/admin'):
        return False
    return True

POSTHOG_MW_REQUEST_FILTER = should_track_request
```

#### Modifying Default Tags

Use `POSTHOG_MW_TAG_MAP` to modify or remove default tags:

```python
# settings.py
def customize_tags(tags):
    # type: (Dict[str, Any]) -> Dict[str, Any]
    # Remove URL for privacy
    tags.pop('$current_url', None)
    # Add custom prefix to method
    if '$request_method' in tags:
        tags['http_method'] = tags.pop('$request_method')
    return tags

POSTHOG_MW_TAG_MAP = customize_tags
```

#### Complete Configuration Example

```python
# settings.py
def add_request_context(request):
    # type: (HttpRequest) -> Dict[str, Any]
    tags = {}
    if hasattr(request, 'user') and request.user.is_authenticated:
        tags['user_type'] = 'authenticated'
        tags['user_id'] = str(request.user.id)
    else:
        tags['user_type'] = 'anonymous'

    # Add request info
    tags['user_agent'] = request.META.get('HTTP_USER_AGENT', '')
    return tags

def filter_tracking(request):
    # type: (HttpRequest) -> bool
    # Skip internal endpoints
    return not request.path.startswith(('/health', '/metrics', '/admin'))

def clean_tags(tags):
    # type: (Dict[str, Any]) -> Dict[str, Any]
    # Remove sensitive data
    tags.pop('user_agent', None)
    return tags

POSTHOG_MW_EXTRA_TAGS = add_request_context
POSTHOG_MW_REQUEST_FILTER = filter_tracking
POSTHOG_MW_TAG_MAP = clean_tags
POSTHOG_MW_CAPTURE_EXCEPTIONS = True
```

All events captured within the request context will automatically include the configured tags and be associated with the session and user identified from the request headers.
