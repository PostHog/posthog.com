import { teamQuery } from 'components/People'

import { useStaticQuery } from 'gatsby'

export default function useTeamCrestMap() {
    const { allTeams } = useStaticQuery(teamQuery)

    // Create a map of team names to crest data for quick lookup
    const teamCrestMap = allTeams.nodes.reduce((acc: any, team: any) => {
        acc[team.name] = team.crest?.data?.attributes?.url
        return acc
    }, {})

    return teamCrestMap
}
