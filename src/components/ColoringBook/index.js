import React, { Fragment, useState, useEffect } from 'react'
import SEO from 'components/shared/layout/seo'
import Wizard from 'components/Wizard'
import { CallToAction } from 'components/CallToAction'
import * as Icons from '@posthog/icons'
import Link from 'components/shared/ui/Link'
import { IconBold, IconLink } from 'components/OSIcons'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { RadioGroup } from 'components/RadixUI/RadioGroup'
import { navigate } from 'gatsby'
import usePostHog from '../../hooks/usePostHog'
import { useApp } from '../../context/App'
import { useWindow } from '../../context/Window'
import { useLocation } from '@reach/router'
import Editor from 'components/Editor'

const PDF_URL = 'https://res.cloudinary.com/dmukukwp6/image/upload/coloring_book_a34bc42c76.pdf'
const PDF_PAGES = 25
const pageImage = (page) =>
    `https://res.cloudinary.com/dmukukwp6/image/upload/pg_${page},w_1200,q_auto,f_auto/coloring_book_a34bc42c76.jpg`

export default function ColoringBook() {
    const posthog = usePostHog()
    const { closeWindow, isMobile } = useApp()
    const { appWindow } = useWindow()

    return (
        <>
            <SEO
                title="Coloring book.pdf - PostHog"
                description="PostHog is the only all-in-one platform for product analytics, feature flags, session replays, experiments, and surveys that's built for developers."
                image={`/images/og/default.png`}
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
                {isMobile ? (
                    // Mobile browsers only render the first page of a PDF in an iframe and don't let you
                    // scroll it, so serve the pages as images instead (with the PDF still downloadable).
                    <div className="flex flex-col gap-4">
                        {Array.from({ length: PDF_PAGES }, (_, index) => (
                            <img
                                key={index}
                                src={pageImage(index + 1)}
                                alt={`Coloring book page ${index + 1} of ${PDF_PAGES}`}
                                loading={index === 0 ? 'eager' : 'lazy'}
                                className="w-full h-auto"
                            />
                        ))}
                        <CallToAction to={PDF_URL} externalNoIcon width="full">
                            Download PDF
                        </CallToAction>
                    </div>
                ) : (
                    <iframe
                        src={PDF_URL}
                        width="100%"
                        height="800px"
                        style={{ border: 'none' }}
                        title="Coloring Book PDF"
                    />
                )}
            </Editor>
        </>
    )
}
