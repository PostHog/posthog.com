import Logo from 'components/Logo'
import { SEO } from 'components/seo'
import { heading } from 'components/SignUp/classes'
import Layout from 'components/SignUp/Layout'
import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import Intro from './Intro'
import Steps, { Customers, InstallingPostHog, LearnMore, PlansPricing, Tutorials } from './Steps'
import TableOfContents from './TableOfContents'

export default function NextSteps({ location }) {
    const [customer, setCustomer] = useState({
        name: '',
        logo: '',
    })
    const [loading, setLoading] = useState(true)
    const steps = [
        {
            title: 'Installing PostHog',
            component: <InstallingPostHog />,
        },
        {
            title: 'Plans & pricing',
            component: <PlansPricing />,
        },
        {
            title: 'How teams are using PostHog',
            component: <Customers />,
        },
        {
            title: 'Popular tutorials',
            component: <Tutorials />,
        },
        {
            title: 'Learn more about PostHog',
            component: <LearnMore />,
        },
    ]
    useEffect(() => {
        async function getCustomer() {
            const domain = location.pathname.split('/')[2]
            if (domain) {
                const customer = await fetch(`/api/customer?domain=${domain}`).then((res) => res.json())
                setCustomer(customer)
            }
            setLoading(false)
        }
        getCustomer()
    }, [])
    return (
        <div style={{ opacity: loading ? '0' : '1' }}>
            <Layout crumbs={[{ title: 'Next steps' }]}>
                <SEO title="Next Steps - PostHog" />
                <div className="px-5 max-w-[600px] mx-auto">
                    <div className="flex justify-center items-center my-16 space-x-4 transition-opacity">
                        <Logo noText />
                        {customer.logo && (
                            <>
                                <span className="text-2xl">❤️</span>
                                <img className="w-[64px]" src={customer.logo} />
                            </>
                        )}
                    </div>
                    <h1 className={heading()}>Next steps</h1>
                    <Intro name={customer.name} />
                    <TableOfContents steps={steps.map(({ title }) => title)} />
                    <Steps steps={steps} />
                    <Footer />
                </div>
            </Layout>
        </div>
    )
}
