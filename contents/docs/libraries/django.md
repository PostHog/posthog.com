---
title: Django
icon: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/docs/integrate/frameworks/django.svg
---

PostHog makes it easy to get data about traffic and usage of your Django app. Integrating PostHog enables analytics, custom events capture, feature flags, and more.

This guide walks you through integrating PostHog into your Django app using the [Python SDK](/docs/libraries/python).

## Installation

To start, run `pip install posthog` to install PostHog’s Python SDK.

Then, set the PostHog API key and host in your `AppConfig` in your `your_app/apps.py` so that's it's available everywhere:

```python file=your_app/apps.py
from django.apps import AppConfig
import posthog

class YourAppConfig(AppConfig):
    name = "your_app_name"
    def ready(self):
        posthog.api_key = '<ph_project_api_key>'
        posthog.host = '<ph_instance_address>'
```

You can find your project API key and instance address in [your project settings](https://us.posthog.com/project/settings). 

Next, if you haven't done so already, make sure you add your `AppConfig` to your `settings.py` under `INSTALLED_APPS`:

```python file=settings.py
INSTALLED_APPS = [
    # other apps
    'your_app_name.apps.MyAppConfig',  # Add your app config
]
```

Lastly, to access PostHog in any file, simply import posthog and call the method you'd like. For example, to capture an event:

```python
import posthog

def some_request(request):
    posthog.capture('distinct_id_of_the_user', 'event_name')
```

## Next steps

For any technical questions for how to integrate specific PostHog features into Django (such as analytics, feature flags, A/B testing, etc.), have a look at our [Python SDK docs](/docs/libraries/python).

Alternatively, the following tutorials can help you get started:

- [Setting up Django analytics, feature flags, and more](/tutorials/django-analytics)
- [How to set up A/B tests in Django](/tutorials/django-ab-tests)

