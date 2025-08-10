import React from 'react'
import OSTable from 'components/OSTable'
import OSTabs from 'components/OSTabs'
import SEO from 'components/seo'
import Editor from 'components/Editor'
import ScrollArea from 'components/RadixUI/ScrollArea'
import OSButton from "components/OSButton"
import CDPDiagram from "./CDPDiagram"
import Link from "components/Link"
import { IconArrowUpRight, IconInfo } from "@posthog/icons"

export default function CDP(): JSX.Element {

  // Define table columns
  const columns = [
    { name: 'source type', width: 'minmax(170px, 1fr)', align: 'left' as const },
    { name: 'type of data', width: 'minmax(200px, 1fr)', align: 'left' as const },
    { name: 'example sources', width: 'minmax(100px, 2fr)', align: 'left' as const },
  ]


  // Data In tab rows
  const dataInRows = [
    {
      cells: [
        { content: 'warehouse sources' },
        { content: 'import data from databases and SaaS tools' },
        {
          content: 'Popular databases, Stripe, Salesforce, Snowflake, Zendesk, etc',
          className: '',
        },
      ],
    },
    {
      cells: [
        { content: 'event pipelines' },
        { content: 'send realtime data as events' },
        {
          content: '[build your own] to import data from anywhere',
          className: '',
        },
      ],
    },
    {
      cells: [
        { content: 'PostHog SDKs' },
        { content: 'customer activity in your product' },
        {
          content: 'JS event tracking with autocapture, front end, server-side, and mobile libraries',
          className: '',
        },
      ],
    },
  ]

  // Transformation tab rows
  const transformationRows = [
    {
      cells: [
        { content: 'data enrichment' },
        { content: 'add context and metadata to events' },
        {
          content: 'GeoIP, user agent parsing, property mapping, data validation',
          className: '',
        },
      ],
    },
    {
      cells: [
        { content: 'filtering & routing' },
        { content: 'control data flow and reduce noise' },
        {
          content: 'Event filtering, PII scrubbing, conditional routing, sampling',
          className: '',
        },
      ],
    },
    {
      cells: [
        { content: 'custom transformations' },
        { content: 'apply business logic to your data' },
        {
          content: 'Custom JavaScript functions, webhooks, API calls, data normalization',
          className: '',
        },
      ],
    },
  ]

  // Data Out tab rows
  const dataOutRows = [
    {
      cells: [
        { content: 'real-time exports' },
        { content: 'stream events to external systems instantly' },
        {
          content: 'Webhooks, Kafka, Amazon Kinesis, real-time dashboards',
          className: '',
        },
      ],
    },
    {
      cells: [
        { content: 'batch exports' },
        { content: 'scheduled exports to data warehouses' },
        {
          content: 'BigQuery, Snowflake, S3, PostgreSQL, daily/hourly exports',
          className: '',
        },
      ],
    },
    {
      cells: [
        { content: 'marketing & sales tools' },
        { content: 'sync data to customer-facing platforms' },
        {
          content: 'Salesforce, HubSpot, Customer.io, Braze, Amplitude, Mixpanel',
          className: '',
        },
      ],
    },
  ]

  return (
    <>
      <SEO
        title="cdp manifesto.md"
        description="Get all your data into PostHog with 60+ sources & destinations"
        image={`images/og/cdp.jpg`}
      />
      <Editor
        title="cdp manifesto"
        type="md"
        slug="/cdp-manifesto.md"
      >
        <ScrollArea>
          <h2 className="text-2xl font-bold my-4">
            analyze all your product and customer data in PostHog – no matter where it was generated.
          </h2>
          <p>
            PostHog's CDP is built for product engineers who want to understand how product usage correlates with business data generated elsewhere. you can get it all into PostHog, then send it wherever else you need it to go.
          </p>
          <p>
            we've got warehouse sources, event pipelines, transformations, realtime event streaming, batch exports – it's all here, whether you call it a CDP, ETL, a data warehouse, event pipelines, or another ambiguous industry term.
          </p>

          <OSTabs
            frame={true}
            className="my-6"
            tabs={[
              {
                value: 'data-in',
                label: 'data in',
                content: <OSTable columns={columns} rows={dataInRows} editable={false} />
              },
              {
                value: 'transformation',
                label: 'transformation',
                content: <OSTable columns={columns} rows={transformationRows} editable={false} />
              },
              {
                value: 'data-out',
                label: 'data out',
                content: <OSTable columns={columns} rows={dataOutRows} editable={false} />
              }
            ]}
            defaultValue="data-in"
          />

          <OSButton to="/cdp" asLink state={{ newWindow: true }}>See all integrations &rarr;</OSButton>

          <h3>how it works</h3>

          <CDPDiagram className="max-w-lg fill-primary" />

          <h3>🪦 RIP the modern data stack</h3>

          <p>it was a great idea, but as the stage of your company changes, the “modern data stack” inevitably devolves into a complicated mess of tools and integrations.</p>

          <p><strong>what’s worse:</strong> it usually means hiring someone to manage it all – and at that point, the data becomes less accessible to the product engineers and product managers responsible for building products.</p>

          <blockquote>
            if you’re interested in reading more about how we feel about the modern data stack, read our <em>definitely not-opinionated</em> blog post on it: <Link to="/blog/modern-data-stack-sucks" state={{ newWindow: true }}>The modern data stack sucks <IconArrowUpRight className="size-4 inline-block" /> </Link>
          </blockquote>

          <p>so what if it didn’t have to be this way?</p>

          <p>that’s the idea with PostHog’s customer data platform. everything can finally live in one place, and can be analyzed with any of PostHog’s insight tools or BI visualizations. it doesn’t require a data engineer, and it scales with you as you grow.</p>

          <p>a customer data platform is not just event pipelines and destinations. it’s not a regurgitated feed of user activity. it’s not just a SQL editor and some transformations.</p>

          <p>a true CDP is when you combine an ETL solution, event pipelines, modeling, data exporting and realtime event streaming, *and* a way to analyze and visualize it (insights, product analytics, BI) – all in a single place.</p>

          <p>our CDP is specifically built with the needs of product engineers in mind – to help you get the data points you need to build success products – without having to hire a dedicated team to handle it all.</p>

          <h3>roadmap</h3>
          <p>PostHog is always a work in progress. here’s what we’re working on next, and what we’re thinking about building soon:</p>

          <h4>WIP</h4>

          <ul>
            <li>item 1</li>
            <li>item 2</li>
          </ul>

          <h4>backlog</h4>

          <ul>
            <li>item 1</li>
            <li>item 2</li>
          </ul>

        </ScrollArea>
      </Editor>
    </>
  )
}
