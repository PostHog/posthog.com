import React, { useState, useEffect, useRef } from 'react'
import { SEO } from 'components/seo'
import Layout from 'components/Layout'
import { heading, section } from 'components/Home/classes'
import { TrackedCTA } from 'components/CallToAction'
import Link from 'components/Link'
import { StaticImage } from 'gatsby-plugin-image'
import { IconRevert } from '@posthog/icons'
import Tooltip from 'components/Tooltip'

const IconPrint = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24">
        <path
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M9.25 10.75h-2.5m0 3v6.5a1 1 0 0 0 1 1h8.5a1 1 0 0 0 1-1v-6.5m-10.5 0h10.5m-10.5 0v3.5h-3a1 1 0 0 1-1-1v-8.5a1 1 0 0 1 1-1h16.5a1 1 0 0 1 1 1v8.5a1 1 0 0 1-1 1h-3v-3.5m-9.5-11h8.5a1 1 0 0 1 1 1v3H6.75v-3a1 1 0 0 1 1-1Z"
        />
    </svg>
)

function DpaGenerator() {
    const [companyName, setCompanyName] = useState('')
    const [companyAddress, setCompanyAddress] = useState('')
    const [yourName, setYourName] = useState('')
    const [yourTitle, setYourTitle] = useState('')
    const [date, setDate] = useState('')
    const [representativeEmail, setRepresentativeEmail] = useState('')
    const [jurisdiction, setJurisdiction] = useState('')
    const [supervisoryAuthority, setSupervisoryAuthority] = useState('')
    const [mode, setMode] = useState('legalese')
    const [isFormComplete, setIsFormComplete] = useState(false)
    const divRef = useRef(null)

    useEffect(() => {
        if (
            companyName &&
            companyAddress &&
            yourName &&
            yourTitle &&
            date &&
            representativeEmail &&
            jurisdiction &&
            supervisoryAuthority &&
            mode
        ) {
            setIsFormComplete(true)
        } else {
            setIsFormComplete(false)
        }
    }, [
        companyName,
        companyAddress,
        yourName,
        yourTitle,
        date,
        representativeEmail,
        jurisdiction,
        supervisoryAuthority,
        mode,
    ])

    const handlePrint = () => {
        window.print()
    }

    const handleReset = () => {
        setCompanyName('')
        setCompanyAddress('')
        setYourName('')
        setYourTitle('')
        setDate('')
        setRepresentativeEmail('')
        setJurisdiction('')
        setSupervisoryAuthority('')
    }

    return (
        <Layout>
            <SEO
                title="DPA generator"
                description="The data processing agreement (DPA) generator designed to spark joy"
                image={`/images/enterprise.png`}
            />
            <header>
                <h1 className={`${heading()} overflow-hidden pt-8 pb-1`}>
                    DPA? Try DP
                    <em className="dark:text-yellow">
                        <span className="text-red">YAY</span>!
                    </em>
                </h1>
                <h2 className={`mt-2 -mb-8 text-lg opacity-75 font-semibold text-balance text-center leading-tight`}>
                    The data processing agreement (DPA) generator designed to spark joy
                </h2>
            </header>

            <section className="grid md:grid-cols-5 2xl:grid-cols-4 relative items-start mt-12 md:mt-0 md:top-20 gap-4">
                <div className="@container md:col-span-2 2xl:col-span-1 px-4 lg:px-8 md:py-4 md:max-h-screen reasonable:max-h-[calc(100vh-56px)] md:overflow-auto md:sticky top-0 reasonable:top-[56px]">
                    <div className="flex justify-between items-center">
                        <h2 className="mb-1 text-xl">Enter your company details</h2>
                        <Tooltip content="Reset form" placement="top">
                            <span className="relative">
                                <button
                                    type="button"
                                    className="bg-accent dark:bg-accent-dark p-1 rounded"
                                    onClick={handleReset}
                                >
                                    <IconRevert className="size-6" />
                                </button>
                            </span>
                        </Tooltip>
                    </div>
                    <p className="text-sm">
                        We'll populate your DPA with this information. Once the form is completed, you can export to
                        PDF.
                    </p>
                    <form>
                        <div className="grid grid-cols-5 gap-1 @sm:gap-2 items-center">
                            <label className="col-span-5 @sm:col-span-2 text-sm" htmlFor="companyName">
                                Company Name
                            </label>
                            <input
                                type="text"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                placeholder="Company Name"
                                id="companyName"
                                className="col-span-5 @sm:col-span-3 mb-2 @sm:mb-0 bg-accent rounded border border-light hover:border-black/50"
                                required
                            />

                            <label className="col-span-5 @sm:col-span-2 text-sm" htmlFor="companyAddress">
                                Company Address
                            </label>
                            <input
                                type="text"
                                value={companyAddress}
                                onChange={(e) => setCompanyAddress(e.target.value)}
                                placeholder="Company Address"
                                id="companyAddress"
                                className="col-span-5 @sm:col-span-3 mb-2 @sm:mb-0 bg-accent rounded border border-light hover:border-black/50"
                                required
                            />

                            <label className="col-span-5 @sm:col-span-2 text-sm" htmlFor="yourName">
                                Representative Name
                            </label>
                            <input
                                type="text"
                                value={yourName}
                                onChange={(e) => setYourName(e.target.value)}
                                placeholder="Representative Name"
                                id="yourName"
                                className="col-span-5 @sm:col-span-3 mb-2 @sm:mb-0 bg-accent rounded border border-light hover:border-black/50"
                                required
                            />

                            <label className="col-span-5 @sm:col-span-2 text-sm" htmlFor="representativeEmail">
                                Representative Email
                            </label>
                            <input
                                type="email"
                                value={representativeEmail}
                                onChange={(e) => setRepresentativeEmail(e.target.value)}
                                placeholder="Representative Email"
                                id="representativeEmail"
                                className="col-span-5 @sm:col-span-3 mb-2 @sm:mb-0 bg-accent rounded border border-light hover:border-black/50"
                                required
                            />

                            <label className="col-span-5 @sm:col-span-2 text-sm" htmlFor="yourTitle">
                                Representative Title
                            </label>
                            <input
                                type="text"
                                value={yourTitle}
                                onChange={(e) => setYourTitle(e.target.value)}
                                placeholder="Representative Title"
                                id="yourTitle"
                                className="col-span-5 @sm:col-span-3 mb-2 @sm:mb-0 bg-accent rounded border border-light hover:border-black/50"
                                required
                            />

                            <label className="col-span-5 @sm:col-span-2 text-sm" htmlFor="date">
                                Date
                            </label>
                            <input
                                type="text"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                placeholder="Date"
                                id="date"
                                className="col-span-5 @sm:col-span-3 mb-2 @sm:mb-0 bg-accent rounded border border-light hover:border-black/50"
                                required
                            />

                            <label className="col-span-5 @sm:col-span-2 text-sm" htmlFor="jurisdiction">
                                Jurisdiction
                            </label>
                            <input
                                type="text"
                                value={jurisdiction}
                                onChange={(e) => setJurisdiction(e.target.value)}
                                placeholder="Jurisdiction"
                                id="jurisdiction"
                                className="col-span-5 @sm:col-span-3 mb-2 @sm:mb-0 bg-accent rounded border border-light hover:border-black/50"
                                required
                            />

                            <label className="col-span-5 @sm:col-span-2 text-sm" htmlFor="supervisoryAuthority">
                                Supervisory Authority
                            </label>
                            <input
                                type="text"
                                value={supervisoryAuthority}
                                onChange={(e) => setSupervisoryAuthority(e.target.value)}
                                placeholder="Supervisory Authority"
                                id="supervisoryAuthority"
                                className="col-span-5 @sm:col-span-3 mb-2 @sm:mb-0 bg-accent rounded border border-light hover:border-black/50"
                                required
                            />

                            <div className="col-span-5 @md:col-span-2 text-sm self-baseline pt-2">Format</div>

                            <ul className="flex flex-col col-span-5 @md:col-span-3 gap-2 list-none pt-2 pl-0">
                                <li>
                                    <input
                                        type="radio"
                                        id="legalese"
                                        name="mode"
                                        value="legalese"
                                        onChange={(e) => {
                                            setMode(e.target.value)
                                            if (divRef.current) {
                                                divRef.current.scrollIntoView({ behavior: 'smooth' })
                                            }
                                        }}
                                        checked={mode === 'legalese'}
                                    />
                                    <label className="ml-1 font-semibold text-[15px]" htmlFor="legalese">
                                        A legal doc, formatted by a designer
                                    </label>
                                    <br />
                                    <div className="block ml-5 text-[13px] opacity-75">
                                        Holds up in a court of law, but with a nicer font
                                    </div>
                                </li>
                                <li>
                                    <input
                                        type="radio"
                                        id="lawyer"
                                        name="mode"
                                        value="lawyer"
                                        onChange={(e) => {
                                            setMode(e.target.value)
                                            if (divRef.current) {
                                                divRef.current.scrollIntoView({ behavior: 'smooth' })
                                            }
                                        }}
                                    />
                                    <label className="ml-1 font-semibold text-[15px]" htmlFor="lawyer">
                                        Lawyer's love language
                                    </label>
                                    <br />
                                    <div className="block ml-5 text-[13px] opacity-75">
                                        The version they dream about
                                    </div>
                                </li>
                                <li>
                                    <input
                                        type="radio"
                                        id="fairytale"
                                        name="mode"
                                        value="fairytale"
                                        onChange={(e) => {
                                            setMode(e.target.value)
                                            if (divRef.current) {
                                                divRef.current.scrollIntoView({ behavior: 'smooth' })
                                            }
                                        }}
                                    />
                                    <label className="ml-1 font-semibold text-[15px]" htmlFor="fairytale">
                                        Fairytale
                                    </label>
                                    <br />
                                    <div className="block ml-5 text-[13px] opacity-75">
                                        "Explain it to me like I'm five"
                                    </div>
                                </li>
                                <li>
                                    <input
                                        type="radio"
                                        id="rap"
                                        name="mode"
                                        value="rap"
                                        onChange={(e) => {
                                            setMode(e.target.value)
                                            if (divRef.current) {
                                                divRef.current.scrollIntoView({ behavior: 'smooth' })
                                            }
                                        }}
                                    />
                                    <label className="ml-1 font-semibold text-[15px]" htmlFor="rap">
                                        Eminem edition
                                    </label>
                                    <br />
                                    <div className="block ml-5 text-[13px] opacity-75">
                                        Warning: May contain{' '}
                                        <span className="border border-black rounded-sm px-1 py-0.5 uppercase text-xs">
                                            explicit content
                                        </span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </form>
                </div>

                <div
                    ref={divRef}
                    className="article-content md:col-span-3 bg-white text-primary px-4 md:px-8 pt-4 shadow-xl rounded overflow-hidden"
                >
                    <div className="bg-accent py-2 px-8 text-sm text-center -mx-8 -mt-4 mb-8 flex items-center justify-between">
                        <div className="text-lg font-bold">Preview</div>
                        <div>
                            <Tooltip
                                content={
                                    isFormComplete
                                        ? "Use your browser's Export to PDF option"
                                        : 'Fill out all the fields to export to PDF'
                                }
                                placement="top"
                            >
                                <span className="relative">
                                    <TrackedCTA
                                        event={{ name: `clicked Print DPA` }}
                                        type="primary"
                                        size="sm"
                                        disabled={!isFormComplete}
                                        onClick={handlePrint}
                                        className="[&>span]:flex [&>span]:items-center [&>span]:gap-1"
                                    >
                                        <>
                                            <IconPrint className="size-5" />
                                            <span>Export to PDF</span>
                                        </>
                                    </TrackedCTA>
                                </span>
                            </Tooltip>
                        </div>
                    </div>

                    <div className={`${mode === 'fairytale' ? 'block' : 'hidden'}`}>
                        <div className="bg-accent p-4 text-sm text-center -mx-8 -mt-4 border-t border-light">
                            <strong>Notice:</strong> While this version is a great way to understand what the DPA says,
                            we don't recommend sending this version to the lawyers.
                        </div>
                        <h2 className="text-center !text-[2.25rem] text-balance !leading-snug py-8 font-fairytale-title">
                            Weaving a Magical Pact for Data Protection: An Enchanted Alliance
                        </h2>
                        <div className="[&>p]:text-[19px] [&>p]:leading-relaxed [&>p]:pb-6 [&_li]:text-[19px] [&_li]:leading-relaxed max-w-xl mx-auto font-fairytale">
                            <StaticImage
                                src="../../public/images/dpa/map.png"
                                alt="Map"
                                width={300}
                                className="float-right -mr-20 -mt-16"
                            />
                            <p>
                                Once upon a time in the enchanted land of Data, a wise and gentle kingdom known as the
                                Company sought to ensure that all its precious treasures—bits and bytes of
                                knowledge—were safely guarded. To do this, they reached out to the guardian wizards of
                                PostHog Inc., a famed group known for their powerful data spells and secure magic
                                vaults.
                            </p>

                            <StaticImage
                                src="../../public/images/dpa/sword.png"
                                alt="Sword"
                                width={300}
                                className="float-left -ml-20 -mt-16"
                            />
                            <p>
                                The Company and the PostHog wizards agreed to create a magical pact called the "Data
                                Protection Agreement," ensuring that all the treasures would be handled with care and
                                respect for the laws of the land, including the ancient scrolls of GDPR and the mystical
                                tomes of the EEA.
                            </p>

                            <StaticImage
                                src="../../public/images/dpa/wizard.png"
                                alt="Wizard"
                                width={300}
                                className="float-right -mr-20"
                            />

                            <p>
                                The Company, a noble Data Controller, entrusted its treasures to the PostHog wizards.
                                The wizards promised to safeguard the treasures by using their enchanted tools and
                                secret spells to process and analyze the data. They vowed never to use the treasures for
                                evil and always to follow the Company's wise instructions.
                            </p>

                            <StaticImage
                                src="../../public/images/dpa/nomes.png"
                                alt="Nomes"
                                width={300}
                                className="float-left -ml-20 -mt-16"
                            />
                            <p>
                                In the depths of their crystal-clear agreement, they outlined the adventures the data
                                could undertake and specified who could handle the data, ensuring that only the most
                                trusted apprentice wizards or external guardians could assist in safeguarding it. Each
                                apprentice was sworn to secrecy with a magical oath to protect the Company's treasures.
                            </p>

                            <p>
                                They built a fortress of security measures, enchantments so strong that only those with
                                the right spells could access the treasures. They agreed to help each other in times of
                                trouble, like when a data gremlin might sneak in to create mischief.
                            </p>

                            <StaticImage
                                src="../../public/images/dpa/porridge.png"
                                alt="Porridge"
                                width={300}
                                className="float-right -mr-20"
                            />
                            <p>
                                The Company and PostHog celebrated their alliance with a grand feast in the grand hall,
                                signing their pact with quill and enchanted ink. They agreed that their magical contract
                                would be overseen by the wise elders of the land—judges from the jurisdiction of England
                                and Wales.
                            </p>

                            <p>
                                As the years passed, their partnership flourished. The Company's treasures were kept
                                safe and grew in wisdom, bringing joy and prosperity to the land. And they all lived
                                securely and data-compliantly ever after.
                            </p>
                        </div>
                    </div>

                    <div className={`${mode === 'rap' ? 'block' : 'hidden'} [&>p]:text-[15px]`}>
                        <p>
                            Alright, check this, we're diving into the realm where data's a treasure,
                            <br />
                            With PostHog Inc. and the Company, teaming up for the measure.
                            <br />
                            It's like a contract forged in the depths of digital dungeons,
                            <br />
                            Securing data flow, yo, this ain't just assumptions.
                        </p>
                        <p>
                            First up, the Company's the Controller, holding keys to the kingdom,
                            <br />
                            Handing tasks to PostHog, who process with wisdom.
                            <br />
                            They're setting up the stage with an Agreement, that's the plan,
                            <br />
                            Linking it to the Service Contract, like only true pros can.
                        </p>
                        <p>
                            They call it the DPA—Data Processing Agreement,
                            <br />
                            Laying down the law in every single statement.
                            <br />
                            From GDPR to EEA, they keep it tight,
                            <br />
                            Making sure every byte moves right in the night.
                        </p>
                        <p>
                            Definitions laid out, so everything's clear,
                            <br />
                            No misunderstandings or confusion here.
                            <br />
                            "Company Personal Data," that's the treasure they guard,
                            <br />
                            Processing it right, giving it the highest regard.
                        </p>
                        <p>
                            Now, let's break it down, how PostHog's gonna act,
                            <br />
                            With integrity and security, that's a fact.
                            <br />
                            Only on instructions, they move the data 'round,
                            <br />
                            Bound by laws, where compliance is found.
                        </p>
                        <p>
                            If there’s a breach, PostHog’s on the line,
                            <br />
                            To notify the Company in no time.
                            <br />
                            Security's tight, with measures that protect,
                            <br />
                            Keeping personal data in check, direct.
                        </p>
                        <p>
                            Subprocessors in the mix, they gotta comply,
                            <br />
                            Matching standards set high, reaching the sky.
                            <br />
                            If the Company objects, yo, there's a route to appeal,
                            <br />
                            Ensuring every subcontractor keeps it real.
                        </p>
                        <p>
                            Rights of the data subjects, they're front and center,
                            <br />
                            PostHog assists the Company to enter,
                            <br />
                            Handling requests, ensuring privacy’s respected,
                            <br />
                            Under laws so tight, they're perfectly projected.
                        </p>
                        <p>
                            Audit rights, they got it locked,
                            <br />
                            Transparency in actions, securely docked.
                            <br />
                            When the service ends, data’s returned or erased,
                            <br />
                            No traces left behind, nothing misplaced.
                        </p>
                        <p>
                            Cross-border data flow, yeah, they cover that too,
                            <br />
                            With Standard Contractual Clauses in view.
                            <br />
                            Legal frameworks ensuring data’s safe transit,
                            <br />
                            Over borders, under laws, keeping it legit.
                        </p>
                        <p>
                            In this digital game, the stakes are high,
                            <br />
                            But with this Agreement, compliance ain’t no lie.
                            <br />
                            So here's to the Company and PostHog, leaders of the pact,
                            <br />
                            Guarding data like treasure, with every detail intact.
                        </p>
                        <p>
                            Yo, this ain’t just business, it's a fortress in rhyme,
                            <br />
                            Securing data pathways, through every byte and line.
                        </p>
                    </div>

                    <div
                        className={`${mode === 'legalese' || mode === 'lawyer' ? 'block' : 'hidden'} ${
                            mode === 'legalese' && ''
                        } ${mode === 'lawyer' && 'font-serif'} [&>p]:text-[15px] [&_li]:text-[15px] max-w-3xl mx-auto`}
                    >
                        <h2 className="!text-xl">Data Processing Agreement — PostHog Inc.</h2>
                        <p>
                            This Data Processing Agreement (“<strong>Agreement</strong>”) forms part of the Contract for
                            Services (“<strong>Principal Agreement</strong>”) between{' '}
                            <Tooltip
                                content={() => (
                                    <>
                                        Fill out the form <span className="md:hidden">at the top</span>
                                        <span className="hidden md:inline-block">to the left</span> populate these
                                        fields
                                    </>
                                )}
                                placement="top"
                                className="[&_button]:cursor-auto"
                            >
                                <span className="relative">
                                    <button type="button">
                                        <label htmlFor="companyName" className="bg-yellow/40 font-bold px-0.5 py-0.5">
                                            {companyName ? companyName : '[COMPANY NAME]'}
                                        </label>
                                    </button>
                                </span>
                            </Tooltip>{' '}
                            (the “<strong>Company</strong>”) and PostHog Inc. (the “<strong>Processor</strong>”)
                            (together as the “<strong>Parties</strong>”).
                        </p>
                        <p>WHEREAS</p>
                        <p>(A) The Company acts as a Data Controller.</p>
                        <p>
                            (B) The Company wishes to subcontract certain Services, which imply the processing of
                            personal data, to the Processor.
                        </p>
                        <p>
                            (C) The Parties seek to implement a data processing agreement that complies with applicable
                            Data Protection Laws (as defined below) (D) The Parties wish to lay down their rights and
                            obligations.
                        </p>
                        <p>IT IS AGREED AS FOLLOWS:</p>
                        <p>
                            <strong>1. Definitions and Interpretation</strong>
                        </p>
                        <div className="pl-8">
                            <p>
                                {' '}
                                1.1. Unless otherwise defined herein, capitalized terms and expressions used in this
                                Agreement shall have the following meaning:
                            </p>
                            <div className="pl-8">
                                <p>1.1.1. “Agreement” means this Data Processing Agreement and all Annexes;</p>
                                <p>
                                    1.1.2. “Company Personal Data” means any Personal Data provided to or Processed by
                                    the Processor on behalf of the Company pursuant to or in connection with the
                                    Principal Agreement;
                                </p>
                                <p>
                                    1.1.3. “Data Protection Laws” means all applicable laws relating to Processing of
                                    Personal Data and privacy that may exist in any relevant jurisdiction, including
                                    European Data Protection Laws;
                                </p>
                                <p>1.1.4. “EEA” means the European Economic Area;</p>
                                <p>
                                    1.1.5. “EU Personal Data” means the Processing of Personal Data to which (i) data
                                    protection legislation of the European Union, or of a Member State of the European
                                    Union or EEA, was applicable prior to the Processing by the Processor;
                                </p>
                                <p>
                                    1.1.6. “European Data Protection Laws” means the GDPR, UK Data Protection Act 2018,
                                    the UK GDPR, ePrivacy Directive 2002/58/EC, FADP, and any associated or additional
                                    legislation in force in the EU, EEA, Member States and the United Kingdom as
                                    amended, replaced or superceded from time to time;
                                </p>
                                <p>
                                    1.1.7. “FADP” means the Swiss Federal Act on Data Protection and its Ordinances, as
                                    amended from time to time;
                                </p>
                                <p>
                                    1.1.8. “FDPIC” means the Swiss Federal Data Protection and Information Commissioner;
                                </p>
                                <p>1.1.9. “GDPR” means General Data Protection Regulation EU2016/679;</p>
                                <p>
                                    1.1.10. “UK GDPR” means General Data Protection Regulation (EU) 2016/679 as
                                    applicable as part of UK domestic law by virtue of section 3 of the European Union
                                    (Withdrawal) Act 2018 and as amended by the Data Protection, Privacy and Electronic
                                    Communications (Amendments etc) (EU Exit) Regulations 2019 (as amended);
                                </p>
                                <p>
                                    1.1.11. “Protected Area” means (i) in the case of EU Personal Data, the member
                                    states of the European Union and the EEA and any country, territory, sector or
                                    international organisation in respect of which an adequacy decision under Art 45
                                    GDPR is in force or (ii) in the case of UK Personal Data, the United Kingdom and any
                                    country, territory, sector or international organisation in respect of which an
                                    adequacy decision under UK adequacy regulations is in force; or (iii) in the case of
                                    Swiss Personal Data, any country, territory, sector or international organisation
                                    which is recognised as adequate by the FDPIC or the Swiss Federal Council (as the
                                    case may be);
                                </p>
                                <p>
                                    1.1.12. “Services” means the product and data analytics services the Processor
                                    provides.
                                </p>
                                <p>
                                    1.1.13. “Subprocessor” means any person appointed by or on behalf of Processor to
                                    Process Personal Data on behalf of the Company in connection with the Agreement.
                                </p>
                            </div>
                            <p>
                                1.2. The terms, “Controller”, “Data Subject”, “Member State”, “Personal Data”, “Personal
                                Data Breach”, “Processing” and “Supervisory Authority” shall have the same meaning as in
                                the GDPR and UK GDPR, and their cognate terms shall be construed accordingly.
                            </p>
                        </div>
                        <p>
                            <strong>2. Processing of Company Personal Data</strong>
                        </p>
                        <div className="pl-8">
                            <p>2.1. The Company shall:</p>
                            <div className="pl-8">
                                <p>
                                    2.1.1. ensure that any and all information or data, including without limitation
                                    Company Personal Data, is collected, processed, transferred and used in full
                                    compliance with Data Protection Laws;
                                </p>
                                <p>
                                    2.1.2. be solely responsible for ensuring that it has all obtained all necessary
                                    authorizations and consents from any Data Subjects to Process Company Personal Data
                                    and in particular any consents needed to meet the cookie requirements in the
                                    ePrivacy Directive 2002/58/EC and any associated national legislation;
                                </p>
                                <p>2.1.3. instruct the Processor to process Company Personal Data.</p>
                            </div>
                            <p>2.2. Processor shall:</p>
                            <div className="pl-8">
                                <p>
                                    2.2.1. comply with all applicable Data Protection Laws in the Processing of Company
                                    Personal Data; and
                                </p>
                                <p>
                                    2.2.2. not Process Company Personal Data other than on the relevant Company’s
                                    documented instructions including with regard to data transfers outside of the
                                    Protected Area, unless required to do so by laws to which the Processor is subject;
                                    in such a case, Processor shall inform the Company of that legal requirement before
                                    Processing, unless that law prohibits such information on important grounds of
                                    public interest. The Company acknowledges that as part of the processing
                                    instructions, Processor may aggregate, anonymise, extract and combine or otherwise
                                    deidentify information resulting from the Company’s use of the licensed materials
                                    and services for product improvement, benchmarking, and the development of new
                                    products; and
                                </p>
                                <p>
                                    2.2.3. notify the Company immediately if, in the Processor’s reasonable opinion, an
                                    instruction for the Processing of Personal Data given by the Company infringes
                                    applicable Data Protection Laws , it being acknowledged that the Processor shall not
                                    be obliged to undertake additional work or screening to determine if the Company’s
                                    instructions are compliant.
                                </p>
                            </div>
                        </div>
                        <p>
                            <strong>3. Processor Personnel</strong>
                        </p>
                        <div className="pl-8">
                            <p>
                                3.1. Processor shall take reasonable steps to ensure the reliability of any personnel
                                who may have access to the Company Personal Data, ensuring that all such individuals are
                                subject to confidentiality undertakings or professional or statutory obligations of
                                confidentiality with respect to such Company Personal Data.
                            </p>
                        </div>
                        <p>
                            <strong>4. Security</strong>
                        </p>
                        <div className="pl-8">
                            <p>
                                4.1. Taking into account the state of the art, the costs of implementation and the
                                nature, scope, context and purposes of Processing as well as the risk of varying
                                likelihood and severity for the rights and freedoms of natural persons, Processor shall
                                in relation to the Company Personal Data implement appropriate technical and
                                organizational measures to ensure a level of security appropriate to that risk,
                                including, as appropriate, the measures referred to in Article 32(1) of the GDPR and UK
                                GDPR. These measures include those at Annex II.
                            </p>
                        </div>
                        <p>
                            <strong>5. Subprocessing</strong>
                        </p>
                        <div className="pl-8">
                            <p>
                                5.1. The Company provides Processor with general authorisation to engage Subprocessors.
                            </p>
                            <p>
                                5.2. Processor shall enter into a written contract with any Subprocessor and this
                                contract shall impose upon the Subprocessor equivalent obligations as imposed by this
                                Agreement upon the Processor. Where the Subprocessor fails to fulfil its data protection
                                obligations, Processor shall remain fully liable to the Company for the performance of
                                the Subprocessors obligations.
                            </p>
                            <p>
                                5.3. The list of Subprocessors engaged by the Processor can be found at Annex III.
                                Processor may update this list from time to time as applicable, providing the Company
                                with notice of such update at least fourteen (14) days in advance of such updates.
                            </p>
                            <p>
                                5.4. If the Company objects to a Subprocessor, the Company shall notify Processor
                                thereof in writing within seven (7) days after receipt of Processor’s updated
                                Subprocessors list. If the Company objects to the use of the Subprocessor, Processor
                                shall use efforts to address the objection through one of the following options: (a)
                                Processor will cancel its plans to use Subprocessor with regard to Company Personal Data
                                or will offer an alternative to provide the Services without such Subprocessor; or (b)
                                Processor will take any corrective steps requested by the Company in its objection
                                (which would therefore remove the Company’s objection) and proceed to use Subprocessor.
                                If none of the above options are reasonably available and the objection has not been
                                sufficiently addressed within thirty (30) days after Processor’s receipt of the
                                Company’s objection, the Company may terminate the affected Service with reasonable
                                prior written notice.
                            </p>
                        </div>
                        <p>
                            <strong>6. Data Subject Rights and Cooperation</strong>
                        </p>
                        <div className="pl-8">
                            <p>
                                6.1. Taking into account the nature of the Processing, Processor shall assist the
                                Company by implementing appropriate technical and organisational measures, insofar as
                                this is possible, for the fulfilment of the Company obligations, as reasonably
                                understood by Company, to respond to requests to exercise Data Subject rights under
                                applicable Data Protection Laws.
                            </p>
                        </div>
                        <p>6.2. Processor shall:</p>
                        <div className="pl-8">
                            <p>
                                6.2.1. notify Company if it receives a request from a Data Subject under any Data
                                Protection Law in respect of Company Personal Data; and
                            </p>
                            <p>
                                6.2.2. ensure that it does not respond to that request except on the documented
                                instructions of Company or as required by applicable laws to which the Processor is
                                subject.
                            </p>
                        </div>
                        <p>
                            6.3. To the extent required under Data Protection Laws, Processor shall (taking into account
                            the nature of the processing and the information available to Processor) provide all
                            reasonably requested information regarding the Service to enable the Company to carry out
                            data protection impact assessments or prior consultations with data protection authorities
                            and to assist the Company with meeting its obligations under Article 32 GDPR/UK GDPR as
                            required by Data Protection Laws.
                        </p>
                        <p>
                            6.4. To the extent that assistance under this Agreement is not included within the Services,
                            the Processor may charge a reasonable fee for any such assistance, save where assistance was
                            required directly as a result of the Processor’s own acts or omissions, in which case such
                            assistance will be at the Processor’s expense.
                        </p>
                        <p>
                            <strong>7. Personal Data Breach</strong>
                        </p>
                        <div className="pl-8">
                            <p>
                                7.1. Processor shall notify Company without undue delay upon Processor becoming aware of
                                a Personal Data Breach affecting Company Personal Data, providing Company with
                                sufficient information to allow the Company to meet any obligations to report or inform
                                Data Subjects or Supervisory Authorities of the Personal Data Breach under applicable
                                Data Protection Laws.
                            </p>
                            <p>
                                7.2. Processor shall cooperate with the Company and take reasonable commercial steps as
                                are directed by Company to assist in the investigation, mitigation and remediation of
                                each such Personal Data Breach.
                            </p>
                        </div>
                        <p>
                            <strong>8. Audits</strong>
                        </p>
                        <div className="pl-8">
                            <p>
                                8.1. The Processor shall make available to the Company all information reasonably
                                necessary to demonstrate compliance with this Agreement and at the cost of the Company,
                                allow for and contribute to audits, including inspections by the Company in order to
                                assess compliance with this Agreement.
                            </p>
                        </div>
                        <p>
                            <strong>9. Deletion or return of Company Personal Data</strong>
                        </p>
                        <div className="pl-8">
                            <p>
                                9.1. Following a request from the Company, Processor shall promptly and in any event
                                within 10 business days of the date of cessation of any Services involving the
                                Processing of Company Personal Data , return or delete and procure the deletion of all
                                copies of the Company Personal Data unless applicable laws require storage of such
                                Customer Personal Data.
                            </p>
                        </div>
                        <p>
                            <strong>10. Data Transfer Outside of the Protected Area</strong>
                        </p>
                        <div className="pl-8">
                            <p>
                                10.1. The Company acknowledges that the Processor will Process the Personal Data outside
                                of the Protected Area including in the US.
                            </p>
                            <p>
                                10.2. As such, the parties agree to comply with the obligations set out in the{' '}
                                <Link
                                    href="https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:32021D0914&qid=1694542707177"
                                    className="!text-red"
                                    external
                                >
                                    EU Standard Contractual Clauses
                                </Link>{' '}
                                as though they were set out in full in this Agreement, with the Company as the “data
                                exporter” and the Processor as the “data importer”, with the parties signatures and
                                dating of this Agreement being deemed to be the signature and dating of the Standard
                                Contractual Clauses and with Annexes to EU Standard Contractual Clauses and the
                                Appendices to the UK Standard Contractual Clauses being as set out in Annex I and II of
                                this Agreement
                            </p>
                            <p>10.3. In relation to the EU Standard Contractual Clauses, the Parties agree that:</p>
                            <div className="pl-8">
                                <p>
                                    10.3.1. for the purposes of clause 9, option 2 (general written authorisation for
                                    subprocessors) shall apply and the Parties agree that the time period for notifying
                                    changes to the list shall be in accordance with Clause 5.3 above;
                                </p>
                                <p>
                                    10.3.2. for the purposes of clause 17, the clauses shall be governed by the laws of{' '}
                                    <span className="bg-yellow/40 font-bold px-0.5">
                                        {jurisdiction ? jurisdiction : '[Jurisdiction]'}
                                    </span>
                                    ;
                                </p>
                                <p>
                                    10.3.3. for the purposes of clause 18, the courts of{' '}
                                    <span className="bg-yellow/40 font-bold px-0.5">
                                        {jurisdiction ? jurisdiction : '[Jurisdiction]'}
                                    </span>{' '}
                                    shall have jurisdiction;
                                </p>
                                <p>
                                    10.3.4. for the purposes of clause 13 and Annex I.C, the{' '}
                                    <span className="bg-yellow/40 font-bold px-0.5">
                                        {supervisoryAuthority ? supervisoryAuthority : '[Supervisory Authority]'}
                                    </span>
                                </p>
                            </div>
                            <p>
                                10.4. In relation to the UK Standard Contractual Clauses, as permitted by clause 17 of
                                such Addendum, the Parties agree to change the format of the information set out in Part
                                1 of the Addendum so that:
                            </p>
                            <div className="pl-8">
                                <p>
                                    10.4.1. the details of the parties in table 1 shall be as set out in Annex I (with
                                    no requirement for signature);
                                </p>
                                <p>
                                    10.4.2. for the purposes of table 2, the Addendum shall be appended to the EU
                                    Standard Contractual Clauses as defined above (including the selection of modules
                                    and options and the disapplication of optional clauses as noted above); and
                                </p>
                                <p>10.4.3. the appendix information listed in table 3 is set out in Annex I and II.</p>
                            </div>
                            <p>
                                10.5. In relation to Swiss Personal Data that is transferred outside of the Protected
                                Area, the Parties agree that such transfers shall be subject to the EU Standard
                                Contractual Clauses as compiled and completed in Sections 10.2 and 10.3 above, with the
                                following amendments: (a) any references to the GDPR shall be interpreted as references
                                to the FADP; (b) references to the EU and EU Member States shall be interpreted to mean
                                Switzerland; (c) the competent supervisory authority according to Clause 13(a) and Part
                                C of Annex I is the FDPIC insofar as the data transfers are governed by the FADP; (d)
                                the term EU Member State shall not be interpreted in such a way as to exclude data
                                subject in Switzerland from the possibility of suing for their rights in their place of
                                habitual residence in accordance with Clause 18(c) of the EU Standard Contractual
                                Clauses; and (e) until the entry into force of the revised FADP on 1 September 2023, the
                                EU Standard Contractual Clauses shall also protect the personal data of legal entities
                                and legal entities shall receive the same protection under the EU Standard Contractual
                                Clauses as natural persons.
                            </p>
                            <p>
                                10.6. In the event of any conflict between this Agreement and the Standard Contractual
                                Clauses, the Standard Contractual Clauses shall prevail.
                            </p>
                            <p>
                                10.7. In the event that the Standard Contractual Clauses are no longer valid for use
                                under the GDPR or UK GDPR, the Parties agree to promptly implement a replacement
                                transfer mechanism, and making such further amendments to the application of such
                                replacement mechanism, as the Processor deems reasonably necessary.
                            </p>
                        </div>
                        <p>
                            <strong>11. General Terms</strong>
                        </p>
                        <div className="pl-8">
                            <p>
                                11.1. Confidentiality. Each Party must keep this Agreement and information it receives
                                about the other Party and its business in connection with this Agreement (“Confidential
                                Information”) confidential and must not use or disclose that Confidential Information
                                without the prior written consent of the other Party except to the extent that:
                            </p>
                            <div className="pl-8">
                                <p>11.1.1. disclosure is required by law;</p>
                                <p>11.1.2. the relevant information is already in the public domain.</p>
                            </div>
                            <p>
                                11.2. Notices. All notices and communications given under this Agreement must be in
                                writing and will be delivered personally, sent by post or sent by email to the address
                                or email address set out in the heading of this Agreement at such other address as
                                notified from time to time by the Parties changing address,
                            </p>
                            <p>
                                11.3. Governing Law and Jurisdiction. This Agreement is governed by the laws of England
                                and Wales.
                            </p>
                        </div>
                        <p>
                            IN WITNESS WHEREOF, this Agreement is entered into with effect from the date first set out
                            below.
                        </p>
                        <p>
                            <Tooltip
                                content={() => (
                                    <>
                                        Fill out the form <span className="md:hidden">at the top</span>
                                        <span className="hidden md:inline-block">to the left</span> populate these
                                        fields
                                    </>
                                )}
                                placement="top"
                                className="[&_button]:cursor-auto"
                            >
                                <span className="relative">
                                    <button type="button">
                                        <label htmlFor="companyName" className="bg-yellow/40 font-bold px-0.5 py-0.5">
                                            {companyName ? companyName : '[COMPANY NAME]'}
                                        </label>
                                    </button>
                                </span>
                            </Tooltip>
                        </p>
                        <div className="grid grid-cols-[minmax(100px,200px)_1fr] items-baseline max-w-xl space-y-4 [&>p]:!mb-0">
                            <p>Signature</p>
                            <p className="border-b border-black w-full">&nbsp;</p>

                            <p>Name </p>
                            <p className="border-b border-black w-full">
                                <Tooltip
                                    content={() => (
                                        <>
                                            Fill out the form <span className="md:hidden">at the top</span>
                                            <span className="hidden md:inline-block">to the left</span> populate these
                                            fields
                                        </>
                                    )}
                                    placement="top"
                                    className="[&_button]:cursor-auto"
                                >
                                    <span className="relative">
                                        <button type="button">
                                            <label htmlFor="yourName" className="bg-yellow/40 font-bold px-0.5 py-0.5">
                                                {yourName ? yourName : '[REPRESENTATIVE NAME]'}
                                            </label>
                                        </button>
                                    </span>
                                </Tooltip>
                            </p>

                            <p>Title</p>
                            <p className="border-b border-black w-full">
                                <Tooltip
                                    content={() => (
                                        <>
                                            Fill out the form <span className="md:hidden">at the top</span>
                                            <span className="hidden md:inline-block">to the left</span> populate these
                                            fields
                                        </>
                                    )}
                                    placement="top"
                                    className="[&_button]:cursor-auto"
                                >
                                    <span className="relative">
                                        <button type="button">
                                            <label htmlFor="yourTitle" className="bg-yellow/40 font-bold px-0.5 py-0.5">
                                                {yourTitle ? yourTitle : '[REPRESENTATIVE TITLE]'}
                                            </label>
                                        </button>
                                    </span>
                                </Tooltip>
                            </p>

                            <p>Date</p>
                            <p className="border-b border-black w-full">
                                <Tooltip
                                    content={() => (
                                        <>
                                            Fill out the form <span className="md:hidden">at the top</span>
                                            <span className="hidden md:inline-block">to the left</span> populate these
                                            fields
                                        </>
                                    )}
                                    placement="top"
                                    className="[&_button]:cursor-auto"
                                >
                                    <span className="relative">
                                        <button type="button">
                                            <label htmlFor="date" className="bg-yellow/40 font-bold px-0.5 py-0.5">
                                                {date ? date : '[DATE]'}
                                            </label>
                                        </button>
                                    </span>
                                </Tooltip>
                            </p>

                            <p className="col-span-2 !mt-8">
                                <strong>PostHog, Inc.</strong>
                            </p>

                            <p>Signature</p>
                            <p className="border-b border-black w-full">&nbsp;</p>

                            <p>Name</p>
                            <p className="border-b border-black w-full">Fraser Hopper</p>

                            <p>Title</p>
                            <p className="border-b border-black w-full">Operations & Finance Lead</p>

                            <p>Date</p>
                            <p className="border-b border-black w-full">&nbsp;</p>
                        </div>
                        <p className="text-center mt-20">
                            <strong>ANNEX I</strong>
                        </p>
                        <div className="ml-12">
                            <p>
                                <strong>A. Processing Activities:</strong>
                            </p>
                            <p>
                                <strong>Subject matter of the processing</strong>
                            </p>
                        </div>

                        <p>The personal data shall be processed in order to allow Processor to provide the Services.</p>

                        <div className="ml-12">
                            <p>
                                <strong>Nature and purpose of the processing</strong>
                            </p>
                        </div>

                        <p>Product analytics, including insights, heatmaps, session recording and feature flags.</p>

                        <p>
                            <strong className="underline">Duration</strong>
                        </p>
                        <p>For the duration of the Principal Agreement.</p>

                        <p>
                            <strong>Categories of data subjects</strong>
                        </p>
                        <p>The personal data processed relates to the following categories of data subjects:</p>
                        <ul>
                            <li>Employees</li>
                            <li>Customers</li>
                            <li>Visitors</li>
                            <li>Prospects</li>
                            <li>Contractors</li>
                        </ul>

                        <p>
                            <strong>Categories of personal data processed</strong>
                        </p>
                        <p>The personal data processed comprises the following categories of data:</p>
                        <ul>
                            <li>Identifying – name, username</li>
                            <li>Computer device – IP address, MAC address, browser footprint</li>
                            <li>Contact – email address</li>
                            <li>Location – country, territory, city</li>
                            <li>Behavioral – product usage (page views, clicks, browsing behavior)</li>
                        </ul>

                        <p>
                            <strong>Sensitive categories of personal data processed (if applicable)</strong>
                        </p>
                        <p>The personal data transferred concern the following special categories of data:</p>
                        <p>N/A</p>

                        <div className="ml-12">
                            <p>
                                <strong>B. List of Parties:</strong>
                            </p>
                        </div>
                        <p>
                            <strong>The data exporter shall be:</strong>
                        </p>
                        <div className="ml-12">
                            <ul>
                                <li>
                                    the Company at the following address{' '}
                                    <Tooltip
                                        content={() => (
                                            <>
                                                Fill out the form <span className="md:hidden">at the top</span>
                                                <span className="hidden md:inline-block">to the left</span> populate
                                                these fields
                                            </>
                                        )}
                                        placement="top"
                                        className="[&_button]:cursor-auto"
                                    >
                                        <span className="relative">
                                            <button type="button">
                                                <label
                                                    htmlFor="companyAddress"
                                                    className="bg-yellow/40 font-bold px-0.5 py-0.5"
                                                >
                                                    {companyAddress ? companyAddress : '[COMPANY ADDRESS]'}
                                                </label>
                                            </button>
                                        </span>
                                    </Tooltip>
                                    ;
                                </li>
                                <li>
                                    the contact person for the Company shall be:{' '}
                                    <Tooltip
                                        content={() => (
                                            <>
                                                Fill out the form <span className="md:hidden">at the top</span>
                                                <span className="hidden md:inline-block">to the left</span> populate
                                                these fields
                                            </>
                                        )}
                                        placement="top"
                                        className="[&_button]:cursor-auto"
                                    >
                                        <span className="relative">
                                            <button type="button">
                                                <label
                                                    htmlFor="representativeEmail"
                                                    className="bg-yellow/40 font-bold px-0.5 py-0.5"
                                                >
                                                    {representativeEmail
                                                        ? representativeEmail
                                                        : '[REPRESENTATIVE EMAIL]'}
                                                </label>
                                            </button>
                                        </span>
                                    </Tooltip>
                                    ;
                                </li>
                                <li>
                                    the signature of the data exporter and the date of signature shall be as signed
                                    above;
                                </li>
                                <li>the role of the exporter is controller; and</li>
                                <li>the activities relate to the provision of the Services.</li>
                            </ul>
                        </div>

                        <p>
                            <strong>The data importer shall be:</strong>
                        </p>
                        <div className="ml-12">
                            <ul>
                                <li>
                                    the Processor at the following address 2261 Market St., #4008, San Francisco, CA
                                    94114, United States of America
                                </li>
                                <li>the contact person for the Processor shall be: privacy@posthog.com;</li>
                                <li>
                                    the signature of the data importer and the date of signature shall be as signed
                                    above;
                                </li>
                                <li>the role of the exporter is processor;</li>
                                <li>the activities relate to the provision of the Services.</li>
                            </ul>

                            <p>
                                <strong className="underline">C. Description of Transfer</strong>
                            </p>
                            <p>
                                <em>Categories of data subjects whose personal data is transferred:</em>
                            </p>
                            <p>See ‘A. Processing Activities’ above</p>

                            <p>
                                <em>Categories of personal data transferred:</em>
                            </p>
                            <p>See ‘A. Processing Activities’ above</p>

                            <p>
                                <em>
                                    Sensitive data transferred (if applicable) and applied restrictions or safeguards:
                                </em>
                            </p>
                            <p>N/A</p>

                            <p>
                                If sensitive data are transferred, see Annex C, Part B for applicable restrictions and
                                safeguards
                            </p>
                            <p>
                                <em>
                                    Frequency of transfer (e.g. whether on a one-off or continuous basis) (EU Standard
                                    Contractual Clauses only):
                                </em>
                            </p>
                            <p>On a continuous basis.</p>

                            <p>
                                <em>Nature of the processing/ processing operations:</em>
                            </p>
                            <p>See ‘A. Processing Activities’ above.</p>

                            <p>
                                <em>
                                    Purpose(s) of the data transfer and further processing (EU Standard Contractual
                                    Clauses only):
                                </em>
                            </p>
                            <p>See ‘A. Processing Activities’ above.</p>

                            <p>
                                <em>
                                    Period for which the personal data will be retained, or, if that is not possible,
                                    the criteria used to determine that period (EU Standard Contractual Clauses only):
                                </em>
                            </p>
                            <p>See ‘A. Processing Activities’ above.</p>

                            <p>
                                <em>
                                    The subject matter, nature and duration of the processing (EU Standard Contractual
                                    Clauses only):
                                </em>
                            </p>
                            <p>See ‘A. Processing Activities’ above.</p>
                        </div>

                        <p className="text-center mt-12 !mb-0 !pb-0">
                            <strong>ANNEX II</strong>
                        </p>
                        <p className="text-center">
                            <strong>Technical and Organizational Security Measures</strong>
                        </p>
                        <p>
                            See{' '}
                            <Link href="https://posthog.com/handbook/company/security">
                                https://posthog.com/handbook/company/security
                            </Link>
                        </p>

                        <p className="text-center mt-12 !mb-0 !pb-0">
                            <strong>ANNEX III</strong>
                        </p>
                        <p className="text-center">
                            <strong>Subprocessors</strong>
                        </p>

                        <div className="overflow-x-auto -mx-4 md:-mx-8">
                            <table className="[&_td:first-child]:pl-4 md:[&_td:first-child]:pl-8 [&_td:last-child]:pr-4 md:[&_td:last-child]:pr-8">
                                <tr className="font-bold bg-accent border-t border-light">
                                    <td className="whitespace-nowrap">Name of Subprocessor</td>
                                    <td className="whitespace-nowrap">Contact details</td>
                                    <td className="whitespace-nowrap">Subject matter of the processing</td>
                                    <td className="whitespace-nowrap">Duration of the processing</td>
                                    <td className="whitespace-nowrap">Nature and purpose of the processing</td>
                                    <td className="whitespace-nowrap">Geographical location of the processing</td>
                                    <td className="whitespace-nowrap">Type of personal data processed</td>
                                    <td className="whitespace-nowrap">Categories of data subject</td>
                                    <td className="whitespace-nowrap">Details of sub-sub processors</td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Amazon Web Services, Inc.</strong>
                                    </td>
                                    <td>410 Terry Avenue North, Seattle, WA 98109-5210, aws-EU-privacy@amazon.com</td>
                                    <td>Personal data of users of the Controller’s web product(s)</td>
                                    <td>Duration of the agreement</td>
                                    <td>Cloud storage of PostHog Cloud data</td>
                                    <td>USA (PostHog US Cloud) or Germany (PostHog EU Cloud)</td>
                                    <td>
                                        Identifying – name, username, Computer device – IP address, MAC address, browser
                                        footprint, Contact – email address, Location – country, territory, city,
                                        Behavioral – product usage (page views, clicks, browsing behavior).
                                    </td>
                                    <td>Employees, Customers, Visitors, Prospects, Contractors</td>
                                    <td>https://aws.amazon.com/compliance/sub-processors/ </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Cloudflare Inc.</strong>
                                    </td>
                                    <td>101 Townsend Street, San Francisco, CA 94107, USA, legal@cloudflare.com</td>
                                    <td>Personal data of users of the Controller’s web product(s)</td>
                                    <td>Duration of the agreement</td>
                                    <td>Cloud storage of PostHog Cloud data</td>
                                    <td>USA (PostHog US Cloud only, not used for PostHog EU Cloud)</td>
                                    <td>
                                        Identifying – name, username, Computer device – IP address, MAC address, browser
                                        footprint, Contact – email address, Location – country, territory, city,
                                        Behavioral – product usage (page views, clicks, browsing behavior).
                                    </td>
                                    <td>Employees, Customers, Visitors, Prospects, Contractors</td>
                                    <td>https://www.cloudflare.com/en-gb/gdpr/subprocessors/</td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Salesforce, Inc. (t/a ‘Heroku’)</strong>
                                    </td>
                                    <td>
                                        415 Mission Street, Suite 300,San Francisco, CA 94105, privacy@salesforce.com
                                    </td>
                                    <td>Personal data of users of the Controller’s web product(s)</td>
                                    <td>Duration of the agreement</td>
                                    <td>Cloud storage of PostHog Cloud data</td>
                                    <td>USA (PostHog US Cloud only, not used for PostHog EU Cloud)</td>
                                    <td>
                                        Identifying – name, username, Computer device – IP address, MAC address, browser
                                        footprint, Contact – email address, Location – country, territory, city,
                                        Behavioral – product usage (page views, clicks, browsing behavior).
                                    </td>
                                    <td>Employees, Customers, Visitors, Prospects, Contractors</td>
                                    <td>
                                        https://www.salesforce.com/content/dam/web/en_us/www/documents/legal/misc/salesforce-infrastructure-and-subprocessors.pdf
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Functional Software, Inc., t/a ‘Sentry’</strong>
                                    </td>
                                    <td>45 Fremont Street, 8th Floor, San Francisco, CA 94105. compliance@sentry.io</td>
                                    <td>Personal data of users of the Controller’s web product(s)</td>
                                    <td>Duration of the agreement</td>
                                    <td>Application monitoring and error tracking</td>
                                    <td>USA</td>
                                    <td>
                                        (Errors only) Identifying – username, Computer device – IP address, MAC address,
                                        browser footprint, Contact – email address, Behavioral – product usage (page
                                        views, clicks, browsing behavior).
                                    </td>
                                    <td>Employees, Customers, Visitors, Prospects, Contractors</td>
                                    <td>https://sentry.io/legal/dpa/#list-of-subprocessors-1</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            <section className="text-center my-24">
                <h3>Still not convinced?</h3>

                <TrackedCTA event={{ name: `clicked Get a demo` }} href="/book-a-demo" type="secondary" size="lg">
                    Talk to sales
                </TrackedCTA>
            </section>
        </Layout>
    )
}

export default DpaGenerator
