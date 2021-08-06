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
    path: typeof window === undefined ? undefined : () => ['signup'],
    actions: {
        setModalView: (view: SignupModalView) => ({ view }),
        setEmail: (email: string) => ({ email }),
        submitForm: true,
        skipEmailEntry: true,
        reportModalShown: true,
        reportDeploymentOptionsShown: true,
        onRenderSignupPage: true,
        reportDeploymentTypeSelected: (deploymentType: Realm, nextHref?: string) => ({
            deploymentType,
            nextHref,
        }),
        setVariants: (newVariants: string[]) => ({ newVariants }),
        setActiveVariant: (activeVariant: string) => ({ activeVariant }),
        updateAvailableVariants: true,
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
        experimentVariants: [
            {} as Record<string, boolean>,
            { persist: true },
            {
                setVariants: (state: Record<string, boolean>, { newVariants }: { newVariants: string[] }) => {
                    const nextState = {} as Record<string, boolean>
                    const existingVariants = Object.keys(state)
                    newVariants.forEach((variant) => {
                        if (existingVariants.includes(variant)) {
                            // Don't overwrite an existing value
                            nextState[variant] = state[variant]
                        } else {
                            nextState[variant] = false
                        }
                    })
                    return nextState
                },
                setActiveVariant: (state: Record<string, boolean>, { activeVariant }: { activeVariant: string }) => {
                    const nextState = {} as Record<string, boolean>
                    const existingVariants = Object.keys(state)
                    existingVariants.forEach((variant) => {
                        nextState[variant] = variant === activeVariant
                    })
                    return nextState
                },
            },
        ],
    },
    connect: {
        values: [posthogAnalyticsLogic, ['posthog', 'activeFeatureFlags', 'isLoggedIn']],
        actions: [posthogAnalyticsLogic, ['setFeatureFlags']],
    },
    listeners: ({ actions, values }) => ({
        submitForm: async () => {
            const { posthog, email, activeVariant } = values
            const skipDeploymentOptions = activeVariant === FEATURE_FLAGS.EMAIL_GATED_SIGNUP_OLD_FLOW
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
                posthog.capture('signup: deployment type selected', {
                    selected_deployment_type: deploymentType,
                })
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
        setVariants: () => {
            const { experimentVariants, posthog } = values
            const variantEntries: [string, boolean][] = Object.entries(experimentVariants)
            if (variantEntries.length && !variantEntries.some(([, status]) => status === true)) {
                // If all available variants are inactive, we need to randomly pick one to activate.
                const randomIndex = Math.floor(Math.random() * variantEntries.length)
                const [name] = variantEntries[randomIndex]
                actions.setActiveVariant(name)
                posthog?.capture('set experiment variant', {
                    $set_once: {
                        experiment_variant: name,
                    },
                })
            }
        },
        updateAvailableVariants: () => {
            const { activeFeatureFlags } = values
            const variantFlags: string[] = activeFeatureFlags.filter((flag: string) =>
                flag.includes(EMAIL_GATED_SIGNUP_PREFIX)
            )
            actions.setVariants(variantFlags)
        },
        [actions.setFeatureFlags]: () => {
            actions.updateAvailableVariants()
        },
    }),
    events: ({ actions, values }) => ({
        afterMount: () => {
            if (typeof window !== undefined && !!values.posthog) {
                actions.updateAvailableVariants()
            }
        },
    }),
    selectors: {
        hasEmailGatedSignup: [
            (s) => [s.activeVariant],
            (activeVariant: string | null) =>
                activeVariant && activeVariant !== FEATURE_FLAGS.EMAIL_GATED_SIGNUP_CONTROL,
        ],
        shouldAutoRedirect: [
            (s) => [s.hasEmailGatedSignup, s.isLoggedIn],
            (hasEmailGatedSignup: boolean, isLoggedIn: boolean) => {
                return !hasEmailGatedSignup || isLoggedIn
            },
        ],
        activeVariant: [
            (s) => [s.experimentVariants],
            (experimentVariants: Record<string, boolean>) => {
                const variantEntries: [string, boolean][] = Object.entries(experimentVariants)
                const [name] = variantEntries.find(([, value]) => value) || []
                return name || null
            },
        ],
    },
})
