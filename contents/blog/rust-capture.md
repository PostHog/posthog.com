---
title: How we captured billions of events in Django (and why we rewrote in Rust)
date: 2024-03-22
author: ["ian-vanagas"]
rootpage: /blog
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/posthog-engineering-blog.png
featuredImageType: full
category: Engineering
---

The capture endpoint is the port of entry for event data into the land of PostHog. Because it needs to flawlessly handle millions of requests per day, it's a very important piece of code that has had a lot of work. We've recently rewrote it in Rust and to celebrate, we're going over all the optimizations we've done on the endpoint as well as why and how we ended up redoing all of them in Rust.

The ingestion endpoint was one piece of a broader pipeline work. The pipeline team's goal is to ensure overall ingestion is robust. This means it has integrity, availability, scalability, and maintainability. We can look at all the changes through the lens of improving these. 

## What does the capture endpoint do?

As you'll learn below, we've moved a lot of functionality away from the capture endpoint, but fundamentally, it:

- Receives requests from our SDKs or directly via the API
- Validates API keys
- Anonymizing IPs according to project settings
- Decompressing and normalizing the shape of event data, such as `distinct_id`, `sent_at`, and IP for the rest of the system
- Drops events that were incorrectly formatted or over quota
- Splits replay events from analytics events
- Sends data to Kafka topic for further processing and insertion into storage

## PostHog's early capture endpoint

[Early versions](https://github.com/PostHog/posthog/blob/7b0b04f0ad9097caf7b1c9bf0c6be358460bd4ca/posthog/api/capture.py) of PostHog's capture endpoint were relatively basic DRF request handlers that saved events directly to Postgres. In its MVP form, it literally looked like this:

```js
@csrf_exempt
def get_event(request):
    data = request.GET.get('data')
    if not data:
        return HttpResponse("1")
    
    data = json.loads(base64.b64decode(data))
    print(data)
    team = Team.objects.get(api_token=data['properties']['token'])

    Event.objects.create(
        event=data['event'],
        properties=data['properties'],
        ip=get_ip_address(request),
        team=team
    )

    if not Person.objects.filter(team=team, distinct_ids__contains=data['properties']['distinct_id']).exists():
        Person.objects.create(team=team, distinct_ids=[data['properties']['distinct_id']])
    return cors_response(request, HttpResponse("1"))
```

Early optimizations mostly focused on fixing race conditions, adding [batching](https://github.com/PostHog/posthog/commit/c23e4955f2022175012645b3b35d8c00f96c0044), validation, and formatting. For example, the function to get the project API key had 4 different if statements to find it depending on the SDK (this is foreshadowing).

## Scaling up with Kafka and ClickHouse

Django, Python, and Postgres aren't generally thought of as a highly scalable stack, but as is the trend with the rest of this post, they can when combined with tools that are. The big jump that made PostHog massively more scalable was adopting them alongside [ClickHouse](/blog/how-we-turned-clickhouse-into-our-eventmansion) and [Kafka](https://github.com/PostHog/posthog/pull/1644).

Although the changes to the capture endpoint weren't large in either of these changes, the impact on our overall pipeline was. In the long run, these changes made the largest impact on the scalability of PostHog. Kafka also continues to make our entire ingestion pipeline more fault tolerant, thanks to the batching and retries it provides. 

![v1 capture endpoint](https://res.cloudinary.com/dmukukwp6/image/upload/v1711124481/posthog.com/contents/images/blog/rust-capture/v1.png)

Eventually, processing events and inserting them into ClickHouse was moved further away from the capture endpoint into [the plugin server](/blog/how-we-built-an-app-server). Since it is better structured to handle a large number of general event processing tasks, it made sense to add it to  does the heavy lifting of processing events. The plugin server was better structured to handle a large amount of tasks. 

## Optimizing the capture endpoint

Once we made the big infrastructure decisions, many of the changes to the endpoint were optimizations like:

- **Errors.** Many incorrect requests would fail silently or we would return [wrong responses](https://github.com/PostHog/posthog/pull/3939) when requests were incorrect.

- **Validation.** Although we allow users to have a lot of customization over what they send us, there is some data we require in standardized formats. For example, `distinct_id` should be less than [200 characters](https://github.com/PostHog/posthog/pull/1831).

- **Metrics.** To improve the capture endpoint, we need to know how it is being used. We added basic [reports](https://github.com/PostHog/posthog/pull/1683), [counters](https://github.com/PostHog/posthog/pull/4279), and [timings](https://github.com/PostHog/posthog/pull/2211), largely using `statsd`.

- **Splitting replays.** Although session replays might seem significantly different than product analytics, the capture endpoint handled both of them. This started by simplifying handling the larger, [gzipped](https://github.com/PostHog/posthog/pull/2701) replay capture requests and ended a completely [different](https://github.com/PostHog/posthog/pull/16024) [pipeline](https://github.com/PostHog/posthog/pull/13654) (but this is another post).

- **Handle spikes.** To ensure resiliency, the capture endpoint needs to be able to handle spikes in traffic as well as events sent over quota. [Kafka](/handbook/engineering/clickhouse/data-ingestion) later in the pipeline handles a lot of this, but we also built a [dead letter queue](https://github.com/PostHog/posthog/pull/6193) to handle failed requests (like if ClickHouse or [Postgres](https://github.com/PostHog/posthog/pull/6230) was down) and an overflow topic to handle slow ones.

In small ways, each of these improved the integrity, availability, scalability, and maintainability of the capture endpoint. Small improvements can add up, but we've found it is big infrastructure or service changes that still make the most difference. 

## Removing Postgres dependency

An ongoing problem was the capture endpoints' reliance on Postgres. In multiple places in the capture endpoint, we were querying Postgres to validate (like API keys, `team_id` ) or add data (like feature flags). This meant:

- We were scaling up too large during peak hours, increasing costs above what one would expect.
- If Postgres was slow, ingestion would lag.
- Worse, if Postgres was down, we were at risk of dropping events.

[Upgrading](https://github.com/PostHog/product-internal/issues/256) and growing our Postgres instance didn't solve this. We were running the second-largest available server on Heroku before a migration to AWS Aurora which didn't fundamentally change the issues we were facing. What we needed was to rely less on Postgres in the capture endpoint and find ways to remove or shift queries down the pipeline. 

### Lightweight capture

We called this change "lightweight capture" and it required moving as many Postgres queries as possible elsewhere. A lot of them went into the [plugin server](https://github.com/PostHog/posthog/pull/12802). This ensured that events got into Kafka no matter what.

Xavier's work on this was largely around optimizing team and token resolution. These two made the most checks to Postgres in the capture endpoint. This meant, if Postgres was unhealthy, it would lag and cause issues.

There were 3 main optimizations:

1. **Dropping feature flags when not set on events.** An earlier optimization skipped this if teams [didn't have feature flags](https://github.com/PostHog/posthog/pull/4687), which reduced the queries on Postgres by 50%. Xavier went further by [not backfilling flag data](https://github.com/PostHog/posthog/issues/14326) if not set. 

2. **Moved team resolution to the plugin server.** To send event data to the right place, we need to figure out [what team ID a project API key connects to](https://github.com/PostHog/posthog/issues/14327). This was responsible for ~20% of endpoint latency but could be moved to the [plugin server](https://github.com/PostHog/posthog/pull/14341) to improve resiliency and speed. 

3. **Validate the shape of the project API key.** Because we moved team resolution to the plugin server, we could ingest [obviously incorrect events](https://github.com/PostHog/posthog/pull/14439) (~3% were this way). To prevent this while also not checking Postgres, we [check and drop](https://github.com/PostHog/posthog/issues/14328) obviously incorrect (like blank) API keys.

Once this rolled out, we dropped Postgres query count by 40%, eased the load on pgbouncer, and reduced the number of select queries per incoming request to only 1. This helped reduce the p90 latency for the capture endpoint by ~30% and enabled us to downscale the deployment by 20%.   

## Why we rewrote in Rust

Margins matter in software products. We found that our AWS costs were steadily rising above internal forecasts. To ensure that we can price PostHog to [match our cheapest competitors](/handbook/engineering/feature-pricing), we needed to get costs under control, which was the infrastructure team's goal.

Although the work on lightweight capture was a big improvement, the capture endpoint was still a significant portion of the costs. The EC2 instances it was running on were costing $29k per month in the US and $27k in the EU. We optimized our Django endpoint as much as we reasonably could, it was fast and stable, but not cheap, and we needed something else.

Although Node and JavaScript were initially floated as an option, we eventually settled on Rust because of the many cases where Rust has significantly improved costs for high-volume services while improving reliability.

## The challenges of rewriting in Rust

Recordings capture continues to be in Django, but it has also changed significantly (which is another post). 

There were a bunch of edge cases, largely handled by years of optimizations in Python, that were tougher to handle. This is because we built the capture endpoint to handle unexpected situations. This is antithetical to how Rust works. Edge cases and formats need to be specifically handled in Rust. For example:

- Using `rdkafka` caused memory to balloon that didn't correlate with overflow state size or request count.

- Accepting [other JSON values](https://github.com/PostHog/capture/pull/65) as `distinct_id` and stringifying them.

- [Auto-detecting](https://github.com/PostHog/capture/pull/63) `gzip` compression by reading the first three bytes and falling back to `utf-8` otherwise.

Because the capture endpoint is such an important one, we wanted to be extremely confident that it worked. We set up a new endpoint for the Rust service and rolling it required changes to [SDKs](https://github.com/PostHog/posthog-js/pull/831), the rollout tools we use, and interactions with users (who needed to update their configs or reverse proxies). This made it significantly more complicated to rollout than past changes. 

Adding Rust to our stack also came with new challenges from deploying. We needed a new set of builders, action runners, Docker setup, and more. We set up a [specific monorepo](https://github.com/PostHog/hog-rs) for Rust services to help make this easier. 

## Outcomes from rewriting in Rust

So what did all this work get us?

- The deployment of `posthog-events` is 1/3 of the old system peak. This remains true while we continue to grow the number of events we capture.

- 3 Rust pods replace 40 Django pods.

- Django is still handling all recordings, backend SDKs + old `posthog-js` versions, but Rust is ingesting around a third of the total analytics traffic.

- Rust being a stricter language than Python makes it less likely we introduce bugs 
and issues. This means the capture endpoint is more reliable.

The success of the Rust capture endpoint has proven to use that it is a worthwhile path to continue with. We have an [open issue](https://github.com/PostHog/hog-rs/issues/4) with features, including `/batch` requests and backend SDK support. If work like this interests you, [we're hiring](/careers).