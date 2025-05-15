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
import usePostHog from 'hooks/usePostHog'

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
    const [representativeEmail, setRepresentativeEmail] = useState('')
    const [mode, setMode] = useState('pretty')
    const [isFormComplete, setIsFormComplete] = useState(false)
    const divRef = useRef(null)
    const posthog = usePostHog()

    const FloatRight = `float-right -mr-2 @2xl:-mr-20 -my-8 @2xl:-mt-16 w-48 @2xl:w-80`
    const FloatLeft = `float-left -ml-2 @2xl:-ml-20 -my-8 @2xl:-mt-16 w-48 @2xl:w-80`

    const handleDpaSubmit = () => {
        if (typeof posthog === 'undefined') return
        if (posthog === null) return
        if (typeof posthog.capture !== 'function') return
        try {
            fetch('/api/dpa-export-event', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    companyName,
                    companyAddress,
                    yourName,
                    yourTitle,
                    representativeEmail,
                    distinctId: posthog?.get_distinct_id?.() || undefined,
                }),
            })
        } catch (e) {
            // fail silently
        }
    }

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

                <p className="col-span-2 !mt-8">
                    <strong>PostHog, Inc.</strong>
                </p>

                <p>Signature</p>
                <p className="border-b border-black w-full">&nbsp;</p>

                <p>Name</p>
                <p className="border-b border-black w-full">Hector Rodriguez</p>

                <p>Title</p>
                <p className="border-b border-black w-full">Legal & Compliance Manager</p>
            </div>
        </>
    )

    useEffect(() => {
        if (companyName && companyAddress && yourName && yourTitle && representativeEmail && mode) {
            setIsFormComplete(true)
        } else {
            setIsFormComplete(false)
        }
    }, [companyName, companyAddress, yourName, yourTitle, representativeEmail, mode])

    const handlePrint = () => {
        window.print()
    }

    const handleReset = () => {
        setCompanyName('')
        setCompanyAddress('')
        setYourName('')
        setYourTitle('')
        setRepresentativeEmail('')
    }

    const handleInputChange = (e) => {
        setMode(e.target.value)
        const top =
            window.scrollY +
            document.querySelector('#page')?.getBoundingClientRect().top -
            document.querySelector('header')?.getBoundingClientRect().height
        window.scrollTo({ top, behavior: 'smooth' })
    }

    // Determine if the current mode is a request mode
    const isRequestMode = mode === 'pretty' || mode === 'lawyer'

    // Only use handleDpaSubmit for non PDF export modes
    const handleButtonClick = () => {
        if (isRequestMode) {
            handleDpaSubmit()
            window.location.href = '/legal-request'
        } else {
            handlePrint()
        }
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
                        {!isRequestMode && <div className="text-lg font-bold">Preview</div>}
                        {!isRequestMode && (
                            <Tooltip
                                content={() => (
                                    <div className="max-w-xs md:max-w-sm print:hidden">
                                        {isFormComplete ? (
                                            <>
                                                <h4 className="mb-1">Important instructions</h4>
                                                <ol className="mb-3">
                                                    <li>
                                                        <p className="text-[15px] mb-0">
                                                            Open your browser's print dialog
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <p className="text-[15px] mb-0">
                                                            Use the Export to PDF option in your browser or system's
                                                            print menu
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <p className="text-[15px] mb-0">
                                                            Sign and send to privacy@posthog.com for counter-signature
                                                        </p>
                                                    </li>
                                                </ol>
                                                <p className="mb-0 text-[15px] border-t border-light pt-4 mt-2">
                                                    <strong>Tip:</strong> Disable these options in Chrome's print
                                                    settings to ditch the page title, URL, and highlighted fields from
                                                    your printed copy. 👇
                                                </p>

                                                <div className="my-2 border border-light dark:border-dark rounded overflow-hidden">
                                                    <CloudinaryImage
                                                        src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/dpa/print-settings.png"
                                                        alt="Print settings"
                                                        placeholder="blurred"
                                                        className="dark:rounded"
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
                                        event={{ name: 'clicked Print DPA' }}
                                        type="primary"
                                        size="sm"
                                        disabled={!isFormComplete}
                                        onClick={handleButtonClick}
                                        className="[&>span]:flex [&>span]:items-center [&>span]:gap-1 relative md:left-4"
                                    >
                                        <>
                                            <IconPrint className="size-5" />
                                            <span>Export to PDF</span>
                                        </>
                                    </TrackedCTA>
                                </span>
                            </Tooltip>
                        )}
                    </div>

                    {isRequestMode ? (
                        <div className="flex flex-col items-center justify-center min-h-[400px] py-16 text-center bg-accent/30 rounded-b">
                            <img
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/c_scale,w_250/wasting_money_decf55197a"
                                alt="Max the PostHog mascot"
                                className="w-48 h-48 object-contain mb-6 drop-shadow-xl"
                            />
                            <h2 className="text-2xl font-bold mb-2 text-primary">Ready to request your DPA?</h2>
                            <p className="text-base text-primary/80 max-w-md mb-6">
                                Click below and our legal team will be in touch to help you complete your Data
                                Processing Agreement.
                                <br />
                                If you need a PDF preview, choose a different format.
                            </p>
                            <TrackedCTA
                                event={{ name: 'clicked Request DPA' }}
                                type="primary"
                                size="lg"
                                disabled={!isFormComplete}
                                onClick={handleButtonClick}
                                className="[&>span]:flex [&>span]:items-center [&>span]:gap-2"
                            >
                                <IconPrint className="size-6" />
                                <span>Request a DPA</span>
                            </TrackedCTA>
                            <p className="text-sm text-primary/60 mt-6">
                                Questions?{' '}
                                <a href="mailto:privacy@posthog.com" className="underline">
                                    privacy@posthog.com
                                </a>
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className={`${mode === 'fairytale' ? 'block' : 'hidden'}`}>
                                <div className="bg-yellow/25 py-4 px-8 text-sm text-center -mx-8 border-t border-light">
                                    <strong>Notice:</strong> While this version is a great way to understand what the
                                    DPA says, we don't recommend sending this version to the lawyers.
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
                                        Once upon a time in the enchanted land of Data, a wise and gentle kingdom known
                                        as{' '}
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
                                                        htmlFor="companyName"
                                                        className="bg-yellow/40 font-bold px-0.5 py-0.5"
                                                    >
                                                        {companyName ? companyName : '[COMPANY NAME]'}
                                                    </label>
                                                </button>
                                            </span>
                                        </Tooltip>{' '}
                                        sought to ensure that all its precious treasures—bits and bytes of
                                        knowledge—were safely guarded. To do this, they reached out to the guardian
                                        wizards of <strong>PostHog, Inc.</strong>, a famed group known for their
                                        powerful data spells and secure magic vaults.
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
                                                        htmlFor="companyName"
                                                        className="bg-yellow/40 font-bold px-0.5 py-0.5"
                                                    >
                                                        {companyName ? companyName : '[COMPANY NAME]'}
                                                    </label>
                                                </button>
                                            </span>
                                        </Tooltip>{' '}
                                        and the PostHog wizards agreed to create a magical pact called the "Data
                                        Protection Agreement," ensuring that all the treasures would be handled with
                                        care and respect for the laws of the land, including the ancient scrolls of GDPR
                                        and the mystical tomes of the EEA.
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
                                                        htmlFor="companyName"
                                                        className="bg-yellow/40 font-bold px-0.5 py-0.5"
                                                    >
                                                        {companyName ? companyName : '[COMPANY NAME]'}
                                                    </label>
                                                </button>
                                            </span>
                                        </Tooltip>{' '}
                                        a noble Data Controller, entrusted its treasures to the PostHog wizards. The
                                        wizards promised to safeguard the treasures by using their enchanted tools and
                                        secret spells to process and analyze the data. They vowed never to use the
                                        treasures for evil and always to follow{' '}
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
                                        In the depths of their crystal-clear agreement, they outlined the adventures the
                                        data could undertake and specified who could handle the data, ensuring that only
                                        the most trusted apprentice wizards or external guardians could assist in
                                        safeguarding it. Each apprentice was sworn to secrecy with a magical oath to
                                        protect{' '}
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
                                        They built a fortress of security measures, enchantments so strong that only
                                        those with the right spells could access the treasures. They agreed to help each
                                        other in times of trouble, like when a data gremlin might sneak in to create
                                        mischief.
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
                                                        htmlFor="companyName"
                                                        className="bg-yellow/40 font-bold px-0.5 py-0.5"
                                                    >
                                                        {companyName ? companyName : '[COMPANY NAME]'}
                                                    </label>
                                                </button>
                                            </span>
                                        </Tooltip>{' '}
                                        and PostHog celebrated their alliance with a grand feast in the grand hall,
                                        signing their pact with quill and enchanted ink. They agreed that their magical
                                        contract would be overseen by the wise elders of the land—judges from the
                                        jurisdiction of England and Wales.
                                    </p>

                                    <p>
                                        As the years passed, their partnership flourished.{' '}
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
                                                        htmlFor="companyName"
                                                        className="bg-yellow/40 font-bold px-0.5 py-0.5"
                                                    >
                                                        {companyName ? companyName : '[COMPANY NAME]'}
                                                    </label>
                                                </button>
                                            </span>
                                        </Tooltip>
                                        's treasures were kept safe and grew in wisdom, bringing joy and prosperity to
                                        the land. And they all lived securely and data-compliantly ever after.
                                    </p>
                                    <div className="pb-16">
                                        <SignatureFields />
                                    </div>
                                </div>
                            </div>

                            <div className={`${mode === 'tswift' ? 'block' : 'hidden'} [&>p]:text-[15px] pb-4`}>
                                <div className="bg-yellow/25 py-4 px-8 text-sm text-center -mx-8 border-t border-light">
                                    <strong>Notice:</strong> We don't recommend this version, unless you know a judge
                                    who's a Swiftie.
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
                        </>
                    )}
                </div>

                <div
                    className={`${mode === 'pretty' || mode === 'lawyer' ? 'block' : 'hidden'} ${
                        mode === 'lawyer' && 'font-serif'
                    }`}
                >
                    <div className="grid @xl:grid-cols-[repeat(3,minmax(50px,1fr))] gap-x-8 @xl:gap-y-6 text-sm [&>div:nth-child(5n+6)]:border-t [&>div:nth-child(5n+6)]:border-light [&>div:nth-child(5n+6)]:pt-8 mb-8">
                        {subprocessors.map((subprocessor, index) => (
                            <React.Fragment key={index}>{/* ...subprocessor content... */}</React.Fragment>
                        ))}
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
