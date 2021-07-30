import { kea } from 'kea'
import { isValidEmailAddress } from 'lib/utils'
import { posthogAnalyticsLogic } from './posthogAnalyticsLogic'

export enum SignupModalView {
    EMAIL_PROMPT = 'EMAIL_PROMPT',
    DEPLOYMENT_OPTIONS = 'DEPLOYMENT_OPTIONS',
}

export enum Realm {
    hosted = 'hosted',
    cloud = 'cloud',
}

async function createContact(email: string) {
    const url = process.env.GATSBY_POSTHOG_API_HOST + '/create_web_contact'
    const body = { email }
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
        console.log(response)
    } catch (err) {
        console.error(err)
    }
    return {}
}

export const signupLogic = kea({
    actions: {
        setModalView: (view: SignupModalView) => ({ view }),
        setEmail: (email: string) => ({ email }),
        submitForm: true,
        reportRealmSelected: (realm: Realm) => ({ realm }),
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
                posthog?.identify(email, { email }) // use email as distinct ID; also set it as property
                const response = await createContact(email)
                // TODO implement backend
                actions.setModalView(SignupModalView.DEPLOYMENT_OPTIONS)
            }
        },
        reportRealmSelected: async ({ realm }) => {
            values.posthog?.send('selected deployment realm', { realm })
        },
    }),
})
