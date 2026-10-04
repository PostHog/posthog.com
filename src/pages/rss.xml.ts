// /rss.xml: the blog feed. Head.astro links it from every page.
import rss from '@astrojs/rss'
import type { APIRoute } from 'astro'
import { blogFeed } from '../lib/seo/feeds'

export const GET: APIRoute = () => rss(blogFeed())
