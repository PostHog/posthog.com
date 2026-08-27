# Pricing component

`PostHogDesktopPricing` renders the current model and cloud compute rates on the PostHog Desktop pricing documentation page.

The component loads a same-origin API route. That route combines and caches the public model-pricing and sandbox-pricing responses from PostHog services.

When no compute rate card is published, the component shows model pricing without a cloud compute section.

If the route fails or returns no models, the component shows its dated pricing snapshot so the documentation remains useful. Update the snapshot when model or compute rates change.

The compute half of that snapshot lives in `lib/posthogDesktopCompute`, not in this file. The Desktop tab in the `/pricing` calculator quotes the same card as an hourly sandbox rate, and a second copy here would let the two drift. Model rates stay local, since nothing else renders them.

Note the two surfaces treat a missing card differently, deliberately. Here, a published card is a fact about the docs page, so no card means no compute section. The calculator instead falls back to the snapshot and dates it, because an estimate that silently leaves compute out reads as "cloud tasks are free".
