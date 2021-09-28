import { useLocation } from '@reach/router'
import Chip from 'components/Chip'
import { ContactForm } from 'components/ContactForm'
import { DemoScheduler } from 'components/DemoScheduler'
import Link from 'components/Link'
import { useValues } from 'kea'
import { posthogAnalyticsLogic } from 'logic/posthogAnalyticsLogic'
import queryString from 'query-string'
import React, { useEffect, useState } from 'react'

export default function Contact(props) {
    const { posthog } = useValues(posthogAnalyticsLogic)
    const location = useLocation()
    const [activeTab, setActiveTab] = useState('demo')
    const [demoType, setDemoType] = useState(props.demoType || 'group')
    const handleChipClick = (tab) => {
        setActiveTab(tab)
        posthog?.capture(`contact: clicked ${tab} button`)
        if (typeof window !== 'undefined') {
            window.location.hash = `#${tab}`
        }
    }

    useEffect(() => {
        const tab = location.hash.replace('#', '')
        const demo = queryString.parse(location.search)?.demo
        if (tab === 'contact' || tab === 'demo') {
            setActiveTab(tab)
        }
        if (demo && (demo === 'group' || demo === 'personal')) {
            setDemoType(demo)
        }
    }, [location])

    return (
        <>
            <div className="flex justify-center space-x-2 mt-6">
                <Chip active={activeTab === 'demo'} onClick={() => handleChipClick('demo')}>
                    Book a demo
                </Chip>
                <Chip active={activeTab === 'contact'} onClick={() => handleChipClick('contact')}>
                    Contact sales
                </Chip>
            </div>
            <div className="mt-8">
                {
                    {
                        contact: <ContactForm />,
                        demo: (
                            <>
                                <p>
                                    Use the widget below to schedule a demo call with one of our engineers. Please note
                                    that this is not a Sales call. For sales enquiries, please{' '}
                                    <a href="/schedule-demo#contact">contact us</a>.
                                </p>
                                <p>
                                    PostHog demos are done in group sessions and are an introduction to the platform.
                                    You can also find a lot of information about the product in our{' '}
                                    <Link to="/docs">Docs</Link> and{' '}
                                    <a href="https://www.youtube.com/channel/UCoP6ql8QkyOoVpBU4P8LM6w">
                                        secondary YouTube channel
                                    </a>
                                    .
                                </p>
                                <DemoScheduler
                                    iframeSrc={
                                        {
                                            personal:
                                                'https://calendly.com/jamesefhawkins/posthog-scale-enterprise-demo',
                                            group: 'https://calendly.com/jamesefhawkins/posthog-demo',
                                        }[demoType]
                                    }
                                />
                            </>
                        ),
                    }[activeTab]
                }
            </div>
        </>
    )
}
