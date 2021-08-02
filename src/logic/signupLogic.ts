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
    const body = new FormData()
    body.append('email', email)
    try {
        const response = await fetch(url, {
            method: 'POST',
            body,
        })
        return response
    } catch (err) {
        console.error(err)
    }
    return {}
}

async function updateContact(email: string, properties: Record<string, string>) {
    const url = process.env.GATSBY_POSTHOG_API_HOST + '/update_web_contact'
    const body = new FormData()
    body.append('email', email)
    for (const [property, value] of Object.entries(properties)) {
        body.append(property, value)
    }
    try {
        const response = await fetch(url, {
            method: 'POST',
            body,
        })
        return response
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
        reportDeploymentTypeSelected: (deploymentType: Realm, nextHref?: string) => ({ deploymentType, nextHref }),
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
                posthog?.capture('signup: submit email')
                const response = await createContact(email)
                // TODO send additional events
                actions.setModalView(SignupModalView.DEPLOYMENT_OPTIONS)
            }
        },
        reportDeploymentTypeSelected: async ({ deploymentType, nextHref }) => {
            const { posthog, email } = values
            posthog?.capture('signup: deployment type selected', { selected_deployment_type: deploymentType })
            const response = await updateContact(email, { selected_deployment_type: deploymentType })
            if (nextHref) {
                window.location.replace(nextHref)
            }
            // TODO send additional events
        },
    }),
})
