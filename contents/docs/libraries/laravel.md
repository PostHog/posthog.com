---
title: Laravel
platformLogo: laravel
---

You can integrate PostHog with Laravel using the [experimental Laravel SDK](#laravel-sdk-experimental) or the [PHP SDK with manual instrumentation](#manual-setup-with-the-php-sdk). Both approaches are supported. The Laravel SDK builds on the PHP SDK and adds automatic request context, exception reporting, and worker lifecycle management.

import AgentIntegrationSection from "../components/AgentIntegrationSection.mdx"

## Laravel SDK (experimental)

> **Experimental:** The Laravel SDK is under active development, and its API may change. If you prefer to instrument your application yourself, the [manual PHP SDK setup](#manual-setup-with-the-php-sdk) remains supported.

The [PostHog Laravel SDK](https://github.com/PostHog/posthog-laravel) supports Laravel 12 and 13. It requires PHP 8.2 or later (PHP 8.3 or later for Laravel 13).

### Installation

Install [`posthog/posthog-laravel`](https://packagist.org/packages/posthog/posthog-laravel) and publish its configuration:

```bash
composer require posthog/posthog-laravel
php artisan posthog:install
```

Add your project token and ingestion host to your server's `.env`:

```bash file=.env
POSTHOG_API_KEY=<ph_project_token>
POSTHOG_HOST=<ph_client_api_host>
```

Laravel's package discovery registers the service provider and facade automatically. If discovery is disabled, register `PostHog\Laravel\PostHogServiceProvider` manually. No PHP SDK initialization or custom middleware is needed.

Configure the SDK in `config/posthog.php`. It's enabled by default; set `POSTHOG_ENABLED=false` to disable it.

For browser events and session replay, install the [JavaScript SDK](/docs/libraries/js) separately.

### Capturing events and identifying users

Use the Laravel facade, not the PHP SDK's `PostHog\PostHog` class:

```php
use PostHog\Laravel\Facades\PostHog;

PostHog::capture("checkout_completed", ["items" => 2]);
PostHog::capture("import_completed", ["rows" => 42], "account-123");
PostHog::identify([
    "distinctId" => "account-123",
    "properties" => ["plan" => "paid"],
]);
```

The SDK uses the authenticated user's ID automatically, or you can pass a distinct ID explicitly as shown above. Without an identity, each event gets a new random ID without a person profile; these IDs don't identify returning visitors.

To link browser sessions to backend events, configure the JavaScript SDK's [tracing headers](/docs/libraries/js/config#tracing-headers). These headers are untrusted analytics input, not authentication. Pass an authenticated identity explicitly for security-sensitive events or flag decisions.

The SDK doesn't collect request bodies, query strings, email, or IP addresses by default. Check your own event properties and exception messages for sensitive data.

### Feature flags

Evaluate flags using the current request identity, or pass a distinct ID explicitly:

```php
use PostHog\Laravel\Facades\PostHog;

$flags = PostHog::evaluateFlags(distinctId: "account-123");
$isEnabled = $flags->isEnabled("new-checkout");
$variant = $flags->getFlag("checkout-layout");
$payload = $flags->getFlagPayload("checkout-layout");
```

You can omit `distinctId` to use the current request identity. Without an identity, flag evaluation returns an empty result.

For [local evaluation](/docs/feature-flags/local-evaluation), set `POSTHOG_SECRET_KEY` to your feature flags secure API key. Keep it on the server. In production, enable `flag_cache.enabled` and select a shared Laravel cache store with `flag_cache.store` in `config/posthog.php`.

### Laravel Pennant

The SDK includes an optional read-only Pennant store. Install Pennant and select the PostHog store:

```bash
composer require laravel/pennant:^1.26
```

```bash file=.env
PENNANT_STORE=posthog
```

Read flags using their PostHog keys:

```php
use Laravel\Pennant\Feature;

$isEnabled = Feature::for("account-123")->active("new-checkout");
$variant = Feature::for("account-123")->value("checkout-layout");
```

Pennant uses the authenticated user by default, or an explicit scope as shown above. The store is read-only: create and manage flags in PostHog, not through Pennant write operations. You don't need a Pennant migration.

### Capturing exceptions

The SDK automatically captures exceptions reported through Laravel's reportable exception path. It respects `dontReport` and callbacks that stop reporting. Set `capture_exceptions` to `false` in `config/posthog.php` to disable automatic reporting.

To capture a handled exception explicitly:

```php
use PostHog\Laravel\Facades\PostHog;

PostHog::captureException($exception, properties: ["component" => "import"]);
```

Don't add the manual PHP SDK report callback below when using the Laravel SDK, as this can report exceptions twice.

### Optional server event collectors

All automatic server event collectors are off by default. They capture Laravel lifecycle events, not browser clicks or `$autocapture` events.

Publish the collector configuration:

```bash
php artisan vendor:publish --tag=posthog-autocapture-config
```

Enable only the collectors you need in `config/posthog-autocapture.php`. For example, update the `auth` section to capture registrations, logins, and logouts:

```php file=config/posthog-autocapture.php
"auth" => [
    "enabled" => true,
    "events" => ["registered", "login", "logout"],
],
```

Set `requests.enabled` to `true` for `laravel_request` events with route, method, status code, and duration. Keep the generated health-check and static-asset exclusions. Other collectors cover model changes, mapped domain events, jobs, commands, and scheduled tasks. Model attributes and domain-event properties must be explicitly allowlisted.

Server `$pageview` events are a separate opt-in through `pageviews.enabled`. Leave them disabled if your browser SDK already captures pageviews to avoid duplicates.

#### Blade flag conditionals

Set `blade.enabled` to `true` in `config/posthog-autocapture.php` to enable the optional Blade conditional:

```blade
@posthogFeature("new-checkout")
    <x-checkout />
@else
    <x-classic-checkout />
@endposthogFeature
```

This uses `evaluateFlags()->isEnabled()` with the current analytics context. Repeated checks share the evaluation snapshot and exposure deduplication. Disabled or unavailable flags select the `@else` branch. This is a presentation helper, not authorization.

### Queue workers and Octane

The SDK automatically flushes events and clears context between requests, queue jobs, console commands, and sequential Octane lifecycles. Identity and session context propagate to jobs by default; set `queue_context` to `false` to disable this.

Don't store scoped PostHog services in application singletons. Overlapping Swoole coroutines sharing one Laravel container aren't supported.

### Testing and diagnostics

Use the fake to test instrumentation without sending events:

```php
use PostHog\Laravel\Facades\PostHog;

$fake = PostHog::fake();
PostHog::capture("checkout_completed", ["items" => 2], "account-123");
$fake->assertCaptured("checkout_completed");
$fake->assertCapturedCount(1);
```

Run `php artisan posthog:doctor` to validate local configuration without sending a diagnostic event. To send a test event explicitly, run `php artisan posthog:test --send`.

## Manual setup with the PHP SDK

Using the [PHP SDK](/docs/libraries/php) directly remains supported. Use this approach if you want to manage initialization, request context, exception reporting, and flushing yourself. The examples below use `PostHog\PostHog`, not the Laravel facade. Don't combine this setup with the Laravel SDK's automatic integration.

The wizard installs the PHP SDK, not the experimental Laravel SDK.

<AgentIntegrationSection framework="Laravel" />

### Initialize the PHP SDK

Install the PHP SDK as described in the [PHP installation guide](/docs/libraries/php#installation), then add your project token and host to `.env`:

```bash file=.env
POSTHOG_API_KEY=<ph_project_token>
POSTHOG_HOST=<ph_client_api_host>
```

Add PostHog to Laravel's services config:

```php file=config/services.php
'posthog' => [
    'api_key' => env('POSTHOG_API_KEY'),
    'host' => env('POSTHOG_HOST', 'https://us.i.posthog.com'),
],
```

Initialize PostHog in the `boot` method of `app/Providers/AppServiceProvider.php`:

```php file=app/Providers/AppServiceProvider.php
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use PostHog\PostHog;

class AppServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        if (! config('services.posthog.api_key')) {
            return;
        }

        PostHog::init(
            config('services.posthog.api_key'),
            [
                'host' => config('services.posthog.host'),
            ]
        );
    }
}
```

### Request context middleware

Client SDKs such as [PostHog JS](/docs/libraries/js) can send tracing headers to your Laravel backend. Configure [`tracing_headers`](/docs/libraries/js/config#tracing-headers) for your Laravel backend hostname so browser requests include the session and distinct ID headers.

The PHP SDK can read `X-PostHog-Distinct-Id` and `X-PostHog-Session-Id` headers and apply them to events captured during the request. Tracing headers are client-controlled analytics context, not authentication or authorization. For security-sensitive server-side events or decisions, pass an authenticated `distinctId` explicitly, such as `auth()->id()`. For the lower-level context APIs, see the [PHP request context docs](/docs/libraries/php#request-context).

Add middleware like this:

```php file=app/Http/Middleware/PostHogRequestContext.php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use PostHog\PostHog;
use Symfony\Component\HttpFoundation\Response;

final class PostHogRequestContext
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! config('services.posthog.api_key')) {
            return $next($request);
        }

        $context = PostHog::contextFromHeaders($request->headers->all());

        $context['properties'] = array_merge(
            $context['properties'] ?? [],
            array_filter([
                '$current_url' => $request->fullUrl(),
                '$request_method' => $request->method(),
                '$request_path' => $request->getPathInfo(),
                '$user_agent' => $request->userAgent(),
                '$ip' => $request->ip(),
            ], static fn ($value): bool => $value !== null && $value !== '')
        );

        return PostHog::withContext(
            $context,
            static fn (): Response => $next($request),
            ['fresh' => true]
        );
    }
}
```

Register this middleware using your Laravel version's normal middleware registration.

### Error tracking in Laravel

The PHP SDK supports [error tracking](/docs/libraries/php#error-tracking), but Laravel handles most request exceptions before they become uncaught PHP exceptions. Capture Laravel-reported exceptions explicitly.

In Laravel 11 and later, add a report callback in `bootstrap/app.php`:

```php file=bootstrap/app.php
use Illuminate\Foundation\Configuration\Exceptions;
use PostHog\PostHog;
use Throwable;

->withExceptions(function (Exceptions $exceptions): void {
    $exceptions->report(function (Throwable $e): void {
        if (! config('services.posthog.api_key')) {
            return;
        }

        PostHog::captureException(
            $e,
            auth()->id() !== null ? (string) auth()->id() : null,
            [
                '$current_url' => request()->fullUrl(),
                '$request_method' => request()->method(),
            ]
        );
    });
})
```

For older Laravel versions, call `PostHog::captureException()` from your exception handler's `report` method.

### Long-running processes

In normal PHP request lifecycles, queued events flush when the client is destroyed. In long-running Laravel processes such as queue workers, Horizon, or Octane, call `PostHog::flush()` after capturing important events or at the end of a job/request.

If you prefer immediate delivery in queue workers, configure the PHP SDK with `batch_size` set to `1` for those workers:

```php
PostHog::init(
    '<ph_project_token>',
    [
        'host' => config('services.posthog.host'),
        'batch_size' => 1,
    ]
);
```

## Next steps

See the [PHP SDK docs](/docs/libraries/php) for usage examples and the full API reference.
