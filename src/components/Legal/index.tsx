import Layout from 'components/Layout'
import OSTabs from 'components/OSTabs'
import { navigate } from 'gatsby'
import React from 'react'

export default function Legal({ children, currentTab }: { children: React.ReactNode; currentTab: string }) {
    const content = (
        <Layout scrollAreaDataScheme="secondary" scrollAreaClassName="bg-primary rounded">
            {children}
        </Layout>
    )

    return (
        <OSTabs
            padding
            contentPadding={false}
            tabs={[
                {
                    label: 'Terms',
                    value: '/terms',
                    content: content,
                },
                {
                    label: 'Privacy',
                    value: '/privacy',
                    content: content,
                },
                {
                    label: 'DPA generator',
                    value: '/dpa',
                    content: content,
                },
                {
                    label: 'BAA generator',
                    value: '/baa',
                    content: content,
                },
                {
                    label: 'Subprocessors',
                    value: '/subprocessors',
                    content: content,
                },
            ]}
            value={currentTab}
            defaultValue={currentTab}
            onValueChange={(value) => {
                navigate(value)
            }}
            centerTabs
            className="h-full"
            scrollable={false}
            tabContentClassName="h-full"
        />
    )
}
