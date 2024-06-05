import cntl from 'cntl'
import Layout from 'components/Layout'
import React, { useEffect, useState } from 'react'
import SEO from 'components/seo'
import Link from 'components/Link'
import { Link as SmoothScrollLink } from 'react-scroll'
import Tooltip from 'components/Tooltip'
import { Twitter } from 'components/Icons'
import { StaticImage } from 'gatsby-plugin-image'
import { IconArrowRightDown, IconRedo } from '@posthog/icons'
import { sexyLegalMenu } from '../navs'
import Lawyers from 'components/Lawyers'
import { CSSTransition } from 'react-transition-group'
import SalesSlider from 'components/SalesSlider'

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

                <div className="max-w-4xl mx-auto py-8 px-4 md:px-8">
                    <h2 className="pb-4 text-center">
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

                    <SalesSlider />
                </div>
            </div>
        </Layout>
    )
}

export default Sales
