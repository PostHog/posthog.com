---
title: How to set up Python (and Flask) error tracking
date: 2025-03-17
author:
 - ian-vanagas
tags:
 - error tracking
---

No matter how hard you try to prevent errors, they inevitably happen. To limit their impact, you need to catch and fix them as quickly as possible. PostHog provides  error tracking to help you do this. 

In this tutorial, we set up error tracking in both a basic Python script and a slightly more complicated Flask app. In both, we go from writing the code to installing PostHog to capturing errors.

## Autocapturing errors in Python

PostHog can automatically capture unhandled exceptions in Python, as long as it’s version 3.9 or newer. 

To do this, start by creating a `python-error` directory with a virtual environment.

```bash
mkdir python-errors
cd python-errors
python -m venv venv
```

Next, activate that virtual environment and install PostHog.

```bash
source venv/bin/activate
pip install posthog
```

Once done, we can create our script in an `error.py` file. It initializes PostHog with a project API key and host from [your project settings](https://us.posthog.com/settings/project), and then intentionally raises an exception. We can use PostHog’s `enable_exception_autocapture` config option to automatically capture that unhandled exception.

This looks like this:

```python
# error.py
import os
from posthog import Posthog

posthog = Posthog(
    api_key="<ph_project_api_key>",
    host="<ph_client_api_host>",
    enable_exception_autocapture=True
)

# Intentionally raise an unhandled exception
def cause_exception():
    return 1 / 0  # Division by zero exception

cause_exception()
```

Now, run `python error.py`. You’ll cause an error that is autocaptured by PostHog.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_03_17_at_14_16_46_2x_cc3a14d076.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_03_17_at_14_17_04_2x_dcf616f140.png"
  alt="PostHog"
  classes="rounded"
/>

## Capturing errors in Flask

Python frameworks like Flask often have built-in error handlers. This means PostHog’s default error autocapture won’t work. Instead, we need to manually capture errors. 

To show this off, we’ll build a basic Flask app. To start, ensure your virtual environment is still active then install Flask:

```bash
pip install flask
```

Next, create an `app.py` file with the following basic setup:

```python
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return '<h1>Welcome to our Flask app</h1>'

@app.route('/error')
def trigger_error():
    raise ValueError('This is a triggered backend error!')

@app.errorhandler(Exception)
def handle_exception(e):
    response = jsonify({'message': str(e)})
    response.status_code = 500
    return response

if __name__ == '__main__':
    app.run(debug=True)
```

You can then run `python app.py` and go to `http://localhost:5000/error` to see your intentional error (that’s handled by Flask).

### Setting up PostHog

Because we already installed PostHog, all we need to do now is initialize it with your project API key and host from [your project settings](https://us.posthog.com/settings/project), calling `capture_exception()` like this:  

```python
from flask import Flask, jsonify
from posthog import Posthog

app = Flask(__name__)

posthog = Posthog('<ph_project_api_key>', host='<ph_client_api_host>')

@app.route('/')
def home():
    return '<h1>Welcome to our Flask app</h1>'

@app.route('/error')
def trigger_error():
    raise ValueError('This is a triggered backend error!')

@app.errorhandler(Exception)
def handle_exception(e):
    posthog.capture_exception(e)
    response = jsonify({'message': str(e)})
    response.status_code = 500
    return response

if __name__ == '__main__':
    app.run(debug=True)
```

When you go to `http://localhost:5000/error` now, you’ll see the error captured in PostHog.

## Monitoring errors in PostHog

Beyond the basic [activity tab view](/docs/activity), PostHog has a dedicated [error tracking tab](https://us.posthog.com/error_tracking) to view captured errors grouped into issues along with stack traces, frequency, and more.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_03_17_at_15_28_23_2x_af7585e805.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_03_17_at_15_28_06_2x_f54c28c199.png"
  alt="PostHog"
  classes="rounded"
/>

You can click into any of these errors to get more details on them, including a stack trace as well as archive, resolve, or suppress them. On top of this, you can analyze `$exception` events like you would any event in PostHog, including setting up [trends](/docs/product-analytics/trends/overview) for them and querying them with [SQL](/docs/product-analytics/sql).