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

This would solve all pending issues: we wouldn't have to worry about Python dependencies (it's JavaScript all the way down), there would be no process management for a gRPC link, and we could eventually rewrite the entire ingestion pipeline in JavaScript to get a speed boost over Python.

What's not to like?

Well, if only it was that simple...

## The story continues

This article is the first in a series about plugins in PostHog.

- [x] Part 1. The World Map.
- [ ] Part 2. How to build a scalable arbitrary code execution machine.
- [ ] Part 3. Rebuilding action-mapping to a real-time pipeline
- [ ] Part 4. How plugins lower the barrier to entry for contributors
- [ ] Part 5. ???
- [ ] Part 6. Profit!

_Follow the story by subscribing to our [newsletter](https://posthog.com/newsletter) to get future updates._
