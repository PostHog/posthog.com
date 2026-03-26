import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import List from 'components/List'

interface DWInstallationPlatformsProps {
    showFiltering?: boolean
    maxItems?: number
}

const DWInstallationPlatforms = ({ showFiltering = false, maxItems }: DWInstallationPlatformsProps) => {
    const { allPostHogSource } = useStaticQuery(graphql`
        query {
            allPostHogSource(filter: { unreleased: { ne: true } }, sort: { name: ASC }) {
                nodes {
                    name
                    slug
                    icon_url
                }
            }
        }
    `)

    const platforms = allPostHogSource.nodes.map((node: any) => ({
        label: node.name,
        url: `/docs/cdp/sources/${node.slug}`,
        image: node.icon_url,
    }))

    const displayedPlatforms = maxItems ? platforms.slice(0, maxItems) : platforms
    const remainingCount = maxItems && platforms.length > maxItems ? platforms.length - maxItems : 0

    return (
        <>
            <List className="grid @2xl:grid-cols-2 @3xl:grid-cols-3 mb-4" items={displayedPlatforms} />
            {remainingCount > 0 && <p className="text-sm font-bold ml-6">+ {remainingCount} more!</p>}
        </>
    )
}
export default DWInstallationPlatforms
