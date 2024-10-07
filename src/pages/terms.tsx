import cntl from 'cntl'
import Layout from 'components/Layout'
import React, { useEffect, useState } from 'react'
import SEO from 'components/seo'
import Link from 'components/Link'
import { Link as SmoothScrollLink } from 'react-scroll'
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
  md:grid-cols-2
  max-w-6xl
  px-4
  lg:px-8
  mx-auto
  mt-12
  [&div]:p-4
  [&>div:nth-child(even)]:relative
  [&>div:nth-child(even)]:before:relative
  md:[&>div:nth-child(even)]:before:hidden
  [&>div:nth-child(even)]:before:text-sm
  [&>div:nth-child(even)]:before:-top-2
  [&>div:nth-child(even)]:before:pb-2
  [&>div:nth-child(even)]:before:opacity-60
  [&>div:nth-child(even)]:before:uppercase
  [&>div:nth-child(even)]:before:font-bold
  [&>div:nth-child(even)]:before:content-['What_it_means']
  [&>div:nth-child(even)>p]:border-l-4
  md:[&>div:nth-child(even)>p]:border-l-0
  [&>div:nth-child(even)>p]:border-light
  [&>div:nth-child(even)>p]:pl-3
  [&>div:nth-child(even)>ul]:border-l-4
  md:[&>div:nth-child(even)>ul]:border-l-0
  [&>div:nth-child(even)>ul]:border-light
  [&>div:nth-child(even)>ul]:pl-3
  [&>div:nth-child(even)_li]:ml-4
  dark:[&>div:nth-child(even)]:border-dark
  md:[&>div:nth-child(even)]:border-l
  [&>div:nth-child(odd)]:pr-8
  md:[&>div:nth-child(even)>p]:pl-0
  md:[&>div:nth-child(even)]:pl-8
  md:[&>div:nth-child(even)]:border-light
  dark:md:[&>div:nth-child(even)]:border-dark
  [&>div:nth-child(odd)_p]:text-[15px]
  [&>div:nth-child(even)>p]:text-lg
`

function Terms() {
    const [headers, setHeaders] = useState([])

    useEffect(() => {
        const fullTerms = document.querySelector('.full-terms')
        const h2s = fullTerms.querySelectorAll(':nth-child(odd) h2')
        setHeaders(Array.from(h2s))
    }, [])

    return (
        <Layout
            parent={sexyLegalMenu}
            activeInternalMenu={sexyLegalMenu.children.find(({ name }) => name.toLowerCase() === 'terms')}
        >
            <SEO title="Terms, PostHog style" description="Terms, PostHog style" image={`/images/og/terms.png`} />
            <div>
                <div className="max-w-2xl mx-auto py-8 px-4 md:px-8">
                    <h1 className="text-5xl text-center">
                        Terms,{' '}
                        <span className="whitespace-nowrap text-red dark:text-yellow">
                            <em>PostHog style</em>
                        </span>
                    </h1>

                    <p className="mt-2 text-lg font-semibold mb-2 text-center text-balance">
                        The internet has wrecked our attention span. <em>(Thanks, Zuck!)</em>
                    </p>

                    <p className="mb-2 text-center">
                        Long paragraphs are boring. So we've summarized our terms for you.
                    </p>

                    <p className="mb-2 text-center">
                        Here's the gist in a familiar format you can probably skim while driving. (Or 💩.)
                    </p>

                    <h3 className="text-2xl pt-8 text-center">Summary of our terms</h3>

                    <p className="bg-white dark:bg-accent-dark p-8 rounded font-serif mb-8 border-2 border-red dark:border-yellow shadow-xl">
                        <span className="text-xl">
                            <strong>Semi-important legal notice</strong> from{' '}
                            <Tooltip content={() => <Lawyers />} placement="bottom" className="[&_button]:cursor-auto">
                                <span className="border-b border-dashed border-dark/50 dark:border-light/60 dark:hover:border-light/80 inline-block !leading-tight">
                                    our over-zealous legal team
                                </span>
                            </Tooltip>
                            :
                        </span>
                        <span className="text-xs mt-2 md:mt-0 mb-4 block">
                            (Serif font demonstrates how important this disclaimer is)
                        </span>
                        The following is not legally binding. It is a summary of PostHog's terms. Please read{' '}
                        <SmoothScrollLink
                            to="full-terms"
                            spy={true}
                            smooth={true}
                            offset={-128}
                            duration={1500}
                            className="cursor-pointer"
                        >
                            the full terms of service
                        </SmoothScrollLink>{' '}
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
                                className="font-normal text-xs text-primary/50 dark:text-primary-dark/50"
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

                <div className="px-4">
                    <div className="max-w-lg mx-auto pb-6">
                        <p className="mb-2">
                            For your sanity, we've summarized each paragraph of legalese with plain English.
                        </p>
                        <p className="mb-2 text-primary/75 dark:text-primary-dark/75">
                            (This was inspired by{' '}
                            <Link href="https://500px.com/terms" externalNoIcon>
                                500px
                            </Link>{' '}
                            who did it first and deserve full credit! We tried to do it better but we couldn't.)
                        </p>
                        <p className="mb-2">
                            You probably realize this, but the summaries{' '}
                            <span className="md:hidden">
                                below each section in blockquotes (under the <em>"What it means</em> subheaders)
                            </span>
                            <span className="hidden md:inline-block">in the right-hand column</span> exist solely to aid
                            your comprehension and alleviate boredom. They're not legally binding.
                        </p>
                        <p className="mb-2">
                            Should you wish to be legally bound to us, please stick with the <em>actual</em> terms{' '}
                            <span className="md:hidden">
                                which is everything <em>not in blockquotes</em>
                            </span>
                            <span className="hidden md:inline-block">in the left column</span>.
                        </p>
                        <p className="mb-2 text-primary/75 dark:text-primary-dark/75">
                            (Can you believe we actually had to clarify this?)
                        </p>
                    </div>
                </div>

                <div className="px-4">
                    <ol className="table-of-contents max-w-lg mx-auto bg-accent dark:bg-accent-dark border border-light dark:border-dark rounded py-8 list-none flex flex-col gap-1 md:gap-2">
                        <li className="text-sm opacity-70">Table of contents</li>
                        {headers.map((header, index) => (
                            <li key={index}>
                                <SmoothScrollLink
                                    to={header.id}
                                    spy={true}
                                    smooth={true}
                                    offset={-128}
                                    duration={1000}
                                    className="group cursor-pointer top-16 md:top-24 lg:top-32 text-sm md:text-base"
                                >
                                    {header.innerText}
                                    <IconArrowRightDown className="size-4 inline-block ml-1 opacity-30 group-hover:opacity-100 dark:group-hover:opacity-70 text-primary dark:text-primary-dark" />
                                </SmoothScrollLink>
                            </li>
                        ))}
                    </ol>
                </div>

                <div className={termsClasses}>
                    <div>
                        <h2 id="intro" className="mb-1 text-4xl">
                            The full terms
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
                            These terms apply to any Customer on PostHog Cloud. Separate terms for users of PostHog FOSS
                            can be found here:&nbsp;
                            <Link href="https://github.com/PostHog/posthog-foss/blob/master/LICENSE" externalNoIcon>
                                https://github.com/PostHog/posthog-foss/blob/master/LICENSE
                            </Link>
                        </p>
                        <p>
                            By signing up to PostHog Cloud, you and any entity that you represent ("Customer") are
                            unconditionally consenting to be bound by and are becoming a party to these PostHog
                            Subscription Terms ("Agreement") as of the date of Customer's first download of the licensed
                            materials (the "effective date").&nbsp;
                        </p>
                        <p>
                            Customer's continued use of the software or any licensed materials provided by PostHog,
                            Inc., trading as PostHog ("PostHog") (or one of its affiliates and/or subsidiaries, as
                            specified on an order form or quote), shall also constitute assent to the terms of this
                            agreement.&nbsp;
                        </p>
                        <p>
                            If these terms are considered an offer, acceptance is expressly limited to these terms. If
                            you are executing this agreement on behalf of an organization, you represent that you have
                            authority to do so.
                        </p>
                    </div>
                    <div>
                        <p className="mb-2">By signing into PostHog, you agree to all these terms.</p>
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
                        <p>
                            1.1 Subject to the terms and conditions of this Agreement, PostHog hereby grants to Customer
                            and its Affiliates (as defined below) a limited, non-exclusive, non-transferable,
                            non-sublicensable license for Customer’s and its Affiliates’ employees and contractors to
                            (1) internally (a) use, reproduce, modify, prepare derivative works based upon, and display
                            the code of PostHog Cloud at the tier level selected by Customer (or set forth on a Quote
                            (as defined below), if applicable with the specifications generally promulgated by PostHog
                            from time to time (the “Software”), solely (i) for its internal use in connection with the
                            development of Customer’s and/or its Affiliates’ own software, and (ii) at the level of
                            usage for which Customer has paid PostHog; and (b) use the documentation, training materials
                            or other materials supplied by PostHog (the “Other PostHog Materials”); and (2) modify the
                            Software and publish patches to the Software, solely at the level of usage for which
                            Customer has paid PostHog. Notwithstanding anything to the contrary, Customer agrees that
                            PostHog and/or its licensors (as applicable) retain all right, title and interest in and to
                            all Software incorporated in such modifications and/or patches, and all such Software may
                            only be used, copied, modified, displayed, distributed, or otherwise exploited in full
                            compliance with this Agreement, and with a valid PostHog Cloud subscription for the correct
                            level of usage.&nbsp;
                        </p>
                        <p>
                            The Software and Other PostHog Materials are collectively referred to herein as the
                            “Licensed Materials.” “Affiliate” means any entity(ies) controlling, controlled by, and/or
                            under common control with a party hereto, where “control” means the ownership of more than
                            50% of the voting securities in such entity. “User” means each individual end-user (person
                            or machine) of Customer and/or its Affiliates (including, without limitation, employees,
                            agents or consultants thereof) with access to the Licensed Materials hereunder.
                        </p>
                    </div>
                    <div className="md:pt-10">
                        <p>
                            You can use PostHog with the features defined in your chosen plan. You can also use our docs
                            and tutorials to help you.
                        </p>
                        <p>
                            You can make pull requests on Github to help us make changes, but we own the rights to any
                            modifications.
                        </p>
                        <p>
                            We will also continue to improve the product and make changes that enhance your experience
                            as a user.&nbsp;
                        </p>
                    </div>
                    <div>
                        <p>
                            1.2 Subject to the terms hereof, PostHog will provide reasonable support to Customer for the
                            Licensed Materials as set forth on the 'Pricing' page, for the support plan selected and
                            paid for by Customer.&nbsp;
                        </p>
                        <p>
                            Notwithstanding anything to the contrary, in the event that Customer does not reasonably
                            comply with written specifications or instructions from PostHog’s service engineers
                            regarding any support issue or request (including without limitation, failure to make
                            backups of Customer’s Licensed Materials) (each, a “Support Issue”), PostHog may terminate
                            its support obligations to Customer with respect to such Support Issue upon fifteen (15)
                            days’ written notice if Customer does not cure such noncompliance within the notice period.
                        </p>
                    </div>
                    <div>
                        <p>We’ll provide support as outlined in your product plan.</p>
                        <p>
                            We can close a support ticket if you fail to respond to a request from one of our engineers
                            within 15 days.
                        </p>
                    </div>
                    <div>
                        <p>
                            1.2.1 PostHog will use reasonable commercial efforts to respond to support questions by
                            Slack, email, or community forums. The number of support questions is not limited.
                        </p>
                    </div>
                    <div>
                        <p>
                            We will aim to answer your questions as fast as we can, using a few different
                            channels.&nbsp;
                        </p>
                    </div>
                    <div>
                        <h2 id="restrictions">2. Restrictions and responsibilities</h2>
                        <p>
                            2.1 Except as expressly authorized in Section 1.1, Customer will not, and will not permit
                            any third party to: use the Licensed Materials for any purpose other than as specifically
                            authorized in Section 1, or in such a manner that would enable any unlicensed person to
                            access the Licensed Materials; use the Licensed Materials or any other PostHog software for
                            timesharing or service bureau purposes or for any purpose other than its and its Affiliates’
                            own internal use (including without limitation, sublicensing, distributing, selling,
                            reselling any of the foregoing); except as expressly permitted herein; use the Licensed
                            Materials in connection with any high risk or strict liability activity (including, without
                            limitation, space travel, firefighting, police operations, power plant operation, military
                            operations, rescue operations, hospital and medical operations or the like); use the
                            Licensed Materials or software other than in accordance with this Agreement and in
                            compliance with all applicable laws and regulations (including but not limited to any
                            privacy laws, and laws and regulations concerning intellectual property, consumer and child
                            protection, obscenity or defamation); or use the Licensed Materials in any manner that (1)
                            is harmful, fraudulent, deceptive, threatening, abusive, harassing, tortious, defamatory,
                            vulgar, obscene, or libelous (including without limitation, accessing any computer, computer
                            system, network, software, or data without authorization, breaching the security of another
                            user or system, and/or attempting to circumvent any User authentication or security
                            process), (2) impersonates any person or entity, including without limitation any employee
                            or representative of PostHog, or (3) contains a virus, trojan horse, worm, time bomb,
                            unsolicited bulk, commercial, or “spam” message, or other harmful computer code, file, or
                            program (including without limitation, password guessing programs, decoders, password
                            gatherers, keystroke loggers, cracking tools, packet sniffers, and/or encryption
                            circumvention programs).
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
                                <p>Use PostHog for some things, like military operations or policing.</p>
                            </li>
                            <li>
                                <p>Use PostHog in the space rocket you’re building.</p>
                            </li>
                            <li>
                                <p>Use PostHog to do anything illegal or harmful to other people.</p>
                            </li>
                            <li>
                                <p>Pretend to be somebody else, including a PostHog employee.</p>
                            </li>
                            <li>
                                <p>Try to hack PostHog, or use PostHog to do bad internet things.</p>
                            </li>
                        </ul>
                        <p>
                            Basically, (i) don’t use PostHog to be a jerk, or do anything dangerous and (ii) if you
                            build a space rocket and use PostHog, it’s not our fault if it crashes.
                        </p>
                    </div>
                    <div>
                        <p>
                            2.2 Customer will cooperate with PostHog in connection with the performance of this
                            Agreement by making available such personnel and information as may be reasonably required,
                            and taking such other actions as PostHog may reasonably request. Customer will also
                            cooperate with PostHog in establishing a password or other procedures for verifying that
                            only designated employees of Customer have access to any administrative functions of the
                            Licensed Materials.&nbsp;
                        </p>
                        <p>
                            Customer shall maintain during the term of this Agreement and through the end of the third
                            year after the date on which the final payment is made under this Agreement, books, records,
                            contracts and accounts relating to the payments due PostHog under this Agreement
                            (collectively, the “Customer Records”). PostHog may, at its sole expense, upon 30 days’
                            prior written notice to Customer and during Customer’s normal business hours and subject to
                            industry-standard confidentiality obligations, hire an independent third party auditor to
                            audit the Customer Records only to verify the amounts payable under this Agreement. If an
                            audit reveals underpayment, then Customer shall promptly pay the deficiency to PostHog plus
                            late fees pursuant to Section 5.2. PostHog shall bear the cost of an audit unless the audit
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
                            2.3 Customer will be responsible for maintaining the security of Customer’s account,
                            passwords (including but not limited to administrative and User passwords) and files, and
                            for all uses of Customer account with or without Customer’s knowledge or consent.
                        </p>
                    </div>
                    <div>
                        <p>
                            You need to keep your account secure with passwords and not sharing all your data with
                            anybody you don’t want to.
                        </p>
                    </div>
                    <div>
                        <h2 id="confidentiality">3. Confidentiality</h2>
                        <p>
                            3.1 Each party (the “Receiving Party”) understands that the other party (the “Disclosing
                            Party”) has disclosed or may disclose information relating to the Disclosing Party’s
                            technology or business (hereinafter referred to as “Proprietary Information” of the
                            Disclosing Party). Without limiting the foregoing, the Licensed Materials are PostHog
                            Proprietary Information.
                        </p>
                    </div>
                    <div className="md:pt-10">
                        <p>
                            You might tell us secret stuff you don’t want other people to know, and we might do the same
                            back.&nbsp;
                        </p>
                    </div>
                    <div>
                        <p>
                            3.2 The Receiving Party agrees: (i) not to divulge to any third person any such Proprietary
                            Information, (ii) to give access to such Proprietary Information solely to those employees
                            with a need to have access thereto for purposes of this Agreement, and (iii) to take the
                            same security precautions to protect against disclosure or unauthorized use of such
                            Proprietary Information that the party takes with its own proprietary information, but in no
                            event will a party apply less than reasonable precautions to protect such Proprietary
                            Information.&nbsp;
                        </p>
                        <p>
                            The Disclosing Party agrees that the foregoing will not apply with respect to any
                            information that the Receiving Party can document (a) is or becomes generally available to
                            the public without any action by, or involvement of, the Receiving Party, or (b) was in its
                            possession or known by it prior to receipt from the Disclosing Party, or (c) was rightfully
                            disclosed to it without restriction by a third party, or (d) was independently developed
                            without use of any Proprietary Information of the Disclosing Party.&nbsp;
                        </p>
                        <p>
                            Nothing in this Agreement will prevent the Receiving Party from disclosing Proprietary
                            Information pursuant to any judicial or governmental order, provided that the Receiving
                            Party gives the Disclosing Party reasonable prior notice of such disclosure to contest such
                            order. In any event, PostHog may collect data with respect to and report on the aggregate
                            response rate and other aggregate measures of the Licensed Materials’ performance and
                            Customer’s usage of the Licensed Materials; provided that PostHog will not identify Customer
                            as the source of any such data without Customer’s prior written consent. For the avoidance
                            of doubt, use of a third party to host the data collected shall not be deemed a disclosure.
                        </p>
                    </div>
                    <div>
                        <p>
                            We both agree not to tell anybody else about these things, unless it was already obvious –
                            we all share some stuff on the internet, right?&nbsp;
                        </p>
                        <p>
                            We should try hard to make sure we keep the secrets safe and take extra steps to do that. We
                            both agree that if anybody official, like a judge or the government, asks to see anything
                            you want kept secret, that we let the other person know before we share.&nbsp;
                        </p>
                        <p>
                            Hopefully it’s obvious that Jeff Bezos doesn’t count – well, AWS anyway, Jeff’s too busy on
                            a boat to care.&nbsp;
                        </p>
                    </div>
                    <div>
                        <p>
                            3.3 Each party acknowledges and agrees that the other may suffer irreparable damage in the
                            event of a breach of the terms of Sections 1.1, 2.1 or 3.2 of this Agreement and that such
                            party will be entitled to seek injunctive relief (without the necessity of posting a bond)
                            in the event of any such breach.
                        </p>
                    </div>
                    <div>
                        <p>
                            We both agree that giving away all the other’s secrets can lead to serious legal
                            issues.&nbsp;
                        </p>
                    </div>
                    <div>
                        <p>
                            3.4 Both parties will have the right to disclose the existence of the relationship between
                            the parties, but not the terms and conditions of this Agreement, unless such disclosure of
                            the Agreement terms is approved in writing by both Parties prior to such disclosure, or is
                            included in a filing required to be made by a party with a governmental authority (provided
                            such party will use reasonable efforts to obtain confidential treatment or a protective
                            order) or is made on a confidential basis as reasonably necessary to potential investors or
                            acquirers.
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
                            applicable) will retain all intellectual property rights relating to the Licensed Materials
                            and any suggestions, ideas, enhancement requests, feedback, code, or other recommendations
                            provided by Customer, its Affiliates or any third party relating to the Licensed Materials,
                            which are hereby assigned to PostHog. This Agreement is not a sale and does not convey to
                            Customer any rights of ownership in or related to the Licensed Materials, or any
                            intellectual property rights.
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
                            the Licensed Materials. Additionally, Customer agrees to reproduce and include PostHog’s
                            (and its licensors’) proprietary and copyright notices on any copies of the Licensed
                            Materials, or on any portion thereof, including reproduction of the copyright notice.
                            Notwithstanding anything to the contrary herein, certain components of the Licensed
                            Materials, including without limitation, any component of the Licensed Materials distributed
                            by PostHog as part of the PostHog FOSS Edition, are licensed by third parties pursuant to
                            the terms of certain third party licenses described in such source code annotations.
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
                            4.3 Customer and its licensors shall (and Customer hereby represents and warrants that they
                            do) have and retain all right, title and interest (including, without limitation, sole
                            ownership of) all software, information, content and data provided by or on behalf of
                            Customer or made available or otherwise distributed through use of the Licensed Materials
                            (“Content”) and the intellectual property rights with respect to that Content. If PostHog
                            receives any notice or claim that any Content, or Customer’s activities hereunder (including
                            without limitation, with respect to any Content), infringes or violates the rights of a
                            third party or any applicable law or regulation (a “Claim”), Customer will indemnify, defend
                            and hold PostHog harmless from all liability, damages, settlements, attorney fees and other
                            costs and expenses in connection with any such Claim, as incurred. The immediately foregoing
                            indemnity obligations are expressly conditioned on PostHog providing Customer with prompt
                            notice of, and reasonable cooperation and sole control over the defense and/or settlement of
                            the applicable Claim. Subject to the foregoing, PostHog may participate in the defense
                            and/or settlement of any applicable Claim with counsel of its choosing at its own expense.
                        </p>
                    </div>
                    <div>
                        <p>
                            You will own all the data you receive through your use of PostHog. However, if PostHog
                            learns that somebody else owns that data, you will tell the other party that we had nothing
                            to do with it, and protect PostHog from any legal issues.
                        </p>
                    </div>
                    <div>
                        <p>
                            4.4 PostHog will defend, indemnify and hold Customer harmless from liability and other
                            amounts paid or payable to unaffiliated third parties resulting from the infringement or
                            violation of any intellectual property or proprietary rights by the Licensed Materials,
                            provided PostHog is promptly notified of any and all threats, claims and proceedings related
                            thereto and given reasonable assistance and the opportunity to assume sole control over
                            defense and settlement thereof. Subject to the foregoing, Customer may participate in the
                            defense and/or settlement of any claim that is indemnifiable by PostHog with counsel of its
                            choosing at its own expense. The foregoing obligations do not apply with respect to portions
                            or components of the Licensed Materials (i) not created by PostHog, (ii) that are modified
                            after delivery by PostHog, (iii) combined with other products, processes or materials where
                            the alleged infringement relates to such combination, (iv) where Customer continues
                            allegedly infringing activity after being notified thereof or after being informed of
                            modifications that would have avoided the alleged infringement, or (v) where Customer’s use
                            of the Licensed Materials is not strictly in accordance with this Agreement and all related
                            documentation.
                        </p>
                    </div>
                    <div>
                        <p>
                            If somebody tells you PostHog has done anything wrong, and it turns out we have, when it
                            comes to using PostHog, we will let them know you didn’t know about it.&nbsp;
                        </p>
                    </div>
                    <div>
                        <h2 id="payment">5. Payment of fees</h2>
                        <p>
                            5.1 Customer will pay PostHog the then applicable fees described in the Order Form or Quote
                            for the Licensed Materials in accordance with the terms therein (the “Fees”). If Customer’s
                            use of the Licensed Materials exceeds the Service Capacity set forth on the Order Form or
                            Quote or otherwise requires the payment of additional fees (per the terms of this
                            Agreement), Customer shall be billed for such usage and Customer agrees to pay the
                            additional fees in the manner provided herein. PostHog reserves the right to increase the
                            Fees or applicable charges and to institute new charges and Fees at the end of the Initial
                            Service Term or then current renewal term, upon thirty (30) days prior notice to Customer
                            (which may be sent by email). PostHog reserves the right to reduce the Fees or applicable
                            charges during the Initial Service Term or then current renewal term, immediately with
                            notice to Customer (which may be sent by email). If Customer believes that PostHog has
                            billed Customer incorrectly, Customer must contact PostHog no later than 60 days after the
                            closing date on the first billing statement in which the error or problem appeared, in order
                            to receive an adjustment or credit. Inquiries should be submitted via 
                            an in-app support ticket to the Company's customer success department.
                        </p>
                    </div>
                    <div className="md:pt-10">
                        <p>You will pay for using PostHog on time – usually via credit card.</p>
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
                        <p>
                            5.2 PostHog may choose to bill through an invoice, in which case, full payment for invoices
                            issued in any given month must be received by PostHog according to the payment terms
                            specified in the invoice. Unpaid amounts are subject to a finance charge of 1.5% per month
                            on any outstanding balance, or the maximum permitted by law, whichever is lower, plus all
                            expenses of collection and may result in immediate termination of Service. Customer shall be
                            responsible for all taxes associated with the Licenses Materials other than U.S. taxes based
                            on PostHog’s net income.
                        </p>
                    </div>
                    <div>
                        <p>
                            If you choose annual payments, we will send an invoice. Please pay on time or it could lead
                            to late fees.&nbsp;
                        </p>
                    </div>
                    <div>
                        <p>
                            5.3 Our fees do not include any taxes, levies, duties or similar governmental assessments of
                            any nature, including, for example, value-added, sales, GST, use or withholding taxes,
                            assessable by any jurisdiction whatsoever in relation to your purchases under this Agreement
                            (collectively, the “Taxes”). You are solely responsible for paying all Taxes associated with
                            your purchases hereunder. If we have a legal obligation to pay or collect Taxes for which
                            you are responsible for under this Clause 4.3, we shall invoice you and you shall pay that
                            amount to us unless you provide us with a valid tax exemption certificate authorized by the
                            appropriate taxing authority. We shall calculate applicable Taxes based on your billing
                            address as detailed on the relevant Order Form or Quote (it is your duty to inform us if
                            Taxes should be assessed on a different address). You shall promptly notify us of any
                            changes to any of your addresses specified in an Order Form or Quote. Taxes shall not be
                            deducted from or set-off against the fees in the applicable Order Form or Quote.
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
                            5.4 Subject to earlier termination as provided below, this Agreement is for the Initial
                            Service Term as specified in the Order Form or Quote, and shall be automatically renewed for
                            additional periods of the same duration as the Initial Service Term (collectively, the
                            “Term”), unless either party requests termination with at least thirty (30) days notice.
                        </p>
                    </div>
                    <div>
                        <p>
                            PostHog is a monthly subscription that renews each month. You can cancel at any time with 30
                            days notice. PostHog can do the same.&nbsp;
                        </p>
                    </div>
                    <div>
                        <h2 id="termination">6. Termination</h2>
                        <p>
                            6.1 This Agreement shall continue until terminated in accordance with this Section 6. Either
                            party may terminate this Agreement upon 30 days’ written notice to the other party hereto in
                            the event that Customer has no then-current subscription with respect to the Licensed
                            Materials.
                        </p>
                    </div>
                    <div className="md:pt-10">
                        <p>
                            Your contract with PostHog runs until either you cancel it, or PostHog does. You can do this
                            in the app, or just email us
                        </p>
                    </div>
                    <div>
                        <p>
                            6.2. Either party may terminate this Agreement immediately upon 30 days’ written notice to
                            the other party in the event of any material breach of this Agreement (including without
                            limitation, any breach of Section 2.2 and/or failure to pay any amounts when due hereunder)
                            by such party where such material breach is not cured during such notice period.
                        </p>
                    </div>
                    <div>
                        <p>If either party breaks the contract, they can terminate the contract immediately.&nbsp;</p>
                    </div>
                    <div>
                        <p>
                            6.3 Either party may terminate this Agreement, without notice, (i) upon the institution by
                            or against the other party of insolvency, receivership or bankruptcy proceedings (provided
                            such proceedings are not dismissed within one hundred twenty (120) days of such
                            institution), (ii) upon the other party’s making an assignment for the benefit of creditors,
                            or (iii) upon the other party’s dissolution or ceasing to do business without a successor.
                        </p>
                    </div>
                    <div>
                        <p>
                            If either of us go bust, or similar, the agreement ends immediately. No need to panic
                            though, we’re default alive and growing as fast as ever&nbsp;
                        </p>
                    </div>
                    <div>
                        <p>
                            6.4 Customer’s rights to the Licensed Materials, and any licenses granted hereunder, shall
                            terminate upon any termination of this Agreement. In the event that Customer terminates this
                            Agreement pursuant to the second sentence of Section 6.2 above, PostHog will refund to
                            Customer a pro-rated portion of pre-paid Fees for Services not actually received by Customer
                            as of the date of such termination. The following Sections will survive any termination of
                            this Agreement: 2 through 6 (except for Section 4.3), and 8 through 11.
                        </p>
                    </div>
                    <div>
                        <p>
                            When the agreement terminates, your right to use PostHog ends. If PostHog broke the contract
                            then you can get a pro-rata refund if you have pre-paid anything.&nbsp;
                        </p>
                    </div>
                    <div>
                        <h2 id="warranty">7. Warranty; Customer Software Security</h2>
                        <p>
                            PostHog represents and warrants that (i) it has all rights and licenses necessary for it to
                            perform its obligations hereunder, and (ii) it will not knowingly include, in any PostHog
                            software released to the public and provided to Customer hereunder, any computer code or
                            other computer instructions, devices or techniques, including without limitation those known
                            as disabling devices, trojans, or time bombs, that are intentionally designed to disrupt,
                            disable, harm, infect, defraud, damage, or otherwise impede in any manner, the operation of
                            a network, computer program or computer system or any component thereof, including its
                            security or user data. If, at any time, PostHog fails to comply with the warranty in this
                            Section, Customer may promptly notify PostHog in writing of any such noncompliance. PostHog
                            will, within thirty (30) days of receipt of such written notification, either correct the
                            noncompliance or provide Customer with a plan for correcting the noncompliance. If the
                            noncompliance is not corrected or if a reasonably acceptable plan for correcting them is not
                            established during such period, Customer may terminate this Agreement as its sole and
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
                        <h2 id="disclaimer">8. Warranty Disclaimer</h2>
                        <p>
                            EXCEPT AS EXPRESSLY STATED HEREIN, THE LICENSED MATERIALS, SOFTWARE AND POSTHOG PROPRIETARY
                            INFORMATION AND ANYTHING PROVIDED IN CONNECTION WITH THIS AGREEMENT ARE PROVIDED “AS-IS,”
                            WITHOUT ANY WARRANTIES OF ANY KIND. POSTHOG AND ITS LICENSORS HEREBY DISCLAIM ALL
                            WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, WITHOUT LIMITATION, ALL IMPLIED WARRANTIES OF
                            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
                        </p>
                    </div>
                    <div className="md:pt-10">
                        <p>Whoa, if we have to shout then it must be important. You should read this carefully.</p>
                    </div>
                    <div>
                        <h2 id="liability">9. Limitation of liability</h2>
                        <p>
                            EXCEPT WITH RESPECT TO BREACH(ES) OF SECTION 1.1 AND/OR 2.1, IN NO EVENT WILL EITHER PARTY
                            OR THEIR LICENSORS BE LIABLE FOR ANY INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, OR
                            CONSEQUENTIAL DAMAGES ARISING OUT OF OR IN ANY WAY CONNECTED WITH THE USE OF THE LICENSED
                            MATERIALS OR ANYTHING PROVIDED IN CONNECTION WITH THIS AGREEMENT, ANY DELAY OR INABILITY TO
                            USE THE LICENSED MATERIALS OR ANYTHING PROVIDED IN CONNECTION WITH THIS AGREEMENT OR
                            OTHERWISE ARISING FROM THIS AGREEMENT, INCLUDING WITHOUT LIMITATION, LOSS OF REVENUE OR
                            ANTICIPATED PROFITS OR LOST BUSINESS OR LOST SALES, WHETHER BASED IN CONTRACT, TORT
                            (INCLUDING NEGLIGENCE), STRICT LIABILITY, OR OTHERWISE, EVEN IF SUCH PARTY HAS BEEN ADVISED
                            OF THE POSSIBILITY OF DAMAGES. EXCEPT WITH RESPECT TO BREACH(ES) OF SECTION 1.1 AND/OR 2.1,
                            THE TOTAL LIABILITY OF EACH PARTY AND ITS LICENSORS, WHETHER BASED IN CONTRACT, TORT
                            (INCLUDING NEGLIGENCE OR STRICT LIABILITY), OR OTHERWISE, WILL NOT EXCEED, IN THE AGGREGATE,
                            THE GREATER OF (i) ONE THOUSAND DOLLARS ($1,000), OR (ii) THE FEES PAID TO POSTHOG HEREUNDER
                            IN ONE YEAR PERIOD ENDING ON THE DATE THAT A CLAIM OR DEMAND IS FIRST ASSERTED. THE
                            FOREGOING LIMITATIONS WILL APPLY NOTWITHSTANDING ANY FAILURE OF ESSENTIAL PURPOSE OF ANY
                            LIMITED REMEDY.
                        </p>
                    </div>
                    <div className="md:pt-10">
                        <p>ALL CAPS AGAIN, we’ll get out of the way here. 👀</p>
                    </div>
                    <div>
                        <h2 id="misc">11. Miscellaneous</h2>
                        <p>
                            If any provision of this Agreement is found to be unenforceable or invalid, that provision
                            will be limited or eliminated to the minimum extent necessary so that this Agreement will
                            otherwise remain in full force and effect and enforceable. This Agreement is not assignable,
                            transferable or sublicensable by either party without the other party’s prior written
                            consent, not to be unreasonably withheld or delayed; provided that either party may transfer
                            and/or assign this Agreement to a successor in the event of a sale of all or substantially
                            all of its business or assets to which this Agreement relates. Both parties agree that this
                            Agreement is the complete and exclusive statement of the mutual understanding of the parties
                            and supersedes and cancels all previous written and oral agreements, communications and
                            other understandings relating to the subject matter of this Agreement, and that all waivers
                            and modifications must be in a writing signed or otherwise agreed to by each party, except
                            as otherwise provided herein. No agency, partnership, joint venture, or employment is
                            created as a result of this Agreement and neither party has any authority of any kind to
                            bind the other in any respect whatsoever. In any action or proceeding to enforce rights
                            under this Agreement, the prevailing party will be entitled to recover costs and attorneys’
                            fees. All notices under this Agreement will be in writing and will be deemed to have been
                            duly given when received, if personally delivered; when receipt is electronically confirmed,
                            if transmitted by facsimile or e-mail; and upon receipt, if sent by certified or registered
                            mail (return receipt requested), postage prepaid. PostHog will not be liable for any loss
                            resulting from a cause over which it does not have direct control. This Agreement will be
                            governed by the laws of the State of California, U.S.A. without regard to its conflict of
                            laws provisions. The federal and state courts sitting in San Francisco County, California,
                            U.S.A. will have proper and exclusive jurisdiction and venue with respect to any disputes
                            arising from or related to the subject matter of this Agreement.
                        </p>
                    </div>
                    <div className="md:pt-10">
                        <p>
                            If something goes wrong then this is what happens, also some other general legal
                            stuff.&nbsp;
                        </p>
                        <p>
                            The agreement will be covered by the laws of California as this is where PostHog is
                            based.&nbsp;
                        </p>
                    </div>
                    <div className="pb-12">
                        <h2 id="privacy">12. Data privacy</h2>
                        <p>
                            Customer shall ensure that any and all information or data, including without limitation,
                            personal data, used by Customer in connection with the Agreement (“Customer Data”) is
                            collected, processed, transferred and used in full compliance with Applicable Data
                            Protection Laws (as defined below) and that it has all obtained all necessary authorizations
                            and consents from any data subjects to process Customer Data. “Applicable Data Protection
                            Laws” means any applicable laws, statutes or regulations as may be amended, extended or
                            re-enacted from time to time which relate to personal data including without limitation (ii)
                            from and after 25 May 2018, GDPR and any EU Member State laws implementing the GDPR; and
                            (iii) the e-Privacy Directive 2002/58/EC, as amended and as transposed into EU Member State
                            law and any legislation replacing the e-Privacy Directive and (b) “GDPR” means the
                            Regulation (EU) 2016/679 of the European Parliament and of the Counsel of 27 April 2016 on
                            the protection of natural persons with regard to the processing of personal data and on the
                            free movement of such data, and repealing Directive 95/46/EC (General Data Protection
                            Regulation). We may enter into a GDPR Data Processing Agreement with certain Cloud clients,
                            depending on the nature of the installation, how data is being processed, and where it is
                            stored. Our standard form agreement can be viewed&nbsp;
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
                </div>
            </div>
        </Layout>
    )
}

export default Terms
