import React, { useRef, useState } from 'react'
import ReaderView from 'components/ReaderView'
import Link from 'components/Link'
import SEO, { buildProductStructuredData } from 'components/seo'
import { CallToAction, container, child } from 'components/CallToAction'
import { Accordion } from 'components/RadixUI/Accordion'
import { RoughAnnotation } from 'components/Code/RoughAnnotation'
import Input from 'components/OSForm/input'
import Textarea from 'components/OSForm/textarea'
import OSSelect from 'components/OSForm/select'
import usePostHog from 'hooks/usePostHog'
import { HedgehogPartyHog, HedgehogCodingGroup } from '@posthog/brand/hoggies'
import { IconCheck, IconConfetti, IconGraduationCap } from '@posthog/icons'

type IconComponent = React.ComponentType<{ className?: string }>

// Same emphasis treatment as the /slack and /startups section headings.
const Highlight = ({ children }: { children: React.ReactNode }) => (
    <span className="bg-highlight p-0.5 font-bold text-red dark:text-yellow">{children}</span>
)

// Eligible schools for the dropdown. Selecting one (anything but OTHER) personalizes the page copy,
// swapping the generic "campus" for the school's name.
const OTHER = 'Other'
const SCHOOLS = [
    'Stanford',
    'UC Berkeley',
    'UCLA',
    'UC San Diego',
    'UC Davis',
    'UC Irvine',
    'UC Santa Barbara',
    'UC Merced',
    'Santa Clara University',
    'UC Riverside',
    'UC Santa Cruz',
    'University of San Francisco',
]
const schoolOptions = [...SCHOOLS.map((s) => ({ label: s, value: s })), { label: OTHER, value: OTHER }]

// Plain-text FAQ for schema.org FAQPage structured data. Keep in sync with the visible FAQ below.
const faqStructuredData = [
    {
        question: 'Who can take part in PostHog for Students?',
        answer: 'PostHog for Students is open to all Bay Area universities and UC campuses across California. If your school is not on that list, apply anyway and tell us. We are figuring out where to go next.',
    },
    {
        question: 'Does it cost anything?',
        answer: 'No. The events are free, and we cover food, drinks, and merch for the in-person mixers.',
    },
    {
        question: 'Do I need to be starting a company?',
        answer: 'No. This is for anyone who wants to build. A class project, a startup, or just to learn and meet people. You do not need a company or a finished idea.',
    },
    {
        question: 'Is this a course or certification?',
        answer: 'No. There is no coursework, no grades, and no certificate. Just events, talks, and people who want to build.',
    },
    {
        question: 'What about PostHog credits?',
        answer: 'PostHog for Students is about events, not credits. If you are building a company that is less than 2 years old and has raised under $5m, check out PostHog for Startups for $50,000 in credits and partner perks.',
    },
    {
        question: 'Can I apply with my personal email?',
        answer: 'Short answer: no. Use your school-issued email, so we can confirm you are a student.',
    },
    {
        question: 'Is this open to other schools outside the Bay Area?',
        answer: 'At the moment we are focusing on making sure PostHog for Students offers a really valuable, in person presence. As such we cannot commit to extending the program further. Still want to talk to us? Check out our community incubator.',
    },
]

// Visible FAQ, rendered with the same Accordion as /startups. Keep in sync with faqStructuredData above.
const faqItems = [
    {
        trigger: 'Who can take part?',
        content: (
            <p>
                PostHog for Students is open to all Bay Area universities and UC campuses across California. If your
                school isn't on that list, apply anyway and tell us – we're figuring out where to go next.
            </p>
        ),
    },
    {
        trigger: 'Does it cost anything?',
        content: <p>No. The events are free, and we cover food, drinks, and merch for the mixers.</p>,
    },
    {
        trigger: 'Do I need to be starting a company?',
        content: (
            <p>
                No. This is for anyone who wants to build – a class project, a startup, or just to learn and meet
                people. You don't need a company or a finished idea.
            </p>
        ),
    },
    {
        trigger: 'Is this a course or certification?',
        content: (
            <p>
                No. There's no coursework, no grades, and no certificate – just events, talks, and people who want to
                build.
            </p>
        ),
    },
    {
        trigger: 'What about PostHog credits?',
        content: (
            <p>
                PostHog for Students is about events, not credits. If you're building a company that's less than 2 years
                old and has raised under $5m, check out{' '}
                <Link to="/startups" state={{ newWindow: true }} className="underline font-semibold">
                    PostHog for Startups
                </Link>{' '}
                for $50,000 in credits and partner perks.
            </p>
        ),
    },
    {
        trigger: 'Can I apply with my personal email?',
        content: (
            <p>
                Use your school-issued email – a .edu or other university-associated address – so we can confirm you're
                a student.
            </p>
        ),
    },
    {
        trigger: 'Is this open to other schools outside the Bay Area?',
        content: (
            <p>
                At the moment we're focusing on making sure PostHog for Students offers a really valuable, in person
                presence. As such we can't commit to extending the program further. Still want to talk to us? Check out
                our{' '}
                <Link to="/community-incubator" state={{ newWindow: true }} className="underline font-semibold">
                    community incubator
                </Link>
                .
            </p>
        ),
    },
]

interface CampusMixerFormProps {
    /** Selected school, lifted to the page so the copy can personalize. Empty string = nothing chosen. */
    school: string
    setSchool: (value: string) => void
    /** How to address the campus in the form label – the school name, or "your campus" as a fallback. */
    campusTarget: string
}

// Campus event application. Same pattern as CommunityIncubatorForm: the submission is a
// PostHog event, which downstream automations pick up.
function CampusMixerForm({ school, setSchool, campusTarget }: CampusMixerFormProps): JSX.Element {
    const formRef = useRef<HTMLFormElement>(null)
    const [submitted, setSubmitted] = useState(false)
    const [schoolTouched, setSchoolTouched] = useState(false)
    const posthog = usePostHog()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (submitted) return
        const form = formRef.current
        const nameInput = form?.elements.namedItem('name') as HTMLInputElement | null
        const emailInput = form?.elements.namedItem('email') as HTMLInputElement | null
        const pitchInput = form?.elements.namedItem('pitch') as HTMLTextAreaElement | null

        // The school dropdown isn't a native form control, so validate it by hand.
        if (!school) {
            setSchoolTouched(true)
            return
        }

        if (emailInput && emailInput.value) {
            posthog?.capture('student_mixer_application', {
                name: nameInput?.value,
                email: emailInput.value,
                school,
                pitch: pitchInput?.value,
            })
            form?.reset()
            setSubmitted(true)
        }
    }

    return (
        <form ref={formRef} onSubmit={handleSubmit} className="not-prose">
            <div className="mx-auto max-w-[700px] space-y-4 rounded-md border border-primary bg-primary p-6 shadow-sm transition-all">
                {!submitted ? (
                    <>
                        <Input label="Your name" name="name" type="text" direction="column" required />
                        <Input
                            label="Your school email"
                            name="email"
                            type="email"
                            direction="column"
                            description="A .edu or other university-associated domain"
                            required
                        />
                        <OSSelect
                            label="Your school or university"
                            direction="column"
                            required
                            placeholder="Select your school..."
                            searchPlaceholder="Search schools..."
                            options={schoolOptions}
                            value={school}
                            onChange={(value) => {
                                setSchool(value)
                                setSchoolTouched(true)
                            }}
                            touched={schoolTouched}
                            error={schoolTouched && !school ? 'Please pick your school' : undefined}
                        />
                        <Textarea
                            label={`Tell us about ${campusTarget} and the event you'd run`}
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

// The two events we run each semester, rendered as a card grid. "On campus"/"Remote" here are
// delivery-mode labels, so they stay generic even when a school is selected.
const semesterEvents: { Icon: IconComponent; color: string; when: string; title: string; copy: string }[] = [
    {
        Icon: IconConfetti,
        color: 'text-orange',
        when: 'On campus',
        title: 'In-person mixer',
        copy: 'A PostHog team member gives a talk on a specific topic about building AI tools, shipping product, or starting a company. Food, drinks, and merch on us.',
    },
    {
        Icon: IconGraduationCap,
        color: 'text-blue',
        when: 'On campus or Remote',
        title: 'Ask us anything',
        copy: 'Gather your group for an AMA with us. It can cover anything from career advice to demos. Whatever is most useful for you.',
    },
]

export default function StudentProgram(): JSX.Element {
    const [school, setSchool] = useState('')
    // A real school is picked (not "Other"); null means fall back to the generic "campus" wording.
    const selectedSchool = school && school !== OTHER ? school : null
    // Bare noun ("a Stanford club", "each Stanford event"); falls back to "campus".
    const campus = selectedSchool || 'campus'
    // Possessive-style target ("Bring PostHog to Stanford"); falls back to "your campus".
    const campusTarget = selectedSchool || 'your campus'

    const heroBullets = [
        'In-person mixers each semester with a PostHog team member',
        'Talks, Q&A, and 1:1 mentorship on building products and companies',
        `$2,000 in cash and merch to run a ${campus} event`,
    ]

    const steps = [
        // Eligibility scope – stays generic even when a school is selected.
        "You're a Bay Area or a University of California student",
        `You or your student org apply to host an event`,
        'We pair you with a PostHog team member and schedule your event',
        'We cover food and merch, you bring the builders',
    ]

    return (
        <>
            <SEO
                title="PostHog for Students | Events for people who want to build"
                description="A series of on-campus mixers and remote check-ins with the PostHog team. Learn how products and companies actually get built, and meet the people building them. Open to Bay Area universities and every UC campus in California."
                image="/images/og/default.png"
                structuredData={buildProductStructuredData({
                    name: 'PostHog for Students',
                    description:
                        'A curated series of on-campus events and remote check-ins with the PostHog team, focused on teaching students how to build products and companies – and connecting them with other builders.',
                    slug: 'students',
                    faq: faqStructuredData,
                })}
            />
            <ReaderView hideLeftSidebar showQuestions={false} title="students.md" hideTitle>
                {/* Centered column, same as /startups – the reader renders this page full-width otherwise */}
                <div className="max-w-4xl mx-auto">
                    <section className="not-prose w-full tracking-[-0.0125em]">
                        <p className="!m-0 mb-2 text-sm font-bold text-secondary">PostHog for Students</p>
                        <h1 className="!mt-0 mb-4 text-xl font-bold leading-tight @xl/reader-content:mb-8 @xl/reader-content:text-3xl">
                            Curated events for the builders{' '}
                            <RoughAnnotation
                                type="highlight"
                                color="rgba(48, 164, 108, 0.2)"
                                strokeWidth={1}
                                padding={2}
                                delay={300}
                                show
                            >
                                {selectedSchool ? `at ${selectedSchool}` : 'on campus'}
                            </RoughAnnotation>
                            {'*'}
                        </h1>

                        {/* Text takes the flexible column; the illustration gets a fixed slot */}
                        <div className="flex flex-col items-start gap-6 @2xl/reader-content:flex-row @2xl/reader-content:gap-8">
                            <div className="min-w-0 @2xl/reader-content:flex-1 max-w-2xl">
                                <p className="mt-0 mb-4">
                                    PostHog for Students brings our team <em>(and special guests)</em> to {campusTarget}{' '}
                                    for talks, mixers, and networking. Learn how products and companies are{' '}
                                    <em>built</em> and connect with the people behind them.
                                </p>
                                <ul className="mb-4 list-none space-y-0.5 p-0 text-[15px]">
                                    {heroBullets.map((item) => (
                                        <li key={item} className="relative pl-5">
                                            <IconCheck className="absolute left-0 top-1 size-4 text-green" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex flex-col items-start gap-2">
                                    <CallToAction to="#campus" size="sm">
                                        Bring PostHog to {campusTarget}
                                    </CallToAction>
                                    <span className="text-xs text-secondary italic">
                                        * Currently Bay Area universities and UC campuses across California
                                    </span>
                                </div>
                            </div>

                            <div className="w-full flex justify-center self-center @2xl/reader-content:w-auto @2xl/reader-content:flex-[0_0_240px] @4xl/reader-content:flex-[0_0_300px]">
                                <HedgehogPartyHog
                                    title="A hedgehog at a party"
                                    className="w-full max-w-[240px] @2xl/reader-content:max-w-none"
                                />
                            </div>
                        </div>
                    </section>
                    <hr className="border-t border-primary m-0 mb-6 mt-8" />

                    <div className="not-prose grid grid-cols-2 @2xl/reader-content:grid-cols-4 gap-3 my-6">
                        {steps.map((step, i) => (
                            <div key={step} className="border border-primary rounded-md bg-primary p-4">
                                <div className="flex size-8 items-center justify-center rounded-full bg-accent font-bold text-primary">
                                    {i + 1}
                                </div>
                                <p className="m-0 mt-3 text-sm text-secondary">{step}</p>
                            </div>
                        ))}
                    </div>

                    <h3>
                        What we bring <Highlight>to campus</Highlight>
                    </h3>
                    <p>
                        PostHog for Students isn't a limp online course ending in a LinkedIn certificate nobody cares
                        about. It's a curated series of IRL events we'll help you run on {campus}, in partnership with a
                        club or student org, unique to your interests. Each semester we'll bring PostHog team members to
                        talk about building products and companies, then follow up for a Q&A later in the semester. It's
                        about learning how things actually get built and meeting the people who do the building.
                    </p>
                    <div className="not-prose grid @md/reader-content:grid-cols-2 gap-4 my-6">
                        {semesterEvents.map(({ Icon, color, when, title, copy }) => (
                            <div key={title} className="border border-primary rounded-md bg-primary p-4">
                                <Icon className={`size-6 ${color}`} />
                                <p className="m-0 mt-2 text-xs font-bold uppercase tracking-wide text-secondary">
                                    {when}
                                </p>
                                <p className="m-0 mt-1 text-base font-bold text-primary">{title}</p>
                                <p className="m-0 mt-1 text-sm text-secondary">{copy}</p>
                            </div>
                        ))}
                    </div>

                    {/* Startup School callout – bordered accent card, matching the /startups CTA blocks. */}
                    <div
                        id="startup-school"
                        className="not-prose bg-accent border border-primary rounded-md p-4 @md/reader-content:p-6 my-6"
                    >
                        <h3 className="mt-0 mb-2 flex items-center gap-2.5 text-2xl font-bold">
                            <IconGraduationCap className="size-7 shrink-0 text-red dark:text-yellow" />
                            Get invited to Startup School
                        </h3>
                        <p className="m-0">
                            A few times a year we bring students together in SF at Hogpatch, our space normally reserved
                            for YC founders. Want in?{' '}
                            <Link className="text-red dark:text-yellow" href="#campus">
                                Apply below.
                            </Link>
                        </p>
                    </div>

                    <h3 id="campus">
                        Bring PostHog to{' '}
                        {selectedSchool ? (
                            <Highlight>{selectedSchool}</Highlight>
                        ) : (
                            <>
                                your <Highlight>campus</Highlight>
                            </>
                        )}
                    </h3>
                    <div className="flex flex-col items-start gap-6 @2xl/reader-content:flex-row @2xl/reader-content:gap-8">
                        <div className="min-w-0 @2xl/reader-content:flex-1">
                            <p className="mt-0">
                                We love meeting students when we can. Host our events for the builders at your school
                                and we'll back you: a <strong>$1,000 cash grant</strong> for food and drinks,{' '}
                                <strong>$1,000 in PostHog merch</strong> to give away, and a PostHog team member to
                                speak and hang out.
                            </p>
                            <p>
                                The best organizers usually already run something. A CS club, a founder community, an AI
                                society, hackathons. Sound like you?{' '}
                                <Link className="text-red dark:text-yellow" href="#campus">
                                    Apply below
                                </Link>{' '}
                                and tell us what you'd put on.
                            </p>
                        </div>
                        <div className="hidden @2xl/reader-content:flex @2xl/reader-content:flex-[0_0_200px] justify-center self-center">
                            <HedgehogCodingGroup
                                title="A group of hedgehogs coding together"
                                className="w-full max-w-[200px]"
                            />
                        </div>
                    </div>
                    <div className="my-6">
                        <CampusMixerForm school={school} setSchool={setSchool} campusTarget={campusTarget} />
                    </div>

                    <h3>FAQ</h3>
                    <div className="not-prose mt-4">
                        <Accordion
                            type="multiple"
                            triggerClassName="!px-3 !py-2"
                            contentClassName="!px-3 !py-2.5 !text-base !leading-relaxed"
                            items={faqItems}
                        />
                    </div>
                </div>
            </ReaderView>
        </>
    )
}
