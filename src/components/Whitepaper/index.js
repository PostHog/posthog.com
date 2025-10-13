import React, { Fragment, useState, useEffect } from 'react'
import SEO from 'components/seo'
import Wizard from 'components/Wizard'
import { CallToAction } from 'components/CallToAction'
import { productMenu } from '../../navs'
import * as Icons from '@posthog/icons'
import Link from 'components/Link'
import { IconBold, IconLink } from 'components/OSIcons'
import ScrollArea from 'components/RadixUI/ScrollArea'
import Logo from 'components/Logo'
import { RadioGroup } from 'components/RadixUI/RadioGroup'
import { navigate } from 'gatsby'
import usePostHog from '../../hooks/usePostHog'
import { useApp } from '../../context/App'
import { useWindow } from '../../context/Window'
import { useLocation } from '@reach/router'
import Editor from 'components/Editor'

export default function Whitepaper() {
    const posthog = usePostHog()
    const { closeWindow } = useApp()
    const { appWindow } = useWindow()

    return (
        <>
            <SEO
                title="Copy of whitepaper (2) - final LATEST.docx.pdf"
                description="PostHog is the only all-in-one platform for product analytics, feature flags, session replays, experiments, and surveys that's built for developers."
                image={`/images/og/default.png`}
            />
            <Editor title="Copy of whitepaper (2) - final LATEST.docx" type="pdf">
                <iframe
                    src="/brand/Copy%20of%20whitepaper%20(2)%20-%20final%20FINAL.docx.pdf"
                    width="100%"
                    height="800px"
                    style={{ border: 'none' }}
                    title="Whitepaper"
                />
            </Editor>
        </>
    )
}
