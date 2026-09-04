---
title: 'Automated attention, part 1: Freezing time for fun and profit'
date: 2026-09-03
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
    - tue-haulund
featuredImage: >-
    https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/open-source-hotjar-alternatives/replayhog.png
featuredImageType: full
category: Engineering
tags:
    - Inside PostHog
    - Engineering
    - Session replay
    - AI
seo:
    metaTitle: 'Automated attention, part 1: Freezing time for fun and profit'
    metaDescription: "How we turn session replays into video for Replay Vision, and how Chrome's beginFrame fixed our rasterizer under load."
---

Almost none of the recordings we ingest with Session Replay are watched. The overwhelming majority are stored, never opened, and expire at the end of their retention period without ever receiving any attention at all. It's no wonder, really: even a moderately busy product results in tens of thousands of recordings per day. You'd need an army of humans doing nothing but watching these recordings to cover all, or even most, of them. As a result, most of what the Session Replay team has shipped over the past couple of years is some form of search: filters on events and properties, relevance sorting, collections, session summaries. All of them are attempts to help our users find the needle in the haystack and maximize the value they can get with the limited amount of human attention available to them.

[Replay Vision](/replay-vision) started from the thought that we should stop rationing attention and start automating it instead. Recent multimodal models are good enough at watching video that you can hand them a recording and get a sensible account of what the user did and where it went wrong. If that works at all, it works for every recording, not just the ones someone had time for.

This is the first of two posts about building it. This one is about the pipeline that turns recording data into videos that a model can look at. The second is about the model, and about controlling what it pays attention to.

## Vector vs raster

A replay looks like a screen recording when you play it, but there's no video anywhere in the pipeline. What the SDK captures, using rrweb, is a serialized copy of the DOM at the moment recording starts, and then a stream of events describing what changed: this node was inserted under that parent, this attribute changed value, the mouse moved to these coordinates, the page scrolled. When you press play, a browser rebuilds the DOM from the snapshot and applies the mutations one at a time, with the page's real stylesheets, using the browser's real layout engine.

Handing this data to an LLM proved fruitless. It is verbose, often many megabytes of JSON per recording, and even the most recent models have limited context windows, so they simply cannot hold a whole recording in context at once. The bigger problem is that the model has no idea what it's looking at. An rrweb stream is a change log against a tree. To know what the screen showed at second 42, you'd have to hold the whole tree in your head, apply every mutation up to that point, and then run layout and paint in your head as well. The model will happily tell you that a `div` gained a class called `is-disabled`. It cannot tell you that the checkout button just went grey and slid underneath the cookie banner, because that fact only exists after layout has run.

Modern multimodal models like Gemini need actual video in order to make sense of a recording. A good mental model for this is vector graphics versus raster graphics. The rrweb data is a series of instructions that lets the browser _perfectly_ recreate the original session, in the same way an SVG is a mathematical description that lets a renderer recreate an image. What we needed was the rasterized version of the recording: an MP4, a compressed stream of pixels. Which meant the first piece of Replay Vision was a rasterizer. rrweb goes in, an MP4 comes out. Load the player in a headless browser, record the screen, encode it.

## The first attempt

The rasterizer would need to handle a large volume of recordings to keep up with what we ingest in Session Replay, so in March 2026 we set out to build the first version. The service consists of a number of moving parts:

- A very small frontend bundle that can play back an rrweb data stream, built specifically for video capture
- A pool of running headless Chromium instances with a warm browser cache
- A Node.js process controlling the Chromium instances via Puppeteer
- A Temporal task queue to manage incoming workloads and retry on failures
- Dedicated infrastructure to run all of these components

Upon receiving a new task, the service would load the frontend bundle in one of the browsers. The browser would download the recording data from one of our internal services and play it back at 8x speed, while Chrome pushed a screencast frame to the Node.js process over the Chrome DevTools Protocol (CDP) every time it repainted. The frames were piped into ffmpeg, which encoded them into a single MP4 file.

The rasterizer worked well during initial testing, but once we started running multiple instances of the service on the same hardware, problems began to appear.

## Mangled output

We saw videos that skipped over sections of the recording, and others that froze for several seconds at a time. The same recording would often produce videos of different lengths. It became clear that the rasterizer was very sensitive to CPU contention. Essentially we were running two independent processes, one rendering the recording and one capturing the frames. If rendering slowed down because another process was taking all the available CPU, capture would keep streaming on schedule and ffmpeg would just repeat the last frame it was given. That's the freeze. Or conversely, capture could be starved while rendering continued, and eventually frames would pile up and some would get dropped. That's the skip.

![Four filmstrips: the rrweb data stream, the complete video with no contention, the freeze from starved rendering, and the skip from starved capture](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/contention_filmstrip_8aa21fe8fa.png)

We needed a way to ensure determinism across these processes, regardless of the available resources. The same input data should always result in the same output data.

## Roads? Where we're going, we don't need roads

Another way to frame the problem is _time_. The capture process expects frames to arrive in real time, and the render process expects to be captured in real time. Each depends on the other keeping up. We were hoping these processes would always stay in agreement, but on a modern preemptive OS this was a fool's hope.

Regardless of CPU contention, we need these processes to wait for each other and only progress in lockstep. Turns out Chrome has a mode for exactly this scenario: [HeadlessExperimental.beginFrame](https://chromedevtools.github.io/devtools-protocol/tot/HeadlessExperimental/#method-beginFrame). It's an experimental feature of headless Chrome that stops the compositor from producing frames on its own. Instead, it waits for an explicit `beginFrame` command over CDP, renders exactly one frame, and returns once that frame is complete. In this mode we can ensure that Chrome does not render the next frame until the capture process has taken the previous one and added it to the ffmpeg stream. In case of CPU contention, rendering would simply halt until the capture process is ready for another frame.

However, the JS-based rrweb player does not wait for the browser. If the browser stops invoking the [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame) callbacks as often, the player compensates by skipping forward to wherever it should be according to the time passed since the last tick. We need the rrweb player to believe it is running in real time, and only ever advance it by exactly one frame interval per tick.

The trick is to _freeze time_ inside the JS virtual machine. Before playback starts, we override `Date.now`, `performance.now`, `requestAnimationFrame`, `setTimeout` and `setInterval` inside the page with versions that don't track the wall clock at all. Time only moves when we call `beginFrame`, and it moves by exactly one frame interval. The player asks for an animation frame and gets one, it reads the clock and sees it ticking forward at a steady rate, and it never notices that a single tick might have taken 20 milliseconds or two seconds of real time to produce.

![Four filmstrips: the rrweb data stream, the complete video with no contention, and complete videos for both starved rendering and starved capture, where each starved frame takes longer to produce but none go missing](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/beginframe_filmstrip_ba28e7a844.png)

We use [puppeteer-capture](https://www.npmjs.com/package/puppeteer-capture) for this, a Puppeteer plugin that conveniently bundles the virtual time shims together with the `beginFrame` loop.

## Putting it all together

With `beginFrame` gating the compositor and the virtual clock gating the player, the two failure modes from earlier simply stop existing. If rendering is starved, the clock waits for the frame. If capture is starved, the renderer waits for the next `beginFrame` call. Either way, the next frame in the video is the next frame in the recording, and CPU contention only changes how long the job takes, not what comes out of it. We can run as many jobs per pod as we like, and the same recording produces the same video every time.

The rasterizer was the unlock we needed to turn every recording into something a multimodal model can watch. But a model that can see everything will happily look at everything, most of which doesn't matter. Part two is about directing its attention: what we show it, what we don't let it see, and how we stopped it fixating on irrelevant details.

![Doc Brown hoggie connecting the cable at the moment the lightning strikes](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/doc_brown_76d9d75886.png)

The version of our rasterizer described in this blog post has been in production since March 2026 and powers all of Replay Vision as well as some features in Session Replay itself. At the time of writing it has rasterized more than 370 years of recordings into roughly 3.5 million videos.
