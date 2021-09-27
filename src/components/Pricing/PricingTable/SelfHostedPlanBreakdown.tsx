import { section } from 'components/Home/classes'
import { Prohibited, ServerLocked, WebCode } from 'components/Icons/Icons'
import React, { useState } from 'react'
import { Enterprise, OpenSource, Scale } from './Plans'
import ScaleModal from './ScaleModal'

export const SelfHostedPlanBreakdown = () => {
    const [open, setOpen] = useState(false)
    return (
        <>
            <ScaleModal setOpen={setOpen} open={open} />
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <OpenSource />
                <Scale setOpen={setOpen} />
                <Enterprise />
            </section>
            <section className={section()}>
                <h2 className="text-center text-lg opacity-50 mb-14">With all self-hosted plans:</h2>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <li className="flex space-x-4">
                        <ServerLocked className="flex-shrink-0" />
                        <div className="opacity-75">
                            <h3 className="text-base ">Data stays on your infrastructure</h3>
                            <p className="text-[14px]">
                                Breeze through SOC 2 and HIPAA audits by eliminating a handful of subprocessors.
                            </p>
                        </div>
                    </li>
                    <li className="flex space-x-4">
                        <WebCode className="flex-shrink-0" />
                        <div className="opacity-75">
                            <h3 className="text-base ">Full access to production instance</h3>
                            <p className="text-[14px]">
                                Audit code running on your servers for compliance and security.
                            </p>
                        </div>
                    </li>
                    <li className="flex space-x-4">
                        <Prohibited className="flex-shrink-0" />
                        <div className="opacity-75">
                            <h3 className="text-base ">No third-party cookies</h3>
                            <p className="text-[14px]">
                                By hosting yourself, PostHog’s tracking code is less susceptible to browser privacy
                                features and ad blockers.
                            </p>
                        </div>
                    </li>
                </ul>
            </section>
        </>
    )
}
