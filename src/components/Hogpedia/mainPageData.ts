/**
 * The content of the rotating Main Page modules.
 *
 * Every entry is taken from a first-party PostHog file and links to a page that exists.
 * `contents/handbook/story.md` is the source for the timeline,
 * `contents/handbook/company/lore.md` for the lore, and `contents/docs/glossary.mdx` for
 * the definitions. Nothing here is invented.
 */

export type Fact = { text: string; label: string; to: string }

export const DID_YOU_KNOW: Fact[] = [
    {
        text: 'PostHog was its founders’ sixth idea, after they pivoted almost once a month for half a year?',
        label: 'History of PostHog',
        to: '/hogpedia/history-of-posthog',
    },
    {
        text: 'the first version of PostHog reached the Hacker News front page four weeks after the first line of code?',
        label: 'History of PostHog',
        to: '/hogpedia/history-of-posthog',
    },
    {
        text: 'the PostHog handbook gives one answer to every question about moving house, and that answer is “hire movers”?',
        label: 'Hire movers',
        to: '/hogpedia/hire-movers',
    },
    {
        text: 'a session recording storage migration was codenamed after a British children’s television character from the 1990s?',
        label: 'Mr Blobby',
        to: '/hogpedia/mr-blobby',
    },
    {
        text: 'PostHog’s mascot is a hedgehog called Max, and the brand guide says he is too self-conscious to be drawn from behind?',
        label: 'Max the hedgehog',
        to: '/hogpedia/max-the-hedgehog',
    },
    {
        text: 'PostHog publishes its own internal handbook, including its compensation formula, on the public internet?',
        label: 'The PostHog Handbook',
        to: '/hogpedia/the-posthog-handbook',
    },
]

export const IN_THE_NEWS: Fact[] = [
    {
        text: 'PostHog releases',
        label: 'PostHog Desktop',
        to: '/desktop',
    },
    {
        text: 'PostHog states its goal of making a product',
        label: 'self-driving',
        to: '/self-driving',
    },
    {
        text: 'PostHog raises a $75m Series E led by Peak XV, and offers employees',
        label: 'secondary share sales',
        to: '/blog/how-secondaries-actually-work',
    },
    {
        text: 'Stripe leads a $70m',
        label: 'Series D',
        to: '/blog/series-d',
    },
    {
        text: 'For everything else, see the',
        label: 'changelog',
        to: '/changelog',
    },
]

export type FeaturedHogEntry = { hog: string; name: string; caption: string; to: string }

/**
 * The rotating "Featured hog". Each illustration is a sanctioned PostHog brand asset from
 * `@posthog/brand`, and each one points at the article that explains it.
 */
export const FEATURED_HOGS: FeaturedHogEntry[] = [
    {
        hog: 'HedgehogReading',
        name: 'Max the hedgehog',
        caption: 'The PostHog mascot, designed by Lottie Coxon.',
        to: '/hogpedia/max-the-hedgehog',
    },
    {
        hog: 'HedgehogQuickCall',
        name: 'Quick call hog',
        caption: 'Commemorates a co-founder going viral for objecting to unscheduled calls.',
        to: '/hogpedia/hire-movers',
    },
    {
        hog: 'HedgehogChartHog',
        name: 'Chart hog',
        caption: 'Appears wherever PostHog explains product analytics.',
        to: '/hogpedia/product-analytics',
    },
    {
        hog: 'HedgehogExperiment',
        name: 'Experiment hog',
        caption: 'The mascot of A/B testing at PostHog.',
        to: '/hogpedia/experiments',
    },
    {
        hog: 'HedgehogRemoteWork',
        name: 'Remote work hog',
        caption: 'PostHog has been fully remote since it was founded.',
        to: '/hogpedia/remote-work-at-posthog',
    },
    {
        hog: 'HedgehogMagnifyingGlass',
        name: 'Detective hog',
        caption: 'Turns up in session replay and error tracking material.',
        to: '/hogpedia/session-replay',
    },
    {
        hog: 'HedgehogFinalEvolution',
        name: 'Final evolution hog',
        caption: 'Used when PostHog describes its own product range.',
        to: '/hogpedia/posthog',
    },
]
