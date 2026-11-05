---
title: Laravel
platformLogo: laravel
---

You can integrate PostHog with Laravel using the [experimental Laravel SDK](#laravel-sdk-experimental) or the [PHP SDK with manual instrumentation](#manual-setup-with-the-php-sdk). Both approaches are supported. The Laravel SDK builds on the PHP SDK and adds automatic request context, exception reporting, and worker lifecycle management.

import AgentIntegrationSection from "../components/AgentIntegrationSection.mdx"

<AgentIntegrationSection framework="Laravel" />

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
POSTHOG_ENABLED=true
```

Laravel's package discovery registers the service provider and facade automatically. If your application disables discovery, register `PostHog\Laravel\PostHogServiceProvider` manually. You don't need to initialize the PHP SDK or add the manual middleware below.

The published `config/posthog.php` controls the integration. Set `POSTHOG_ENABLED=false` to disable event capture and feature flag requests. A missing or blank project token also disables the SDK.

This package only instruments your server. For browser events and session replay, install the [JavaScript SDK](/docs/libraries/js) separately.

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

You can also inject `PostHog\Laravel\PostHog` to use the same API without a facade.

The SDK uses an explicit `distinctId` first, then a scoped context identity, then your custom identity resolver or the authenticated user's auth identifier. If none is available, it falls back to the `X-PostHog-Distinct-Id` tracing header. `X-PostHog-Session-Id` links events to a frontend session. Configure the JavaScript SDK's [`tracing_headers`](/docs/libraries/js/config#tracing-headers) for your backend hostname to send these headers.

Tracing headers are untrusted analytics input, not authentication or authorization. Pass an authenticated identity explicitly for security-sensitive events or flag decisions. Set `header_context` to `false` in `config/posthog.php` to ignore both headers.

Without an identity, each captured event gets a fresh random UUID and defaults to `$process_person_profile=false`. These IDs don't persist across events or identify returning anonymous visitors. Feature flag evaluation without an identity returns an empty result without making flag requests.

Captures include the request method and matched route template, not concrete route parameters. By default, the SDK doesn't collect raw URLs, query strings, request bodies, cookies, email, or IP addresses. Your own properties and exception messages can still contain sensitive information. Configure `sdk.before_send` in `config/posthog.php` to redact or drop events. Use a container class name rather than a closure so Laravel can cache the configuration.

### Feature flags

Evaluate flags using the current request identity, or pass a distinct ID explicitly:

```php
use PostHog\Laravel\Facades\PostHog;

$flags = PostHog::evaluateFlags(distinctId: "account-123");
$isEnabled = $flags->isEnabled("new-checkout");
$variant = $flags->getFlag("checkout-layout");
$payload = $flags->getFlagPayload("checkout-layout");
```

Identical evaluation inputs share a snapshot within the current context. Flag value reads send exposure events; payload reads don't.

For [local evaluation](/docs/feature-flags/local-evaluation), set `POSTHOG_SECRET_KEY` to your feature flags secure API key. Keep this key on the server. In production, enable `flag_cache.enabled` and choose a shared Laravel cache store with `flag_cache.store` in `config/posthog.php` to share definitions across requests and workers. Definitions load and refresh on demand, not on a background timer.

The SDK also includes an optional read-only [Laravel Pennant integration](https://github.com/PostHog/posthog-laravel/blob/main/PENNANT.md) for boolean and variant reads. Define and manage these flags in PostHog, not through Pennant write operations.

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

In `config/posthog-autocapture.php`, enable only the collectors you need. For example, change `requests.enabled` to `true` to capture `laravel_request` events with the matched route template, method, status code, and duration. Keep or extend the default health-check and static-asset exclusions.

Other collectors cover authentication outcomes, allowlisted Eloquent model changes after commit, explicitly mapped domain events, jobs, commands, and scheduled tasks. Model attributes and domain-event properties require explicit configuration. See the [collector guide](https://github.com/PostHog/posthog-laravel/blob/main/AUTOCAPTURE.md) for configuration, privacy details, and event schemas.

Server HTML `$pageview` events are a separate opt-in through `pageviews.enabled`. Don't enable them for pageviews already captured by your browser SDK: there is no automatic deduplication.

### Queue workers, Octane, and scoped context

The Laravel SDK flushes events and clears context at supported HTTP, queue, console, and sequential Octane lifecycle boundaries. Identity, session, and scalar group context propagate to jobs by default; arbitrary properties and request data don't. Set `queue_context` to `false` to disable propagation.

Use a scoped context to set an identity or properties for a block of work:

```php
use PostHog\Laravel\Context;
use PostHog\Laravel\Facades\PostHog;

app(Context::class)->with([
    "distinctId" => "account-123",
    "properties" => ["component" => "import"],
], function () {
    PostHog::capture("import_started");
});
```

The previous context is restored even if the callback throws. Don't retain scoped PostHog services in application singletons. Overlapping Swoole coroutines sharing one Laravel container aren't supported. See the [worker and console guide](https://github.com/PostHog/posthog-laravel#scoped-context-and-workers) for lifecycle details and opt-in isolation for direct child-command calls.

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
