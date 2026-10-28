# Vercel redirects in previews

This plugin reads the `redirects` array in the root `vercel.json`. It runs in Gatsby development and in builds outside Vercel, including Cloudflare previews. Vercel sets `VERCEL=1` during its builds, so those builds exclude the plugin and retain native Vercel routing. No separate redirect flag is required.

`onPreBootstrap` uses `@vercel/routing-utils` to compile the rules into `.cache/vercel-redirects.json`. The shared matcher prepares the regular expressions once per server or browser instance. It preserves rule order, status codes, path parameters, query parameters, and destination fragments. Query conditions use the last value when a key appears more than once, as Vercel does. Other condition types fail compilation instead of silently changing their meaning.

The development middleware in `gatsby-config.js` sends HTTP redirects before Gatsby serves static pages. `functions/_middleware.ts` is a [Cloudflare Pages middleware entry point](https://developers.cloudflare.com/pages/functions/middleware/). It uses the same generated rules and matcher. Wrangler bundles the rules into the preview Function. The generated `public/_routes.json` excludes known Gatsby bundles, stylesheets, and asset directories from Function invocations. Keep redirect sources outside these excluded asset paths. Page-data requests remain included because some have redirects in `vercel.json`.

Hash-named JavaScript chunks receive exact exclusions from the build output, provided no redirect source pattern matches their path. This preserves redirects that require query parameters. These exclusions use the remaining space within Cloudflare's 100-rule limit. Requests beyond that limit still pass through the Function.

The browser hook applies the same matcher to Gatsby route transitions. It uses a full navigation to the destination and preserves the source fragment unless the destination sets its own fragment. This also checks routes that Gatsby handles without an HTML request. Vercel builds exclude the redirect data and browser hook from the browser bundle. Other builds include the compiled rules, matcher, and browser adapter. `@vercel/routing-utils` is a development dependency used only by `gatsby-node.js`; neither the browser nor the Cloudflare Function imports the compiler.

Restart Gatsby after changing `vercel.json`. Rebuild a Cloudflare preview to update its bundled rules. To test a built preview locally, run `pnpm build`, then `pnpm exec wrangler pages dev public`.

This plugin handles redirects only. Vercel rewrites, headers, and other platform configuration remain outside its scope.
