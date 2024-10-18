import CloudinaryImage from 'components/CloudinaryImage'
import React, { useState, useEffect, useRef } from 'react'
import { SEO } from 'components/seo'
import Layout from 'components/Layout'
import { heading, section } from 'components/Home/classes'
import { TrackedCTA } from 'components/CallToAction'
import Link from 'components/Link'
import { StaticImage } from 'gatsby-plugin-image'
import { IconInfo, IconRevert } from '@posthog/icons'
import Tooltip from 'components/Tooltip'
import subprocessors from '../data/subprocessors.json'
import { sexyLegalMenu } from '../navs'

const IconPrint = ({ className = '' }) => (
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
    const [mode, setMode] = useState('pretty')
    const [isFormComplete, setIsFormComplete] = useState(false)
    const divRef = useRef(null)

    const FloatRight = `float-right -mr-2 @2xl:-mr-20 -my-8 @2xl:-mt-16 w-48 @2xl:w-80`
    const FloatLeft = `float-left -ml-2 @2xl:-ml-20 -my-8 @2xl:-mt-16 w-48 @2xl:w-80`

    const SignatureFields = () => (
        <>
            <p className="!mb-0">
                <Tooltip
                    content={() => (
                        <>
                            Fill out the form <span className="md:hidden">at the top</span>
                            <span className="hidden md:inline-block">to the left</span> populate these fields
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
                                <span className="hidden md:inline-block">to the left</span> populate these fields
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
                                <span className="hidden md:inline-block">to the left</span> populate these fields
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
                                <span className="hidden md:inline-block">to the left</span> populate these fields
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
        </>
    )

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

    const handleInputChange = (e) => {
        setMode(e.target.value)
        const top =
            window.scrollY +
            document.querySelector('#page')?.getBoundingClientRect().top -
            document.querySelector('header')?.getBoundingClientRect().height
        window.scrollTo({ top, behavior: 'smooth' })
    }

    return (
        <Layout
            headerBlur={false}
            parent={sexyLegalMenu}
            activeInternalMenu={sexyLegalMenu.children.find(({ name }) => name.toLowerCase() === 'dpa generator')}
        >
            <SEO
                title="DPA generator"
                description="PostHog's cutting-edge data processing agreement (DPA) generator"
                image={`/images/og/dpa.png`}
            />
            <header className="print:hidden">
                <h1 className={`${heading()} overflow-hidden pt-8 pb-1`}>
                    DPA? Try DP
                    <em className="dark:text-primary-dark">
                        <span className="text-red">YAY</span>!
                    </em>
                </h1>
                <h2
                    className={`mt-2 px-2 md:-mb-8 text-xl opacity-75 font-semibold text-balance text-center leading-tight`}
                >
                    Welcome to PostHog's data processing agreement (DPA) generator,
                    <br className="hidden lg:block" /> designed to make even the most{' '}
                    <span className="line-through">mundane</span> exciting tasks <em>even more fun.</em>
                </h2>
            </header>

            <section className="grid md:grid-cols-5 2xl:grid-cols-4 relative items-start mt-12 md:mt-0 md:top-20 gap-4">
                <div className="@container md:col-span-2 2xl:col-span-1 px-4 lg:px-8 md:py-4 md:max-h-screen md:reasonable:max-h-[calc(100vh-108px)] md:overflow-auto md:sticky top-0 reasonable:top-[108px] print:hidden">
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
                    <p className="text-sm mb-2">We'll populate your DPA with this information.</p>
                    <p className="text-sm">
                        Once the form is completed, you can export to PDF. Sign it and send it to privacy@posthog.com
                        for counter-signature.
                    </p>
                    <p className="text-sm">
                        Need changes to this DPA? <Link to="/talk-to-a-human">Contact us</Link> first.
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
                                className="col-span-5 @sm:col-span-3 mb-2 @sm:mb-0 bg-accent rounded border border-light hover:border-black/50 text-black"
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
                                className="col-span-5 @sm:col-span-3 mb-2 @sm:mb-0 bg-accent rounded border border-light hover:border-black/50 text-black"
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
                                className="col-span-5 @sm:col-span-3 mb-2 @sm:mb-0 bg-accent rounded border border-light hover:border-black/50 text-black"
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
                                className="col-span-5 @sm:col-span-3 mb-2 @sm:mb-0 bg-accent rounded border border-light hover:border-black/50 text-black"
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
                                className="col-span-5 @sm:col-span-3 mb-2 @sm:mb-0 bg-accent rounded border border-light hover:border-black/50 text-black"
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
                                className="col-span-5 @sm:col-span-3 mb-2 @sm:mb-0 bg-accent rounded border border-light hover:border-black/50 text-black"
                                required
                            />

                            <label className="col-span-5 @sm:col-span-2 text-sm" htmlFor="jurisdiction">
                                <Tooltip
                                    content={() => <p className="max-w-sm !mb-0">Your country</p>}
                                    placement="top"
                                    className="[&_button]:cursor-auto"
                                >
                                    <span className="border-b border-dashed border-light dark:border-dark pb-0.5 mb-1 inline-block">
                                        Jurisdiction
                                    </span>
                                </Tooltip>
                            </label>
                            <input
                                type="text"
                                value={jurisdiction}
                                onChange={(e) => setJurisdiction(e.target.value)}
                                placeholder="Jurisdiction"
                                id="jurisdiction"
                                className="col-span-5 @sm:col-span-3 mb-2 @sm:mb-0 bg-accent rounded border border-light hover:border-black/50 text-black"
                                required
                            />

                            <label className="col-span-5 @sm:col-span-2 text-sm" htmlFor="supervisoryAuthority">
                                <Tooltip
                                    content={() => (
                                        <>
                                            <p className="max-w-sm !mb-2">
                                                An individual authority established by its member state to supervise the
                                                compliance with a specific regulation.
                                            </p>
                                            <p className="max-w-sm !mb-2">
                                                In regards to the GDPR, each country will have its own authority, for
                                                the UK the Information Commissioner's Office (ICO) will be the
                                                Supervisory Authority.
                                            </p>
                                            <p className="max-w-sm !mb-0">
                                                In the United States, this may be the state where you operate or are
                                                incorporated, or the FTC.
                                            </p>
                                        </>
                                    )}
                                    placement="top"
                                    className="[&_button]:cursor-auto"
                                >
                                    <span className="border-b border-dashed border-light dark:border-dark pb-0.5 mb-1 inline-block">
                                        Supervisory Authority
                                    </span>
                                </Tooltip>
                            </label>
                            <input
                                type="text"
                                value={supervisoryAuthority}
                                onChange={(e) => setSupervisoryAuthority(e.target.value)}
                                placeholder="Supervisory Authority"
                                id="supervisoryAuthority"
                                className="col-span-5 @sm:col-span-3 mb-2 @sm:mb-0 bg-accent rounded border border-light hover:border-black/50 text-black"
                                required
                            />

                            <div className="col-span-5 @md:col-span-2 text-sm self-baseline pt-2">Format</div>

                            <ul className="flex flex-col col-span-5 @md:col-span-3 gap-3 list-none pt-2 pl-0">
                                <li className="pl-7 relative">
                                    <input
                                        type="radio"
                                        id="pretty"
                                        name="mode"
                                        value="pretty"
                                        className="absolute left-1 top-1"
                                        onChange={handleInputChange}
                                        checked={mode === 'pretty'}
                                    />
                                    <label className="font-semibold leading-tight block pb-1" htmlFor="pretty">
                                        A perfectly legal doc, but with some pizazz
                                    </label>
                                    <div className="block text-sm opacity-75">
                                        Holds up in a court of law, but with a nicer font and a color logo
                                    </div>
                                </li>
                                <li className="pl-7 relative">
                                    <input
                                        type="radio"
                                        id="lawyer"
                                        name="mode"
                                        value="lawyer"
                                        className="absolute left-1 top-1"
                                        onChange={handleInputChange}
                                    />
                                    <label className="font-semibold" htmlFor="lawyer">
                                        Drab and dull - preferred by lawyers
                                    </label>
                                    <br />
                                    <div className="block text-sm opacity-75">
                                        Because lawyers hate fun but love Times New Roman
                                    </div>
                                </li>
                                <li className="pl-7 relative">
                                    <input
                                        type="radio"
                                        id="fairytale"
                                        name="mode"
                                        className="absolute left-1 top-1"
                                        value="fairytale"
                                        onChange={handleInputChange}
                                    />
                                    <label className="font-semibold" htmlFor="fairytale">
                                        A fairy tale story
                                    </label>
                                    <br />
                                    <div className="block text-sm opacity-75">"Explain it to me like I'm five"</div>
                                </li>
                                <li className="pl-7 relative">
                                    <input
                                        type="radio"
                                        id="tswift"
                                        name="mode"
                                        value="tswift"
                                        className="absolute left-1 top-1"
                                        onChange={handleInputChange}
                                    />
                                    <label className="font-semibold" htmlFor="tswift">
                                        Taylor Swift's version
                                    </label>
                                    <br />
                                    <div className="block text-sm opacity-75">Sing along while staying compliant</div>
                                </li>
                            </ul>
                        </div>
                    </form>
                </div>

                <div
                    ref={divRef}
                    id="page"
                    className="@container article-content md:col-span-3 bg-white text-primary px-4 md:px-8 pt-4 border-y md:border-y-0 border-light dark:border-dark md:shadow-xl print:shadow-none rounded relative"
                >
                    <div className="bg-accent rounded-tl rounded-tr py-2 px-8 text-sm text-center border-b border-light -mx-8 -mt-4 flex items-center justify-between print:hidden sticky top-[57px] md:top-[108px] z-10">
                        <div className="text-lg font-bold">Preview</div>
                        <Tooltip
                            content={() => (
                                <div className="max-w-xs md:max-w-sm print:hidden">
                                    {isFormComplete ? (
                                        <>
                                            <h4 className="mb-1">Important instructions</h4>
                                            <ol className="mb-3">
                                                <li>
                                                    <p className="text-[15px] mb-0">Open your browser's print dialog</p>
                                                </li>
                                                <li>
                                                    <p className="text-[15px] mb-0">
                                                        Use the Export to PDF option in your browser or system's print
                                                        menu
                                                    </p>
                                                </li>
                                                <li>
                                                    <p className="text-[15px] mb-0">
                                                        Sign and send to privacy@posthog.com for counter-signature
                                                    </p>
                                                </li>
                                            </ol>
                                            <p className="mb-0 text-[15px] border-t border-light pt-4 mt-2">
                                                <strong>Tip:</strong> Disable these options in Chrome's print settings
                                                to ditch the page title, URL, and highlighted fields from your printed
                                                copy. 👇
                                            </p>

                                            <div className="my-2 border border-light dark:border-dark rounded overflow-hidden">
                                                <CloudinaryImage
                                                    src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/dpa/print-settings.png"
                                                    alt="Print settings"
                                                    placeholder="blurred"
                                                    className="dark:rounded"
                                                    objectFit="contain"
                                                    width={362}
                                                    height={92}
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            Fill out all the fields <br className="md:hidden" />
                                            to export to PDF
                                        </>
                                    )}
                                </div>
                            )}
                            placement="left"
                        >
                            <span className="relative">
                                <TrackedCTA
                                    event={{ name: `clicked Print DPA` }}
                                    type="primary"
                                    size="sm"
                                    disabled={!isFormComplete}
                                    onClick={handlePrint}
                                    className="[&>span]:flex [&>span]:items-center [&>span]:gap-1 relative md:left-4"
                                >
                                    <>
                                        <IconPrint className="size-5" />
                                        <span>Export to PDF</span>
                                    </>
                                </TrackedCTA>
                            </span>
                        </Tooltip>
                    </div>

                    <div className={`${mode === 'fairytale' ? 'block' : 'hidden'}`}>
                        <div className="bg-yellow/25 py-4 px-8 text-sm text-center -mx-8 border-t border-light">
                            <strong>Notice:</strong> While this version is a great way to understand what the DPA says,
                            we don't recommend sending this version to the lawyers.
                        </div>
                        <h2 className="text-center !text-[2.25rem] text-balance !leading-snug py-8 font-fairytale-title">
                            Weaving a Magical Pact for Data Protection: An Enchanted Alliance
                        </h2>
                        <div className="[&>p]:text-[19px] [&>p]:leading-relaxed [&>p]:pb-6 [&_li]:text-[19px] [&_li]:leading-relaxed max-w-xl mx-auto font-fairytale">
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/dpa/map.png"
                                alt="Map"
                                placeholder="blurred"
                                className={FloatRight}
                            />
                            <p>
                                Once upon a time in the enchanted land of Data, a wise and gentle kingdom known as{' '}
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
                                            <label
                                                htmlFor="companyName"
                                                className="bg-yellow/40 font-bold px-0.5 py-0.5"
                                            >
                                                {companyName ? companyName : '[COMPANY NAME]'}
                                            </label>
                                        </button>
                                    </span>
                                </Tooltip>{' '}
                                sought to ensure that all its precious treasures—bits and bytes of knowledge—were safely
                                guarded. To do this, they reached out to the guardian wizards of{' '}
                                <strong>PostHog, Inc.</strong>, a famed group known for their powerful data spells and
                                secure magic vaults.
                            </p>

                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/dpa/sword.png"
                                alt="Sword"
                                placeholder="blurred"
                                className={FloatLeft}
                            />
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
                                            <label
                                                htmlFor="companyName"
                                                className="bg-yellow/40 font-bold px-0.5 py-0.5"
                                            >
                                                {companyName ? companyName : '[COMPANY NAME]'}
                                            </label>
                                        </button>
                                    </span>
                                </Tooltip>{' '}
                                and the PostHog wizards agreed to create a magical pact called the "Data Protection
                                Agreement," ensuring that all the treasures would be handled with care and respect for
                                the laws of the land, including the ancient scrolls of GDPR and the mystical tomes of
                                the EEA.
                            </p>

                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/dpa/wizard.png"
                                alt="Wizard"
                                placeholder="blurred"
                                className={FloatRight}
                            />

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
                                            <label
                                                htmlFor="companyName"
                                                className="bg-yellow/40 font-bold px-0.5 py-0.5"
                                            >
                                                {companyName ? companyName : '[COMPANY NAME]'}
                                            </label>
                                        </button>
                                    </span>
                                </Tooltip>{' '}
                                a noble Data Controller, entrusted its treasures to the PostHog wizards. The wizards
                                promised to safeguard the treasures by using their enchanted tools and secret spells to
                                process and analyze the data. They vowed never to use the treasures for evil and always
                                to follow{' '}
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
                                            <label
                                                htmlFor="companyName"
                                                className="bg-yellow/40 font-bold px-0.5 py-0.5"
                                            >
                                                {companyName ? companyName : '[COMPANY NAME]'}
                                            </label>
                                        </button>
                                    </span>
                                </Tooltip>
                                's wise instructions.
                            </p>

                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/dpa/gnomes.png"
                                alt="Gnomes"
                                placeholder="blurred"
                                className={FloatLeft}
                            />
                            <p>
                                In the depths of their crystal-clear agreement, they outlined the adventures the data
                                could undertake and specified who could handle the data, ensuring that only the most
                                trusted apprentice wizards or external guardians could assist in safeguarding it. Each
                                apprentice was sworn to secrecy with a magical oath to protect{' '}
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
                                            <label
                                                htmlFor="companyName"
                                                className="bg-yellow/40 font-bold px-0.5 py-0.5"
                                            >
                                                {companyName ? companyName : '[COMPANY NAME]'}
                                            </label>
                                        </button>
                                    </span>
                                </Tooltip>{' '}
                                treasures.
                            </p>

                            <p>
                                They built a fortress of security measures, enchantments so strong that only those with
                                the right spells could access the treasures. They agreed to help each other in times of
                                trouble, like when a data gremlin might sneak in to create mischief.
                            </p>

                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/dpa/porridge.png"
                                alt="Porridge"
                                placeholder="blurred"
                                className={FloatRight}
                            />
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
                                            <label
                                                htmlFor="companyName"
                                                className="bg-yellow/40 font-bold px-0.5 py-0.5"
                                            >
                                                {companyName ? companyName : '[COMPANY NAME]'}
                                            </label>
                                        </button>
                                    </span>
                                </Tooltip>{' '}
                                and PostHog celebrated their alliance with a grand feast in the grand hall, signing
                                their pact with quill and enchanted ink. They agreed that their magical contract would
                                be overseen by the wise elders of the land—judges from the jurisdiction of England and
                                Wales.
                            </p>

                            <p>
                                As the years passed, their partnership flourished.{' '}
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
                                            <label
                                                htmlFor="companyName"
                                                className="bg-yellow/40 font-bold px-0.5 py-0.5"
                                            >
                                                {companyName ? companyName : '[COMPANY NAME]'}
                                            </label>
                                        </button>
                                    </span>
                                </Tooltip>
                                's treasures were kept safe and grew in wisdom, bringing joy and prosperity to the land.
                                And they all lived securely and data-compliantly ever after.
                            </p>
                            <div className="pb-16">
                                <SignatureFields />
                            </div>
                        </div>
                    </div>

                    <div className={`${mode === 'tswift' ? 'block' : 'hidden'} [&>p]:text-[15px] pb-4`}>
                        <div className="bg-yellow/25 py-4 px-8 text-sm text-center -mx-8 border-t border-light">
                            <strong>Notice:</strong> We don't recommend this version, unless you know a judge who's a
                            Swiftie.
                        </div>

                        <div className="@container mx-auto max-w-3xl">
                            <h2 className="pt-8 pb-0">Data Dance</h2>

                            <div className="@lg:float-right flex flex-col -mr-2 ml-2 md:ml-0 mb-2 mt:mt-0 w-48 md:w-64">
                                <CloudinaryImage
                                    src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/dpa/t-swift.png"
                                    alt="Taylor Swift hog"
                                    placeholder="blurred"
                                    className="mb-2"
                                />
                            </div>

                            <p>
                                We started with a promise, data in our hands,
                                <br />
                                You're the controller, I'm the one who understands,
                                <br />
                                You wanna share your secrets, let me hold the key,
                                <br />
                                We'll keep it all secure, like it's meant to be.
                            </p>
                            <p>
                                We'll follow every rule, every law, every line,
                                <br />
                                From the EEA to the Swiss, we'll keep it fine,
                                <br />
                                No breach of trust, no whispers in the dark,
                                <br />
                                We'll protect it all, every little spark.
                            </p>
                            <p className="font-bold">
                                This is our data dance, under moonlit skies,
                                <br />
                                With the GDPR watching, we'll never compromise,
                                <br />
                                I'll be your processor, with a duty so true,
                                <br />
                                Every byte, every bit, I'll handle it for you.
                            </p>
                            <p>
                                If there's a breach, I'll let you know,
                                <br />
                                In the dead of night, or the morning glow,
                                <br />
                                We'll fix it fast, we'll make it right,
                                <br />
                                Together we'll stand, in this data fight.
                            </p>
                            <p className="font-bold">
                                This is our data dance, under moonlit skies,
                                <br />
                                With the GDPR watching, we'll never compromise,
                                <br />
                                I'll be your processor, with a duty so true,
                                <br />
                                Every byte, every bit, I'll handle it for you.
                            </p>
                            <p>
                                In this digital world, where privacy's the song,
                                <br />
                                We'll keep on dancing, where we both belong,
                                <br />
                                With every step, we'll take this vow,
                                <br />
                                To protect and cherish, here and now.
                            </p>
                            <div className="pb-16">
                                <SignatureFields />
                            </div>
                        </div>
                    </div>

                    <div
                        className={`${mode === 'pretty' || mode === 'lawyer' ? 'block' : 'hidden'} ${
                            mode === 'pretty' && ''
                        } ${
                            mode === 'lawyer' && 'font-serif'
                        } print:[&>p]:text-sm print:[&_li]:text-sm max-w-3xl mx-auto`}
                    >
                        <div
                            className={`my-8 print:mt-0 print:relative print:-top-2 print:mb-12 ${
                                mode === 'lawyer' && 'hidden'
                            }`}
                        >
                            <img width={157} src="/brand/posthog-logo.svg" />
                        </div>
                        <h2 className="!text-2xl">Data Processing Agreement — PostHog Inc.</h2>
                        <p>
                            This Data Processing Agreement ("<strong>Agreement</strong>") forms part of the Contract for
                            Services ("<strong>Principal Agreement</strong>") between{' '}
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
                            (the "<strong>Company</strong>") and <strong>PostHog, Inc.</strong> (the "
                            <strong>Processor</strong>") (together as the "<strong>Parties</strong>").
                        </p>
                        <p>
                            In the event of a conflict between this Agreement and the provisions of related agreements,
                            including the Principal Agreement, the terms of this Agreement shall prevail.
                        </p>
                        <p>WHEREAS</p>
                        <p>(A) The Company acts as a Data Controller.</p>
                        <p>
                            (B) The Company wishes to subcontract certain Services, which imply the processing of
                            personal data, to the Processor.
                        </p>
                        <p>
                            (C) The Parties seek to implement a data processing agreement that complies with applicable
                            Data Protection Laws (as defined below)
                        </p>
                        <p>(D) The Parties wish to lay down their rights and obligations.</p>
                        <p>IT IS AGREED AS FOLLOWS:</p>
                        <p>
                            <strong>1. Definitions and Interpretation</strong>
                        </p>
                        <div className="pl-8 pb-2">
                            <p>
                                {' '}
                                1.1. Unless otherwise defined herein, capitalized terms and expressions used in this
                                Agreement shall have the following meaning:
                            </p>
                            <div className="pl-8 pb-2">
                                <p>1.1.1. "Agreement" means this Data Processing Agreement and all Annexes;</p>
                                <p>
                                    1.1.2. "Company Personal Data" means any Personal Data relating to Company's end
                                    users provided to or Processed by the Processor on behalf of the Company pursuant to
                                    or in connection with the Principal Agreement;
                                </p>
                                <p>
                                    1.1.3. "Data Protection Laws" means all applicable laws relating to Processing of
                                    Personal Data and privacy that may exist in any relevant jurisdiction, including
                                    European Data Protection Laws and US Data Protection Laws;
                                </p>
                                <p>1.1.4. "EEA" means the European Economic Area;</p>
                                <p>
                                    1.1.5. "EU Personal Data" means the Processing of Personal Data by the Processor to
                                    which data protection legislation of the European Union, or of a Member State of the
                                    European Union or EEA, applies;
                                </p>
                                <p>
                                    1.1.6. "European Data Protection Laws" means the GDPR, UK Data Protection Act 2018,
                                    the UK GDPR, ePrivacy Directive 2002/58/EC, FADP, and any associated or additional
                                    legislation in force in the EU, EEA, Member States and the United Kingdom as
                                    amended, replaced or superseded from time to time;
                                </p>
                                <p>
                                    1.1.7. "FADP" means the Swiss Federal Act on Data Protection and its Ordinances, as
                                    amended from time to time;
                                </p>
                                <p>
                                    1.1.8. "FDPIC" means the Swiss Federal Data Protection and Information Commissioner;
                                </p>
                                <p>1.1.9. "GDPR" General Data Protection Regulation EU2016/679;</p>
                                <p>
                                    1.1.10. "UK GDPR" means General Data Protection Regulation (EU) 2016/679 as
                                    applicable as part of UK domestic law by virtue of section 3 of the European Union
                                    (Withdrawal) Act 2018 and as amended by the Data Protection, Privacy and Electronic
                                    Communications (Amendments etc) (EU Exit) Regulations 2019 (as amended);
                                </p>
                                <p>
                                    1.1.11. "US Data Protection Laws" means all data privacy, data protection, and
                                    cybersecurity laws, rules, and regulations of the United States applicable to the
                                    Processing of Personal Data under the Principal Agreement. "US Data Protection Laws"
                                    may include, but is not limited to, the California Consumer Privacy Act of 2018, as
                                    amended by the California Privacy Rights Act of 2020 (together, the "
                                    <strong>CCPA</strong>"), the Colorado Privacy Act ("<strong>CPA</strong>"), the
                                    Connecticut Data Privacy Act ("<strong>CTDPA</strong>"), the Utah Consumer Privacy
                                    Act ("<strong>UCPA</strong>"), and the Virginia Consumer Data Protection Act ("
                                    <strong>VACDPA</strong>"), and any binding regulations promulgated thereunder, as
                                    amended or updated from time to time;
                                </p>
                                <p>
                                    1.1.12. "Protected Area" means (i) in the case of EU Personal Data, the member
                                    states of the European Union and the EEA and any country, territory, sector or
                                    international organization in respect of which an adequacy decision under Art 45
                                    GDPR is in force or (ii) in the case of UK Personal Data, the United Kingdom and any
                                    country, territory, sector or international organization in respect of which an
                                    adequacy decision under UK adequacy regulations is in force; or (iii) in the case of
                                    Swiss Personal Data, any country, territory, sector or international organization
                                    which is recognized as adequate by the FDPIC or the Swiss Federal Council (as the
                                    case may be);
                                </p>
                                <p>
                                    1.1.13. "Personal Data" means any information provided by Company to Processor that
                                    is protected as "personal data," "personal information," "personally identifiable
                                    information," or similar terms defined in Data Protection Laws;
                                </p>
                                <p>
                                    1.1.14. "Services" means the product and data analytics services the Processor
                                    provides pursuant to the Principal Agreement , including but not limited to the
                                    provision of testing, support, product development, service improvement,
                                    benchmarking and troubleshooting activities on behalf of the Data Controller.
                                </p>
                                <p>
                                    1.1.15. "Subprocessor" means any person appointed by or on behalf of Processor to
                                    Process Personal Data on behalf of the Company in connection with the Agreement.
                                </p>
                                <p>
                                    1.1.16. "Standard Contractual Clauses" means (i) in respect of UK Personal Data, the
                                    International Data Transfer Addendum to the EU Standard Contractual Clauses, issued
                                    by the Information Commissioner and laid before Parliament in accordance with s.119A
                                    of the Data Protection Act 2018 on 2 February 2022 ("UK Standard Contractual
                                    Clauses"); (ii) in respect of EU Personal Data, the standard contractual clauses for
                                    the transfer of personal data to third countries pursuant to the GDPR, adopted by
                                    the European Commission under Commission Implementing Decision (EU) 2021/914
                                    including the text from module 2 and no other modules and not including any clauses
                                    marked as optional, ("EU Standard Contractual Clauses"); and (iii) in respect of
                                    Swiss Personal Data, the EU Standard Contractual Clauses with the necessary
                                    adaptations and amendments for the purposes of the FADP as required by the FDPIC in
                                    its Statement of 27 August 2021;
                                </p>
                                <p>
                                    1.1.17. "Swiss Personal Data" means personal data to which the FADP was applicable
                                    prior to its Processing by Processor;
                                </p>
                                <p>
                                    1.1.18. "UK Personal Data" means the Processing of Personal Data by the Processor to
                                    which the laws of the United Kingdom apply
                                </p>
                            </div>
                            <p>
                                1.2. The terms, "Controller", "Data Subject", "Member State", "Personal Data", "Personal
                                Data Breach", "Processing" and "Supervisory Authority" shall have the same meaning as in
                                the GDPR and UK GDPR, and their cognate terms shall be construed accordingly with other
                                Data Protection Laws. For example, Data Subject shall include such analogous terms as
                                Consumer under US Data Protection Laws.
                            </p>
                            <p>
                                1.3. The terms "sell," "sale," "share," and "sharing," and "Service Provider" shall have
                                the same meanings as in the CCPA.
                            </p>
                        </div>
                        <p>
                            <strong>2. Processing of Company Personal Data</strong>
                        </p>
                        <div className="pl-8 pb-2">
                            <p>2.1. The Company shall:</p>
                            <div className="pl-8 pb-2">
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
                                <p>
                                    2.1.3. instruct the Processor to process Company Personal Data to provide the
                                    Services.
                                </p>
                            </div>
                            <p>2.2. Processor shall:</p>
                            <div className="pl-8 pb-2">
                                <p>
                                    2.2.1. comply with all applicable Data Protection Laws in the Processing of Company
                                    Personal Data; and
                                </p>
                                <p>
                                    2.2.2. not Process Company Personal Data other than on the relevant Company's
                                    documented instructions including with regard to data transfers outside of the
                                    Protected Area, unless required to do so by laws to which the Processor is subject;
                                    in such a case, Processor shall inform the Company of that legal requirement before
                                    Processing, unless that law prohibits such information on important grounds of
                                    public interest.
                                </p>
                                <p>
                                    2.2.3. notify the Company immediately if, in the Processor's reasonable opinion, an
                                    instruction for the Processing of Personal Data given by the Company infringes
                                    applicable Data Protection Laws , it being acknowledged that the Processor shall not
                                    be obliged to undertake additional work or screening to determine if the Company's
                                    instructions are compliant.
                                </p>
                                <p>2.2.4. not directly or indirectly sell or share any Personal Data;</p>
                            </div>
                            <p>
                                2.3. Annex I A sets out the subject-matter and duration of the processing, the nature
                                and purpose of the processing, the type of personal data and categories of data
                                subjects. The obligations and rights of the Company are as set out in this Agreement
                            </p>
                            <p>
                                2.4. Processor acknowledges that it is a Service Provider and that all Personal Data
                                that it may receive from Company, Company's employees or consultants, or otherwise
                                acquired by virtue of the performance of services under the Principal Agreement shall be
                                regarded by Processor as strictly confidential and held by Processor in confidence.
                            </p>
                            <p>
                                2.5. Processor shall not directly or indirectly sell any Personal Data, or retain, use,
                                or disclose any Personal Data for any purpose other than for the purpose of performing
                                services for Company; or retain, use, or disclose any Personal Data outside the scope of
                                this Agreement or the Principal Agreement.
                            </p>
                            <p>
                                2.6. Processor understands the restrictions in this Section 2 and will comply with them.
                            </p>
                            <p>
                                2.7. Company, upon written notice, may take reasonable and appropriate steps to stop and
                                remediate unauthorized use of Personal Data, including without limitation, exercising
                                Company's right to conduct an audit of Processor, or terminating the Principal Agreement
                                and exercising Company's right to request deletion or return of Personal Data.
                            </p>
                        </div>
                        <p>
                            <strong>3. Processor Personnel & Confidentiality</strong>
                        </p>
                        <div className="pl-8 pb-2">
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
                        <div className="pl-8 pb-2">
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
                        <div className="pl-8 pb-2">
                            <p>
                                5.1. The Company provides Processor with general authorization to engage the
                                Subprocessors set out in Annex III. These will differ depending on the Data Center
                                Location chosen by the Company.
                            </p>
                            <p>
                                5.2. Processor shall enter into a written contract with any Subprocessor and this
                                contract shall impose upon the Subprocessor equivalent obligations as imposed by this
                                Agreement upon the Processor. Where the Subprocessor fails to fulfil its data protection
                                obligations, Processor shall remain fully liable to the Company for the performance of
                                the Subprocessors obligations.
                            </p>
                            <p>
                                5.3. Processor may update the list of Subprocessors from time to time as applicable,
                                providing the Company with notice of such update (and an opportunity to object) at least
                                fourteen (14) days in advance of such updates.
                            </p>
                            <p>
                                5.4. If the Company objects to a Subprocessor, the Company shall notify Processor
                                thereof in writing within seven (7) days after receipt of Processor's updated
                                Subprocessors' list. If the Company objects to the use of the Subprocessor, Processor
                                shall use efforts to address the objection through one of the following options: (a)
                                Processor will cancel its plans to use Subprocessor with regard to Company Personal Data
                                or will offer an alternative to provide the Services without such Subprocessor; or (b)
                                Processor will take any corrective steps requested by the Company in its objection
                                (which would therefore remove the Company's objection) and proceed to use Subprocessor.
                                If none of the above options are reasonably available and the objection has not been
                                sufficiently addressed within thirty (30) days after Processor's receipt of the
                                Company's objection, the Company may terminate the affected Service with reasonable
                                prior written notice.
                            </p>
                        </div>
                        <p>
                            <strong>6. Data Subject Rights and Cooperation</strong>
                        </p>
                        <div className="pl-8 pb-2">
                            <p>
                                6.1. Taking into account the nature of the Processing, Processor shall assist the
                                Company by implementing appropriate technical and organizational measures, insofar as
                                this is possible, for the fulfillment of the Company obligations, as reasonably
                                understood by Company, to respond to requests to exercise Data Subject rights under
                                applicable Data Protection Laws.
                            </p>
                        </div>
                        <p>6.2. Processor shall:</p>
                        <div className="pl-8 pb-2">
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
                            required directly as a result of the Processor's own acts or omissions, in which case such
                            assistance will be at the Processor's expense.
                        </p>
                        <p>
                            <strong>7. Personal Data Breach</strong>
                        </p>
                        <div className="pl-8 pb-2">
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
                        <div className="pl-8 pb-2">
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
                        <div className="pl-8 pb-2">
                            <p>
                                9.1. Following a request from the Company, Processor shall promptly and in any event
                                within 10 business days of the date of cessation of any Services involving the
                                Processing of Company Personal Data, return or delete and procure the deletion of all
                                copies of the Company Personal Data unless applicable laws require storage of such
                                Company Personal Data.
                            </p>
                        </div>

                        <p>
                            <strong>10. Data Center Location and Transfers Outside of the Protected Area</strong>
                        </p>
                        <div className="pl-8 pb-2">
                            <p>
                                10.1. <strong>Storage of Personal Data.</strong> Company Personal Data will be housed in
                                data centers located in the Data Center Location set out in the Principal Agreement
                                unless the parties otherwise expressly agree in writing.
                            </p>
                            <p>
                                10.2. <strong>Transfers.</strong> The Company acknowledges that the Processor will
                                Process the Company Personal Data outside of the Protected Area including in the US to
                                provide the Services.
                            </p>
                            <p>
                                10.3. <strong>Data Privacy Framework.</strong> Processor confirms that it participates
                                in the EU-US Data Privacy Framework and the UK Extension to this Framework (together,
                                the "DPF"). The Supplier undertakes to maintain its self-certification to the DPF; to
                                notify Company without undue delay if Processor determines that it will cease to
                                self-certify to the DPF; and to notify Company immediately if Processor's participation
                                in the DPF is otherwise terminated. [In respect of UK Personal Data, Company hereby
                                notifies Processor that Company identifies and treats genetic data, data relating to
                                sexual orientation, biometric data processed for the purpose of uniquely identifying
                                data subjects and data relating to criminal convictions and offenses as sensitive].
                            </p>
                            <p>
                                10.4. <strong>Standard Contractual Clauses.</strong> Notwithstanding 10.3, the parties
                                agree to comply with the obligations set out in the Standard Contractual Clauses as
                                though they were set out in full in this Agreement, with the Company as the "data
                                exporter" and the Processor as the "data importer", with the parties signatures and
                                dating of this Agreement being deemed to be the signature and dating of the Standard
                                Contractual Clauses and with Annexes to EU Standard Contractual Clauses and the
                                Appendices to the UK Standard Contractual Clauses being as set out in Annex I and II of
                                this Agreement
                            </p>
                            <p className="pl-8 pb-2">
                                In relation to the EU Standard Contractual Clauses, the Parties agree that:
                            </p>
                            <div className="pl-8 pb-2">
                                <p>
                                    10.4.1. for the purposes of clause 9, option 2 (general written authorization for
                                    subprocessors) shall apply and the Parties agree that the time period for notifying
                                    changes to the list shall be in accordance with Clause 5.3 above;
                                </p>
                                <p>
                                    10.4.2. for the purposes of clause 17, the clauses shall be governed by the laws of{' '}
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
                                                    htmlFor="jurisdiction"
                                                    className="bg-yellow/40 font-bold px-0.5 py-0.5"
                                                >
                                                    {jurisdiction ? jurisdiction : '[JURISDICTION]'}
                                                </label>
                                            </button>
                                        </span>
                                    </Tooltip>
                                </p>
                                <p>
                                    10.4.3. for the purposes of clause 18, the courts of{' '}
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
                                                    htmlFor="jurisdiction"
                                                    className="bg-yellow/40 font-bold px-0.5 py-0.5"
                                                >
                                                    {jurisdiction ? jurisdiction : '[JURISDICTION]'}
                                                </label>
                                            </button>
                                        </span>
                                    </Tooltip>{' '}
                                    shall have jurisdiction; and
                                </p>
                                <p>
                                    10.4.4. for the purposes of clause 13 and Annex I.C, the{' '}
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
                                                    htmlFor="supervisoryAuthority"
                                                    className="bg-yellow/40 font-bold px-0.5 py-0.5"
                                                >
                                                    {supervisoryAuthority
                                                        ? supervisoryAuthority
                                                        : '[SUPERVISORY AUTHORITY]'}
                                                </label>
                                            </button>
                                        </span>
                                    </Tooltip>
                                </p>
                            </div>
                            <p>
                                10.5. In relation to the UK Standard Contractual Clauses, as permitted by clause 17 of
                                such Addendum, the Parties agree to change the format of the information set out in Part
                                1 of the Addendum so that:
                            </p>
                            <div className="pl-8 pb-2">
                                <p>
                                    10.5.1. the details of the parties in table 1 shall be as set out in Annex I (with
                                    no requirement for signature);
                                </p>
                                <p>
                                    10.5.2. for the purposes of table 2, the Addendum shall be appended to the EU
                                    Standard Contractual Clauses as defined above (including the selection of modules
                                    and options and the disapplication of optional clauses as noted in the definition
                                    above); and
                                </p>
                                <p>10.5.3. the appendix information listed in table 3 is set out in Annex I and II.</p>
                            </div>
                            <p>
                                10.6. In relation to Swiss Personal Data that is transferred outside of the Protected
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
                                10.7. In the event of any conflict between this Agreement and the Standard Contractual
                                Clauses, the Standard Contractual Clauses shall prevail.
                            </p>
                            <p>
                                10.8. In the event that a relevant European Commission decision or other valid adequacy
                                method under applicable Data Protection Legislation on which the Company has relied in
                                authorising the data transfer is held to be invalid, or that any supervisory authority
                                requires transfers of personal data made pursuant to such decision to be suspended, or
                                in the event that Processor ceases to participate in the DPF then the parties will agree
                                to use a suitable and appropriate alternative transfer solution.
                            </p>
                        </div>

                        <p>
                            <strong>11. General Terms</strong>
                        </p>
                        <div className="pl-8 pb-2">
                            <p>
                                11.1. <em>Confidentiality.</em> Each Party must keep this Agreement and information it
                                receives about the other Party and its business in connection with this Agreement
                                ("Confidential Information") confidential and must not use or disclose that Confidential
                                Information without the prior written consent of the other Party except to the extent
                                that:
                            </p>
                            <div className="pl-8 pb-2">
                                <p>11.1.1. disclosure is required by law;</p>
                                <p>11.1.2. the relevant information is already in the public domain.</p>
                            </div>
                            <p>
                                11.2. <em>Notices.</em> All notices and communications given under this Agreement must
                                be in writing and will be delivered personally, sent by post or sent by email to the
                                address or email address set out in the heading of this Agreement at such other address
                                as notified from time to time by the Parties changing address,
                            </p>
                            <p>
                                11.3. <em>Governing Law and Jurisdiction.</em> This Agreement is governed by the laws
                                and choice of jurisdiction stipulated in the Agreement.
                            </p>
                        </div>
                        <p className="[page-break-before:always] print:pt-12">
                            IN WITNESS WHEREOF, this Agreement is entered into with effect from the date first set out
                            below.
                        </p>

                        <SignatureFields />

                        <p className="text-center mt-20 [page-break-before:always]">
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

                        <p>
                            The personal data shall be processed in order to allow Processor to provide the Services.
                            Processor provides a software platform that equips developers to build successful products.
                            Processor provides a single platform to analyze, test, observe, and deploy new features in
                            order to provide these services. Processor also provides support to Customers to triage,
                            debug, and resolve issues that may affect their use of the services
                        </p>

                        <div className="ml-12">
                            <p>
                                <strong>Nature and purpose of the processing</strong>
                            </p>
                        </div>

                        <p>
                            Product analytics, including insights, heatmaps, session recording and feature flags.
                            Troubleshooting, benchmarking, product development and service improvement activities to
                            ensure the continuing provision of the Services.
                        </p>

                        <p>
                            <strong className="underline">Duration</strong>
                        </p>
                        <p>For the duration of the Principal Agreement.</p>

                        <p>
                            <strong>Categories of data subjects</strong>
                        </p>
                        <p>The personal data processed relates to the following categories of data subjects:</p>
                        <p>Company's end users (including prospects, customer and contractors)</p>

                        <p>
                            <strong>Categories of personal data processed</strong>
                        </p>
                        <p>The personal data processed comprises the following categories of data:</p>
                        <p>(As determined at the discretion of the Company):</p>

                        <ul>
                            <li>
                                Personal details and contact information including name, address, email address, title,
                                position, contact information, social profile information, IP address, unique user IDs
                                (such as cookie IDs) and marketing profiles.
                            </li>
                            <li>
                                Documents and Content: Documents, images, and content uploaded to the Services in
                                electronic form which may contain any type of Personal Data.
                            </li>
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
                        <div className="ml-12 print:pb-1">
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
                                <li>
                                    the role of the{' '}
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
                                                    htmlFor="yourTitle"
                                                    className="bg-yellow/40 font-bold px-0.5 py-0.5"
                                                >
                                                    {yourTitle ? yourTitle : '[YOUR TITLE]'}
                                                </label>
                                            </button>
                                        </span>
                                    </Tooltip>{' '}
                                    is controller; and
                                </li>
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
                            <p>See ‘A. Processing Activities' above</p>

                            <p>
                                <em>Categories of personal data transferred:</em>
                            </p>
                            <p>See ‘A. Processing Activities' above</p>

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
                            <p>See ‘A. Processing Activities' above.</p>

                            <p>
                                <em>
                                    Purpose(s) of the data transfer and further processing (EU Standard Contractual
                                    Clauses only):
                                </em>
                            </p>
                            <p>See ‘A. Processing Activities' above.</p>

                            <p>
                                <em>
                                    Period for which the personal data will be retained, or, if that is not possible,
                                    the criteria used to determine that period (EU Standard Contractual Clauses only):
                                </em>
                            </p>
                            <p>See ‘A. Processing Activities' above.</p>

                            <p>
                                <em>
                                    The subject matter, nature and duration of the processing (EU Standard Contractual
                                    Clauses only):
                                </em>
                            </p>
                            <p>See ‘A. Processing Activities' above.</p>
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

                        <p className="text-center mt-12 !mb-0 !pb-0 [page-break-before:always]">
                            <strong>ANNEX III</strong>
                        </p>
                        <p className="text-center print:pb-8">
                            <strong>Subprocessors</strong>
                        </p>
                    </div>

                    <div
                        className={`${mode === 'pretty' || mode === 'lawyer' ? 'block' : 'hidden'} ${
                            mode === 'lawyer' && 'font-serif'
                        }`}
                    >
                        <div className="grid @xl:grid-cols-[repeat(3,minmax(50px,1fr))] gap-x-8 @xl:gap-y-6 text-sm [&>div:nth-child(5n+6)]:border-t [&>div:nth-child(5n+6)]:border-light [&>div:nth-child(5n+6)]:pt-8 mb-8">
                            {subprocessors.map((subprocessor, index) => (
                                <React.Fragment key={index}>
                                    <div className="col-span-3 @xl:!-mb-6">
                                        <h3 className="!my-0 text-xl">
                                            <strong>{subprocessor.name}</strong>
                                        </h3>
                                    </div>
                                    <div className="py-2 flex flex-col col-span-3 @xl:col-span-1 gap-1">
                                        <div dangerouslySetInnerHTML={{ __html: subprocessor.contact }} />
                                        <div className="pt-2">
                                            <strong>Details</strong>
                                            <br />
                                            <Link
                                                href={subprocessor.details}
                                                externalNoIcon
                                                className="[word-break:break-word]"
                                            >
                                                {subprocessor.details}
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="py-2 flex flex-col col-span-3 @xl:col-span-1 gap-3">
                                        <div>
                                            <strong className="block">Categories of data subject</strong>
                                            <div>{subprocessor.categories}</div>
                                        </div>
                                        <div>
                                            <strong className="block">Duration of the processing</strong>
                                            <div>{subprocessor.duration}</div>
                                        </div>
                                        <div>
                                            <strong className="block">Geographical location of the processing</strong>
                                            <div>{subprocessor.location}</div>
                                        </div>
                                    </div>
                                    <div className="py-2 flex flex-col col-span-3 @xl:col-span-1 gap-3">
                                        <div>
                                            <div>
                                                <strong>Subject matter of the processing</strong>
                                            </div>
                                            <div>{subprocessor.subject}</div>
                                        </div>
                                        <div>
                                            <div>
                                                <strong>Nature and purpose of the processing</strong>
                                            </div>
                                            <div>{subprocessor.reason}</div>
                                        </div>
                                    </div>
                                    <div className="col-span-3 mt-2 @xl:-mt-4 mb-6 @xl:mb-2">
                                        <strong className="block mb-2 text-base">
                                            Type of personal data processed
                                        </strong>
                                        <div className="grid grid-cols-2 @2xl:grid-flow-col @2xl:auto-cols-fr border border-light rounded px-6 py-4 gap-x-4 gap-y-2 @xl:gap-y-4">
                                            {Object.entries(subprocessor.type).map(([typeName, typeValues]) => (
                                                <React.Fragment key={typeName}>
                                                    <div>
                                                        <strong className="block pb-1">{typeName}</strong>
                                                        <ul className="pl-4 !mb-1">
                                                            {typeValues.map((typeValue, index) => (
                                                                <li
                                                                    key={index}
                                                                    className="!mb-0 !leading-normal !text-sm"
                                                                >
                                                                    {typeValue}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="text-center mt-20 md:mt-40 mb-20 md:mb-24 print:hidden">
                <h3>Need a custom MSA?</h3>

                <TrackedCTA
                    event={{ name: `clicked Talk to a human` }}
                    href="/talk-to-a-human"
                    type="secondary"
                    size="lg"
                >
                    Talk to sales
                </TrackedCTA>
            </section>
        </Layout>
    )
}

export default DpaGenerator
