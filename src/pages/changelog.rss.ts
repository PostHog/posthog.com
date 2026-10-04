// /changelog.rss: the last 50 shipped changelog entries. Head.astro links it from /changelog pages.
import rss from '@astrojs/rss'
import type { APIRoute } from 'astro'
import { changelogFeed } from '../lib/seo/feeds'

export const GET: APIRoute = () => rss(changelogFeed())
