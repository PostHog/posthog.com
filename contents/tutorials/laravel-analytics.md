---
title: How to set up analytics in Laravel
date: 2024-02-19
author: ["lior-neu-ner"]
tags: ['product analytics']
---

import { ProductScreenshot } from 'components/ProductScreenshot'
import EventsInPostHogLight from '../images/tutorials/laravel-analytics/events-light.png'
import EventsInPostHogDark from '../images/tutorials/laravel-analytics/events-dark.png'
import InsightLight from '../images/tutorials/laravel-analytics/insight-light.png'
import InsightDark from '../images/tutorials/laravel-analytics/insight-dark.png'

[Product analytics](/product-analytics) enable you to gather and analyze data about how users interact with your Laravel app. To show you how to set up analytics, in this tutorial we create a basic Laravel app, add PostHog, and use it to [capture events](/docs/product-analytics/capture-events) and [create insights](/docs/product-analytics/insights).

## 1. Create a basic Laravel app

We start by creating a simple Laravel app that has two pages:

1. A `login` page where a user can enter their name, email, and company name in form.
2. A `home` page that has some text and a button.

First ensure [PHP](https://www.php.net/manual/en/install.php) and [Composer](https://getcomposer.org/) are installed. Then, create a new Laravel project called `laravel-analytics`:

```bash
composer create-project laravel/laravel laravel-analytics
cd laravel-analytics
```

Next, replace the code in `routes/web.php` to define our app routes:

```php file=routes/web.php
<?php

use Illuminate\Support\Facades\Route;

Route::get('/log-in', function () {
    return view('login');
});

Route::post('/log-in', 'App\Http\Controllers\AuthController@login');

Route::get('/home', function () {
    return view('home');
});
```

Then, create two new views `login.blade.php` and `home.blade.php` in the `resources/views` directory:

```php file=resources/views/login.blade.php
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
    <form action="/log-in" method="POST">
        @csrf
        <label for="name">Name:</label>
        <input type="text" name="name" required>

        <label for="email">Email:</label>
        <input type="email" name="email" required>

        <label for="name">Company Name:</label>
        <input type="text" name="company_name" required>

        <button type="submit">Log in</button>
    </form>
</body>
</html>
```

```php file=resources/views/home.blade.php
<!DOCTYPE html>
<html>
<head>
    <title>Home</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
</head>
<body>
    <h1>Welcome, {{ session('name') }} from {{ session('company_name') }}!</h1>

    <form id="homeForm">
        @csrf
        <input type="hidden" name="email" value="{{ session('email') }}">
        <input type="hidden" name="name" value="{{ session('name') }}">
        <input type="hidden" name="company_name" value="{{ session('company_name') }}">
        <button type="submit">Click Me</button>
    </form>

    <script>
    $(document).ready(function() {
        $('#homeForm').on('submit', function(e) {
            e.preventDefault();
            $.ajax({
                url: '/api/home',
                type: 'POST',
                data: $(this).serialize(),
            });
        });
    });
    </script>
</body>
</html>
```

Set up a controller for our `login` page. This controller saves the user inputs to our `Session`:

```bash
php artisan make:controller AuthController
```

```php file=app/Http/Controllers/AuthController.php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        Session::put('email', $request->email);
        Session::put('name', $request->name);
        Session::put('company_name', $request->company_name);

        return redirect('/home');
    }
}
```

Lastly, we set up an API route in `routes/api.php` for when the button on the `home` page is clicked:

```php file=routes/api.php
<?php

use Illuminate\Http\Request;

Route::post('/home', function (Request $request) {
    return response();
});
```

Run `php artisan serve` and navigate to `http://127.0.0.1:8000/log-in` to see our app in action. Enter anything in the `log-in` page to save some session details.

![Basic Laravel app](../images/tutorials/laravel-analytics/basic-laravel-app.mp4)

## 2. Add PostHog to your app

With our app set up, it’s time to install and set up PostHog. If you don't have a PostHog instance, you can [sign up for free](https://us.posthog.com/signup).

To start, run `composer require posthog/posthog-php` to install [PostHog’s PHP SDK](/docs/libraries/php).

Next, we initialize PostHog in the `boot` method of `app/Providers/AppServiceProvider.php`. Replace the existing code in that file with the following:

```php file=app/Providers/AppServiceProvider.php
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use PostHog\PostHog;

class AppServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        PostHog::init(
            '<ph_project_api_key>',
            [
                'host' => '<ph_instance_address>'
            ]
        );
    }
}
```

With this set up, we're ready to capture events.

## 3. Implement the event capture code

To show how to capture events with PostHog, we capture an event when the button on the home page is clicked. To do this, we call [`PostHog::capture()`](/docs/libraries/php#capturing-events):

```php file=routes/api.php
<?php

use Illuminate\Http\Request;
use PostHog\PostHog;

Route::post('/home', function (Request $request) {

    PostHog::capture([
        'distinctId' => $request->email,
        'event' => 'home_api_called'
    ]);

    return response();
});
```

With this set up, refresh your browser and click the button on the home page a few times. You should now see the captured event in your [PostHog activity tab](https://us.posthog.com/events).

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
> For logged-in users, you typically use their email or database ID. For logged-out or anonymous users, you should use a unique identifier, either generated by you or the PostHog [JavaScript web library](/docs/libraries/js) (which can then be accessed in the cookies).

### Setting event properties

When capturing events, you can optionally include additional information by setting the `properties` argument. This is helpful for breaking down or filtering events when creating [insights](/docs/product-analytics/insights).

To show an example, we add the user's name as an event property:

```php file=routes/api.php
<?php

use Illuminate\Http\Request;
use PostHog\PostHog;

Route::post('/home', function (Request $request) {

    PostHog::capture([
        'distinctId' => $request->email,
        'event' => 'home_api_called'
        'properties' => [
            'user_name' => $request->name,
        ]
    ]);

    return response();
});
```

### Capturing group events

[Groups](/docs/product-analytics/group-analytics) are a powerful feature in PostHog that aggregate events based on entities, such as organizations or companies. They enable you to analyze insights at a entity-level, as opposed to a user-level. This is especially helpful for B2B SaaS apps, where often you want to view insights such as `number of active companies` or `company churn rate`.

To enable group analytics, you'll need to [upgrade](https://us.posthog.com/organization/billing) your PostHog account to include them. This requires entering your credit card, but don't worry, we have a [generous free tier](/pricing) of 1 million events per month – so you won't be charged anything yet.

To create groups in PostHog, simply include them in your code when capturing events by setting the `$groups` argument:

```php file=routes/api.php
<?php

use Illuminate\Http\Request;
use PostHog\PostHog;

Route::post('/home', function (Request $request) {

    PostHog::capture([
        'distinctId' => $request->email,
        'event' => 'home_api_called'
        'properties' => [
            'user_name' => $request->name,
        ],
       '$groups' => [
            'company' => $request->company_name,
        ]
    ]);

    return response();
});
```

In the above example, we create a group type `company`. Then we set the value as the unique identifier for that specific company. This enables us to breakdown insights by company (in the next section we show you how to do this).

## 4. Create an insight in PostHog

Restart your app and capture events using different inputs in the `login` page. This will capture events for different users and companies and enable us to show the power of PostHog insights.

Next, go to the [Product analytics](https://us.posthog.com/insights) tab in PostHog and click the **+ New insight** button. PostHog supports many different types of insights, such as [trends](/docs/user-guides/trends), [funnels](/docs/user-guides/funnels), [paths](/docs/user-guides/paths) and more.

In this tutorial, we create a simple trend insight:

1. Select the **Trends** tab.
2. Under the **Series** header select the `home_api_called` event. 
3. You can then click on the **Total count** dropdown to change how events are aggregated. You can choose options such as `Count per user`, `Unique users`, `Unique company(s)`, and more. You can also add filters or breakdown based on properties. 

For example, in the image below we set our insight to show number of unique users that captured the `home_api_called` event where the `user_name` property is equal to `Max`:

<ProductScreenshot
  imageLight={EventsInPostHogLight} 
  imageDark={EventsInPostHogDark} 
  alt="Feature flag created in PostHog" 
  classes="rounded"
/>

That's it! Feel free to play around in your dashboard and explore the different kinds of insights you can create in PostHog.

## Further reading

- [How to set up A/B tests in Laravel](/tutorials/laravel-ab-tests)
- [How to set up feature flags in Laravel](/tutorials/laravel-feature-flags)
- [What to do after installing PostHog](/tutorials/next-steps-after-installing)
