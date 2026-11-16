# HTTP reads during builds

`buildReads.ts` provides `readJson<T>(url, options)`, `queryJson<T>(url, query, options)`, and `readBytes(url, options)`.

Use these functions only to read data. `queryJson` sends a JSON POST for read-only APIs such as Ashby location lookup. It must not be used for mutations or CMS writes. Source adapters remain responsible for checking required response fields and deciding whether missing data can be omitted.

The client uses native `fetch` and the existing `p-limit` dependency. It provides:

- Four active reads per initial request origin, including body downloads. Queues are shared across bundled copies of the client in the same Node process. Separate worker processes have separate limits.
- Three attempts at most, with randomized exponential backoff. Only temporary transport errors and HTTP 408, 429, 500, 502, 503, and 504 are retried. Invalid JSON, authentication failures, invalid certificates, and caller cancellation are not retried.
- A 30-second deadline covering queueing, requests, body downloads, and retry delays. Each attempt has a 10-second timeout after it leaves the queue. `timeoutMs` and `attemptTimeoutMs` can be set for sources with different response times. `Retry-After` is honored within the overall deadline.
- Coalescing of concurrent identical reads, keyed by URL, method, headers, body, and timeout settings. Responses from different credentials do not share a request. JSON results are parsed independently, and binary results are copied for each caller. Completed responses are not retained.
- An optional caller `signal`. Requests with a caller signal are not coalesced, so one caller cannot cancel another caller's operation. Cancelled queued work does not send an HTTP request.
- Retry diagnostics with the method, origin, path, elapsed time, and failure code. Query strings, headers, and response bodies are excluded from these diagnostics.

The retry boundary includes the body download, not just receipt of response headers. A connection dropped while downloading JSON or a font can therefore recover. Permits are released during retry delays.

Do not add this client underneath another retry loop. Each operation should have one retry owner. Permanent failures retain the cause and identify the failed operation.

Current consumers are Ashby location lookups, Squeak GET requests in `gatsby-source-squeak`, SDK-reference reads in `sourceNodes`, and the Open Graph font download. Ashby additionally retains successful location-name lookups by ID until the next `onPreInit`, because multiple jobs reuse the same locations. Other build requests, custom GitHub retry loops, CMS writes, third-party plugins, and browser requests are not changed.

This client does not provide persistent response caching, stale-data fallback, or a build-wide limit spanning multiple Node processes.

Run `pnpm test:build-reads` to exercise real local HTTP servers, including interrupted responses, rate limits, authentication errors, request coalescing, concurrency, timeouts, and cancellation.
