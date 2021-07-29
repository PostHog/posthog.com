import { kea } from 'kea'
import { isValidEmailAddress } from 'lib/utils'
import { posthogAnalyticsLogic } from './posthogAnalyticsLogic'

export enum SignupModalView {
    EMAIL_PROMPT = 'EMAIL_PROMPT',
    DEPLOYMENT_OPTIONS = 'DEPLOYMENT_OPTIONS',
}

export enum DeploymentType {
    SELF_HOSTED = 'SELF_HOSTED',
    CLOUD = 'CLOUD',
}

export const signupLogic = kea({
    actions: {
        setModalView: (view: SignupModalView) => ({ view }),
        setEmail: (email: string) => ({ email }),
        submitForm: true,
        reportDeploymentTypeSelected: (type: DeploymentType) => ({ type }),
    },
    reducers: {
        modalView: [
            SignupModalView.EMAIL_PROMPT as SignupModalView,
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
    connect: {
        values: [posthogAnalyticsLogic, ['posthog']],
    },
    listeners: ({ actions, values }) => ({
        submitForm: async () => {
            const { posthog, email } = values
            if (email && isValidEmailAddress(email)) {
                posthog?.identify(email)
                actions.setModalView(SignupModalView.DEPLOYMENT_OPTIONS)
            }
        },
        reportDeploymentTypeSelected: async ({ type }) => {
            console.log({ type })
        },
    }),
})
