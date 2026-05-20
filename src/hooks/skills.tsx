import { useMemo } from 'react'
import useProduct from './useProduct'
import {
    SkillResourceRef,
    ResolvedResource,
    toolStringToResource,
    resolveSkillResource,
    resolveSkillResources,
    fallbackResolvedResource,
} from './skillsResourceRegistry'

export type { SkillResourceRef, ResolvedResource } from './skillsResourceRegistry'

export type Skill = {
    id: string
    name: string
    department: string
    category: string
    tags: string[]
    description: string
    resources: SkillResourceRef[]
    flow: string[]
    example_prompts: string[]
}

type RawSkill = Omit<Skill, 'id' | 'resources'> & { tools: string[] }

export function slugifySkillName(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
}

function rawToSkill(raw: RawSkill): Skill {
    return {
        id: slugifySkillName(raw.name),
        name: raw.name,
        department: raw.department,
        category: raw.category,
        tags: raw.tags,
        description: raw.description,
        resources: raw.tools.map(toolStringToResource),
        flow: raw.flow,
        example_prompts: raw.example_prompts,
    }
}

const RAW_SKILLS: RawSkill[] = [
    {
        name: 'Debug a user complaint',
        department: 'Engineering',
        category: 'Investigate',
        tags: ['Engineering', 'Support', 'Product'],
        description:
            "Looks at a specific user's recent activity to figure out what went wrong, with emphasis on errors, warnings, and unexpected behavior in their session.",
        tools: ['Conversations', 'Session replay', 'Logs', 'Error tracking', 'Activity log', 'Profiles'],
        example_prompts: [
            'Debug what mary@acme.com is complaining about',
            "Why did this user's checkout fail yesterday?",
            "People with the new-ui flag say the modal won't open",
        ],
        flow: [
            'Search Conversations / Profiles for the user',
            'Pull recent session replays for that distinct_id',
            'Filter Logs to the session_id + timeframe',
            'Cross-reference Error tracking for matching exceptions',
            'Check Activity log for recent flag/config changes that could have affected them',
            'Summarize what broke and when',
        ],
    },
    {
        name: 'Triage an error spike',
        department: 'Engineering',
        category: 'Investigate',
        tags: ['Engineering', 'SRE'],
        description: 'Figures out scope, impact, and likely cause of a sudden increase in errors.',
        tools: ['Error tracking', 'Logs', 'Session replay', 'Feature flags', 'Activity log', 'Web analytics'],
        example_prompts: [
            "We're getting a spike in 500s — what's going on?",
            'Why is `TypeError: undefined is not a function` exploding right now?',
        ],
        flow: [
            'Pull the error from Error tracking + affected user count',
            'Check Activity log for recent deploys, flag flips, or config changes',
            'Sample session replays of impacted users',
            'Pull Logs around first occurrence',
            'Cross-reference Web analytics for traffic anomalies',
            'Suggest a rollback target via Feature flags',
        ],
    },
    {
        name: 'Root-cause a frontend bug',
        department: 'Engineering',
        category: 'Investigate',
        tags: ['Engineering'],
        description:
            'Connects a reported visual or interaction bug to the underlying error, stack trace, and reproducible session.',
        tools: ['Error tracking', 'Session replay', 'Logs', 'Heatmaps', 'Web analytics'],
        example_prompts: [
            "Find me a session where the submit button doesn't work",
            'Why is the chart blank for some users?',
        ],
        flow: [
            'Search Error tracking for related exceptions',
            'Pull session replays containing the error',
            'Tie console + network Logs to the failing session',
            'Check Heatmaps to see if users are rage-clicking the broken element',
            'Surface stack trace + repro link',
        ],
    },
    {
        name: 'Hunt a performance regression',
        department: 'Engineering',
        category: 'Investigate',
        tags: ['Engineering', 'Product'],
        description: "Identifies what shipped (or didn't) that made the app slower for users.",
        tools: ['Web analytics', 'Logs', 'Session replay', 'Error tracking', 'Activity log'],
        example_prompts: ['The app feels slow this week — what changed?', 'Why did page load time double on /pricing?'],
        flow: [
            'Pull p50/p95/p99 from Web analytics or custom event data',
            'Diff against last week',
            'Check Activity log for recent deploys + flag changes',
            'Pull representative session replays showing the slowdown',
            'Look at Logs for slow queries / failed requests',
        ],
    },
    {
        name: 'Roll out a feature safely',
        department: 'Engineering',
        category: 'Ship',
        tags: ['Engineering', 'Product'],
        description:
            'Stages a release by % of users, watches for errors and adoption, and recommends next step (expand, hold, roll back).',
        tools: ['Feature flags', 'Error tracking', 'Session replay', 'Product analytics', 'Workflows'],
        example_prompts: [
            'Roll out new-checkout to 10% and let me know if anything breaks',
            'Is it safe to ship dark mode to everyone?',
        ],
        flow: [
            'Set up Feature flag with rollout %',
            'Monitor Error tracking filtered to flag-enabled users',
            'Compare key event rates between cohorts in Product analytics',
            'Sample session replays from the test group',
            'Trigger a Workflow alert if error rate exceeds threshold',
            'Recommend next % or rollback',
        ],
    },
    {
        name: 'Roll back a bad release',
        department: 'Engineering',
        category: 'Ship',
        tags: ['Engineering'],
        description: 'Reverses the most recent change that introduced an error or regression.',
        tools: ['Activity log', 'Feature flags', 'Error tracking', 'Logs'],
        example_prompts: ['Roll back whatever broke checkout', 'Disable any flags that turned on in the last hour'],
        flow: [
            'Pull recent flag changes from Activity log',
            'Correlate with first occurrence of error in Error tracking',
            'Disable the offending flag',
            'Verify error rate drops via Logs + Error tracking',
            'Post a summary to the team',
        ],
    },
    {
        name: 'Audit what changed (and who changed it)',
        department: 'Engineering',
        category: 'Ship',
        tags: ['Engineering', 'Compliance'],
        description: 'Surfaces every config, flag, experiment, or dashboard change in a given window.',
        tools: ['Activity log', 'Feature flags', 'Experiments', 'Dashboards'],
        example_prompts: ['What got shipped this week?', 'Who turned off the welcome-email flag?'],
        flow: [
            'Query Activity log filtered to scope + window',
            'Group changes by user / object type',
            'Link out to each affected resource',
        ],
    },
    {
        name: 'Find where users drop off',
        department: 'Product',
        category: 'Discover',
        tags: ['Product', 'Growth', 'Design'],
        description: 'Identifies the highest-leverage step in a flow to fix, with evidence for why people leave.',
        tools: ['Funnels', 'Session replay', 'Heatmaps', 'Surveys', 'User paths'],
        example_prompts: ['Where are users falling out of onboarding?', "Why isn't anyone finishing the signup flow?"],
        flow: [
            'Build a Funnel for the flow',
            'Identify the biggest drop-off step',
            'Pull session replays of users who dropped at that step',
            'Check Heatmaps for the failing page',
            'Look at Survey responses tagged to that step',
            'Show User paths of users who exit the flow',
        ],
    },
    {
        name: 'Discover unexpected behavior',
        department: 'Product',
        category: 'Discover',
        tags: ['Product', 'Design'],
        description:
            "Finds patterns of usage you didn't design for — power-user workarounds, dead ends, surprise journeys.",
        tools: ['User paths', 'Session replay', 'Heatmaps', 'Product analytics'],
        example_prompts: [
            'What do users do right after creating a project?',
            "Are people using this feature in a way we didn't expect?",
        ],
        flow: [
            'Pull User paths from a chosen anchor event',
            'Surface unexpected sequences',
            'Pull session replays for those journeys',
            'Cross-reference Heatmaps on related pages',
        ],
    },
    {
        name: 'Identify power users (and what they do)',
        department: 'Product',
        category: 'Discover',
        tags: ['Product', 'Growth'],
        description: 'Defines and inspects the behavior of your most engaged users.',
        tools: ['Cohorts', 'Product analytics', 'Profiles', 'Stickiness', 'Session replay'],
        example_prompts: [
            'Who are our power users and what do they all do?',
            'Find users who use the feature daily — what do they have in common?',
        ],
        flow: [
            'Define a Cohort based on activity threshold',
            'Pull Stickiness + retention curves',
            'Compare event mix vs. average users in Product analytics',
            'Inspect a few Profiles + session replays',
        ],
    },
    {
        name: 'Validate a new feature is being adopted',
        department: 'Product',
        category: 'Validate',
        tags: ['Product'],
        description: 'Measures whether people who can see a feature actually use it — and use it more than once.',
        tools: ['Product analytics', 'Cohorts', 'Feature flags', 'Lifecycle', 'Session replay'],
        example_prompts: [
            'Is anyone actually using the new export button?',
            'Did adoption of templates pick up after we launched it?',
        ],
        flow: [
            'Query event volume by Feature flag cohort',
            'Build a Lifecycle chart (new vs. returning)',
            'Compare retention against control',
            'Sample session replays of first-time users',
        ],
    },
    {
        name: 'Set up tracking for a new feature',
        department: 'Product',
        category: 'Validate',
        tags: ['Product', 'Engineering'],
        description: "Designs the event schema + dashboards for measuring something you're about to ship.",
        tools: ['Event tracking', 'Actions', 'Insights', 'Dashboards'],
        example_prompts: [
            'Set up tracking for the new bulk-edit feature',
            'What events should we add for the new pricing page?',
        ],
        flow: [
            'Suggest events + properties based on the feature',
            'Create the Actions',
            'Build core Insights (usage, funnel, adoption)',
            'Assemble them in a Dashboard linked to the launch',
        ],
    },
    {
        name: 'Build a launch dashboard',
        department: 'Product',
        category: 'Measure',
        tags: ['Product', 'Leadership'],
        description: 'Assembles a single view tracking adoption, retention, and revenue impact of a release.',
        tools: ['Dashboards', 'Product analytics', 'Funnels', 'Revenue tracking', 'Feature flags'],
        example_prompts: ['Build me a dashboard for the new pricing launch', 'Track everything about the v2 rollout'],
        flow: [
            'Identify launch events',
            'Build adoption + retention insights',
            'Add Revenue tracking comparison pre/post launch',
            'Add Feature flag cohort comparison',
            'Save as Dashboard and pin',
        ],
    },
    {
        name: 'Improve activation rate',
        department: 'Growth',
        category: 'Improve',
        tags: ['Growth', 'Product'],
        description: "Diagnoses what's blocking new users from reaching their first value moment, then tests fixes.",
        tools: ['Funnels', 'Experiments', 'Session replay', 'Feature flags', 'Cohorts', 'Surveys'],
        example_prompts: [
            'Activation rate dropped — why and how do we fix it?',
            'Find the biggest activation blocker and run a test on it',
        ],
        flow: [
            'Build the activation Funnel',
            'Find biggest drop-off step',
            'Pull session replays + Survey responses at that step',
            'Propose a fix',
            'Wire an Experiment behind a Feature flag',
            'Compare cohorts and decide',
        ],
    },
    {
        name: 'Predict and prevent churn',
        department: 'Growth',
        category: 'Improve',
        tags: ['Growth', 'Product', 'Support'],
        description: 'Identifies users at risk of churning based on behavior change, and triggers outreach.',
        tools: ['Lifecycle', 'Cohorts', 'Workflows', 'Surveys', 'Session replay'],
        example_prompts: [
            "Who's about to churn this month?",
            "Send a re-engagement email to anyone who hasn't logged in in 14 days",
        ],
        flow: [
            'Define an at-risk Cohort via Lifecycle (declining users)',
            'Pull representative session replays / Surveys for context',
            'Set up a Workflow to trigger outreach',
            'Measure impact on retention',
        ],
    },
    {
        name: 'Re-engage dormant users',
        department: 'Growth',
        category: 'Improve',
        tags: ['Growth', 'Marketing'],
        description: "Pulls a list of users who've gone quiet and routes them to a re-engagement campaign.",
        tools: ['Cohorts', 'Workflows', 'CDP', 'Email destinations', 'SMS destinations'],
        example_prompts: [
            "Email everyone who hasn't logged in in 30 days",
            'Send Slack DMs to teams whose usage dropped this week',
        ],
        flow: [
            'Build the dormant Cohort',
            'Sync to destination via Workflow / CDP / Reverse ETL',
            'Track open + return-to-app via events',
            'Measure reactivation rate',
        ],
    },
    {
        name: 'Run a pricing experiment',
        department: 'Growth',
        category: 'Test',
        tags: ['Growth', 'Product', 'Finance'],
        description: 'Tests a new price or packaging on a segment and measures revenue impact end-to-end.',
        tools: ['Experiments', 'Revenue tracking', 'Funnels', 'Cohorts', 'Feature flags'],
        example_prompts: [
            'Test a 20% price increase on US customers',
            'Try a new pricing page and see if conversion holds',
        ],
        flow: [
            'Set up Feature flag for the pricing variant',
            'Configure Experiment with revenue + conversion as primary metrics',
            'Pull Funnel comparison between variants',
            'Read Revenue tracking impact',
            'Recommend ship / kill',
        ],
    },
    {
        name: 'Optimize a landing page',
        department: 'Growth',
        category: 'Test',
        tags: ['Growth', 'Marketing', 'Design'],
        description: 'Finds why a page underperforms and tests changes to improve it.',
        tools: ['Web analytics', 'Heatmaps', 'Session replay', 'Experiments'],
        example_prompts: ["/pricing isn't converting — what's wrong?", 'Test a new hero on the homepage'],
        flow: [
            'Pull Web analytics for the page (conversion, bounce, scroll)',
            'Inspect Heatmaps + scroll depth',
            'Watch a handful of session replays',
            'Propose a change + set up an Experiment',
        ],
    },
    {
        name: 'Track campaign performance end-to-end',
        department: 'Marketing',
        category: 'Track',
        tags: ['Marketing', 'Growth'],
        description: 'Connects ad spend / UTM source all the way through to revenue.',
        tools: ['Web analytics', 'Revenue tracking', 'Funnels', 'Cohorts', 'Dashboards'],
        example_prompts: [
            'How is the Q3 LinkedIn campaign performing?',
            'Which channels actually drive paid conversions?',
        ],
        flow: [
            'Filter Web analytics by UTM',
            'Build conversion Funnel for that source',
            'Pull Revenue tracking by Cohort',
            'Surface CAC / payback in a Dashboard',
        ],
    },
    {
        name: "Measure content's impact on signups",
        department: 'Marketing',
        category: 'Track',
        tags: ['Marketing', 'Content'],
        description: 'Ties blog / docs / video views to downstream signups, conversions, and retention.',
        tools: ['Web analytics', 'Funnels', 'Cohorts', 'Dashboards'],
        example_prompts: ['Which blog posts drive the most signups?', "Did last month's launch post move the needle?"],
        flow: [
            'Group page views by content URL in Web analytics',
            'Build a content-to-signup Funnel',
            'Compare retention of Cohorts by entry post',
            'Surface top + bottom performers',
        ],
    },
    {
        name: 'Investigate a customer ticket',
        department: 'Support',
        category: 'Investigate',
        tags: ['Support', 'Engineering', 'Product'],
        description:
            'Pulls together everything you need to respond to a ticket without asking the customer for more info.',
        tools: ['Conversations', 'Session replay', 'Logs', 'Error tracking', 'Activity log', 'Profiles'],
        example_prompts: ['What happened in this ticket?', 'Did the user actually try X like they said?'],
        flow: [
            'Open the ticket in Conversations',
            'Look up the Profile + recent activity',
            'Pull session replays from the relevant window',
            'Filter Logs to that session',
            'Check Error tracking for matching issues',
            'Draft a reply with evidence',
        ],
    },
    {
        name: 'Find every user impacted by a bug',
        department: 'Support',
        category: 'Investigate',
        tags: ['Support', 'Engineering'],
        description: 'Builds a list of every user who hit a specific error so you can reach out proactively.',
        tools: ['Error tracking', 'Cohorts', 'CDP', 'Workflows', 'Profiles'],
        example_prompts: [
            'Who else hit the same error as this ticket?',
            'List all users affected by the export bug last Tuesday',
        ],
        flow: [
            'Identify the Error tracking issue',
            'Pull affected user list into a Cohort',
            'Enrich with Profiles',
            'Trigger a Workflow to notify or apologize',
        ],
    },
    {
        name: 'Proactively reach affected users',
        department: 'Support',
        category: 'Outreach',
        tags: ['Support', 'Growth'],
        description: 'Sends a tailored message to users in a defined situation (bug victims, trial expiring, etc.).',
        tools: ['Cohorts', 'Workflows', 'CDP', 'Conversations', 'Email destinations'],
        example_prompts: [
            'Email everyone affected by the outage with a credit',
            "Send a check-in to anyone who opened a ticket but didn't reply",
        ],
        flow: [
            'Define the Cohort',
            'Compose the message',
            'Send via Workflow / Conversations / destination',
            'Track replies + sentiment',
        ],
    },
    {
        name: 'Find recurring complaints',
        department: 'Support',
        category: 'Patterns',
        tags: ['Support', 'Product'],
        description: "Clusters tickets + survey responses to find what's painful at scale, not just for one user.",
        tools: ['Conversations', 'Surveys', 'Session replay', 'Product analytics'],
        example_prompts: [
            'What are people complaining about this month?',
            "What's the most common feature request from churned users?",
        ],
        flow: [
            'Cluster Conversations by topic',
            'Cross-reference Survey responses',
            'Pull session replays of complaining users',
            'Surface top themes with example tickets',
        ],
    },
    {
        name: 'Join CRM data with product behavior',
        department: 'Data',
        category: 'Model',
        tags: ['Data', 'Growth', 'RevOps'],
        description:
            'Brings Salesforce / Stripe / HubSpot data into the same place as product events so you can query across both.',
        tools: ['Sources & ELT', 'Warehouse', 'Data modeling', 'SQL editor'],
        example_prompts: ['Join Stripe MRR with feature usage', 'Set up a Salesforce sync'],
        flow: [
            'Configure source via Sources & ELT',
            'Land in Warehouse',
            'Model joins in Data modeling',
            'Query result via SQL editor',
        ],
    },
    {
        name: 'Sync segmented users to external tools',
        department: 'Data',
        category: 'Model',
        tags: ['Data', 'Growth', 'Marketing'],
        description: 'Pushes a PostHog-defined Cohort out to ad networks, CRMs, or email tools.',
        tools: ['Cohorts', 'Reverse ETL', 'CDP', 'Warehouse'],
        example_prompts: [
            'Sync power users to our HubSpot list',
            'Push churned users to Facebook for a winback campaign',
        ],
        flow: ['Define Cohort', 'Configure Reverse ETL destination', 'Schedule sync', 'Verify count in destination'],
    },
    {
        name: 'Build a true customer LTV report',
        department: 'Data',
        category: 'Report',
        tags: ['Data', 'Finance', 'Growth'],
        description: 'Calculates LTV by segment using both billing data and product behavior.',
        tools: ['Revenue tracking', 'Warehouse', 'SQL editor', 'Cohorts', 'Dashboards'],
        example_prompts: [
            "What's LTV by acquisition channel?",
            'How does LTV differ between self-serve and sales-led?',
        ],
        flow: [
            'Pull billing data via Revenue tracking + Warehouse',
            'Define Cohorts by channel / segment',
            'Write LTV query in SQL editor',
            'Pin to a Dashboard',
        ],
    },
    {
        name: 'Build a custom KPI dashboard',
        department: 'Data',
        category: 'Report',
        tags: ['Data', 'Leadership'],
        description: 'Assembles a high-trust source of truth for a metric your team cares about.',
        tools: ['SQL editor', 'Dashboards', 'Data modeling', 'Notebooks'],
        example_prompts: ['Build a dashboard tracking weekly active teams + ARR', 'Make me a north-star metric view'],
        flow: [
            'Define metric in SQL editor / Data modeling',
            'Build supporting Insights',
            'Compose Dashboard',
            'Write context in a Notebook',
        ],
    },
    {
        name: 'Debug a misbehaving AI agent',
        department: 'AI / LLM Ops',
        category: 'Debug',
        tags: ['AI Engineering', 'Product'],
        description:
            'Investigates a specific bad output — finds the trace, the inputs, the system prompt, and what went wrong.',
        tools: ['LLM Traces', 'Generations', 'Evals', 'Error tracking', 'Session replay'],
        example_prompts: ['Why did the agent recommend the wrong product to this user?', 'Trace this hallucination'],
        flow: [
            'Find the Trace from session_id or user',
            'Walk through Generations step-by-step',
            'Check Evals for any flags',
            'Cross-reference Error tracking for tool-call failures',
            'Pull the session replay for surrounding context',
        ],
    },
    {
        name: 'Catch hallucinations in production',
        department: 'AI / LLM Ops',
        category: 'Evaluate',
        tags: ['AI Engineering'],
        description: 'Runs evaluators against live traffic and alerts when quality drops.',
        tools: ['Evals', 'LLM Traces', 'Workflows', 'Error tracking'],
        example_prompts: [
            'Are we hallucinating more this week than last week?',
            'Set up an alert if response quality drops',
        ],
        flow: [
            'Configure Evals on Generations',
            'Build Workflow to alert on score threshold',
            'Group failing Traces for review',
            'Surface in Error tracking',
        ],
    },
    {
        name: 'Monitor LLM cost and quality',
        department: 'AI / LLM Ops',
        category: 'Monitor',
        tags: ['AI Engineering', 'Finance'],
        description: 'Tracks token spend, latency, and quality scores together.',
        tools: ['LLM Traces', 'Evals', 'Dashboards', 'Revenue tracking'],
        example_prompts: ['How much are we spending on Claude this month?', 'Cost per successful agent run'],
        flow: [
            'Aggregate Traces by model + customer',
            'Pull Evals scores',
            'Tie to Revenue tracking per customer',
            'Render in a Dashboard',
        ],
    },
    {
        name: 'Build an exec metrics dashboard',
        department: 'Leadership',
        category: 'Report',
        tags: ['Leadership', 'Finance', 'Data'],
        description: 'Assembles the metrics a CEO / board actually wants to see in one view.',
        tools: ['Dashboards', 'Revenue tracking', 'Web analytics', 'Product analytics', 'SQL editor'],
        example_prompts: ['Build me an exec dashboard', 'What does the board need to see this quarter?'],
        flow: [
            'Define top-level metrics (ARR, NRR, WAU, etc.)',
            'Build Insights from Revenue tracking + Product analytics + Web analytics',
            'Add custom SQL where needed',
            'Compose Dashboard + share',
        ],
    },
    {
        name: 'Run a weekly metrics review',
        department: 'Leadership',
        category: 'Report',
        tags: ['Leadership', 'Product'],
        description: 'Auto-generates a weekly write-up of what moved, why, and what to do about it.',
        tools: ['Dashboards', 'Notebooks', 'Subscriptions', 'Revenue tracking'],
        example_prompts: [
            "Write up this week's metrics review",
            'What changed vs. last week and what should I worry about?',
        ],
        flow: [
            'Pull all flagged Dashboard changes vs. last week',
            'Identify biggest movers',
            'Cross-reference Activity log + Experiments for likely causes',
            'Draft narrative in a Notebook',
            'Schedule via Subscriptions',
        ],
    },
]

export const skills: Skill[] = RAW_SKILLS.map(rawToSkill)

export function useSkills(): Skill[] {
    return useMemo(() => skills, [])
}

export type OutcomeTreeNode = {
    type: 'department' | 'category' | 'skill'
    id: string
    name: string
    skill?: Skill
    children?: OutcomeTreeNode[]
}

export function buildOutcomeTree(skillList: Skill[]): OutcomeTreeNode[] {
    const departments = new Map<string, Map<string, Skill[]>>()

    for (const skill of skillList) {
        if (!departments.has(skill.department)) {
            departments.set(skill.department, new Map())
        }
        const categories = departments.get(skill.department)!
        if (!categories.has(skill.category)) {
            categories.set(skill.category, [])
        }
        categories.get(skill.category)!.push(skill)
    }

    return Array.from(departments.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([department, categories]) => ({
            type: 'department' as const,
            id: slugifySkillName(department),
            name: department,
            children: Array.from(categories.entries())
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([category, categorySkills]) => ({
                    type: 'category' as const,
                    id: `${slugifySkillName(department)}--${slugifySkillName(category)}`,
                    name: category,
                    children: categorySkills
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((s) => ({
                            type: 'skill' as const,
                            id: s.id,
                            name: s.name,
                            skill: s,
                        })),
                })),
        }))
}

export type ProductTreeEntry = {
    handle: string
    name: string
    skills: Skill[]
}

export function buildProductTree(skillList: Skill[]): ProductTreeEntry[] {
    const byHandle = new Map<string, Skill[]>()

    for (const skill of skillList) {
        for (const ref of skill.resources) {
            const existing = byHandle.get(ref.handle) || []
            if (!existing.some((s) => s.id === skill.id)) {
                existing.push(skill)
            }
            byHandle.set(ref.handle, existing)
        }
    }

    return Array.from(byHandle.entries())
        .map(([handle, productSkills]) => ({
            handle,
            name: productSkills[0].resources.find((r) => r.handle === handle)?.label || handle,
            skills: productSkills.sort((a, b) => a.name.localeCompare(b.name)),
        }))
        .sort((a, b) => a.name.localeCompare(b.name))
}

export function getRelatedSkills(skill: Skill, allSkills: Skill[], limit = 6): Skill[] {
    const handles = new Set(skill.resources.map((r) => r.handle))
    const scored = allSkills
        .filter((s) => s.id !== skill.id)
        .map((s) => {
            const overlap = s.resources.filter((r) => handles.has(r.handle)).length
            const sameCategory = s.category === skill.category ? 1 : 0
            return { skill: s, score: overlap * 2 + sameCategory }
        })
        .filter((x) => x.score > 0)
        .sort((a, b) => b.score - a.score)

    return scored.slice(0, limit).map((x) => x.skill)
}

export function useResolveSkillResources(refs: SkillResourceRef[]): ResolvedResource[] {
    const allProducts = useProduct() as Array<{
        handle: string
        name: string
        Icon?: React.ComponentType<{ className?: string }>
        color?: string
        slug?: string
    }>

    return useMemo(() => {
        return refs.map((ref) => {
            const resolved = resolveSkillResource(ref, allProducts)
            return resolved ?? fallbackResolvedResource(ref)
        })
    }, [refs, allProducts])
}

export function useAllProductResources(): ResolvedResource[] {
    const allProducts = useProduct() as Array<{
        handle: string
        name: string
        Icon?: React.ComponentType<{ className?: string }>
        color?: string
        slug?: string
    }>

    return useMemo(() => {
        const handles = new Set<string>()
        for (const skill of skills) {
            for (const ref of skill.resources) {
                handles.add(ref.handle)
            }
        }
        return Array.from(handles)
            .map((handle) => {
                const ref = { handle }
                return resolveSkillResource(ref, allProducts) ?? fallbackResolvedResource(ref)
            })
            .sort((a, b) => a.name.localeCompare(b.name))
    }, [allProducts])
}

/** For Fuse search — flatten skill + resolved resource names */
export function skillSearchBlob(skill: Skill, allProducts: Parameters<typeof resolveSkillResource>[1]): string {
    const resolved = resolveSkillResources(skill.resources, allProducts)
    const resourceNames = resolved.map((r) => r.name).join(' ')
    return [
        skill.name,
        skill.description,
        skill.department,
        skill.category,
        skill.tags.join(' '),
        resourceNames,
        skill.resources.map((r) => r.handle).join(' '),
        skill.example_prompts.join(' '),
        skill.flow.join(' '),
    ].join(' ')
}
