import React, { useRef, useState } from 'react'
import ReaderView from 'components/ReaderView'
import Link from 'components/Link'
import SEO, { buildProductStructuredData } from 'components/seo'
import OSButton from 'components/OSButton'
import { CallToAction } from 'components/CallToAction'
import usePostHog from 'hooks/usePostHog'
import { Logo } from '@posthog/brand/logo'
import { IconCheck } from '@posthog/icons'

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
        question: 'Which products can I use student credits on?',
        answer: 'All of PostHog: product analytics, session replay, feature flags, experiments, error tracking, surveys, data warehouse, and more. PostHog Desktop is not part of the student program right now.',
    },
    {
        question: "What if my school isn't eligible yet?",
        answer: 'Apply anyway. The program is rolling out school by school, so if yours is not included yet we keep your application and email you when it is.',
    },
    {
        question: 'Can I apply with my personal email?',
        answer: 'No. Your school email is how we verify you are a student, so apply with your school-issued address.',
    },
    {
        question: 'Should I apply to PostHog for Students or PostHog for Startups?',
        answer: 'If your company is less than 2 years old and has raised under $5m, apply to PostHog for Startups: same credits, plus partner perks. The two programs do not stack.',
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
            <div className="bg-white shadow-2xl rounded-md p-6 space-y-4 transition-all max-w-[700px]">
                {!submitted ? (
                    <>
                        <input
                            name="name"
                            type="text"
                            placeholder="Your name"
                            className="w-full border border-light rounded px-4 py-2 bg-[#E5E7E0] text-lg text-black"
                            required
                        />
                        <input
                            name="email"
                            type="email"
                            placeholder="Your school email"
                            className="w-full border border-light rounded px-4 py-2 bg-[#E5E7E0] text-lg text-black"
                            required
                        />
                        <input
                            name="school"
                            type="text"
                            placeholder="Your school or university"
                            className="w-full border border-light rounded px-4 py-2 bg-[#E5E7E0] text-lg text-black"
                            required
                        />
                        <textarea
                            name="pitch"
                            placeholder="Tell us about your campus and the event you'd run"
                            className="w-full border border-light rounded px-4 py-2 bg-[#E5E7E0] text-lg text-black"
                            rows={4}
                            required
                        />
                        <CallToAction
                            type="primary"
                            size="lg"
                            className="w-full"
                            to="#"
                            onClick={() => {
                                formRef.current?.requestSubmit()
                            }}
                        >
                            Submit application
                        </CallToAction>
                    </>
                ) : (
                    <div className="bg-green text-white p-3 rounded-full flex items-center justify-center space-x-2">
                        <IconCheck className="size-6" />
                        <span>Thanks! We got your application.</span>
                    </div>
                )}
            </div>
        </form>
    )
}

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
                    <div className="bg-[#122030] text-white p-8 relative min-h-96 flex flex-col justify-center w-full">
                        <div className="absolute inset-0 bg-[url(https://res.cloudinary.com/dmukukwp6/image/upload/stars_24a6a0b509.png)] bg-cover" />

                        <div className="relative prose-invert prose-sm">
                            <h1 className="flex items-center gap-2.5 mb-0 text-2xl @md:text-3xl">
                                <Logo
                                    layout="logomark"
                                    variant="mono"
                                    className="h-8 w-auto relative -top-px"
                                    color="white"
                                />
                                <span>
                                    PostHog <span className="text-yellow">for students</span>
                                </span>
                            </h1>
                            <p className="text-white mt-2 mb-3 max-w-xl">
                                Get $50,000 in PostHog credits to build something real while you're still in school.
                            </p>
                            <ul className="prose prose-sm text-white mt-2 mb-4">
                                <li>$50,000 in PostHog credits, valid for 12 months</li>
                                <li>Product analytics, session replay, feature flags, error tracking, and more</li>
                                <li>Credits apply to your whole PostHog organization</li>
                            </ul>

                            <OSButton asLink to={APPLY_URL} variant="primary" size="md" external>
                                Apply for student credits
                            </OSButton>

                            <p className="italic text-sm">You'll need a PostHog account and your school email</p>
                        </div>
                    </div>

                    <div className="px-4 @3xl:px-8 py-8 max-w-3xl">
                        <h2>Who it's for</h2>
                        <p>
                            Students shipping something people use: a product, a startup, a research project, or a class
                            project that found real users. It's a program for builders, not a discount for having a
                            school email.
                        </p>
                        <ul>
                            <li>You're enrolled at a university or college</li>
                            <li>You have a school-issued email address</li>
                            <li>You're building something you can tell us about</li>
                        </ul>

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
                        <p>
                            Run a mixer for the builders at your school and we'll back you: a{' '}
                            <strong>$1,000 cash grant</strong> for food and drinks, plus{' '}
                            <strong>$1,000 in PostHog merch</strong> to give away.
                        </p>
                        <p>
                            The best organizers usually already run something – a CS club, a founder community, an AI
                            society, a hackathon. Sound like you? Apply below and tell us what you'd put on.
                        </p>
                        <CampusMixerForm />

                        <h2>Questions</h2>
                        <details className="mb-2">
                            <summary className="cursor-pointer font-semibold">Do I need a credit card?</summary>
                            <p>
                                Yes. Student credits are applied to an organization on a paid plan, which needs a card
                                on file. You're only charged for usage, you can set your billing limit to $0, and once
                                you're approved the credits cover your usage.
                            </p>
                        </details>
                        <details className="mb-2">
                            <summary className="cursor-pointer font-semibold">How long do the credits last?</summary>
                            <p>
                                12 months from when they're applied. After that you can move onto{' '}
                                <Link to="/pricing" state={{ newWindow: true }} className="underline font-semibold">
                                    another PostHog plan
                                </Link>{' '}
                                – and if you're turning your project into a company,{' '}
                                <Link to="/startups" state={{ newWindow: true }} className="underline font-semibold">
                                    PostHog for Startups
                                </Link>{' '}
                                picks up where this leaves off, with another $50,000 in credits.
                            </p>
                        </details>
                        <details className="mb-2">
                            <summary className="cursor-pointer font-semibold">
                                Which products can I use credits on?
                            </summary>
                            <p>
                                All of PostHog: product analytics, session replay, feature flags, experiments, error
                                tracking, surveys, data warehouse, and more. PostHog Desktop isn't part of the student
                                program right now.
                            </p>
                        </details>
                        <details className="mb-2">
                            <summary className="cursor-pointer font-semibold">
                                What if my school isn't eligible yet?
                            </summary>
                            <p>
                                Apply anyway. We're rolling the program out school by school, so if yours isn't included
                                yet we'll keep your application and email you when it is.
                            </p>
                        </details>
                        <details className="mb-2">
                            <summary className="cursor-pointer font-semibold">
                                Can I apply with my personal email?
                            </summary>
                            <p>
                                No. Your school email is how we verify you're a student, so apply with your
                                school-issued address.
                            </p>
                        </details>
                        <details className="mb-2">
                            <summary className="cursor-pointer font-semibold">
                                I'm already starting a company. Should I apply to this or PostHog for Startups?
                            </summary>
                            <p>
                                If your company is less than 2 years old and has raised under $5m,{' '}
                                <Link to="/startups" state={{ newWindow: true }} className="underline font-semibold">
                                    apply to PostHog for Startups
                                </Link>{' '}
                                – same credits, plus partner perks. The two programs don't stack.
                            </p>
                        </details>

                        <h2>Apply now</h2>
                        <p>It takes a couple of minutes. You'll need a PostHog account and your school email.</p>
                        <div className="not-prose mb-8">
                            <OSButton asLink to={APPLY_URL} variant="primary" size="md" external>
                                Apply for student credits
                            </OSButton>
                        </div>
                    </div>
                </div>
            </ReaderView>
        </>
    )
}
