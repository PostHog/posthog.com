---
title: Flask
icon: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/docs/integrate/frameworks/flask.svg
---

PostHog makes it easy to get data about traffic and usage of your Flask app. Integrating PostHog enables analytics, custom events capture, feature flags, and more.

This guide walks you through integrating PostHog into your Flask app using the [Python SDK](/docs/libraries/python).

## Installation

To start, run `pip install posthog` to install PostHog’s Python SDK.

Then, initialize PostHog where you'd like to use it. For example, here's how to capture an event in a simple route:

```python file=app.py
package main
from flask import Flask, render_template, request, redirect, session, url_for
from posthog import Posthog

posthog = Posthog(
  '<ph_project_api_key>', 
  host='<ph_instance_address>'
)

@app.route('/api/dashboard', methods=['POST'])
def api_dashboard():
    posthog.capture(
        'distinct_id_of_your_user', 
        'dashboard_api_called'
    )
    return '', 204

```

You can find your project API key and instance address in [your project settings](https://us.posthog.com/project/settings). 

## Next steps

For any technical questions for how to integrate specific PostHog features into Flask (such as analytics, feature flags, A/B testing, etc.), have a look at our [Python SDK docs](/docs/libraries/python).

Alternatively, the following tutorials can help you get started:

- [How to set up analytics in Python and Flask](/tutorials/python-analytics)
- [How to set up feature flags in Python and Flask](/tutorials/python-feature-flags)
- [How to set up A/B tests in Python and Flask](/tutorials/python-ab-testing)

