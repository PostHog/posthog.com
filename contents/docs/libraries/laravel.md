---
title: Laravel
icon: ../../images/docs/integrate/frameworks/laravel.svg
---

PostHog makes it easy to get data about traffic and usage of your Laravel app. Integrating PostHog enables analytics, custom events capture, feature flags, and more.

This guide walks you through integrating PostHog into your Laravel app using the [PHP SDK](/docs/libraries/php).

## Installation

First, ensure [Composer](https://getcomposer.org/) is installed. Then run `composer require posthog/posthog-php` to install PostHog’s PHP SDK.

Next, initialize PostHog in the `boot` method of `app/Providers/AppServiceProvider.php`:

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

You can find your project API key and instance address in [your project settings](https://us.posthog.com/project/settings). 

## Usage

To access your PostHog client anywhere in your app, import `use PostHog\PostHog;` and call `PostHog::method_name`. For example, below is how to capture an event in a simple route:

```php file=routes/web.php
<?php

use Illuminate\Support\Facades\Route;
use PostHog\PostHog;

Route::get('/', function () {
    PostHog::capture([
        'distinctId' => 'distinct_id_of_your_user',
        'event' => 'route_called'
    ]);

    return view('welcome');
});
```

## Next steps

For any technical questions for how to integrate specific PostHog features into Laravel (such as analytics, feature flags, A/B testing, etc.), have a look at our [PHP SDK docs](/docs/libraries/php).

Alternatively, the following tutorials can help you get started:

- [How to set up analytics in Laravel](/tutorials/laravel-analytics)
- [How to set up feature flags in Laravel](/tutorials/laravel-feature-flags)
- [How to set up A/B tests in Laravel](/tutorials/laravel-ab-tests)

