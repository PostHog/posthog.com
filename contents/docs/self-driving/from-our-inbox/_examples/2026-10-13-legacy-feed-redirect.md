---
category: Web analytics
report:
  title: The legacy feed URL returns 404 while the canonical feed works
  source: Scout · Website 404s (custom)
  body: >-
    A custom scout found repeated requests to /feed.xml that returned 404.
    It checked the live URLs and found that /rss.xml still served the feed.
    Other legacy feed paths already redirected there, but /feed.xml had no redirect rule.
  suggestedAction: >-
    Add an exact permanent redirect from /feed.xml to /rss.xml.
    Check that the old URL redirects and the destination still serves the feed.
inboxExample:
  reportId: 01a1277e-ae18-70f7-8595-b42e90da15aa
  publishedAt: 2026-10-13
  outcome: >-
    Self-driving opened a pull request that added the missing redirect beside the existing feed rules.
    The pull request merged with one configuration file changed.
  pullRequest:
    url: https://github.com/PostHog/posthog.com/pull/21053
    title: "fix(redirects): redirect legacy /feed.xml to /rss.xml"
    mergedAt: 2026-10-12
---
