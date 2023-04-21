import { User } from 'hooks/useUser'

export const useNav = (user: User | null) => {
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
        },
        {
            name: 'Contributors',
            url: '/contributors',
        },
    ]
}
