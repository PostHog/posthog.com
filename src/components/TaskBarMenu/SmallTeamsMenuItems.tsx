import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import slugify from "slugify"
import React from "react"

export function useSmallTeamsMenuItems() {
    const { allTeams } = useStaticQuery(graphql`
        {
            allTeams: allSqueakTeam(filter: { name: { ne: "Hedgehogs" }, crest: { publicId: { ne: null } } }) {
                nodes {
                    id
                    name
                    miniCrest {
                        gatsbyImageData(width: 64, height: 64)
                    }
                }
            }
        }
    `)

    return [
        {
            type: "item" as const,
            label: "All Teams",
            link: "/teams",
        },
        { type: "separator" as const },
        ...allTeams.nodes.map(({ id, name, miniCrest }: { id: string; name: string; miniCrest: any }) => {
            const image = getImage(miniCrest)
            return {
                type: "item" as const,
                label: `${name} Team`,
                link: `/teams/${slugify(name, { lower: true })}`,
                icon: image ? <GatsbyImage image={image} alt={`${name} Team`} className="size-4" /> : undefined,
            }
        }),
    ]
} 