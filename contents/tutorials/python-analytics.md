---
title: How to set up Python analytics in Flask
date: 2024-02-22
author:
  - lior-neu-ner
tags:
  - product analytics
---

import { ProductScreenshot } from 'components/ProductScreenshot'
export const EventsInPostHogLight = "https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/tutorials/python-analytics/events-light.png"
export const EventsInPostHogDark = "https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/tutorials/python-analytics/events-dark.png"
export const InsightLight = "https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/tutorials/python-analytics/insight-light.png"
export const InsightDark = "https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/tutorials/python-analytics/insight-dark.png"

[Product analytics](/product-analytics) enable you to gather and analyze data about how users interact with your Python app. To show you how to set up analytics, in this tutorial we create a basic Python app with [Flask](https://flask.palletsprojects.com/), add PostHog, and use it to [capture events](/docs/product-analytics/capture-events) and [create insights](/docs/product-analytics/insights).

## 1. Create a basic Flask app

We start by creating a simple Flask app that has two pages:

1. A `login` page where a user can enter their name, email, and company name in a form.
2. A `dashboard` page that has some text and a button.

First, make sure Python and Flask are installed. If Flask is not installed, you can install it via pip:

```bash
pip3 install Flask
```

Create a new folder for your project called `flask-analytics` and set up a basic project structure:

```bash
mkdir flask-analytics
cd flask-analytics
mkdir templates static
touch app.py
cd ./templates
touch login.html dashboard.html
cd ..
```

Then, we set up our app routes in `app.py`:

```python file=app.py
from flask import Flask, render_template, request, redirect, session, url_for

app = Flask(__name__)
app.secret_key = 'a_super_secret_key!' # you don't need to replace this

@app.route('/')
def index():
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login():
    session['name'] = request.form['name']
    session['email'] = request.form['email']
    session['company_name'] = request.form['company_name']
    return redirect(url_for('dashboard'))

@app.route('/dashboard')
def dashboard():
    if 'name' in session:
        return render_template('dashboard.html', session=session)
    return redirect(url_for('index'))

@app.route('/api/dashboard', methods=['POST'])
def api_dashboard():
    # Placeholder for API logic. We'll add this later
    return '', 204

if __name__ == '__main__':
    app.run(port=8000, debug=True)
```

Lastly, we set up the basic layout for our HTML pages:

```html file=templates/login.html
<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
    <style>
        label, input, button {
            display: block;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <form action="{{ url_for('login') }}" method="POST">
        <label for="name">Name:</label>
        <input type="text" name="name" required>

        <label for="email">Email:</label>
        <input type="email" name="email" required>

        <label for="company_name">Company Name:</label>
        <input type="text" name="company_name" required>

        <button type="submit">Log in</button>
    </form>
</body>
</html>
```

```html file=templates/dashboard.html
<!DOCTYPE html>
<html>
<head>
    <title>Dashboard</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
</head>
<body>
    <h1>Welcome, {{ session['name'] }} from {{ session['company_name'] }}!</h1>

    <form id="dashboardForm" action="{{ url_for('api_dashboard') }}" method="POST">
        <input type="hidden" name="email" value="{{ session['email'] }}">
        <input type="hidden" name="name" value="{{ session['name'] }}">
        <input type="hidden" name="company_name" value="{{ session['company_name'] }}">
        <button type="submit">Click Me</button>
    </form>

    <script>
    $(document).ready(function() {
        $('#dashboardForm').on('submit', function(e) {
            e.preventDefault();
            $.ajax({
                url: $(this).attr('action'),
                type: 'POST',
                data: $(this).serialize(),
            });
        });
    });
    </script>
</body>
</html>
```

Run `python3 app.py` and navigate to `http://localhost:8000` to see our app in action. Enter anything on the login page to save some session details.

![Basic Python app](https://res.cloudinary.com/dmukukwp6/video/upload/v1710055416/posthog.com/contents/images/tutorials/python-analytics/basic-python-app.mp4)

## 2. Add PostHog to your app

With our app set up, it’s time to install and set up PostHog. If you don't have a PostHog instance, you can [sign up for free](https://us.posthog.com/signup).

Run `pip3 install posthog` to install [PostHog's Python SDK](/docs/libraries/python). Then, initialize PostHog in `app.py` using your project API key and instance address (you can find these in [your project settings](https://us.posthog.com/project/settings)):

```py file=apo.py
package main
from flask import Flask, render_template, request, redirect, session, url_for
from posthog import Posthog

posthog = Posthog(
  '<ph_project_api_key>', 
  host='<ph_instance_address>'
)

# rest of your code
```

With this set up, we're ready to capture events.

## 3. Implement the event capture code

To show how to capture events with PostHog, we capture an event when the button on the `dashboard` page is clicked. To do this, we call [`posthog.capture()`](/docs/libraries/python#capturing-events):

```python file=app.py
@app.route('/api/dashboard', methods=['POST'])
def api_dashboard():
    email = request.form.get('email')
    posthog.capture(
        email, 
        'home_api_called'
    )
    return '', 204
```

With this set up, refresh your app and click the button on the `dashboard` page a few times. You should now see the captured event in your [PostHog activity tab](https://us.posthog.com/events).

<ProductScreenshot
  imageLight={EventsInPostHogLight} 
  imageDark={EventsInPostHogDark} 
  alt="Events in PostHog" 
  classes="rounded"
/>

> 💡 **PostHog tip: Setting the correct `distinct_id`** 
> 
> When calling `posthog.capture()`, you need to provide a `distinct_id` argument. This is a unique identifier for your user and enables you to correctly attribute events to them. 
>
> For logged-in users, you typically use their email or database ID. For logged-out or anonymous users, you should use a unique identifier, either generated by you or the PostHog [JavaScript web library](/docs/libraries/js) (which can then be accessed in the cookies. See an example of accessing the PostHog cookie in our [Nuxt tutorial](/tutorials/nuxtjs-ab-tests#server-side-rendering)).

### Setting event properties

When capturing events, you can optionally include additional information by setting the `properties` argument. This is helpful for breaking down or filtering events when creating [insights](/docs/product-analytics/insights).

As an example, we add the user's name as an event property:

```python file=app.py
@app.route('/api/dashboard', methods=['POST'])
def api_dashboard():
    email = request.form.get('email')
    name = request.form.get('name')
    posthog.capture(
        email, 
        'home_api_called',
        properties={
            "user_name": name
        }
    )
    return '', 204
```

### Capturing group events

[Groups](/docs/product-analytics/group-analytics) are a powerful feature in PostHog that aggregate events based on entities, such as organizations or companies. This is especially helpful for B2B SaaS apps, where often you want to view insights such as `number of active companies` or `company churn rate`.

To enable group analytics, you'll need to [upgrade](https://us.posthog.com/organization/billing) your PostHog account to include them. This requires entering your credit card, but don't worry, we have a [generous free tier](/pricing) of 1 million events per month – so you won't be charged anything yet.

To create groups in PostHog, simply include them in your code when capturing events by setting the `groups` argument:

```python file=app.py
@app.route('/api/dashboard', methods=['POST'])
def api_dashboard():
    email = request.form.get('email')
    name = request.form.get('name')
    company_name = request.form.get('company_name')
    posthog.capture(
        email, 
        'home_api_called',
        properties={
            "user_name": name
        },
        groups={'company': company_name}
    )
    return '', 204
```

In the above example, we create a group type `company`, and then set the value as the unique identifier for that specific company. This enables us to breakdown insights by company (we show you how to do this in the next section).

## 4. Create an insight in PostHog

Restart your app and capture events using different inputs in the `login` page. This will capture events for different users and companies and enable us to show the power of PostHog insights.

Next, go to the [Product analytics](https://us.posthog.com/insights) tab in PostHog and click the **+ New insight** button. PostHog supports many different types of insights, such as [trends](/docs/user-guides/trends), [funnels](/docs/user-guides/funnels), [paths](/docs/user-guides/paths) and more.

In this tutorial, we create a simple trend insight:

1. Select the **Trends** tab.
2. Under the **Series** header select the `home_api_called` event. 
3. Click the **Total count** dropdown to change how events are aggregated. You can choose options such as `Count per user`, `Unique users`, `Unique company(s)`, and more. You can also add filters or breakdown based on properties. 

For example, in the image below we set our insight to show number of unique users that captured the `home_api_called` event where the `user_name` property is equal to `Max`:

<ProductScreenshot
  imageLight={InsightLight} 
  imageDark={InsightDark} 
  alt="Insight created in PostHog" 
  classes="rounded"
/>

That's it! Feel free to play around in your dashboard and explore the different kinds of insights you can create in PostHog.

## Further reading

- [How to set up feature flags in Python and Flask](/tutorials/python-feature-flags)
- [How to set up A/B tests in Python and Flask](/tutorials/python-ab-testing)
- [What to do after installing PostHog](/tutorials/next-steps-after-installing)
