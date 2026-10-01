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
