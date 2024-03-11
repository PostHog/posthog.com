---
title: How to set up analytics in PHP
date: 2024-02-21T00:00:00.000Z
author:
  - lior-neu-ner
tags:
  - product analytics
---

import { ProductScreenshot } from 'components/ProductScreenshot'
export const EventsInPostHogLight = "https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/tutorials/php-analytics/events-light.png"
export const EventsInPostHogDark = "https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/tutorials/php-analytics/events-dark.png"
export const InsightLight = "https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/tutorials/php-analytics/insight-light.png"
export const InsightDark = "https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/tutorials/php-analytics/insight-dark.png"

[Product analytics](/product-analytics) enable you to gather and analyze data about how users interact with your PHP app. To show you how to set up analytics, in this tutorial we create a basic PHP app, add PostHog, and use it to [capture events](/docs/product-analytics/capture-events) and [create insights](/docs/product-analytics/insights).

## 1. Create a basic PHP app

We start by creating a simple PHP app that has two pages:

1. A `login` page where a user can enter their name, email, and company name in form.
2. A `dashboard` page that has some text and a button.

First, ensure [PHP](https://www.php.net/manual/en/install.php) is installed. Then, create a new folder for your project called `php-analytics`. In this folder, create two files `index.php` and `dashboard.php`:

```bash
mkdir php-analytics
cd ./php-analytics
touch index.php
touch dashboard.php
```

Next, add the following code to `index.php` to set up a basic `login` page:

```php file=index.php
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
    <form action="auth.php" method="POST">
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

Then, set up the dashboard page:

```php file=dashboard.php
<?php
session_start();
?>

<!DOCTYPE html>
<html>
<head>
    <title>Dashboard</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
</head>
<body>
    <h1>Welcome, <?php echo htmlspecialchars($_SESSION['name']); ?> from <?php echo htmlspecialchars($_SESSION['company_name']); ?>!</h1>

    <form id="dashboardForm" action="api/dashboard.php" method="POST">
        <input type="hidden" name="email" value="<?php echo htmlspecialchars($_SESSION['email']); ?>">
        <input type="hidden" name="name" value="<?php echo htmlspecialchars($_SESSION['name']); ?>">
        <input type="hidden" name="company_name" value="<?php echo htmlspecialchars($_SESSION['company_name']); ?>">
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

Then, create a new file `auth.php` to save the session details from the `login` page:

```bash
touch auth.php
```

```php file=auth.php
<?php
session_start();

$_SESSION['email'] = $_POST['email'] ?? '';
$_SESSION['name'] = $_POST['name'] ?? '';
$_SESSION['company_name'] = $_POST['company_name'] ?? '';

header('Location: dashboard.php');
exit;
```

Lastly, we create an endpoint `/api/dashboard.php` which is called when the button on the `dashboard` page is clicked. This endpoint does nothing for now:

```bash
mkdir api
cd ./api
touch dashboard.php
```

```php file=dashboard.php
<?php
// This is a placeholder file for the API endpoint.
// Later we will add logic here for when the button is clicked.

```

Run `php -S localhost:8000` and navigate to `http://localhost:8000` to see our app in action. Enter anything in the `login` page to save some session details.

![Basic PHP app](https://res.cloudinary.com/dmukukwp6/video/upload/v1710055416/posthog.com/contents/images/tutorials/php-analytics/basic-php-app.mp4)

## 2. Add PostHog to your app

With our app set up, it’s time to install and set up PostHog. If you don't have a PostHog instance, you can [sign up for free](https://us.posthog.com/signup).

To start, make sure [Composer](https://getcomposer.org/) is installed. Then run `composer require posthog/posthog-php` to install [PostHog’s PHP SDK](/docs/libraries/php).

Then, we initialize PostHog in `api/dashboard.php`. This is where we will add our event capture code in the next step of this tutorial.

```php file=api/dashboard.php
<?php
require_once __DIR__ . '/../vendor/autoload.php';
use PostHog\PostHog;

PostHog::init(
  '<ph_project_api_key>',
  ['host' => '<ph_instance_address>']
);
```

You can find your project API key and instance address in [your project settings](https://us.posthog.com/project/settings).

With this set up, we're ready to capture events.

## 3. Implement the event capture code

To show how to capture events with PostHog, we capture an event when the button on the `dashboard` page is clicked. To do this, we call [`PostHog::capture()`](/docs/libraries/php#capturing-events):

```php file=api/dashboard.php
require_once __DIR__ . '/../vendor/autoload.php';
use PostHog\PostHog;

PostHog::init(
  '<ph_project_api_key>',
  ['host' => '<ph_instance_address>']
);

session_start();
PostHog::capture([
  'distinctId' => $_SESSION['email'],
  'event' => 'home_api_called'
]);
```

With this set up, refresh your app and click the button on the `dashboard` page a few times. You should now see the captured event in your [PostHog activity tab](https://us.posthog.com/events).

<ProductScreenshot
  imageLight={EventsInPostHogLight} 
  imageDark={EventsInPostHogDark} 
  alt="Feature flag created in PostHog" 
  classes="rounded"
/>

> 💡 **PostHog tip: Setting the correct `distinctId`** 
> 
> When calling `PostHog::capture`, you need to provide a `distinctID` argument. This is a unique identifier for your user and enables you to correctly attribute events to them. 
>
> For logged-in users, you typically use their email or database ID. For logged-out or anonymous users, you should use a unique identifier, either generated by you or the PostHog [JavaScript web library](/docs/libraries/js) (which can then be accessed in the cookies. See an example of accessing the PostHog cookie in our [Nuxt tutorial](/tutorials/nuxtjs-ab-tests#server-side-rendering)).

### Setting event properties

When capturing events, you can optionally include additional information by setting the `properties` argument. This is helpful for breaking down or filtering events when creating [insights](/docs/product-analytics/insights).

To show an example, we add the user's name as an event property:

```php file=api/dashboard.php
PostHog::capture([
  'distinctId' => $_SESSION['email'],
  'event' => 'home_api_called',
  'properties' => [
    'user_name' => $_SESSION['name'],
  ]
]);
```

### Capturing group events

[Groups](/docs/product-analytics/group-analytics) are a powerful feature in PostHog that aggregate events based on entities, such as organizations or companies. This is especially helpful for B2B SaaS apps, where often you want to view insights such as `number of active companies` or `company churn rate`.

To enable group analytics, you'll need to [upgrade](https://us.posthog.com/organization/billing) your PostHog account to include them. This requires entering your credit card, but don't worry, we have a [generous free tier](/pricing) of 1 million events per month – so you won't be charged anything yet.

To create groups in PostHog, simply include them in your code when capturing events by setting the `$groups` argument:

```php file=api/dashboard.php
PostHog::capture([
  'distinctId' => $_SESSION['email'],
  'event' => 'home_api_called',
  'properties' => [
    'user_name' => $_SESSION['name'],
  ],
  '$groups' => [
    'company' => $_SESSION['company_name'],
  ]
]);
```

In the above example, we create a group type `company`, and then we set the value as the unique identifier for that specific company. This enables us to breakdown insights by company (we show you how to do this in the next section).

## 4. Create an insight in PostHog

Restart your app and capture events using different inputs in the `login` page. This will capture events for different users and companies and enable us to show the power of PostHog insights.

Next, go to the [product analytics](https://us.posthog.com/insights) tab in PostHog and click the **+ New insight** button. PostHog supports many different types of insights, such as [trends](/docs/user-guides/trends), [funnels](/docs/user-guides/funnels), [paths](/docs/user-guides/paths) and more.

In this tutorial, we create a simple trend insight:

1. Select the **Trends** tab.
2. Under the **Series** header select the `home_api_called` event. 
3. Click on the **Total count** dropdown to change how events are aggregated. You can choose options such as `Count per user`, `Unique users`, `Unique company(s)`, and more. You can also add filters or breakdown based on properties. 

For example, in the image below we set our insight to show number of unique users that captured the `home_api_called` event where the `user_name` property is equal to `Max`:

<ProductScreenshot
  imageLight={InsightLight} 
  imageDark={InsightDark} 
  alt="Insight created in PostHog" 
  classes="rounded"
/>

That's it! Feel free to play around in your dashboard and explore the different kinds of insights you can create in PostHog.

## Further reading

- [How to set up A/B tests in PHP](/tutorials/php-ab-tests)
- [How to set up feature flags in PHP](/tutorials/php-feature-flags)
- [What to do after installing PostHog](/tutorials/next-steps-after-installing)
