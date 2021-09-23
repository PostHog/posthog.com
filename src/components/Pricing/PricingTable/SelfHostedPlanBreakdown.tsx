import React, { useState, useRef } from 'react'
import { ServerLocked, WebCode, Prohibited } from 'components/Icons/Icons'
import { CallToAction } from 'components/CallToAction'
import { Plan, Section, Price, Features } from './Plan'
import { features, OpenSource, Scale, Enterprise } from './Plans'
import { pricingSliderLogic } from '../../PricingSlider/pricingSliderLogic'
import { PricingSlider } from '../../PricingSlider'
import { Dialog, Transition } from '@headlessui/react'
import Link from 'components/Link'
import { Close } from 'components/Icons/Icons'
import { Modal } from 'components/Modal'
import { ScaleModal } from './ScaleModal'

export const SelfHostedPlanBreakdown = () => {
    const [open, setOpen] = useState(false)
    return (
        <>
            <Modal open={open} setOpen={setOpen}>
                <ScaleModal setOpen={setOpen} />
            </Modal>
            <section className="grid grid-cols-3">
                <OpenSource />
                <Scale setOpen={setOpen} />
                <Enterprise />
            </section>
            <section className="mt-36">
                <h2 className="text-center text-lg opacity-50 mb-14">With all self-hosted plans:</h2>
                <ul className="grid grid-cols-3 gap-12">
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
