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
        q: "How does PostHog's pricing work?",
        a: "PostHog has per-product usage-based pricing. This means you only pay for what you use, such as events captured, sessions recorded, and flags requested. PostHog is free to use and each product has a generous free monthly allowance (1M events for analytics, 5K session replays, 1M feature flag requests, and more). There is no minimum spend or annual contracts needed and you can set billing limits so you're never surprised.",
    },
    {
        q: 'How do I know how much PostHog will cost?',
        a: 'The easiest way is to sign up, set your billing limit to $0 (if you expect to go over), and install PostHog. You\'ll get an accurate projection after just a few days. You can also read our doc on <a href="https://posthog.com/docs/billing/estimating-usage-costs">estimating usage and costs</a>.',
    },
    {
        q: 'Which plan is right for me?',
        a: 'For nearly everyone, the pay-as-you go plan is the right choice. It unlocks all of the features of PostHog and remains free if you stay within the limits each month (which you can set billing limits to do).',
    },
    {
        q: 'What happens if I hit or go over the free limit?',
        a: 'On the pay-as-you-go plan, we charge based on usage for everything above the free allowance. On the free plan, any additional events are permanently dropped and feature flags will return a default <code>quota limited</code> response.',
    },
    {
        q: 'Do free tier limits reset every month?',
        a: 'Yes. Every month, your usage is reset and you get another 1M events, 5K session replays, and more to use. Unused free tier limits do not rollover.',
    },
    {
        q: 'Can I set a billing limit?',
        a: 'Yes, you can set a billing limit for each of PostHog\'s products separately in your organization\'s <a href="https://app.posthog.com/organization/billing">billing settings</a>. Check out our doc on <a href="https://posthog.com/docs/billing/estimating-usage-costs">billing limits and alerts</a> for more information.',
    },
    {
        q: 'What happens if I hit my billing limit?',
        a: "If you've set a billing limit and your usage hits it, any additional events are permanently dropped and feature flags will return a default <code>quota limited</code> response. PostHog will never charge you more than what you've set as your billing limit.",
    },
    {
        q: 'How is usage calculated?',
        a: 'Usage is calculated on a per-product level. Events for product and web analytics, recordings for session replay, requests for feature flags, and experiments, exceptions for error tracking, responses for surveys, synced rows for data warehouse, messages for workflows, and GB ingested for logs.',
    },
    {
        q: 'How can I manage my spend?',
        a: 'You monitor your usage and set billing limits on the billing page in-app. This shows how much you\'ve spent, projected spend, and a billable usage dashboard. Many products, like <a href="https://posthog.com/docs/product-analytics/cutting-costs">product analytics</a> and <a href="https://posthog.com/docs/feature-flags/cutting-costs">feature flags</a>, also have docs on cutting costs.',
    },
    {
        q: 'Can I cancel my plan at any time?',
        a: 'Yes, you can cancel your plan by setting a billing limit at any time and we\'ll only charge for what you use. If you have an <a href="https://posthog.com/side-project-insurance">accidental spike</a>, talk to us and we\'ll help you sort it out.',
    },
    {
        q: 'Do I pay anything for stored data (events, exceptions, replays, logs, etc.)?',
        a: 'No, for all of our products you only pay for what you capture, ingest, or sync in a given month (i.e. you only pay when each event is first received). There are no additional storage costs or fees.',
    },
    {
        q: 'How long do you retain data (events, recordings, logs)?',
        a: 'Events and metadata are guaranteed to be retained for 7 years on any paid plan and 1 year on a free plan. After 1 year, data may be moved into cold storage so queries may run more slowly. Recordings on the free plan are retained for 1 month. On the pay-as-you plan, recordings are retained for 90 days. The Boost and Scale add-ons can increase this to up to one year. The Enterprise add-on can increase retention to 5 years. Logs are retained for 14 days.',
    },
    {
        q: 'What happens after the data retention period elapses?',
        a: 'Any data stored for more than the retention period may be permanently deleted from our systems.',
    },
    {
        q: 'Is there a free trial on paid plans?',
        a: 'We have a generous free tier on every paid plan so you can try out the all the features of PostHog before paying (though you will need to enter your credit card to unlock those features). If you have additional needs, such as enterprise features, please get in touch.',
    },
    {
        q: 'What currency are your prices in?',
        a: 'All prices are in US Dollars (USD), excluding taxes.',
    },
    {
        q: 'Do you offer a discount for non-profits?',
        a: 'Yes in most cases! Create your account, <a href="https://posthog.com/talk-to-a-human">contact the sales team for help</a> with some basic details on your organization. We will then apply a discount.',
    },
    {
        q: 'Are there any minimums or annual commitments?',
        a: 'Nope. We can, however, offer annual commitments (for example, to maintain pricing) if you need them as part of an enterprise agreement.',
    },
    {
        q: 'Is PostHog cheaper than competitors?',
        a: 'Because PostHog provides multiple products teams need, we\'re able to charge less than competitors. We aim to be the cheapest option for each product compared to major competitors. You can read how we compare in our <a href="https://posthog.com/blog/comparisons">comparison blogs</a>.',
    },
    {
        q: "What do I get with PostHog that I wouldn't get paying for multiple separate tools?",
        a: "All your data lives in one place so you don't need to jump between tools or piece them together to do analysis. You can jump directly from a funnel to a replay to an error trace. You just need to install a single SDK, manage a single bill, and sign a single contract (if you're into that sort of thing).",
    },
    {
        q: 'When does billing start?',
        a: "Usage starts being tracked as soon as you sign up for PostHog, but you aren't billed until 1 month later. For example, if I signed up on April 6th, my first month would be billed May 6th.",
    },
    {
        q: 'How often am I billed?',
        a: 'You are billed once a month, on the same day each month.',
    },
    {
        q: 'What payment methods does PostHog accept?',
        a: 'PostHog accepts credit or debit cards processed through Stripe. If you want to pay via invoice, you can <a href="https://posthog.com/talk-to-a-human">contact the sales team for help</a>.',
    },
    {
        q: 'Do you support invoicing or purchase orders?',
        a: 'Yes, but you need to make an upfront credit purchase which can be done by <a href="https://posthog.com/talk-to-a-human">contacting our sales team</a>.',
    },
    {
        q: 'Does PostHog have any setup fees or hidden costs?',
        a: 'No. Our pricing is fully transparent.',
    },
    {
        q: 'Can I use PostHog completely free forever?',
        a: 'Yes, as long as you stay under the free tier limits. Many of our users have used PostHog for free for years.',
    },
    {
        q: 'Do I need to pay for everything or only certain products?',
        a: "You can choose what products you use and you don't need to pay for anything you don't want. You can set billing limits for the products you don't want to use to be extra safe too. PostHog's products still work if you only use them individually.",
    },
    {
        q: 'Does PostHog offer annual commitment discounts?',
        a: 'Yes. PostHog does offer bigger discounts for annual commitments above a certain spend. See <a href="https://posthog.com/docs/billing/pre-paid-plans">our doc on pre-paid plans</a> for more.',
    },
]

export { plans, faqs }
