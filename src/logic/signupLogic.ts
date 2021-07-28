import { kea } from 'kea'

export type SignupModalView = 'emailPrompt' | 'deploymentOptions'

export const signupLogic = kea({
    actions: {
        setModalView: (view: SignupModalView) => ({ view }),
        setEmail: (email: string) => ({ email }),
        submitForm: true,
    },
    reducers: {
        modalView: [
            'emailPrompt' as SignupModalView,
            {
                setModalView: (_, { view }: { view: SignupModalView }) => view,
            },
        ],
        email: [
            '',
            {
                setEmail: (_, { email }: { email: string }) => email,
            },
        ],
    },
    listeners: ({ actions, values }) => ({
        submitForm: async () => {
            // TODO
        },
    }),
})
