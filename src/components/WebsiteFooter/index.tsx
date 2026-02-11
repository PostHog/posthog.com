import React from 'react'
import Link from 'components/Link'
import AppStatus from 'components/AppStatus'

const legalLinks = [
    { label: 'Terms', url: '/terms' },
    { label: 'Privacy', url: '/privacy' },
    { label: 'DPA', url: '/dpa' },
    { label: 'SOC 2', url: '/handbook/company/security#soc-2' },
    { label: 'HIPAA', url: '/docs/privacy/hipaa-compliance' },
]

export default function WebsiteFooter(): React.ReactElement {
    return (
        <footer className="@container z-40">
            <div data-scheme="secondary" className="bg-primary border-t border-primary">
                {/* Bottom bar */}
                <div className="p-3 @lg:px-8 bg-accent/30 border-t border-primary/10 text-xs">
                    <div className="flex flex-col @xl:flex-row @xl:items-center @xl:justify-between gap-3">
                        {/* Copyright and status */}
                        <div className="flex items-center gap-4 justify-between @xl:justify-start">
                            <p className="text-secondary m-0">&copy; {new Date().getFullYear()} PostHog, Inc.</p>
                            <AppStatus textClassName="text-xs underline" />
                        </div>

                        {/* Legal links */}
                        <nav className="flex flex-wrap items-center gap-x-4 gap-y-2">
                            {legalLinks.map((link) => (
                                <Link key={link.label} to={link.url} className="transition-colors underline">
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
    )
}
