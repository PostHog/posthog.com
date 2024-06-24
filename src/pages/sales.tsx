import Layout from 'components/Layout'
import React, { useEffect, useRef, useState } from 'react'
import SEO from 'components/seo'
import Link from 'components/Link'
import { Link as SmoothScrollLink } from 'react-scroll'
import Tooltip from 'components/Tooltip'
import { StaticImage } from 'gatsby-plugin-image'
import { IconArrowRight, IconMinus, IconPlus, IconRedo } from '@posthog/icons'
import { CSSTransition } from 'react-transition-group'
import { CallToAction } from 'components/CallToAction'
import Logo from 'components/Logo'

const them = [
    {
        title: '"I have a question about the product."',
        children: <><div className="col-span-5 pl-9 [&_p]:mb-2 max-w-2xl pb-10">
            <p>
                You click ‘contact us’ and type in a bunch of personal information that has nothing to do with your use of the product.</p>
            <p>Often times, there's no place to even ask your question.</p>
            <p>Your phone number is required, even though they’ll respond by email.
            </p>
        </div>

            <div className="col-span-3 rotate-2 -mt-6 mb-6">
                <StaticImage
                    quality={90}
                    placeholder="blurred"
                    loading="eager"
                    src="../images/sales/demo-form.png"
                    width={294}
                />
            </div>
        </>
    },
    {
        title: 'The discovery call',
        children: <><div className="col-span-5 pl-9 [&_p]:mb-2 max-w-2xl pb-10">
            <p>
                Get booked with a junior rep who decides if you are a worthy human being.</p>
            <p>They will ask you the same questions you already filled out on the form.
            </p>
        </div>

            <div className="col-span-3 -mt-12">
                <StaticImage
                    quality={90}
                    placeholder="blurred"
                    src="../images/sales/sdr.png"
                    width={338}
                />
            </div>
        </>
    },
    {
        title: 'Finally, a demo!',
        children: <><div className="col-span-4 pl-9 [&_p]:mb-2 max-w-2xl pb-20">
            <p>
                Deemed worthy? They will book you into a further call for a demo with a different person, five minutes of which will cover what you are specifically interested in.</p>
            <p>
                No pricing will be revealed. You will be asked the same questions for a third time.
            </p>
        </div>

            <div className="col-span-4 -mt-4 pb-6 rotate-2">
                <StaticImage
                    quality={90}
                    placeholder="blurred"
                    src="../images/sales/sdr-on-zoom.png"
                    width={505.5}
                />
            </div>
        </>
    },
    {
        title: 'The follow-up meeting',
        children: <><div className="col-span-5 pl-9 [&_p]:mb-2 max-w-2xl pb-20">
            <p>It's now time to talk about your usage so they can put together a commercial proposal.</p>
            <p>A quote will be provided at a later date because they need to "circle back with the team" to "see what they can do for you."</p>
        </div>

            <div className="col-span-3 -mt-8 pb-6">
            </div>
        </>
    },
    {
        title: 'Sticker shock',
        children: <><div className="col-span-3 pl-9 [&_p]:mb-2 max-w-2xl pb-20">
            <p>
                There will be a long period of commercial wrangling because they massively inflated the price so they can then discount it heavily.
            </p>
            <p>
                They will bundle a bunch of value add-stuff you don’t need. 3 year contract is standard.
            </p>
        </div>

            <div className="col-span-5 text-center -mt-12">
                <StaticImage
                    quality={90}
                    placeholder="blurred"
                    src="../images/sales/receipt.png"
                    width={613}
                />
            </div>
        </>
    },
    {
        title: '"We don\'t usually do this, but..."',
        children: <><div className="col-span-4 pl-9 [&_p]:mb-2 max-w-2xl pb-20">
            <p>
                Any legal questions require a ton of time seeking ‘approval’ and coming back with amazing special exceptions they made that were ‘really painful’ when you know it’s all BS.
            </p>
        </div>

            <div className="col-span-4 -mt-12 pb-4 text-center">
                <StaticImage
                    quality={90}
                    placeholder="blurred"
                    src="../images/sales/decision-makers.png"
                    width={286}
                />
            </div>
        </>
    },
    {
        title: 'The dreaded contract',
        children: <><div className="col-span-5 pl-9 [&_p]:mb-2 max-w-2xl pb-20">
            <p>
                Eventually sign the contract - hopefully you saw the auto-renewal and mandatory price increases in there!
            </p>
        </div>

            <div className="col-span-3 -mt-12">
                <StaticImage
                    quality={90}
                    placeholder="blurred"
                    src="../images/sales/ribbon-cutting.png"
                    width={326}
                />
            </div>
        </>
    },
    {
        title: 'Finally, implementation time!',
        children: <><div className="col-span-4 pl-9 [&_p]:mb-2 max-w-2xl pb-20">
            <p>
                Spend <strong>a few months (!!)</strong> on implementation with yet another person on their team, because the person who demoed isn’t technical but has to be the person through whom all comms must flow.
            </p>
        </div>

            <div className="col-span-4 -mt-8 pb-8">
                <StaticImage
                    quality={90}
                    placeholder="blurred"
                    src="../images/sales/gantt-chart.png"
                    width={554.5}
                />
            </div>
        </>
    },
    {
        title: '"Wait, who\'s my point of contact now??"',
        children: <><div className="col-span-5 pl-9 [&_p]:mb-2 max-w-2xl pb-20">
            <p>
                All the sales people who got you on board immediately disappear and you are passed onto yet another team who ask you the same questions again…
            </p>
        </div>

            <div className="col-span-3 -mt-12 text-center">
                <StaticImage
                    quality={90}
                    placeholder="blurred"
                    src="../images/sales/confused-hog.png"
                    width={202}
                />
            </div>
        </>
    },
]

const us = [
    {
        title:
            '"I have a question about the product.',

        children: <>
            <div className="col-span-5 pl-9 [&_p]:mb-2 max-w-2xl pb-20">
                <p className="leading-relaxed">
                    <em>“How much does it cost?”</em> <Link href="/pricing">It’s on our website.</Link><br />
                    <em>”How does it work?”</em> <Link href="https://app.posthog.com/signup">Just sign up and try it - no credit card required.</Link><br />
                    <em>”Do you do discounts?”</em> <Link href="/handbook/growth/sales/contracts">It’s in our handbook.</Link><br />
                    <em>”Can I get a quick demo?”</em> <Link href="/demo">Watch a pre-recorded demo on our website.</Link>
                </p>
                <p>
                    Still need a personalized demo after all that? <Link href="/talk-to-a-human">Book a call with a technical account exec</Link> - no SDRs, no qualifying calls, no BS.
                </p>
            </div>

            <div className="col-span-3 -mt-6 pb-8 text-center">
                <StaticImage
                    quality={90}
                    placeholder="blurred"
                    loading="eager"
                    src="../images/sales/drake-hog-yes.png"
                    width={234}
                />
            </div>
        </>
    },
    {
        title:
            'Personalized demo with technical account exec',

        children: <>
            <div className="col-span-5 pl-9 [&_p]:mb-2 max-w-2xl pb-24">
                <p>
                    Get booked on a demo call with a technical person who will spend 90% of the call in the PostHog app, not chatting about our vision. They will use the info you’ve shared to customize the demo.</p>
                <p>Yes, we’ll even talk to you about how to manage your costs! If it turns out we can help you over a couple of emails, we’ll do that instead - less time in meetings for you, means more time building.
                </p>
            </div>

            <div className="col-span-3 -mt-12 text-center">
                <StaticImage
                    quality={90}
                    placeholder="blurred"
                    src="../images/sales/posthog-ae.png"
                    width={436}
                />
            </div>
        </>
    },
    {

        title: 'Next steps & follow-up questions',
        children: <><div className="col-span-4 pl-9 [&_p]:mb-2 max-w-2xl pb-20">
            <p>
                After the call, the same person will quickly follow up with targeted, useful information about your specific use case.</p>
            <p>If you’re looking at at spending $20k+ annually with us, we’ll get you into a shared Slack channel with our team. <strong>The goal is to get you into a short trial period</strong> where you’re implementing and seeing value from PostHog <em><strong>within a week</strong></em> - still free!</p>
            <p>If PostHog isn’t the right fit for you, we’ll let you know our honest opinion!
            </p>
        </div>

            <div className="col-span-4">
                <StaticImage
                    quality={90}
                    placeholder="blurred"
                    src="../images/sales/posthog-follow-up.png"
                    width={600}
                />
            </div>
        </>
    },
    {
        title:
            'Choose your own discount',

        children: <><div className="col-span-4 pl-9 [&_p]:mb-2 max-w-2xl pb-20">
            <p>
                Want to negotiate a discount for longer commitment? Sure thing - take your pick <Link href="/handbook/growth/sales/contracts">from our website</Link>! We believe this should be transparent too.</p>
            <p>P.S. If you ask for free <Link href="/merch">merch</Link>, our team is legally obliged to say yes.
            </p>
        </div>

            <div className="col-span-4">
                <StaticImage
                    quality={90}
                    placeholder="blurred"
                    src="../images/sales/discounts.png"
                    width={321}
                />
            </div>
        </>
    },
    {
        title:
            'Besties forever?',
        children: <>
            <div className="col-span-12 pl-9 [&_p]:mb-2 max-w-2xl pb-20">
                <p>
                    Contract signed - now you get passed onto… wait is that still the same person who did the initial demo and knows everything about me? And they will be my main point of contact for anything support-related?!</p>
                <p>We’re going to be best friends!
                </p>

                <StaticImage
                    quality={90}
                    placeholder="blurred"
                    src="../images/sales/celebration.png"
                    width={771}
                />
            </div>
        </>
    },
]

const AccordionItem = ({ number, title, children, isOpen, onClick }) => {
    const contentRef = useRef(null);
    const [contentHeight, setContentHeight] = useState('0px');

    useEffect(() => {
        // Update the content height when isOpen changes
        setContentHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
    }, [isOpen]);

    return (
        <li className={`border-t relative ${isOpen ? 'active border-transparent bg-white rounded shadow-lg z-10 overflow-hidden' : 'inactive border-light first:border-transparent'}`}>
            <button onClick={onClick} className={`pl-3 pr-4 cursor-pointer w-full flex justify-between items-center transition-all relative ${isOpen ? 'pt-4 pb-2 z-20' : 'text-primary/60 hover:text-primary/75 dark:text-primary-dark/60 dark:hover:text-primary-dark/75 py-2 hover:bg-accent/80  hover:scale-[1.0025] hover:top-[-.5px] active:scale-[.9999] active:top-[3px]'}`}>
                <span className="flex gap-2 items-center">
                    <span className="inline-flex w-8 h-8 justify-center items-center p-1 font-semibold rounded-full bg-accent dark:bg-accent-dark">{number}</span>
                    <span className={`font-bold transition-all ${isOpen ? 'text-2xl' : 'text-[17px]'}`}>{title}</span></span>
                <span>
                    {isOpen ? <IconMinus className="size-4 inline-block transform rotate-180" /> : <IconPlus className="size-4 inline-block transform rotate-0" />}
                </span>
            </button>
            <div
                ref={contentRef}
                style={{ height: contentHeight, transition: 'height 0.3s ease' }}
                className={isOpen ? '' : 'overflow-hidden'}
            >
                <div className="px-4">

                    <div className="grid grid-cols-8 gap-8 justify-between relative">
                        {children}

                        <div className="absolute left-9 bottom-6">
                            {number < 9 ? (
                                <CallToAction to="#" className="" size="sm" type="secondary">
                                    <span className="mr-2 bg-accent dark:bg-accent-dark border border-light dark:border-dark px-1.5 rounded border-b-2 inline-flex text-sm font-medium font-code">N</span>
                                    Next step
                                    <IconArrowRight className="size-4 inline-block ml-1" />
                                </CallToAction>
                            ) : (
                                <>
                                    <CallToAction href="https://app.posthog.com/signup">Get started - free</CallToAction>&nbsp;&nbsp;
                                    <CallToAction href="/demo" type="outline">
                                        Schedule a demo (but not like this one!)
                                    </CallToAction>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </li >
    );
};

const Accordion = ({ items }) => {
    const [openIndex, setOpenIndex] = useState(0);

    const handleClick = index => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <ol className="space-y-px p-0 list-none">
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    number={index + 1}
                    title={item.title}
                    children={item.children}
                    isOpen={openIndex === index}
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                />
            ))}
        </ol>
    );
};

function Sales() {
    const companies = [
        'BureaucraticSoft Inc.',
        'Monolith Enterprises',
        'RigidWorks Technologies',
        'StuffyCorp Solutions',
        'TopDown Tech',
        'Antiquated Systems Inc.',
        'DinosaurTech Industries',
        'HierarchiSoft',
        'CommandAndControl Systems',
        'RedTape Solutions',
    ]

    const [companyName, setCompanyName] = useState('')
    const [show, setShow] = useState(false)

    const updateCompanyName = () => {
        setShow(false)
        setTimeout(() => {
            let newCompanyName
            do {
                const randomIndex = Math.floor(Math.random() * companies.length)
                newCompanyName = companies[randomIndex]
            } while (newCompanyName === companyName)
            setCompanyName(newCompanyName)
            setShow(true)
        }, 100)
    }

    useEffect(() => {
        updateCompanyName()
    }, [])

    return (
        <Layout
        // parent={sexyLegalMenu}
        // activeInternalMenu={sexyLegalMenu.children.find(({ name }) => name.toLowerCase() === 'privacy')}
        >
            <SEO title='How we do "sales"' description="Sales, PostHog style" image={`/images/og/sales.png`} />
            <div>
                <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-8 pt-12 pb-12">
                    <div>
                        <h1 className="text-5xl mb-2">Sales, <em className="text-red dark:text-yellow">PostHog-style</em></h1>

                        <p className="mt-2 text-lg font-semibold mb-2 opacity-60">
                            Because nobody loves pricing pages that don't contain any actual pricing...
                        </p>
                        <p className="mb-2">
                            Most SaaS companies want to feel out how much money they can squeeze out of you. PostHog operates differently.
                        </p>
                        <p className="mb-2">
                            We’re more like a utility where you pay for what you use. No extra markup - everyone pays the same rates*.
                        </p>
                        <p className="opacity-60 text-sm">
                            *Unless you qualify for a{' '}
                            <Tooltip content="Discounts available to early-stage startups, non-profits, and customers who pay annually." className="border-b-2 pb-0.5 border-dashed border-border dark:border-dark"><span className="relative cursor-help">discount</span></Tooltip>
                        </p>
                    </div>
                    <div className="relative">
                        <div className="absolute top-0 left-0 bottom-0">
                            <StaticImage
                                quality={100}
                                placeholder="none"
                                src="../images/sales/phone-hog-light.png"
                                className="h-72"
                                loading="eager"
                                objectPosition="left top"
                                objectFit="cover"
                            />
                        </div>
                        <div className="hidden lg:block absolute left-full -bottom-7 w-screen">
                            <StaticImage
                                quality={100}
                                placeholder="none"
                                src="../images/sales/phone-cord.png"
                                className="h-[15px] -ml-1"
                                loading="eager"
                                width={754}
                                height={15}
                            />
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto py-8 px-4 md:px-8">
                    <div className="flex justify-center">
                        <div className="inline-flex flex-col items-center mb-6 mx-auto">
                            <h2 className="mb-1">
                                How the sales process works at
                                <span className="border-b-2 border-black/50 dark:border-white/50 text-red dark:text-yellow px-0.5 mx-1 min-w-[24rem] inline-flex gap-2 justify-between relative overflow-hidden after:absolute after:-bottom-6 after:left-0 after:content-['[Typical,_stuffy_enterprise_SaaS_sales_company]'] after:text-sm after:text-primary/75 dark:after:text-primary-dark/75 after:font-normal after:tracking-normal">
                                    <CSSTransition in={show} timeout={500} classNames="company-name" unmountOnExit>
                                        <span>{companyName}</span>
                                    </CSSTransition>
                                    <span
                                        onClick={updateCompanyName}
                                        className="relative -top-0.5 bg-red/15 dark:bg-white/20 p-1 rounded inline-flex cursor-pointer group hover:bg-red/20 dark:hover:bg-white/30"
                                    >
                                        <IconRedo className="size-5 inline-block text-red/90 hover:text-red/100 dark:text-white/70 dark:group-hover:text-white/100" />
                                    </span>
                                </span>{' '}
                            </h2>
                            <div className="min-w-[24rem] text-xs opacity-60 self-end">
                                [Insert your least favorite enterprise SaaS company here]
                            </div>
                        </div>
                    </div>

                    <Accordion items={them} />

                    <br />
                    <br />
                    <br />
                    <h2 className="flex items-center">How <Logo className="inline-block mt-[-2px] ml-2 mr-1.5" /> does sales</h2>
                    <Accordion items={us} />
                </div>
            </div>
        </Layout>
    )
}

export default Sales
