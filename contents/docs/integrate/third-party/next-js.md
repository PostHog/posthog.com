---
title: Next.js
icon: ../../../images/docs/integrate/frameworks/nextjs.svg
---

PostHog makes it easy to get data about traffic and usage of your [Next.js](https://nextjs.org/) app. Integrating PostHog into your site enables analytics about user behavior, custom events capture, session recordings, feature flags, and more.

This guide will walk you through an example integration of PostHog using Next.js and the [posthog-js library](/docs/integrate/client/js).

You can see a working example of this integration in our [Next.js demo app](https://github.com/PostHog/posthog-js/tree/master/playground/nextjs)

Next.js has both client and server-side rendering. We'll cover both in this tutorial.

## Prerequisites

To follow this tutorial along, you need:

1. a PostHog account (either [Cloud](/docs/getting-started/cloud) or [self-hosted](/docs/self-host))
2. a running Next.js application

## Client-side analytics

To integrate PostHog into your Next.js for client-side analytics you should use the [React SDK](/docs/sdks/react). See the [installation instructions](/docs/sdks/react#Installation) to get set up.

You can see a working example of this integration in our [Next.js demo app](https://github.com/PostHog/posthog-js/tree/master/playground/nextjs)

## Server-side analytics

Sever-side rendering is a Next.js feature that allows you to render pages on the server instead of the client. This can be useful for SEO and has faster performance.

To integrate PostHog into your Next.js for server-side analytics you should use the [Node SDK](/docs/sdks/node).

First, install the `posthog-node` library:

```bash
npm install --save posthog-node
```

We can then use the `getServerSideProps` function to send events and pass the feature flags to the component.

This looks like this:

```js
// pages/posts/[id].js
import { useContext, useEffect, useState } from 'react'
import { getServerSession } from "next-auth/next"
import { PostHog } from 'posthog-node'

export default function Post({ post, flags }) {
  const [ctaState, setCtaState] = useState()

  useEffect(() => {
    if (flags) {
      setCtaState(flags['blog-cta'])
    }
  })

  return (
    <div>
      <h1>{post.title}</h1>
      <p>By: {post.author}</p>
      <p>{post.content}</p>
      {ctaState && 
        <p><a href="/">Go to PostHog</a></p>
      }
      <button onClick={likePost}>Like</button>
    </div>
  )
}

export async function getServerSideProps(ctx) {

  const session = await getServerSession(ctx.req, ctx.res)
  let flags = null

  if (session) {
    const client = new PostHog(
      '<ph_project_api_key>',
      {
        api_host: '<ph_instance_address>',
      }
    )
    flags = await client.getAllFlags(session.user.email);
    client.capture(session.user.email, 'loaded blog article', { url: ctx.req.url })
  }
  
  const { posts } = await import('../../blog.json')
  const post = posts.find((post) => post.id.toString() === ctx.params.id)
  return {
    props: {
      post,
      flags
    },
  }
}
```

## Further reading

- [Complete guide to event tracking](/tutorials/event-tracking-guide)
- [Tracking pageviews in single page apps (SPA)](/tutorials/spa)
- [How (and why) our marketing team uses PostHog](/blog/posthog-marketing)
