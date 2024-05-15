import React, { useState } from 'react'
import { SEO } from 'components/seo'
import Layout from 'components/Layout'
import { heading, section } from 'components/Home/classes'
import { TrackedCTA } from 'components/CallToAction'
import Link from 'components/Link'
import { StaticImage } from 'gatsby-plugin-image'

function DpaGenerator() {
    const [companyName, setCompanyName] = useState('')
    const [companyAddress, setCompanyAddress] = useState('')
    const [yourName, setYourName] = useState('')
    const [yourTitle, setYourTitle] = useState('')
    const [date, setDate] = useState('')
    const [representativeEmail, setRepresentativeEmail] = useState('')
    const [jurisdiction, setJurisdiction] = useState('')
    const [supervisoryAuthority, setSupervisoryAuthority] = useState('')
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [mode, setMode] = useState('legalese')

    const handleSubmit = () => {
        setShowConfirmation(true)
    }

    const handlePrint = () => {
        window.print()
        setShowConfirmation(false)
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
        setShowConfirmation(false)
    }

    return (
        <Layout>
            <SEO
                title="DPA generator"
                description="The data processing agreement (DPA) generator designed to spark joy"
                image={`/images/enterprise.png`}
            />
            <div className={section('z-10 md:!mb-8')}>
                <h1 className={`${heading()} overflow-hidden pb-1 home-hero-title`}>
                    DPA? How about DP<em className="text-red dark:text-yellow">YAY</em>
                </h1>
                <h2 className={`mt-2 mb-6 text-xl font-semibold text-center home-hero-subtitle`}>
                    The data processing agreement (DPA) generator designed to spark joy
                </h2>

                <section className="grid grid-cols-5 relative items-start top-20">
                    <div className="col-span-2 px-8 py-4 max-h-screen reasonable:max-h-[100vh-56px] overflow-auto reasonable:sticky top-[60px]">
                        <div className="flex justify-between items-center">
                            <h2>Form</h2>
                            <button type="button" onClick={handleReset}>
                                Reset
                            </button>
                        </div>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                handleSubmit()
                            }}
                        >
                            <div className="flex flex-col gap-2">
                                <input
                                    type="text"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    placeholder="Company name"
                                    required
                                />
                                <input
                                    type="text"
                                    value={companyAddress}
                                    onChange={(e) => setCompanyAddress(e.target.value)}
                                    placeholder="Company address"
                                    required
                                />
                                <input
                                    type="text"
                                    value={yourName}
                                    onChange={(e) => setYourName(e.target.value)}
                                    placeholder="Your name"
                                    required
                                />
                                <input
                                    type="text"
                                    value={yourTitle}
                                    onChange={(e) => setYourTitle(e.target.value)}
                                    placeholder="Your title"
                                    required
                                />
                                <input
                                    type="text"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    placeholder="Date"
                                    required
                                />
                                <input
                                    type="email"
                                    value={representativeEmail}
                                    onChange={(e) => setRepresentativeEmail(e.target.value)}
                                    placeholder="Contact email"
                                    required
                                />
                                <input
                                    type="text"
                                    value={jurisdiction}
                                    onChange={(e) => setJurisdiction(e.target.value)}
                                    placeholder="Jurisdiction"
                                    required
                                />
                                <input
                                    type="text"
                                    value={supervisoryAuthority}
                                    onChange={(e) => setSupervisoryAuthority(e.target.value)}
                                    placeholder="Supervisory authority"
                                    required
                                />

                                <ul className="flex flex-col gap-2 list-none pl-0">
                                    <li>
                                        <input
                                            type="radio"
                                            id="legalese"
                                            name="mode"
                                            value="legalese"
                                            onChange={(e) => setMode(e.target.value)}
                                            checked={mode === 'legalese'}
                                        />
                                        <label className="ml-1 font-semibold" htmlFor="legalese">
                                            A legal doc, formatted by a designer
                                        </label>
                                        <br />
                                        <div className="block ml-5 text-sm opacity-75">
                                            Holds up in a court of law, but with a nicer font
                                        </div>
                                    </li>
                                    <li>
                                        <input
                                            type="radio"
                                            id="lawyer"
                                            name="mode"
                                            value="lawyer"
                                            onChange={(e) => setMode(e.target.value)}
                                        />
                                        <label className="ml-1 font-semibold" htmlFor="lawyer">
                                            Lawyer's love language
                                        </label>
                                        <br />
                                        <div className="block ml-5 text-sm opacity-75">
                                            The version they dream about
                                        </div>
                                    </li>
                                    <li>
                                        <input
                                            type="radio"
                                            id="fairytale"
                                            name="mode"
                                            value="fairytale"
                                            onChange={(e) => setMode(e.target.value)}
                                        />
                                        <label className="ml-1 font-semibold" htmlFor="fairytale">
                                            Fairytale
                                        </label>
                                        <br />
                                        <div className="block ml-5 text-sm opacity-75">
                                            "Explain it to me like I'm five"
                                        </div>
                                    </li>
                                    <li>
                                        <input
                                            type="radio"
                                            id="rap"
                                            name="mode"
                                            value="rap"
                                            onChange={(e) => setMode(e.target.value)}
                                        />
                                        <label className="ml-1 font-semibold" htmlFor="rap">
                                            Eminem edition
                                        </label>
                                        <br />
                                        <div className="block ml-5 text-sm opacity-75">
                                            Warning: May contain{' '}
                                            <span className="border border-black rounded-sm px-1 py-0.5 uppercase text-xs">
                                                explicit content
                                            </span>
                                        </div>
                                    </li>
                                </ul>

                                <div className="inline-flex">
                                    <TrackedCTA
                                        event={{ name: `clicked Generate DPA` }}
                                        type="primary"
                                        size="md"
                                        onClick={handleSubmit}
                                    >
                                        Use this (doesn't work yet)
                                    </TrackedCTA>
                                </div>
                            </div>
                        </form>

                        {/* 
                        modes:
                        - cute (hedgehogs, nice font) - fairytale story
                        - professional (nice font) - english
                        - dry and boring (classic, times new roman) - legalese
                         */}

                        {showConfirmation && (
                            <div>
                                <p>
                                    Your form has been populated! Are you ready to export to PDF?{' '}
                                    <button onClick={handlePrint}>Print this page</button> and use the PDF export
                                    option.
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="article-content col-span-3 bg-white text-primary px-8 py-4 shadow-xl rounded">
                        <div>
                            <span>{companyName}</span>
                            <span>{companyAddress}</span>
                            <span>{yourName}</span>
                            <span>{yourTitle}</span>
                            <span>{date}</span>
                            <span>{representativeEmail}</span>
                            <span>{jurisdiction}</span>
                            <span>{supervisoryAuthority}</span>
                        </div>

                        <div className={`${mode === 'fairytale' ? 'block' : 'hidden'}`}>
                            <div className="bg-accent p-4 text-sm text-center -mx-8 -mt-4 rounded-tl rounded-tr">
                                <strong>Notice:</strong> While this version is a great way to understand what the DPA
                                says, we don't recommend sending this version to the lawyers.
                            </div>
                            <h2 className="text-center !text-[2.25rem] text-balance !leading-snug py-8 font-fairytale-title">
                                Weaving a Magical Pact for Data Protection: An Enchanted Alliance
                            </h2>
                            <div className="[&>p]:text-[19px] [&>p]:leading-relaxed [&>p]:pb-6 max-w-xl mx-auto font-fairytale">
                                <StaticImage
                                    src="../../public/images/dpa/map.png"
                                    alt="Map"
                                    width={300}
                                    className="float-right -mr-20 -mt-16"
                                />
                                <p>
                                    Once upon a time in the enchanted land of Data, a wise and gentle kingdom known as
                                    the Company sought to ensure that all its precious treasures—bits and bytes of
                                    knowledge—were safely guarded. To do this, they reached out to the guardian wizards
                                    of PostHog Inc., a famed group known for their powerful data spells and secure magic
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
                                    Protection Agreement," ensuring that all the treasures would be handled with care
                                    and respect for the laws of the land, including the ancient scrolls of GDPR and the
                                    mystical tomes of the EEA.
                                </p>

                                <StaticImage
                                    src="../../public/images/dpa/wizard.png"
                                    alt="Wizard"
                                    width={300}
                                    className="float-right -mr-20"
                                />

                                <p>
                                    The Company, a noble Data Controller, entrusted its treasures to the PostHog
                                    wizards. The wizards promised to safeguard the treasures by using their enchanted
                                    tools and secret spells to process and analyze the data. They vowed never to use the
                                    treasures for evil and always to follow the Company's wise instructions.
                                </p>

                                <StaticImage
                                    src="../../public/images/dpa/nomes.png"
                                    alt="Nomes"
                                    width={300}
                                    className="float-left -ml-20 -mt-16"
                                />
                                <p>
                                    In the depths of their crystal-clear agreement, they outlined the adventures the
                                    data could undertake and specified who could handle the data, ensuring that only the
                                    most trusted apprentice wizards or external guardians could assist in safeguarding
                                    it. Each apprentice was sworn to secrecy with a magical oath to protect the
                                    Company's treasures.
                                </p>

                                <p>
                                    They built a fortress of security measures, enchantments so strong that only those
                                    with the right spells could access the treasures. They agreed to help each other in
                                    times of trouble, like when a data gremlin might sneak in to create mischief.
                                </p>

                                <StaticImage
                                    src="../../public/images/dpa/porridge.png"
                                    alt="Porridge"
                                    width={300}
                                    className="float-right -mr-20"
                                />
                                <p>
                                    The Company and PostHog celebrated their alliance with a grand feast in the grand
                                    hall, signing their pact with quill and enchanted ink. They agreed that their
                                    magical contract would be overseen by the wise elders of the land—judges from the
                                    jurisdiction of England and Wales.
                                </p>

                                <p>
                                    As the years passed, their partnership flourished. The Company's treasures were kept
                                    safe and grew in wisdom, bringing joy and prosperity to the land. And they all lived
                                    securely and data-compliantly ever after.
                                </p>
                            </div>
                        </div>

                        <div className={mode === 'rap' ? 'block' : 'hidden'}>
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
                            } ${mode === 'lawyer' && 'font-serif'}`}
                        >
                            <p>Data Processing Agreement — PostHog Inc.</p>
                            <p>
                                This Data Processing Agreement (“Agreement”) forms part of the Contract for Services
                                (“Principal Agreement”) between{' '}
                                <span className="bg-yellow/40 font-bold px-0.5">
                                    {companyName ? companyName : '[COMPANY NAME]'}
                                </span>{' '}
                                (the “Company”) and PostHog Inc. (the “Processor”) (together as the “Parties”).
                            </p>
                            <p>WHEREAS</p>
                            <p>(A) The Company acts as a Data Controller.</p>
                            <p>
                                (B) The Company wishes to subcontract certain Services, which imply the processing of
                                personal data, to the Processor.
                            </p>
                            <p>
                                (C) The Parties seek to implement a data processing agreement that complies with
                                applicable Data Protection Laws (as defined below) (D) The Parties wish to lay down
                                their rights and obligations.
                            </p>
                            <p>IT IS AGREED AS FOLLOWS:</p>
                            <ol start="1">
                                <li>Definitions and Interpretation</li>
                            </ol>
                            <p>
                                {' '}
                                1.1. Unless otherwise defined herein, capitalized terms and expressions used in this
                                Agreement shall have the following meaning:
                            </p>
                            <p>1.1.1. “Agreement” means this Data Processing Agreement and all Annexes;</p>
                            <p>
                                1.1.2. “Company Personal Data” means any Personal Data provided to or Processed by the
                                Processor on behalf of the Company pursuant to or in connection with the Principal
                                Agreement;
                            </p>
                            <p>
                                1.1.3. “Data Protection Laws” means all applicable laws relating to Processing of
                                Personal Data and privacy that may exist in any relevant jurisdiction, including
                                European Data Protection Laws;
                            </p>
                            <p>1.1.4. “EEA” means the European Economic Area;</p>
                            <p>
                                1.1.5. “EU Personal Data” means the Processing of Personal Data to which (i) data
                                protection legislation of the European Union, or of a Member State of the European Union
                                or EEA, was applicable prior to the Processing by the Processor;
                            </p>
                            <p>
                                1.1.6. “European Data Protection Laws” means the GDPR, UK Data Protection Act 2018, the
                                UK GDPR, ePrivacy Directive 2002/58/EC, FADP, and any associated or additional
                                legislation in force in the EU, EEA, Member States and the United Kingdom as amended,
                                replaced or superceded from time to time;
                            </p>
                            <p>
                                1.1.7. “FADP” means the Swiss Federal Act on Data Protection and its Ordinances, as
                                amended from time to time;
                            </p>
                            <p>1.1.8. “FDPIC” means the Swiss Federal Data Protection and Information Commissioner;</p>
                            <p>1.1.9. “GDPR” means General Data Protection Regulation EU2016/679;</p>
                            <p>
                                1.1.10. “UK GDPR” means General Data Protection Regulation (EU) 2016/679 as applicable
                                as part of UK domestic law by virtue of section 3 of the European Union (Withdrawal) Act
                                2018 and as amended by the Data Protection, Privacy and Electronic Communications
                                (Amendments etc) (EU Exit) Regulations 2019 (as amended);
                            </p>
                            <p>
                                1.1.11. “Protected Area” means (i) in the case of EU Personal Data, the member states of
                                the European Union and the EEA and any country, territory, sector or international
                                organisation in respect of which an adequacy decision under Art 45 GDPR is in force or
                                (ii) in the case of UK Personal Data, the United Kingdom and any country, territory,
                                sector or international organisation in respect of which an adequacy decision under UK
                                adequacy regulations is in force; or (iii) in the case of Swiss Personal Data, any
                                country, territory, sector or international organisation which is recognised as adequate
                                by the FDPIC or the Swiss Federal Council (as the case may be);
                            </p>
                            <p>
                                1.1.12. “Services” means the product and data analytics services the Processor provides.
                            </p>
                            <p>
                                1.1.13. “Subprocessor” means any person appointed by or on behalf of Processor to
                                Process Personal Data on behalf of the Company in connection with the Agreement.
                            </p>
                            <p>
                                1.2. The terms, “Controller”, “Data Subject”, “Member State”, “Personal Data”, “Personal
                                Data Breach”, “Processing” and “Supervisory Authority” shall have the same meaning as in
                                the GDPR and UK GDPR, and their cognate terms shall be construed accordingly.
                            </p>
                            <ol start="2">
                                <li>Processing of Company Personal Data</li>
                            </ol>
                            <p>2.1. The Company shall:</p>
                            <p>
                                2.1.1. ensure that any and all information or data, including without limitation Company
                                Personal Data, is collected, processed, transferred and used in full compliance with
                                Data Protection Laws;
                            </p>
                            <p>
                                2.1.2. be solely responsible for ensuring that it has all obtained all necessary
                                authorizations and consents from any Data Subjects to Process Company Personal Data and
                                in particular any consents needed to meet the cookie requirements in the ePrivacy
                                Directive 2002/58/EC and any associated national legislation;
                            </p>
                            <p>2.1.3. instruct the Processor to process Company Personal Data.</p>
                            <p>2.2. Processor shall:</p>
                            <p>
                                2.2.1. comply with all applicable Data Protection Laws in the Processing of Company
                                Personal Data; and
                            </p>
                            <p>
                                2.2.2. not Process Company Personal Data other than on the relevant Company’s documented
                                instructions including with regard to data transfers outside of the Protected Area,
                                unless required to do so by laws to which the Processor is subject; in such a case,
                                Processor shall inform the Company of that legal requirement before Processing, unless
                                that law prohibits such information on important grounds of public interest. The Company
                                acknowledges that as part of the processing instructions, Processor may aggregate,
                                anonymise, extract and combine or otherwise deidentify information resulting from the
                                Company’s use of the licensed materials and services for product improvement,
                                benchmarking, and the development of new products; and
                            </p>
                            <p>
                                2.2.3. notify the Company immediately if, in the Processor’s reasonable opinion, an
                                instruction for the Processing of Personal Data given by the Company infringes
                                applicable Data Protection Laws , it being acknowledged that the Processor shall not be
                                obliged to undertake additional work or screening to determine if the Company’s
                                instructions are compliant.
                            </p>
                            <ol start="3">
                                <li>Processor Personnel</li>
                            </ol>
                            <p>
                                3.1. Processor shall take reasonable steps to ensure the reliability of any personnel
                                who may have access to the Company Personal Data, ensuring that all such individuals are
                                subject to confidentiality undertakings or professional or statutory obligations of
                                confidentiality with respect to such Company Personal Data.
                            </p>
                            <ol start="4">
                                <li>Security</li>
                            </ol>
                            <p>
                                4.1. Taking into account the state of the art, the costs of implementation and the
                                nature, scope, context and purposes of Processing as well as the risk of varying
                                likelihood and severity for the rights and freedoms of natural persons, Processor shall
                                in relation to the Company Personal Data implement appropriate technical and
                                organizational measures to ensure a level of security appropriate to that risk,
                                including, as appropriate, the measures referred to in Article 32(1) of the GDPR and UK
                                GDPR. These measures include those at Annex II.
                            </p>
                            <ol start="5">
                                <li>Subprocessing</li>
                            </ol>
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
                            <ol start="6">
                                <li>Data Subject Rights and Cooperation</li>
                            </ol>
                            <p>
                                6.1. Taking into account the nature of the Processing, Processor shall assist the
                                Company by implementing appropriate technical and organisational measures, insofar as
                                this is possible, for the fulfilment of the Company obligations, as reasonably
                                understood by Company, to respond to requests to exercise Data Subject rights under
                                applicable Data Protection Laws.
                            </p>
                            <p>6.2. Processor shall:</p>
                            <p>
                                6.2.1. notify Company if it receives a request from a Data Subject under any Data
                                Protection Law in respect of Company Personal Data; and
                            </p>
                            <p>
                                6.2.2. ensure that it does not respond to that request except on the documented
                                instructions of Company or as required by applicable laws to which the Processor is
                                subject.
                            </p>
                            <p>
                                6.3. To the extent required under Data Protection Laws, Processor shall (taking into
                                account the nature of the processing and the information available to Processor) provide
                                all reasonably requested information regarding the Service to enable the Company to
                                carry out data protection impact assessments or prior consultations with data protection
                                authorities and to assist the Company with meeting its obligations under Article 32
                                GDPR/UK GDPR as required by Data Protection Laws.
                            </p>
                            <p>
                                6.4. To the extent that assistance under this Agreement is not included within the
                                Services, the Processor may charge a reasonable fee for any such assistance, save where
                                assistance was required directly as a result of the Processor’s own acts or omissions,
                                in which case such assistance will be at the Processor’s expense.
                            </p>
                            <ol start="7">
                                <li>Personal Data Breach</li>
                            </ol>
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
                            <ol start="8">
                                <li>Audits</li>
                            </ol>
                            <p>
                                8.1. The Processor shall make available to the Company all information reasonably
                                necessary to demonstrate compliance with this Agreement and at the cost of the Company,
                                allow for and contribute to audits, including inspections by the Company in order to
                                assess compliance with this Agreement.
                            </p>
                            <ol start="9">
                                <li>Deletion or return of Company Personal Data</li>
                            </ol>
                            <p>
                                9.1. Following a request from the Company, Processor shall promptly and in any event
                                within 10 business days of the date of cessation of any Services involving the
                                Processing of Company Personal Data , return or delete and procure the deletion of all
                                copies of the Company Personal Data unless applicable laws require storage of such
                                Customer Personal Data.
                            </p>
                            <ol start="10">
                                <li>Data Transfer Outside of the Protected Area</li>
                            </ol>
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
                            <p>
                                10.4. In relation to the UK Standard Contractual Clauses, as permitted by clause 17 of
                                such Addendum, the Parties agree to change the format of the information set out in Part
                                1 of the Addendum so that:
                            </p>
                            <p>
                                10.4.1. the details of the parties in table 1 shall be as set out in Annex I (with no
                                requirement for signature);
                            </p>
                            <p>
                                10.4.2. for the purposes of table 2, the Addendum shall be appended to the EU Standard
                                Contractual Clauses as defined above (including the selection of modules and options and
                                the disapplication of optional clauses as noted above); and
                            </p>
                            <p>10.4.3. the appendix information listed in table 3 is set out in Annex I and II.</p>
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
                                10.78. In the event that the Standard Contractual Clauses are no longer valid for use
                                under the GDPR or UK GDPR, the Parties agree to promptly implement a replacement
                                transfer mechanism, and making such further amendments to the application of such
                                replacement mechanism, as the Processor deems reasonably necessary.
                            </p>
                            <ol start="11">
                                <li>General Terms</li>
                            </ol>
                            <p>
                                11.1. Confidentiality. Each Party must keep this Agreement and information it receives
                                about the other Party and its business in connection with this Agreement (“Confidential
                                Information”) confidential and must not use or disclose that Confidential Information
                                without the prior written consent of the other Party except to the extent that:
                            </p>
                            <p>11.1.1. disclosure is required by law;</p>
                            <p>11.1.2. the relevant information is already in the public domain.</p>
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
                            <p>
                                IN WITNESS WHEREOF, this Agreement is entered into with effect from the date first set
                                out below.
                            </p>
                            <p>
                                <span className="bg-yellow/40 font-bold px-0.5">
                                    {companyName ? companyName : '[Company name]'}
                                </span>
                            </p>
                            <p>Signature ______________________________</p>
                            <p>Name ________________________________</p>
                            <p>Title _________________________________</p>
                            <p>Date _________________________________</p>
                            <p>PostHog Inc.</p>
                            <p>Signature ______________________________</p>
                            <p>Name Fraser Hopper</p>
                            <p>Title Operations & Finance Lead</p>
                            <p>Date __________________________________</p>
                            <p>ANNEX I</p>
                            <p>A. Processing Activities:</p>
                            <p>Subject matter of the processing</p>
                            <p>
                                The personal data shall be processed in order to allow Processor to provide the
                                Services.
                            </p>
                            <p>Nature and purpose of the processing</p>
                            <p>Product analytics, including insights, heatmaps, session recording and feature flags.</p>
                            <p>Duration</p>
                            <p>For the duration of the Principal Agreement.</p>
                            <p>Categories of data subjects</p>
                            <p>The personal data processed relates to the following categories of data subjects:</p>
                            <ul>
                                <li>Employees</li>
                                <li>Customers</li>
                                <li>Visitors</li>
                                <li>Prospects</li>
                                <li>Contractors</li>
                            </ul>
                            <p>Categories of personal data processed</p>
                            <p>The personal data processed comprises the following categories of data:</p>
                            <ul>
                                <li>Identifying – name, username</li>
                                <li>Computer device – IP address, MAC address, browser footprint</li>
                                <li>Contact – email address</li>
                                <li>Location – country, territory, city</li>
                                <li>Behavioral – product usage (page views, clicks, browsing behavior)</li>
                            </ul>
                            <p>Sensitive categories of personal data processed (if applicable)</p>
                            <p>The personal data transferred concern the following special categories of data:</p>
                            <p>N/A</p>
                            <p>B. List of Parties:</p>
                            <p>The data exporter shall be:</p>
                            <ul>
                                <li>
                                    the Company at the following address{' '}
                                    <span className="bg-yellow/40 font-bold px-0.5">
                                        {companyAddress ? companyAddress : '[Company address]'}
                                    </span>
                                    ;
                                </li>
                                <li>
                                    the contact person for the Company shall be:{' '}
                                    <span className="bg-yellow/40 font-bold px-0.5">
                                        {representativeEmail ? representativeEmail : '[Representative email]'}
                                    </span>
                                    ;
                                </li>
                                <li>
                                    the signature of the data exporter and the date of signature shall be as signed
                                    above;
                                </li>
                                <li>the role of the exporter is controller; and</li>
                                <li>the activities relate to the provision of the Services.</li>
                            </ul>
                            <p>The data importer shall be:</p>
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
                            <p>C. Description of Transfer</p>
                            <p>Categories of data subjects whose personal data is transferred:</p>
                            <p>See ‘A. Processing Activities’ above</p>
                            <p>Categories of personal data transferred:</p>
                            <p>See ‘A. Processing Activities’ above</p>
                            <p>Sensitive data transferred (if applicable) and applied restrictions or safeguards:</p>
                            <p>N/A</p>
                            <p>
                                If sensitive data are transferred, see Annex C, Part B for applicable restrictions and
                                safeguards
                            </p>
                            <p>
                                Frequency of transfer (e.g. whether on a one-off or continuous basis) (EU Standard
                                Contractual Clauses only):
                            </p>
                            <p>On a continuous basis.</p>
                            <p>Nature of the processing/ processing operations:</p>
                            <p>See ‘A. Processing Activities’ above.</p>
                            <p>
                                Purpose(s) of the data transfer and further processing (EU Standard Contractual Clauses
                                only):
                            </p>
                            <p>See ‘A. Processing Activities’ above.</p>
                            <p>
                                Period for which the personal data will be retained, or, if that is not possible, the
                                criteria used to determine that period (EU Standard Contractual Clauses only):
                            </p>
                            <p>See ‘A. Processing Activities’ above.</p>
                            <p>
                                The subject matter, nature and duration of the processing (EU Standard Contractual
                                Clauses only):
                            </p>
                            <p>See ‘A. Processing Activities’ above.</p>
                            <p>ANNEX II</p>
                            <p>Technical and Organizational Security Measures</p>
                            <p>See https://posthog.com/handbook/company/security</p>
                            <p>ANNEX III</p>
                            <p>Subprocessors</p>
                            <table>
                                <tr>
                                    <td>Name of Subprocessor</td>
                                    <td>Contact details</td>
                                    <td>Subject matter of the processing</td>
                                    <td>Duration of the processing</td>
                                    <td>Nature and purpose of the processing</td>
                                    <td>Geographical location of the processing</td>
                                    <td>Type of personal data processed</td>
                                    <td>Categories of data subject</td>
                                    <td>Details of sub-sub processors</td>
                                </tr>
                                <tr>
                                    <td>Amazon Web Services, Inc.</td>
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
                                    <td>Cloudflare Inc.</td>
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
                                    <td>Salesforce, Inc. (t/a ‘Heroku’)</td>
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
                                    <td>Functional Software, Inc., t/a ‘Sentry’</td>
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
                </section>

                <section className="text-center mb-24">
                    <h3>Still not convinced?</h3>

                    <TrackedCTA event={{ name: `clicked Get a demo` }} href="/book-a-demo" type="secondary" size="lg">
                        Talk to sales
                    </TrackedCTA>
                </section>
            </div>
        </Layout>
    )
}

export default DpaGenerator
