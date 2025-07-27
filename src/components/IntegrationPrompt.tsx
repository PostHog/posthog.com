import React from 'react'
import Link from './Link'
import WizardCommand from './WizardCommand'
import { IconCheck, IconTerminal } from '@posthog/icons'
import NextIcon from '../../contents/images/docs/integrate/frameworks/nextjs.svg'
import ReactIcon from '../../contents/images/docs/integrate/react.svg'
import SvelteIcon from '../../contents/images/docs/integrate/frameworks/svelte.svg'
import AstroIcon from '../../contents/images/docs/integrate/frameworks/astro.svg'
import CloudinaryImage from './CloudinaryImage'
import { DebugContainerQuery } from './DebugContainerQuery'

const Row = ({ children }: { children: React.ReactNode }) => {
    return <li className="flex items-center gap-1">{children}</li>
}

export default function IntegrationPrompt() {
    return (
        <>
            <h3>
                <span className="mr-1">Install with AI in 90 seconds</span>
                <div className="inline-block bg-blue/10 text-blue px-0.5 rounded-sm text-xs font-medium border border-blue">
                    BETA
                </div>
            </h3>
            <p className="text-[15px]">Paste into your terminal or an AI code editor.</p>
            <WizardCommand />

            <div className="@container">
                <div className="grid grid-cols-2 @sm:grid-cols-3 gap-4">
                    <div className="col-span-2 @sm:col-span-1">
                        <div className="mb-2 text-sm">
                            <strong>Works with:</strong>
                        </div>
                        <ul className="text-sm space-y-2 grid grid-cols-2 gap-x-4 @sm:grid-cols-1">
                            <Row>
                                <IconTerminal className="text-secondary size-5 inline-block" />
                                Your terminal
                            </Row>
                            <Row>
                                <CloudinaryImage
                                    src="https://res.cloudinary.com/dmukukwp6/image/upload/cursor_logo_36ac697c2f.png"
                                    width={72}
                                    height={72}
                                    className="size-5 inline-block"
                                />
                                <Link to="https://cursor.com/api/auth/login" externalNoIcon>
                                    Cursor
                                </Link>
                            </Row>
                            <Row>
                                <img
                                    src="https://res.cloudinary.com/dmukukwp6/image/upload/replit_logo_9526a2cdb8.svg"
                                    className="size-5 inline-block"
                                />
                                <Link to="https://replit.com/" externalNoIcon>
                                    Replit
                                </Link>
                            </Row>
                            <Row>
                                <img
                                    src="https://res.cloudinary.com/dmukukwp6/image/upload/bolt_logo_7670a06db0.svg"
                                    className="size-5 inline-block"
                                />
                                <Link to="https://bolt.new" externalNoIcon>
                                    Bolt
                                </Link>
                            </Row>
                        </ul>
                    </div>
                    <div>
                        <div className="mb-2 text-sm">
                            <strong>Supports:</strong>
                        </div>
                        <ul className="text-sm space-y-2">
                            <Row>
                                <img src={NextIcon} className="size-5 inline-block" />
                                Next.js
                            </Row>
                            <Row>
                                <img src={ReactIcon} className="size-5 inline-block" />
                                React
                            </Row>
                            <Row>
                                <img src={ReactIcon} className="size-5 inline-block" />
                                React Native
                            </Row>
                        </ul>
                    </div>
                    <div>
                        <div className="mb-2 text-sm invisible">
                            <strong>&nbsp;</strong>
                        </div>
                        <ul className="text-sm space-y-2">
                            <Row>
                                <img src={SvelteIcon} className="size-5 inline-block" />
                                Svelte
                            </Row>
                            <Row>
                                <img src={AstroIcon} className="size-5 inline-block" />
                                Astro
                            </Row>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
