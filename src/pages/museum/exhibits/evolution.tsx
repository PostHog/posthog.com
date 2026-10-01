import React, { useEffect, useRef, useState } from 'react'
import ReaderView from 'components/ReaderView'
import SEO from 'components/seo'
import { graphql, useStaticQuery } from 'gatsby'
import { TeamMemberLink } from 'components/TeamMember'
import Link from 'components/Link'
import MuseumMenu from 'components/Museum/MuseumMenu'

// The Evolution of Marketing: a permanent exhibit in the marketing museum.
// All copy and numbers live in the constants below so wording can be edited without touching the layout.
// Figures were fact-checked against PostHog data and the posthog.com repo on 2026-10-01.
// Everything for 2026 runs to September 30, 2026.

const hog = (file: string) => `https://res.cloudinary.com/dmukukwp6/image/upload/${file}.png`

const EYEBROW = 'The Department of Marketing Anthropology presents'
const TITLE = 'The Evolution of Marketing'
const SUBTITLE = 'PostHog, 2020–2026'
const PLAQUE = "Permanent collection · Admission free · Please don't feed the hedgehogs"
const CURATORS_NOTE = [
    "Between 2020 and 2026, a small population of marketers at PostHog evolved fast. Early specimens communicated mostly by word of mouth. Later ones developed a newsletter, a YouTube channel, an ads engine, an events team and, eventually, a blimp. This exhibit documents that evolution using artifacts recovered from the company's own records.",
    'It is dedicated to every marketer who got us here, and to everyone who will take us to the next level. Thank you!',
]

const JOINED_PER_YEAR = [
    { year: '2020', value: 1 },
    { year: '2021', value: 5 },
    { year: '2022', value: 3 },
    { year: '2023', value: 1 },
    { year: '2024', value: 3 },
    { year: '2025', value: 13, highlight: true },
    { year: '2026', value: 11, highlight: true },
]

// Plate 1. Each genus groups real job titles by what the job does; † marks a title nobody holds any more.
const GENERA: {
    genus: string
    group: string
    habitat: string
    notes: string
    species: { name: string; title: string; year: string; extinct?: boolean }[]
}[] = [
    {
        genus: 'Scriptor',
        habitat: 'Editorial',
        notes: 'Communicates in long form. Nocturnal before deadlines.',
        group: 'The writers',
        species: [
            { name: 'contentus', title: 'Content Marketer', year: '2021' },
            { name: 'technicus', title: 'Technical Content Marketer', year: '2022' },
            { name: 'managerialis', title: 'Content Marketing Manager', year: '2025' },
            { name: 'socialis', title: 'Social Poster', year: '2026' },
        ],
    },
    {
        genus: 'Docens',
        habitat: 'Wizard & Docs',
        notes: 'Explains things patiently. Will draw a diagram unprompted.',
        group: 'The teachers',
        species: [
            { name: 'devrelus', title: 'DevRel', year: '2021', extinct: true },
            { name: 'advocatus', title: 'Dev Advocate', year: '2022', extinct: true },
            { name: 'amabilis', title: 'Developer who loves teaching', year: '2025' },
            { name: 'magus', title: 'Wizard & Docs', year: '2026' },
        ],
    },
    {
        genus: 'Pictor',
        habitat: 'Graphics',
        notes: 'Sees in hex codes. Allergic to Comic Sans.',
        group: 'The image-makers',
        species: [
            { name: 'graphicus', title: 'Graphic Designer', year: '2020' },
            { name: 'productor', title: 'Production Designer', year: '2025' },
            { name: 'digitalis', title: 'Digital Illustrator', year: '2026' },
        ],
    },
    {
        genus: 'Fabricator',
        habitat: 'Website',
        notes: 'Builds the nest everyone else lives in.',
        group: 'The site-builders',
        species: [
            { name: 'frontendus', title: 'Front End Developer', year: '2021' },
            { name: 'designus', title: 'Design Engineer', year: '2026' },
        ],
    },
    {
        genus: 'Cinematicus',
        habitat: 'YouTube & Video',
        notes: 'Rarely seen on camera. Usually behind it.',
        group: 'The filmmakers',
        species: [
            { name: 'productor', title: 'Video Producer', year: '2025' },
            { name: 'postproductor', title: 'Video Post-Production Specialist', year: '2025' },
            { name: 'youtubensis', title: 'Dev Advocate (YouTube)', year: '2026' },
        ],
    },
    {
        genus: 'Venditor',
        habitat: 'Developer Marketing',
        notes: 'Positions things. Then repositions them.',
        group: 'The positioners',
        species: [
            { name: 'productus', title: 'Product Marketer', year: '2025', extinct: true },
            { name: 'developeris', title: 'Developer Marketer', year: '2025' },
        ],
    },
    {
        genus: 'Propagator',
        habitat: 'Demand Gen',
        notes: 'Speaks fluent CPC. Migrates between ad platforms.',
        group: 'The amplifiers',
        species: [
            { name: 'performancus', title: 'Performance Marketer', year: '2025' },
            { name: 'maximus', title: 'Propagandist', year: '2026' },
            { name: 'influentiae', title: 'Influence Wrangler', year: '2026' },
        ],
    },
    {
        genus: 'Convocator',
        habitat: 'Builder Relations & Events',
        notes: 'Knows a venue in every city.',
        group: 'The gatherers',
        species: [
            { name: 'eventorum', title: 'Developer who Organizes Events', year: '2025' },
            { name: 'constructor', title: 'Event Builder', year: '2026' },
            { name: 'amicus', title: 'Builder Relations', year: '2026' },
        ],
    },
]

// Hall II. Oldest layer first. Old names are wrapped in ~~ and render struck through; **bold** for new names.
const STRATA: { layer: string; date: string; text: string }[] = [
    { layer: 'Bedrock', date: '2021', text: '~~Marketing & Growth~~ → **Marketing**' },
    {
        layer: 'Layer I',
        date: 'Jul 2022',
        text: '**Website & Docs** appears. Lasts two years, an eternity by local standards.',
    },
    { layer: 'Layer II', date: '2023', text: 'One shared sprint: **Marketing + Website & Docs**' },
    { layer: 'Layer III', date: 'Oct 2024', text: '~~Website & Docs~~ → ~~Vibes~~ (24 hours) → **Website & Vibes**' },
    {
        layer: 'Layer IV',
        date: 'Nov 2024',
        text: '~~Customer Comms~~ → **Comms**, support team included. Interspecies cohabitation.',
    },
    { layer: 'Layer V', date: 'Dec 2024', text: 'The great schism: **Content & Docs** and **Words & Pictures**' },
    {
        layer: 'Layer VI',
        date: 'Feb 2025',
        text: '~~Words & Pictures~~ → **Comms** after ten weeks. "Long live the Comms team."',
    },
    { layer: 'Layer VII', date: 'May 2025', text: '**Brand & Vibes** emerges. **Content** follows in June.' },
    { layer: 'Layer VIII', date: 'Aug 2025', text: '**Paid Ads** gets a team page.' },
    { layer: 'Layer IX', date: 'Sep 2025', text: '~~Brand & Vibes~~ → **Brand**. Vibes lost.' },
    {
        layer: 'Layer X',
        date: 'Nov 2025',
        text: 'Content splits into **Editorial**, **YouTube** and **Wizard & Docs**',
    },
    { layer: 'Layer XI', date: 'Jan 2026', text: '~~Brand~~ → **Website**. ~~Paid Ads~~ → **Demand Gen**' },
    { layer: 'Layer XII', date: 'Feb 2026', text: '**IRL Events** is born. **Builder Relations** by August.' },
    { layer: 'Layer XIII', date: 'Jul 2026', text: '**Graphics** gets a team page.' },
    { layer: 'Topsoil', date: 'Sep 2026', text: '~~Marketing~~ → **Developer Marketing**. Still settling.' },
]
const EXCAVATION_NOTE =
    'Pieced together from old handbook pages, sprint names and the odd pull request. Some dates are approximate. Handle with care.'

// Hall III. Names must match community profiles exactly for the photo to show up; otherwise the name renders as text.
// profileId is the community profile number (posthog.com/community/profiles/<id>), used when the name on the
// profile doesn't match the name shown here. Without it, the name is matched against profiles as written.
const CLANS: { team: string; people: { name: string; role: string; note?: string; profileId?: number }[] }[] = [
    { team: 'Leadership', people: [{ name: 'Charles Cook', role: 'Exec, Marketing & Website' }] },
    {
        team: 'Graphics',
        people: [
            { name: 'Lottie Coxon', role: 'Graphic Designer · 2020' },
            { name: 'Daniel Hawkins', role: 'Production Designer · 2025' },
            { name: 'Heidi Berton', role: 'Digital Illustrator · 2026' },
        ],
    },
    {
        team: 'Website',
        people: [
            { name: 'Eli Kinsey', role: 'Front End Developer · 2021' },
            { name: 'Ian Matson', role: 'Design Engineer · 2026' },
        ],
    },
    {
        team: 'Editorial',
        people: [
            { name: 'Andy Vandervell', role: 'Content Marketer · 2022' },
            { name: 'Ian Vanagas', role: 'Technical Content Marketer · 2022' },
            { name: 'Natália Amorim', role: 'Content Marketing Manager · 2025', profileId: 35321 },
            { name: 'Jina Yoon', role: 'Technical Content Marketer · 2025' },
            { name: 'Liam Graham', role: 'Social Poster · 2026' },
            { name: 'Dennis Ivy', role: 'Dev Advocate (YouTube) · 2026', profileId: 44042 },
        ],
    },
    {
        team: 'Wizard & Docs',
        people: [
            { name: 'Edwin Lim', role: 'Developer who loves teaching · 2025' },
            { name: 'Vincent Ge', role: 'Developer who loves teaching · 2025' },
            { name: 'Sarah Sanders', role: 'Technical Content Marketer · 2025' },
            { name: 'John Waters', role: 'Wizard & Docs · 2026' },
        ],
    },
    {
        team: 'Developer Marketing',
        people: [
            { name: 'Joe Black', role: 'Lead of Developer Marketing · 2021', profileId: 29070 },
            { name: 'Sara Miteva', role: 'Developer Marketer · 2025' },
            { name: 'Cleo Lant', role: 'Developer Marketer · 2025' },
            { name: 'Lizzie Epton', role: 'Developer Marketer · 2026', profileId: 43387 },
            { name: 'Juliana Meyer', role: 'Developer Marketer · 2026' },
        ],
    },
    {
        team: 'YouTube & Video',
        people: [
            { name: 'Alex van Leeuwen', role: 'Video Producer · 2025' },
            { name: 'Jordo', role: 'Video Post-Production Specialist · 2025', profileId: 34804 },
        ],
    },
    {
        team: 'Demand Gen',
        people: [
            { name: 'Brian Young', role: 'Performance Marketer · 2025' },
            { name: 'Jonah Svihus', role: 'Propagandist · 2026' },
        ],
    },
    {
        team: 'Builder Relations & Events',
        people: [
            { name: 'Daniel Zaltsman', role: 'Developer who Organizes Events · 2025' },
            { name: 'Kliment Minchev', role: 'Event Builder · 2026' },
            { name: 'Adlet Smykov-moldagaliyev', role: 'Influence Wrangler · 2026', profileId: 42800 },
            { name: 'Brittany Joiner', role: 'Builder Relations · 2026' },
        ],
    },
]
const ANCESTORS: { name: string; role: string }[] = [
    { name: 'Cory Watilo', role: 'Lead Designer · 2021' },
    { name: 'Mo Shehu', role: 'Content Marketer · 2021' },
    { name: 'Phil Leggetter', role: 'DevRel · 2021' },
    { name: 'Paul Hultgren', role: 'Dev Advocate · 2022–23' },
    { name: 'Lior Neu-ner', role: 'Technical Content Marketer · 2023–25' },
    { name: 'James Temperton', role: 'Content Marketer · 2024' },
    { name: 'Danilo Campos', role: 'Technical Content Marketer · 2024' },
    { name: 'Bijan Boustani', role: 'Technical Content Marketer · 2024–25' },
    { name: 'Kevan Gilbert', role: 'Product Marketer · 2025' },
]

// Hall IV. Exact posthog.com pageview counts, in millions.
const PAGEVIEWS = [
    { year: '2020', value: 0.135 },
    { year: '2021', value: 1.5 },
    { year: '2022', value: 3.67 },
    { year: '2023', value: 3.93 },
    { year: '2024', value: 8.96 },
    { year: '2025', value: 19.93 },
    { year: '2026', value: 19.14, highlight: true },
]

// Hall V. Months between cumulative signup milestones.
const MILESTONES = [
    { label: 'First 10k', value: 16.7 },
    { label: '10k → 100k', value: 27.6 },
    { label: '100k → 250k', value: 14.5 },
    { label: '250k → 500k', value: 10.1 },
    { label: '500k → 1M', value: 8.8, highlight: true },
]

// Hall VI.
const AGES: { name: string; years: string; text: string; color: string }[] = [
    {
        name: 'The Age of Search',
        years: '2022',
        text: 'People googled a problem and found us. 27% of answers.',
        color: 'bg-yellow',
    },
    {
        name: 'The Age of Kinship',
        years: '2023',
        text: '"A friend told me." Almost a third of answers.',
        color: 'bg-green',
    },
    {
        name: 'The Age of the Creator',
        years: '2024–25',
        text: 'YouTubers became the village storytellers. 1 in 5 answers.',
        color: 'bg-red',
    },
    {
        name: 'The Age of the Oracle',
        years: '2026–',
        text: 'People asked machines instead. Over half of answers by September. Four years earlier: 2 in 1,000.',
        color: 'bg-blue',
    },
]
type FossilKind = 'platform' | 'creator' | 'ai' | 'other'
const BEDROCK_FOSSILS = [
    'YouTube',
    'Twitter/X',
    'Reddit',
    'LinkedIn',
    'Instagram',
    'Facebook',
    'GitHub',
    'Hacker News',
    'Product Hunt',
    'Podcasts',
    'Newsletters',
    'Substack',
]
const LATER_FOSSILS: { name: string; date: string; kind: FossilKind }[] = [
    { name: 'Discord', date: 'Oct 2022', kind: 'platform' },
    { name: 'Theo', date: 'Oct 2022', kind: 'creator' },
    { name: 'TikTok', date: 'Dec 2022', kind: 'platform' },
    { name: 'Fireship', date: 'Jun 2023', kind: 'creator' },
    { name: 'ChatGPT', date: 'Sep 2023', kind: 'ai' },
    { name: 'Perplexity', date: 'Sep 2023', kind: 'ai' },
    { name: 'Gemini', date: 'Apr 2024', kind: 'ai' },
    { name: 'Claude', date: 'Jul 2024', kind: 'ai' },
    { name: 'Threads', date: 'Aug 2024', kind: 'platform' },
    { name: 'Bluesky', date: 'Nov 2024', kind: 'platform' },
    { name: 'Cursor', date: 'Dec 2024', kind: 'ai' },
    { name: 'Billboard', date: 'Jan 2025', kind: 'other' },
    { name: 'Claude Code', date: 'Jul 2025', kind: 'ai' },
    { name: 'JS Mastery', date: 'Oct 2025', kind: 'creator' },
    { name: 'Claude Cowork', date: 'Feb 2026', kind: 'ai' },
]

// Hall VII.
const CASES: {
    id: string
    title: string
    then: { when: string; value: string; caption: string }
    now: { when: string; value: string; caption: string }
    note?: string
    spark?: number[]
}[] = [
    {
        id: 'A',
        title: 'The written word',
        then: { when: '2020', value: '37', caption: 'blog posts, no tutorials' },
        now: { when: '2026', value: '94', caption: 'blog posts and tutorials so far' },
        note: 'Tutorials peaked at 71 in 2024.',
        spark: [37, 50, 86, 85, 84, 69, 94],
    },
    {
        id: 'B',
        title: 'The newsletter',
        then: { when: '2022', value: '0', caption: 'no newsletter yet' },
        now: { when: '2025', value: '28', caption: 'issues in one year' },
        note: 'First issue 2023. 21 so far in 2026.',
        spark: [0, 11, 17, 28, 21],
    },
    {
        id: 'C',
        title: 'Moving pictures',
        then: { when: 'Late 2024', value: '34K', caption: 'YouTube views in three months' },
        now: { when: '2026', value: '13.1M', caption: 'YouTube views so far' },
        note: 'Helped along by paid promotion.',
        spark: [0.034, 0.583, 13.1],
    },
    {
        id: 'D',
        title: 'Paid offerings',
        then: { when: '2020', value: '$3.6K', caption: 'on Google Ads, the whole year' },
        now: { when: '2026', value: '$3.1M', caption: 'so far, across five ad platforms' },
        note: 'Ad platforms only. The blimp is on a separate bill.',
        spark: [3.6, 90.9, 279.2, 343.5, 522.8, 2638.1, 3131],
    },
    {
        id: 'E',
        title: 'The Following',
        then: { when: 'Day one', value: '0', caption: 'followers on X. Everyone starts somewhere.' },
        now: { when: '2026', value: '25K', caption: 'followers on X (formerly Twitter)' },
    },
]

const FOOTNOTE =
    'Records are incomplete and should be handled with care. "How did you hear about us?" answers are free text, grouped by keyword. The share of new users answering rose from about 4% (to January 2026) to 21% (September 2026). Ad blockers mean early website traffic is undercounted. YouTube records begin in September 2024. Ad spend covers ad platforms only, not billboards, buses, the blimp, events or sponsorships. Revenue is not on display. All 2026 figures run to the end of September.'

/* ---------- small building blocks ---------- */

type Profile = {
    squeakId: string
    firstName: string
    lastName?: string
    avatar?: { formats: { thumbnail: { url: string } } }
    companyRole?: string
    location?: string
    country?: string
    color?: string
}

const useProfiles = (): Profile[] => {
    const {
        profiles: { nodes },
    } = useStaticQuery(graphql`
        {
            profiles: allSqueakProfile {
                nodes {
                    avatar {
                        formats {
                            thumbnail {
                                url
                            }
                        }
                    }
                    firstName
                    lastName
                    squeakId
                    companyRole
                    location
                    country
                    color
                }
            }
        }
    `)
    return nodes
}

const ORANGE = 'text-orange dark:text-orange-dark'
const BLUE = 'text-blue'
const eyebrowClass = 'm-0 text-xs font-semibold uppercase leading-none tracking-wide text-secondary'

// Renders **bold** and ~~struck~~ inline, nothing else.
const Rich = ({ text }: { text: string }) => (
    <>
        {text.split(/(\*\*[^*]+\*\*|~~[^~]+~~)/g).map((part, i) =>
            part.startsWith('**') ? (
                <strong key={i}>{part.slice(2, -2)}</strong>
            ) : part.startsWith('~~') ? (
                <s key={i} className="text-secondary decoration-red decoration-2">
                    {part.slice(2, -2)}
                </s>
            ) : (
                <React.Fragment key={i}>{part}</React.Fragment>
            )
        )}
    </>
)

const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

// True once the element has scrolled into view. Starts true so nothing is hidden before JS runs.
const useInView = <T extends HTMLElement>(): [React.RefObject<T>, boolean] => {
    const ref = useRef<T>(null)
    const [inView, setInView] = useState(true)
    useEffect(() => {
        const el = ref.current
        if (!el || typeof IntersectionObserver === 'undefined' || prefersReducedMotion()) return
        if (el.getBoundingClientRect().top < window.innerHeight) return
        setInView(false)
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true)
                    observer.disconnect()
                }
            },
            { rootMargin: '0px 0px -10% 0px' }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [])
    return [ref, inView]
}

// Counts a number like "612,000+", "$3.1M" or "4,903" up from zero when it scrolls into view.
const CountUp = ({ value }: { value: string }) => {
    const [ref, inView] = useInView<HTMLSpanElement>()
    const [shown, setShown] = useState(value)
    useEffect(() => {
        const match = value.match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/)
        if (!inView || !match || prefersReducedMotion()) return
        const [, prefix, digits, suffix] = match
        const target = parseFloat(digits.replace(/,/g, ''))
        const decimals = (digits.split('.')[1] || '').length
        const grouped = digits.includes(',')
        const start = performance.now()
        let frame = 0
        const tick = (now: number) => {
            const t = Math.min(1, (now - start) / 900)
            const eased = 1 - Math.pow(1 - t, 3)
            const current = (target * eased).toFixed(decimals)
            setShown(`${prefix}${grouped ? Number(current).toLocaleString('en-US') : current}${suffix}`)
            if (t < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(frame)
    }, [inView, value])
    return <span ref={ref}>{shown}</span>
}

const Hall = ({
    number,
    title,
    intro,
    children,
}: {
    number: string
    title: string
    intro?: string
    children: React.ReactNode
}) => {
    const [ref, inView] = useInView<HTMLElement>()
    return (
        <section
            ref={ref}
            className={`not-prose border-t border-primary pt-10 transition-all duration-700 ${
                inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
        >
            <p className="m-0 font-mono text-xs text-secondary">HALL {number}</p>
            <h2 className="m-0 mt-1 text-3xl font-bold leading-tight @md:text-4xl">{title}</h2>
            {intro && <p className="m-0 mt-2 max-w-2xl text-secondary">{intro}</p>}
            <div className="mt-6 space-y-6">{children}</div>
        </section>
    )
}

const ThenNow = ({
    then,
    now,
    accent = ORANGE,
}: {
    then: { when: string; value: string; caption: string }
    now: { when: string; value: string; caption: string }
    accent?: string
}) => (
    <div
        data-scheme="secondary"
        className="grid overflow-hidden rounded-md border border-primary bg-primary @md:grid-cols-2"
    >
        <div className="p-5 @md:p-6">
            <p className={eyebrowClass}>
                Where we started <span className="font-mono normal-case tracking-normal">· {then.when}</span>
            </p>
            <p className="m-0 mt-3 text-4xl font-bold leading-none text-secondary @md:text-5xl">
                <CountUp value={then.value} />
            </p>
            <p className="m-0 mt-2 max-w-xs text-primary">{then.caption}</p>
        </div>
        <div className="border-t border-primary bg-accent p-5 @md:border-l @md:border-t-0 @md:p-6">
            <p className={eyebrowClass}>
                Where we are now <span className="font-mono normal-case tracking-normal">· {now.when}</span>
            </p>
            <p className={`m-0 mt-3 text-4xl font-bold leading-none @md:text-5xl ${accent}`}>
                <CountUp value={now.value} />
            </p>
            <p className="m-0 mt-2 max-w-xs text-primary">{now.caption}</p>
        </div>
    </div>
)

const Fact = ({ children, small }: { children: React.ReactNode; small?: boolean }) => (
    <p className={small ? 'm-0 text-sm text-secondary' : 'm-0 text-xl font-semibold leading-snug @md:text-2xl'}>
        {children}
    </p>
)

const Vitrine = ({
    title,
    children,
    notes,
}: {
    title: string
    children: React.ReactNode
    notes?: { label: string; text: string }[]
}) => (
    <figure data-scheme="secondary" className="m-0 rounded-md border border-primary bg-primary p-4">
        <figcaption className="m-0 text-base font-semibold">{title}</figcaption>
        <div className="mt-3">{children}</div>
        {notes && (
            <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 border-t border-dashed border-primary pt-2 text-sm text-secondary">
                {notes.map(({ label, text }) => (
                    <React.Fragment key={label}>
                        <dt className="font-mono uppercase tracking-wide">{label}</dt>
                        <dd className="m-0">{text}</dd>
                    </React.Fragment>
                ))}
            </dl>
        )}
    </figure>
)

const TwoCol = ({ left, right }: { left: React.ReactNode; right: React.ReactNode }) => (
    <div className="space-y-6">
        <div className="flex flex-wrap gap-4 [&>*]:min-w-[18rem] [&>*]:flex-1">{left}</div>
        <div>{right}</div>
    </div>
)

/* ---------- charts (inline SVG, no library) ---------- */

const barFill = (highlight?: boolean, accent = 'fill-orange dark:fill-orange-dark') =>
    highlight ? accent : 'fill-accent'

const BarChart = ({
    data,
    format = (v: number) => String(v),
    max,
}: {
    data: { year: string; value: number; highlight?: boolean }[]
    format?: (v: number) => string
    max?: number
}) => {
    const w = 800
    const h = 300
    const m = { l: 8, r: 8, t: 28, b: 30 }
    const top = max ?? Math.max(...data.map((d) => d.value))
    const iw = w - m.l - m.r
    const ih = h - m.t - m.b
    const step = iw / data.length
    const bw = step * 0.66
    const y = (v: number) => m.t + ih * (1 - v / top)
    return (
        <svg viewBox={`0 0 ${w} ${h}`} className="h-auto w-full text-secondary" role="img">
            {[0, 0.5, 1].map((f) => (
                <line
                    key={f}
                    x1={m.l}
                    x2={w - m.r}
                    y1={y(top * f)}
                    y2={y(top * f)}
                    stroke="currentColor"
                    strokeOpacity={0.2}
                />
            ))}
            {data.map((d, i) => {
                const x = m.l + step * i + (step - bw) / 2
                return (
                    <g key={d.year}>
                        <rect
                            x={x}
                            y={y(d.value)}
                            width={bw}
                            height={Math.max(2, y(0) - y(d.value))}
                            className={barFill(d.highlight)}
                        >
                            <title>{`${d.year}: ${format(d.value)}`}</title>
                        </rect>
                        <text
                            x={x + bw / 2}
                            y={y(d.value) - 6}
                            textAnchor="middle"
                            fontSize={16}
                            fontWeight={d.highlight ? 700 : 500}
                            fill="currentColor"
                        >
                            {format(d.value)}
                        </text>
                        <text x={x + bw / 2} y={h - 6} textAnchor="middle" fontSize={15} fill="currentColor">
                            {d.year}
                        </text>
                    </g>
                )
            })}
        </svg>
    )
}

const HBarChart = ({
    data,
    unit,
    accent,
}: {
    data: { label: string; value: number; highlight?: boolean }[]
    unit: string
    accent?: string
}) => {
    const w = 800
    const rh = 56
    const h = rh * data.length
    const labelW = 150
    const valueW = 90
    const iw = w - labelW - valueW
    const top = Math.max(...data.map((d) => d.value))
    return (
        <svg viewBox={`0 0 ${w} ${h}`} className="h-auto w-full text-secondary" role="img">
            {data.map((d, i) => {
                const yTop = rh * i + rh * 0.2
                const bh = rh * 0.6
                const bw = (iw * d.value) / top
                return (
                    <g key={d.label}>
                        <text
                            x={labelW - 10}
                            y={yTop + bh / 2 + 4}
                            textAnchor="end"
                            fontSize={16}
                            fontWeight={600}
                            className="fill-current text-primary"
                        >
                            {d.label}
                        </text>
                        <rect x={labelW} y={yTop} width={bw} height={bh} className={barFill(d.highlight, accent)}>
                            <title>{`${d.label}: ${d.value} ${unit}`}</title>
                        </rect>
                        <text
                            x={labelW + bw + 8}
                            y={yTop + bh / 2 + 4}
                            fontSize={15}
                            fontWeight={700}
                            fill="currentColor"
                        >
                            {d.value} {unit}
                        </text>
                    </g>
                )
            })}
        </svg>
    )
}

const Sparkline = ({ data }: { data: number[] }) => {
    const w = 200
    const h = 40
    const top = Math.max(...data)
    const x = (i: number) => 4 + ((w - 8) * i) / (data.length - 1)
    const y = (v: number) => h - 4 - ((h - 8) * v) / top
    const points = data.map((v, i) => `${x(i)},${y(v)}`).join(' ')
    return (
        <svg viewBox={`0 0 ${w} ${h}`} className="h-10 w-full" role="img" aria-hidden="true">
            <polygon
                points={`${x(0)},${h - 4} ${points} ${x(data.length - 1)},${h - 4}`}
                className="fill-orange dark:fill-orange-dark"
                opacity={0.15}
            />
            <polyline
                points={points}
                fill="none"
                strokeWidth={2}
                strokeLinejoin="round"
                className="stroke-orange dark:stroke-orange-dark"
            />
            <circle
                cx={x(data.length - 1)}
                cy={y(data[data.length - 1])}
                r={3.5}
                className="fill-orange dark:fill-orange-dark"
            />
        </svg>
    )
}

// Radiocarbon-style timeline: every later fossil placed by the month it first shows up in the answers.
const CarbonTimeline = ({ fossils }: { fossils: { name: string; date: string; kind: FossilKind }[] }) => {
    const w = 1200
    const h = 300
    const m = { l: 50, r: 50 }
    const axisY = 160
    const start = Date.UTC(2022, 8, 1)
    const end = Date.UTC(2026, 9, 1)
    const x = (date: string) => m.l + ((w - m.l - m.r) * (Date.parse(`1 ${date} UTC`) - start)) / (end - start)
    const fill: Record<FossilKind, string> = {
        platform: 'fill-current',
        creator: 'fill-red',
        ai: 'fill-blue',
        other: 'fill-current',
    }
    const stems = [50, 85, 120]
    return (
        <div className="overflow-x-auto pb-2 [scrollbar-width:thin]">
            <svg viewBox={`0 0 ${w} ${h}`} className="h-auto min-w-[900px] text-secondary" role="img">
                <line x1={m.l} x2={w - m.r} y1={axisY} y2={axisY} stroke="currentColor" strokeWidth={2} />
                {[2023, 2024, 2025, 2026].map((year) => {
                    const tx = x(`Jan ${year}`)
                    return (
                        <g key={year}>
                            <line x1={tx} x2={tx} y1={axisY - 8} y2={axisY + 8} stroke="currentColor" strokeWidth={2} />
                            <text x={tx} y={axisY + 26} textAnchor="middle" fontSize={13} fill="currentColor">
                                {year}
                            </text>
                        </g>
                    )
                })}
                <text x={m.l} y={axisY + 26} fontSize={13} fill="currentColor">
                    Sep 2022
                </text>
                <text x={w - m.r} y={axisY + 26} textAnchor="end" fontSize={13} fill="currentColor">
                    Sep 2026
                </text>
                {fossils.map(({ name, date, kind }, i) => {
                    const cx = x(date)
                    const above = i % 2 === 0
                    const stem = stems[Math.floor(i / 2) % stems.length]
                    const labelY = above ? axisY - stem : axisY + stem
                    return (
                        <g key={name} className={fill[kind]}>
                            <line
                                x1={cx}
                                x2={cx}
                                y1={axisY}
                                y2={labelY + (above ? 12 : -22)}
                                stroke="currentColor"
                                strokeOpacity={0.35}
                                strokeDasharray={kind === 'other' ? '3 3' : undefined}
                            />
                            <circle cx={cx} cy={axisY} r={6} className={fill[kind]} />
                            <text
                                x={cx}
                                y={labelY}
                                textAnchor="middle"
                                fontSize={14}
                                fontWeight={700}
                                className="fill-current"
                            >
                                {name}
                            </text>
                            <text
                                x={cx}
                                y={labelY + (above ? -16 : 16)}
                                textAnchor="middle"
                                fontSize={11}
                                fontFamily="monospace"
                                fill="currentColor"
                            >
                                {date}
                            </text>
                            <title>{`${name}: first seen ${date}`}</title>
                        </g>
                    )
                })}
            </svg>
        </div>
    )
}

const FALLBACK_PORTRAIT =
    'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/pages-content/images/hog-9.png'

// A framed portrait with a brass plaque, the way a museum hangs its founders.
const Portrait = ({
    name,
    role,
    note,
    profileId,
}: {
    name: string
    role: string
    note?: string
    profileId?: number
}) => {
    const profiles = useProfiles()
    const person = profileId
        ? profiles.find(({ squeakId }) => String(squeakId) === String(profileId))
        : profiles.find(
              ({ firstName, lastName }) => `${firstName} ${lastName || ''}`.trim().toLowerCase() === name.toLowerCase()
          )
    const [title, year] = role.split(' · ')
    const frame = (
        <figure className="m-0 w-28 text-center">
            <div
                className={`rounded-sm border-4 border-primary bg-accent p-1 shadow-md transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:rotate-1`}
            >
                <img
                    src={person?.avatar?.formats?.thumbnail?.url || FALLBACK_PORTRAIT}
                    alt=""
                    loading="lazy"
                    className={`aspect-square w-full rounded-sm object-cover bg-${person?.color || 'accent'}`}
                />
            </div>
            <figcaption className="mx-1 -mt-1 rounded-sm border border-primary bg-accent px-1.5 py-1 leading-tight">
                <p className="m-0 text-xs font-bold">{name}</p>
                <p className="m-0 text-[10px] text-secondary">
                    {title}
                    {year && <span className="font-mono"> · {year}</span>}
                </p>
                {note && <p className={`m-0 text-[10px] italic ${ORANGE}`}>{note}</p>}
            </figcaption>
        </figure>
    )
    return person ? (
        <Link
            to={`/community/profiles/${person.squeakId}`}
            state={{ newWindow: true }}
            className="group block no-underline"
            title={name}
        >
            {frame}
        </Link>
    ) : (
        <div className="group">{frame}</div>
    )
}

// Who currently holds a title, from the Settlers wall
const titleOf = (role: string) => role.split(' · ')[0]
const specimenCount = (title: string) =>
    CLANS.flatMap(({ people }) => people).filter(({ role }) => titleOf(role) === title).length
// Everyone living in a genus's habitat, whatever their title
const population = (habitat: string) =>
    CLANS.filter(({ team }) => team === habitat).reduce((sum, { people }) => sum + people.length, 0)

// Plate 1: a row of genus cards; click one to open its field notes.
const FieldGuide = () => {
    const [open, setOpen] = useState<string | null>(null)
    const active = GENERA.find(({ genus }) => genus === open)
    return (
        <div data-scheme="secondary" className="rounded-md border border-primary bg-primary p-5 @md:p-6">
            <p className={eyebrowClass}>Plate 1</p>
            <h3 className="m-0 mt-1 text-2xl font-bold">A Field Guide to the Marketer</h3>
            <p className="m-0 mt-1 text-sm text-secondary">
                <i>Familia Posthogidae</i> · eight genera observed since 2020 · † no longer found in the wild · tap a
                genus for field notes
            </p>
            <div className="mt-4 grid gap-2 @md:grid-cols-2 @2xl:grid-cols-4">
                {GENERA.map(({ genus, group, species }) => {
                    const isOpen = open === genus
                    const extinct = species.filter((sp) => sp.extinct).length
                    return (
                        <button
                            key={genus}
                            type="button"
                            aria-expanded={isOpen}
                            onClick={() => setOpen(isOpen ? null : genus)}
                            className={`rounded border px-3 py-2.5 text-left transition-colors ${
                                isOpen
                                    ? 'border-orange bg-accent dark:border-orange-dark'
                                    : 'border-primary hover:bg-accent'
                            }`}
                        >
                            <p className={`m-0 text-base font-bold italic ${isOpen ? ORANGE : ''}`}>{genus}</p>
                            <p className="m-0 text-xs text-secondary">
                                {group} · {species.length} species{extinct ? ` · ${extinct} †` : ''}
                            </p>
                        </button>
                    )
                })}
            </div>
            {active && (
                <div className="mt-3 grid gap-4 rounded border border-primary bg-accent p-4 @xl:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
                    <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-sm">
                        <dt className="font-mono text-[10px] uppercase tracking-wide text-secondary">Genus</dt>
                        <dd className="m-0 font-bold italic">{active.genus}</dd>
                        <dt className="font-mono text-[10px] uppercase tracking-wide text-secondary">Habitat</dt>
                        <dd className="m-0">{active.habitat}</dd>
                        <dt className="font-mono text-[10px] uppercase tracking-wide text-secondary">Population</dt>
                        <dd className="m-0">{population(active.habitat)} in the wild</dd>
                        <dt className="font-mono text-[10px] uppercase tracking-wide text-secondary">Field notes</dt>
                        <dd className="m-0">{active.notes}</dd>
                    </dl>
                    <ul className="m-0 list-none space-y-1.5 p-0 text-sm">
                        {active.species.map(({ name, title, year, extinct }) => {
                            const count = specimenCount(title)
                            return (
                                <li
                                    key={name}
                                    className={`flex flex-wrap items-baseline gap-x-2 ${extinct ? 'opacity-70' : ''}`}
                                >
                                    <span className="font-bold italic">
                                        {active.genus.charAt(0)}. {name}
                                        {extinct && ' †'}
                                    </span>
                                    <span className="text-secondary">{title}</span>
                                    <span className="font-mono text-xs text-secondary">{year}</span>
                                    {count > 0 && <span className={`font-mono text-xs ${ORANGE}`}>{count} alive</span>}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )}
        </div>
    )
}

/* ---------- the page ---------- */

export default function EvolutionExhibit(): JSX.Element {
    return (
        <>
            <SEO
                title={`${TITLE} - PostHog`}
                description="How marketing at PostHog evolved between 2020 and 2026, told as a museum exhibit."
                image="/images/og/default.png"
            />
            <ReaderView
                body={{ type: 'plain' }}
                title={TITLE}
                hideTitle
                hideRightSidebar
                hideAppOptions
                showQuestions={false}
                leftSidebar={<MuseumMenu activeUrl="/museum/exhibits/evolution" />}
            >
                <div className="prose mx-auto max-w-5xl space-y-12 dark:prose-invert">
                    {/* Header */}
                    <header className="not-prose flex flex-col gap-6 @xl:flex-row @xl:items-start">
                        <div className="min-w-0 flex-1">
                            <p className={eyebrowClass}>{EYEBROW}</p>
                            <h1 className="m-0 mt-3 text-4xl font-bold leading-none @md:text-6xl">{TITLE}</h1>
                            <p className="m-0 mt-2 text-xl font-semibold text-secondary">{SUBTITLE}</p>
                            <p className="m-0 mt-4 inline-block border-y border-primary py-1.5 font-mono text-xs text-secondary">
                                {PLAQUE}
                            </p>
                            <div className="mt-6 grid gap-x-5 gap-y-1 @md:grid-cols-[auto_1fr]">
                                <p className={`${eyebrowClass} pt-1.5`}>Curator's note</p>
                                <div className="space-y-3">
                                    {CURATORS_NOTE.map((paragraph) => (
                                        <p key={paragraph} className="m-0 text-sm">
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <img
                            src={hog('research_8bfa53dab7')}
                            alt=""
                            className="w-40 shrink-0 self-center @xl:w-48 @xl:self-start"
                        />
                    </header>

                    {/* Hall */}
                    <Hall number="I" title="The Tribe">
                        <ThenNow
                            then={{
                                when: '2020',
                                value: '1',
                                caption: 'graphic designer. Still here.',
                            }}
                            now={{ when: '2026', value: '29', caption: 'people, eight teams.' }}
                        />
                        <TwoCol
                            left={
                                <Fact>
                                    More people joined in <span className={ORANGE}>2025</span> than in the four years
                                    before it combined.
                                </Fact>
                            }
                            right={
                                <Vitrine
                                    title="People who joined marketing, per year"
                                    notes={[
                                        {
                                            label: 'Specimen',
                                            text: 'Onboarding issues and first posthog.com PRs.',
                                        },
                                    ]}
                                >
                                    <BarChart data={JOINED_PER_YEAR} max={15} />
                                </Vitrine>
                            }
                        />

                        <p className={eyebrowClass}>The settlers · please do not tap on the glass</p>
                        <div className="flex flex-wrap justify-center gap-3">
                            {CLANS.flatMap(({ people }) => people).map((person) => (
                                <Portrait key={person.name} {...person} />
                            ))}
                        </div>
                        <div className="rounded-md border-2 border-dashed border-primary p-4">
                            <p className={`m-0 text-[10px] font-semibold uppercase tracking-wide ${ORANGE}`}>
                                The ancestors
                            </p>
                            <ul className="m-0 mt-2 flex list-none flex-wrap gap-x-5 gap-y-1.5 p-0">
                                {ANCESTORS.map(({ name, role }) => (
                                    <li key={name} className="text-sm">
                                        <span className="font-bold">{name}</span>
                                        <span className="text-secondary"> · {role}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Hall>

                    {/* Hall */}
                    <Hall number="II" title="The Strata">
                        <Fact>
                            Between December 2024 and September 2026, marketing split, merged or renamed a team{' '}
                            <span className={ORANGE}>about once every two months</span>.
                        </Fact>
                        <Vitrine
                            title="Cross-section of the dig site · oldest layers first · scroll →"
                            notes={[{ label: 'Excavation note', text: EXCAVATION_NOTE }]}
                        >
                            <ol className="m-0 flex snap-x list-none gap-2 overflow-x-auto p-0 pb-2 [scrollbar-width:thin]">
                                {STRATA.map(({ layer, date, text }, i) => (
                                    <li
                                        key={layer}
                                        className={`flex w-44 shrink-0 snap-start flex-col rounded border border-primary text-sm ${
                                            i === STRATA.length - 1 ? 'border-orange dark:border-orange-dark' : ''
                                        }`}
                                    >
                                        <div
                                            className={`border-b border-primary px-3 py-2 ${i % 2 ? 'bg-accent' : ''}`}
                                            style={{ borderBottomWidth: 3 + Math.round((i / (STRATA.length - 1)) * 6) }}
                                        >
                                            <p
                                                className={`m-0 text-[10px] font-semibold uppercase tracking-wide ${ORANGE}`}
                                            >
                                                {layer}
                                            </p>
                                            <p className="m-0 font-mono text-xs text-secondary">{date}</p>
                                        </div>
                                        <p className="m-0 px-3 py-2 leading-snug">
                                            <Rich text={text} />
                                        </p>
                                    </li>
                                ))}
                            </ol>
                        </Vitrine>
                        <FieldGuide />
                    </Hall>

                    {/* Hall */}
                    <Hall
                        number="III"
                        title="Footfall"
                        intro="Once the tribe was established, it set out to colonise new territory. The first frontier was posthog.com."
                    >
                        <ThenNow
                            then={{
                                when: '2020',
                                value: '135K',
                                caption: 'pageviews in year one.',
                            }}
                            now={{
                                when: '2026',
                                value: '19.1M',
                                caption: 'pageviews so far this year.',
                            }}
                        />
                        <TwoCol
                            left={
                                <>
                                    <Fact>
                                        About <span className={ORANGE}>140×</span> year one.
                                    </Fact>
                                    <Fact>2025 more than doubled 2024. 2026 caught up by September.</Fact>
                                </>
                            }
                            right={
                                <Vitrine
                                    title="posthog.com pageviews per year (millions)"
                                    notes={[
                                        {
                                            label: 'Specimen',
                                            text: 'Every posthog.com pageview on record. 2026 is January to September.',
                                        },
                                    ]}
                                >
                                    <BarChart
                                        data={PAGEVIEWS}
                                        max={20}
                                        format={(v) => (v < 1 ? v.toFixed(2) : v.toFixed(1))}
                                    />
                                </Vitrine>
                            }
                        />
                    </Hall>

                    {/* Hall */}
                    <Hall number="IV" title="The Population" intro="The second frontier was the user base itself.">
                        <ThenNow
                            accent={BLUE}
                            then={{
                                when: '2020',
                                value: '4,903',
                                caption: 'signed up in year one.',
                            }}
                            now={{
                                when: '2026',
                                value: '612,000+',
                                caption: 'signed up in 2026 so far.',
                            }}
                        />
                        <TwoCol
                            left={
                                <>
                                    <Fact>
                                        Roughly <span className={BLUE}>doubled every year</span>. 2026 beat all of 2025
                                        by June.
                                    </Fact>
                                    <Fact>
                                        First 10,000 users: 17 months. Now: every <span className={BLUE}>3.5 days</span>
                                        .
                                    </Fact>
                                    <Fact>Three busiest days ever: September 14, 23 and 28, 2026.</Fact>
                                </>
                            }
                            right={
                                <Vitrine
                                    title="Months it took to reach each milestone"
                                    notes={[
                                        {
                                            label: 'Reading it',
                                            text: 'Every milestone since 2023 came faster than the last.',
                                        },
                                        { label: 'Specimen', text: 'Every new user, including invited teammates.' },
                                    ]}
                                >
                                    <HBarChart data={MILESTONES} unit="mo" accent="fill-blue" />
                                </Vitrine>
                            }
                        />
                    </Hall>

                    {/* Hall */}
                    <Hall
                        number="V"
                        title="The Oral Tradition"
                        intro="Since September 2022, every newcomer gets one question: how did you hear about us?"
                    >
                        <ol className="m-0 list-none divide-y divide-primary border-y border-primary p-0">
                            {AGES.map(({ name, years, text, color }) => (
                                <li key={name} className="grid grid-cols-[1rem_minmax(0,1fr)] gap-3 py-3">
                                    <span aria-hidden="true" className={`mt-1.5 size-3 rounded-full ${color}`} />
                                    <div>
                                        <p className="m-0 text-lg font-bold leading-tight">
                                            {name}{' '}
                                            <span className="ml-1 font-mono text-xs font-normal text-secondary">
                                                {years}
                                            </span>
                                        </p>
                                        <p className="m-0 mt-0.5 text-sm text-secondary">{text}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                        <Vitrine
                            title="Radiocarbon dating report"
                            notes={[
                                {
                                    label: 'Method',
                                    text: 'Each specimen is dated to the month it first appears in a signup answer. Calibrated to the Gregorian calendar. Margin of error: about one sprint.',
                                },
                            ]}
                        >
                            <p className="m-0 font-mono text-[11px] uppercase tracking-wide text-secondary">
                                Too old to date · already present when the dig began, Sep 2022
                            </p>
                            <div className="mt-2 flex flex-wrap gap-1.5">
                                {BEDROCK_FOSSILS.map((name) => (
                                    <span
                                        key={name}
                                        className="rounded-full border border-primary bg-accent px-2.5 py-1 text-sm font-semibold"
                                    >
                                        {name}
                                    </span>
                                ))}
                            </div>
                            <p className="m-0 mt-5 font-mono text-[11px] uppercase tracking-wide text-secondary">
                                Dated specimens · scroll →
                            </p>
                            <CarbonTimeline fossils={LATER_FOSSILS} />
                            <p className="m-0 mt-1 flex flex-wrap gap-x-4 text-xs text-secondary">
                                <span>
                                    <span className="mr-1.5 inline-block size-2.5 rounded-full bg-blue" />
                                    AI assistant
                                </span>
                                <span>
                                    <span className="mr-1.5 inline-block size-2.5 rounded-full bg-red" />
                                    Creator
                                </span>
                                <span>
                                    <span className="mr-1.5 inline-block size-2.5 rounded-full border border-primary bg-current opacity-60" />
                                    Platform
                                </span>
                            </p>
                        </Vitrine>
                    </Hall>

                    {/* Hall */}
                    <Hall number="VI" title="The Artifacts">
                        <ThenNow
                            then={{
                                when: '2020',
                                value: '39',
                                caption: 'pieces published. Nearly all blog posts.',
                            }}
                            now={{
                                when: 'Since 2019',
                                value: '730+',
                                caption:
                                    'pieces in the archive, plus 13.1M YouTube views this year, ads on five platforms, a billboard and a blimp.',
                            }}
                        />
                        <div className="grid gap-3 @md:grid-cols-2 @3xl:grid-cols-3">
                            {CASES.map(({ id, title, then, now, note, spark }) => (
                                <article
                                    key={id}
                                    data-scheme="secondary"
                                    className="flex flex-col gap-2 rounded-md border border-primary border-t-4 border-t-primary bg-primary p-4"
                                >
                                    <p className="m-0 font-mono text-[11px] uppercase tracking-wide text-secondary">
                                        Case {id}
                                    </p>
                                    <h3 className="m-0 text-xl font-bold leading-tight">{title}</h3>
                                    <div className="mt-1 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-start gap-2">
                                        <div>
                                            <p className="m-0 font-mono text-[11px] text-secondary">{then.when}</p>
                                            <p className="m-0 my-0.5 text-3xl font-bold leading-none text-secondary">
                                                {then.value}
                                            </p>
                                            <p className="m-0 text-xs leading-snug text-secondary">{then.caption}</p>
                                        </div>
                                        <span aria-hidden="true" className={`pt-5 font-bold ${ORANGE}`}>
                                            →
                                        </span>
                                        <div>
                                            <p className="m-0 font-mono text-[11px] text-secondary">{now.when}</p>
                                            <p className={`m-0 my-0.5 text-3xl font-bold leading-none ${ORANGE}`}>
                                                <CountUp value={now.value} />
                                            </p>
                                            <p className="m-0 text-xs leading-snug text-secondary">{now.caption}</p>
                                        </div>
                                    </div>
                                    {spark && (
                                        <div className="mt-auto pt-2">
                                            <Sparkline data={spark} />
                                        </div>
                                    )}
                                    {note && (
                                        <p className="m-0 border-t border-dashed border-primary pt-2 text-sm">{note}</p>
                                    )}
                                </article>
                            ))}
                        </div>
                    </Hall>

                    <footer className="not-prose border-t border-primary pt-4">
                        <p className="m-0 max-w-prose text-xs leading-relaxed text-secondary">
                            <strong className="text-primary">Curatorial footnote.</strong> {FOOTNOTE}
                        </p>
                    </footer>
                </div>
            </ReaderView>
        </>
    )
}
