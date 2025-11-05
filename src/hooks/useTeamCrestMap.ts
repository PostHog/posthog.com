import { graphql, useStaticQuery } from 'gatsby'

export default function useTeamCrestMap() {
    const { allTeams } = useStaticQuery(graphql`
        {
            allTeams: allSqueakTeam(filter: { name: { ne: "Hedgehogs" }, crest: { publicId: { ne: null } } }) {
                nodes {
                    id
                    name
                    crest {
                        data {
                            attributes {
                                url
                            }
                        }
                    }
                    miniCrest {
                        gatsbyImageData(width: 20, height: 20)
                    }
                }
            }
        }
    `)

    // Create a map of team names to crest data for quick lookup
    const teamCrestMap = allTeams.nodes.reduce((acc: any, team: any) => {
        acc[team.name] = team.crest?.data?.attributes?.url
        return acc
    }, {})

    return teamCrestMap
}
