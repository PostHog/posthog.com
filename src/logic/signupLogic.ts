import { kea } from 'kea'
import { EMAIL_GATED_SIGNUP_PREFIX, FEATURE_FLAGS } from 'lib/constants'
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

export type HubSpotContactResponse = {
    success: boolean
}

async function createContact(email: string) {
    const url = process.env.GATSBY_POSTHOG_API_HOST + '/create_web_contact'
    const body = new FormData()
    body.append('email', email)
    return (
        await fetch(url, {
            method: 'POST',
            body,
        })
    ).json() as Promise<HubSpotContactResponse>
}

async function updateContact(email: string, properties: Record<string, string>) {
    const url = process.env.GATSBY_POSTHOG_API_HOST + '/update_web_contact'
    const body = new FormData()
    body.append('email', email)
    for (const [property, value] of Object.entries(properties)) {
        body.append(property, value)
    }
    return (
        await fetch(url, {
            method: 'POST',
            body,
        })
    ).json() as Promise<HubSpotContactResponse>
}

export const signupLogic = kea({
    actions: {
        setModalView: (view: SignupModalView) => ({ view }),
        setEmail: (email: string) => ({ email }),
        submitForm: true,
        skipEmailEntry: true,
        reportModalShown: true,
        reportDeploymentOptionsShown: true,
        onRenderSignupPage: true,
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
        values: [posthogAnalyticsLogic, ['posthog', 'activeFeatureFlags', 'isLoggedIn']],
        actions: [posthogAnalyticsLogic, ['posthogFound']],
    },
    listeners: ({ actions, values }) => ({
        submitForm: async () => {
            const { posthog, email, activeFeatureFlags } = values
            const skipDeploymentOptions = activeFeatureFlags.includes(FEATURE_FLAGS.EMAIL_GATED_SIGNUP_OLD_FLOW)
            if (email && isValidEmailAddress(email)) {
                try {
                    posthog.identify(email, { email: email.toLowerCase() }) // use email as distinct ID; also set it as property
                    posthog.capture('signup: submit email')
                    if (!skipDeploymentOptions) {
                        actions.setModalView(SignupModalView.DEPLOYMENT_OPTIONS)
                    }
                    await createContact(email)
                } catch (err) {
                    posthog.capture('signup: failed to create contact', { message: err })
                } finally {
                    if (skipDeploymentOptions) {
                        window.location.replace(`https://app.posthog.com/signup?email=${encodeURIComponent(email)}`)
                    }
                }
            }
        },
        skipEmailEntry: async () => {
            const { posthog } = values
            posthog.capture('signup: email modal skipped')
            actions.setModalView(SignupModalView.DEPLOYMENT_OPTIONS)
        },
        reportModalShown: async () => {
            const { posthog } = values
            posthog.capture('signup: email modal shown')
        },
        reportDeploymentOptionsShown: async () => {
            const { posthog } = values
            posthog.capture('signup: deployment options shown')
        },
        setModalView: async ({ view }) => {
            switch (view) {
                case SignupModalView.EMAIL_PROMPT:
                    return actions.reportModalShown()
                case SignupModalView.DEPLOYMENT_OPTIONS:
                default:
                    return actions.reportDeploymentOptionsShown()
            }
        },
        reportDeploymentTypeSelected: async ({ deploymentType, nextHref }) => {
            const { posthog, email } = values
            try {
                posthog.capture('signup: deployment type selected', { selected_deployment_type: deploymentType })
                await updateContact(email, { selected_deployment_type: deploymentType })
            } catch (err) {
                posthog.capture('signup: failed to update contact', { message: err })
            }
            if (nextHref) {
                window.location.replace(nextHref)
            }
        },
        onRenderSignupPage: () => {
            if (typeof window !== 'undefined') {
                if (values.shouldAutoRedirect) {
                    window.location.replace(`https://app.posthog.com/signup${window.location.search || ''}`)
                } else {
                    actions.reportModalShown()
                }
            }
        },
    }),
    selectors: {
        hasEmailGatedSignup: [
            (s) => [s.activeFeatureFlags],
            (activeFeatureFlags: string[]) =>
                activeFeatureFlags.some((flag) => flag.includes(EMAIL_GATED_SIGNUP_PREFIX)),
        ],
        shouldAutoRedirect: [
            (s) => [s.hasEmailGatedSignup, s.isLoggedIn],
            (hasEmailGatedSignup: boolean, isLoggedIn: boolean) => {
                return !hasEmailGatedSignup || isLoggedIn
            },
        ],
    },
    events: ({ actions }) => ({
        afterMount: () => {
            if ((window as any).posthog) {
                actions.posthogFound((window as any).posthog)
            }
        },
    }),
})
