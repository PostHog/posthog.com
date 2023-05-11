import { useUser } from 'hooks/useUser'

export const useNav = () => {
    const { user } = useUser()

    return [
        {
            name: 'Community',
        },
        {
            name: 'Topics',
            url: '/questions',
        },
        {
            name: 'Latest questions',
            url: '/community/latest',
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
            children: [
                {
                    name: 'Changelog',
                    url: '/roadmap/changelog',
                    children: [{ name: '2023', url: '/roadmap/changelog/2023' }],
                },
            ],
        },
        {
            name: 'Contributors',
            url: '/contributors',
        },
    ]
}
