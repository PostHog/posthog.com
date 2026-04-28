---
title: SDK guidelines
sidebar: Handbook
showTitle: true
---

These are living guidelines, and they're meant to help us make better tradeoffs, not to be a gatekeeper. If a guideline doesn't fit your SDK, don't treat it as a blocker. Talk about it, write down the decision, and move on with context for the next person.

The big idea: PostHog SDKs run inside customer applications. That means customers lend us trust every time they install one. Our job is to be useful, boring in production, and safe to run in places we don't control.

### Make the default experience excellent

Most users never read every option. They install the package, copy the quickstart, and hope it works.

Good defaults matter more than lots of configuration. Capture the right context by default, batch sensibly, retry carefully, and avoid making users learn PostHog internals before they see value. Configuration is still important, but it should feel like customization rather than a requirement to get a safe baseline.

In general, features should be enabled by default unless there's a good reason not to, such as privacy risk, compatibility risk, performance risk, or platform limitations. Users should be able to opt in and out of features, and ideally high-level feature controls should also exist in PostHog project settings through remote config. When the reason is privacy-sensitive data, see [Treat privacy as a product feature](#treat-privacy-as-a-product-feature).

### Don't break the host application

The SDK should never be the reason a customer's app crashes, slows down dramatically, fails to build, or starts behaving strangely.

Prefer graceful degradation over cleverness. If feature flag polling, replay capture, networking, storage, or background work fails, the app should keep running. In most cases, failing silently with useful debug logging is better than surprising the customer at runtime. The logger is our friend here: use it to explain what happened without making the host app pay for it.

If an SDK can't support a platform, framework version, or runtime, make that clear at install time or startup. Don't make customers discover it through confusing production errors.

### Keep dependencies boring

Every dependency adds size, security surface area, licensing questions, maintenance work, and compatibility risk. It can also introduce malware or compromised packages, naming clashes, dependency resolution surprises, runtime breakage from a transitive version change, and noticeably larger binaries or bundles. Use dependencies when they clearly improve the SDK, but be skeptical of adding them to the core path.

A good rule of thumb: basic event capture should work with as little extra machinery as the platform reasonably enables. Optional integrations can have optional dependencies, but the base SDK should stay lean.

That said, dependencies are sometimes the right choice. Some platforms don't provide safe basic primitives, such as an HTTP layer, storage, or concurrency tools. In those cases, use a boring, well-maintained dependency. If dependency risk is high but the code is small and stable, vendoring can also be a reasonable option. Document the tradeoff either way.

### Respect the platform

Each SDK should feel natural in its language and ecosystem. Follow platform naming conventions, package manager expectations, async patterns, error handling style, logging conventions, and test tooling.

Consistency across PostHog SDKs is useful, but not at the cost of making a Ruby SDK feel like JavaScript, or a Swift SDK feel like Python. Prefer a small shared vocabulary – `capture`, `identify`, `alias`, `flush`, `shutdown` – and let the platform shape the details.

At the same time, don't make SDKs different for the sake of it. Users move between SDKs, and LLMs often help port examples from one language to another. Keep names, concepts, method behavior, and configuration shapes as close as the platform reasonably enables.

### Be careful with resources

SDKs often run in hot paths, mobile apps, serverless functions, CLIs, browsers, background workers, and long-lived servers. Resource usage needs to be boring too.

Watch for memory growth, unbounded queues, aggressive timers, excessive network calls, large payloads, lock contention, startup cost, and battery usage. Add backpressure where possible. If the SDK holds data in memory, try to provide a clear maximum size for that data or queue, and make it configurable when customers may need to tune it.

If a customer reports one of these problems, consider adding a stress test or regression test with a safe threshold. The goal isn't to make performance tests flaky. It's to catch future PRs that clearly bring back the same class of problem.

### Keep identity and state boring

Identity is one of the easiest places to confuse customers and corrupt data. `distinct_id`, anonymous IDs, `identify`, `alias`, reset/logout, group state, feature flag state, and persisted properties should behave predictably and, where possible, consistently across SDKs.

Be explicit about whether an SDK is stateful or stateless. Browser and mobile SDKs usually own local state because they persist anonymous IDs, queued data, flags, and replay/session context. Many server-side SDKs should be more stateless by default because one process can handle many users, tenants, requests, or jobs at the same time.

Don't accidentally make a stateless SDK stateful by storing per-user data globally. If state is needed, make the boundary obvious: request-scoped client, explicit context object, local storage, cookie, in-memory queue, or whatever is idiomatic for the platform.

### Make SDKs thread-safe

Assume public SDK methods can be called from multiple threads, async tasks, workers, callbacks, request handlers, or lifecycle hooks. Queues, identity state, remote config, feature flag caches, loggers, and shutdown paths should be safe under concurrent access.

If a platform has a single-threaded runtime, still think about re-entrancy and async ordering. If something is not thread-safe, document it loudly and provide a safe path for normal usage.

### Treat privacy as a product feature

PostHog helps customers understand users, but our SDKs should not collect sensitive data casually.

Be explicit about anything that can include personal data, request/response bodies, headers, screen contents, console logs, or exception context. Prefer opt-in for high-risk data, make masking and redaction easy, and document what leaves the device or server.

### Think about security beyond privacy

Privacy is not the whole security story. SDKs should avoid exposing secrets, storing sensitive data unnecessarily, weakening TLS defaults, trusting unvalidated remote input, or making supply-chain risk worse.

Use platform-sandboxed storage where possible, such as app-scoped storage, Keychain/Keystore-style APIs for sensitive values, browser storage with the right assumptions, or restricted file permissions on servers. If data is only needed temporarily, prefer memory over durable storage.

Releases are part of the security model too. SDK publishing should be automated through CI and protected by an approval process, as described in the [SDK release process](/handbook/engineering/sdks/releases). Avoid local machine publishing for official releases when CI can do it, because CI gives us clearer provenance, fewer long-lived credentials, and a better audit trail.

### Design APIs for forward compatibility

SDK APIs live for a long time. Once a pattern is copied into thousands of apps, changing it gets expensive.

Keep the public API small, boring, and hard to misuse. Use options objects for things likely to grow. Avoid exposing internal concepts unless customers need them. Public APIs and configuration options should be unique: don't offer two or more ways to do the same thing unless there's a strong compatibility reason. Duplicate paths confuse humans, documentation, support, and LLMs. When you need a breaking change, respect the SDK's versioning scheme, make the migration obvious, document it clearly, and release it intentionally.

For larger migrations, write a migration doc and, where useful, an agent skill that can help apply the change across customer codebases. Try to batch breaking changes into a single major version instead of shipping a new breaking change every week.

### Deprecate before removing

Use semver, or the ecosystem's closest equivalent, for public API changes. Removing a public method, field, configuration option, package, or behavior should usually wait for the next major version.

Before removing something, deprecate it first. Keep the deprecated method or option working until the major release, route it to the new implementation where possible, and log a clear runtime warning when it is used. The warning should say what changed, what to use instead, and where to find the migration guide.

Deprecation warnings should be useful, not noisy. Avoid logging the same warning thousands of times in a hot path if you can log it once per process, session, or call site.

### Write less SDK code when the server can do it better

SDKs should collect useful context and send high-quality data. They should avoid owning complex business logic that can live safely on the server.

Server-side logic is easier to change, observe, roll back, and fix globally. SDK-side logic ships into customer apps and can take weeks, months, or years to update. Put logic in the SDK only when it needs local state, local performance, platform APIs, or offline behavior.

### Make debugging humane

When something goes wrong, customers and support engineers need a path to answers.

Provide debug logging that can be enabled without rebuilding the world. Include enough information to understand initialization, dropped events, retries, network failures, feature flag decisions, and queue state. Avoid logging secrets. Project tokens are public identifiers, but other credentials are not.

Remember that SDKs often run on customer devices or infrastructure where we don't have access to logs. When it helps support and debugging, include minimal, high-value SDK state in captured data, recordings, or diagnostics. Session Replay is a good example: a small amount of SDK health context can make production issues much easier to investigate. Keep this data minimal, documented, and privacy-aware.

### Test the boring paths and the weird paths

The happy path matters, but SDK bugs often hide in shutdown, retries, offline mode, old runtimes, ad blockers, proxies, clock skew, app backgrounding, forked processes, serverless cold starts, and partial initialization.

Prefer tests that match how customers use the SDK. Add small example apps where they help. For mobile and browser SDKs, remember that customers can't always roll out fixes quickly, so a little extra caution before release is worth it.

### Treat docs and examples as part of the SDK

An SDK without good docs is only half shipped. Keep the quickstart current, show idiomatic examples, and explain common production setup: flushing on shutdown, identifying users, using custom hosts, handling feature flags, and enabling debug logs.

Examples should be boring, copy-pasteable, and close to how customers write real production code in that ecosystem.

Public methods, configuration options, and types should have documentation comments in the platform's standard style, such as JSDoc, docstrings, KDoc, or Swift documentation comments. Write them for humans, but remember that LLMs and IDEs parse them too. A good comment explains what the method or option does, when to use it, defaults, side effects, and any privacy or performance caveats.

### Release like people depend on it

Because they do. Use semver or the ecosystem's closest equivalent, keep changelogs readable, call out breaking changes loudly, and follow the [SDK release process](/handbook/engineering/sdks/releases). Official releases should be automated through CI and sit behind an approval process to reduce supply-chain risk.

Release cadence is a balance. Giant releases are hard to review, hard to debug, and hard to roll back, but releasing every tiny change can also create noise and upgrade fatigue. Prefer coherent releases: small enough to understand, grouped enough to be useful, and clearly documented so customers know whether they should care.

The right cadence also depends on the platform and ecosystem. Web and server SDK users can often upgrade quickly through a package manager, but mobile, desktop, game engine, and enterprise customers may deal with app store review, slow adoption, long release trains, or internal approval processes. For those SDKs, batch changes more deliberately, keep compatibility longer, and avoid forcing upgrades unless the fix is important enough to justify the friction.

### Document decisions and sharp edges

If an SDK supports only certain platform versions, has unusual threading behavior, drops events under pressure, stores data locally, or handles privacy-sensitive data, write it down.

This isn't bureaucracy. It's how we avoid the next contributor rediscovering the same tradeoff six months later.
