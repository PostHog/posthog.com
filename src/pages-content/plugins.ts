import ghLogoImg from '../images/plugin-logos/gh.svg'
import gitlabLogoImg from '../images/plugin-logos/gitlab.svg'
import maxmindLogoImg from '../images/plugin-logos/maxmind.svg'
import exchangeImg from '../images/plugin-logos/exchange.svg'
import twitterLogoImg from '../images/plugin-logos/twitter.svg'
import hubspotLogoImg from '../images/plugin-logos/hubspot.svg'
import customerioLogoImg from '../images/plugin-logos/customerio.svg'
import schemaImg from '../images/plugin-logos/schema.svg'

export const plugins = [
    {
        name: 'Maxmind',
        description: 'Enrich your collected events with GeoIP data from MaxMind.',
        image: maxmindLogoImg,
        link: 'https://github.com/PostHog/posthog-maxmind-plugin',
        isCommunity: false,
        isSnippet: false,
    },
    {
        name: 'Currency Normalization',
        description: 'Normalize currencies in events e.g. convert amounts in EUR to USD.',
        image: exchangeImg,
        link: 'https://github.com/PostHog/posthog-currency-normalization-plugin',
        isCommunity: false,
        isSnippet: false,
    },
    {
        name: 'GitHub Release Tracker',
        description: 'Integrate PostHog with GitHub and get automatic release annotations.',
        image: ghLogoImg,
        link: 'https://github.com/PostHog/posthog-currency-normalization-plugin',
        isCommunity: false,
        isSnippet: true,
    },
    {
        name: 'GitLab Release Tracker',
        description: 'Integrate PostHog with GitLab and get automatic release annotations.',
        image: gitlabLogoImg,
        link: 'https://github.com/PostHog/posthog-currency-normalization-plugin',
        isCommunity: false,
        isSnippet: true,
    },
    {
        name: 'Twitter Followers',
        description: 'Get your Twitter follower numbers daily without signing up to the Twitter API.',
        image: twitterLogoImg,
        link: 'https://github.com/PostHog/posthog-currency-normalization-plugin',
        isCommunity: false,
        isSnippet: true,
    },
    {
        name: 'Hubspot',
        description: 'Send contact data to Hubspot on PostHog $identify events.',
        image: hubspotLogoImg,
        link: 'https://github.com/PostHog/posthog-currency-normalization-plugin',
        isCommunity: false,
        isSnippet: true,
    },
    {
        name: 'Customer.io',
        description: 'Send event data and available emails to Customer.io.',
        image: customerioLogoImg,
        link: 'https://github.com/PostHog/posthog-currency-normalization-plugin',
        isCommunity: false,
        isSnippet: true,
    },
    {
        name: 'Schema Enforcer',
        description: "Prevent ingestion of events that don't match your specified schemas.",
        image: schemaImg,
        link: 'https://github.com/PostHog/posthog-schema-enforcer-plugin',
        isCommunity: false,
        isSnippet: false,
    },
]
