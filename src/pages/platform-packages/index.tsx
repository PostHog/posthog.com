import React from 'react'
import ReaderView from 'components/ReaderView'
import SEO from 'components/seo'
import { Link } from 'gatsby'
import { PlatformPackageList, PlatformFeatureTable } from 'components/Pricing/Platform/PlatformPackageComparison'

export default function PlatformPackages() {
    return (
        <>
            <SEO
                title="Platform packages - PostHog"
                description="Our platform packages are designed to help you manage your teams securely and efficiently on PostHog as you grow."
                image="/images/og/default.png"
            />
            <ReaderView hideLeftSidebar>
                <div className="space-y-8">
                    <div>
                        <h1>Platform packages</h1>
                        <div>
                            Our platform packages help you manage your teams securely and efficiently on PostHog as you
                            grow. You can{' '}
                            <Link to="https://app.posthog.com/organization/billing/" target="_blank">
                                {' '}
                                subscribe to packages after signing up for PostHog
                            </Link>
                            . Need more help getting started?{' '}
                            <Link to="/services" state={{ newWindow: true }}>
                                We also offer service packages.
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h2 className="mb-4">Available packages</h2>
                        <PlatformPackageList />
                    </div>

                    <div>
                        <h2>Feature comparison</h2>
                        <p className="-mt-4 mb-6">Compare features across all platform packages:</p>
                        <PlatformFeatureTable />
                    </div>

                    <div>
                        <h2>Get started</h2>
                        <p>
                            You can{' '}
                            <Link to="https://app.posthog.com/organization/billing/">
                                {' '}
                                subscribe to packages after signing up for PostHog
                            </Link>
                            , via your billing page. Need help getting started, or want advice on which package to
                            choose? <Link to="/services">Our engineers can help.</Link>
                        </p>
                    </div>
                </div>
            </ReaderView>
        </>
    )
}
