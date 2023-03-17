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
    const [activeTab, setActiveTab] = useState(props.activeTab || 'demo')
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
        if (tab === 'contact' || tab === 'demo' || tab === 'qa') {
            setActiveTab(tab)
        }
    }, [location])

    return (
        <>
            {!props.hideTabs && (
                <div className="flex justify-center space-x-2 mt-6">
                    <Chip active={activeTab === 'demo'} onClick={() => handleChipClick('demo')}>
                        Request a demo
                    </Chip>
                    <Chip active={activeTab === 'contact'} onClick={() => handleChipClick('contact')}>
                        Contact sales
                    </Chip>
                    <Chip active={activeTab === 'qa'} onClick={() => handleChipClick('qa')}>
                        15-min chat
                    </Chip>
                </div>
            )}
            <div className="mt-8">
                {activeTab === 'contact' ? (
                    <div className="max-w-xl mx-auto mt-12">
                        <HubspotForm
                            portalId="6958578"
                            formId="21de475a-af2c-47c2-ae02-414aefdfdeb4"
                            onSubmit={() => setSubmitted(true)}
                        />
                    </div>
                ) : null}
                {activeTab === 'demo' ? (
                    <div className="max-w-xl mx-auto mt-12">
                        <HubspotForm
                            portalId="6958578"
                            formId="509506d3-2ec8-40f7-901b-574be663694e"
                            onSubmit={() => setSubmitted(true)}
                        />
                    </div>
                ) : null}
                {activeTab === 'qa' ? (
                    <DemoScheduler
                        type="qa"
                        iframeSrc="https://calendly.com/d/hxx-tx7-qrs/posthog-15-minute-quick-chat"
                    />
                ) : null}
            </div>
        </>
    )
}
