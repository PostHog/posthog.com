---
title: Django
icon: ../../images/docs/integrate/frameworks/django.svg
---

PostHog makes it easy to get data about traffic and usage of your Django app. Integrating PostHog enables analytics, custom events capture, feature flags, and more.

This guide walks you through integrating PostHog into your Django app using the [Python SDK](/docs/libraries/python).

## Installation

To start, run `pip install posthog` to install PostHog’s Python SDK.

Then, initialize PostHog where you'd like to use it. For example, here's how to capture an event in a simple view:

```python file=views.py
from django.http import HttpResponse
from posthog import Posthog

def home(request):
    posthog = Posthog('<ph_project_api_key>', host='<ph_instance_address>')
    posthog.capture('disticint_id_of_your_user', 'route_called')

    return HttpResponse(f"""
    <!DOCTYPE html>
    <html>
      <body>
        <h1>Django docs</h1>
      </body>
    </html>
    """)
```

You can find your project API key and instance address in [your project settings](https://us.posthog.com/project/settings). 

## Next steps

For any technical questions for how to integrate specific PostHog features into Django (such as analytics, feature flags, A/B testing, etc.), have a look at our [Python SDK docs](/docs/libraries/python).

Alternatively, the following tutorials can help you get started:

- [Setting up Django analytics, feature flags, and more](/tutorials/django-analytics)
- [How to set up A/B tests in Django](/tutorials/django-ab-tests)

