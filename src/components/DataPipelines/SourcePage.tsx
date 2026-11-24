import React from 'react'
import Link from 'components/Link'
import OSButton from 'components/OSButton'
import { IconArrowUpRight, IconPieChart } from '@posthog/icons'
import { Card } from 'components/UI/Card'
import { Section as UISection } from 'components/UI/Section'
import SEO from 'components/seo'
import ReaderView from 'components/ReaderView'
import SourceConnect from 'components/DataPipelines/SourceConnect'
import GuideCardActions from 'components/DataPipelines/GuideCardActions'

type IconComponent = React.ComponentType<{ className?: string }>

/** Opens PostHog AI with the prompt pre-filled but not sent, so the reader can fill in the [placeholders] first. */
const maxPromptUrl = (prompt: string) => `https://app.posthog.com/#panel=max:${encodeURIComponent(prompt)}`

export interface SourceFeature {
    title: string
    Icon: IconComponent
    description: string
}

export interface SourceSyncMode {
    mode: string
    Icon: IconComponent
    description: string
}

export interface SourceQuestion {
    Icon: IconComponent
    iconColor: string
    question: string
    answer: string
    href: string
}

export interface SourceQuestionGroup {
    role: string
    questions: SourceQuestion[]
}

export interface SourceProductUse {
    product: string
    Icon: IconComponent
    iconColor: string
    description: string
    prompt: string
}

export interface SourcePageProps {
    seo: {
        title: string
        description: string
        image: string
    }
    hero: {
        before: string
        highlight: string
        after: string
        description: string
        ctaLabel: string
        ctaTo: string
        Hedgehog: IconComponent
    }
    whatSyncs: {
        title: string
        intro: React.ReactNode
        features: SourceFeature[]
        modesTitle: string
        modes: SourceSyncMode[]
        note: string
        docsTo: string
    }
    connect: {
        title: string
        intro: string
    }
    questions: {
        title: string
        groups: SourceQuestionGroup[]
    }
    across: {
        title: string
        intro: string
        uses: SourceProductUse[]
        tip: React.ReactNode
    }
    closing: {
        title: string
        description: string
        ctaLabel: string
        ctaTo: string
        Hedgehog: IconComponent
    }
}

function Section({
    id,
    title,
    intro,
    children,
}: {
    id: string
    title: string
    intro?: React.ReactNode
    children: React.ReactNode
}) {
    return (
        <UISection.Root id={id} className="mt-12 scroll-mt-4 p-0 border-0">
            <UISection.Header className="gap-2">
                <h2 className="m-0 text-balance text-2xl font-bold tracking-tight @2xl:text-3xl">{title}</h2>
                {intro && <p className="m-0 max-w-2xl text-pretty text-base text-secondary">{intro}</p>}
            </UISection.Header>
            {children}
        </UISection.Root>
    )
}

export default function SourcePage({
    seo,
    hero,
    whatSyncs,
    connect,
    questions,
    across,
    closing,
}: SourcePageProps): JSX.Element {
    return (
        <>
            <SEO title={seo.title} description={seo.description} image={seo.image} />
            <ReaderView
                title={seo.title}
                hideTitle
                hideLeftSidebar
                hideRightSidebar
                hideMarkdownActions
                proseSize="lg"
                showQuestions={false}
            >
                <div className="@container not-prose mx-auto w-full max-w-7xl pb-16 text-primary">
                    <header className="grid items-center gap-6 @2xl:grid-cols-[1.7fr_1fr] @2xl:gap-8">
                        <div className="min-w-0">
                            <h1 className="m-0 text-balance text-4xl font-bold leading-tight text-primary">
                                {hero.before}{' '}
                                <span className="rounded-md bg-blue/10 px-1 text-blue dark:bg-blue/20">
                                    {hero.highlight}
                                </span>{' '}
                                {hero.after}
                            </h1>
                            <p className="mb-0 mt-3 max-w-prose text-lg text-primary/70">{hero.description}</p>
                            <div className="mt-6">
                                <OSButton
                                    asLink
                                    to={hero.ctaTo}
                                    state={{ newWindow: true }}
                                    variant="primary"
                                    size="lg"
                                >
                                    {hero.ctaLabel}
                                </OSButton>
                            </div>
                        </div>
                        <div className="order-first flex min-w-0 justify-start @2xl:order-none @2xl:justify-center">
                            <hero.Hedgehog className="h-auto w-full max-w-[260px]" />
                        </div>
                    </header>

                    <Section id="what-syncs" title={whatSyncs.title} intro={whatSyncs.intro}>
                        <div className="grid grid-cols-1 gap-4 @md:grid-cols-2 @5xl:grid-cols-4">
                            {whatSyncs.features.map((feature) => (
                                <Card.Root key={feature.title} className="h-full">
                                    <Card.TitleBar icon={<feature.Icon className="text-muted" />}>
                                        {feature.title}
                                    </Card.TitleBar>
                                    <Card.Description>{feature.description}</Card.Description>
                                </Card.Root>
                            ))}
                        </div>

                        <div className="mt-6 flex flex-col gap-3">
                            <h3 className="m-0 text-xl font-bold tracking-tight">{whatSyncs.modesTitle}</h3>
                            <div className="grid grid-cols-1 gap-4 @3xl:grid-cols-3">
                                {whatSyncs.modes.map((mode) => (
                                    <Card.Root key={mode.mode} className="h-full">
                                        <Card.TitleBar icon={<mode.Icon className="text-muted" />}>
                                            {mode.mode}
                                        </Card.TitleBar>
                                        <Card.Description>{mode.description}</Card.Description>
                                    </Card.Root>
                                ))}
                            </div>
                        </div>
                        <p className="m-0 text-sm text-secondary">{whatSyncs.note}</p>
                        <div>
                            <OSButton
                                asLink
                                to={whatSyncs.docsTo}
                                state={{ newWindow: true }}
                                variant="secondary"
                                size="md"
                            >
                                Read the docs
                            </OSButton>
                        </div>
                    </Section>

                    <SourceConnect
                        id="connect"
                        title={connect.title}
                        description={connect.intro}
                        manualTo={whatSyncs.docsTo}
                    />

                    <Section id="questions" title={questions.title}>
                        {questions.groups.map((group) => (
                            <div key={group.role} className="mt-8 first:mt-0">
                                <h3 className="m-0 mb-3 text-xl font-bold tracking-tight">{group.role}</h3>
                                <div className="grid grid-cols-1 gap-4 @2xl:grid-cols-2">
                                    {group.questions.map((question) => (
                                        <Card.Root key={question.question} className="h-full">
                                            <question.Icon className={`size-6 ${question.iconColor}`} />
                                            <Card.Header>
                                                <Card.Title>{question.question}</Card.Title>
                                                <Card.Description>{question.answer}</Card.Description>
                                            </Card.Header>
                                            <Card.Footer className="mt-auto justify-start">
                                                <GuideCardActions href={question.href} />
                                            </Card.Footer>
                                        </Card.Root>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </Section>

                    <Section id="across-posthog" title={across.title} intro={across.intro}>
                        <div className="grid grid-cols-1 gap-4 @2xl:grid-cols-2 @6xl:grid-cols-3">
                            {across.uses.map((use) => (
                                <Card.Root key={use.product} className="h-full">
                                    <Card.TitleBar icon={<use.Icon className={use.iconColor} />}>
                                        {use.product}
                                    </Card.TitleBar>
                                    <Card.Description className="flex-1">{use.description}</Card.Description>
                                    <Card.Footer className="justify-start">
                                        <Link
                                            to={maxPromptUrl(use.prompt)}
                                            externalNoIcon
                                            className="inline-flex items-center text-sm font-semibold text-primary"
                                        >
                                            Try it in PostHog AI
                                            <IconArrowUpRight className="size-3.5 text-muted group-hover:text-secondary" />
                                        </Link>
                                    </Card.Footer>
                                </Card.Root>
                            ))}
                            <Card.Root appearance="dashed" className="h-full">
                                <Card.TitleBar
                                    icon={<IconPieChart className="text-blue" />}
                                    className="border-dashed bg-transparent"
                                >
                                    Do it once, reuse it everywhere
                                </Card.TitleBar>
                                <Card.Description className="flex-1">{across.tip}</Card.Description>
                                <Link
                                    to="/docs/product-analytics/cohorts"
                                    state={{ newWindow: true }}
                                    className="text-sm font-semibold text-primary"
                                >
                                    Read about cohorts →
                                </Link>
                            </Card.Root>
                        </div>
                    </Section>

                    <UISection.Root className="mt-12 p-0 border-0">
                        <div className="grid items-center gap-6 @3xl:grid-cols-[minmax(0,1fr)_minmax(10rem,13rem)] @3xl:gap-10">
                            <div className="min-w-0">
                                <h2 className="m-0 max-w-xl text-balance text-2xl font-bold tracking-tight @2xl:text-3xl">
                                    {closing.title}
                                </h2>
                                <p className="m-0 mt-2 max-w-2xl text-base text-secondary">{closing.description}</p>
                                <div className="mt-5 flex flex-col items-start gap-3 @xs:flex-row @xs:items-center">
                                    <OSButton
                                        asLink
                                        to={closing.ctaTo}
                                        state={{ newWindow: true }}
                                        variant="primary"
                                        size="lg"
                                    >
                                        {closing.ctaLabel}
                                    </OSButton>
                                    <p className="m-0 text-sm text-secondary">
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
                            <closing.Hedgehog className="hidden w-full max-w-[13rem] justify-self-end @3xl:block" />
                        </div>
                    </UISection.Root>
                </div>
            </ReaderView>
        </>
    )
}
