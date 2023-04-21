import { User } from 'hooks/useUser'

export const useNav = (user: User | null) => {
    return [
        {
            name: 'Community',
        },
        ...(user
            ? [
                  {
                      name: 'Inbox',
                      url: '/community/dashboard',
                  },
              ]
            : []),
        {
            name: 'Topics',
            url: '/questions',
        },
        {
            name: 'Latest questions',
            url: '/community/latest',
        },

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
