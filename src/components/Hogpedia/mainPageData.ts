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

export type HistoricEvent = {
    /** The precision the source gives. `story.md` dates most entries to a month only. */
    date: string
    month: number
    day?: number
    text: string
    label: string
    to: string
}

/**
 * The PostHog timeline, at the precision `contents/handbook/story.md` states it.
 *
 * Only the founding date is given to the day in the source, so only that entry carries a
 * day. Nothing is rounded up to a date the handbook does not claim.
 */
export const ON_THIS_DAY: HistoricEvent[] = [
    {
        date: '23 January 2020',
        month: 1,
        day: 23,
        text: 'James Hawkins and Tim Glaser founded PostHog.',
        label: 'PostHog',
        to: '/hogpedia/posthog',
    },
    {
        date: 'February 2020',
        month: 2,
        text: 'PostHog launched its first version on Hacker News, four weeks after the first line of code.',
        label: 'History of PostHog',
        to: '/hogpedia/history-of-posthog',
    },
    {
        date: 'April 2020',
        month: 4,
        text: 'PostHog raised a $3.025m seed round after Y Combinator’s W20 batch.',
        label: 'History of PostHog',
        to: '/hogpedia/history-of-posthog',
    },
    {
        date: 'June 2021',
        month: 6,
        text: 'PostHog raised a $15m Series B led by Y Combinator.',
        label: 'History of PostHog',
        to: '/hogpedia/history-of-posthog',
    },
    {
        date: 'February 2025',
        month: 2,
        text: 'PostHog shipped AI observability, built first to watch what PostHog AI itself was costing.',
        label: 'AI observability',
        to: '/hogpedia/ai-observability',
    },
    {
        date: 'June 2025',
        month: 6,
        text: 'Stripe led a $70m Series D at a valuation of about $920m.',
        label: 'History of PostHog',
        to: '/hogpedia/history-of-posthog',
    },
    {
        date: 'October 2025',
        month: 10,
        text: 'Peak XV led a $75m Series E at a valuation of about $1.4bn.',
        label: 'History of PostHog',
        to: '/hogpedia/history-of-posthog',
    },
    {
        date: 'December 2020',
        month: 12,
        text: 'PostHog raised a $9m Series A led by GV.',
        label: 'History of PostHog',
        to: '/hogpedia/history-of-posthog',
    },
]

/**
 * The events for the current month, or an honest fallback.
 *
 * The handbook dates most entries to a month, not a day. A module called "On this day"
 * therefore tells the reader when it has nothing for today, rather than move an event onto
 * a date the source does not give.
 */
export const nearestEvents = (date = new Date()): { heading: string; events: HistoricEvent[] } => {
    const month = date.getUTCMonth() + 1
    const thisMonth = ON_THIS_DAY.filter((event) => event.month === month)

    if (thisMonth.length > 0) {
        const monthName = date.toLocaleDateString('en-US', { month: 'long', timeZone: 'UTC' })
        return { heading: `${monthName}`, events: thisMonth }
    }

    return {
        heading: 'Hogpedia has no event recorded for this month. Selected anniversaries:',
        events: ON_THIS_DAY.slice(0, 3),
    }
}

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
