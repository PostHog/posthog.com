import OSTabs from 'components/OSTabs'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { navigate } from 'gatsby'
import React from 'react'

export default function Legal({ children, defaultTab }: { children: React.ReactNode; defaultTab: string }) {
    return (
        <OSTabs
            padding
            contentPadding={false}
            tabs={[
                {
                    label: 'Terms',
                    value: '/terms',
                    content: children,
                },
                {
                    label: 'Privacy',
                    value: '/privacy',
                    content: children,
                },
                {
                    label: 'DPA generator',
                    value: '/dpa',
                    content: children,
                },
                {
                    label: 'BAA generator',
                    value: '/baa',
                    content: children,
                },
            ]}
            defaultValue={defaultTab}
            onValueChange={(value) => {
                navigate(value)
            }}
            centerTabs
            className="h-full"
        />
    )
}
