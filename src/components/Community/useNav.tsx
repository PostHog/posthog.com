import { graphql, useStaticQuery } from 'gatsby'
import { useUser } from 'hooks/useUser'

export const useNav = () => {
    const { roadmapYears } = useStaticQuery(graphql`
        {
            roadmapYears: allRoadmap {
                group(field: year) {
                    fieldValue
                }
            }
        }
    `)
    const { user } = useUser()

    return [
        {
            name: 'Community',
        },
        {
            name: 'Questions',
            url: '/questions',
        },
        ...(user
            ? [
                  {
                      name: 'Notifications',
                      url: '/community/dashboard',
                  },
              ]
            : []),
        {
            name: 'Roadmap',
            url: '/roadmap',
        },
        {
            name: 'WIP',
            url: '/wip',
        },
        {
            name: 'Changelog',
            url: '',
            children: roadmapYears.group
                .sort((a, b) => Number(b.fieldValue) - Number(a.fieldValue))
                .map(({ fieldValue: year }) => ({
                    name: year,
                    url: `/changelog/${year}`,
                })),
        },
    ]
}
