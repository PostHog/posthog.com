import cntl from 'cntl'
import Layout from 'components/Layout'
import React, { useEffect, useState } from 'react'
import SEO from 'components/seo'
import Link from 'components/Link'
import Tooltip from 'components/Tooltip'
import { LinkedIn, Twitter, YouTube } from 'components/Icons'
import { StaticImage } from 'gatsby-plugin-image'
import { IconArrowRightDown } from '@posthog/icons'
import { sexyLegalMenu } from '../navs'
import Lawyers from 'components/Lawyers'
import { Tweet } from 'components/Tweet'

const termsClasses = cntl`
  full-terms
  grid
  grid-cols-1
  @2xl:grid-cols-2
  max-w-6xl
  px-4
  lg:px-8
  mx-auto
  mt-12
  [&div]:p-4
  [&>div:nth-child(even)]:relative
  [&>div:nth-child(even)]:before:relative
  @2xl:[&>div:nth-child(even)]:before:hidden
  [&>div:nth-child(even)]:before:text-sm
  [&>div:nth-child(even)]:before:-top-2
  [&>div:nth-child(even)]:before:pb-2
  [&>div:nth-child(even)]:before:opacity-60
  [&>div:nth-child(even)]:before:uppercase
  [&>div:nth-child(even)]:before:font-bold
  [&>div:nth-child(even)]:before:content-['What_it_means']
  [&>div:nth-child(even)>p]:border-l-4
  @2xl:[&>div:nth-child(even)>p]:border-l-0
  [&>div:nth-child(even)>p]:border-primary
  [&>div:nth-child(even)>p]:pl-3
  [&>div:nth-child(even)>ul]:border-l-4
  @2xl:[&>div:nth-child(even)>ul]:border-l-0
  [&>div:nth-child(even)>ul]:border-primary
  [&>div:nth-child(even)>ul]:pl-3
  [&>div>h2]:mt-2
  [&>div:nth-child(even)_li]:ml-4
  @2xl:[&>div:nth-child(even)]:border-l
  [&>div:nth-child(odd)]:pr-8
  @2xl:[&>div:nth-child(even)>p]:pl-0
  @2xl:[&>div:nth-child(even)]:pl-8
  @2xl:[&>div:nth-child(even)]:border-primary
  [&>div:nth-child(odd)_p]:text-[15px]
  [&>div:nth-child(even)>p]:text-lg
`

const sectionAnchors: Record<string, string> = {
    '1': 'license',
    '1.1': 'section-1-1',
    '1.2': 'license',
    '2': 'restrictions',
    '2.1': 'section-2-1',
    '2.2': 'restrictions',
    '2.3': 'restrictions',
    '3': 'confidentiality',
    '3.1': 'confidentiality',
    '3.2': 'section-3-2',
    '3.3': 'confidentiality',
    '3.4': 'confidentiality',
    '3.5': 'confidentiality',
    '3.6': 'confidentiality',
    '4': 'ip',
    '4.1': 'ip',
    '4.2': 'ip',
    '4.3': 'ip',
    '4.4': 'section-4-4',
    '4.5': 'section-4-5',
    '5': 'models',
    '5.1': 'models',
    '5.2': 'models',
    '6': 'payment',
    '6.1': 'payment',
    '6.2': 'section-6-2',
    '6.3': 'section-6-3',
    '6.4': 'payment',
    '7': 'termination',
    '7.1': 'section-7-1',
    '7.2': 'section-7-2',
    '7.3': 'termination',
    '7.4': 'termination',
    '8': 'warranty',
    '9': 'disclaimer',
    '10': 'liability',
    '11': 'government',
    '12': 'misc',
    '13': 'privacy',
    '14': 'sla',
}

function SectionLink({ section, label }: { section: string; label?: string }) {
    const anchor = sectionAnchors[section]
    const display = label ?? `Section ${section}`
    if (!anchor) return <>{display}</>
    return (
        <a
            href={`#${anchor}`}
            className="underline underline-offset-2 font-normal cursor-pointer hover:opacity-70"
            onClick={(e) => {
                e.preventDefault()
                document.querySelector(`#${anchor}`)?.scrollIntoView({ behavior: 'smooth' })
            }}
        >
            {display}
        </a>
    )
}

function Terms() {
    const [headers, setHeaders] = useState<HTMLElement[]>([])

    useEffect(() => {
        const fullTerms = document.querySelector('.full-terms')
        if (fullTerms) {
            const h2s = fullTerms.querySelectorAll(':nth-child(odd) h2')
            setHeaders(Array.from(h2s) as HTMLElement[])
        }
    }, [])

    return (
        <Layout
            parent={sexyLegalMenu}
            activeInternalMenu={sexyLegalMenu.children.find(({ name }) => name.toLowerCase() === 'terms')}
        >
            <SEO title="Terms, PostHog style" description="Terms, PostHog style" image={`/images/og/terms.png`} />
            <div className="prose dark:prose-invert">
                <div className="@container/legal-content max-w-2xl mx-auto py-4 @2xl:py-8">
                    <h1 className="text-5xl text-center">
                        Terms,{' '}
                        <span className="whitespace-nowrap text-red dark:text-yellow">
                            <em>PostHog style</em>
                        </span>
                    </h1>

                    <h2 className="text-center text-balance mt-0">
                        The internet has wrecked our attention span.
                        <br />
                        <em className="text-xs font-normal">(Thanks, Zuck!)</em>
                    </h2>

                    <p className="text-center">
                        Long paragraphs are boring. So we've summarized our terms for you. Here's the gist in a familiar
                        format you can probably skim while driving. (Or 💩.)
                    </p>

                    <h3 className="text-2xl pt-8 text-center">Summary of our terms</h3>

                    <p className="bg-white dark:bg-accent-dark p-8 rounded font-serif mb-8 border-2 border-red dark:border-yellow shadow-xl">
                        <span className="text-xl">
                            <strong>Semi-important legal notice</strong> from{' '}
                            <Tooltip content={() => <Lawyers />} placement="bottom" className="[&_button]:cursor-auto">
                                <span className="border-b border-dashed border-primary inline-block !leading-tight">
                                    our over-zealous legal team
                                </span>
                            </Tooltip>
                            :
                        </span>
                        <span className="text-xs mt-2 md:mt-0 mb-4 block">
                            (Serif font demonstrates how important this disclaimer is)
                        </span>
                        The following is not legally binding. It is a summary of PostHog's terms. Please read{' '}
                        <button
                            onClick={() => {
                                const el = document.querySelector('#full-terms')
                                if (!el) return
                                el.scrollIntoView({ behavior: 'smooth' })
                            }}
                            className="cursor-pointer hover:underline"
                        >
                            the full terms of service
                        </button>{' '}
                        and don't rely on 140 characters of "terms" at a time.
                    </p>

                    <Tweet
                        className="mx-auto"
                        alertMessage="Gen Z? Don't get distracted. You're here to read our thrilling terms."
                    >
                        When you join PostHog Cloud, you’re agreeing to our terms. If you’re signing up for your
                        company, make sure your boss is okay with it.
                    </Tweet>

                    <Tweet
                        className="mx-auto"
                        alertMessage="Gen Z? Don't get distracted. You're here to read our thrilling terms."
                    >
                        We love it when you contribute to improving PostHog, but any changes you make belong to us.
                    </Tweet>

                    <Tweet
                        className="mx-auto"
                        alertMessage="Gen Z? Don't get distracted. You're here to read our thrilling terms."
                    >
                        Use our tool properly and follow the rules. No sneaky stuff like hacking, or spreading viruses.
                    </Tweet>

                    <Tweet
                        className="mx-auto"
                        alertMessage="Gen Z? Don't get distracted. You're here to read our thrilling terms."
                    >
                        Here's a cat gif to keep you engaged (and to keep the algos intrigued). Please like/RT.
                        <img src="/images/pizza-cat.gif" alt="Cat gif" className="w-full mt-2" />
                        <span className="text-right !-mb-4 block">
                            <Link
                                href="https://giphy.com/gifs/cat-pizza-crazy-3o7TKJwsoLn5QAmqw8"
                                externalNoIcon
                                className="font-normal text-xs text-muted"
                            >
                                Thanks, Giphy!
                            </Link>
                        </span>
                    </Tweet>

                    <Tweet
                        className="mx-auto"
                        alertMessage="Gen Z? Don't get distracted. You're here to read our thrilling terms."
                    >
                        Both of us (you and PostHog) need to keep each other’s secrets safe. We can share general info
                        about how our tool is used, but we’ll never share secrets without asking you first.
                    </Tweet>

                    <Tweet
                        className="mx-auto"
                        alertMessage="Gen Z? Don't get distracted. You're here to read our thrilling terms."
                    >
                        We keep all the rights to our tool and any ideas you give us. Don’t remove any of our labels or
                        notices from it.
                    </Tweet>

                    <Tweet
                        className="mx-auto"
                        alertMessage="Gen Z? Don't get distracted. You're here to read our thrilling terms."
                    >
                        If you use more than you paid for, there will be extra charges. Not paying can stop the service,
                        and you’re responsible for any taxes.
                    </Tweet>

                    <Tweet
                        className="mx-auto"
                        alertMessage="Gen Z? Don't get distracted. You're here to read our thrilling terms."
                    >
                        If you liked this summary, you'll love following me on{' '}
                        <Link
                            href="https://twitter.com/james406"
                            externalNoIcon
                            className="text-primary dark:text-primary-dark inline-block"
                        >
                            <Twitter className="w-5 h-5 box-border fill-current" />
                        </Link>
                    </Tweet>
                </div>

                <h2 id="full-terms" className="text-[2.5rem] mb-4 md:mb-8 px-4 md:text-center">
                    The full <span className="text-red dark:text-yellow">(but still easy to understand)</span> terms
                </h2>

                <div className="max-w-2xl mx-auto">
                    <p className="">For your sanity, we've summarized each paragraph of legalese with plain English.</p>
                    <p className=" text-secondary">
                        (This was inspired by{' '}
                        <Link href="https://500px.com/terms" externalNoIcon>
                            500px
                        </Link>{' '}
                        who did it first and deserve full credit! We tried to do it better but we couldn't.)
                    </p>
                    <p className="">
                        You probably realize this, but the summaries{' '}
                        <span className="md:hidden">
                            below each section in blockquotes (under the <em>"What it means</em> subheaders)
                        </span>
                        <span className="hidden md:inline-block">in the right-hand column</span> exist solely to aid
                        your comprehension and alleviate boredom. They're not legally binding.
                    </p>
                    <p className="">
                        Should you wish to be legally bound to us, please stick with the <em>actual</em> terms{' '}
                        <span className="md:hidden">
                            which is everything <em>not in blockquotes</em>
                        </span>
                        <span className="hidden md:inline-block">in the left column</span>.
                    </p>
                    <p className=" text-secondary">(Can you believe we actually had to clarify this?)</p>
                </div>

                <div className="pt-4">
                    <ol
                        data-scheme="primary"
                        className="table-of-contents not-prose max-w-2xl mx-auto bg-accent border border-primary rounded py-8 px-4 md:px-8 list-none flex flex-col gap-1 md:gap-2"
                    >
                        <li className="text-sm opacity-70">Table of contents</li>
                        {headers.map((header, index) => (
                            <li key={index}>
                                <button
                                    className="group cursor-pointer text-sm md:text-base font-semibold hover:underline block p-1"
                                    onClick={() => {
                                        const el = document.querySelector(`#${header.id}`)
                                        if (!el) return
                                        el.scrollIntoView({ behavior: 'smooth' })
                                    }}
                                >
                                    {header.innerText}
                                    <IconArrowRightDown className="size-4 inline-block ml-1 opacity-30 group-hover:opacity-100 dark:group-hover:opacity-70 text-primary dark:text-primary-dark" />
                                </button>
                            </li>
                        ))}
                    </ol>
                </div>

                <div className={`${termsClasses}`}>
                    <div>
                        <h2 id="intro" className="mb-1 text-4xl">
                            The full Terms of Service
                        </h2>
                        <p className="text-sm opacity-75 md:hidden">
                            (with handy summaries at the end of each section)
                        </p>
                    </div>
                    <div className="hidden md:block">
                        <h3 className="hidden md:block">What it means</h3>
                    </div>
                    <div>
                        <p>
                            These PostHog Terms of Service (the "<b>Terms of Service</b>", "<b>Terms</b>" or "
                            <b>Agreement</b>") apply to any Customer (as defined below) accessing or using PostHog
                            cloud-based software, products or services ("<b>PostHog Cloud</b>"). Separate terms for
                            users of PostHog Free and Open Source Software ("<b>PostHog FOSS</b>") can be found
                            here:&nbsp;
                            <Link href="https://github.com/PostHog/posthog-foss/blob/master/LICENSE" externalNoIcon>
                                https://github.com/PostHog/posthog-foss/blob/master/LICENSE
                            </Link>
                            .
                        </p>
                        <p>
                            By signing up to, creating an account, using or otherwise accessing PostHog Cloud, you and
                            any entity that you represent ("<b>Customer</b>", "<b>you</b>" or "<b>your</b>") are
                            unconditionally consenting to be bound by and are becoming a party to these Terms of Service
                            as of the date of your first signup, account creation, use, download or other acceptance
                            (the "<b>Effective Date</b>") of the Licensed Materials (as defined below) provided by
                            PostHog Inc. or one of its Affiliates (collectively, "<b>PostHog</b>", "<b>us</b>", "
                            <b>we</b>" or "<b>our</b>"), on a free or pay-as-you-go basis, or in accordance with and
                            pursuant to one or more order forms, quotes or other ordering documents referencing these
                            Terms (each an "<b>Order Form</b>").&nbsp;
                        </p>
                        <p>
                            These Terms may be updated from time to time at our discretion. Subject to the terms herein,
                            Customer’s use or continued use of the Licensed Materials also constitutes Customer’s
                            ongoing and continued assent to the terms of this Agreement. If you do not accept this
                            Agreement, and/or any related modifications or new terms as may be updated from time to
                            time, please refrain from accessing or using PostHog Cloud or the Licensed Materials.&nbsp;
                        </p>
                        <p>
                            If these Terms are considered an offer, acceptance is expressly limited to these Terms. If
                            you are executing, entering into or otherwise accepting the terms of this Agreement on
                            behalf of a company, organization, or other legal entity (each, an "<b>Entity</b>"), you
                            hereby represent that you have full legal authority to bind that Entity to this Agreement
                            and all references to "you" and "your" and related language in these Terms will refer to
                            that Entity, unless we indicate otherwise.
                        </p>
                    </div>
                    <div>
                        <p className="mb-2">
                            By signing into or using PostHog, you agree to all these terms. That includes anyone signing
                            up on behalf of a company - so if you're doing this for your employer, make sure you
                            actually have the authority to do that.
                        </p>
                        <p>
                            We may update these terms occasionally. If you keep using PostHog after an update, that
                            counts as agreeing to the new version.
                        </p>
                        <p className="!text-base text-opacity-80">
                            {' '}
                            (See our&nbsp;
                            <Link href="https://github.com/PostHog/posthog-foss/blob/master/LICENSE" external>
                                separate terms
                            </Link>
                            &nbsp;if you’re self-hosting the open source edition.)
                        </p>
                    </div>
                    <div>
                        <h2 id="license">1. License and support</h2>
                        <p id="section-1-1">
                            1.1 Subject to the terms and conditions of this Agreement (including, any and all payment
                            obligations), PostHog hereby grants to Customer and its Affiliates (as defined below) a
                            limited, non-exclusive, non-transferable, non-sublicensable and revocable (as provided
                            herein) right for Customer, its Affiliates, and their Users (as defined below) to (a)
                            internally (i) use, reproduce, modify, prepare derivative works based upon, and display the
                            code of PostHog Cloud at the plan type and/or tier level selected by Customer (or as
                            specified in an applicable Order Form), in accordance with the specifications and guidance
                            generally promulgated by PostHog from time to time (the "<b>Software</b>"), solely (x) for
                            its internal use in connection with the development of Customer’s and/or its Affiliates’ own
                            software, and (y) at the level of usage for which Customer has paid PostHog; and (ii) use
                            the documentation, training materials or other materials, products or services supplied or
                            provided by PostHog (the "<b>Other PostHog Materials</b>"); and (b) modify the Software and
                            publish patches to the Software, solely at the level of usage for which Customer has paid
                            PostHog. Notwithstanding anything to the contrary, Customer agrees that PostHog and/or its
                            licensors (as applicable) shall retain all right, title and interest in and to all Software
                            incorporated in such modifications and/or patches, and all such Software may only be used,
                            copied, modified, displayed, distributed, or otherwise exploited in full compliance with
                            this Agreement, and with a valid PostHog Cloud subscription for the correct level of
                            usage.&nbsp;
                        </p>
                        <p>
                            The Software and Other PostHog Materials are collectively referred to herein as the "
                            <b>Licensed Materials</b>". As used herein, "<b>Affiliate</b>" means any entity that
                            directly or indirectly controls, is controlled by, and/or is under common control with the
                            subject entity, where "control" means the ownership or control of more than fifty percent
                            (50%) of the voting interests in such subject entity. "<b>User</b>" means each individual
                            end user (person or machine) of Customer and/or its Affiliates (including, without
                            limitation, employees, agents or consultants thereof) with access to the Licensed Materials
                            hereunder.
                        </p>
                    </div>
                    <div className="md:pt-10">
                        <p>
                            You can use PostHog with the features defined in your chosen plan. You can also use our docs
                            and tutorials to help you.
                        </p>
                        <p>
                            You can make pull requests on GitHub to help us make changes, but we own the rights to any
                            modifications.
                        </p>
                        <p>
                            We will also continue to improve the product and make changes that enhance your experience
                            as a user.&nbsp;
                        </p>
                    </div>
                    <div>
                        <p>
                            1.2 Subject to this Agreement, PostHog will provide reasonable support to Customer for the
                            Licensed Materials as set forth on the 'Support options' page and in accordance with the
                            plan selected by and paid for by Customer, or as otherwise specified in an applicable Order
                            Form.&nbsp;
                        </p>
                        <p>
                            Notwithstanding anything to the contrary, in the event that Customer does not reasonably
                            comply with written specifications or instructions from PostHog’s service engineers
                            regarding any support issue or request (including without limitation, maintaining
                            appropriate backups of Customer’s Licensed Materials) (each, a "<b>Support Issue</b>"),
                            PostHog may terminate or suspend its support obligations to Customer with respect to such
                            Support Issue upon fifteen (15) days’ written notice if Customer does not cure such
                            noncompliance within such notice period.&nbsp;
                        </p>
                        <p>
                            PostHog will use commercially reasonable efforts to respond to support inquiries submitted
                            via Slack, email or in-app chat. The number of support questions is not limited, provided
                            that Customer’s use of support is reasonable and consistent with the intended use of the
                            support channels.&nbsp;
                        </p>
                    </div>
                    <div>
                        <p>We’ll provide support as outlined in your product plan.</p>
                        <p>
                            We can close a support ticket if you fail to respond to a request from one of our engineers
                            within 15 days.
                        </p>
                        <p>
                            We will aim to answer your questions as fast as we can, using a few different
                            channels.&nbsp;
                        </p>
                    </div>
                    <div>
                        <h2 id="restrictions">2. Restrictions and responsibilities</h2>
                        <p id="section-2-1">
                            2.1 Customer and its Affiliates will not, and will not permit any third party to: (a) use
                            the Licensed Materials for any purpose other than as specifically authorized in{' '}
                            <SectionLink section="1.1" /> or in such a manner that would enable any unlicensed entity,
                            individual or person to access the Licensed Materials; (b) use the Licensed Materials or any
                            other PostHog software for timesharing, service bureau, managed service, or similar
                            purposes, or otherwise make the Licensed Materials available to any third party other than
                            Users, including without limitation, by selling, reselling, sublicensing, distributing,
                            leasing or otherwise commercially exploiting the Licensed Materials; (c) remove, obscure, or
                            alter any copyright, trademark, or other proprietary notices contained in or on the Licensed
                            Materials; (d) access or use the Licensed Materials in a manner intended to circumvent or
                            exceed any usage limits, service capacity limits, account limitations, or other restrictions
                            applicable to Customer’s subscription or Order Form; (e) access or use the Licensed
                            Materials to interfere with, disrupt, or attempt to gain unauthorized access to any systems,
                            networks, accounts, or data of PostHog or any third party, including by attempting to
                            circumvent authentication or security mechanisms; (f) use the Licensed Materials to store,
                            transmit, or distribute any content or material that (i) infringes or violates the
                            intellectual property or other rights of any third party, (ii) is unlawful, harmful,
                            fraudulent, deceptive, threatening, abusive, harassing, tortious, defamatory, vulgar,
                            obscene, libelous or otherwise objectionable or (iii) contains any virus, trojan horse,
                            worm, time bomb, unsolicited bulk commercial, or "spam" message, malware, or other harmful
                            code, file or program (including without limitation, password guessing programs, decoders,
                            password gatherers, keystroke loggers, cracking tools, packet sniffers, and/or encryption
                            circumvention programs) designed to interrupt, damage, or limit the functionality of any
                            software, hardware, or telecommunications equipment; (g) use the Licensed Materials in
                            violation of any applicable laws or regulations, including without limitation laws relating
                            to privacy, data protection, export controls, consumer and child protection, obscenity or
                            defamation, intellectual property, or the transmission of technical or personal data; (h)
                            access or use the Licensed Materials from jurisdictions subject to comprehensive U.S. export
                            embargoes or in violation of applicable export control or sanctions laws; (i) use the
                            Licensed Materials for the purpose of monitoring their availability, performance, or
                            functionality for benchmarking or competitive analysis, or publicly disclose the results of
                            any benchmarking or performance testing of the Licensed Materials without PostHog’s prior
                            written consent; (j) impersonate any person or entity, including any employee or
                            representative of PostHog, or misrepresent Customer’s affiliation with any person or entity;
                            or (k) use the Licensed Materials in connection with any high-risk or strict liability
                            activity in which the failure of the Licensed Materials could lead to death, personal
                            injury, or severe environmental damage (including, without limitation, space travel,
                            firefighting, police operations, power plant operation, military operations, air traffic
                            control, rescue operations, emergency medical services, hospitals, life-support systems or
                            similar activities). Customer is responsible for all activity conducted under its accounts
                            and for ensuring that its Affiliates and Users comply with the restrictions set forth in
                            this <SectionLink section="2.1" />.
                        </p>
                    </div>
                    <div className="md:pt-10">
                        <p className="mb-0 pb-2">
                            <strong>You can’t:</strong>
                        </p>
                        <ul className="pb-4 [&_p]:mb-0">
                            <li>
                                <p>Let other companies use your PostHog instance.</p>
                            </li>
                            <li>
                                <p>Try to exceed your plan’s usage limits or account restrictions.</p>
                            </li>
                            <li>
                                <p>Use PostHog for some things, like military operations or policing.</p>
                            </li>
                            <li>
                                <p>Use PostHog in the space rocket you’re building.</p>
                            </li>
                            <li>
                                <p>
                                    Use PostHog to do anything illegal or harmful to other people, including storing or
                                    spreading malware, spam, or infringing content.
                                </p>
                            </li>
                            <li>
                                <p>Pretend to be somebody else, including a PostHog employee.</p>
                            </li>
                            <li>
                                <p>Try to hack PostHog, or use PostHog to do bad internet things.</p>
                            </li>
                            <li>
                                <p>Use PostHog from a country subject to U.S. sanctions.</p>
                            </li>
                            <li>
                                <p>Publish benchmarking results about PostHog without our permission.</p>
                            </li>
                        </ul>
                        <p>
                            Basically, (i) don’t use PostHog to be a jerk, or do anything dangerous and (ii) if you
                            build a space rocket and use PostHog, it’s not our fault if it crashes.
                        </p>
                    </div>
                    <div>
                        <p>
                            2.2 Customer will cooperate with PostHog in connection with PostHog’s provision of the
                            Licensed Materials under this Agreement by making available such personnel and information
                            as may be reasonably required, and taking such other actions as PostHog may reasonably
                            request. Customer will also cooperate with PostHog in establishing passwords or other
                            authentication procedures reasonably designed to ensure that only authorized Users of
                            Customer have access to any administrative functions of the Licensed Materials.&nbsp;
                        </p>
                        <p>
                            Customer shall maintain during the term of this Agreement and through the end of the third
                            year after the date on which the final payment is made under this Agreement or an applicable
                            Order Form, books, records, contracts, and accounts relating to the payments paid or payable
                            to PostHog under this Agreement or an applicable Order Form (collectively, the "
                            <b>Customer Records</b>"). PostHog may, at its sole expense, upon thirty (30) days’ prior
                            written notice to Customer and during Customer’s normal business hours and subject to
                            industry-standard confidentiality obligations, hire an independent third party auditor to
                            audit the Customer Records only to verify the amounts paid or payable under this Agreement
                            or an applicable Order Form. If an audit reveals underpayment, then Customer shall promptly
                            pay the deficiency to PostHog plus late fees in accordance with{' '}
                            <SectionLink section="6.2" />. PostHog shall bear the cost of an audit unless the audit
                            reveals underpayment by more than 5% for the audited period, in which case Customer shall
                            promptly pay PostHog for the reasonable costs of the audit.
                        </p>
                    </div>
                    <div>
                        <p>You need to work with us on some things, like creating passwords or answering emails.</p>
                        <p>
                            If we think you’ve done any of the above naughty things, you need to allow us to check on
                            that.
                        </p>
                        <p>We reserve the right to check if you’ve underpaid, and ask you to pay if you have.</p>
                    </div>
                    <div>
                        <p>
                            2.3 Customer is responsible for maintaining the security of Customer’s accounts, passwords
                            (including but not limited to administrative and User passwords) and files, and for all uses
                            and activities occurring under Customer accounts, whether or not authorized by Customer.
                            Customer shall ensure that all Users of Customer’s accounts are authorized by Customer and
                            comply with the terms of this Agreement.
                        </p>
                    </div>
                    <div>
                        <p>
                            You’re responsible for keeping your account secure. That means protecting your passwords and
                            making sure anyone with access to your account is authorized and follows these terms. If
                            something happens under your account, it’s on you, whether you authorized it or not.
                        </p>
                    </div>
                    <div>
                        <h2 id="confidentiality">3. Confidentiality</h2>
                        <p>
                            3.1 Each party (the "<b>Receiving Party</b>") understands that the other party (the "
                            <b>Disclosing Party</b>") has disclosed or may disclose information relating to the
                            Disclosing Party’s technology, products, services, business, operations, or other affairs
                            (collectively, the "<b>Proprietary Information</b>" of the Disclosing Party). Proprietary
                            Information includes any non-public information disclosed in any form or medium that (a) is
                            designated as confidential or proprietary at the time of disclosure or within a reasonable
                            time thereafter, or (b) reasonably should be understood to be confidential given the nature
                            of the information or the circumstances of disclosure. Without limiting the foregoing, the
                            terms and conditions of this Agreement and all Order Forms, the Licensed Materials, and any
                            information relating to the performance or operation of the Licensed Materials constitute
                            PostHog Proprietary Information.
                        </p>
                    </div>
                    <div className="md:pt-10">
                        <p>
                            You might tell us secret stuff you don’t want other people to know, and we might do the same
                            back.&nbsp;
                        </p>
                    </div>
                    <div>
                        <p id="section-3-2">
                            3.2 The Receiving Party agrees: (a) to use the Disclosing Party’s Proprietary Information
                            solely for the purpose of performing its obligations or exercising its rights under this
                            Agreement; (b) not to disclose such Proprietary Information to any third party except to its
                            and its Affiliates’ employees, contractors, consultants, advisors, or agents who have a need
                            to know such information for purposes of this Agreement and who are bound by confidentiality
                            obligations at least as protective as those contained herein; and (c) to take the same
                            security precautions to protect against disclosure or unauthorized use of such Proprietary
                            Information that it uses to protect its own proprietary information of a similar nature, but
                            in no event less than reasonable precautions.&nbsp;
                        </p>
                        <p>
                            The Receiving Party will be responsible for any breach of this <SectionLink section="3.2" />{' '}
                            by its employees, contractors, consultants, advisors, or agents. The Receiving Party will
                            promptly notify the Disclosing Party upon becoming aware of any unauthorized use or
                            disclosure of Proprietary Information and will reasonably cooperate with the Disclosing
                            Party to help regain possession of such Proprietary Information and prevent further
                            unauthorized use or disclosure. The foregoing obligations will not apply with respect to any
                            information that the Receiving Party can document: (w) is or becomes generally available to
                            the public without breach of this Agreement; (x) was in its possession or known by it prior
                            to receipt from the Disclosing Party; (y) was rightfully disclosed to it without restriction
                            by a third party; or (z) was independently developed by the Receiving Party without use of
                            or reference to the Disclosing Party’s Proprietary Information.&nbsp;
                        </p>
                        <p>
                            Nothing in this Agreement will prevent the Receiving Party from disclosing Proprietary
                            Information to the extent required by law, regulation, or court order, provided that, to the
                            extent legally permitted, the Receiving Party gives the Disclosing Party prompt written
                            notice of such requirement and reasonably cooperates with the Disclosing Party’s efforts to
                            seek a protective order or otherwise limit such disclosure. The obligations of this{' '}
                            <SectionLink section="3.2" /> will survive termination or expiration of this Agreement for a
                            period of one (1) year; provided, however, that with respect to Proprietary Information
                            constituting a trade secret under applicable law, such obligations will survive for so long
                            as such information remains a trade secret.
                        </p>
                    </div>
                    <div>
                        <p>
                            We both agree not to tell anybody else about confidential things we share with each other —
                            unless it was already public knowledge to begin with (we all share some stuff on the
                            internet, right?).
                        </p>
                        <p>
                            We should both take reasonable steps to keep each other's secrets safe, and make sure anyone
                            we do share them with (like employees or contractors who need to know) is held to the same
                            standard.
                        </p>
                        <p>
                            If anyone official (like a judge or the government) asks either of us to hand over the
                            other's confidential information, we agree to give the other party a heads up before we
                            share anything, so they have a chance to push back or limit what gets disclosed.
                        </p>
                    </div>
                    <div>
                        <p>
                            3.3 Notwithstanding the foregoing and anything else contained in this{' '}
                            <SectionLink section="3" /> to the contrary, PostHog may collect data with respect to and
                            report on aggregate response rates and other aggregated measures of the Licensed Materials’
                            performance and Customer’s usage of the Licensed Materials; provided that PostHog will not
                            identify Customer as the source of any such data without Customer’s prior written consent.
                            PostHog may also generate aggregated and de-identified data derived from Customer Content in
                            connection with the Product and Model Development activities described in{' '}
                            <SectionLink section="5" /> of this Agreement.&nbsp;
                        </p>
                    </div>
                    <div>
                        <p>
                            We may track and report on how PostHog is performing overall, including things like response
                            rates and usage patterns, but we'll never identify you as the source of that aggregated data
                            without your permission.
                        </p>
                    </div>
                    <div>
                        <p>
                            3.4 For the avoidance of doubt, the use of a third party to host the data collected by
                            PostHog pursuant to this Agreement shall not be deemed a disclosure under this{' '}
                            <SectionLink section="3" />
                            .&nbsp;
                        </p>
                    </div>
                    <div>
                        <p>
                            Hopefully it’s obvious that Jeff Bezos doesn’t count – well, AWS anyway, Jeff’s too busy on
                            a boat to care.&nbsp;
                        </p>
                    </div>
                    <div>
                        <p>
                            3.5 Each party acknowledges and agrees that the other may suffer irreparable damage in the
                            event of a breach of the terms of Sections <SectionLink section="1.1" label="1.1" />,{' '}
                            <SectionLink section="2.1" label="2.1" />, or <SectionLink section="3.2" label="3.2" /> of
                            this Agreement and that such party will be entitled to seek injunctive relief (without the
                            necessity of posting a bond) in the event of any such breach.&nbsp;
                        </p>
                    </div>
                    <div>
                        <p>
                            We both agree that leaking each other’s secrets could cause serious, hard-to-fix damage.
                            That’s why either party can go straight to court to get an injunction to stop a breach.
                        </p>
                    </div>
                    <div>
                        <p>
                            3.6 Both parties will have the right to disclose the existence of the relationship between
                            the parties, but not the terms and conditions of this Agreement or an applicable Order Form,
                            unless such disclosure of the Agreement terms is approved in writing by both parties prior
                            to such disclosure, or is included in a filing required to be made by a party with a
                            governmental authority (provided such party will use reasonable efforts to obtain
                            confidential treatment or a protective order in accordance with{' '}
                            <SectionLink section="3.2" />) or is made on a confidential basis as reasonably necessary to
                            potential investors or acquirers.
                        </p>
                    </div>
                    <div>
                        <p>
                            We can both talk about working with each other, we just can’t share anything secret with
                            others.
                        </p>
                    </div>
                    <div>
                        <h2 id="ip">4. Intellectual property rights</h2>
                        <p>
                            4.1 Except as expressly set forth herein, PostHog alone (and its licensors, where
                            applicable) will retain all right, title and interest in and to the Licensed Materials,
                            Usage Data (as defined below) and Derived Data (as defined below), and any suggestions,
                            ideas, enhancement requests, feedback, code, or other recommendations provided by Customer,
                            its Affiliates, their Users or any third party relating to the Licensed Materials, which are
                            hereby assigned to PostHog. This Agreement is not a sale and does not convey to Customer,
                            its Affiliates or its Users any rights of ownership or other intellectual property rights in
                            or related to the Licensed Materials, or any other intellectual property rights of PostHog.
                        </p>
                    </div>
                    <div className="md:pt-10">
                        <p>Please do not copy PostHog or any of our stuff, pretty please.&nbsp;</p>
                    </div>
                    <div>
                        <p>
                            4.2 Customer shall not remove, alter or obscure any of PostHog’s (or its licensors’)
                            copyright notices, proprietary legends, trademark or service mark attributions, patent
                            markings or other indicia of PostHog’s (or its licensors’) ownership or contribution from
                            the Licensed Materials. Customer agrees to reproduce and include PostHog’s (and its
                            licensors’) proprietary and copyright notices on any copies of the Licensed Materials, or on
                            any portion thereof, including reproduction of the copyright notice. Notwithstanding
                            anything to the contrary herein, certain components of the Licensed Materials, including
                            without limitation, any component of the Licensed Materials distributed by PostHog as part
                            of PostHog FOSS, are licensed by third parties pursuant to their respective third-party
                            licenses, as described in the applicable source code annotations.
                        </p>
                    </div>
                    <div>
                        <p>Please respect our copyright and brand.&nbsp;</p>
                        <p>
                            Oh, and{' '}
                            <strong className="text-gradient bg-[length:180%_100%]">
                                pleeeeeease don’t copy our website.
                            </strong>{' '}
                            We love that you like it, but it is an important part of our brand. If you need help, get in
                            touch and we’ll happily share some advice. &nbsp;🙏
                        </p>
                    </div>
                    <div>
                        <p>
                            4.3 Customer hereby represents and warrants that it has all necessary rights, licenses, and
                            consents, including from its end users where applicable, to provide, upload, store, or
                            otherwise make available any software, information, content, data, or related materials
                            provided by or on behalf of Customer or made available through use of the Licensed Materials
                            (the "<b>Customer Content</b>") and to grant the rights set forth herein. Customer hereby
                            grants PostHog a non-exclusive, worldwide, royalty-free right and license during the term of
                            this Agreement to access, process, store, transmit, and use the Customer Content as
                            reasonably necessary to provide, operate, maintain, support and secure the Licensed
                            Materials and to perform its obligations under this Agreement. Notwithstanding anything else
                            contained in this Agreement to the contrary, PostHog may collect and use technical logs,
                            telemetry, metadata, and other information relating to Customer’s use of the Licensed
                            Materials (the "<b>Usage Data</b>") for any lawful purpose, including operating,
                            maintaining, improving, testing, securing, and supporting the Licensed Materials. Usage Data
                            does not include Customer Content.&nbsp;
                        </p>
                    </div>
                    <div>
                        <p>
                            You confirm that you have the rights to any content you upload or send through PostHog —
                            including any necessary permissions from your own end users. You’re giving us a license to
                            use that content to run and improve the service, but you keep ownership.
                        </p>
                        <p>
                            We’ll also collect technical usage data (like logs and telemetry) to keep things running
                            smoothly. It’s separate from your content and doesn’t identify you.
                        </p>
                    </div>
                    <div>
                        <p id="section-4-4">
                            4.4 If PostHog receives any notice, demand, or claim that any Customer Content, or
                            Customer’s, its Affiliates’ or its Users’ activities hereunder (including without
                            limitation, Customer’s provision, use or distribution of Customer Content), infringe,
                            misappropriate, or otherwise violate the intellectual property or other rights of any third
                            party, or violate any applicable laws or regulations (a "<b>Claim Against PostHog</b>"),
                            Customer will indemnify, defend and hold PostHog and its officers, directors, employees,
                            agents, and Affiliates harmless from and against all losses, liabilities, damages,
                            settlements, judgments, fines, penalties, costs, and expenses (including reasonable
                            attorneys’ fees) arising from such Claim Against PostHog. The indemnification obligations in
                            this <SectionLink section="4.4" /> are conditioned on PostHog providing Customer with prompt
                            written notice of the Claim Against PostHog, reasonable cooperation, and full control over
                            the defense and/or settlement of the Claim Against PostHog, provided that any settlement
                            obligating PostHog to pay money, admit liability, or make any material change to its
                            business requires PostHog’s prior written consent. Subject to the foregoing, PostHog may
                            participate in the defense and/or settlement of any Claim Against PostHog with counsel of
                            its choosing at its own expense.
                        </p>
                    </div>
                    <div>
                        <p>
                            If someone claims that your content or how you’re using PostHog violates their rights or
                            breaks the law, you’ll need to cover PostHog’s costs and handle the defense. We’ll let you
                            know quickly if that happens and give you full control over how it’s resolved, though any
                            settlement that affects PostHog will need our sign-off first.
                        </p>
                    </div>
                    <div>
                        <p id="section-4-5">
                            4.5 PostHog will defend, indemnify and hold Customer and its officers, directors, employees,
                            agents, and Affiliates harmless from and against all losses, liabilities, damages,
                            settlements, judgments, fines, penalties, costs and expenses (including reasonable
                            attorneys’ fees) finally awarded or agreed to in settlement (with the consent of PostHog)
                            arising from any claim that the Licensed Materials, as provided by PostHog and used strictly
                            in accordance with this Agreement, infringe or misappropriate an unaffiliated third party’s
                            intellectual property rights (a "<b>Claim Against Customer</b>"), provided that Customer:
                            (a) provides prompt written notice of the Claim Against Customer to PostHog; (b) provides
                            reasonable assistance at PostHog’s request; (c) gives PostHog sole control over the defense
                            and/or settlement of the Claim Against Customer; and (d) refrains from admitting any
                            liability or otherwise compromising the defense in whole or in part, without the express
                            prior written consent of PostHog. Subject to the foregoing, Customer may participate in the
                            defense and/or settlement of the Claim Against Customer with counsel of its choosing at its
                            own expense. The foregoing indemnification obligations in this <SectionLink section="4.5" />{' '}
                            do not apply to the extent a claim arises from: (i) portions or components of the Licensed
                            Materials not created by PostHog, (ii) modifications made by Customer or any third party
                            after delivery by PostHog, (iii) combination or use of the Licensed Materials with other
                            products, processes, or materials where the alleged infringement relates to such
                            combination, (iv) continued use after notification of alleged infringement or after PostHog
                            provides modifications that would have avoided the alleged infringement; or (v) Customer’s
                            use of the Licensed Materials not strictly in accordance with this Agreement or the related
                            documentation. If the Licensed Materials become, or in PostHog’s reasonable opinion are
                            likely to become, the subject of a Claim Against Customer, PostHog may, at its sole
                            discretion and expense: (x) procure for Customer the right to continue using the Licensed
                            Materials; (y) replace or modify the Licensed Materials so that they become non-infringing
                            while remaining functionally equivalent; or (z) if neither (x) nor (y) is commercially
                            reasonable, terminate Customer’s right to use the affected portion of the Licensed Materials
                            and refund any prepaid, unused fees attributable to such portion. The indemnification
                            obligations set forth in this <SectionLink section="4.5" /> constitute Customer’s sole and
                            exclusive remedy with respect to any third-party claim of intellectual property infringement
                            relating to the Licensed Materials.
                        </p>
                    </div>
                    <div>
                        <p>
                            Think of it as the flip side of 4.4. If someone comes after you claiming PostHog itself
                            violates their rights, we’ve got you covered. Just note that our protection doesn’t extend
                            to problems caused by your own modifications, mixing PostHog with other products, or using
                            it outside the terms of this agreement.
                        </p>
                    </div>
                    <div>
                        <h2 id="models">5. Product and model development</h2>
                        <p>
                            5.1 As used herein, "<b>Product and Model Development</b>" means the development, testing,
                            training, evaluation, and improvement of PostHog products, services, features, analytics
                            systems, and machine learning models. Subject to the terms of this{' '}
                            <SectionLink section="5" />, Customer grants PostHog a non-exclusive, worldwide,
                            royalty-free license to use Customer Content submitted to the Licensed Materials for Product
                            and Model Development. Customer Content may be used for Product and Model Development unless
                            (a) otherwise agreed to between Customer and PostHog or (b) Customer has opted out through
                            the applicable service settings within the Licensed Materials and/or product or services
                            interface; PostHog will honor any such agreement or election on a prospective basis. Use of
                            Customer Content for Product and Model Development is separate from and independent of use
                            to provide the Licensed Materials. Where Customer Content is used for Product and Model
                            Development, PostHog will aggregate or de-identify such data so that it cannot reasonably be
                            used to identify Customer, its Users, or any individual (the "<b>Derived Data</b>"). For the
                            avoidance of doubt, any such agreement or election will apply on a prospective basis only,
                            and PostHog shall have no obligation to modify, retrain, or delete any models, derived
                            outputs or other Derived Data that utilized Customer Content prior to the effective date of
                            such agreement or election, except to the extent required by applicable laws.&nbsp;
                        </p>
                    </div>
                    <div className="md:pt-10">
                        <p>
                            We may use data you upload or generate through your use of PostHog to help improve PostHog’s
                            features and train our own models. Any data we use gets anonymized so it can’t be traced
                            back to you, your users, or any individual. You can opt in or out at any time via the
                            settings in the app (
                            <a
                                href="https://us.posthog.com/settings/organization-details"
                                className="underline underline-offset-2 hover:opacity-70"
                            >
                                US
                            </a>{' '}
                            or{' '}
                            <a
                                href="https://eu.posthog.com/settings/organization-details"
                                className="underline underline-offset-2 hover:opacity-70"
                            >
                                EU
                            </a>
                            ).
                        </p>
                        <p>
                            If you opt out, that applies going forward. We won’t go back and undo any models already
                            trained on your data.
                        </p>
                    </div>
                    <div>
                        <p>
                            5.2 PostHog will not permit third parties to use Customer Content to train their machine
                            learning models. Any use of Customer Content for Product and Model Development will be
                            solely for PostHog’s products, services, and internal models.
                        </p>
                    </div>
                    <div>
                        <p>
                            We’ll never share your data with outside companies to train their models. Anything we use
                            stays internal to PostHog.
                        </p>
                    </div>
                    <div>
                        <h2 id="payment">6. Payment of fees</h2>
                        <p>
                            6.1 Customer will pay PostHog the then-applicable fees for its use of the Licensed Materials
                            (the "<b>Fees</b>") in accordance with PostHog’s then-current pricing and billing policies
                            published at the time of use (the "<b>Pricing Terms</b>"), and, if applicable, as set forth
                            in an Order Form or as otherwise agreed through the services interface. Unless otherwise
                            specified in an Order Form, Fees are based on Customer’s actual usage of the Licensed
                            Materials. Customer may prepay for usage by purchasing credits to be applied against future
                            usage via an Order Form or through the services interface ("<b>Prepaid Credits</b>"), in
                            each case on the terms specified therein. Unless otherwise agreed in writing, Prepaid
                            Credits are non-refundable and expire twelve (12) months from the date of purchase.&nbsp;
                        </p>
                        <p>
                            If Customer’s use of the Licensed Materials exceeds any usage threshold, service capacity,
                            or prepaid credits specified in an Order Form or through the services interface, or
                            otherwise results in additional usage-based Fees, Customer will be billed for such usage and
                            agrees to pay the additional Fees. PostHog may increase Fees or introduce new charges at the
                            end of the Initial Credit Term (as defined below) or any then-current renewal term upon
                            thirty (30) days’ prior notice to Customer, which may be sent via email or through the
                            services interface or otherwise at PostHog's discretion. PostHog may also reduce Fees at any
                            time without notice. If Customer believes that PostHog has billed incorrectly, Customer must
                            notify PostHog no later than sixty (60) days after the closing date on the first billing
                            statement in which the error or problem appeared, in order to receive an adjustment or
                            credit. Billing inquiries should be submitted via an in-app support ticket to PostHog’s
                            customer success team.
                        </p>
                    </div>
                    <div className="md:pt-10">
                        <p>You will pay for using PostHog on time, usually via credit card.</p>
                        <p>
                            You can prepay by purchasing credits, but keep in mind they’re non-refundable and expire
                            after 12 months. If you go over your usage or run out of credits, we’ll bill you for the
                            difference.
                        </p>
                        <p>
                            If we’re going to increase prices, we need to give you 30 days notice, giving you the chance
                            to cancel with us.
                        </p>
                        <p>
                            If we reduce our prices, which does happen (I know, crazy right!) we can do that
                            immediately, so you feel the benefit asap.
                        </p>
                        <p>If you think we’ve billed you incorrectly, let us know within 60 days so we can sort it.</p>
                    </div>
                    <div>
                        <p id="section-6-2">
                            6.2 PostHog may charge Fees using a payment method provided by Customer (such as a credit
                            card) or may issue invoices. If invoiced, full payment for invoices issued in any given
                            month must be received by PostHog according to the payment terms specified in the invoice.
                            Unpaid amounts are subject to a finance charge of 1.5% per month on any outstanding balance,
                            or the maximum permitted by law, whichever is lower, plus all expenses of collection, and
                            may result in immediate termination of access to the Licensed Materials. Customer shall be
                            responsible for all taxes associated with the Licensed Materials other than U.S. taxes based
                            on PostHog’s net income.
                        </p>
                    </div>
                    <div>
                        <p>
                            If you prepay (whether annually or otherwise), we may send an invoice rather than charging
                            your card. Pay on time, because late payments can result in late fees and, in the worst
                            case, losing access to PostHog.
                        </p>
                    </div>
                    <div>
                        <p id="section-6-3">
                            6.3 Our fees do not include any taxes, levies, duties or similar governmental assessments of
                            any nature, including, for example, value-added, sales, GST, use, or withholding taxes,
                            assessable by any jurisdiction whatsoever in relation to your purchases under this Agreement
                            (collectively, the "<b>Taxes</b>"). You are solely responsible for paying all Taxes
                            associated with your purchases hereunder. If we have a legal obligation to pay or collect
                            Taxes for which you are responsible for under this <SectionLink section="6.3" />, we shall
                            invoice you and you shall pay that amount to us unless you provide us with a valid tax
                            exemption certificate authorized by the appropriate taxing authority. We shall calculate
                            applicable Taxes based on your billing address as detailed on the relevant Order Form or
                            Customer account (it is your duty to inform us if Taxes should be assessed on a different
                            address). You shall promptly notify us of any changes to any of your addresses. Taxes shall
                            not be deducted from or set off against the Fees owed to PostHog.
                        </p>
                    </div>
                    <div>
                        <p>
                            All our prices are without sales tax.
                            {/* Hey, terms and conditions can be pretty boring, so
                            well done on reading these thoroughly! As a reward, please&nbsp;
                            <Link href="/merch">claim a free legalhog sticker</Link>&nbsp;from our&nbsp;
                            <Link href="/merch">merch store</Link>. */}
                        </p>
                    </div>
                    <div>
                        <p>
                            6.4 Unless earlier terminated in accordance with this Agreement, this Agreement will
                            continue for the Initial Credit Term specified in the Order Form, or through the services
                            interface ("<b>Initial Credit Term</b>"), and will automatically renew for successive terms
                            of the same duration (collectively, the "<b>Term</b>") unless either party provides at least
                            thirty (30) days’ notice of non-renewal. If no Initial Credit Term is specified in an Order
                            Form, or otherwise through the services interface, the Initial Credit Term will be deemed
                            one (1) month and this Agreement will continue on a month-to-month basis, terminable by
                            either party in accordance with <SectionLink section="7.1" />. During any month-to-month
                            period (whether as the Initial Credit Term or following expiration of a fixed-term Order
                            Form), Customer may continue to access and use the Licensed Materials subject to PostHog’s
                            then-current usage-based Fees.
                        </p>
                    </div>
                    <div>
                        <p>
                            By default, PostHog is month-to-month and renews automatically. Unless you've prepaid for
                            credits or agreed to a fixed term, in which case that term applies instead.
                        </p>
                    </div>
                    <div>
                        <h2 id="termination">7. Termination</h2>
                        <p id="section-7-1">
                            7.1 This Agreement shall continue until terminated in accordance with this{' '}
                            <SectionLink section="7" />. Customer may terminate this Agreement at any time upon thirty
                            (30) days’ written notice to PostHog, provided, however, that for the avoidance of doubt,
                            the termination of this Agreement pursuant to this sentence shall not absolve Customer of
                            the obligation to pay to PostHog any Fees for usage already incurred or otherwise due
                            hereunder, or agreed to pursuant to an Order Form or as otherwise specified through the
                            services interface, and any Prepaid Credits shall remain non-refundable. PostHog may
                            terminate this Agreement upon thirty (30) days’ written notice to Customer in the event that
                            Customer does not have, at such time, any existing and usable Prepaid Credits purchased via
                            an Order Form or otherwise.
                        </p>
                    </div>
                    <div className="md:pt-10">
                        <p>
                            You can cancel at any time with 30 days notice, but any fees already incurred are still
                            owed, and prepaid credits are non-refundable. PostHog can also cancel with 30 days notice if
                            you're on a month-to-month plan with no prepaid credits.
                        </p>
                    </div>
                    <div>
                        <p id="section-7-2">
                            7.2 Either party may terminate this Agreement upon thirty (30) days’ written notice to the
                            other party in the event of any curable material breach of this Agreement (including without
                            limitation, any breach of <SectionLink section="2.1" /> and/or failure to pay any amounts
                            when due hereunder) by such party where such material breach is not cured during such notice
                            period. In the event of a non-curable material breach, either party may terminate this
                            Agreement immediately upon written notice to the other party.
                        </p>
                    </div>
                    <div>
                        <p>
                            If either party seriously breaks the terms, the other can give 30 days notice to fix it. If
                            it's not fixed in time, the agreement can be terminated. If the breach can't be fixed at
                            all, termination can happen immediately.
                        </p>
                    </div>
                    <div>
                        <p>
                            7.3 Either party may terminate this Agreement, without notice, (a) upon the institution by
                            or against the other party of insolvency, receivership or bankruptcy proceedings (provided
                            such proceedings are not dismissed within one hundred twenty (120) days of such
                            institution), (b) upon the other party’s making an assignment for the benefit of creditors,
                            or (c) upon the other party’s dissolution or ceasing to do business without a successor.
                        </p>
                    </div>
                    <div>
                        <p>
                            If either of us go bust, or similar, the agreement ends immediately. No need to panic
                            though, we’re default alive and growing as fast as ever.
                        </p>
                    </div>
                    <div>
                        <p>
                            7.4 Customer’s rights to the Licensed Materials, and any licenses granted hereunder, shall
                            terminate upon any termination of this Agreement. In the event that Customer terminates this
                            Agreement pursuant to <SectionLink section="7.2" /> above, PostHog will refund to Customer:
                            (a) with respect to any Prepaid Credits, an amount equal to the proportion of unused credits
                            remaining as of the date of termination, applied to the fees actually paid for such credits;
                            and (b) with respect to any prepaid flat fees that are not usage-based (including without
                            limitation fees for add-ons), a pro-rated refund based on the portion of the applicable
                            subscription period remaining as of the date of termination. For the avoidance of doubt,
                            Customers that have not prepaid for credits or add-ons are not entitled to any refund upon
                            termination. The provisions of this Agreement which by their nature should survive
                            termination shall survive, including without limitation confidentiality, indemnification,
                            and payment obligations.
                        </p>
                    </div>
                    <div>
                        <p>
                            When the agreement terminates, your right to use PostHog ends. If PostHog broke the contract
                            then you can get a pro-rata refund if you have pre-paid anything.&nbsp;
                        </p>
                    </div>
                    <div>
                        <h2 id="warranty">8. Warranty</h2>
                        <p>
                            PostHog represents and warrants that (a) it has all rights and licenses necessary for it to
                            perform its obligations hereunder, and (b) it will not knowingly include, in any PostHog
                            software released to the public and provided to Customer hereunder, any computer code or
                            other computer instructions, devices or techniques, including without limitation those known
                            as disabling devices, trojans, or time bombs, that are intentionally designed to disrupt,
                            disable, harm, infect, defraud, damage, or otherwise impede in any manner, the operation of
                            a network, computer program or computer system or any component thereof, including its
                            security or user data. If, at any time, PostHog fails to comply with the warranty in this{' '}
                            <SectionLink section="8" />, Customer may promptly notify PostHog in writing of any such
                            noncompliance. PostHog will, within thirty (30) days of receipt of such written
                            notification, either correct the noncompliance or provide Customer with a plan for
                            correcting the noncompliance. If the noncompliance is not corrected or if a reasonably
                            acceptable plan for correcting it is not established during such period, Customer may
                            terminate this Agreement in accordance with <SectionLink section="7" /> as its sole and
                            exclusive remedy for such noncompliance.
                        </p>
                    </div>
                    <div className="md:pt-10">
                        <p>
                            PostHog promises we own all the rights to sell you PostHog and using it won’t cause you any
                            damage.&nbsp;
                        </p>
                    </div>
                    <div>
                        <h2 id="disclaimer">9. Warranty disclaimer</h2>
                        <p>
                            EXCEPT AS EXPRESSLY STATED HEREIN, THE LICENSED MATERIALS, SOFTWARE AND POSTHOG PROPRIETARY
                            INFORMATION AND ANYTHING PROVIDED IN CONNECTION WITH THIS AGREEMENT ARE PROVIDED "AS-IS,"
                            WITHOUT ANY WARRANTIES OF ANY KIND. POSTHOG AND ITS LICENSORS HEREBY DISCLAIM ALL
                            WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, WITHOUT LIMITATION, ALL IMPLIED WARRANTIES OF
                            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT AND ANY
                            WARRANTIES IMPLIED BY ANY COURSE OF PERFORMANCE, USAGE OF TRADE, OR COURSE OF DEALING.
                        </p>
                    </div>
                    <div className="md:pt-10">
                        <p>Whoa, if we have to shout then it must be important. You should read this carefully.</p>
                    </div>
                    <div>
                        <h2 id="liability">10. Limitation of liability</h2>
                        <p>
                            EXCEPT WITH RESPECT TO BREACH(ES) OF <SectionLink section="1.1" label="SECTION 1.1" />{' '}
                            AND/OR <SectionLink section="2.1" label="2.1" />, IN NO EVENT WILL EITHER PARTY OR THEIR
                            LICENSORS BE LIABLE FOR ANY INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL
                            DAMAGES ARISING OUT OF OR IN ANY WAY CONNECTED WITH THE USE OF THE LICENSED MATERIALS OR
                            ANYTHING PROVIDED IN CONNECTION WITH THIS AGREEMENT, ANY DELAY OR INABILITY TO USE THE
                            LICENSED MATERIALS OR ANYTHING PROVIDED IN CONNECTION WITH THIS AGREEMENT OR OTHERWISE
                            ARISING FROM THIS AGREEMENT, INCLUDING WITHOUT LIMITATION, LOSS OF REVENUE OR ANTICIPATED
                            PROFITS OR LOST BUSINESS OR LOST SALES, WHETHER BASED IN CONTRACT, TORT (INCLUDING
                            NEGLIGENCE), STRICT LIABILITY, OR OTHERWISE, EVEN IF SUCH PARTY HAS BEEN ADVISED OF THE
                            POSSIBILITY OF DAMAGES. EXCEPT WITH RESPECT TO BREACH(ES) OF{' '}
                            <SectionLink section="1.1" label="SECTION 1.1" /> AND/OR{' '}
                            <SectionLink section="2.1" label="2.1" />, THE TOTAL MAXIMUM LIABILITY OF EACH PARTY (AND
                            ITS AFFILIATES AND ITS LICENSORS), WHETHER BASED IN CONTRACT, TORT (INCLUDING NEGLIGENCE OR
                            STRICT LIABILITY), OR OTHERWISE, WILL NOT EXCEED, IN THE AGGREGATE, THE GREATER OF (i) ONE
                            THOUSAND DOLLARS ($1,000), OR (ii) THE TOTAL FEES PAID TO POSTHOG HEREUNDER IN THE ONE YEAR
                            PERIOD ENDING ON THE DATE THAT A CLAIM OR DEMAND IS FIRST ASSERTED. THE FOREGOING
                            LIMITATIONS WILL APPLY NOTWITHSTANDING ANY FAILURE OF ESSENTIAL PURPOSE OF ANY LIMITED
                            REMEDY. NOTWITHSTANDING ANYTHING ELSE TO THE CONTRARY IN THIS AGREEMENT, THE LIMITATIONS AND
                            EXCLUSIONS OF LIABILITY SET FORTH IN THIS SECTION SHALL NOT APPLY WITH RESPECT TO LIABILITY
                            ARISING OUT OF CUSTOMER’S OBLIGATION TO PAY FEES OWED UNDER THIS AGREEMENT OR ANY APPLICABLE
                            ORDER FORMS.
                        </p>
                    </div>
                    <div className="md:pt-10">
                        <p>ALL CAPS AGAIN, we’ll get out of the way here. 👀</p>
                    </div>
                    <div>
                        <h2 id="government">11. U.S. Government matters</h2>
                        <p>
                            Notwithstanding anything else contained in this Agreement to the contrary, Customer may not
                            provide to any person or export or re-export or allow the export or re-export of the
                            Licensed Materials or any software or anything related thereto or any direct product thereof
                            (collectively "<b>Controlled Subject Matter</b>"), in violation of any restrictions, laws or
                            regulations of the United States Department of Commerce, the United States Department of
                            Treasury Office of Foreign Assets Control, or any other United States or foreign agency or
                            authority. Without limiting the foregoing, Customer acknowledges and agrees that the
                            Controlled Subject Matter will not be used or transferred or otherwise exported or
                            re-exported to countries as to which the United States maintains an embargo (collectively, "
                            <b>Embargoed Countries</b>"), or to or by a national or resident thereof, or any person or
                            entity on the U.S. Department of Treasury’s List of Specially Designated Nationals or the
                            U.S. Department of Commerce’s Table of Denial Orders (collectively, "
                            <b>Designated Nationals</b>"). The lists of Embargoed Countries and Designated Nationals are
                            subject to change without notice. Use of the Licensed Materials is a representation and
                            warranty that the User is not located in, under the control of, or a national or resident of
                            an Embargoed Country or Designated National. The Controlled Subject Matter may use or
                            include encryption technology that is subject to licensing requirements under the U.S.
                            Export Administration Regulations. As defined in FAR section 2.101, any software and
                            documentation provided by PostHog are "commercial items" and according to DFAR section
                            252.227-7014(a)(1) and (5) are deemed to be "commercial computer software" and "commercial
                            computer software documentation." Consistent with DFAR section 227.7202 and FAR section
                            12.212, any use, modification, reproduction, release, performance, display, or disclosure of
                            such commercial software or commercial software documentation by the U.S. Government will be
                            governed solely by the terms of this Agreement and will be prohibited except to the extent
                            expressly permitted by the terms of this Agreement.
                        </p>
                    </div>
                    <div className="md:pt-10">
                        <p>
                            Important government stuff. Basically: don't use PostHog if you're in an embargoed country,
                            on a sanctions list, or trying to export our software somewhere the U.S. government says you
                            can't. If you're reading this, you're probably fine. But if you're not, this is the kind of
                            thing we can't look the other way on, and we'll close your account if we find out.
                        </p>
                    </div>
                    <div>
                        <h2 id="misc">12. Miscellaneous</h2>
                        <p>
                            If any provision of this Agreement is found to be unenforceable or invalid, that provision
                            will be limited or eliminated to the minimum extent necessary so that this Agreement will
                            otherwise remain in full force and effect and enforceable. This Agreement is not assignable,
                            transferable or sublicensable by either party without the other party’s prior written
                            consent, not to be unreasonably withheld or delayed; provided that either party may transfer
                            and/or assign this Agreement, in its entirety, to a successor in interest in connection with
                            a merger, acquisition, consolidation, corporate reorganization, or sale of all or
                            substantially all of its assets. Both parties agree that this Agreement is the complete and
                            exclusive statement of the mutual understanding of the parties and supersedes and cancels
                            all previous written and oral agreements, communications and other understandings relating
                            to the subject matter of this Agreement, and that all waivers and modifications must be in a
                            writing signed or otherwise agreed to by each party, except as otherwise provided herein. No
                            agency, partnership, joint venture, or employment is created as a result of this Agreement
                            and neither party has any authority of any kind to bind the other in any respect whatsoever.
                            In any action or proceeding to enforce rights under this Agreement, the prevailing party
                            will be entitled to recover costs and attorneys’ fees. All notices under this Agreement will
                            be in writing and will be deemed to have been duly given when received, if personally
                            delivered; when receipt is electronically confirmed, if transmitted by facsimile or email;
                            and upon receipt, if sent by certified or registered mail (return receipt requested),
                            postage prepaid. PostHog will not be liable for any loss resulting from a cause over which
                            it does not have direct control. This Agreement shall be governed by and construed in
                            accordance with the laws of the State of California, United States, without regard to its
                            conflict of law principles. The federal and state courts located in San Francisco County,
                            California, shall have exclusive jurisdiction and venue over any dispute arising out of or
                            relating to this Agreement.
                        </p>
                    </div>
                    <div className="md:pt-10">
                        <p>
                            The usual legal housekeeping. If part of this agreement turns out to be unenforceable, the
                            rest still stands. Any disputes will be handled under California law, since that's where
                            PostHog is based.
                        </p>
                    </div>
                    <div>
                        <h2 id="privacy">13. Data privacy</h2>
                        <p>
                            Customer shall ensure that any and all information or data, including without limitation,
                            personal data, used by Customer in connection with the Agreement ("<b>Customer Data</b>") is
                            collected, processed, transferred and used in full compliance with Applicable Data
                            Protection Laws (as defined below) and that it has obtained all necessary authorizations and
                            consents from any data subjects to process Customer Data. For clarity, Customer Data may
                            include Customer Content submitted as part of the usage of the Licensed Materials and may
                            contain personal data. Customer is responsible for configuring the Licensed Materials to
                            avoid the collection of sensitive personal data where appropriate, including through
                            available masking or filtering features. "<b>Applicable Data Protection Laws</b>" means any
                            applicable laws, statutes or regulations as may be amended, extended or re-enacted from time
                            to time which relate to personal data including without limitation (i) all applicable US
                            federal and state data protection and privacy laws, including without limitation the
                            California Consumer Privacy Act of 2018 as amended by the California Privacy Rights Act of
                            2020 (together, the "<b>CCPA</b>"); (ii) the UK Data Protection Act 2018 and the GDPR as
                            retained in UK domestic law by virtue of the European Union (Withdrawal) Act 2018 (as
                            amended); (iii) from and after 25 May 2018, GDPR and any EU Member State laws implementing
                            the GDPR; and (iv) the e-Privacy Directive 2002/58/EC, as amended and as transposed into EU
                            Member State law and any legislation replacing the e-Privacy Directive; and "<b>GDPR</b>"
                            means the Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April
                            2016 on the protection of natural persons with regard to the processing of personal data and
                            on the free movement of such data, and repealing Directive 95/46/EC (General Data Protection
                            Regulation). Depending on the nature of the installation, the processing of Customer Data,
                            and where such data is stored, Customer may request that we enter into a GDPR Data
                            Processing Agreement. Our standard form agreement can be accessed&nbsp;
                            <Link href="/dpa">here</Link>.
                        </p>
                    </div>
                    <div className="md:pt-10">
                        <p>
                            PostHog is committed to data privacy and covers all the main data privacy regulations,
                            especially GDPR.
                        </p>
                        <p>
                            We can sign a DPA if you need one. We make it super easy for you to{' '}
                            <Link href="/dpa">self-serve a completed DPA</Link>.*
                        </p>
                        <p className="!text-base opacity-80">
                            *It's the most fun you'll ever have signing a DPA - <em>guaranteed</em>.
                        </p>
                    </div>
                    <div className="pb-12">
                        <h2 id="sla">14. Uptime SLA</h2>
                        <p>
                            PostHog will use commercially reasonable efforts to make the Software available with all
                            material features and services operating and available for use, in each calendar month with
                            an uptime percentage of 99.95% as displayed on&nbsp;{' '}
                            <a href="https://posthogstatus.com">https://posthogstatus.com</a>{' '}
                            <b>
                                only to those customers who have purchased the Enterprise package or where it has been
                                agreed as a special term in an Order Form
                            </b>
                            . Uptime SLAs are not otherwise available to a Customer as standard. If the uptime
                            percentage for the month is less than 99.95%, PostHog will provide Customer with credit
                            during the month as detailed below:
                        </p>

                        <ul className="mt-4 list-disc pl-4 space-y-1 text-[15px]">
                            <li>99.90% to 99.94% inclusive - 5% credit</li>
                            <li>99.00% to 99.89% inclusive - 10% credit</li>
                            <li>Less than 99% - 20% credit</li>
                        </ul>

                        <p>
                            If PostHog fails to maintain an uptime percentage of greater than 99% for any 3 months in a
                            6-month period, Customer may terminate this Agreement in accordance with{' '}
                            <SectionLink section="7" /> upon ten (10) days' written notice to PostHog. The calculations
                            of uptime do not include:
                        </p>

                        <ul className="mt-4 list-disc pl-4 space-y-1 text-[15px]">
                            <li>Delays to data ingestion</li>
                            <li>
                                Scheduled maintenance time: PostHog will notify Customer in advance of any scheduled
                                routine maintenance
                            </li>
                            <li>
                                Emergency maintenance time (non-scheduled): PostHog will promptly notify Customer (via
                                email or through the Software) of any non-scheduled or emergency maintenance and any
                                other anticipated outages or performance degradation{' '}
                            </li>
                            <li>Suspension or termination of Customer’s account </li>
                            <li>
                                Failure of Customer or third-party equipment, software or technology upon which the
                                Software is dependent, including, but not limited to, cloud infrastructure services upon
                                which the Software operates, and inaccessibility to the internet, provided that such
                                failure or inaccessibility is not caused by PostHog’s infrastructure and is otherwise
                                outside of PostHog’s control
                            </li>
                            <li>
                                Force majeure event - An attack on PostHog’s infrastructure, including without
                                limitation, a denial of service attack or unauthorized access, provided that such attack
                                did not occur as a result of PostHog’s failure to maintain industry standard
                                organizational controls and technical measures
                            </li>
                            <li>Unavailability caused by Customer’s breach of this Agreement.</li>
                        </ul>
                    </div>
                    <div className="md:pt-10 pb-12">
                        <p>
                            If you buy PostHog Enterprise or have a special annual contract with us, we will agree to an
                            SLA with you.
                        </p>
                    </div>
                </div>
                <p className="text-center text-sm opacity-60 mt-8 pb-12">Last Updated: June 29, 2026</p>
            </div>
        </Layout>
    )
}

export default Terms
