import React, { useRef, useState } from 'react'
import ReaderView from 'components/ReaderView'
import Link from 'components/Link'
import SEO, { buildProductStructuredData } from 'components/seo'
import { CallToAction, container, child } from 'components/CallToAction'
import { Accordion } from 'components/RadixUI/Accordion'
import Input from 'components/OSForm/input'
import Textarea from 'components/OSForm/textarea'
import usePostHog from 'hooks/usePostHog'
import { Logo } from '@posthog/brand/logo'
import { HedgehogEinstein, HedgehogPartyHog, HedgehogCodingGroup } from '@posthog/brand/hoggies'
import { IconCheck, IconHandMoney, IconStack, IconPeople } from '@posthog/icons'

// The in-app application flow, mirroring https://app.posthog.com/startups for the startup program.
// Program terms come from https://github.com/PostHog/requests-for-comments-public/issues/503
const APPLY_URL = 'https://app.posthog.com/students'

// Plain-text FAQ for schema.org FAQPage structured data. Keep in sync with the visible FAQ below.
const faqStructuredData = [
    {
        question: 'Do I need a credit card to get PostHog student credits?',
        answer: 'Yes. Student credits are applied to an organization on a paid plan, which needs a card on file. You are only charged for usage, you can set your billing limit to $0, and once you are approved the credits cover your usage.',
    },
    {
        question: 'How long do PostHog student credits last?',
        answer: '12 months from when they are applied. After that you can move onto another PostHog plan, and if you are turning your project into a company, PostHog for Startups picks up where this leaves off with another $50,000 in credits.',
    },
    {
        question: 'Where can I use credits?',
        answer: 'You can use credits for any PostHog tools, including product analytics, session replay, feature flags, experiments, error tracking, surveys, data warehouse, and more. PostHog Desktop and other AI features are not included in this student program right now.',
    },
    {
        question: 'Which schools are eligible?',
        answer: 'We are welcoming applications from any schools in the US, UK, or European Union. If that excludes you, apply anyway and we will see if we can make an exception!',
    },
    {
        question: 'Can I apply with my personal email?',
        answer: 'No. Your school email is how we verify you are a student, so apply with your school-issued address: a .edu, .ac.uk, or other university-associated domain.',
    },
    {
        question: 'Should I apply to PostHog for Students or PostHog for Startups?',
        answer: 'If your company is less than 2 years old and has raised under $5m, apply to PostHog for Startups instead. You will get the same credits, plus partner perks more suitable to a growing startup. The two programs do not stack.',
    },
]

const faqLinkClasses = 'underline font-semibold'

// Visible FAQ, rendered with the same Accordion as /slack. Keep in sync with faqStructuredData above.
const faqItems = [
    {
        trigger: 'Do I need a credit card?',
        content: (
            <p className="m-0">
                Yes. Student credits are applied to an organization on a paid plan, which needs a card on file. You're
                only charged for usage, you can set your billing limit to $0, and once you're approved the credits cover
                your usage.
            </p>
        ),
    },
    {
        trigger: 'How long do the credits last?',
        content: (
            <p className="m-0">
                12 months from when they're applied. After that you can move onto{' '}
                <Link to="/pricing" state={{ newWindow: true }} className={faqLinkClasses}>
                    another PostHog plan
                </Link>{' '}
                – and if you're turning your project into a company,{' '}
                <Link to="/startups" state={{ newWindow: true }} className={faqLinkClasses}>
                    PostHog for Startups
                </Link>{' '}
                picks up where this leaves off, with another $50,000 in credits.
            </p>
        ),
    },
    {
        trigger: 'Where can I use credits?',
        content: (
            <p className="m-0">
                You can use credits for any PostHog tools, including product analytics, session replay, feature flags,
                experiments, error tracking, surveys, data warehouse, and more. PostHog Desktop and other AI features
                aren't included in this student program right now.
            </p>
        ),
    },
    {
        trigger: 'Which schools are eligible?',
        content: (
            <p className="m-0">
                We're welcoming applications from any schools in the US, UK, or European Union. If that excludes you,
                apply anyway and we'll see if we can make an exception!
            </p>
        ),
    },
    {
        trigger: 'Can I apply with my personal email?',
        content: (
            <p className="m-0">
                No. Your school email is how we verify you're a student, so apply with your school-issued address: a
                .edu, .ac.uk, or other university-associated domain.
            </p>
        ),
    },
    {
        trigger: "I'm already starting a company. Should I apply to this or PostHog for Startups?",
        content: (
            <p className="m-0">
                If your company is less than 2 years old and has raised under $5m,{' '}
                <Link to="/startups" state={{ newWindow: true }} className={faqLinkClasses}>
                    apply to PostHog for Startups
                </Link>{' '}
                instead – you'll get the same credits, plus partner perks more suitable to a growing startup. The two
                programs don't stack.
            </p>
        ),
    },
]

// Campus mixer organizer application. Same pattern as CommunityIncubatorForm: the submission is a
// PostHog event, which downstream automations pick up.
function CampusMixerForm(): JSX.Element {
    const formRef = useRef<HTMLFormElement>(null)
    const [submitted, setSubmitted] = useState(false)
    const posthog = usePostHog()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (submitted) return
        const form = formRef.current
        const nameInput = form?.elements.namedItem('name') as HTMLInputElement | null
        const emailInput = form?.elements.namedItem('email') as HTMLInputElement | null
        const schoolInput = form?.elements.namedItem('school') as HTMLInputElement | null
        const pitchInput = form?.elements.namedItem('pitch') as HTMLTextAreaElement | null

        if (emailInput && emailInput.value) {
            posthog?.capture('student_mixer_application', {
                name: nameInput?.value,
                email: emailInput.value,
                school: schoolInput?.value,
                pitch: pitchInput?.value,
            })
            form?.reset()
            setSubmitted(true)
        }
    }

    return (
        <form ref={formRef} onSubmit={handleSubmit} className="not-prose">
            <div className="max-w-[700px] space-y-4 rounded-md border border-primary bg-primary p-6 shadow-sm transition-all">
                {!submitted ? (
                    <>
                        <Input label="Your name" name="name" type="text" direction="column" required />
                        <Input
                            label="Your school email"
                            name="email"
                            type="email"
                            direction="column"
                            description="A .edu, .ac.uk, or other university-associated domain"
                            required
                        />
                        <Input
                            label="Your school or university"
                            name="school"
                            type="text"
                            direction="column"
                            required
                        />
                        <Textarea
                            label="Tell us about your campus and the event you'd run"
                            name="pitch"
                            direction="column"
                            rows={4}
                            required
                        />
                        <button type="submit" disabled={submitted} className={container('primary', 'lg', 'full')}>
                            <span className={child('primary', 'full', '', 'lg')}>Submit application</span>
                        </button>
                    </>
                ) : (
                    <div className="flex items-center justify-center space-x-2 rounded-full bg-green p-3 text-white">
                        <IconCheck className="size-6" />
                        <span>Thanks! We got your application.</span>
                    </div>
                )}
            </div>
        </form>
    )
}

const heroBullets: { Icon: React.ComponentType<{ className?: string }>; color: string; text: string }[] = [
    { Icon: IconHandMoney, color: 'text-yellow', text: '$50,000 in PostHog credits, valid for 12 months' },
    {
        Icon: IconStack,
        color: 'text-blue',
        text: 'Product analytics, session replay, feature flags, error tracking, and more',
    },
    { Icon: IconPeople, color: 'text-green', text: 'Credits apply to your whole PostHog organization' },
]

const eligibilityBullets: string[] = [
    "You're enrolled at a university or college",
    'You have a school-issued email address, like a .edu, .ac.uk, or other university-associated domain',
    "You're building something you can tell us about",
]

export default function StudentProgram(): JSX.Element {
    return (
        <>
            <SEO
                title="PostHog for Students | $50,000 in credits while you build"
                description="Get $50,000 in PostHog credits to build something real while you're in school. Product analytics, session replay, feature flags, error tracking, and more – free for 12 months. Plus grants for campus mixers."
                image="/images/og/default.png"
                structuredData={buildProductStructuredData({
                    name: 'PostHog for Students',
                    description:
                        '$50,000 in PostHog credits for students building real products, plus cash and merch grants for campus mixer organizers.',
                    slug: 'students',
                    faq: faqStructuredData,
                })}
            />
            <ReaderView
                proseSize="lg"
                hideLeftSidebar
                showQuestions={false}
                title="students.md"
                hideTitle
                className="overflow-x-hidden"
            >
                <div className="@container h-full bg-[#EFF0EB] dark:bg-dark">
                    {/* Hero – dark navy + stars, matching /startups */}
                    <div className="relative flex min-h-96 w-full flex-col justify-center bg-[#122030] p-8 text-white">
                        <div className="absolute inset-0 bg-[url(https://res.cloudinary.com/dmukukwp6/image/upload/stars_24a6a0b509.png)] bg-cover" />

                        <div className="relative mx-auto grid w-full max-w-3xl items-center gap-8 @2xl:grid-cols-[minmax(0,1fr)_200px]">
                            <div className="prose-invert prose-sm">
                                <h1 className="mb-0 flex items-center gap-2.5 text-2xl @md:text-3xl">
                                    <Logo
                                        layout="logomark"
                                        variant="mono"
                                        className="relative -top-px h-8 w-auto"
                                        color="white"
                                    />
                                    <span>
                                        PostHog <span className="text-yellow">for students</span>
                                    </span>
                                </h1>
                                <p className="mb-3 mt-3 max-w-xl text-white">
                                    Get <strong className="text-yellow">$50,000 in PostHog credits</strong> to build
                                    something real while you're still in school.
                                </p>
                                <ul className="mb-5 mt-3 list-none space-y-1.5 p-0 text-[15px] text-white">
                                    {heroBullets.map(({ Icon, color, text }) => (
                                        <li key={text} className="relative pl-6">
                                            <Icon className={`absolute left-0 top-0.5 size-4 ${color}`} />
                                            {text}
                                        </li>
                                    ))}
                                </ul>

                                <CallToAction to={APPLY_URL} type="primary" size="lg" externalNoIcon>
                                    Apply for student credits
                                </CallToAction>

                                <p className="mt-3 text-sm italic text-white/80">
                                    You'll need a PostHog account and your school email – a .edu, .ac.uk, or other
                                    university-associated domain
                                </p>
                            </div>

                            <div className="hidden select-none @2xl:block">
                                <HedgehogEinstein
                                    className="pointer-events-none h-auto w-full"
                                    title="A hedgehog dressed as Einstein"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mx-auto max-w-3xl px-4 py-8 @3xl:px-8">
                        <h2>Who it's for</h2>
                        <HedgehogCodingGroup
                            className="pointer-events-none float-right mb-2 ml-4 hidden h-auto w-[200px] @xl:block"
                            title="A group of hedgehogs coding together"
                        />
                        <p>
                            Students shipping something people use: a product, a startup, a research project, or a class
                            project that found real users. It's a program for builders, not a discount for having a
                            school email.
                        </p>
                        <ul className="list-none space-y-1.5 pl-0">
                            {eligibilityBullets.map((text) => (
                                <li key={text} className="relative pl-7">
                                    <IconCheck className="absolute left-0 top-1 size-5 text-green" />
                                    {text}
                                </li>
                            ))}
                        </ul>
                        <div className="clear-both" />

                        <h2>How it works</h2>
                        <ol>
                            <li>
                                <Link to="https://app.posthog.com/signup" external className="underline font-semibold">
                                    Sign up for PostHog
                                </Link>
                                , or log in
                            </li>
                            <li>
                                Add billing details. You're only charged for usage, and you can set your billing limit
                                to $0.
                            </li>
                            <li>Apply with your school email and tell us what you're building</li>
                            <li>Use your credits on any PostHog product for 12 months</li>
                        </ol>

                        <h2 id="campus">Bring PostHog to your campus</h2>
                        <HedgehogPartyHog
                            className="pointer-events-none float-right mb-2 ml-4 hidden h-auto w-[150px] @xl:block"
                            title="A hedgehog at a party"
                        />
                        <p>
                            We love meeting students when we can. Run a mixer for the builders at your school and we'll
                            back you: a <strong>$1,000 cash grant</strong> for food and drinks,{' '}
                            <strong>$1,000 in PostHog merch</strong> to give away, and we'll send someone along if we
                            can!
                        </p>
                        <p>
                            The best organizers usually already run something – a CS club, a founder community, an AI
                            society, a hackathon. Sound like you? Apply below and tell us what you'd put on.
                        </p>
                        <div className="clear-both" />
                        <CampusMixerForm />

                        <h2>Questions</h2>
                        <div className="not-prose rounded-md border border-primary bg-primary px-1 shadow-sm">
                            <Accordion
                                type="multiple"
                                triggerClassName="!px-3 !py-2"
                                contentClassName="!px-3 !py-2.5 !text-base !leading-relaxed"
                                items={faqItems}
                            />
                        </div>

                        {/* Closing CTA – bookends the hero */}
                        <div className="not-prose relative my-12 overflow-hidden rounded-md bg-[#122030] p-8 text-white">
                            <div className="absolute inset-0 bg-[url(https://res.cloudinary.com/dmukukwp6/image/upload/stars_24a6a0b509.png)] bg-cover" />
                            <div className="relative">
                                <h2 className="m-0 text-2xl font-bold @md:text-3xl">Ready to build?</h2>
                                <p className="mb-5 mt-2 max-w-xl text-white/90">
                                    Applying takes a couple of minutes. You'll need a PostHog account and your school
                                    email.
                                </p>
                                <CallToAction to={APPLY_URL} type="primary" size="lg" externalNoIcon>
                                    Apply for student credits
                                </CallToAction>
                            </div>
                        </div>
                    </div>
                </div>
            </ReaderView>
        </>
    )
}
