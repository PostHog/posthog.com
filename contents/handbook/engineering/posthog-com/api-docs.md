---
title: Editing the API docs
sidebar: Handbook
showTitle: true
---

The [PostHog API docs](/docs/api) are generated using [drf-spectacular](https://drf-spectacular.readthedocs.io/en/latest/readme.html). It looks at the Django models and djangorestframework serializers.

> **Note:** We don't automatically add new API endpoints to the sidebar. You need to add those to [src/navs/index.js](https://github.com/PostHog/posthog.com/blob/master/src/navs/index.js)

You can add a `help_text="Field that does x"` attribute to any Model or Serializer field to help users understand what a specific field is used for:

```python
class Insight(models.Model):
    last_refresh: models.DateTimeField = models.DateTimeField(blank=True, null=True, help_text="When the cache for the result of this insight was last refreshed.")

class InsightSerializer(TaggedItemSerializerMixin, InsightBasicSerializer):
    filters_hash = serializers.CharField(
        read_only=True,
        help_text="A hash of the filters that generate this insight.",
    )
```

To add a description to the top of a page, add a comment to the **viewset** class:

```python
class InsightViewSet(TaggedItemViewSetMixin, StructuredViewSetMixin, viewsets.ModelViewSet):
    """
    Stores saved insights along with their entire configuration options. Saved insights can be stored as standalone
    reports or part of a dashboard.
    """
```

You can do the same thing for specific endpoints.

```python
@action(methods=["GET", "POST"], detail=False)
def trend(self, request: request.Request, *args: Any, **kwargs: Any) -> Response:
    """
    Test comment, which [even supports markdown](https://example.com)
    """
```

To check what any changes will roughly look like locally, you can go to http://127.0.0.1:8000/api/schema/redoc/.

### Insights serializer

The serializer for insight [lives here](https://github.com/PostHog/posthog/blob/master/posthog/api/insight_serializers.py). Each time an insight gets created we check it against these serializers, and we'll send an error to Sentry (but not the user) if it doesn't match, to ensure the API docs are up to date.

### Documenting custom endpoints

If you have an `@action` endpoint or a custom endpoint (that doesn't use DRF) you can still document by providing a serializer for the request and response.

```python
from drf_spectacular.utils import OpenApiResponse
from posthog.api.documentation import extend_schema
@extend_schema(
    request=FunnelSerializer,
    responses=OpenApiResponse(
        response=FunnelStepsResultsSerializer,
        description="Note, if funnel_viz_type is set the response will be different.",
     ),
    methods=["POST"],
    tags=["funnel"],
    operation_id="Funnels",
)
@action(methods=["GET", "POST"], detail=False)
def funnel(self, request: request.Request, *args: Any, **kwargs: Any) -> Response:
```

### Testing API docs locally

To test or develop the API docs locally, you need to create a personal API key (see top of this page) and then export it before running gatsby, in the same terminal window:

```bash
export POSTHOG_PERSONAL_API_KEY=yourkey
```