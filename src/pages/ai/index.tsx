import React, { useEffect, useState } from 'react'
import SEO from 'components/seo'
import Link from 'components/Link'
import Editor from 'components/Editor'
import { useValues } from 'kea'
import { layoutLogic } from 'logic/layoutLogic'
import OSTable from 'components/OSTable'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { useCustomers, Customer as CustomerType } from 'hooks/useCustomers'
import { IconArrowUpRight } from '@posthog/icons'

export default function AI(): JSX.Element {
    return (
        <>
            <SEO title="AI agents.md – PostHog" description="" image={`/images/og/customers.jpg`} />
            <Editor
                title="AI agents"
                type="md"
                slug="/ai"
                bookmark={{
                    title: 'AI agents.md',
                    description: 'AI agents',
                }}
            >
                <ScrollArea>AI page</ScrollArea>
            </Editor>
        </>
    )
}
