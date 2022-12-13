import { useLocation } from '@reach/router'
import Chip from 'components/Chip'
import { DemoScheduler } from 'components/DemoScheduler'
import usePostHog from '../../hooks/usePostHog'
import queryString from 'query-string'
import React, { useEffect, useState } from 'react'
import HubspotForm from 'react-hubspot-form'

export default function Contact(props) {
    const posthog = usePostHog()
    const location = useLocation()
    const [activeTab, setActiveTab] = useState('demo')
    const [demoType, setDemoType] = useState(props.demoType || 'scale')
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
        if (demo && (demo === 'paid' || demo === 'qa')) {
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
                        contact: (
                            <div className="max-w-xl mx-auto mt-12">
                                <HubspotForm
                                    portalId="6958578"
                                    formId="21de475a-af2c-47c2-ae02-414aefdfdeb4"
                                    onSubmit={() => setSubmitted(true)}
                                />
                            </div>
                        ),
                        demo: (
                            <DemoScheduler
                                type={demoType}
                                iframeSrc={
                                    {
                                        paid: 'https://calendly.com/d/ckz-37j-jz9/posthog-scale-customer-success-demo',
                                        qa: 'https://calendly.com/cameron-posthog/15-minute-posthog-q-a',
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
