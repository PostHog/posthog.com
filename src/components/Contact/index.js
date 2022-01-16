import { useLocation } from '@reach/router'
import Chip from 'components/Chip'
import { ContactForm } from 'components/ContactForm'
import { DemoScheduler } from 'components/DemoScheduler'
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
        if (demo && (demo === 'group' || demo === 'scale' || demo === 'enterprise')) {
            setDemoType(demo)
        }
    }, [location])

    return (
        <>
            {!props.hideTabs && (
                <div className="flex justify-center space-x-2 mt-6">
                    <Chip active={activeTab === 'demo'} onClick={() => handleChipClick('demo')}>
                        Book a demo
                    </Chip>
                    <Chip active={activeTab === 'contact'} onClick={() => handleChipClick('contact')}>
                        Contact sales
                    </Chip>
                </div>
            )}
            <div className="mt-8">
                {
                    {
                        contact: <ContactForm />,
                        demo: (
                            <DemoScheduler
                                iframeSrc={
                                    {
                                        scale: 'https://calendly.com/cameron-posthog/posthog-scale-enterprise-demo',
                                        group: 'https://calendly.com/cameron-posthog/posthog-demo',
                                        enterprise: 'https://calendly.com/simon-posthog/enterprise-demo',
                                    }[demoType]
                                }
                            />
                        ),
                    }[activeTab]
                }
            </div>
        </>
    )
}
