import imgOpenSource from '../images/plan-open-source.svg'
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
                'Clickhouse database for Petabyte scale',
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
    'open-source': [
        {
            title: 'Open source',
            image: imgOpenSource,
            popular: true,
            price: 'Free',
            priceDetail: '',
            description: 'Ideal for those with smaller traffic volumes, happy to manage their own infrastructure',
            callToAction: 'Deploy',
            callToActionDest: {
                type: 'url',
                value: 'https://posthog.com/docs/deployment',
            },
            benefits: [
                'Advanced analytics',
                '<a href="/docs/features/feature-flags" target="blank">Feature flags</a>',
                '<a href="/docs/features/cohorts" target="blank">User cohorts</a>',
                '<a href="/docs/features/users#user-history" target="blank">Individual user history</a>',
                'Libraries for all major languages and frameworks',
                'Integrations with Slack, Teams and Discord',
                'Community support',
            ],
        },
    ],
}
const faqs = [
    {
        q: 'How do I know what my volume is?',
        a:
            'We provide a free trial on our Cloud plan. This allows you to get a sense of what your volume is. If you have very high volumes (10s-100s of thousands of users, our enterprise product is probably the most cost effective.',
    },
    {
        q: 'Is there a free trial on paid plans?',
        a:
            'Yes! When you activate your Cloud plan, you will get the first 30 days for free (regardless of usage). In addition, every month your first 10,000 events are free.',
    },
    {
        q: 'What happens after the data retention period elapses?',
        a:
            'On the Cloud plans, any event or user data stored for more than the retention period may be permanently deleted from our systems. On the Enterprise and Open Source plans, you control your data retention and what happens to your data afterwards.',
    },
    {
        q: 'Do I pay anything for stored events?',
        a:
            'No, you only pay the flat fee per captured event (i.e. you only pay when each event is first received). There are no additional costs or fees.',
    },
    {
        q: 'Can I switch between the Cloud and Enterprise plans?',
        a:
            'We are working hard to enable a bridge that allows data transfer between cloud instances and enterprise instances. This will be possible in the coming months.',
    },
    {
        q: 'Are there any minimums or annual commitments?',
        a:
            'Our Cloud plan is simple, pay for what you use. No commitments, no minimums, no hidden fees, no add-on fees, simple pricing. As our enterprise plans are custom for each company, we handle this case-by-case. Ask us.',
    },
]

export { plans, faqs }
