import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { DemoScheduler } from '../components/DemoScheduler'
import { Spacer } from '../components/Spacer'
import './styles/yc-onboarding.scss'
import { SEO } from '../components/seo'
import { Link } from 'gatsby'
import Chip from 'components/Chip'
import { ContactForm } from 'components/ContactForm'

type PaneOption = 'demo' | 'contact'

const pageTitles = {
    demo: 'Schedule Demo',
    contact: 'Contact',
}

const isPaneOption = (hash: string): hash is PaneOption => ['demo', 'contact'].includes(hash)

export const ScheduleDemo = () => {
    const [activePane, setActivePane] = useState(null as PaneOption | null)
    const hash = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : 'demo'
    useEffect(() => {
        if (isPaneOption(hash)) {
            setActivePane(hash)
            document.title = pageTitles[hash] + ' • PostHog'
        } else {
            setActivePane('demo')
        }
    }, [hash])

    return (
        <Layout>
            <SEO title="Schedule Demo • PostHog" />
            <div className="get-in-touch-wrapper">
                <Spacer />
                <h1 className="centered">Get in touch</h1>
                <div className="flex flex-nowrap justify-center space-x-2 overflow-x-auto pb-6 px-2 default-scrollbar">
                    <Chip href="#demo" active={activePane === 'demo'}>
                        Book a demo
                    </Chip>
                    <Chip href="#contact" active={activePane === 'contact'}>
                        Contact sales
                    </Chip>
                </div>
                {activePane === 'demo' && (
                    <>
                        <p>
                            Use the widget below to schedule a demo call with one of our engineers. Please note that
                            this is not a Sales call. For sales enquiries, please <a href="#contact">contact us</a>.
                        </p>
                        <p>
                            PostHog demos are done in group sessions and are an introduction to the platform. You can
                            also find a lot of information about the product in our <Link to="/docs">Docs</Link> and{' '}
                            <a href="https://www.youtube.com/channel/UCoP6ql8QkyOoVpBU4P8LM6w">
                                secondary YouTube channel
                            </a>
                            .
                        </p>
                        <DemoScheduler iframeSrc="https://calendly.com/jamesefhawkins/posthog-demo" />
                    </>
                )}
                {activePane === 'contact' && <ContactForm />}
            </div>
        </Layout>
    )
}

export default ScheduleDemo
