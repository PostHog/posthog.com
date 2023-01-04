import React from 'react'
import Link from 'components/Link'
import { Contributors, ShareLinks, SidebarSection } from 'components/PostLayout'
import Tooltip from 'components/Tooltip'
import CheckIcon from '../../images/check.svg'
import XIcon from '../../images/x.svg'
import WarningIcon from '../../images/warning.svg'

const renderAvailabilityIcon = (availability: 'full' | 'partial' | 'none') => {
    switch (availability) {
        case 'full':
            return (
                <Tooltip content="This plan has full access to this feature">
                    <img src={CheckIcon} alt="Available" className="h-4 w-4" aria-hidden="true" />
                </Tooltip>
            )
        case 'partial':
            return (
                <Tooltip content="Some parts of this feature are not available on this plan">
                    <img src={WarningIcon} alt="Partially available" className="h-4 w-4" aria-hidden="true" />
                </Tooltip>
            )
        case 'none':
            return (
                <Tooltip content="This feature is not available on this plan">
                    <img src={XIcon} alt="Not available" className="h-4 w-4" aria-hidden="true" />
                </Tooltip>
            )
    }
}

const HandbookSidebar = ({ contributors, title, location, availability, related }) => {
    return (
        <>
            {contributors && (
                <SidebarSection title={`Author${contributors?.length > 1 ? 's' : ''}`}>
                    <Contributors
                        className="flex flex-col space-y-2"
                        contributors={contributors.map(({ url, username, avatar, teamData }) => ({
                            url,
                            name: teamData?.name || username,
                            image: avatar,
                        }))}
                    />
                </SidebarSection>
            )}

            {availability && (
                <SidebarSection title="Feature availability" className="space-y-1.5">
                    <div className="flex items-center justify-between font-bold">
                        <span>Free / Open-source</span>
                        {renderAvailabilityIcon(availability.free)}
                    </div>
                    <div className="flex items-center justify-between font-bold">
                        <span>Self-serve</span>
                        {renderAvailabilityIcon(availability.selfServe)}
                    </div>
                    <div className="flex items-center justify-between font-bold">
                        <span>Enterprise</span>
                        {renderAvailabilityIcon(availability.enterprise)}
                    </div>
                </SidebarSection>
            )}

            <SidebarSection title="Share">
                <ShareLinks title={title} href={location.href} />
            </SidebarSection>

            {related && (
                <SidebarSection title="Related articles">
                    <ul className="p-0 space-y-1.5">
                        {related.map(({ childMdx }) => (
                            <li key={childMdx.fields.slug} className="list-none">
                                <Link to={childMdx.fields.slug} className="text-sm block">
                                    {childMdx.frontmatter.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </SidebarSection>
            )}
        </>
    )
}

export default HandbookSidebar
