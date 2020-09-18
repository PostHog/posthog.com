const plans = {
    cloud: [
        {
            title: 'Hobby',
            popular: false,
            price: '$0',
            priceDetail: 'forever',
            description: 'Ideal if you’re just getting started with your product',
            callToAction: 'Create free account',
            callToActionDest: {
                type: 'url',
                value: 'https://app.posthog.com/signup?plan=free',
            },
            benefits: [
                'Capture up to <b>5,000 events/month</b>',
                '<b>All analytics features</b>',
                '<b>Unlimited</b> tracked users',
                '<b>Unlimited</b> team members',
                '90 day data retention',
                'Community support',
            ],
        },
        {
            title: 'Growth',
            popular: true,
            price: '$29',
            priceDetail: '/month',
            description: 'Ideal for companies with more usage',
            callToAction: 'Start my 30-day free trial',
            callToActionDest: {
                type: 'url',
                value: 'https://app.posthog.com/signup?plan=growth',
            },
            benefits: [
                '<span class="p-plan-benefit-lg">Everything in Free, plus:</span>',
                'Up to <b>500,000 events/month</b>',
                '12 month data retention',
                'Email support',
            ],
        },
        {
            title: 'Enterprise',
            popular: false,
            price: 'Custom',
            priceDetail: 'contact us',
            description: 'Ideal for large companies with millions of users',
            callToAction: 'Contact sales',
            callToActionDest: {
                type: 'url',
                value: 'mailto:sales@posthog.com?subject=Enquiry%20about%20enterprise%20plan',
            },
            benefits: [
                '<span class="p-plan-benefit-lg">Everything in Growth, plus:</span>',
                'Capture <b>unlimited</b> events',
                '<b>Unlimited</b> data retention',
                'Dedicated support',
                'SSO/SAML',
                'Export to data lakes',
            ],
        },
    ],
    'self-managed': [
        {
            title: 'Open Source',
            popular: false,
            price: '$0',
            priceDetail: 'forever',
            description: 'Ideal if your team has technical expertise and handles large volumes of users or events',
            callToAction: 'Start deployment',
            callToActionType: 'primary',
            callToActionDest: {
                type: 'gatsbyLink',
                value: '/docs/deployment',
            },
            benefits: [
                'Capture <b>unlimited</b> events',
                '<b>All analytics features</b>',
                '<b>Unlimited</b> tracked users',
                '<b>Unlimited</b> team members',
                '<b>Unlimited</b> data retention',
                'Free updates for life (our code is <a href="https://github.com/posthog/posthog" target="_blank">open source</a>)',
                'Community support',
            ],
        },
        {
            title: 'Supported',
            popular: false,
            price: 'Starts at $2k',
            priceDetail: '/month',
            description:
                'Ideal for companies with large volumes that do not want the hassle of managing a tech infrastructure',
            callToAction: 'Contact sales',
            callToActionDest: {
                type: 'url',
                value: 'mailto:sales@posthog.com?subject=Enquiry%20about%20self-managed%20supported%20plan',
            },
            benefits: [
                '<span class="p-plan-benefit-lg">Everything in Open Source, plus:</span>',
                'PostHog deploys and maintains everything (in your own infrastructure)',
                'Uptime and scalability SLAs',
                'Custom databases and integrations',
                'Dedicated support',
                'SSO/SAML',
                'Export to data lakes',
            ],
        },
    ],
}

const faqs = [
    {
        q: 'What happens when I reach the maximum number of events in my plan?',
        a:
            'We will let you know when you are close to the maximum number of events and prompt you to upgrade to a different plan. We will not stop collecting events but we might limit your ability to consult your data or run analytics until the next billing period.',
    },
    {
        q: 'Is there a free trial on paid plans?',
        a:
            'You can get a 30-day free trial on our Growth plan. Our Enterprise plan does not offer a free trial because it has the same features as the Growth plan.',
    },
    {
        q: 'What happens after the data retention period elapses?',
        a:
            'On the cloud plans, any event or user data stored for more than the retention period may be permanently deleted from our systems. On the self-managed plans, you control your data retention and what happens to your data afterwards.',
    },
    {
        q: 'Can I switch between the cloud and self-managed plans?',
        a:
            'We are working hard to enable a bridge that allows data transfer between self-managed instances and cloud instances. This will be possible in the coming months.',
    },
]

export { plans, faqs }
