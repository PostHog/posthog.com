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

export type HubSpotContactResponse = {
    success: boolean
}

const validators = {
    email: (email: string) =>
        !email
            ? 'Please enter an email'
            : !isValidEmailAddress(email)
            ? 'Please enter a valid email'
            : (false as const),
    firstname: (firstname: string) => !firstname && 'Please enter your first name',
    company: (company: string) => !company && 'Please enter your company name',
}

export interface ContactFormType {
    email: string
    firstname: string
    lastname: string
    company: string
    maus: number
    monthly_events: number
    data_warehouse_: string
    hosting_provider: string
    helm_charts: string
    which_product_are_you_interested_in_: string
    reason_for_self_host: string
}

async function createContact(email: string) {
    const url = process.env.GATSBY_POSTHOG_API_HOST + '/create_web_contact'
    const body = new FormData()
    body.append('email', email)
    body.append('lead_source', 'website-get-started')
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
        setFormField: (field: string, value: any) => ({ field, value }),
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
        contactForm: [
            {
                email: '',
                firstname: '',
                lastname: '',
                company: '',
                maus: 0,
                monthly_events: 0,
                data_warehouse_: '',
                hosting_provider: '',
                helm_charts: '',
                which_product_are_you_interested_in_: '',
                reason_for_self_host: '',
            } as ContactFormType,
            {
                setFormField: (state, { field, value }: { field: string; value: any }) => ({
                    ...state,
                    [field]: value,
                }),
            },
        ],
    },
    connect: {
        values: [posthogAnalyticsLogic, ['posthog', 'activeFeatureFlags', 'isLoggedIn']],
        actions: [posthogAnalyticsLogic, ['setFeatureFlags']],
    },
    listeners: ({ actions, values }) => ({
        submitForm: async () => {
            const { posthog, email } = values
            if (email && isValidEmailAddress(email)) {
                try {
                    posthog.identify(email, { email: email.toLowerCase() }) // use email as distinct ID; also set it as property
                    posthog.capture('signup: submit email')
                    actions.setModalView(SignupModalView.DEPLOYMENT_OPTIONS)
                    await createContact(email)
                } catch (err) {
                    posthog.capture('signup: failed to create contact', { message: err })
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
    }),
    selectors: {
        contactFormValidation: [
            (s) => [s.contactForm],
            (contactForm: ContactFormType) => ({
                email: validators['email'](contactForm.email),
                firstname: validators['firstname'](contactForm.firstname),
                company: validators['company'](contactForm.company),
            }),
        ],
    },
    loaders: ({ values }) => ({
        contactFormResponse: [
            {},
            {
                submitContactForm: async () => {
                    const fields: { name: string; value: string | number }[] = []
                    Object.entries(values.contactForm).forEach(([name, value]) => {
                        fields.push({
                            name,
                            value: value as string | number,
                        })
                    })
                    const data = { fields }
                    const response = await fetch(
                        'https://api.hsforms.com/submissions/v3/integration/submit/6958578/f8854263-d80d-46f6-9905-a8ccb7f50f22',
                        {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(data),
                        }
                    )
                    return response.json()
                },
            },
        ],
    }),
})
