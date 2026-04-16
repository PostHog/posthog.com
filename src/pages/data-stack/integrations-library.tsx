import React from 'react'
import ReaderView from 'components/ReaderView'
import { customerDataInfrastructureNav } from '../../hooks/useCustomerDataInfrastructureNavigation'
import { TreeMenu } from 'components/TreeMenu'
import SEO from 'components/seo'
import IntegrationsLibrary from 'components/IntegrationsLibrary'

const LeftSidebarContent = () => {
    return <TreeMenu items={customerDataInfrastructureNav.children} />
}

export default function IntegrationsLibraryPage(): JSX.Element {
    return (
        <>
            <SEO
                title="Integrations library - PostHog data stack"
                description="All sources, destinations, and integrations available in PostHog"
                image="images/og/cdp.jpg"
            />
            <ReaderView leftSidebar={<LeftSidebarContent />} title="Integrations library">
                <p>
                    <span className="font-bold">Sources</span> bring data from other services into your PostHog data
                    warehouse. <span className="font-bold">Destinations</span> send data out to other services.{' '}
                    <span className="font-bold">Transformations</span> enrich and standardize your incoming event data.
                </p>
                <IntegrationsLibrary />
            </ReaderView>
        </>
    )
}
