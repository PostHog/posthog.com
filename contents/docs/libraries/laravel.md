---
title: Laravel
platformLogo: laravel
---

PostHog integrates with Laravel through the [PostHog PHP SDK](/docs/libraries/php). This page covers Laravel-specific setup. For SDK features such as event capture, identifying users, feature flags, group analytics, and configuration options, see the [PHP SDK docs](/docs/libraries/php).

## Installation

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

## Request context middleware

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

## Error tracking in Laravel

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

## Long-running processes

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
