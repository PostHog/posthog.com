# Pricing component

`PostHogDesktopPricing` renders the current model and cloud compute rates on the PostHog Desktop pricing documentation page.

The component loads a same-origin API route. That route combines and caches the public model-pricing and sandbox-pricing responses from PostHog services.

When no compute rate card is published, the component shows model pricing without a cloud compute section.

If the route fails or returns no models, the component shows its dated pricing snapshot so the documentation remains useful. Update the snapshot when model or compute rates change.
