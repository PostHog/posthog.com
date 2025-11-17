import { IconShieldPeople } from "@posthog/icons"
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'

export function useSmallTeamsMenuItems() {
    const { allTeams } = useStaticQuery(graphql`
        {
            allTeams: allSqueakTeam(filter: { name: { ne: "Hedgehogs" }, crest: { publicId: { ne: null } } }) {
                nodes {
                    id
                    name
                    slug
                    miniCrest {
                        gatsbyImageData(width: 64, height: 64)
                    }
                }
            }
        }
    `)

    // Sort teams alphabetically by name
    const sortedTeams = [...allTeams.nodes].sort((a, b) => a.name.localeCompare(b.name))

    return [
        {
            type: 'item' as const,
            label: 'All teams',
            link: '/teams',
            icon: <IconShieldPeople className="size-4" />,
        },
        { type: 'separator' as const },
        ...sortedTeams.map(
            ({ id, name, slug, miniCrest }: { id: string; name: string; slug: string; miniCrest: any }) => {
                const image = getImage(miniCrest)
                return {
                    type: 'item' as const,
                    label: `${name} Team`,
                    link: `/teams/${slug}`,
                    icon: image ? <GatsbyImage image={image} alt={`${name} Team`} className="size-4" /> : undefined,
                }
            }
        ),
    ]
}
