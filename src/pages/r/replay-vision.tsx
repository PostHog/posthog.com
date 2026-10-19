import React from 'react'
import SEO from 'components/seo'
import ReaderView from 'components/ReaderView'
import { CallToAction } from 'components/CallToAction'
import OSButton from 'components/OSButton'
import Link from 'components/Link'
import Glow from 'components/Glow'
import Label from 'components/Label'
import WizardCommand from 'components/WizardCommand'
import CloudinaryImage from 'components/CloudinaryImage'
import { Accordion } from 'components/RadixUI/Accordion'
import { PRODUCT_SURFACE_H1, SECTION_H2 } from 'components/Products/ReaderViewProduct/helpers'
import { sessionReplay } from 'hooks/productData/session_replay'
import {
    IconCheckCircle,
    IconCode,
    IconDocument,
    IconFlask,
    IconMagic,
    IconTrending,
    IconWarning,
} from '@posthog/icons'
import opportunityMiner from '../../images/replay-vision-opportunity-miner.png'

// Paid-search landing page for "session replay" ads that point at Replay Vision.
// Built from the product page pieces (`components/Products/ReaderViewProduct`) so it
// matches /session-replay and /replay-vision. Not linked from the nav, so it's noindex.

const TITLE = 'The AI that watches session recordings for you'
const FREE_TIER =
    '5,000 recordings free every month, forever. 2,500 Replay Vision credits free every month for a limited time.'

// Same image as the Replay Vision pricing footer CTA.
const FOOTER_IMAGE =
    'https://res.cloudinary.com/dmukukwp6/image/upload/noir_desk_relax_surveillance_computer_63a434c398.png' as const

const scrollToInstall = () => {
    const el = document.getElementById('install')
    if (el) {
        window.history.pushState(null, '', '#install')
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
}

const steps = [
    {
        title: 'Record user sessions',
        description:
            'Add PostHog and Session Replay starts capturing sessions on web and mobile. Input fields are masked by default, so passwords and card numbers stay out of the recording. Your first 5,000 web recordings each month are free, which is about 5,000 more than you were planning to watch.',
    },
    {
        title: 'Tell the AI what to look for',
        description:
            'Write what you\'re looking for in plain English, like "did the user get stuck on checkout?" Use the same filters you already use in Session Replay to choose which recordings it watches, and set what share of them it samples. The scanner runs in the background as new recordings come in, or on demand against sessions you pick. It watches the video and checks the events, so it notices hesitation and confusion that never fire an event.',
    },
    {
        title: 'Get observations you can act on',
        description: (
            <>
                Each scanned session becomes an observation: a yes/no verdict, a score, tags, or a summary. Every
                observation has a confidence score. Observations also land as <code>$recording_observed</code> events,
                so you can chart them, build cohorts from them, or send alerts to Slack.
            </>
        ),
    },
]

// Card style matches the scanner cards in the "What it looks for" tab on /replay-vision
// (`hooks/productData/replay_vision/slides.tsx`).
const scanners: {
    Icon: React.ComponentType<{ className?: string }>
    color: string
    title: string
    badge?: string
    description: string
    output?: string
}[] = [
    {
        Icon: IconDocument,
        color: 'text-green',
        title: 'Session summary',
        description: "The short version of a session, so you don't sit through 14 minutes of someone scrolling.",
        output: 'A title and a summary',
    },
    {
        Icon: IconMagic,
        color: 'text-blue',
        title: 'User intent',
        description: 'Tags each session with what the user seemed to be trying to do.',
        output: 'Tags from a list you define',
    },
    {
        Icon: IconCheckCircle,
        color: 'text-teal',
        title: 'Session outcome',
        description: 'Tags what actually happened: completed, abandoned, errored, and so on.',
        output: 'Tags from a list you define',
    },
    {
        Icon: IconWarning,
        color: 'text-red',
        title: 'Dead ends',
        description: 'Catches the moment someone hits a wall: scrolling, hovering with no CTA, then rage-quitting.',
        output: 'A yes/no verdict, with reasoning',
    },
    {
        Icon: IconTrending,
        color: 'text-yellow',
        title: 'Frustration score',
        description: 'Rates how much friction a page caused.',
        output: 'A score on a scale you define',
    },
    {
        Icon: IconFlask,
        color: 'text-orange',
        title: 'Experiment',
        badge: 'Beta',
        description:
            'Summarizes sessions from each variant of an experiment and shows them side by side. Your conversion rate tells you B won. This shows you what people did differently in B.',
        output: 'A summary, labeled with the variant',
    },
    {
        Icon: IconCode,
        color: 'text-purple',
        title: 'Create from scratch',
        description: 'Pick a type and write your own prompt.',
    },
]

const prompts = [
    'Create a Replay Vision scanner that flags sessions where users get stuck on the /checkout page, narrow to enterprise customers, and start at 25% sampling. Estimate the cost first.',
    'List the last 20 observations from my "Frustration score" scanner and summarize what\'s driving high scores.',
    'Set up an alert that posts to Slack whenever my "Dead ends" monitor answers yes.',
]

const faqs = [
    {
        q: 'Does it watch every session?',
        a: "No, and you wouldn't want it to. A scanner watches only the recordings that match its filters, at the sampling rate you set, so you control what gets scanned and what it costs.",
    },
    {
        q: 'How much does it cost?',
        a: 'Session Replay gives you 5,000 web recordings and 2,500 mobile recordings free every month. After that, web recordings start at $0.005 each. Replay Vision gives you 2,500 credits free every month for a limited time. The usual free tier is 500. One credit is $0.01, and each observation costs 2, 5, or 15 credits depending on the model. On the default model, 2,500 credits cover 500 observations a month.',
    },
    {
        q: 'Can I trust what it says?',
        a: "Every observation shows a confidence score and its reasoning, so you can check it in seconds. Rate observations with a thumbs up or down and the scanner learns from your team's ratings.",
    },
    {
        q: 'What about privacy?',
        a: "Session Replay masks inputs by default, and you can mask anything else. Replay Vision checks each answer for personal data the scanner didn't ask for. If it finds any, it rewrites the answer, and if the rewrite still has personal data, the scan fails and nothing is saved.",
    },
    {
        q: 'Which AI model does it use?',
        a: 'Google Gemini. You pick the model for each scanner, and that choice sets what each observation costs.',
    },
    {
        q: 'Can it tell me when something goes wrong?',
        a: 'Yes. You can set alerts that fire on matching observations or when a metric crosses a threshold, and send them to Slack or a webhook.',
    },
]

const MORE_QUESTIONS = [
    'Why are users dropping off in my funnel?',
    'How do I see where errors happen?',
    'How can I improve customer support with screen recordings?',
    'How do I control which sessions are being captured?',
]

const CARD = 'border border-primary rounded p-5 bg-primary'
const H3 = 'text-lg font-bold text-primary mt-0 mb-2'
const BODY = 'text-base text-secondary leading-relaxed m-0'

export default function ReplayVisionLanding(): JSX.Element {
    const moreQuestions = MORE_QUESTIONS.map((question) =>
        sessionReplay.questions.find((item: { question: string }) => item.question === question)
    ).filter(Boolean) as { question: string; url: string }[]

    return (
        <>
            <SEO
                title="Session replay that watches itself | PostHog"
                description="PostHog Session Replay records what users do. Replay Vision watches those recordings for you and turns them into observations you can query and chart."
                noindex
            />
            <ReaderView title={TITLE} hideTitle hideLeftSidebar hideRightSidebar proseSize="lg" showQuestions={false}>
                <div className="flex flex-col gap-12 max-w-7xl w-full mx-auto">
                    <section id="overview" className="scroll-mt-20 not-prose flex flex-col gap-8">
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-semibold text-secondary m-0 mb-2">
                                    Session replay + Replay Vision
                                </p>
                                <h1 className={PRODUCT_SURFACE_H1}>{TITLE}</h1>
                                <p className="leading-relaxed">
                                    Record what people do in your product: clicks, scrolls, form inputs, page views,
                                    network requests, and console logs. Then tell the AI what to look for, point it at
                                    the sessions you care about, and get back observations you can query, chart, and
                                    alert on.
                                </p>
                            </div>
                            <div className="@container">
                                <div className="flex flex-col @xs:flex-row gap-3 @sm:gap-2">
                                    <CallToAction
                                        to="https://app.posthog.com/signup"
                                        size="lg"
                                        state={{ newWindow: true, initialTab: 'signup' }}
                                    >
                                        Get started free
                                    </CallToAction>
                                    <CallToAction type="secondary" size="lg" onClick={scrollToInstall}>
                                        Install with AI
                                    </CallToAction>
                                </div>
                            </div>
                            <p className="!text-sm text-secondary m-0">{FREE_TIER}</p>
                        </div>
                        <Glow color="yellow" className="mx-2">
                            <img
                                src={opportunityMiner}
                                alt="The [Website] Opportunity miner scanner returns a Yes verdict, with timestamped reasoning showing a visitor searching for the changelog RSS feed"
                                className="w-full h-auto rounded-lg border border-primary block"
                            />
                        </Glow>
                    </section>

                    <section id="how-it-works" className="scroll-mt-20 not-prose">
                        <h2 className={SECTION_H2}>How it works</h2>
                        <ol className="m-0 pl-6 flex flex-col gap-6">
                            {steps.map(({ title, description }) => (
                                <li key={title} className="list-decimal text-lg font-bold text-primary pl-1">
                                    <h3 className={H3}>{title}</h3>
                                    <p className={`${BODY} font-normal`}>{description}</p>
                                </li>
                            ))}
                        </ol>
                    </section>

                    <section id="scanners" className="scroll-mt-20 not-prose">
                        <h2 className={SECTION_H2}>What can it watch for?</h2>
                        <div className="@container">
                            <div className="grid @md:grid-cols-2 @2xl:grid-cols-3 gap-4 my-6">
                                {scanners.map(({ Icon, color, title, badge, description, output }) => (
                                    <div key={title} className="rounded-md border border-primary p-4 bg-primary">
                                        <div className="flex items-baseline gap-2 mb-2">
                                            <Icon className={`size-5 shrink-0 self-center ${color}`} />
                                            <h4 className="text-[15px] font-bold m-0">{title}</h4>
                                            {badge && <Label text={badge} className="self-center" />}
                                        </div>
                                        <p className="text-sm text-secondary m-0">{description}</p>
                                        {output && (
                                            <p className="text-sm font-semibold text-primary mt-3 m-0">{output}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <p className={BODY}>
                            <strong className="text-primary">Also new: Replay Vision in workflows.</strong>{' '}
                            <Link to="/docs/workflows/replay-vision" state={{ newWindow: true }} className="underline">
                                When a support ticket comes in, a survey score is low, or a new signup struggles, Replay
                                Vision watches that person's session and the workflow acts on its answer.
                            </Link>
                        </p>
                    </section>

                    <section id="install" className="scroll-mt-20 not-prose">
                        <h2 className={SECTION_H2}>Set up in one command</h2>
                        <div className="grid grid-cols-1 @2xl/reader-content:grid-cols-2 gap-4">
                            <div className={CARD}>
                                <h3 className={H3}>Install with the wizard</h3>
                                <p className={`${BODY} mb-4`}>
                                    Run it in your project directory. It reads your codebase, installs the PostHog SDK
                                    if you don't have it yet, turns on Session Replay, and creates three scanners
                                    written for your product: one that watches your key flow for breakage, one that
                                    watches for frustration, and one that summarizes sessions.
                                </p>
                                <WizardCommand command="replay-vision" variant="bordered" slim />
                                <p className={`${BODY} text-sm mt-4`}>
                                    They're ordinary scanners, so you can edit or delete them afterward.
                                </p>
                            </div>
                            <div className={CARD}>
                                <h3 className={H3}>Start in the app</h3>
                                <p className={`${BODY} mb-4`}>
                                    Already recording? Open Replay Vision, click New scanner, and pick a starting point.
                                    PostHog AI drafts the scanner, you run it on a recording you choose, and you see
                                    your first observation in about five minutes.
                                </p>
                                <CallToAction
                                    type="secondary"
                                    size="md"
                                    to="/docs/replay-vision/start-here"
                                    state={{ newWindow: true }}
                                >
                                    Open Replay Vision
                                </CallToAction>
                                <p className={`${BODY} text-sm mt-4`}>
                                    An organization admin needs to approve AI data processing first.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section id="mcp" className="scroll-mt-20 not-prose">
                        <h2 className={SECTION_H2}>Or just ask what you need to know</h2>
                        <div className="flex flex-col gap-4">
                            <p className={BODY}>
                                With the PostHog MCP, your coding agent can do anything you can do in Replay Vision. It
                                can ask a one-off question about specific sessions without setting up a scanner, draft a
                                scanner from a goal and estimate its cost before it runs, or pull observations into
                                context while it writes the fix.
                            </p>
                            <p className={BODY}>
                                The same MCP covers your funnels, flags, and errors, so the agent can go from
                                "conversion dropped" to the replays that explain it in one conversation.
                            </p>
                            <p className={BODY}>
                                We do this ourselves. One of our scanners caught a visitor hunting for our changelog RSS
                                feed.{' '}
                                <Link to="https://github.com/PostHog/posthog.com/pull/20192" className="underline">
                                    The fix was merged the same day
                                </Link>
                                .
                            </p>
                            <div>
                                <WizardCommand command="mcp add" variant="bordered" slim />
                                <p className={`${BODY} text-sm mt-2`}>
                                    Works in Cursor, Claude Code, Codex, VS Code, Windsurf, and other MCP clients.
                                </p>
                            </div>
                            <div>
                                <h3 className={H3}>Try prompts like:</h3>
                                <ul className="m-0 p-0 list-none flex flex-col gap-2">
                                    {prompts.map((prompt) => (
                                        <li key={prompt} className={`${CARD} !p-3 text-sm text-primary italic`}>
                                            {prompt}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section id="questions" className="scroll-mt-20 not-prose">
                        <h2 className={SECTION_H2}>Questions</h2>
                        <Accordion
                            type="single"
                            items={faqs.map(({ q, a }) => ({
                                trigger: <span className="font-semibold">{q}</span>,
                                content: <p>{a}</p>,
                            }))}
                        />
                        <h3 className={`${H3} mt-8`}>More questions people ask Session Replay</h3>
                        <ul className="m-0 pl-6 flex flex-col gap-1">
                            {moreQuestions.map(({ question, url }) => (
                                <li key={question} className="list-disc">
                                    <Link to={url} state={{ newWindow: true }} className="underline">
                                        {question}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section id="get-started" className="scroll-mt-20 not-prose">
                        <div className="@container relative bg-accent dark:bg-accent-dark rounded-xl overflow-hidden">
                            <div className="grid gap-8 items-center px-8 py-12 @2xl:px-14 @2xl:py-16 @2xl:grid-cols-[1fr_auto]">
                                <div className="max-w-lg">
                                    <h2 className="text-3xl @2xl:text-4xl font-bold text-primary mt-0 mb-4 leading-tight">
                                        {TITLE}
                                    </h2>
                                    <p className="text-base text-primary/70 mb-8">{FREE_TIER}</p>
                                    <div className="flex flex-wrap gap-3 items-center">
                                        <OSButton
                                            variant="primary"
                                            asLink
                                            to="https://app.posthog.com/signup"
                                            size="lg"
                                        >
                                            Get started free
                                        </OSButton>
                                        <OSButton variant="secondary" size="lg" onClick={scrollToInstall}>
                                            Install with AI
                                        </OSButton>
                                    </div>
                                </div>
                                <div className="hidden @2xl:block justify-self-end pointer-events-none select-none">
                                    <CloudinaryImage
                                        src={FOOTER_IMAGE}
                                        alt=""
                                        className="w-64 @4xl:w-80"
                                        imgClassName="w-full h-auto"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </ReaderView>
        </>
    )
}
