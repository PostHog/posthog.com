import React from 'react'
import Link from 'components/Link'
import { CallToAction } from 'components/CallToAction'
import SEO from 'components/seo'
import ReaderView from 'components/ReaderView'
import { TreeMenu } from 'components/TreeMenu'
import { RoughAnnotation } from 'components/Code/RoughAnnotation'
import { customerDataInfrastructureNav } from '../../hooks/useCustomerDataInfrastructureNavigation'
import { WINDOW_BG } from '../../constants/frostedSurfaces'
import { IconTrending, IconWarning, IconTarget, IconDatabase } from '@posthog/icons'
import { HedgehogChartHog, HedgehogDocBrown } from '@posthog/brand/hoggies'

type IconComponent = React.ComponentType<{ className?: string }>

// Matches the `highlight` colour token; RoughAnnotation draws its own stroke, so it needs
// a raw colour rather than a class.
const HIGHLIGHT_COLOR = 'rgba(235, 157, 42, 0.2)'

const Highlight = ({ children }: { children: React.ReactNode }) => (
    <RoughAnnotation type="highlight" color={HIGHLIGHT_COLOR} strokeWidth={1} padding={2} delay={300} multiline>
        <span className="font-bold text-red dark:text-yellow">{children}</span>
    </RoughAnnotation>
)

type ChipKind = 'ph' | 'ext'

interface Ingredient {
    label: string
    kind: ChipKind
}

interface Recipe {
    question: string
    ingredients: Ingredient[]
    uncover: React.ReactNode
}

interface Section {
    title: string
    subtitle: React.ReactNode
    Icon: IconComponent
    iconColor: string
    recipes: Recipe[]
}

const sections: Section[] = [
    {
        title: 'Turn product usage into revenue',
        subtitle: (
            <>
                Connect what people <em>do</em> to what they <em>pay</em>.
            </>
        ),
        Icon: IconTrending,
        iconColor: 'text-green',
        recipes: [
            {
                question: 'Which features drive revenue?',
                ingredients: [
                    { label: 'PostHog events', kind: 'ph' },
                    { label: 'Stripe', kind: 'ext' },
                ],
                uncover: (
                    <>
                        With a <strong>revenue-weighted feature ranking</strong>, PostHog nudges accounts toward your
                        highest-revenue features automatically. Activation improves while you sleep.
                    </>
                ),
            },
            {
                question: 'Which onboarding steps turn trials into paying customers?',
                ingredients: [
                    { label: 'PostHog funnels', kind: 'ph' },
                    { label: 'Stripe', kind: 'ext' },
                ],
                uncover: (
                    <>
                        With the <strong>steps that predict conversion</strong>, PostHog nudges stalled users forward
                        automatically. Turning more trials into customers.
                    </>
                ),
            },
            {
                question: 'Which accounts are ready to upsell?',
                ingredients: [
                    { label: 'PostHog usage', kind: 'ph' },
                    { label: 'Stripe plans', kind: 'ext' },
                ],
                uncover: (
                    <>
                        With a live list of <strong>accounts outgrowing their plan</strong>, PostHog triggers upgrade
                        prompts and outreach automatically. Growing revenue without the dashboard-watching.
                    </>
                ),
            },
        ],
    },
    {
        title: 'See churn coming',
        subtitle: 'Catch the warning signs weeks before the cancellation lands.',
        Icon: IconWarning,
        iconColor: 'text-red',
        recipes: [
            {
                question: 'What do customers do right before they cancel?',
                ingredients: [
                    { label: 'PostHog events', kind: 'ph' },
                    { label: 'Stripe / Chargebee', kind: 'ext' },
                ],
                uncover: (
                    <>
                        With an <strong>early-warning signal for churn</strong>, PostHog triggers save flows before
                        at-risk accounts leave. Cutting churn while you sleep.
                    </>
                ),
            },
            {
                question: 'Do support tickets predict churn?',
                ingredients: [
                    { label: 'PostHog usage', kind: 'ph' },
                    { label: 'Zendesk / Intercom', kind: 'ext' },
                ],
                uncover: (
                    <>
                        With issues ranked by <strong>the revenue they cost you</strong>, PostHog triggers proactive
                        outreach to fix the worst friction. Protecting revenue automatically.
                    </>
                ),
            },
            {
                question: 'Are our biggest accounts our happiest ones?',
                ingredients: [
                    { label: 'PostHog groups', kind: 'ph' },
                    { label: 'Salesforce / HubSpot', kind: 'ext' },
                ],
                uncover: (
                    <>
                        With <strong>ARR mapped against real engagement</strong>, PostHog flags at-risk revenue and
                        expansion targets. Protecting your biggest accounts before they wobble.
                    </>
                ),
            },
        ],
    },
    {
        title: 'Spend smarter on growth',
        subtitle: 'Point marketing and sales at the customers who stick around.',
        Icon: IconTarget,
        iconColor: 'text-blue',
        recipes: [
            {
                question: 'Which channels bring customers who stick?',
                ingredients: [
                    { label: 'PostHog acquisition', kind: 'ph' },
                    { label: 'Stripe', kind: 'ext' },
                    { label: 'Google / Meta Ads', kind: 'ext' },
                ],
                uncover: (
                    <>
                        With channels ranked by <strong>retained revenue</strong>, PostHog shifts budget toward the ones
                        that bring customers who last. Spending smarter, no guesswork.
                    </>
                ),
            },
            {
                question: "Which leads deserve the sales team's time?",
                ingredients: [
                    { label: 'PostHog usage', kind: 'ph' },
                    { label: 'HubSpot / Salesforce', kind: 'ext' },
                ],
                uncover: (
                    <>
                        With leads scored by <strong>real product usage</strong>, PostHog alerts sales the moment one
                        heats up. Filling the pipeline while you sleep.
                    </>
                ),
            },
            {
                question: 'Did the feature we shipped move revenue?',
                ingredients: [
                    { label: 'PostHog experiments', kind: 'ph' },
                    { label: 'Stripe', kind: 'ext' },
                ],
                uncover: (
                    <>
                        With revenue <strong>tied to each rollout</strong>, PostHog ramps the winners and rolls back the
                        rest automatically. Shipping what moves money, hands-off.
                    </>
                ),
            },
        ],
    },
]

const Mono = ({ children }: { children: React.ReactNode }) => (
    <span className="font-code text-[0.9em] text-primary">{children}</span>
)

interface ModelingSkill {
    name: string
    builds: React.ReactNode
    rule: React.ReactNode
}

// The "start here" skill every other modeling skill tells you to read first, so it gets
// its own full-width card above the grid rather than competing with the domain skills.
const foundationsSkill: ModelingSkill = {
    name: 'modeling-warehouse-foundations',
    builds: (
        <>
            The groundwork for everything else: PostHog views or dbt, the <Mono>view-create</Mono> to{' '}
            <Mono>view-materialize</Mono> workflow, warehouse joins, currency conversion, and registering a model in the
            data catalog so nobody builds a rival copy.
        </>
    ),
    rule: 'Decide person vs. group once. That choice is load-bearing across every model you build after it.',
}

const modelingSkills: ModelingSkill[] = [
    {
        name: 'modeling-revenue-metrics',
        builds: 'MRR, ARR, expansion and contraction, ARPU, LTV, and revenue per account.',
        rule: 'MRR right now and MRR over time are two different models. A live snapshot never turns into a trend, so know which one you need before you build it.',
    },
    {
        name: 'modeling-conversion-metrics',
        builds: 'Funnel and step conversion rates, drop-off, and time-to-convert.',
        rule: 'A conversion rate means nothing until you pin the time box. Signup to paid within 30 minutes and within 30 days are different metrics, not the same one measured loosely.',
    },
    {
        name: 'modeling-activation-metrics',
        builds: 'An activated flag per user or account, plus an activation rate.',
        rule: "Activation is not an event you declare. It's the early behavior that predicts whether people stick around, so test it against retention lift. If it doesn't lift, it isn't activation.",
    },
    {
        name: 'modeling-product-usage-metrics',
        builds: 'Retention, stickiness, and lifecycle models.',
        rule: (
            <>
                Retention of <Mono>$pageview</Mono> and retention of your core action tell very different stories. Model
                the one that means "got value".
            </>
        ),
    },
    {
        name: 'modeling-dimension-tables',
        builds: (
            <>
                <Mono>dim_country</Mono>, <Mono>dim_plan</Mono>, <Mono>dim_date</Mono>, and the other lookup tables
                every model joins to.
            </>
        ),
        rule: (
            <>
                One row per entity, or a duplicate key silently fans out every fact it touches. And don't hand-roll
                currency, <Mono>convertCurrency()</Mono> already ships with PostHog.
            </>
        ),
    },
]

const LeftSidebarContent = () => {
    return <TreeMenu items={customerDataInfrastructureNav.children} />
}

function Chip({ label, kind }: Ingredient) {
    const styles =
        kind === 'ph'
            ? 'bg-red/10 text-red border-red/20 dark:bg-yellow/10 dark:text-yellow dark:border-yellow/20'
            : 'bg-blue/10 text-blue border-blue/20'
    return (
        <span
            className={`inline-flex items-center gap-1.5 text-[12.5px] font-semibold px-2.5 py-1 rounded border ${styles}`}
        >
            <span className="size-2 rounded-full bg-current opacity-80" />
            {label}
        </span>
    )
}

function RecipeCard({ recipe }: { recipe: Recipe }) {
    return (
        <div className="flex h-full flex-col bg-primary border border-primary border-b-4 rounded p-5 transition-all hover:-translate-y-0.5 hover:border-b-red">
            <p className="text-[17px] font-bold leading-tight mb-4 m-0">{recipe.question}</p>
            <div className="flex flex-wrap items-center gap-1.5 mb-4">
                {recipe.ingredients.map((ing, i) => (
                    <React.Fragment key={i}>
                        {i > 0 && <span className="font-bold text-muted text-sm">+</span>}
                        <Chip {...ing} />
                    </React.Fragment>
                ))}
            </div>
            <div className="border-t border-primary my-2" />
            <p className="text-[11px] font-bold uppercase tracking-wide text-green mt-2 mb-1">
                Self-driving development
            </p>
            <p className="text-[14.5px] text-secondary m-0">{recipe.uncover}</p>
            <div className="mt-auto pt-4">
                <CallToAction to="/tutorials" type="secondary" size="sm" width="full">
                    Go to tutorial
                </CallToAction>
            </div>
        </div>
    )
}

function SkillCard({ skill }: { skill: ModelingSkill }) {
    return (
        <div className="flex h-full flex-col bg-primary border border-primary border-b-4 rounded p-5 transition-all hover:-translate-y-0.5 hover:border-b-red">
            <p className="font-code text-[13.5px] font-bold leading-tight m-0 mb-3 break-words text-red dark:text-yellow">
                {skill.name}
            </p>
            <p className="text-[14.5px] text-secondary m-0">{skill.builds}</p>
            <div className="border-t border-primary mt-4 mb-2" />
            <p className="text-[11px] font-bold uppercase tracking-wide text-green mt-2 mb-1">The rule it enforces</p>
            <p className="text-[14.5px] text-secondary m-0">{skill.rule}</p>
        </div>
    )
}

function UseCases(): JSX.Element {
    return (
        <>
            <SEO
                title="Use cases - Context Warehouse"
                description="Questions worth asking when you combine PostHog data with your business data."
            />
            <ReaderView leftSidebar={<LeftSidebarContent />} title="use-cases.md" hideTitle={true}>
                <div className="not-prose mt-2 @xl:mt-4 pb-2">
                    <div className="grid items-start gap-6 @lg/reader-content:grid-cols-[1fr_280px]">
                        <div>
                            <div className="prose">
                                <h1 className="!m-0 text-3xl font-bold !leading-[1.12] tracking-tight @md/reader-content:text-4xl @3xl/reader-content:text-5xl">
                                    <Highlight>Data questions</Highlight> worth asking
                                </h1>
                                <p className="!mb-0 !mt-5 max-w-lg text-base leading-relaxed text-secondary @xl/reader-content:text-[17px]">
                                    Your warehouse already holds all your PostHog data. Add an external source or two
                                    and you can answer questions neither could answer alone.{' '}
                                    <strong className="text-primary">PostHog events</strong> plus{' '}
                                    <strong className="text-primary">your business data</strong> are the answers you've
                                    been looking for.
                                </p>
                            </div>

                            <div className="mt-6 w-fit">
                                <CallToAction to="/tutorials" size="md">
                                    See all templates
                                </CallToAction>
                            </div>
                        </div>
                        <div className="hidden justify-center @lg/reader-content:flex">
                            <HedgehogChartHog size={280} className="w-full max-w-[280px]" />
                        </div>
                    </div>
                </div>

                {sections.map((section, si) => (
                    <div key={si} className="mt-12 not-prose">
                        <div className="mb-5">
                            <h2 className="flex items-center gap-2 m-0 text-2xl font-bold @md/reader-content:text-3xl">
                                <section.Icon
                                    className={`size-5 shrink-0 @md/reader-content:size-6 ${section.iconColor}`}
                                />
                                {section.title}
                            </h2>
                            <p className="text-[15px] text-secondary mt-1 mb-0">{section.subtitle}</p>
                        </div>
                        <div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-3 gap-4">
                            {section.recipes.map((recipe, ri) => (
                                <RecipeCard key={ri} recipe={recipe} />
                            ))}
                        </div>
                    </div>
                ))}

                <div className="mt-14 not-prose">
                    <div className="mb-5">
                        <h2 className="flex items-center gap-2 m-0 text-2xl font-bold @md/reader-content:text-3xl">
                            <IconDatabase className="size-5 shrink-0 @md/reader-content:size-6 text-purple" />
                            From a one-off answer to a model that lasts
                        </h2>
                        <p className="text-[15px] text-secondary mt-1 mb-0">
                            A query answers the question today. A model answers it every day, with one definition reused
                            by every insight, dashboard, and query downstream. These six Skills teach your coding agent
                            how to build them, and each one carries an opinion about how to get it right.
                        </p>
                    </div>

                    <div className="mb-4">
                        <div className="bg-accent border border-primary border-b-4 rounded p-5">
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                                <span className="font-code text-[13.5px] font-bold leading-tight break-words text-red dark:text-yellow">
                                    {foundationsSkill.name}
                                </span>
                                <span className="text-[11px] font-bold uppercase tracking-wide text-green">
                                    Start here
                                </span>
                            </div>
                            <p className="text-[14.5px] text-secondary m-0">{foundationsSkill.builds}</p>
                            <div className="border-t border-primary mt-4 mb-2" />
                            <p className="text-[11px] font-bold uppercase tracking-wide text-green mt-2 mb-1">
                                The rule it enforces
                            </p>
                            <p className="text-[14.5px] text-secondary m-0">{foundationsSkill.rule}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-3 gap-4">
                        {modelingSkills.map((skill) => (
                            <SkillCard key={skill.name} skill={skill} />
                        ))}
                    </div>

                    <p className="text-[14.5px] text-secondary mt-5 mb-0">
                        Install the{' '}
                        <Link to="/docs/model-context-protocol/claude-code" className="font-semibold">
                            PostHog AI plugin
                        </Link>{' '}
                        in your coding agent, or open{' '}
                        <Link to="/docs/posthog-desktop/skills" className="font-semibold">
                            PostHog Desktop
                        </Link>
                        , then ask for the model you want. More on{' '}
                        <Link to="/docs/data-warehouse/views" className="font-semibold">
                            views
                        </Link>{' '}
                        and{' '}
                        <Link to="/context-warehouse/data-modeling" className="font-semibold">
                            data modeling
                        </Link>
                        .
                    </p>
                </div>

                <div
                    className={`not-prose relative mt-14 overflow-hidden rounded-md border border-primary p-4 @md/reader-content:p-6 ${WINDOW_BG}`}
                >
                    <div className="grid items-center gap-6 @lg/reader-content:grid-cols-[1fr_190px]">
                        <div>
                            <h3 className="mt-0 mb-3 text-2xl font-bold">Got a different question?</h3>
                            <p className="mt-0 mb-4 text-secondary">
                                With <strong className="text-primary">800+ warehouse sources</strong> including
                                payments, CRMs, support desks, ad platforms, your production database, the questions you
                                can ask are endless.{' '}
                                <Link
                                    to="/docs/data-warehouse/sources"
                                    state={{ newWindow: true }}
                                    className="font-semibold"
                                >
                                    See every source →
                                </Link>
                            </p>
                            <div className="flex flex-wrap items-center gap-3">
                                <CallToAction
                                    to="https://app.posthog.com/data-management/sources"
                                    externalNoIcon
                                    size="md"
                                >
                                    Get Started
                                </CallToAction>
                                <p className="mb-0 text-sm text-secondary">
                                    Not using PostHog?{' '}
                                    <Link
                                        to="https://app.posthog.com/signup"
                                        external
                                        className="font-semibold text-red dark:text-yellow"
                                    >
                                        Sign up
                                    </Link>
                                </p>
                            </div>
                        </div>
                        <div className="hidden justify-center @lg/reader-content:flex">
                            <HedgehogDocBrown size={190} className="w-full max-w-[190px]" />
                        </div>
                    </div>
                </div>
            </ReaderView>
        </>
    )
}

export default UseCases
