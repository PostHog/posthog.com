import imgEnterprise1 from '../images/plan-enterprise1.svg'
import imgEnterprise2 from '../images/plan-enterprise2.svg'

const plans = {
    enterprise: [
        {
            title: 'Enterprise',
            image: imgEnterprise1,
            popular: false,
            price: 'Starts at $2k',
            priceDetail: '/month',
            description: 'Ideal for companies need scalability and enterprise features',
            callToAction: 'Contact sales',
            callToActionDest: {
                type: 'url',
                value: 'mailto:sales@posthog.com?subject=Enquiry%20about%20enterprise%20supported%20plan',
            },
            benefits: [
                '<span class="p-plan-benefit-lg">Everything in Open Source, plus:</span>',
                'ClickHouse database for Petabyte scale',
                'Integrations with services like Zapier',
                'Permissioning and multiple projects',
                'Dedicated support',
                'SSO/SAML',
                'Export to data lakes',
            ],
        },
        {
            title: 'Supported Enterprise',
            image: imgEnterprise2,
            popular: true,
            price: 'Custom',
            priceDetail: 'contact us',
            description:
                'Ideal for companies that do not want the hassle of managing PostHog, but want to own their data.',
            callToAction: 'Contact sales',
            wraps: false,
            callToActionDest: {
                type: 'url',
                value: 'mailto:sales@posthog.com?subject=Enquiry%20about%20enterprise%20supported%20plan',
            },
            benefits: [
                '<span class="p-plan-benefit-lg">Everything in Enterprise, plus:</span>',
                'PostHog deploys and maintains everything (in your own infrastructure)',
                'Uptime and scalability SLAs',
            ],
        },
    ],
}
const faqs = [
    {
        q: 'How do I know what my volume is?',
        a:
            'The easiest way is to enable a PostHog Cloud plan. If you go over your usage limit but have not set up billing, it will lock you out but it will count the event volumes. This allows you to get a sense of what your volume is.',
    },
    {
        q: 'Can I switch between PostHog Cloud and Self-hosted plans?',
        a:
            'You can switch from PostHog Cloud to Self-hosted Scale and vice versa - just email our support team (hey@posthog.com). We will manually transfer your data, free. If you are switching between PostHog Cloud and Self-hosted Open Source then you can transfer events yourself using [our plugin](https://github.com/PostHog/posthog-plugin-migrator3000).',
    },
    {
        q: 'On the Self-hosted Open Source plan, what happens if I exceed 1 million tracked users?',
        a:
            "We have a soft limit, meaning if you exceed the plan's allocation, we will reach out by email to discuss options. We'll continue to track users - you won't lose any customer data.",
    },
    {
        q: 'Do I pay anything for stored events?',
        a:
            'No, you only pay the fee per captured event in a given month (i.e. you only pay when each event is first received). There are no additional costs or fees.',
    },
    {
        q: 'Does session recording impact costs?',
        a: 'Session recording is currently free to use. This might change in the future.',
    },
    {
        q: 'How long do you retain data?',
        a:
            'Data in PostHog Cloud is retained for 7 years - after 1 year, data is moved into cold storage so queries may run more slowly. For Self-hosted deployments, you can manage this yourself or get support with Self-hosted Scale.',
    },
    {
        q: 'What happens after the data retention period elapses?',
        a:
            'On PostHog Cloud, any event or user data stored for more than the retention period may be permanently deleted from our systems. On the Self-hosted Scale plan, you control your data retention and what happens to your data afterwards.',
    },
    {
        q: 'Is there a free trial on paid plans?',
        a:
            'No - instead we offer a contract with no minimum length. In PostHog Cloud, the first 1 million events are free, every month. Interested in the Self-hosted Scale plan? You can try all features in PostHog Cloud first, if needed, and there is no minimum contract length since we charge on usage.',
    },
    {
        q: 'What currency are your prices in?',
        a: 'All prices are in US Dollars (USD), excluding taxes.',
    },
    {
        q: 'Do you offer a discount for non-profits?',
        a:
            'Yes in most cases - 50% off all pricing for PostHog Cloud. Create your account, then email sales@posthog.com from the same email address with some basic details on your organization. We will then apply a discount.',
    },
    {
        q: 'Are there any minimums or annual commitments?',
        a:
            'For PostHog Cloud, there is no minimum - pay for what you use. No commitments, no minimums, no hidden fees, no add-on fees, simple pricing. For Self-hosted Scale, we have a minimum commitment of $2,000/month.',
    },
]

export { plans, faqs }
