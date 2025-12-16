import React from 'react'
import ReaderView from 'components/ReaderView'
import { customerDataInfrastructureNav } from '../../hooks/useCustomerDataInfrastructureNavigation'
import { TreeMenu } from 'components/TreeMenu'
import SEO from 'components/seo'
import Link from 'components/Link'
import DWInstallationPlatforms from './dw-installation-platforms'

const LeftSidebarContent = () => {
    return <TreeMenu items={customerDataInfrastructureNav.children} />
}

export default function Sources(): JSX.Element {
    return (
        <>
            <SEO
                title="Data sources & import - PostHog data stack"
                description="Learn about all the ways to get data into PostHog"
                image="images/og/cdp.jpg"
            />
            <ReaderView leftSidebar={<LeftSidebarContent />} title="Data sources & import (ELT)">
                <p>
                    Connect your external databases, SaaS tools, ad platforms, and more to sync data in bulk into your
                    PostHog warehouse for analysis and modeling. All events and user data captured via PostHog SDKs are
                    automatically available in your warehouse as well.
                </p>
                <div className="max-w-2xl">
                    <DWInstallationPlatforms showFiltering={true} />
                </div>
                <p>
                    <Link to="/docs/data-warehouse/start-here" state={{ newWindow: true }}>
                        View our get started docs →
                    </Link>
                </p>
            </ReaderView>
        </>
    )
}
