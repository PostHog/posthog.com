import cntl from 'cntl'
import Layout from 'components/Layout'
import React, { useEffect, useState } from 'react'
import SEO from 'components/seo'
import Link from 'components/Link'
import { Link as SmoothScrollLink } from 'react-scroll'
import Tooltip from 'components/Tooltip'
import { Twitter } from 'components/Icons'
import { StaticImage } from 'gatsby-plugin-image'
import { IconArrowRightDown } from '@posthog/icons'
import { sexyLegalMenu } from '../navs'
import Lawyers from 'components/Lawyers'
import { Tweet } from 'components/Tweet'

const privacyClasses = cntl`
  full-privacy-policy
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
  [&>div:nth-child(even):empty]:before:hidden
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
  [&>div:nth-child(odd)_ol]:pb-4
  [&>div:nth-child(odd)_ul]:pb-4
  [&>div:nth-child(odd)_li]:text-[15px]
  [&>div:nth-child(even)>p]:text-lg
`

function Privacy() {
    const [headers, setHeaders] = useState([])

    useEffect(() => {
        const fullPrivacyPolicy = document.querySelector('.full-privacy-policy')
        const h2s = fullPrivacyPolicy.querySelectorAll(':nth-child(odd) h2')
        setHeaders(Array.from(h2s))
    }, [])

    return (
        <Layout
            parent={sexyLegalMenu}
            activeInternalMenu={sexyLegalMenu.children.find(({ name }) => name.toLowerCase() === 'privacy')}
        >
            <SEO
                title="Privacy policy, PostHog style"
                description="Privacy policy, but PostHog style"
                image={`/images/og/privacy.png`}
            />
            <div>
                <div className="max-w-2xl mx-auto py-8 px-4 md:px-8">
                    <h1 className="text-5xl text-center">
                        Privacy policy,{' '}
                        <span className="whitespace-nowrap text-red dark:text-yellow">
                            <em>PostHog style</em>
                        </span>
                    </h1>

                    <p className="mt-2 text-lg font-semibold mb-2 text-center text-balance">
                        The internet has wrecked our attention span. <em>(Thanks, Buzzfeed!)</em>
                    </p>

                    <p className="mb-2 text-center">
                        Long paragraphs are boring. So we've summarized our privacy policy for you.
                    </p>

                    <p className="mb-2 text-center">
                        Here's the gist in a familiar format you can probably skim while driving. (Or 💩.)
                    </p>

                    <h3 className="text-2xl pt-8 text-center">Summary of our privacy policy</h3>

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
                        The following is only a summary of PostHog's privacy policy. Please read{' '}
                        <SmoothScrollLink
                            to="full-privacy-policy"
                            spy={true}
                            smooth={true}
                            offset={-128}
                            duration={1500}
                            className="cursor-pointer"
                        >
                            the full privacy policy
                        </SmoothScrollLink>{' '}
                        and don't rely on 140 characters at a time, especially from someone who isn't a lawyer.
                    </p>

                    <Tweet
                        className="mx-auto"
                        alertMessage="Gen Z? Don't get distracted. You're here to read our thrilling privacy policy."
                    >
                        Our privacy policy covers it all – from cookies 🍪 to your data protection rights under your
                        country’s law 🌍. Read it carefully as using our site means you agree to it!
                    </Tweet>

                    <Tweet
                        className="mx-auto"
                        alertMessage="Gen Z? Don't get distracted. You're here to read our thrilling privacy policy."
                    >
                        🔓 As an open-source project, some info you share might be public for our awesome community’s
                        collaboration. But don't worry, we’re committed to collecting and sharing the minimum amount of
                        personal info. We're the Data Controller for all this!
                    </Tweet>

                    <Tweet
                        className="mx-auto"
                        alertMessage="Gen Z? Don't get distracted. You're here to read our thrilling privacy policy."
                    >
                        💻 We collect data like your IP address, device info, and pages/content you view to improve your
                        experience. No third-party cookies here – we don’t do retargeting ads or creepy tracking!
                    </Tweet>

                    <Tweet
                        className="mx-auto"
                        alertMessage="Gen Z? Don't get distracted. You're here to read our thrilling privacy policy."
                    >
                        🛠️ We gather usage data from our self-managed instances to analyze and improve our site, but you
                        can opt out. If you share your info, like name and email, it’s only used for necessary stuff. No
                        sensitive info like genetic data here, and definitely no under-18 data!
                    </Tweet>

                    <Tweet
                        className="mx-auto"
                        alertMessage="Gen Z? Don't get distracted. You're here to read our thrilling privacy policy."
                    >
                        Here's a cat gif to keep you engaged (and to keep the algos intrigued). Please like/RT.
                        <img src="/images/pizza-cat.gif" alt="Cat gif" className="w-full mt-2" />
                        <span className="text-right !-mb-4">
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
                        alertMessage="Gen Z? Don't get distracted. You're here to read our thrilling privacy policy."
                    >
                        🌐 We share necessary info of yours with service providers to run our site and product, but
                        nothing else. We’re part of the EU-US Data Privacy Framework, ensuring your data is safe.
                    </Tweet>

                    <Tweet
                        className="mx-auto"
                        alertMessage="Gen Z? Don't get distracted. You're here to read our thrilling privacy policy."
                    >
                        📬 We may contact you occasionally via email with updates, but you can unsubscribe anytime. We
                        promise not to spam you! Our first-party cookies remember you and improve your experience.
                        Reminder: we don't use any third-party cookies.
                    </Tweet>

                    <Tweet
                        className="mx-auto"
                        alertMessage="Gen Z? Don't get distracted. You're here to read our thrilling privacy policy."
                    >
                        🚀 We respect your rights and keep your info as long as your account is active. You can delete
                        it anytime. Contributions to our projects remain public to keep the integrity of our open-source
                        code.
                    </Tweet>

                    <Tweet
                        className="mx-auto"
                        alertMessage="Gen Z? Don't get distracted. You're here to read our thrilling privacy policy."
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

                <h2 id="full-privacy-policy" className="text-[2.5rem] mb-4 md:mb-8 px-4 md:text-center">
                    The full <span className="text-red dark:text-yellow">(but still easy to understand)</span> privacy
                    policy
                </h2>

                <div className="px-4">
                    <div className="max-w-lg mx-auto pb-6">
                        <p className="mb-2">
                            For your sanity, we've summarized each paragraph of legalese with plain English.
                        </p>
                        <p className="mb-2 text-primary/75 dark:text-primary-dark/75">
                            (This was inspired by{' '}
                            <Link href="https://500px.com/privacy" externalNoIcon>
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
                            The <em>actual</em> privacy policy{' '}
                            <span className="md:hidden">
                                is everything <em>not in blockquotes</em>
                            </span>
                            <span className="hidden md:inline-block">is in the left column below</span>.
                        </p>
                        <p className="mb-2 text-primary/75 dark:text-primary-dark/75">
                            (Can you believe we actually had to clarify this?)
                        </p>
                    </div>
                </div>

                <div className="px-4">
                    <ol className="table-of-contents max-w-lg mx-auto bg-accent dark:bg-accent-dark border border-light dark:border-dark rounded py-8 px-4 md:px-8 list-none flex flex-col gap-1 md:gap-2">
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

                <div className={privacyClasses}>
                    <div className="">
                        <h3 className="mb-1 text-4xl md:hidden">Privacy policy</h3>
                        <p className="text-sm opacity-75 md:hidden">
                            (with handy summaries at the end of each section)
                        </p>
                        <h2 id="introduction">
                            <strong>Introduction</strong>
                        </h2>
                    </div>
                    <div className="hidden md:block">
                        <h3 className="hidden md:block">What it means</h3>
                    </div>
                    <div className="md:pb-12">
                        <p>
                            This privacy policy ("Privacy Policy") applies to all visitors and customers of the
                            PostHog.com hosted services and websites (collectively, the "Website" or "Websites") and
                            self-managed installations, which are offered by PostHog Inc (formerly Hiberly Inc) and/or
                            any of its affiliates ("PostHog" or "we" or "us") and describes how we process your personal
                            information in connection with those Websites or self managed installations, customer events
                            and demos, and how we collect information through the use of cookies and related
                            technologies. It also tells you how you can access and update your personal information and
                            describes the data protection rights that may be available under your country’s or state's
                            laws, including (in the European Economic Area ("EEA"), and UK), a right to object to some
                            processing that we carry out or, where we rely on consent, how to withdraw that consent.
                            Please read this Privacy Policy carefully. By accessing or using any part of the Websites or
                            self-managed installations, you acknowledge you have been informed of and consent to our
                            practices with regard to your personal information and data.
                        </p>
                        <p>
                            PostHog is an open source project and collaborative community, as well as a company. This
                            means that many portions of our Websites, including information you voluntarily provide,
                            will be public-facing for the open sharing of innovative developments, ideas, and
                            information that makes our collaborative community so great. While we are committed to open
                            sharing, we strive to respect the privacy of individual community members and will minimize
                            the information we collect and share. If you do not want to share your information,
                            including personally identifiable information, with other community members and the public,
                            please be thoughtful as to how you interact with our Websites and what information you
                            provide through the Websites (for example, through creating a public profile, project
                            contributions, comments, and blog posts).
                        </p>
                        <p>
                            Unless otherwise stated, we act as the data controller for the data processing operations
                            described in this Privacy Policy.
                        </p>
                        <p>
                            We may provide additional information about our privacy practices in other places - for
                            example, when we ask you to provide personal information in connection with a particular
                            service or when you apply for a job with us.
                        </p>
                    </div>
                    <div>
                        <p>
                            This policy describes how we use your personal information when you use the PostHog app or
                            visit our website. It includes:
                        </p>
                        <ul className="pb-4 [&_p]:mb-0 [&_li]:text-lg">
                            <li>Use of cookies</li>
                            <li>How you can access your personal info</li>
                            <li>Your data protection rights under your country’s or state’s law.</li>
                        </ul>
                        <p>
                            We suggest you read the privacy policy carefully as by using our website you are agreeing to
                            it.
                        </p>
                        <p>
                            PostHog is an open-source project, so some of the information you voluntarily provide will
                            be public facing for sharing ideas – it’s what makes us such a great collaborative
                            community.
                        </p>
                        <p>
                            However, we are committed to minimizing the info we collect and share, and in particular any
                            personal info.
                        </p>
                        <p>PostHog is the Data Controller for what is described in this Privacy Policy.</p>
                        <p>
                            We also might provide more information about other privacy related matters if you give us
                            personal info, like if you apply for a job with us.
                        </p>
                    </div>
                    <div>
                        <h2 id="data-collection">
                            <strong>What information PostHog collects and why</strong>
                        </h2>
                        <h3>
                            <strong>Information from website visitors</strong>
                        </h3>
                    </div>
                    <div></div>
                    <div>
                        <p>
                            Like most website operators, PostHog automatically collects (i) technical information about
                            your device including your device's internet protocol (IP) address; and (ii) information
                            about your visit to our Websites (the referral URL, the content viewed and the content
                            interacted with).&nbsp;
                        </p>
                        <p>
                            Some of this information is collected using cookies and related technologies. See below for
                            further information on these technologies. We collect this information to better understand
                            how visitors use our Websites, to improve our Websites and experience for visitors, and to
                            monitor the security of the Websites.
                        </p>
                        <p>
                            For logged-in customers to PostHog deployments, PostHog also collects this information on
                            our application using our own software, to help us understand how to make the deployments
                            more useful for different categories of customer.
                        </p>
                    </div>
                    <div>
                        <p>We collect things like:</p>
                        <ul className="pb-4 [&_p]:mb-0 [&_li]:text-lg">
                            <li>IP address</li>
                            <li>Information about your device</li>
                            <li>Pages you have viewed</li>
                            <li>Content you have viewed</li>
                        </ul>
                        <p>
                            We use cookies to do this and they help us understand how we can improve a user's
                            experience.
                        </p>
                        <p>
                            We use our own products to do this. eg we will use our Session Replay tool to debug user
                            issues or understand how to improve our product.
                        </p>
                        <p>
                            FYI, we don’t use any third-party cookies at all. This means we don’t run any retargeting ad
                            campaigns, or use any other invasive tracking techniques that follow you around the
                            internet.
                        </p>
                    </div>
                    <div>
                        <h3>
                            <strong>Usage data information from self-managed PostHog instances</strong>
                        </h3>
                    </div>
                    <div></div>
                    <div>
                        <p>
                            PostHog automatically collects information about usage from each self-managed PostHog
                            instance (Open Source, Scale and Enterprise Edition). We may use cookies and similar
                            technologies to collect some of this information. It is possible to opt out of your personal
                            information being transferred, and for self-managed PostHog instances, we do not track your
                            end users at all. PostHog tracks the usage of these instances at an aggregate level – it is
                            also possible to prevent this through modifying the code, which is made available to you.
                        </p>
                    </div>
                    <div>
                        <p>
                            We automatically collect info on your usage of our self-managed instances. You can opt out
                            of this.
                        </p>
                    </div>

                    <div>
                        <h3>
                            <strong>Personal information</strong>
                        </h3>
                    </div>
                    <div></div>
                    <div>
                        <p>
                            You may choose to interact with our Websites in ways that provide us with your personal
                            information. In some instances, a User ID is generated for form and URL tracking, page
                            views, page pings, and usage counts in order to ascertain product performance and
                            development.&nbsp;
                        </p>
                        <p>
                            The amount and type of information that PostHog gathers depends on the nature of your
                            interaction with us, as well as the amount of information you choose to share. For example,
                            we ask visitors who use our community group to provide a username and email address. We will
                            also collect the information you provide with us in connection with creating an account on
                            the Website.&nbsp;
                        </p>
                        <p>
                            Certain profile information (such as your username) may be shared publicly, as well as
                            activity under your profile. If you report a security vulnerability to PostHog and request
                            public acknowledgement, then we may publicly disclose the personal information you provided
                            to us in connection with the report, including your name to fulfill your request for
                            acknowledgement.&nbsp;
                        </p>
                        <p>
                            In each case, PostHog collects such personal information only insofar as is necessary or
                            appropriate to fulfill the purpose of your interaction with or your request to PostHog. We
                            may also collect certain personal information during live in-person events and demos. We
                            will not disclose your personal information other than as described in this Privacy Policy.
                        </p>
                        <p>
                            We may aggregate all information (including your personal information) collected from our
                            Websites and self-managed installations for our own statistical and analytics purposes and
                            share such aggregated information with third parties for our own promotional purposes (e.g.
                            by publishing a report on trends in the usage of our Websites).
                        </p>
                    </div>
                    <div>
                        <p>
                            When you use our websites or app, we may generate an anonymous User ID for pageview tracking
                            etc.
                        </p>

                        <p>
                            We only collect personal information you share with us, such as your name and email address
                            when you sign up to our product or website community.
                        </p>

                        <p>
                            If you report a security vulnerability publicly then we may disclose your personal info, but
                            only if the action requires it – e.g. to provide recognition for your reporting of a
                            security vulnerability.
                        </p>

                        <p>We aggregate the info we collect to analyze usage and improve our website.</p>
                    </div>
                    <div>
                        <h2 id="we-dont-collect">
                            <strong>Information PostHog does not collect</strong>
                        </h2>
                    </div>
                    <div></div>
                    <div className="md:pb-12">
                        <p>
                            PostHog does not intentionally collect sensitive or special category personal information,
                            such as genetic data, biometric data for the purposes of uniquely identifying a natural
                            person, health information, or religious information.
                        </p>
                        <p>
                            PostHog does not knowingly collect information from or direct any of our Website or content
                            specifically to children under the age of 18. If we learn or have reason to suspect that a
                            customer is under the age of 18, we will close that account.
                        </p>
                    </div>
                    <div>
                        <p>
                            We don’t collect any seriously sensitive information, like genetic or biometric data, and
                            definitely no data on children under 18.{' '}
                        </p>

                        <p>If we think you’re under 18, we will close your account. </p>
                    </div>

                    <div>
                        <h2 id="personal-info">
                            <strong>Lawful basis and purposes for processing your personal information</strong>
                        </h2>
                    </div>
                    <div></div>

                    <div>
                        <p className="mb-2">
                            <strong>To fulfill a contract or take steps linked to a contract with you</strong>
                            <br />
                            We use your personal information to:
                        </p>
                        <ul>
                            <li>administer access to your accounts;</li>
                            <li>manage our customer relationships;</li>
                            <li>
                                process orders, provide our products and services and send you service-related
                                communications; and
                            </li>
                            <li>provide you with customer support.</li>
                        </ul>
                    </div>
                    <div>
                        <p>This explains how we use your personal information to fulfill our contract(s) with you.</p>
                    </div>

                    <div>
                        <p className="mb-2">
                            <strong>Legitimate interests</strong> <br />
                            We use your personal information:
                        </p>
                        <ul>
                            <li>
                                to improve and personalize your experience with us and our Websites and to tailor
                                communications to you;
                            </li>
                            <li>
                                to monitor and improve the performance of our products and services for administrative,
                                security and fraud prevention purposes;
                            </li>
                            <li>
                                for our own internal functions, management and corporate reporting, and internal
                                research and analytics;
                            </li>
                            <li>
                                to enforce compliance with our <Link href="/terms">terms of use</Link> and other
                                policies or otherwise in connection with legal claims, compliance, regulatory and
                                investigatory purposes as necessary (including disclosure of such information in
                                connection with legal process or litigation); and
                            </li>
                        </ul>
                    </div>
                    <div>
                        <p>We only use your information for stuff we actually need.</p>
                    </div>

                    <div className="md:pb-12">
                        <p className="mb-2">
                            <strong>Consent</strong>
                            <br />
                            We may rely on your consent:
                        </p>
                        <ul>
                            <li>
                                Where you ask us to send marketing information (e.g. newsletter updates) via a medium
                                where we need your consent under applicable law (for example email marketing in some
                                countries);
                            </li>
                            <li>Where you give us consent to place cookies or similar technologies;</li>
                            <li>
                                On other occasions where we ask for your consent, for the purpose we explain at the
                                time.
                            </li>
                        </ul>
                        <p>
                            You may withdraw your consent at any time through the unsubscribe feature provided with the
                            relevant marketing email or by contacting us using the details in the ‘Contacting PostHog
                            About Your Privacy’ section of this Privacy Policy.
                        </p>
                    </div>
                    <div>
                        <p>We always rely on your consent.</p>
                        <p>
                            You can withdraw consent at any time following the process in the section below about
                            contacting us.
                        </p>
                    </div>

                    <div>
                        <h2 id="personal-information">
                            <strong>How PostHog uses and protects your personal information</strong>
                        </h2>
                        <h3>
                            <strong>Sharing your information</strong>
                        </h3>
                    </div>
                    <div></div>
                    <div>
                        <p>
                            PostHog may share your personal information with the third-parties listed below for the
                            purposes that are described in this Privacy Policy or otherwise with your consent.
                        </p>
                        <p>
                            PostHog only shares your personal information with those of its employees, contractors, and
                            affiliated organizations that (i) need to know that personal information in order to process
                            it on PostHog's behalf or to provide services available on the Website, and (ii) that have
                            agreed not to disclose it to others
                        </p>
                    </div>
                    <div>
                        <p>PostHog uses other companies to provide our services.</p>

                        <p>We only use them for the purpose of providing our website and product, nothing else.</p>
                    </div>

                    <div></div>
                    <div></div>
                    <div>
                        <p className="mb-2">
                            <strong>Service Providers and partners</strong>. PostHog engages a number of service
                            providers or partners to manage or support certain aspects of our business operations on our
                            behalf. For instance, we currently use the following service providers who will handle your
                            personal information:
                        </p>
                        <ul>
                            <li>AWS - cloud data hosting</li>
                            <li>Clearbit - marketing data engine</li>
                            <li>Cloudflare - cloud data hosting</li>
                            <li>Customer.io - email campaign service provider</li>
                            <li>Digital Ocean - website user data for community profiles</li>
                            <li>GitHub - open source repositories and internal project management tool</li>
                            <li>Google Cloud Platform - cloud data hosting</li>
                            <li>Google Workspace - internal collaboration tools</li>
                            <li>Heroku - cloud data hosting</li>
                            <li>OpenPhone - SMS campaigns</li>
                            <li>Salesforce - CRM database</li>
                            <li>Sentry - application monitoring and error tracking</li>
                            <li>Slack - internal communications tool</li>
                            <li>Vitally - CRM database</li>
                            <li>Zendesk - customer support tool</li>
                        </ul>
                        <p>
                            Our service providers and partners are required by contract to safeguard any personal
                            information they receive from us and are prohibited from using the personal information for
                            any purpose other than to perform the services as instructed by PostHog.
                        </p>
                    </div>
                    <div>
                        <p>
                            Here is the list of companies we use. This applies to your personal data, not the data of
                            your users.
                        </p>
                    </div>

                    <div>
                        <p>
                            <strong>Affiliates.</strong> PostHog is a global business, headquartered in the United
                            States. Your personal information collected by us in accordance with this Privacy Policy is
                            used and shared by PostHog Inc to our affiliate company based in the UK (Hiberly Ltd) for
                            the purposes of providing the Websites, delivering our Products and services, managing your
                            accounts, hosting, IT, security, support, billing, marketing, and communications.
                        </p>
                    </div>
                    <div>
                        <p>PostHog is a US business, but we also have a UK company.</p>
                    </div>

                    <div className="md:pb-12">
                        <p>
                            <strong>Legal Requirements.</strong> We may disclose personal information to government
                            authorities or other third-parties if required to do so by law or in the good faith belief
                            that such action is necessary to: (a) comply with a subpoena, court order or similar legal
                            obligation, (b) protect and defend our rights or property, (c) act in urgent circumstances
                            to protect the personal safety of users of any Website or the public, (d) protect against
                            legal liability, (e) to investigate fraud or other unlawful activity, or (f) or as otherwise
                            required or permitted by law.
                        </p>
                        <p>
                            Please note, email and IP addresses of users of a PostHog deployment may be shared with the
                            respective users of that deployment.
                        </p>
                        <p>
                            PostHog takes measures reasonably necessary to protect your personal information against any
                            unauthorized access, use, alteration, or destruction.
                        </p>
                        <p>
                            PostHog at its sole discretion may make use of company logos where those companies are using
                            the software that we provide. If you have concerns over the use of your logo, please email
                            logos@posthog.com.
                        </p>
                    </div>
                    <div>
                        <p>We will disclose information to government authorities if we’re legally obliged to do so.</p>
                    </div>

                    <div>
                        <h3>
                            <strong>International transfer of personal information</strong>
                        </h3>
                    </div>
                    <div></div>
                    <div>
                        <p>
                            The Websites are hosted in the United States, or in Germany if you are a PostHog Cloud
                            customer who has selected EU hosting, and the personal information we collect about our
                            customers' users will be stored and processed on our servers in either the United States or
                            Germany. Information about our customers is processed in the United States by us, and may
                            also be by the service providers and partners listed above. Our employees, contractors and
                            affiliated organizations that process information for us as described above may be located
                            in the United States or in other countries outside of your home country which may have
                            different data protection standards to those which apply in your home country.
                        </p>
                        <p>
                            Where your personal information is transferred outside of the EEA, Switzerland and UK and
                            where this is to a country which is not subject to an adequacy decision by the EU Commission
                            or considered adequate as determined by applicable data protection laws, we will take steps
                            to ensure your personal information is adequately protected by safeguards such as Standard
                            Contractual Clauses ("SCCs") approved by the EU Commission or by the UK Government. A copy
                            of the relevant mechanism can be obtained for your review on request by using the contact
                            details in the ‘Contacting PostHog About Your Privacy’ section of this Privacy Policy.
                        </p>
                        <p>
                            Posthog complies with the EU-U.S. Data Privacy Framework ("EU-U.S. DPF"), the UK Extension
                            to the EU-U.S. DPF, and the Swiss-U.S. Data Privacy Framework ("Swiss-U.S. DPF") as set
                            forth by the U.S. Department of Commerce. Posthog has certified to the U.S. Department of
                            Commerce that it adheres to the EU-U.S. DPF Principles with regard to the processing of
                            personal data received from the European Union in reliance on the EU-U.S. DPF and from the
                            United Kingdom (and Gibraltar) in reliance on the UK Extension to the EU-U.S. DPF. Posthog
                            has certified to the U.S. Department of Commerce that it adheres to the Swiss-U.S. DPF
                            Principles with regard to the processing of personal data received from Switzerland in
                            reliance on the Swiss-U.S. DPF. If there is any conflict between the terms in this privacy
                            policy and the EU-U.S. DPF Principles and/or the Swiss-U.S. DPF Principles (together, the
                            "DPF Principles"), the DPF Principles shall govern. To learn more about the Data Privacy
                            Framework ("DPF") program, and to view our certification, please visit&nbsp;
                            <Link href="https://www.dataprivacyframework.gov/" externalNoIcon>
                                <u>https://www.dataprivacyframework.gov/</u>
                            </Link>
                            .
                        </p>
                        <p>
                            In compliance with the EU-U.S. DPF and the UK Extension to the EU-U.S. DPF and the
                            Swiss-U.S. DPF, PostHog Inc commits to cooperate and comply with the advice of the panel
                            established by the EU data protection authorities (DPAs) and the UK Information
                            Commissioner’s Office (ICO) and the Swiss Federal Data Protection and Information
                            Commissioner (FDPIC) with regard to unresolved complaints concerning our handling of human
                            resources data received in reliance on the EU-U.S. DPF and the UK Extension to the EU-U.S.
                            DPF and the Swiss-U.S. DPF in the context of the employment relationship
                        </p>
                        <p>
                            For the actions of third party agents PostHog engages to process data on our behalf, PostHog
                            remains responsible and liable under the DPF Principles if a third party agent processes the
                            Personal Data in a manner inconsistent with the DPF Principles, unless PostHog proves that
                            it is not responsible for the event giving rise to the damage.
                        </p>
                    </div>
                    <div>
                        <p>
                            PostHog might have to share your information outside of the country you are in. PostHog is
                            part of the{' '}
                            <Link href="https://www.dataprivacyframework.gov/" externalNoIcon>
                                EU-US Data Privacy Framework
                            </Link>
                            , so we rely on various mechanisms that this provides to do so.
                        </p>
                    </div>

                    <div>
                        <h3>Disputes</h3>
                    </div>
                    <div></div>
                    <div>
                        <p>
                            As part of our commitment to the DPF Principles, if you are a resident of the European
                            Union, UK, or Switzerland and you have a privacy or data use concern, please contact PostHog
                            directly at privacy@posthog.com and PostHog will use its best efforts to address your
                            concern within 45 days of receipt of your complaint. For an unresolved privacy or data use
                            concern that PostHog has not addressed satisfactorily, please contact our U.S. based third
                            party dispute resolution provider (free of charge) at&nbsp;
                            <Link href="https://www.jamsadr.com/dpf-dispute-resolution" externalNoIcon>
                                <u>https://www.jamsadr.com/dpf-dispute-resolution</u>
                            </Link>
                        </p>
                        <p>
                            For any DPF disputes that cannot be resolved by the methods above, you may be able to invoke
                            a binding arbitration process under certain conditions. To find out more about the DPF's
                            binding arbitration scheme, please see Annex I of the DPF Principles, here:&nbsp;
                            <Link
                                href="https://www.dataprivacyframework.gov/s/article/Participation-Requirements-Data-Privacy-Framework-DPF-Principles-dpf"
                                externalNoIcon
                            >
                                <u>
                                    https://www.dataprivacyframework.gov/s/article/Participation-Requirements-Data-Privacy-Framework-DPF-Principles-dpf
                                </u>
                            </Link>
                            . The Federal Trade Commission has investigation and enforcement authority over PostHog’s
                            compliance with the EU-U.S. DPF and the UK Extension to the EU-U.S. DPF, and the Swiss-U.S.
                            DPF
                        </p>
                    </div>
                    <div>
                        <p>If you dispute anything we’ve done, you can use the links provided to resolve this. </p>
                    </div>

                    <div>
                        <h3>
                            <strong>PostHog communications with you</strong>
                        </h3>
                    </div>
                    <div></div>
                    <div className="md:pb-12">
                        <p>
                            If you are a registered user of the Websites and have supplied your email address, PostHog
                            may occasionally send you an email to tell you about security, system information, new
                            features, solicit your feedback, or just keep you up to date with what's going on with
                            PostHog and our products. We primarily use our blog to communicate this type of information,
                            so we expect to keep this type of email to a minimum. There's an unsubscribe link located at
                            the bottom of each of the marketing emails we send you so you can stop receiving such emails
                            at any time.
                        </p>
                        <p>
                            If you send us a request (for example via a support email or via one of our feedback
                            mechanisms), we reserve the right to publish your request in order to help us clarify or
                            respond to your request or to help us support other customers. We will not publish your
                            personal information in connection with your request.
                        </p>
                    </div>
                    <div>
                        <p>
                            PostHog will contact you, mainly over email, from time to time. We promise we won’t spam
                            you, but you can unsubscribe whenever you like.
                        </p>
                    </div>

                    <div>
                        <h2 id="cookies">
                            <strong>Cookies, tracking technologies and Do Not Track</strong>
                        </h2>
                        <h3>
                            <strong>Cookies</strong>
                        </h3>
                    </div>
                    <div></div>
                    <div>
                        <p>
                            A cookie is a string of information that a website stores on a visitor's computer, and that
                            the visitor's browser provides to the website each time the visitor returns. PostHog uses
                            cookies to help PostHog identify and track visitors, their usage of the Websites, and their
                            Website access preferences. PostHog visitors who do not wish to have cookies placed on their
                            computers may set their browsers to refuse cookies before using the Websites. Disabling
                            browser cookies may cause certain features of PostHog's websites to not function properly.
                        </p>
                    </div>
                    <div>
                        <p>
                            To remember you, our system will give you a cookie. It's safe. We’re very careful to only
                            have first-party cookies on our site, including when we embed content from other websites,
                            such as YouTube.
                        </p>
                    </div>

                    <div>
                        <h3>
                            <strong>Tracking technologies</strong>
                        </h3>
                    </div>
                    <div></div>
                    <div>
                        <p>We do not use third-party tracking services to collect information about you.</p>
                    </div>
                    <div>
                        <p>
                            We hope this part is pretty clear. However, thanks for actually reading our Privacy Policy,
                            as a reward we’d love to send you a free toilet roll with our Privacy Policy printed on it,
                            send us an email to tpsandcs@posthog.com.
                        </p>
                    </div>

                    <div>
                        <h3>
                            <strong>Do Not Track</strong>
                        </h3>
                    </div>
                    <div></div>
                    <div className="md:pb-12">
                        <p>
                            "Do Not Track" is a privacy preference you can set in your browser if you do not want online
                            services to collect and share certain kinds of information about your online activity from
                            third party tracking services. PostHog does not track your online browsing activity on other
                            online services over time and we do not permit third-party services to track your activity
                            on our site. Because we do not share this kind of data with third party services or permit
                            this kind of third party data collection for any of our users, and we do not track our users
                            on third-party websites ourselves, we do not need to respond differently to an individual
                            browser's Do Not Track setting.
                        </p>
                    </div>
                    <div>
                        <p>
                            Because PostHog doesn’t use third-party tracking services, we don’t need to do anything
                            different when it comes to ‘Do Not Track’ settings on an individual's browser.
                        </p>
                    </div>

                    <div>
                        <h2 id="privacy-practices">
                            <strong>Global privacy practices and your rights</strong>
                        </h2>
                    </div>
                    <div></div>
                    <div className="md:pb-12">
                        <p>
                            Information we collect may be stored and processed in the United States in accordance with
                            this Privacy Policy but we understand that users from other countries may have different
                            expectations and rights with regard to their privacy. For all Website visitors and
                            customers, no matter their country of location, we will:
                        </p>
                        <ul>
                            <li>
                                provide clear methods of unambiguous, informed consent when we do collect your personal
                                information and where required by applicable law;
                            </li>
                            <li>
                                only collect the minimum amount of personal information necessary for the purpose it is
                                collected for, unless you choose to provide us more;
                            </li>
                            <li>
                                offer you simple methods of accessing, correcting, or deleting your information that we
                                have collected, with the exception of information you voluntarily provide that is
                                necessary to retain as is for the integrity of our project code as described further
                                below; and
                            </li>
                            <li>
                                provide Website customers notice, choice, accountability, security, and access, and we
                                limit the purpose for processing. We also provide our customers a method of recourse and
                                enforcement.
                            </li>
                        </ul>
                        <p>
                            Where our affiliate within the UK processes your personal information or where we process
                            personal information of individuals located in the EEA, Switzerland or the UK, you are
                            entitled to the following rights with regards to your personal information:
                        </p>
                        <ul>
                            <li>
                                Right of access to your personal information, to know what information we hold about
                                you.
                            </li>
                            <li>
                                Right to correct any incorrect or incomplete personal information about yourself that we
                                hold.
                            </li>
                            <li>Right to restrict/suspend our processing of your personal information.</li>
                            <li>
                                Right to complain to a supervisory authority if you believe your privacy rights are
                                being violated. In the UK, this will be the Information Commissioner.
                            </li>
                        </ul>
                        <p>Additional rights that may apply to you in certain instances:</p>
                        <ul>
                            <li>
                                Right of data portability (if our processing is based on consent or a contract and the
                                processing carried out by automated means);
                            </li>
                            <li>
                                Right to withdraw consent at any time (if processing is based on consent). If you ask to
                                withdraw your consent, this will not affect any processing which has already taken place
                                at that time.
                            </li>
                            <li>Right to object to processing (if processing is based on legitimate interests)</li>
                            <li>Right to object to processing of personal data for direct marketing purposes</li>
                            <li>
                                Right of erasure of your personal data from our system ("right to be forgotten") if
                                certain grounds are met
                            </li>
                        </ul>
                        <p>
                            These rights may be limited, for example if fulfilling your request would reveal personal
                            information about another person, or if you ask us to delete information which we are
                            required by law or have compelling legitimate interests to keep.
                        </p>
                        <p>
                            Where we collect personal information to administer your accounts or your contract with us
                            or to comply with our legal obligations, this is mandatory and we will not be able to manage
                            our relationship with you without this. In all other cases, the provision of requested
                            personal information is optional, but this may affect your ability to participate in certain
                            Website-related activities or being able to access and use certain features and services,
                            where the information is needed for those purposes.
                        </p>
                        <p>
                            To exercise your privacy rights, you can email us at the address given below in the
                            ‘Contacting PostHog About Your Privacy’ section of this Privacy Policy.
                        </p>
                    </div>
                    <div>
                        <p>
                            PostHog is a US company, with a UK subsidiary, however our users are based all over the
                            world and you still hold lots of rights that we respect.{' '}
                        </p>
                    </div>

                    <div>
                        <h2 id="data-retention">
                            <strong>Data retention and deletion</strong>
                        </h2>
                    </div>
                    <div></div>
                    <div className="md:pb-12">
                        <p>
                            If you already have an account on the Websites, you may access, update, alter, or delete
                            your basic customer profile information by logging into your account and updating profile
                            settings.
                        </p>
                        <p>
                            PostHog will retain your information for as long as your account is active or as needed to
                            perform our contractual obligations, provide you services through the Website, to comply
                            with legal obligations, resolve disputes, preserve legal rights, or enforce our agreements.
                            Retention periods will be determined taking into account the type of information that is
                            collected and the purpose for which it is collected, bearing in mind the requirements
                            applicable to the situation and the need to destroy outdated, unused information at the
                            earliest reasonable opportunity. For instance, in respect of data held for the management of
                            customers and potential customers, we consider the lead time necessary to develop and
                            maintain our commercial relationships and how recent our interactions are with you. We may
                            rectify, update or remove incomplete or inaccurate information, at any time and at our own
                            discretion. For more information on our retention periods you can contact us using the
                            details in the “Contacting PostHog About Your Privacy” section of this Privacy Policy.
                        </p>
                        <p>
                            Please note that due to the open source nature of our products, services, and community, we
                            may retain limited personal information indefinitely in order to ensure transactional
                            integrity and nonrepudiation. For example, if you provide your information in connection
                            with a blog post, GitHub issue or comment, we may display that information even if you have
                            deleted your account as we do not automatically delete community posts. Also, as described
                            in our <Link href="/terms">Terms of Use</Link>, if you contribute to a PostHog project and
                            provide your personal information in connection with that contribution, that information
                            (including your name) will be embedded and publicly displayed with your contribution and we
                            will not be able to delete or erase it because doing so would break the project code.
                        </p>
                    </div>
                    <div>
                        <p>
                            PostHog will keep your information as long as you have an active account, but you can delete
                            this at any time by logging in and updating your profile settings.{' '}
                        </p>

                        <p>
                            There are some situations where we cannot delete your information, such as if you provide a
                            contribution to one of our projects.
                        </p>
                    </div>

                    <div>
                        <h2 id="ccpa">
                            <strong>CCPA addendum</strong>
                        </h2>
                    </div>
                    <div></div>
                    <div className="md:pb-12">
                        <h3>Introduction</h3>
                        <p>
                            This Addendum (“Addendum”) forms part of the Privacy Policy, and of any superseding written
                            agreement, entered by and between you, the Customer (as defined in the Agreement)
                            (“Customer”), and PostHog Inc. (“PostHog”; and collectively – the “Agreement”).
                        </p>
                        <p>
                            This Addendum reflects the parties’ desire and intent to modify and amend the Agreement, in
                            accordance with the terms and conditions hereinafter set forth, with regard to the
                            processing of Customer Personal Information (as defined below) by PostHog on behalf of the
                            Customer.
                        </p>
                        <p>
                            Capitalized terms not defined herein shall have the meanings assigned to such terms in the
                            Agreement.
                        </p>
                        <p>
                            You represent and warrant that you have full authority to bind the Customer to this
                            Addendum. If you cannot, or do not agree to, comply with and be bound by this Addendum, or
                            do not have authority to bind the Customer or any other entity, please do not provide any
                            Customer Personal Information to us.
                        </p>
                        <p>
                            This Addendum shall become effective as of the commencement of processing of Customer
                            Personal Information under the Agreement (“Addendum Effective Date”).
                        </p>
                        <p>
                            If you need a signed copy of this Addendum you can download a{' '}
                            <Link
                                href="https://docs.google.com/document/d/17VawApHNJzXNkxYiDidw7UTQBJr347FfL6nVDxEYgsg/edit?usp=sharing"
                                external
                            >
                                template
                            </Link>
                            , enter your details, send a request to{' '}
                            <a rel="noopener noreferrer" href="mailto:privacy@posthog.com">
                                privacy@posthog.com
                            </a>{' '}
                            and we’ll provide you a countersigned copy.
                        </p>
                        <h3>Definitions</h3>
                        <p>
                            “<strong>CCPA</strong>” means the California Consumer Privacy Act of 2018, Cal. Civ. Code
                            §1798.100 et. seq., and its implementing regulations.{' '}
                        </p>
                        <p>
                            “<strong>Customer Personal Information</strong>” means any Customer Data maintained by
                            Customer and processed by PostHog solely on Customer’s behalf, that identifies, relates to,
                            describes, is capable of being associated with, or could reasonably be linked, directly or
                            indirectly, with a particular consumer or household, to the extent that such information is
                            protected as “personal information” (or an analogous variation of such term) under
                            applicable U.S. Data Protection Laws.{' '}
                        </p>
                        <p>
                            “<strong>U.S. Data Protection Laws</strong>” means all laws and regulations of the United
                            States of America, including the CCPA, applicable to the processing of personal information
                            (or an analogous variation of such term).
                        </p>
                        <p>
                            “<strong>Service Provider</strong>” has the meaning set forth in Section 1798.140(v) of the
                            CCPA.
                        </p>
                        <h3>Amendments</h3>
                        <h4>Roles</h4>
                        <p>
                            The parties acknowledge and agree that with regard to the processing of Customer Personal
                            Information performed solely on behalf of Customer, PostHog is a Service Provider and
                            receives Customer Personal Information pursuant to the business purpose of providing the
                            Services to Customer in accordance with the Agreement.
                        </p>
                        <h4>No Sale of Customer Personal Information to PostHog</h4>
                        <p>
                            Customer and PostHog hereby acknowledge and agree that in no event shall the transfer of
                            Customer Personal Information from Customer to PostHog pursuant to the Agreement constitute
                            a sale of information to PostHog, and that nothing in the Agreement shall be construed as
                            providing for the sale of Customer Personal Information to PostHog.
                        </p>
                        <h4>Limitations on Use and Disclosure</h4>
                        <p>
                            PostHog is prohibited from using or disclosing Customer Personal Information for any purpose
                            other than the specific purpose of performing the Services specified in the Agreement, the
                            permitted business purposes set under applicable law, and as required under applicable law.
                            PostHog hereby certifies that it understands the foregoing restriction and will comply with
                            it in accordance with the requirements of applicable U.S. Data Protection Laws.
                        </p>
                        <h4>Data Subject Access Requests</h4>
                        <p>
                            PostHog will reasonably assist Customer with any data subject access, erasure or opt-out
                            requests and objections. If PostHog receives any request from data subjects, authorities, or
                            others relating to its data processing, PostHog will without undue delay inform Customer and
                            reasonably assist Customer with developing a response (but PostHog will not itself respond
                            other than to confirm receipt of the request, to inform the data subject, authority or other
                            third party that their request has been forwarded to Customer, and/or to refer them to
                            Customer, except per reasonable instructions from Customer). PostHog will also reasonably
                            assist Customer with the resolution of any request or inquiries that Customer receives from
                            data protection authorities relating to PostHog, unless PostHog elects to object such
                            requests directly with such authorities.
                        </p>
                        <h4>Effect of this Addendum</h4>
                        <p>
                            In the event of any conflict or inconsistency between the terms of this Addendum and the
                            terms of the Agreement with respect to the subject matter hereof and solely where U.S. Data
                            Protection Laws apply, the terms of this Addendum shall control.
                        </p>
                    </div>
                    <div>
                        <p>This section is specific to California residents.</p>
                        <p>
                            PostHog acts as a "Service Provider" and processes your personal information only to provide
                            services, not selling it.
                        </p>
                        <p>
                            We cannot use or disclose your personal information for other purposes and must comply with
                            U.S. Data Protection Laws. We'll help you with data access, erasure, or opt-out requests.
                        </p>
                        <p>
                            In case of any conflict between this Addendum and the main agreement regarding U.S. Data
                            Protection Laws, this Addendum prevails.
                        </p>
                    </div>

                    <div>
                        <h2 id="job-applications">
                            <strong>Job applications</strong>
                        </h2>
                    </div>
                    <div></div>
                    <div>
                        <p>
                            This section sets out how we collect, store, and process personal information as part of our
                            recruitment process. It only applies to users of our website who submit an application for
                            one of our open roles and is supplemental to the above Privacy Policy.
                        </p>
                        <p>
                            We use{' '}
                            <Link href="https://www.ashbyhq.com/" external>
                                Ashby
                            </Link>
                            , an online application provided by Ashby Inc., to assist with our recruitment process. We
                            use Ashby to process personal information as a data processor on our behalf. Ashby is only
                            entitled to process your personal data in accordance with our instructions.
                        </p>
                        <p>
                            Where you apply for a job opening posted by us, these provisions will apply to our
                            processing of your personal information. When you apply for a job opening via the
                            application function on a job site like LinkedIn or similar online service provider
                            (referred to below as a “Partner”), you should note that the relevant Partner may retain
                            your personal data and may also collect data from us in respect of the progress of your
                            application. Any use by the Partner of your data will be in accordance with the Partner’s
                            privacy policy.
                        </p>
                        <h3 id="information-we-collect-from-applicants">Information we collect from applicants</h3>
                        <h4 id="information-we-collect-from-you">Information we collect from you</h4>
                        <p className="mb-2">
                            We collect and process some or all of the following types of information from you:
                        </p>
                        <ul>
                            <li>
                                Information you provide when you apply for a role, including contact details such as
                                name, email address, physical address, telephone number
                            </li>
                            <li>
                                Information relating to your employment history such as resumé/CV, employment history,
                                qualifications and skills
                            </li>
                            <li>If you contact us, we may keep a record of that correspondence</li>
                            <li>A record of your progress through any hiring process that we may conduct</li>
                            <li>
                                Details of your visits to Ashby’s Website including, but not limited to, traffic data,
                                location data, weblogs and other communication data, the site that referred you to
                                Ashby’s Website and the resources that you access.
                            </li>
                        </ul>
                        <h4 id="information-we-collect-from-other-sources">
                            Information we collect from other sources
                        </h4>
                        <ul>
                            <li>
                                Ashby provides PostHog with the ability to link the data you provide to us, with other
                                publicly available information about you that you have published online, such as on
                                LinkedIn, GitHub or other public social media profiles.
                            </li>
                            <li>
                                Ashby allows PostHog to search various databases which may include your personal data
                                (including your CV or résumé), to find possible candidates to fill our job openings.
                                Where we find you in this way, we will obtain your personal data from these sources.
                            </li>
                            <li>
                                We may receive your personal data from a third party who recommends you as a candidate
                                for a specific job opening or for our business more generally.
                            </li>
                        </ul>
                    </div>
                    <div>
                        <p>
                            When you apply for a job with us, we collect and process your personal information using
                            Ashby, our applicant tracking system. We may also get information from public sources like
                            LinkedIn.
                        </p>
                    </div>
                    <div>
                        <h3 id="how-we-use-applicant-information">How we use applicant information</h3>
                    </div>
                    <div></div>
                    <div>
                        <p className="mb-2">
                            We <em>only</em> collect and use your personal information for the following purposes:
                        </p>
                        <ul>
                            <li>
                                To communicate with you about the role you have applied for and to manage the
                                recruitment process
                            </li>
                            <li>To consider your application for potential future job opportunities</li>
                        </ul>
                        <p>We will never use a candidate's personal information for marketing purposes. </p>
                        <h3 id="lawful-basis-and-purposes-for-processing-applicant-personal-information">
                            Lawful basis and purposes for processing applicant personal information
                        </h3>
                        <p>
                            If you are a national of countries in the European Economic Area (EEA), United Kingdom, or
                            Switzerland, we collect and process your personal information on the following legal bases
                            set out by applicable law:
                        </p>
                        <p>
                            <strong>Consent:</strong> We may ask you for your consent to process your personal
                            information. You can withdraw your consent at any time, which will not affect the lawfulness
                            of the processing before your consent was withdrawn.
                        </p>
                        <p>
                            <strong>Legitimate Interest:</strong> We process certain personal information for our
                            legitimate interests. These legitimate interests include, for example, running our
                            recruitment process and managing applicants.
                        </p>
                        <p>
                            <strong>Compliance with Legal Obligations</strong>: In some cases, we may have a legal
                            obligation to process your personal information, such as to meet our legal requirements or
                            in response to a court or regulatory order. We also may need to process your personal
                            information to protect vital interests, or to exercise, establish, or defend legal claims.
                        </p>
                    </div>
                    <div>
                        <p>
                            We use your data to manage the hiring process and for future job opportunities, but never
                            for marketing.
                        </p>
                    </div>
                    <div>
                        <h3 id="international-data-transfer-of-applicant-data">
                            International data transfer of applicant data
                        </h3>
                    </div>
                    <div></div>
                    <div className="md:pb-12">
                        <p>
                            Your personal information may be processed in the United States, the country where you have
                            applied for a job, or any other country where PostHog has team members or operations.
                        </p>
                        <p>
                            PostHog may transfer, store, or process your personal information in a country outside your
                            jurisdiction, including countries outside the European Economic Area (“EEA”), Switzerland,
                            and the United Kingdom. If we transfer personal information from the EEA, Switzerland, or
                            United Kingdom to a country outside it, such as the United States, we will enter into
                            Standard Contractual Clauses (“SCCs”) approved by the EU Commission or by the UK Government,
                            with the data importer, or take other measures to provide an adequate level of data
                            protection.
                        </p>
                        <h3 id="how-long-we-keep-applicant-personal-data">How long we keep applicant personal data</h3>
                        <p>
                            We will hold all the data for 24 months. Prior to that, your personal information will be
                            deleted if:
                        </p>
                        <ul>
                            <li>You delete your personal information; or</li>
                            <li>You write to us asking us to delete your personal information.</li>
                        </ul>
                        <h3 id="your-rights-and-choices-as-an-applicant">Your rights and choices as an applicant</h3>

                        <p>
                            Please see the section on{' '}
                            <SmoothScrollLink
                                to="privacy-practices"
                                spy={true}
                                smooth={true}
                                offset={-128}
                                duration={1500}
                                className="cursor-pointer"
                            >
                                Global Privacy Practices and Your Rights
                            </SmoothScrollLink>{' '}
                            above.
                        </p>
                    </div>
                    <div>
                        <p>
                            If you're from the EEA, UK, or Switzerland, we handle your data based on consent, legitimate
                            interest, or legal obligations. Your data may be processed outside your country, and we keep
                            it for 24 months unless you ask us to delete it.
                        </p>
                    </div>

                    <div>
                        <h2 id="dpa">
                            <strong>Data processing agreements</strong>
                        </h2>
                    </div>
                    <div></div>
                    <div className="md:pb-12">
                        <p>
                            If you need to enter into a Data Processing Agreement with us, the version you need will
                            depend on whether you have signed up for PostHog Cloud in the US or EU. Please visit our{' '}
                            <Link href="/dpa">world-class DPA generator</Link> and follow the instructions to have it
                            counter-signed by PostHog.
                        </p>
                    </div>
                    <div>
                        <p>
                            We'll counter-sign a data processing agreement after you generate one in our DPA generator
                            and send it to us.
                        </p>
                    </div>

                    <div>
                        <h2 id="security">
                            <strong>Security measures</strong>
                        </h2>
                    </div>
                    <div></div>
                    <div className="md:pb-12">
                        <p>
                            You can{' '}
                            <Link href="/handbook/company/security">view our complete set of security measures</Link>{' '}
                            for SOC 2, GDPR, and CCPA.
                        </p>
                    </div>
                    <div>
                        <p>Our internal security practices are available in our public handbook.</p>
                    </div>

                    <div>
                        <h2 id="contact-us">
                            <strong>Contacting PostHog about your privacy</strong>
                        </h2>
                    </div>
                    <div></div>
                    <div className="md:pb-12">
                        <p>
                            The relevant data controller for any personal information processed in connection with our
                            Websites or self-managed installations is PostHog Inc, 2261 Market Street #4008, San
                            Francisco, CA 94114. If you apply for a job with us, the relevant data controller is the
                            country-specific PostHog entity which will be your employer.
                        </p>

                        <p>
                            If you have any questions about this Privacy Policy or our privacy and security practices or
                            you wish to make a complaint about our compliance with applicable privacy laws, please feel
                            free to contact us at <a href="mailto:privacy@posthog.com">privacy@posthog.com</a>.
                        </p>

                        <p>
                            If your query is in connection with a job application, please email us at{' '}
                            <a href="mailto:careers@posthog.com">careers@posthog.com</a>.
                        </p>

                        <p>
                            We have appointed an EU and UK representative who can also be contacted at{' '}
                            <a href="mailto:privacy@posthog.com">privacy@posthog.com</a>.
                        </p>

                        <p>
                            If you have questions or concerns about the way we are handling your personal information,
                            or would like to exercise your privacy rights, please email us with the subject line
                            "Privacy Concern" at <a href="mailto:privacy@posthog.com">privacy@posthog.com</a>.
                        </p>

                        <p>
                            In most cases, we will respond within 30 days of receiving your message but please note for
                            promptest response, we recommend emailing us.
                        </p>
                    </div>
                    <div>
                        <p>
                            If you have questions or concerns about your privacy or want to file a complaint, email us
                            at privacy@posthog.com.
                        </p>
                        <p>For job applications, email careers@posthog.com.</p>
                    </div>
                    <div>
                        <h3>Privacy policy changes</h3>
                    </div>
                    <div>&nbsp;</div>
                    <div className="md:pb-12">
                        <p>
                            Although most changes are likely to be minor, PostHog may change its privacy policy from
                            time to time, and in PostHog's sole discretion.
                        </p>

                        <p>
                            We may also provide notification to customers who have provided us email addresses of
                            material changes to this Privacy Policy through our Website. PostHog encourages visitors to
                            frequently check this page for any minor changes to its Privacy Policy. Your continued use
                            of this site after any change in this Privacy Policy will constitute your acceptance of such
                            change.
                        </p>
                    </div>
                    <div>
                        <p>
                            We might change our privacy policy, so check our website often. Your use of our site means
                            you accept any changes.
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Privacy
