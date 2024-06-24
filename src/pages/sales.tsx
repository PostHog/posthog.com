import cntl from 'cntl'
import Layout from 'components/Layout'
import React, { useEffect, useRef, useState } from 'react'
import SEO from 'components/seo'
import Link from 'components/Link'
import { Link as SmoothScrollLink } from 'react-scroll'
import Tooltip from 'components/Tooltip'
import { Twitter } from 'components/Icons'
import { StaticImage } from 'gatsby-plugin-image'
import { IconArrowRightDown, IconMinus, IconPlus, IconRedo } from '@posthog/icons'
import { pricingMenu } from '../navs'
import { CSSTransition } from 'react-transition-group'

const them = [
    { title: '"I have a question about the product."', children: 'Hello world! Slide 1.' },
    { title: 'The discovery call', children: 'Hello world! Slide 2.' },
    { title: 'Finally, a demo!', children: '' },
    { title: 'The follow-up meeting', children: '' },
    { title: 'Sticker shock', children: '' },
    { title: '"We don\'t usually do this, but..."', children: '' },
    { title: 'The dreaded contract', children: '' },
    { title: 'Finally, implementation time!', children: '' },
    { title: '"Who\'s my point of contact now??"', children: '' },
]

const us = [
    { title: '"I have a question about the product."', children: 'Hello world! Slide 1.' },
    { title: 'Personalized demo with technical account exec', children: '' },
    { title: 'Next steps & follow-up questions', children: '' },
    { title: 'Choose your own discount', children: '' },
    { title: 'Besties', children: '' },
]
const AccordionItem = ({ number, title, children, isOpen, onClick }) => {
    const contentRef = useRef(null);
    const [contentHeight, setContentHeight] = useState('0px');

    useEffect(() => {
        // Update the content height when isOpen changes
        setContentHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
    }, [isOpen]);

    return (
        <div className={`border-t ${isOpen ? 'active border-transparent' : 'inactive border-light'}`}>
            <button onClick={onClick} className={`pl-3 pr-4 py-2 cursor-pointer w-full flex justify-between items-center rounded-tl rounded-tr ${isOpen ? 'bg-white' : 'bg-transparent hover:bg-accent/80 rounded-bl rounded-br'}`}>
                <span className="flex gap-2 items-center">
                    <span className="inline-flex w-8 h-8 justify-center items-center p-1 font-semibold rounded-full bg-accent dark:bg-accent-dark">{number}</span>
                    <span className={`font-bold transition-all ${isOpen ? 'text-xl' : 'text-[17px]'}`}>{title}</span></span>
                <span>
                    {isOpen ? <IconMinus className="size-4 inline-block transform rotate-180" /> : <IconPlus className="size-4 inline-block transform rotate-0" />}
                </span>
            </button>
            <div
                ref={contentRef}
                style={{ height: contentHeight, overflow: 'hidden', transition: 'height 0.3s ease' }}
            >
                <div className="bg-white shadow-lg rounded-bl rounded-br p-4">
                    {children}
                </div>
            </div>
        </div>
    );
};

const Accordion = ({ items }) => {
    const [openIndex, setOpenIndex] = useState(0);

    const handleClick = index => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="space-y-px">
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
        </div>
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
                <div className="max-w-2xl mx-auto py-8 px-4 md:px-8">
                    <h1 className="text-5xl text-center">How we do "sales"</h1>

                    <p className="mt-2 text-lg font-semibold mb-2 text-center text-balance">
                        There’s a big difference between PostHog and literally everybody else
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="relative">
                        <div className="absolute top-0 right-0 bottom-0 border border-light">
                            <StaticImage
                                quality={100}
                                placeholder="none"
                                src="../images/sales/phone-hog.png"
                                className="h-full"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="max-w-md">
                            <p>
                                Ever been to a pricing page that contains no actual pricing? And to find out what you’d
                                pay, you have to “jump on a quick call” with sales?
                            </p>
                            <p>
                                Most SaaS companies want to feel out how much money they can squeeze out of you. PostHog
                                operates differently.
                            </p>
                            <p>Here’s how.</p>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto py-8 px-4 md:px-8">
                    <h2 className="pb-4">
                        The sales process at
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

                    <Accordion items={them} />
                    <h2>Us</h2>
                    <Accordion items={us} />
                </div>
            </div>
        </Layout>
    )
}

export default Sales
