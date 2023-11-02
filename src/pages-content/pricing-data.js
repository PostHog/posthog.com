import { StaticImage } from 'gatsby-plugin-image'
import imgEnterprise1 from '../images/plan-enterprise1.svg'
import imgEnterprise2 from '../images/plan-enterprise2.svg'
import React from 'react'

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
        a: "The easiest way is to sign up for the Free plan. You'll get an accurate volume projection after just a few days.",
        author: {
            q: {
                image: <StaticImage alt="" width={40} src="./images/hog.png" />,
            },
            a: {
                image: <StaticImage alt="" width={25} src="./images/team.png" />,
                name: 'Tim Glaser',
            },
        },
    },
    {
        q: 'Do I pay anything for stored events?',
        a: 'No, you only pay the fee per captured event in a given month (i.e. you only pay when each event is first received). There are no additional costs or fees.',
        author: {
            q: {
                image: <StaticImage alt="" width={40} src="./images/hog-3.png" />,
            },
            a: {
                image: <StaticImage alt="" width={25} src="./images/team-3.png" />,
                name: 'Simon Fisher',
            },
        },
    },
    {
        q: 'How long do you retain data?',
        a: 'Data (except recordings, see below) is guaranteed to be retained for 7 years on any paid plan and 1 year on a free plan. After 1 year, data may be moved into cold storage so queries may run more slowly.',
        author: {
            q: {
                image: <StaticImage alt="" width={40} src="./images/hog-5.png" />,
            },
            a: {
                image: <StaticImage alt="" width={25} src="./images/team-5.png" />,
                name: 'Tiina Turban',
            },
        },
    },
    {
        q: 'How long do you retain recordings?',
        a: 'Recordings are kept on Clickhouse-based installations for 1 month. For paid customers on PostHog cloud, recordings are kept for 3 months.',
        author: {
            q: {
                image: <StaticImage alt="" width={40} src="./images/hog-6.png" />,
            },
            a: {
                image: <StaticImage alt="" width={25} src="./images/team-6.png" />,
                name: 'Rick Marron',
            },
        },
    },
    {
        q: 'What happens after the data retention period elapses?',
        a: 'Any event or user data stored for more than the retention period may be permanently deleted from our systems.',
        author: {
            q: {
                image: <StaticImage alt="" width={40} src="./images/hog-7.png" />,
            },
            a: {
                image: <StaticImage alt="" width={25} src="./images/team-7.png" />,
                name: 'Marius Andra',
            },
        },
    },
    {
        q: 'Is there a free trial on paid plans?',
        a: 'We have a generous free tier on every paid plan so you can try out the features before paying any money (though you will need to enter your credit card info). If you have additional needs, such as enterprise features, please get in touch.',
        author: {
            q: {
                image: <StaticImage alt="" width={40} src="./images/hog-8.png" />,
            },
            a: {
                image: <StaticImage alt="" width={25} src="./images/team-8.png" />,
                name: 'Michael Matloka',
            },
        },
    },
    {
        q: 'What currency are your prices in?',
        a: 'All prices are in US Dollars (USD), excluding taxes.',
        author: {
            q: {
                image: <StaticImage alt="" width={40} src="./images/hog-9.png" />,
            },
            a: {
                image: <StaticImage alt="" width={25} src="./images/team-9.png" />,
                name: 'James Hawkins',
            },
        },
    },
    {
        q: 'Do you offer a discount for non-profits?',
        a: 'Yes in most cases - 50% off any plan. Create your account, then email sales@posthog.com from the same email address with some basic details on your organization. We will then apply a discount.',
        author: {
            q: {
                image: <StaticImage alt="" width={40} src="./images/hog-10.png" />,
            },
            a: {
                image: <StaticImage alt="" width={25} src="./images/team-10.png" />,
                name: 'Eric Duong',
            },
        },
    },
    {
        q: 'Are there any minimums or annual commitments?',
        a: 'Nope. We can, however, offer annual commitments (for example, to maintain pricing) if you need them as part of an enterprise agreement.',
        author: {
            q: {
                image: <StaticImage alt="" width={40} src="./images/hog-11.png" />,
            },
            a: {
                image: <StaticImage alt="" width={25} src="./images/team-11.png" />,
                name: 'Cameron DeLeone',
            },
        },
    },
]

export { plans, faqs }
