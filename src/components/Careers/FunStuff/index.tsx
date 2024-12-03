import React from 'react'
import Masonry from 'react-masonry-css'
import CloudinaryImage from 'components/CloudinaryImage'

const FunThing: React.FC<{
    image: React.ReactNode
    title: string
    content: string
    link?: string
    imagePosition: 'top' | 'bottom'
}> = ({ image, title, content, link, imagePosition }) => (
    <div
        className={`bg-white dark:bg-accent-dark rounded-md shadow-lg overflow-hidden mb-4 lg:mb-6 xl:mb-8 flex flex-col ${imagePosition === 'top' ? 'flex-col-reverse' : ''
            }`}
    >
        {link ? (
            <a href={link} target="_blank" rel="noopener">
                {image}
            </a>
        ) : (
            image

        )}
        <div className={`p-4 ${imagePosition === 'top' ? '' : ''}`}>
            <h3 className="text-xl mb-1 leading-tight" dangerouslySetInnerHTML={{ __html: title }} />
            <div
                className="text-[15px] [&_p]:text-[15px] [&_p]:mb-2 last:[&_p]:mb-0"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </div>
    </div>
)

const frameContents = [
    {
        title: 'IsGoogleAnalyticsIllegal.com',
        content: `We spun up <a href="https://isgoogleanalyticsillegal.com">a microsite</a> when courts across the EU started to find Google Analytics in violation of GDPR.`,
        link: 'https://isgoogleanalyticsillegal.com',
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/is_ga_illegal_7d83c3dd73.png"
                alt="Is Google Analytics Illegal?: A microsite"
            />
        ),
        imagePosition: 'bottom',
    },
    {
        title: '<strike>That one time</strike> we found favor on Hacker News',
        content: "We appear on Hacker News quite often. And we don't even submit all of our own posts!",
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/hn_posts_7c19b2a52c.png"
                alt="Found favor with the Hacker News crowd"
            />
        ),
        imagePosition: 'top',
    },
    {
        title: 'Patrick Collison tweeted about us',
        content: `When the co-founder of Stripe <a href="https://x.com/patrickc/status/1728009393118032343" target="_blank" rel="noopener">tweets</a> about you unsolicitedly, it's a big deal.`,
        link: 'https://x.com/patrickc/status/1728009393118032343',
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/patrick_collison_tweet_f4857ff3d1.png"
                alt="Patrick Collison liked our website"
            />
        ),
        imagePosition: 'bottom',
    },
    {
        title: '6+ hour GitHub star live stream',
        content: `When we hit 10,000 stars on GitHub, <TeamMember name="Ian Vanagas" /> live streamed to thank <a href="https://www.youtube.com/watch?v=SD7B2teuLXk" target="_blank" rel="noopener">every single one of them</a>.`,
        link: 'https://www.youtube.com/watch?v=SD7B2teuLXk',
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/thanking_stars_1c89650b8e.jpg"
                alt="6+ hour GitHub star live stream"
            />
        ),
        imagePosition: 'bottom',
    },
    {
        title: '20k+ GitHub stars',
        content: `<p>We are honored to be the most popular open source Product OS on GitHub. (Yes, we defined the category, but still...)</p><p>Won't you <a href="https://github.com/PostHog/posthog" target="_blank" rel="noopener">be our next star?</a></p>`,
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/github_stars_7e1b503d8b.png"
                alt="20k+ GitHub stars"
            />
        ),
        imagePosition: 'bottom',
    },
    {
        title: `Enterprise mode<sup class="text-xs">TM</sup> on PostHog.com`,
        content: `<p>Same website, just with bigger words. It makes us more approachable to the suits.</p><p class="!text-sm">Find it under the Account menu (top right) on the homepage.</p>`,
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/enterprise_mode_1cf9836f42.png"
                alt="Enterprise mode on PostHog.com"
            />
        ),
        imagePosition: 'bottom',
    },
    {
        title: 'Built big things with small teams',
        content:
            'Our <a href="/data-warehouse">Data warehouse</a> was built by a team of two. Same with <a href="/session-replay">Session replay</a>. And we shipped a <a href="/web-analytics">Google Analytics replacement</a> with a team of one.',
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/web_analytics_94bfcaeaab.png"
                alt="Big products from small teams"
            />
        ),
        imagePosition: 'bottom',
    },
    {
        title: 'Wrote the ClickHouse manual that other companies use',
        content:
            "We literally wrote a <a href='/handbook/engineering/clickhouse'>ClickHouse manual</a> that other companies use.",
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/clickhouse_manual_066184063d.png"
                alt="ClickHouse manual"
            />
        ),
        imagePosition: 'bottom',
    },
    {
        title: 'Crazy popular with the YC crowd',
        content: 'One of the most adopted products by new YC startups',
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/yc_27f9836460.png"
                alt="One of the most adopted products by new YC startups"
            />
        ),
        imagePosition: 'top',
    },
    {
        title: 'PostHog for enterprise',
        content: "We built <a href='/enterprise'>a page</a> for selling to large enterprises. It is very serious.",
        link: '/enterprise',
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/enterprise_page_f24d150534.png"
                alt="Enterprise page"
            />
        ),
        imagePosition: 'top',
    },
    {
        title: 'Hedgehog mode',
        content:
            "It's like a Chia pet, but for hedgehogs. Find it inside PostHog by searching with <code>CMD + K</code>.",
        link: '',
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/hedgehog_mode_65d7c66acf.png"
                alt="Hedgehog mode"
            />
        ),
        imagePosition: 'bottom',
    },
    {
        title: 'DPA generator, featuring a Taylor Swift edition',
        content: "It's the most fun you've ever had filling out a legal document.",
        link: '/dpa',
        image: <CloudinaryImage src="https://res.cloudinary.com/dmukukwp6/image/upload/dpa_a05cbe57d5.png" alt="DPA generator" />,
        imagePosition: 'bottom',
    },
    {
        title: 'Human-readable privacy policy',
        content: "A privacy policy that won't put you to sleep. Be sure to check out the Tweet-style summary, too!",
        link: '/privacy',
        image: <CloudinaryImage src="https://res.cloudinary.com/dmukukwp6/image/upload/privacy_050678164a.png" alt="Human-readable privacy policy" />,
        imagePosition: 'bottom',
    },
    // {
    //     title: '',
    //     content: "",
    //     link: '',
    //     image: <CloudinaryImage src="./images/blah.png" alt="" />,
    //     imagePosition: 'bottom',
    // },
]

const FunStuff: React.FC = () => {
    const breakpointColumnsObj = {
        default: 3,
        1024: 2,
        640: 1,
    }

    return (
        <section className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-center text-4xl lg:text-5xl text-balance">
                Live, Laugh, LEquip every developer to build successful products
            </h2>
            <p className="text-center text-lg mb-8 font-semibold opacity-75">
                Our jobs are zero fun. Here are some things that have made it a little less insufferable.
            </p>

            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="flex -ml-4 lg:-ml-6 xl:-ml-8 w-auto"
                columnClassName="pl-4 lg:pl-6 xl:pl-8 bg-clip-padding"
            >
                {frameContents.map((frame, index) => (
                    <FunThing
                        key={index}
                        title={frame.title}
                        content={frame.content}
                        link={frame.link}
                        image={frame.image}
                        imagePosition={frame.imagePosition}
                    />
                ))}
            </Masonry>
        </section>
    )
}

export default FunStuff
