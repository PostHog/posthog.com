---
date: 2021-09-09
title: "Plugging in plugins, Pt. 1: The World Map"
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
categories: plugins
author: marius-andra
featuredImage: ../images/blog/plugin-saga-1.png
featuredImageType: full
---

# Part 1. The World Map.

It all started with the world map.

October 2020. We follow a group of 9 engineers, hot off the heels of [implementing ClickHouse support](https://posthog.com/blog/clickhouse-announcement), as they brave the pandemic and gather at a company retreat in Italy. The company is not even a year old, and while nobody is terribly sure what's going to happen next, there's contagious optimism in the air.

After a session where we [formalize our values](/handbook/company/values) ("We haven't built our defining feature yet"), it's time to discuss what defining features to build next - within the hour.

Welcome to the infamous PostHog Tuscany Hackathon of 2020.

I propose "plugins" to scratch my own itch. 

You see, I've been dogfooding PostHog on a personal site, and the only thing I miss from Google Analytics is the world map: a quick overview of where my site's visitors come from.

![The World Map, as Google sees it](https://www.klipfolio.com/sites/default/files/gallery/klip-template/where-is-organic-traffic-coming-from.png)

The map visualization is the easy part. The hard part is getting the data that feeds it. Since not everyone wants IP geolocation, and there are many different providers of such services, I immediately think of generic plugins that would augment your events.

The idea gathers support.

Plugins could also add new features to the frontend. We could build an S3 backup plugin. What about a plugin to ask for customer surveys? Could we do other imports and exports? I want to sync my GitHub stars into PostHog. Wait, aren't we implementing Segment and Rudderstack here?

Visions of glory pass before our eyes, and with a ragtag team of two James's, we set to work.

We have three days. How hard could it be?

## The hackathon is a success

PostHog now supports plugins! You can write arbitrary **Python** code that gets downloaded (from GitHub), extracted, and integrated into a running PostHog app.

Sure, you need Python 3.9, as Python 3.8's `zipimport` somehow doesn't support the zip archives GitHub provides, but whatever - it works!

```py
# exampleplugin/__init__.py
from posthog.plugins import PluginBaseClass, PosthogEvent, TeamPlugin

class ExamplePlugin(PluginBaseClass):   
    def __init__(self, team_plugin_config: TeamPlugin):
        super().__init__(team_plugin_config)
        # other per-team init code
    def process_event(self, event: PosthogEvent):
        event.properties["hello"] = "world"
        return event
    def process_identify(self, event: PosthogEvent):
        pass
```

We also build a plugin repository, an interface to configure the plugins, a CLI to preconfigure plugins for custom installations, and two sample plugins: the currency normalizer (convert event properties to a single currency), and the much coveted [GeoIP plugin, via Maxmind](https://www.maxmind.com/en/home). 

![Plugins v0.0](https://user-images.githubusercontent.com/53387/96144527-8f190700-0f04-11eb-8c9b-40ba031ac1d2.gif)

This is perfect for a hackathon demo, but will it work in real life? What are the unknown unknowns? [IS THIS WEB SCALE?](http://www.mongodb-is-web-scale.com/)

It doesn't take long for cracks to appear.

Turns out it's damn near impossible to manage Python dependencies via multiple `requirements.txt` files.

There's no way to tell which dependencies your plugin's dependencies will install, without first installing them. There is [nothing like `pip --dry-run`](https://github.com/pypa/pip/issues/53). You literally need to install the `pip` package, and run an `__init__.py` script inside the package to get its dependency tree.

What's more, all dependencies get installed together, making it just a matter of time before a plugin overrides an app dependency (e.g. `django`), and brings everything crashing down. 

Not cool.

We have no choice but to scrap this work.

Perhaps we should have gone with JavaScript from day one?

### Other attempts

As [detailed in the Plugins Epic](https://github.com/PostHog/posthog/issues/1896#issuecomment-717855986), I try a few other options next:

- I develop and subsequently scratch a JS-via-[py-mini-racer](https://github.com/sqreen/PyMiniRacer) implementation. Mini racer is great for simple functions, but as it's raw v8, not node, it lacks support for async/promises and importing modules like `fetch`. It also features a limited standard library. No bueno.
- I develop and subsequently scratch a [JS gRPC](https://grpc.io/docs/languages/node/basics/) implementation. It works well - I'm able to call JS code from Python and get a response, but this approach leaves us with a lot of manual work and questions such as "How many workers should respond to the gRPC calls?" and "How do we make sure no events are lost if the node gRPC server is down?"

Finally, after a bit of soul-searching, I come up with an ingenious plan.

We use [Celery](https://docs.celeryproject.org/) to process events in the background. When an event hits `/capture`, our API parses the request and queues the event into a job queue.

What if we build a new server with the [NodeJS port of Celery](https://celery-node.js.org/), and just plug that in as another step in the existing pipeline? 

This would solve all pending issues: we wouldn't have to worry about Python dependencies, we could potentially run untrusted code in a fast sandbox, there would be no process management for a gRPC link, and we could eventually rewrite the entire ingestion pipeline in NodeJS to get a speed boost over Python.

What's not to like?

Well, if only it was that simple...

# Part 2. How to build a scalable arbitrary code execution machine.

When we left the story, we had just set out to build a NodeJS app that:

- Gets a stream of events from Python through a Redis queue (via [celery.node](https://celery-node.js.org/))
- Runs user-defined JavaScript on that stream of events.
- Sends them back to Python through the same queue for ingestion.

## VM2

The first and the last steps are easy enough, but what about the middle? How do you even securely run user defined JavaScript code?

Turns out NodeJS v14 has a [built in VM module](https://nodejs.org/dist./v14.17.5/docs/api/vm.html) that allows running custom JavaScript in a separate context. 

> JavaScript code can be compiled and run immediately or compiled, saved, and run later.

Perfect.

> The vm module is not a security mechanism. Do not use it to run untrusted code.

Not ideal, but expected. [Privilege escalation](https://en.wikipedia.org/wiki/Privilege_escalation) and [resource exhaustion](https://en.wikipedia.org/wiki/Resource_exhaustion_attack) attacks are real. We can't avoid them, but we can build strategies to mitigate them.

Node's VM module is rather limited as well. It puts your code in an isolated context, has ~~limited~~ no support for secure communications with the host, and has holes like this:

```js
const vm = require('vm');
vm.runInNewContext('this.constructor.constructor("return process")().exit()');
console.log('Never gets executed.');
```

Thus we need an abstraction. The two most popular are `isolated-vm` and `vm2`. What's the [difference between them](https://github.com/patriksimek/vm2/wiki/vm2-vs-isolated-vm), and which is best for us?

- [`isolated-vm`](https://github.com/laverdet/isolated-vm) is used by various big companies, and claims to be really secure. Each "isolate" runs in a new thread, with controllable CPU and memory limits. There are methods to copy data between the main thread and an isolate, and we can share objects and functions between the host and the isolate. It's not a perfect sandbox, but it's as close as we can get. 
- [`vm2`](https://github.com/patriksimek/vm2) has a different isolation model. Each "vm" runs in an isolated context NodeVM context, in the same thread with the rest of the app. There are no memory or CPU limits we can enforce. You're running the code locally, just not sharing any variables with the host app.

While `isolated-vm` feels like a great fit because of its emphasis on security, its implementation [wasn't a success](https://github.com/PostHog/posthog/issues/6855#issuecomment-853879421). 

> At the end of the day, I would have had to implement some Proxying code similar to vm2, just to get fetch working, and decided it's not worth the effort, considering the time budget and the extremely likely case that I'll leave in some security holes.

VM2 didn't have this problem, as it had its own system of proxies that make sharing code between the host and the VM seamless.  

Because of this, we decided to change our security model. On PostHog Cloud, we would control the installed plugins ourselves, not letting in any code we haven't vetted. On self-hosted, users are free to write as many [arbitrary plugins](https://github.com/PostHog/posthog/issues/6855) as they please.  

This is the best of all worlds. Self-hosted users have all the freedom: they can use the built-in editor to write JavaScript directly in PostHog. PostHog Cloud users will still benefit from community plugins: they're all developed and tested in the open. We just need to manually check and install them, before Cloud users get access. One of [our most used plugins](https://posthog.com/blog/the-state-of-plugins) came about this way.

We still want to [enable arbitrary plugins on Cloud](https://github.com/PostHog/posthog/issues/6855), and [support all npm packages](https://github.com/PostHog/posthog/issues/6887), with [proper levels of isolation](https://github.com/PostHog/posthog/issues/6888), but considering what you can already do, we decided to punt on this for now. 

## Piscina
- https://github.com/piscinajs/piscina/pull/113

## Defence against malicious plugins
- https://github.com/PostHog/plugin-server/pull/155
- https://github.com/PostHog/posthog/issues/6891

## Scheduled plugins via redlock

## Kafka
- https://github.com/PostHog/plugin-server/issues/273
- Redis pooling

## Ingestion inside the plugin server
- https://github.com/PostHog/plugin-server/pull/34
- https://github.com/PostHog/plugin-server/pull/116

## Action-Event matching
- https://github.com/PostHog/plugin-server/issues/235

## Retries
- https://github.com/PostHog/plugin-server/issues/273
- https://github.com/PostHog/plugin-server/pull/351

## Exporting and importing events
- https://github.com/PostHog/plugin-server/pull/535
- https://github.com/PostHog/plugin-server/pull/504

## Benchmarks
- How fast is this now?

## Mistakes made
- https://github.com/PostHog/plugin-server/issues/487

## Epic
- https://github.com/PostHog/posthog/issues/1896
