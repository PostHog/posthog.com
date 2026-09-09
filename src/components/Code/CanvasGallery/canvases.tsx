export type CanvasCategory = 'investigate' | 'monitor' | 'present'
export type CanvasConnector = 'github' | 'mcpServer'
/** Handles from `src/data/tools.ts`, so a chip can link to the tool's own page. */
export type CanvasTool =
    | 'product_analytics'
    | 'error_tracking'
    | 'inbox'
    | 'ai_observability'
    | 'heatmaps'
    | 'group_analytics'
    | 'data_warehouse'
    | 'funnels'
    | 'retention'
    | 'user_paths'
    | 'dashboards'

export interface CategoryInfo {
    label: string
    verb: string
    description: string
}

export const CATEGORIES: Record<CanvasCategory, CategoryInfo> = {
    investigate: {
        label: 'Investigate',
        verb: 'Query data',
        description: 'Find what happened, who it affected, and what to do next.',
    },
    monitor: {
        label: 'Monitor',
        verb: 'Keep watch',
        description: 'Put a changing product signal where the team can see it.',
    },
    present: {
        label: 'Present',
        verb: 'Tell a story',
        description: 'Turn live data into something people can understand together.',
    },
}

export interface GalleryCanvas {
    slug: string
    title: string
    category: CanvasCategory
    tagline: string
    when: string
    prompt: string
    tools: CanvasTool[]
    connectors: CanvasConnector[]
    image: CanvasImage
}

interface CanvasImage {
    light: `https://res.cloudinary.com/${string}`
    dark?: `https://res.cloudinary.com/${string}`
    alt: string
}

const IMAGES = {
    home: {
        light: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/canvas_james_world_light_b414431f5d.png',
        dark: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/canvas_james_world_dark_20a89b581f.png',
        alt: 'A personal home canvas with metrics, tasks, and links',
    },
    board: {
        light: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/canvas_brittany_work_board_dark_1_cec5ced8e1.png',
        dark: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/canvas_brittany_work_board_dark_3886ceaa36.png',
        alt: 'A work board canvas with columns for current work',
    },
    surveys: {
        light: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/canvas_cory_s_surveys_self_driving_dark_1_1fa4d27d45.png',
        dark: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/canvas_cory_s_surveys_self_driving_dark_11e1a40692.png',
        alt: 'A canvas that summarizes survey responses',
    },
    funnel: {
        light: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/canvas_cleo_funnel_light_54517966c7.png',
        dark: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/canvas_cleo_funnel_dark_d12699ff56.png',
        alt: 'A canvas that draws each funnel step as a flowing river',
    },
    deck: {
        light: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/canvas_harley_slide_deck_2_992e7d6636.png',
        alt: 'A slide deck built as a canvas',
    },
    growth: {
        light: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/canvas_demo_growth_review_light_9d87931bc6.png',
        dark: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/canvas_demo_growth_review_dark_1_6e7beab960.png',
        alt: 'A monthly growth review canvas that compares revenue and growth',
    },
    productDashboard: {
        light: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/canvas_demo_growth_review_light_1_2a0c5fa037.png',
        dark: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/canvas_demo_growth_review_dark_345a3d8ade.png',
        alt: 'A product assistant dashboard with usage, activation, and retention metrics',
    },
    handbookActivity: {
        light: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/canvas_raquel_handbook_activity_light_ac9aa67e2b.png',
        dark: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/canvas_raquel_handbook_activity_dark_00a8f63a09.png',
        alt: 'A canvas that tracks handbook commits and contributors',
    },
    retention: {
        light: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/canvas_cleo_retention_light_0c09fd2724.png',
        dark: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/canvas_cleo_retention_dark_09369feb30.png',
        alt: 'A weekly retention canvas with a retention curve and cohort table',
    },
    usageBilling: {
        light: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/canvas_cleo_usage_billing_demo_light_7c84967aef.png',
        dark: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/canvas_cleo_usage_billing_demo_dark_fece25f120.png',
        alt: 'A usage billing canvas with estimated revenue and invoiced months',
    },
    architecture: {
        light: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/dylan_architecture_diagram_light_d331740058.png',
        alt: 'A canvas that diagrams how a system fits together',
    },
    liveUsage: {
        light: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/canvas_cleo_desktop_deep_dark_12623e86a6.png',
        dark: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/canvas_cleo_desktop_deep_dark_1_4b2a328377.png',
        alt: 'A live usage canvas that draws each active user as a fish',
    },
} satisfies Record<string, CanvasImage>

export const CANVASES: GalleryCanvas[] = [
    {
        slug: 'globe',
        title: 'Show global product use',
        category: 'present',
        tagline: 'A live map for seeing where product use happens.',
        when: 'Show active users by country, with the top country and total coverage.',
        prompt: `Build a canvas that shows where in the world people use our product.

Data: active users in the last 24 hours, grouped by country. Use the geographic property our events already carry. Count each person once.

Layout: a world map filling most of the canvas, with darker green for more active users. Above it, put total active users, the number of countries with any activity, and the country with the most.

Details: give every country a hover label with its name and its user count. Leave countries with no activity in the empty state color, and do not draw them as zero. Name the time window on the canvas.`,
        tools: ['product_analytics'],
        connectors: [],
        image: IMAGES.home,
    },
    {
        slug: 'work-board',
        title: 'Run a work board',
        category: 'monitor',
        tagline: 'Open work, with the important filters already set.',
        when: 'Use one board to review your open issues and cards.',
        prompt: `Build a board for the work my team has open right now.

Data: open issues and pull requests from our connected issue tracker and planning tool. Read the repositories and projects we already have connected, and tell me which ones you used.

Layout: one column per status, in the order work moves through them. Each card shows the title, the owner, the age, and a link to the original.

Details: add filters for owner, team, and current sprint. Hide completed work by default. Sort each column with the oldest work at the top, because that is the work at risk. Show a count at the head of every column.`,
        tools: [],
        connectors: ['github', 'mcpServer'],
        image: IMAGES.board,
    },
    {
        slug: 'product-health-watchtower',
        title: 'Run a product health watchtower',
        category: 'monitor',
        tagline: 'A single view of product work and its health.',
        when: 'Review active product work and the controls that protect it.',
        prompt: `Build a board that shows whether our product work is healthy.

Data: open change requests, work opened by automation, merged work, review coverage, approval coverage, and reports waiting in the Inbox. Add product adoption and the rate of change over the same period.

Layout: coverage and count numbers along the top, then the trend of merged work and work opened by automation, then the list of reports waiting for a decision.

Details: define coverage as the share of merged work that got a review, and say so on the canvas. Mark a number red when it gets worse over the period, and put the direction next to it. Every red number needs a link to the work behind it.`,
        tools: ['inbox', 'product_analytics', 'dashboards'],
        connectors: ['github'],
        image: IMAGES.surveys,
    },
    {
        slug: 'user-journey-flow',
        title: 'See where people leave a journey',
        category: 'present',
        tagline: 'A funnel you can read from across the room.',
        when: 'Use it to see how many people reach each step, and how many leave between steps.',
        prompt: `Build a canvas that shows where people leave a journey, so I can see which step to fix first.

Data: an ordered funnel of unique people, with a 14-day conversion window. Choose the steps from our most common product events, and list the events you chose.

Layout: draw the funnel as a river that flows left to right, where the width is the people who continue. The drop-off should be readable from across the room. Label each step with the people who arrived and the people lost before the next step. Put end-to-end conversion at the end.

Details: let me switch between two or three saved journeys, and name the events in each. State the conversion window on the canvas. Finish with one sentence that names the step with the largest loss.`,
        tools: ['funnels', 'product_analytics', 'user_paths'],
        connectors: [],
        image: IMAGES.funnel,
    },
    {
        slug: 'agent-pr-deck',
        title: 'Present automation output',
        category: 'present',
        tagline: 'Show what agents changed, and at what rate.',
        when: 'Use it to share the monthly change in automated pull requests.',
        prompt: `Build a short presentation on how much of our engineering output comes from automation.

Data: pull requests from the GitHub data in our warehouse. Count a pull request as automated when its author is a bot or an agent account, and list the accounts you treated that way.

Layout: one idea per slide. Open with the share of pull requests opened by automation each month, then the best day for merged pull requests, then a slide that explains the trend in two or three sentences.

Details: use one series per chart, and no legend when there is only one. Write the numbers into the sentences, so a reader who skips the charts still gets the point.`,
        tools: ['data_warehouse'],
        connectors: ['github'],
        image: IMAGES.deck,
    },
    {
        slug: 'monthly-growth-review',
        title: 'Review monthly growth',
        category: 'investigate',
        tagline: 'Revenue and growth across the product portfolio.',
        when: 'Use it to review product growth and revenue each month.',
        prompt: `Build a monthly growth review that tells me where to look next.

Data: revenue, active users, and growth rate for each product, this month against last month. Take revenue from the billing data in our warehouse and usage from our product events.

Layout: a row of totals with the change against last month, then one row per product, sorted by the size of the change rather than by name.

Details: show every change as both an absolute number and a percentage, because a large percentage on a small base is not news. Mark the three largest movements. Finish with a short written verdict: what moved, the most likely reason, and the one thing to look at first.`,
        tools: ['product_analytics', 'data_warehouse'],
        connectors: [],
        image: IMAGES.growth,
    },
    {
        slug: 'product-usage-dashboard',
        title: 'Monitor product usage',
        category: 'monitor',
        tagline: 'Usage, activation, and retention on one screen.',
        when: 'Use it to check product growth, activation, and retention.',
        prompt: `Build a standing dashboard for product usage that looks the same every day, so my eye learns where each number lives.

Data: daily active users, active accounts, key actions, activation rate, and weekly retention. Count accounts with our group data, not per person. Choose the key action from our most frequent product events, and name it on the canvas.

Layout: the five numbers in a fixed row along the top, then daily trends for active users and key actions below.

Details: define activation and say so next to the number. Put a small change against the prior period beside each number, with the direction. Keep the layout identical between loads, and never reorder the numbers.`,
        tools: ['product_analytics', 'group_analytics', 'retention', 'funnels'],
        connectors: [],
        image: IMAGES.productDashboard,
    },
    {
        slug: 'handbook-activity',
        title: 'Track handbook contributions',
        category: 'monitor',
        tagline: 'Who writes the handbook, and how often.',
        when: 'Use it to review commit volume, contributor count, and the most active writers.',
        prompt: `Build a canvas that shows who writes our handbook and how often.

Data: commits, distinct committers, pull requests, and the top committer for the last 30 days, from the GitHub data in our warehouse.

Layout: those four numbers along the top, then commits per week, then a ranked list of committers with their commit counts.

Details: if you cannot match commits to handbook files exactly, approximate it and write the method on the canvas, so nobody reads the number as exact. Use one bar series and no legend. Add the date the data was last refreshed.`,
        tools: ['data_warehouse'],
        connectors: ['github'],
        image: IMAGES.handbookActivity,
    },
    {
        slug: 'living-usage-model',
        title: 'Watch live product use',
        category: 'present',
        tagline: 'Live product use as an ocean you can leave on a screen.',
        when: 'Use it to show what happens right now, with one fish for each active user.',
        prompt: `Build an ambient view of live product use, for a screen the team can leave on all day.

Data: users active in the last few minutes, events, sessions, prompts to our AI features, and friction signals from exceptions and dead clicks.

Layout: an ocean that fills the canvas, with one fish for each recently active user. Put the counts in a fixed panel down one side, and a ranked list of the most common recent event types, with event and user counts, down the other.

Details: clicking a fish shows what that person is doing. Keep the data fresh on its own and show how recent it is, so nobody reads a stale screen as live. Keep the motion slow enough to ignore, since this runs all day next to people who are working.`,
        tools: ['product_analytics', 'ai_observability', 'error_tracking', 'heatmaps'],
        connectors: [],
        image: IMAGES.liveUsage,
    },
    {
        slug: 'weekly-retention',
        title: 'Check if people come back',
        category: 'investigate',
        tagline: 'One curve that says if the product sticks.',
        when: 'Use it to review how much of each weekly cohort returns, and whether that is improving.',
        prompt: `Build a weekly retention canvas that answers one question: do people come back?

Data: weekly cohorts by the date of a person's first activity. Choose the event that counts as activity from our most frequent product events, and name it on the canvas.

Layout: the retention curve for the weeks after first activity, a cohort table with one row per week of first use, and a row of numbers above both: active users, key actions, week 1 retention, and week 4 retention.

Details: compare week 1 retention with the prior cohort and show the direction, so I can see whether it improves. Leave out the current week, because a partial cohort always looks worse. Finish with one sentence on whether retention is flat, improving, or falling.`,
        tools: ['retention', 'product_analytics'],
        connectors: [],
        image: IMAGES.retention,
    },
    {
        slug: 'architecture-diagram',
        title: 'Diagram how a system works',
        category: 'present',
        tagline: 'An architecture diagram you can edit, not redraw.',
        when: 'Use it to explain a pipeline in a talk, a design review, or an onboarding document.',
        prompt: `Build an architecture diagram of our system that I can edit later, not redraw.

Data: read our repository to get the components and their names right. Do not invent a component.

Layout: one horizontal band per layer, in the order data moves through them, and put every component in the band that owns it. Name the language or service each layer runs on. Draw the path data takes between components and label each edge with what moves along it.

Details: use a separate line style for a required path, an optional path, and a feedback loop, and add a key. Keep every label short enough to read at presentation size. Prefer a clear layout over a complete one, and say what you left out.`,
        tools: [],
        connectors: ['github'],
        image: IMAGES.architecture,
    },
    {
        slug: 'usage-billing-overview',
        title: 'Watch usage-based revenue',
        category: 'investigate',
        tagline: 'What we can invoice, and what we cannot.',
        when: 'Use it to review revenue each month, and to find accounts that use the product but cannot be billed.',
        prompt: `Build a usage billing board that shows what we can invoice and what we cannot.

Data: subscriptions, usage, and organizations from the billing data in our warehouse.

Layout: estimated monthly and annual revenue, the latest invoiced amount split into subscription and usage, and the amount accrued since usage billing started. Below that, a table of invoiced revenue by billing month with paying organizations. Below that, a section for organizations that use the product but cannot be invoiced.

Details: subtract the free monthly allowance before you bill usage. Leave out internal and onboarding usage. Each invoice bills the usage of the month before it, so label every row with both months and say which is which. Let me switch the scope between paid plans, trial plans, and all usage, and say which numbers the scope does not change.`,
        tools: ['data_warehouse', 'group_analytics', 'product_analytics'],
        connectors: [],
        image: IMAGES.usageBilling,
    },
]

export const deepLinkFor = (canvas: GalleryCanvas): string =>
    `posthog-code://new?prompt=${encodeURIComponent(canvas.prompt)}`
