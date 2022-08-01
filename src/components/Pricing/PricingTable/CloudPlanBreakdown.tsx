import { section } from 'components/Home/classes'
import { Cloud as CloudIcon, Lightning } from 'components/Icons/Icons'
import React, { useState } from 'react'
import { Cloud, CloudEnterprise } from './Plans'
import CloudModal from './CloudModal'
import CloudEnterpriseModal from './CloudEnterpriseModal'

export const CloudPlanBreakdown = () => {
    const [cloudOpen, setCloudOpen] = useState(false)
    const [cloudEnterpriseOpen, setCloudEnterpriseOpen] = useState(false)
    return (
        <>
            <CloudModal setOpen={setCloudOpen} open={cloudOpen} hideActions hideBadge={false} />
            <CloudEnterpriseModal
                setOpen={setCloudEnterpriseOpen}
                open={cloudEnterpriseOpen}
                hideActions
                hideBadge={false}
            />
            <div className="flex justify-center mb-20">
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                    <Cloud setOpen={setCloudOpen} />
                    <CloudEnterprise setOpen={setCloudEnterpriseOpen} />
                </section>
            </div>
            <section className={section()}>
                <h2 className="text-center text-lg opacity-50 mb-14">With all cloud plans:</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <li className="flex space-x-4">
                        <CloudIcon className="flex-shrink-0" />
                        <div className="opacity-75">
                            <h3 className="text-lg ">Hosted by PostHog</h3>
                            <p className="text-[14px]">Get up and running quickly with no infrastructure to deploy.</p>
                        </div>
                    </li>
                    <li className="flex space-x-4">
                        <Lightning className="flex-shrink-0" />
                        <div className="opacity-75">
                            <h3 className="text-lg ">Automatic upgrades</h3>
                            <p className="text-[14px]">
                                Get the latest and greatest features as soon as we release them.
                            </p>
                        </div>
                    </li>
                </ul>
            </section>
        </>
    )
}
