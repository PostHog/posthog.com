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

### Laravel Pennant

The SDK includes an optional read-only Pennant store. Install Pennant and select the PostHog store:

```bash
composer require laravel/pennant:^1.26
```

```bash file=.env
PENNANT_STORE=posthog
```

Package discovery registers the `posthog` store unless your application already configured one. You don't need a Pennant migration or a database-backed flag store.

Use your PostHog flag keys to read boolean flags and multivariate flags:

```php
use Laravel\Pennant\Feature;

$isEnabled = Feature::for("account-123")->active("new-checkout");
$variant = Feature::for("account-123")->value("checkout-layout");
```

String and integer scopes supply a distinct ID. Authenticated-user and model scopes use their auth identifier or model key without a class-name prefix. The SDK doesn't serialize the model or send its properties. Pennant uses the authenticated user as its default scope. If that scope is `null`, the store uses the current analytics context. For custom scope types, implement Pennant's scope-identifier contract to return a string or integer.

Values retain their boolean or variant-string type. Unknown or unresolved flags return `false`. Reads use the SDK's normal exposure events, and repeated cached reads don't generate duplicate exposures.

Define and manage flags in PostHog, not in local PHP feature classes. Pennant write operations such as `define`, `activate`, `deactivate`, `delete`, and `purge` throw `LogicException`. `Feature::defined()` returns an empty array because this store has no local definitions. Use `Feature::for($scope)->all()` or `Feature::for($scope)->loadAll()` to discover PostHog flags for a scope. Discovery doesn't record exposures, but reading flag values does.

Pennant keeps its own feature/scope cache in addition to the SDK's evaluation snapshots. The integration clears PostHog stores at HTTP, queue, and command boundaries, including failed jobs. Pennant's Octane lifecycle integration also remains active. If targeting properties or groups change for the same scope within one request, call `Feature::flushCache()` before the next Pennant read.

Use `PostHog::evaluateFlags()` directly when you need payloads, person or group properties, local-only evaluation, selected flag keys, or unresolved reasons. It keys snapshots by all evaluation inputs, not only the Pennant scope.

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

In `config/posthog-autocapture.php`, enable only the collectors you need. This example enables request, authentication, model, domain-event, and job collection. Model attributes and domain-event properties require explicit configuration:

```php file=config/posthog-autocapture.php
return [
    "requests" => [
        "enabled" => true,
        "exclude" => [
            "up", "health", "health/*", "build/*", "assets/*", "vendor/*",
            "favicon.ico", "robots.txt", "*.css", "*.js", "*.map", "*.png",
            "*.jpg", "*.svg", "*.ico", "*.woff*",
        ],
        "sample_rate" => 1.0,
    ],
    "pageviews" => ["enabled" => false],
    "auth" => ["enabled" => true, "events" => ["registered", "login", "logout"]],
    "models" => [
        "enabled" => true,
        "allow" => [App\Models\Order::class => ["state"]],
    ],
    "domain_events" => [
        App\Events\OrderCompleted::class => [
            "event" => "order_completed",
            "properties" => ["amount" => "amount", "currency" => "details.currency"],
        ],
    ],
    "jobs" => ["enabled" => true, "exclude" => [App\Jobs\InternalMaintenance::class]],
    "commands" => ["enabled" => false, "exclude" => ["posthog:*"]],
    "scheduler" => ["enabled" => false, "exclude" => []],
    "blade" => ["enabled" => false],
];
```

These are example settings, not the defaults. Every `enabled` setting defaults to `false`, and `models.allow` and `domain_events` default to empty arrays. Register only the main PostHog service provider; it discovers the collectors automatically.

You can also configure collectors under `autocapture` in `config/posthog.php`. Settings there override the separate collector file per top-level section. Include the complete section when you override it. Use class names rather than closures so Laravel can cache the configuration.

#### Collected events

Collectors add the following properties, plus SDK metadata, identity, session correlation, and groups. They don't copy arbitrary context properties. `duration_ms` is a nonnegative float, not a trace or span.

- `laravel_request` - `route` (string), `method` (string), `status_code` (integer), and `duration_ms`

- `$pageview` - Request properties plus `$current_url` (string) and `$pathname` (string)

- `laravel_auth_registered` - No collector-specific properties

- `laravel_auth_login` and `laravel_auth_logout` - `guard` (string), when supplied

- `laravel_auth_failed` - `guard` (string), when supplied, but no credentials or attempted user ID

- `laravel_auth_lockout` - No collector-specific properties or attempted user ID

- `laravel_model_created`, `laravel_model_updated`, and `laravel_model_deleted` - `model` (exact class name) and `attributes` (only allowlisted JSON-safe values)

- Your configured domain event name - Only explicitly mapped property names and JSON-safe values

- `laravel_job` - `name` (queued job class), `outcome` (`success` or `failed`), `attempts` (integer), and `duration_ms`

- `laravel_command` - `name` (first command token), `outcome` (`success` or `failed`), `exit_code` (integer), and `duration_ms`

- `laravel_scheduled_task` - `name` (task PHP class), `outcome` (`success`, `failed`, or `background_started`), `exit_code` (integer or `null`), and `duration_ms`

Collectors don't read request bodies, query values, cookies, credentials, email, IP addresses, job arguments, or full model/event payloads. Authentication uses `getAuthIdentifier()`, so configure an opaque identifier if your application uses email as its auth identifier. Allowlisted attributes and mapped properties can contain sensitive data. Select only fields you intend to send and use `sdk.before_send` for additional redaction.

Collectors use the existing analytics identity when available. Without one, each event gets a fresh random UUID and defaults to `$process_person_profile=false`, as with manual captures. Failed login and lockout events never use the attempted user identifier. Collector failures don't change application responses or replace original errors. Set `sdk.debug` to `true` to log collector failures through Laravel's logger; diagnostics contain the collector site and exception class, not event data or exception messages.

#### Requests and server pageviews

Keep or extend the default health-check and static-asset exclusions. Exclusion patterns use Laravel's case-sensitive `Str::is` wildcard matching. Requests match against both the route template and concrete path for filtering, but collectors don't send the concrete path. Unmatched routes aren't captured.

`requests.sample_rate` accepts values from zero to one. One captures every eligible request, and zero drops both request summaries and server pageviews. The SDK makes one sampling decision per request for both event types. Request summaries include all methods and status codes for eligible matched routes. Streaming duration measures response creation, not body delivery.

Server HTML `$pageview` events are a separate opt-in through `pageviews.enabled`, independent of request summaries. They require a matched route, a GET request, an HTML response, and a 2xx status. `route` and `$pathname` contain a normalized route template such as `/orders/{order}`, never `/orders/123`.

`$current_url` combines the HTTP or HTTPS origin from `app.url` with the route template. The SDK removes credentials, paths, and queries from the configured origin. It doesn't trust the request's Host header. Invalid configured origins suppress pageviews.

Don't enable server pageviews for pageviews already captured by your browser SDK: there is no automatic deduplication. Server pageviews don't track client-side navigation, browser lifecycle, or actual browser rendering.

#### Authentication, models, and domain events

Authentication collection defaults to `registered`, `login`, and `logout` when enabled. Add `failed` or `lockout` to `auth.events` explicitly to collect those outcomes.

Model collection requires an exact Eloquent class in `models.allow`. Only selected attributes are read, using their normal casts and accessors. JSON-safe scalar, `null`, and array values are accepted; objects, resources, and invalid JSON values are omitted. An empty attribute list captures class metadata only, without an implicit primary key, relations, or a full `toArray()` result. Don't allowlist sensitive accessors or JSON columns.

The SDK snapshots selected model values and analytics context when a model changes, then emits the event after that connection's outer transaction commits. Rollback discards the pending events, including changes inside rolled-back savepoints. Outside a transaction, collection is immediate. In tests using `DatabaseTransactions` or `RefreshDatabase`, Laravel's test-wrapper transaction doesn't delay capture, but application-owned nested transactions still defer capture until commit.

Pending model events across all connections share a limit of 1,000 events and 1 MiB of JSON-encoded event names, properties, and correlation context. The SDK drops the newest event if either limit would be exceeded. This isn't a durable outbox: process crashes and transport failures can lose events. Each model lifecycle event generates a separate event. Bulk query-builder updates and deletes don't produce model events. Soft deletes produce a deleted event, but restores aren't collected.

Domain mappings match exact event classes and public property or array-key paths, such as `details.currency` above. They don't call getters, serialize models, match inherited event classes, or support wildcard subscriptions. Missing paths and non-JSON-safe values are omitted. Domain collection is immediate, even inside a transaction. Use Laravel's after-commit event dispatch when the event must reflect committed state. Rebuild cached configuration and restart long-running workers after changing mappings.

#### Jobs, commands, and scheduled tasks

Jobs emit one event per started attempt; a retry produces another event. Commands exclude arguments and options. Scheduler names use the task's PHP class, not descriptions or command lines. A background task emits `background_started` when launched, not when it completes. Skipped tasks and hard-killed jobs or commands without a terminal framework event aren't captured.

Different collectors intentionally produce events for different lifecycle boundaries. A request that logs in a user and saves a model can produce request, authentication, and model events. The SDK doesn't deduplicate these against your manual instrumentation.

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

The previous context and flag snapshots are restored even if the callback throws. The facade also exposes `withContext()`, `enterContext()`, and `getContext()` to bridge Laravel context and the underlying PHP client. These APIs accept `distinct_id` and `session_id` aliases; canonical `distinctId` and `sessionId` keys win if both forms are supplied. `["fresh" => true]` excludes ambient identity, request metadata, groups, and resolvers. Close an entered scope in `finally`.

#### Lifecycle boundaries

HTTP context remains active through kernel termination, including `dispatchAfterResponse()` jobs and application termination callbacks. The kernel's completion hook flushes events and clears context afterward. Custom HTTP kernels without Laravel's lifecycle callback API fall back to middleware cleanup and can't provide after-response correlation.

Queue jobs start with fresh context. Propagated `_posthog` payload metadata contains bounded identity, session, and scalar group context, never authorization evidence. Jobs can override that context explicitly. Nested synchronous jobs and kernel-level `Artisan::call()` executions restore the caller's context and flag snapshots when they finish or fail.

The root console command stays active through kernel termination. Nested kernel-level calls defer flushing to the outer command or HTTP termination. A standalone `Artisan::call()` flushes on exit. Octane request, task, and tick boundaries flush and clear context automatically for sequential sandbox lifecycles.

Automatic flush failures don't replace an HTTP response or worker failure. Explicit `PostHog::flush()` and `PostHog::shutdown()` return SDK results, but a successful flush isn't a delivery receipt.

#### Direct child commands

Direct `$this->call()`, `$this->callSilent()`, and `$this->callSilently()` calls bypass console kernel boundaries. To isolate a child's analytics context, add `IsolatesCommandContext` to the calling command or your application's base command:

```php
namespace App\Console;

use Illuminate\Console\Command as BaseCommand;
use PostHog\Laravel\Concerns\IsolatesCommandContext;

abstract class Command extends BaseCommand
{
    use IsolatesCommandContext;
}
```

Have your application commands extend this base class, or add the trait directly to each calling command. The three call helpers restore the caller's context and flag snapshots after the child returns or throws, including closure children. Arguments, output, exit codes, and exceptions pass through unchanged. The trait also clears Pennant's PostHog cache on entry and after restoring the caller.

This doesn't intercept every command call. Callers without the trait, including commands registered with `Artisan::command()`, need kernel-level `Artisan::call()` or an explicit scope such as `PostHog::withContext([], fn () => $this->call("import"))` when a child can change analytics context. Explicit context scopes don't clear Pennant's own cache. Custom call implementations that bypass Laravel's inherited `runCommand()` also need explicit scoping.

SDK services are created lazily per Laravel scope. Don't retain them in application singletons or prewarm them in Octane. Ordinary HTTP, queue workers, console commands, and sequential Octane sandbox lifecycles are supported. Overlapping Swoole coroutines sharing one Laravel container aren't supported.

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
