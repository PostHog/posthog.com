import React from 'react'
import Layout from 'components/Layout'
import { heading } from 'components/Home/classes'
import { SEO } from 'components/seo'
import { sexyLegalMenu } from '../navs'
import Link from 'components/Link'
import CloudinaryImage from 'components/CloudinaryImage'
import Tooltip from 'components/Tooltip'

const APP_LEGAL_URL = 'https://app.posthog.com/legal'

const PlaceholderTooltipContent = () => (
    <>
        Generate your BAA at{' '}
        <a href={APP_LEGAL_URL} target="_blank" rel="noopener noreferrer" className="underline">
            app.posthog.com/legal
        </a>{' '}
        to fill in your details and get it countersigned.
    </>
)

const Placeholder = ({ children }: { children: React.ReactNode }) => (
    <Tooltip content={() => <PlaceholderTooltipContent />} placement="top" className="[&_button]:cursor-auto">
        <span className="relative">
            <button type="button">
                <span className="bg-yellow/40 font-bold px-0.5 py-0.5">{children}</span>
            </button>
        </span>
    </Tooltip>
)

function BAAGenerator() {
    return (
        <Layout
            headerBlur={false}
            parent={sexyLegalMenu}
            activeInternalMenu={sexyLegalMenu.children.find(({ name }) => name.toLowerCase().includes('baa'))}
        >
            <SEO title="BAA" description="PostHog's Business Associate Agreement (BAA)" image={`/images/og/baa.png`} />

            <header className="print:hidden text-center">
                <h1 className={`${heading()} overflow-hidden pt-8 pb-1`}>
                    BAA? Try BA<em className="text-red">YAY</em>!
                </h1>
                <h2 className="mt-2 text-xl opacity-75 font-semibold leading-tight">
                    Read PostHog's Business Associate Agreement (BAA) below — and grab a countersigned copy in seconds.
                </h2>
            </header>

            <section className="grid @3xl:grid-cols-5 2xl:grid-cols-4 relative items-start mt-12 gap-4">
                <div className="@container @3xl:col-span-2 2xl:col-span-1 px-4 lg:px-8 @3xl:py-4 @3xl:max-h-screen @3xl:overflow-auto @3xl:sticky top-0">
                    <h2 className="mb-1 text-xl">Want a countersigned BAA?</h2>
                    <p className="text-sm">
                        Head to{' '}
                        <Link to={APP_LEGAL_URL} external className="font-semibold underline">
                            app.posthog.com/legal
                        </Link>{' '}
                        inside your PostHog organization. That's where you generate, sign, and download a real, valid
                        BAA — countersigned by us.
                    </p>
                    <p className="text-sm">
                        The version below is the exact same agreement, displayed here for your reading pleasure. It's
                        not binding on its own — it only counts once it's been generated and countersigned through the
                        app.
                    </p>
                    <p className="text-sm">
                        Important: You'll need to be subscribed to our <Link to="/platform-packages">Boost</Link>,{' '}
                        <Link to="/platform-packages">Scale</Link>, or <Link to="/platform-packages">Enterprise</Link>{' '}
                        package to get a BAA.
                    </p>

                    <Link
                        to={APP_LEGAL_URL}
                        external
                        className="inline-block mt-4 px-4 py-2 rounded bg-red text-white font-semibold no-underline hover:bg-red/90"
                    >
                        Generate a BAA in PostHog
                    </Link>

                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/bookworm_f7fd07d80b.png"
                        alt="Legal hog"
                        className="w-48 mt-8 mx-auto block"
                    />
                </div>

                <div className="@3xl:col-span-3 bg-white text-primary dark:text-black px-4 @3xl:px-8 pt-4 pb-24 border-y @3xl:border-y-0 border-primary @3xl:shadow-xl rounded relative">
                    <div className="bg-accent rounded-tl rounded-tr py-2 px-8 text-sm border-b border-light -mx-8 -mt-4 @3xl:pr-4 flex items-center justify-between print:hidden sticky top-[57px] @3xl:top-[108px] z-10 gap-4">
                        <div className="font-bold dark:text-white text-left">Business Associate Agreement preview</div>
                        <Link
                            to={APP_LEGAL_URL}
                            external
                            className="px-3 py-1.5 rounded bg-red text-white text-sm font-semibold no-underline hover:bg-red/90 whitespace-nowrap"
                        >
                            Get countersigned BAA
                        </Link>
                    </div>
                    <div className="pt-8">
                        <div className="bg-yellow/25 py-3 px-4 text-sm -mx-4 @3xl:-mx-8 mb-6 border-y border-light dark:text-black">
                            <strong>Heads up:</strong> This is a preview. To make it valid, generate it inside your
                            PostHog organization at{' '}
                            <a
                                href={APP_LEGAL_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline font-semibold"
                            >
                                app.posthog.com/legal
                            </a>{' '}
                            — that's the version we'll countersign.
                        </div>
                        <p>
                            This Business Associate Agreement ("Agreement") is entered into by and between
                            <strong>
                                {' '}
                                <Placeholder>[COMPANY NAME]</Placeholder>
                            </strong>{' '}
                            ("Covered Entity") and <strong>PostHog, Inc.</strong> ("Business Associate").
                        </p>
                        <p>
                            This Agreement is effective as of the date signed by Covered Entity's representative,{' '}
                            <Placeholder>[REPRESENTATIVE NAME]</Placeholder>, titled
                            <strong>
                                {' '}
                                <Placeholder>[REPRESENTATIVE TITLE]</Placeholder>
                            </strong>
                            .
                        </p>
                        <p>
                            This Agreement is entered into for the purpose of ensuring that Business Associate will
                            appropriately safeguard Protected Health Information (PHI) as required by the Health
                            Insurance Portability and Accountability Act of 1996 (HIPAA).
                        </p>
                        <p>
                            Capitalized terms used in this Agreement and not otherwise defined shall have the meanings
                            ascribed to them in HIPAA.
                        </p>
                        <p>
                            <strong>Business Associate Agreement — PostHog Inc.</strong>
                        </p>
                        <p>
                            This Business Associate Amendment (this "BAA"), effective as of the date electronically
                            agreed and excepted by you (the "BAA Effective Date"), is entered into by and between
                            Posthog Inc (""PostHog", ""we"", or ""us"") and the party that electronically accepts or
                            otherwise agrees or opts-in to this BAA (""Customer"", or ""you"").
                        </p>
                        <p>
                            You have entered into one or more agreements with us (each, as amended from time to time, an
                            "Agreement") governing the provision of our real-time error tracking, crash reporting, and
                            visibility service more fully described at posthog.com (the "Service"). This BAA will amend
                            the terms of the Agreement to reflect the parties' rights and responsibilities with respect
                            to the processing and security of your Protected Health Information (defined below) under
                            the Agreement; provided, however, that this BAA, and any obligations relating to compliance
                            with HIPAA hereunder, do not apply with respect to any Services (or features or
                            functionality thereof) that PostHog designates as not subject to this BAA, as indicated in
                            the applicable service interface, guidance, documentation, ordering materials, or otherwise,
                            even if such Services involve the processing of PHI . If you are accepting this BAA in your
                            capacity as an employee, consultant or agent of Customer, you represent that you are an
                            employee, consultant or agent of Customer, and that you have the authority to bind Customer
                            to this BAA.
                        </p>
                        <p>
                            This BAA is only available to customers with the applicable Platform Package, as defined
                            below, and is effective only if the Customer has the required package in place at the time
                            of signing. By signing this BAA, the Customer represents and warrants that they meet the
                            requirements of and have entered into the applicable Platform Package. This BAA shall be
                            null, void, and of no effect if the Customer does not meet those requirements at the time of
                            signing, regardless of whether this BAA has been electronically executed.
                        </p>
                        <p>
                            This BAA applies only to PostHog's processing of PHI for Customer in Customer's capacity as
                            a Covered Entity or Business Associate.
                        </p>
                        <p>
                            For good and valuable consideration, the sufficiency of which is hereby acknowledged, the
                            parties agree as follows:
                        </p>
                        <p>
                            Definitions.For the purposes of this BAA, capitalized terms shall have the meanings ascribed
                            to them below. All capitalized terms used but not otherwise defined herein will have the
                            meaning ascribed to them by HIPAA.
                        </p>
                        <p>
                            "HIPAA" means the Health Insurance Portability and Accountability Act of 1996 and
                            regulations promulgated thereunder, and the HITECH Act;
                        </p>
                        <p>
                            "HITECH Act" means the security provisions of the American Recovery and Reinvestment Act of
                            2009, also known as the Health Information Technology for Economic and Clinical Health Act;
                        </p>
                        <p>
                            "Protected Health Information" or "PHI" is any information, whether oral or recorded in any
                            form or medium that is created, received, maintained, or transmitted by PostHog for or on
                            behalf of Customer pursuant to this BAA, that identifies an individual or might reasonably
                            be used to identify an individual and relates to: (i) the individual's past, present or
                            future physical or mental health; (ii) the provision of health care to the individual; or
                            (iii) the past, present or future payment for health care;
                        </p>
                        <p>
                            "Secretary" shall refer to the Secretary of the U.S. Department of Health and Human
                            Services;
                        </p>
                        <p>
                            "Unsecured PHI" shall mean PHI that is not rendered unusable, unreadable, or indecipherable
                            to unauthorized individuals through the use of a technology or methodology specified by the
                            Secretary (e.g., encryption). This definition applies to both hard copy PHI and electronic
                            PHI.
                        </p>
                        <p>
                            "Platform Package" shall mean the package that the Customer must be paying for to receive
                            coverage with a BAA (either the Boost, Scale or Enterprise{' '}
                            <Link to="/platform-packages">package</Link>).
                        </p>
                        <p>
                            <strong>Customer Assurances.</strong>
                        </p>
                        <p>Customer represents and warrants as follows:</p>
                        <p>That it is a "Covered Entity" or a "Business Associate" as defined by HIPAA;</p>
                        <p>
                            That it shall comply with HIPAA in its use of the Service, including utilizing tools made
                            available in the Service to facilitate Customer's compliance with HIPAA's minimum necessary
                            requirement;
                        </p>
                        <p>
                            That it will not request that PostHog take any action that would violate HIPAA if performed
                            by Customer; and
                        </p>
                        <p>
                            That it will not request PostHog to use or disclose PHI in any manner that would violate
                            applicable federal or state laws if such use or disclosure were made by Customer.
                        </p>
                        <p>
                            <strong>PostHog's Assurances.</strong>
                        </p>
                        <p>
                            PostHog (1) shall not use or disclose PHI, other than as permitted or required by this BAA
                            and Agreement, or as required by law; (2) shall not use or disclose PHI in any manner that
                            violates applicable federal or state laws or would violate such laws if used or disclosed in
                            such manner by Customer; and (3) shall only use and disclose the minimum necessary PHI for
                            its specific purposes. Customer agrees that PostHog may rely on Customer's instructions to
                            determine if uses and disclosures meet this minimum necessary requirement.
                        </p>
                        <p>
                            PostHog may use the information received from Customer if necessary for (i) the proper
                            management and administration of PostHog; or (ii) to carry out the legal responsibilities of
                            PostHog. PostHog may disclose PHI for its proper management and administration provided
                            that: (1) disclosures are required by law; or (2) PostHog obtains reasonable assurances form
                            the person or entity to whom the information is disclosed that it will remain confidential
                            and used or further disclosed only as required by law or for the purpose for which it was
                            disclosed to the person or entity, and the person or entity notifies PostHog of any
                            instances of which it is aware in which the confidentiality of the information has been
                            breached.
                        </p>
                        <p>
                            PostHog will report to Customer any use or disclosure of PHI not provided for by this BAA of
                            which PostHog becomes aware, including breaches of Unsecured PHI subject to the following:
                        </p>
                        <p>
                            The parties acknowledge that unsuccessful attempts to access Unsecured PHI (e.g., pings and
                            other broadcast attacks on a firewall, denial of service attacks, port scans, unsuccessful
                            login attempts) occur within the normal course of business and the parties stipulate and
                            agree that this paragraph constitutes notice by PostHog to Customer for such unsuccessful
                            attempts; and
                        </p>
                        <p>
                            Communications by or on behalf of PostHog with Customer in connection with this Section 3(c)
                            shall not be construed as an acknowledgment by PostHog of any fault or liability with
                            respect to the breaches of Unsecured PHI.
                        </p>
                        <p>
                            PostHog will ensure that any subcontractors that create, receive, maintain, or transmit PHI
                            on PostHog's behalf agree to the same restrictions and conditions that apply to PostHog with
                            respect to such PHI.
                        </p>
                        <p>
                            Upon request of Customer or an individual, PostHog will promptly provide information to
                            Customer as may be reasonably necessary to facilitate Customer's compliance with its
                            obligation to: (i) make available to requesting individuals a copy of any PHI about such
                            individuals held by PostHog in a designated record set, in accordance with 45 CFR 164.524;
                            (ii) amend PHI or records about the requesting individual held by PostHog in a designated
                            record set, in accordance with 45 CFR 164.526; and (iii) provide to requesting individuals
                            an accounting of disclosures of PHI about such individuals made by Customer in the six (6)
                            years prior to the date of request, in accordance with 45 CFR 164.528.
                        </p>
                        <p>
                            In the event that any individual requests from PostHog access, amendment, or an accounting
                            of PHI, PostHog shall forward such request to Customer within five (5) business days.
                            Customer shall be responsible for responding to the individual's request and Customer agrees
                            that PostHog may respond to the individual directing them to make such request to Customer.
                        </p>
                        <p>
                            PostHog will comply with HIPAA security standards for electronic PHI. All Privacy and
                            security measures are found at https://posthog.com/docs/privacy
                        </p>
                        <p>
                            PostHog will make its internal practices, books, and records relating to the use and
                            disclosure of PHI received from, or created or received by PostHog on behalf of, Customer
                            available to the Secretary for the purpose of determining Customer's compliance with HIPAA.
                        </p>
                        <p>
                            To the extent that PostHog carries out Customer's obligations under HIPAA regulations,
                            PostHog will comply with the requirements of this Section 3 that apply to Customer in the
                            performance of such obligations.
                        </p>
                        <p>
                            PostHog will use appropriate safeguards to prevent use or disclosure of the PHI other than
                            as provided for by this BAA and to comply with the HIPAA Security Rule (Subpart C of 45 CFR
                            Part 164).
                        </p>
                        <p>
                            <strong>Privacy Rule.</strong>
                        </p>
                        <p>
                            Both Parties are committed to complying with all federal and state laws governing the
                            confidentiality and privacy of health information, including, but not limited to, the
                            Standards for Privacy of Individually Identifiable Health Information found at 45 CFR Part
                            160 and Part 164, Subparts A and E (collectively, the "Privacy Rule"); and
                        </p>
                        <p>
                            Both Parties intend to protect the privacy and provide for the security of Protected Health
                            Information disclosed to Business Associate pursuant to the terms of this Agreement, HIPAA
                            and other applicable laws.
                        </p>
                        <p>
                            Term.This BAA shall be effective on the BAA Effective Date, and shall remain in effect until
                            the earlier of: (i) the termination or expiration of the Agreement; or (ii) the termination
                            of this BAA in accordance with Section 6, below. (iii) The Customer unsubscribes from the
                            relevant Platform Package to be allowed the coverage of this BAA.
                        </p>
                        <p>
                            Termination.Customer may terminate this BAA upon written notice if PostHog materially
                            breaches a term of this BAA, and fails to cure the breach within thirty (30) days of
                            receiving written notice of it. PostHog may terminate this BAA upon written notice if
                            Customer either: (i) agrees to restrictions that impact PostHog's ability to perform its
                            obligations under the Agreement; (ii) agrees to restrictions that increase PostHog's cost of
                            performance under this BAA or the Agreement; or (iii) fails to meets its obligations under
                            HIPAA. The Parties may also terminate this BAA upon mutual consent.
                        </p>
                        <p>
                            <strong>Reporting Disclosures of PHI and Security Incidents.</strong>
                        </p>
                        <p>
                            Business Associate will report to Covered Entity in writing any use or disclosure of PHI not
                            provided for by this BAA of which it becomes aware and Business Associate agrees to report
                            to Covered Entity any Security Incident affecting Electronic PHI of Covered Entity of which
                            it becomes aware. Business Associate agrees to report any such event within five business
                            days of becoming aware of the event.
                        </p>
                        <p>
                            Suspension of Disclosure.In the event that Customer reasonably determines that PostHog has
                            breached its obligations under this BAA, Customer may, in addition to its other rights set
                            forth in this BAA, immediately stop all further disclosures of PHI to PostHog until the
                            breach has been resolved.
                        </p>
                        <p>
                            Return or Destruction of PHI upon Termination.Upon termination of this BAA, unless otherwise
                            directed by Customer, PostHog will return or destroy all PHI received from, created by, or
                            received on behalf of, Customer and will not retain copies of any such PHI; provided that in
                            the event PostHog deems return or destruction of such PHI unfeasible, the terms of this BAA
                            will survive termination and, for as long as PostHog retains that PHI, PostHog will use or
                            disclose it solely as permitted by law.
                        </p>
                        <p>
                            Miscellaneous.There are no third party beneficiaries to this BAA. Except as expressly
                            provided herein, nothing in this BAA will be deemed to waive or modify any of the provisions
                            of the Agreement (including limitations of liability), which otherwise remain in full force
                            and effect. If you have entered into more than one Agreement with us, this BAA will amend
                            each of the Agreements separately. In the event of a conflict or inconsistency between the
                            terms of this BAA and the terms of the Agreement, the terms of this BAA will control. The
                            parties recognize that electronic PHI is a subset of PHI and all references to PHI in this
                            BAA shall include electronic PHI. A reference in this BAA to a section of HIPAA means the
                            section as in effect or as amended, and for which compliance is required. Any ambiguity in
                            this BAA shall be resolved in favor of a meaning that permits PostHog to comply with HIPAA.
                            If any of the regulations promulgated under HIPAA are amended or interpreted in a manner
                            that renders this BAA inconsistent therewith, the parties shall cooperate in good faith to
                            amend this BAA to the extent necessary to comply with such amendments or interpretations.
                        </p>

                        <div className="mt-8">
                            <div className="grid grid-cols-[minmax(100px,200px)_1fr] items-baseline max-w-xl space-y-4 [&>p]:!mb-0">
                                <p className="mb-2 font-semibold col-span-full">
                                    <strong>Customer</strong>
                                </p>

                                <p>Signature</p>
                                <p className="border-b border-black w-full">&nbsp;</p>

                                <p>Representative Name</p>
                                <p className="border-b border-black">
                                    <Placeholder>[REPRESENTATIVE NAME]</Placeholder>
                                </p>

                                <p>Title</p>
                                <p className="border-b border-black">
                                    <Placeholder>[REPRESENTATIVE TITLE]</Placeholder>
                                </p>

                                <p>Email</p>
                                <p className="border-b border-black">
                                    <Placeholder>[REPRESENTATIVE EMAIL]</Placeholder>
                                </p>

                                <p>Date</p>
                                <p className="border-b border-black">&nbsp;</p>
                            </div>

                            <div className="grid grid-cols-[minmax(100px,200px)_1fr] items-baseline max-w-xl space-y-4 [&>p]:!mb-0">
                                <p className="mt-6 mb-2 font-semibold col-span-full">
                                    <strong>PostHog</strong>
                                </p>

                                <p>Signature</p>
                                <p className="border-b border-black">&nbsp;</p>

                                <p>Representative Name</p>
                                <p className="border-b border-black">Charles Cook</p>

                                <p>Title</p>
                                <p className="border-b border-black">VP Operations</p>

                                <p>Date</p>
                                <p className="border-b border-black">
                                    <code>[Document.CreatedDate]</code>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default BAAGenerator
