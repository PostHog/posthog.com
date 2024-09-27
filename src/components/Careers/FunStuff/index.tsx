import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import Stickers from 'components/ProfileStickers'
import slugify from 'slugify'
import Link from 'components/Link'
import Masonry from 'react-masonry-css'
import TeamMember from 'components/TeamMember'

const Frame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="bg-white dark:bg-accent-dark rounded-md shadow-lg overflow-hidden mb-8">{children}</div>
)

const FunStuff: React.FC = () => {
    const breakpointColumnsObj = {
        default: 3,
        1024: 2,
        640: 1,
    }

    return (
        <section className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-center text-4xl xl:text-5xl">
                Live, Laugh, LEquip every developer to build successful products
            </h2>
            <p className="text-center text-lg mb-8 font-semibold opacity-75">Our jobs are zero fun.</p>

            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="flex -ml-8 w-auto"
                columnClassName="pl-8 bg-clip-padding"
            >
                <Frame>
                    <StaticImage src="./images/is-ga-illegal.png" alt="Is Google Analytics Illegal?: A microsite" />
                    <div className="p-4">
                        <h3 className="text-xl mb-1">IsGoogleAnalyticsIllegal.com</h3>
                        <p className="text-[15px] mb-0">
                            We spun up{' '}
                            <Link href="https://isgoogleanalyticsillegal.com" externalNoIcon>
                                a microsite
                            </Link>{' '}
                            when courts across the EU started to find Google Analytics in violation of GDPR.
                        </p>
                    </div>
                </Frame>

                <Frame>
                    <div className="px-4 pt-4">
                        <h3 className="text-xl mb-1">Found favor Hacker News</h3>
                        <p className="text-[15px] mb-0">
                            We appear on Hacker News quite often. And we don't even submit all of our own posts!
                        </p>
                    </div>
                    <StaticImage src="./images/hn-posts.png" alt="Found favor with the Hacker News crowd" />
                </Frame>

                <Frame>
                    <div className="px-4 pt-4">
                        <h3 className="text-xl mb-1">Patrick Collison tweeted about us</h3>
                        <p className="text-[15px] mb-0">
                            When the co-founder of Stripe{' '}
                            <Link href="https://x.com/patrickc/status/1728009393118032343" externalNoIcon>
                                tweets
                            </Link>{' '}
                            about you unsolicitedly, it's a big deal.
                        </p>
                    </div>
                    <StaticImage src="./images/patrick-collison-tweet.png" alt="Patrick Collison liked our website" />
                </Frame>

                <Frame>
                    <div className="px-4 pt-4">
                        <h3 className="text-xl mb-1">6+ hour GitHub star live stream</h3>
                        <p className="text-[15px] mb-4">
                            When we hit 10,000 stars on GitHub, <TeamMember name="Ian Vanagas" /> read out the username
                            for{' '}
                            <Link href="https://www.youtube.com/watch?v=SD7B2teuLXk" externalNoIcon>
                                every single one of them
                            </Link>
                            .
                        </p>
                    </div>
                    <StaticImage src="./images/thanking-stars.jpg" alt="Thanking 10,000 GitHub stars" />
                    {/* <StaticImage src="./images/github-stars.png" alt="GitHub stars" /> */}
                </Frame>

                <Frame>
                    <div className="px-4 pt-4">
                        <h3 className="text-xl mb-1">
                            Enterprise mode<sup className="text-xs">TM</sup> on PostHog.com
                        </h3>
                        <p className="text-[15px] mb-4">
                            Same website, just bigger words to make the enterprise audience more comfortable.
                        </p>
                        <p className="text-sm mb-4">Find it under the Account menu (top right) on the homepage.</p>
                    </div>
                    <StaticImage src="./images/enterprise-mode.png" alt="Enterprise mode on PostHog.com" />
                    {/* <StaticImage src="./images/github-stars.png" alt="GitHub stars" /> */}
                </Frame>
            </Masonry>
        </section>
    )
}

export default FunStuff
