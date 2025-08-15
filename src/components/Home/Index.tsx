import React, { useEffect, useState } from 'react'
import SEO from 'components/seo'
import Link from 'components/Link'
import Editor from 'components/Editor'
import OSTable from 'components/OSTable'
import ScrollArea from 'components/RadixUI/ScrollArea'
import Logo from 'components/Logo'

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
