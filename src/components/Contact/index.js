import { useLocation } from '@reach/router'
import Chip from 'components/Chip'
import { ContactForm } from 'components/ContactForm'
import { DemoScheduler } from 'components/DemoScheduler'
import queryString from 'query-string'
import React, { useEffect, useState } from 'react'

export default function Contact(props) {
    const location = useLocation()
    const [activeTab, setActiveTab] = useState('demo')
    const [demoType, setDemoType] = useState(props.demoType || 'group')
    const handleChipClick = (tab) => {
        setActiveTab(tab)
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
            <div className="mt-16">
                {
                    {
                        contact: <ContactForm />,
                        demo: (
                            <DemoScheduler
                                iframeSrc={
                                    {
                                        personal: 'https://calendly.com/jamesefhawkins/posthog-scale-enterprise-demo',
                                        group: 'https://calendly.com/jamesefhawkins/posthog-demo',
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
