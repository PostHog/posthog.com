import React from 'react'
import Editor from "components/Editor"
import { SEO } from "components/seo"

export default function PostHog101() {
  return (
    <Editor type="mdx" slug="/posthog-101">
      <SEO title="PostHog 101" />
      <h1>PostHog 101</h1>
      <h2>What you can do with our apps</h2>
      <p>After installing our code snippet, you can:</p>
      <ul>
        <li>watch [screen recordings](/session-replay) of people using your app or website. Seeing where they click and get stuck is leaps and bounds more useful than trying to sift through logs – and more accurate than asking for feedback.</li>
        <li>create [graphs](/product-analytics) and [dashboards](/dashboards) to see how features are being used. It's way easier than in GA _and_ more useful because you can drill into activity of a specific user. (GA can't do this because it only tracks visitors anonymously.)</li>
        <li>[roll out a new feature](/feature-flags) to early adopters or beta testers before it's ready for primetime. Or run statically-significant [experiments](/experiments) at scale.</li>
        <li>send [warehouse data](/customer-data-infrastructure) from third parties and run [SQL queries](/sql-editor) on it. By analyzing product usage data _with_ things like payment history, CRM info, and warehouse data, you can make more informed decisions.</li>
        <li>[track technical bugs](/error-tracking) users are experiencing so they don't have to report it to you.</li>
        <li>use [AI](/ai) to set up and analyze most of the things above</li>
      </ul>
    </Editor>
  )
}