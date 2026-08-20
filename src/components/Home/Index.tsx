import React, { useEffect, useState } from 'react'
import SEO from 'components/shared/layout/seo'
import Link from 'components/shared/ui/Link'
import Editor from 'components/Editor'
import OSTable from 'components/shared/ui/OSTable'
import ScrollArea from 'components/RadixUI/ScrollArea'

export default function Home(): JSX.Element {
    return (
        <>
            <SEO
                title="home.mdx – PostHog"
                description=""
                image={`/images/og/customers.jpg`}
                updateWindowTitle={false}
            />
            <Editor title="home" type="mdx" slug="/">
                <p>we build tools for people who build products.</p>
                test. @todo i think this is old?
            </Editor>
        </>
    )
}
