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

export default function ColoringBook() {
    const posthog = usePostHog()
    const { closeWindow } = useApp()
    const { appWindow } = useWindow()

    return (
        <>
            <SEO
                title="Coloring book.pdf - PostHog"
                description="PostHog is the only all-in-one platform for product analytics, feature flags, session replays, experiments, and surveys that's built for developers."
                image={`/images/home.png`}
            />
            <style>
                {`
                    @media print {
                        /* Hide everything except the PDF */
                        #taskbar,
                        [data-app="Desktop"],
                        div[data-app="AppWindow"] [data-scheme="tertiary"],
                        div[data-app="AppWindow"] [data-scheme="secondary"] {
                            display: none !important;
                        }
                        
                        /* Make the PDF take up the full page */
                        div[data-app="AppWindow"],
                        main[data-app="Editor"] iframe {
                            position: fixed !important;
                            top: 0 !important;
                            left: 0 !important;
                            width: 100vw !important;
                            height: 100vh !important;
                            margin: 0 !important;
                            padding: 0 !important;
                        }
                        
                        /* Ensure the iframe prints properly */
                        iframe {
                            width: 100vw !important;
                            height: 100vh !important;
                            border: none !important;
                            margin: 0 !important;
                            padding: 0 !important;
                        }
                        
                        /* Hide the h1 title when printing */
                        h1 {
                            display: none !important;
                        }
                    }
                `}
            </style>
            <Editor title="Coloring book" type="pdf" hideTitle>
                <iframe
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/coloring_book_a34bc42c76.pdf"
                    width="100%"
                    height="800px"
                    style={{ border: 'none' }}
                    title="Coloring Book PDF"
                />
            </Editor>
        </>
    )
}
