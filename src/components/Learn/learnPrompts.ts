import { agentTeachingPrompt } from './AgentTeachingActions'

/** A titled prompt as authored: the topic text before the shared teaching instructions are added. */
export interface AuthoredPrompt {
    title: string
    prompt: string
}

/** One product's agent prompts. Each `/learn/<product>/agent-prompts-and-mcp` page and the `/learn/prompts` library read these. */
export interface LearnPromptSet {
    /** `handle` from `src/hooks/productData/*`. */
    productHandle: string
    productName: string
    /** Docs slug for the source-of-truth link, e.g. `feature-flags`. */
    docsSlug: string
    /** What the starter prompt builds the learning path from, e.g. "flags, rollouts, payloads, and gaps". */
    focus: string
    /** One prompt per topic. The shared exercise and safety instructions are appended. */
    chapterPrompts: AuthoredPrompt[]
    /** Ready-to-run prompts, shown after the teaching prompts. Shown as written unless `askFirst` appends its line. */
    examplePrompts?: AuthoredPrompt[]
    /**
     * Teach by asking. Topic and example prompts get `ASK_FIRST`: one question at a time, predict before
     * explaining, and hints instead of answers. The starter asks what the reader knows and has them predict.
     */
    askFirst?: boolean
}

/** The `askFirst` instructions for topic and example prompts. */
const ASK_FIRST = `Ask me one question and wait for my answer. Have me predict before you explain, and give me a hint, not the answer, when I’m wrong.`

/** A prompt exactly as a reader copies it, with the label and tracking resource it is shown with. */
export interface LearnPrompt {
    title: string
    prompt: string
    label: 'Your teaching prompt' | 'Example prompt'
    resource: 'agent_teacher' | 'agent_example'
}

/** The full prompt list for a product: the starter, one teaching prompt per topic, then the examples. */
export function learnPrompts({
    productName,
    docsSlug,
    focus,
    chapterPrompts,
    examplePrompts = [],
    askFirst,
}: LearnPromptSet): LearnPrompt[] {
    const teach = askFirst
        ? `Teach one concept at a time. ${ASK_FIRST}`
        : 'Teach one concept at a time with a small exercise, and review my answer before continuing.'
    const teachingPrompts = [
        { title: 'Start with your product', prompt: agentTeachingPrompt(productName, docsSlug, focus, askFirst) },
        ...chapterPrompts.map(({ title, prompt }) => ({
            title,
            prompt: `${prompt}

Use my code and PostHog data. ${teach} Use https://posthog.com/docs/${docsSlug}.md as the source of truth.

Don’t change my project without asking. If context is missing, ask for it.`,
        })),
    ]
    return [
        ...teachingPrompts.map((entry) => ({
            ...entry,
            label: 'Your teaching prompt' as const,
            resource: 'agent_teacher' as const,
        })),
        ...examplePrompts.map((entry) => ({
            ...entry,
            prompt: askFirst ? `${entry.prompt}\n\n${ASK_FIRST}` : entry.prompt,
            label: 'Example prompt' as const,
            resource: 'agent_example' as const,
        })),
    ]
}

export const PRODUCT_ANALYTICS_PROMPTS: LearnPromptSet = {
    productHandle: 'product_analytics',
    productName: 'Product Analytics',
    docsSlug: 'product-analytics',
    focus: 'events, properties, funnels, and gaps',
    chapterPrompts: [
        {
            title: 'Events and properties',
            prompt: `Teach me PostHog events and properties using one interaction in my product. Explain autocapture, custom events, and useful properties. Help me design an event, predict its payload, and compare event counts with unique people.`,
        },
        {
            title: 'Identity and sessions',
            prompt: `Teach me PostHog identity and sessions using my product’s sign-in journey. Explain distinct_id, session IDs, identify, and reset. Help me trace anonymous and signed-in activity, including browser and server events, and spot an identity gap.`,
        },
        {
            title: 'Trends and funnels',
            prompt: `Teach me PostHog trends and funnels using a real feature and user journey in my product. Compare event counts with unique people, define a funnel and conversion window, and investigate a drop-off. Distinguish attempted actions from successful outcomes.`,
        },
    ],
}

export const AI_OBSERVABILITY_PROMPTS: LearnPromptSet = {
    productHandle: 'ai_observability',
    productName: 'AI Observability',
    docsSlug: 'ai-observability',
    focus: 'LLM calls, traces, costs, and gaps',
    chapterPrompts: [
        {
            title: 'Traces and generations',
            prompt: `Teach me PostHog AI Observability using one LLM feature in my product. Explain traces, spans, and generations, and what PostHog captures on each call. Help me find where my code calls a model, predict what a generation records, and read a real trace.`,
        },
        {
            title: 'Evals',
            prompt: `Teach me PostHog evaluations using an LLM feature in my product. Explain why an error rate can’t tell me whether an answer is good, and compare LLM-as-a-judge and code-based evals. Help me write one eval for a real failure mode and read its pass rate.`,
        },
        {
            title: 'AI cost',
            prompt: `Teach me how PostHog attributes AI cost using my product’s LLM calls. Explain how cost comes from tokens and the model, and which properties tie a generation to a person, a customer, and a feature. Help me find a call that’s missing those properties and break my cost down by feature.`,
        },
    ],
}

export const SESSION_REPLAY_PROMPTS: LearnPromptSet = {
    productHandle: 'session_replay',
    productName: 'Session Replay',
    docsSlug: 'session-replay',
    focus: 'recording settings, masking, replays, and gaps',
    chapterPrompts: [
        {
            title: 'Recording setup',
            prompt: `Teach me PostHog Session Replay setup using my product. Explain what a replay records and how the player rebuilds it. Help me decide which sessions to record with sampling, minimum duration, and triggers, and estimate how many recordings my settings would keep.`,
        },
        {
            title: 'Finding and watching replays',
            prompt: `Teach me how to find and watch the right replay in PostHog using a real problem in my product. Explain how to filter recordings by events, properties, and people, and how the player connects the event stream, console logs, and network requests. Help me find a session that explains the problem.`,
        },
    ],
}

export const FEATURE_FLAGS_PROMPTS: LearnPromptSet = {
    productHandle: 'feature_flags',
    productName: 'Feature Flags',
    docsSlug: 'feature-flags',
    focus: 'flags, rollouts, payloads, and gaps',
    chapterPrompts: [
        {
            title: 'Flags in code',
            prompt: `Teach me PostHog feature flags using one feature in my product. Explain how a flag separates deploy from release, and how PostHog decides who gets it. Help me add a flag check, decide whether to evaluate it on the server or the client, and keep both sides agreeing on who the person is.`,
        },
        {
            title: 'Rollouts and the off switch',
            prompt: `Teach me gradual rollouts in PostHog using a real change in my product. Explain release conditions, percentage rollouts, and how to turn a feature off without a rollback. Help me plan a rollout from my team to everyone, and decide what to watch at each step.`,
        },
        {
            title: 'Experiments and cleanup',
            prompt: `Teach me how a PostHog feature flag becomes an experiment, and how to remove a flag afterward. Explain variants, exposure events, and primary metrics. Help me find a flag in my code that has reached 100% and plan its removal from my code and from PostHog.`,
        },
    ],
}

export const ERROR_TRACKING_PROMPTS: LearnPromptSet = {
    productHandle: 'error_tracking',
    productName: 'Error Tracking',
    docsSlug: 'error-tracking',
    focus: 'issues, grouping, queries, and alerts',
    chapterPrompts: [
        {
            title: 'Capture exceptions',
            prompt: `Teach me PostHog Error Tracking using the exceptions in my app. Explain how exceptions become issues, and how grouping and source maps decide what I see. Help me check that my exceptions reach PostHog with readable stack traces, and fix any issues that are grouped wrong.`,
        },
        {
            title: 'Query and measure impact',
            prompt: `Teach me how to query PostHog exceptions alongside the rest of my data. Explain the keys that join an exception to people, sessions, and accounts. Help me find which issues hit my most valuable accounts, and which ones stop people from finishing what they started.`,
        },
        {
            title: 'Triage, alerts, and scouts',
            prompt: `Teach me how to automate PostHog Error Tracking. Explain assignment rules, alerts, and the scouts that report on errors. Help me route issues to the team that owns each part of my code, alert on regressions and spikes, and turn on the error scouts.`,
        },
    ],
    examplePrompts: [
        {
            title: 'Revenue at risk',
            prompt: `Rank my error tracking issues from the last 7 days by the total MRR of the accounts that hit them, with the exceptions, accounts, and affected users for each. Then tell me which issue to fix first and why. If my accounts don't have an MRR property, rank the issues by affected accounts instead and tell me how to add MRR with warehouse properties.`,
        },
        {
            title: 'Session drop-off',
            prompt: `Build me a funnel over the last 7 days, counted by unique sessions, with a 1-minute conversion window. Step 1 is $exception where $lib is web. Step 2 is any event that shows the person kept going: a $pageview, an $autocapture event, or one of my app's named events, like stay_viewed. If autocapture is off, the named events are the main signal. Break it down by $exception_issue_id. Then tell me which issues have the highest drop-off among issues with at least 100 sessions.`,
        },
        {
            title: 'Session replays',
            prompt: `Find session recordings from the last 7 days that include a $exception event from the error tracking issue named [issue name]. List the 5 most recent with links, and tell me what the person did just before the error.`,
        },
        {
            title: "A customer's errors",
            prompt: `List the error tracking issues that hit users in the account [account name] in the last 30 days. For each issue, show how many of their users it hit and how many exceptions it fired, sorted by users.`,
        },
        {
            title: 'Support tickets',
            prompt: `Use my synced support tickets table to find tickets from the last 30 days that contain a PostHog replay link. Take the session ID from each link and check whether that session had a $exception event. List the tickets that did, with the exception type and message.`,
        },
        {
            title: 'People who hit the error',
            prompt: `List the people who hit the error tracking issue named [issue name] in the last 30 days, with each person's email and how many exceptions they had.`,
        },
        {
            title: 'Experiments',
            prompt: `Build a trend over the last 14 days, counted by unique sessions. Series A is $exception and series B is $pageview. Set the formula to A / B * 100 and break it down by $feature/my-flag-key. Tell me whether any variant has a higher error rate than control.`,
        },
        {
            title: 'Crash-free sessions',
            prompt: `Build a trend over the last 30 days, counted by unique sessions. Series A is all events. Keep web and mobile apart. For web, series B is $exception where $exception_handled is false. For mobile, series B is $exception where $exception_level is fatal. Set the formula to (A - B) / A * 100 to show the share of sessions without an unhandled exception or crash, and tell me which days were lowest.`,
        },
    ],
}

export const DATA_PIPELINES_PROMPTS: LearnPromptSet = {
    productHandle: 'data_pipelines',
    productName: 'Data Pipelines',
    docsSlug: 'data-pipelines',
    focus: 'sources, transformations, destinations, and gaps',
    askFirst: true,
    chapterPrompts: [
        {
            title: 'Sources',
            prompt: `Teach me PostHog data pipeline sources using a tool my product already depends on, like Stripe, my CRM, or my production database. Start with what a source does: it copies tables into PostHog on a schedule, so I can query them next to my events. Then explain the three sync modes and what each one costs me. Incremental syncs only new and changed rows by a field like updated_at, but misses deletions. Append-only adds new rows and never updates old ones. Full refresh copies the whole table every time. Also explain primary keys, why they lock after the first incremental sync, and when a lookback window catches rows that arrive late.

Then help me choose a sync mode and a sync frequency for each table I need. Last, help me join one synced table to my events or persons with a SQL query, and check that the join matches the rows I expect.`,
        },
        {
            title: 'Transformations',
            prompt: `Teach me PostHog transformations using the events my product sends. Start with where a transformation runs: during ingestion, before PostHog stores the event. Explain what that means. A transformation can add, change, or remove properties, or drop the event, and the change is permanent. It can see the event but not the person or groups, because PostHog hasn't resolved them yet. If a transformation fails on an event, PostHog logs the error and keeps processing other events.

Then look at my recent events, and help me find one thing worth changing before it's stored, like a property that holds personal data, a URL with tokens in it, or traffic I don't want to pay for. Then write the transformation and test it against a real recent event. Before I turn it on, tell me which insights, cohorts, or destinations read the property it changes, and what will change for each one.`,
        },
        {
            title: 'Destinations and batch exports',
            prompt: `Teach me how PostHog sends data to other tools, using the tools my team already uses. Compare the two ways. A realtime destination sends each event a few seconds after it arrives, and it can read the person at that time. A batch export moves large volumes to a warehouse like S3, BigQuery, or Snowflake on a schedule. Its events model only appends rows, so an exported event never changes, but its persons model merges updates into rows it already exported. Explain what happens when the other tool fails: a destination retries a few times, and PostHog disables it if it keeps failing. A batch export can retry a whole run.

Then help me pick one for a real need in my product. Help me write a filter that sends only the events I need, and explain why a filter on $identify or later matters if I need person properties. Test it before I turn it on, and tell me which metrics and logs to watch for the first hour.`,
        },
    ],
    examplePrompts: [
        {
            title: 'Failing destinations',
            prompt: `List my active realtime destinations and batch exports. For each one, show its successes, failures, and filtered events from the last 24 hours. Before you show the numbers, explain the difference: a failure means the other tool rejected the event or couldn't be reached, and a filtered event means my filters never matched it. For each destination with failures, read its logs and group the errors by cause, like bad credentials, a bad payload, a rate limit, or the other tool being down. Tell me which ones I can fix in PostHog and which ones I must fix on the other side. For a destination with no successes and many filtered events, show me its filters and explain why they match nothing.`,
        },
        {
            title: 'Check a payload',
            prompt: `Help me check my [destination name] destination before I trust it. First, show me its filters and inputs. Then test-invoke it against one recent event that should match and one that shouldn't. A test sends nothing, so it's safe to repeat. Show me the request it would send, and explain each field that's empty or wrong. If a value is missing, tell me whether the event doesn't have it or the inputs don't map it.`,
        },
        {
            title: 'Drop test traffic',
            prompt: `Teach me how to drop test traffic before PostHog stores it. Look at my recent events and help me find a reliable signal for test traffic, like a localhost or staging $current_url, a test_mode property, or an internal distinct ID. Explain why the signal must be on the event: a transformation runs before PostHog resolves the person, so it can't read person properties. Also explain how this differs from the project's internal and test user filter, which hides events in insights but still stores them. Then create a transformation that drops those events, and test it against one recent event it should drop and one it should keep. Show me both results. Leave it disabled until I confirm, and tell me which metrics to check after I turn it on.`,
        },
        {
            title: 'Transformation order',
            prompt: `Explain how PostHog runs my transformations: one after another, in a set order, where each one gets the event that the one before it returned. Then list my transformations in the order they run, with what each one adds, changes, or removes. Take one real recent event and show me how it looks after each step. Tell me if a transformation reads a property that an earlier one removes or renames, or if events are dropped only after other transformations have already done work on them. Suggest a better order and explain why, but don't change it until I confirm.`,
        },
        {
            title: 'Export as files',
            prompt: `Teach me when to use a file download export instead of a batch export or the query API. Then help me export last week's $pageview events as Parquet files. Explain the limits first: one export covers at most one week, it runs through the API with a personal API key that has the batch_export:write and batch_export:read scopes, and the files use the same schema as an S3 batch export. Show me the request before you send it, then poll until the export is done and give me the download links. Last, show me how to count the rows in the files, and compare the count with a $pageview trend for the same week in PostHog.`,
        },
    ],
}

/** Every product with an agent prompts page, in the order the `/learn/prompts` library lists them. */
export const LEARN_PROMPT_SETS: LearnPromptSet[] = [
    PRODUCT_ANALYTICS_PROMPTS,
    AI_OBSERVABILITY_PROMPTS,
    SESSION_REPLAY_PROMPTS,
    FEATURE_FLAGS_PROMPTS,
    ERROR_TRACKING_PROMPTS,
    DATA_PIPELINES_PROMPTS,
]
