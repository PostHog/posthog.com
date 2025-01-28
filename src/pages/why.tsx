import React from 'react'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import Link from 'components/Link'
import PostLayout from 'components/PostLayout'
import Tooltip from 'components/Tooltip'
import { graphql, useStaticQuery } from 'gatsby'
import slugify from 'slugify'
import TeamPatch from 'components/TeamPatch'
import { CallToAction } from 'components/CallToAction'
import { useUser } from 'hooks/useUser'
import SidebarSection from 'components/PostLayout/SidebarSection'
import { Contributor } from 'components/PostLayout/Contributors'
import { productMenu } from '../navs'
import RoadmapPreview from 'components/RoadmapPreview'
import { PRODUCT_COUNT } from '../constants'

const Teams: React.FC = () => {
    const { james, supportTeam } = useStaticQuery(graphql`
        {
            james: squeakProfile(squeakId: { eq: 27732 }) {
                squeakId
                firstName
                lastName
                avatar {
                    url
                }
                companyRole
            }
            supportTeam: squeakTeam(squeakId: { eq: 128 }) {
                id
                name
                slug
                profiles {
                    data {
                        id
                        attributes {
                            color
                            firstName
                            lastName
                            avatar {
                                data {
                                    attributes {
                                        url
                                    }
                                }
                            }
                        }
                    }
                }
                crest {
                    data {
                        attributes {
                            url
                        }
                    }
                }
                crestOptions {
                    textColor
                    textShadow
                    fontSize
                    frame
                    frameColor
                    plaque
                    plaqueColor
                    imageScale
                    imageXOffset
                    imageYOffset
                }
                leadProfiles {
                    data {
                        id
                    }
                }
            }
        }
    `)

    return (
        <Layout>
            <SEO
                title="Why PostHog?"
                description="Because it's literally designed to be a no-brainer"
                image={`/images/og/why-posthog.png`}
            />
            <PostLayout
                title={'Handbook'}
                hideSurvey
                sidebar={
                    <SidebarSection title="From the desk of...">
                        <div className="-mx-4 pt-1">
                            <Contributor
                                url={james.squeakId && `/community/profiles/${james.squeakId}`}
                                image={james.avatar?.url}
                                name={`${james.firstName} ${james.lastName}`}
                                role={james.companyRole}
                                text
                            />
                        </div>
                    </SidebarSection>
                }
                menu={[{ name: 'Explore products', url: undefined }, ...productMenu.children]}
                tableOfContents={[
                    {
                        url: 'posthog-has-the-lowest-pricing-for-every-product',
                        value: 'We have the lowest pricing for every product',
                        depth: 0,
                    },
                    {
                        url: 'we-just-do-the-right-thing',
                        value: 'We just do the right thing',
                        depth: 0,
                    },
                    {
                        url: 'support-from-actually-technical-people',
                        value: 'Support from actually technical people',
                        depth: 0,
                    },
                    {
                        url: 'posthog-is-more-popular-than-every-other-product',
                        value: 'PostHog is more popular than every other product',
                        depth: 0,
                    },
                    {
                        url: 'all-your-user-context-in-one-place',
                        value: 'All your user context in one place',
                        depth: 0,
                    },
                    {
                        url: 'who-doesnt-posthog-work-well-for',
                        value: "Who doesn't PostHog work well for?",
                        depth: 0,
                    },
                    {
                        url: 'every-product-has-a-huge-free-tier',
                        value: 'Every product has a huge free tier',
                        depth: 0,
                    },
                ]}
            >
                <section className="mx-auto">
                    <div className="flex flex-col md:items-center md:justify-end md:flex-row-reverse gap-8 md:gap-2">
                        <div className="md:flex-1">
                            <div className="@container article-content">
                                <div className="opacity-70 text-[15px] font-medium">Why PostHog?</div>

                                <h2 id="posthog-has-the-lowest-pricing-for-every-product">
                                    We have the lowest pricing for every product
                                </h2>
                                <p>
                                    Sure, it's great to have everything you need in one place, but only if you know
                                    you're getting a deal.
                                </p>
                                <p>
                                    PostHog is always cheaper than the cheapest major competitor, so you know you don't
                                    have to compare pricing for each new product.
                                </p>
                                <p>
                                    And every product has a generous free tier, so you can always try it out before
                                    paying anything at all. Without talking to sales, because our pricing is completely transparent. 
                                </p>

                                <h2 id="we-just-do-the-right-thing">We just do the right thing</h2>
                                <p>
                                    We asked our customers - one of the top reasons they recommend PostHog is
                                    our brand. To us that means we do the right thing for our customers:
                                </p>
                                <ul>
                                    <li>
                                        <Link to="/blog/analytics-pricing">We roll out pricing decreases</Link> to our
                                        entire existing customer base
                                    </li>
                                    <li>
                                        We have <Link href="/side-project-insurance">side hustle insurance</Link> - we
                                        refund if your thing goes viral by accident on HackerNews
                                    </li>
                                    <li>
                                        We've got{' '}
                                        <Link href="https://github.com/posthog/posthog" external>
                                            a huge open source project
                                        </Link>{' '}
                                        (&gt;20k stars), and beyond this you can inspect all our code in our repo so you
                                        can see exactly what we're doing with your data
                                    </li>
                                    <li>
                                        <Link href="/sales">We don't do outbound sales</Link> - we'd rather spend our
                                        time building more products
                                    </li>
                                    <li>
                                        You can <Link href="/pricing">see all our pricing publicly</Link> –{' '}
                                        <em>there's a reason other companies don't list their pricing!</em>
                                    </li>
                                    <li>
                                        We don’t sell products at a loss - we run the company default alive. This means
                                        we’ve never had layoffs, and we don’t take huge risks that could result in the
                                        company disappearing overnight.
                                    </li>
                                    <li>We don’t screw you on contract terms like auto-renewal.</li>
                                    <li>
                                        You can use all our stuff monthly until you want to lock things in with us. We
                                        don’t pressure people.
                                    </li>
                                    <li>
                                        The way we write our content. <Link href="/posts">Just read it</Link> and you’ll
                                        get what we mean. It’s more honest and not like marketing-speak you've come to
                                        expect from other companies - it actively helps developers build successful
                                        products. That’s our mission.
                                    </li>
                                    <li>
                                        PostHog has zero intention of selling our business. We want to see just how
                                        crazy huge this gigantic software stack can get - and we think that it will
                                        reach at least $100bn in value. We’ll be around and fighting for a long, long
                                        time. It’s our life’s work.
                                    </li>
                                    <li>
                                        You can also see how our entire company operates - our{' '}
                                        <Link href="/handbook/growth/sales/overview">manual for our salespeople</Link>,{' '}
                                        <Link href="/handbook/growth/marketing">marketing team</Link>, and so on. You
                                        can even <Link href="/handbook/people/compensation">see what they’re paid</Link>{' '}
                                        - it’s all in our public handbook. You won't get this level of transparency from
                                        most companies!
                                    </li>
                                    <li>
                                        <Link href="/merch">Cool company merch</Link> you'll actually <em>want</em> to
                                        wear
                                    </li>
                                </ul>

                                <p>
                                    The reason we uniquely love doing all these sorts of things is that{' '}
                                    <strong>
                                        we grow because of our reputation on the internet, whereas every single
                                        competitor grows by salespeople.
                                    </strong>{' '}
                                    We are very, very proudly inbound only. This aligns us with customers. Long term,
                                    that is what wins.
                                </p>

                                <h2 id="support-from-actually-technical-people">
                                    Support from actually technical people
                                </h2>
                                <p>
                                    You can <Link href="/teams">literally see the engineers</Link> that built each of
                                    our products on our website.
                                </p>

                                <div className="@lg:float-right ml-2 @lg:ml-8 mb-6 mt-2 @lg:mb-2 px-2 py-4 max-w-sm rounded border border-light dark:border-dark bg-accent dark:bg-accent-dark">
                                    <div className="grid grid-cols-2 @lg:grid-cols-5 group gap-12">
                                        <div className="max-w-32 mx-auto @lg:col-span-2 scale-150 @lg:scale-[1.65] @lg:hover:scale-[1.68] @lg:active:scale-[1.65] relative hover:-top-0.5 active:top-0.5 transition-all duration-100 ml-2 -mt-2 @lg:mt-0">
                                            <Link to={`/teams/${supportTeam.slug}`}>
                                                <TeamPatch
                                                    name={supportTeam.name}
                                                    imageUrl={supportTeam.crest?.data?.attributes?.url}
                                                    {...supportTeam.crestOptions}
                                                    className="w-full"
                                                />
                                            </Link>
                                        </div>
                                        <div className="@lg:col-span-3">
                                            <p className="!mb-2 !text-[15px] !leading-tight font-semibold">
                                                Meet our support engineers
                                                <span className="hidden @lg:inline"> on the front lines</span>:
                                            </p>

                                            <div className="flex flex-wrap justify-end -space-x-3 ml-3 mb-3" dir="rtl">
                                                {supportTeam.profiles.data
                                                    .slice()
                                                    .sort((a, b) => {
                                                        const aIsLead = supportTeam.leadProfiles.data.some(
                                                            ({ id: leadID }) => leadID === a.id
                                                        )
                                                        const bIsLead = supportTeam.leadProfiles.data.some(
                                                            ({ id: leadID }) => leadID === b.id
                                                        )
                                                        return aIsLead === bIsLead ? 0 : aIsLead ? -1 : 1
                                                    })
                                                    .reverse()
                                                    .map(
                                                        ({
                                                            id,
                                                            attributes: { firstName, lastName, avatar, color },
                                                        }) => {
                                                            const name = [firstName, lastName].filter(Boolean).join(' ')
                                                            return (
                                                                <Tooltip
                                                                    key={id}
                                                                    content={name}
                                                                    placement="top"
                                                                    className="first:-ml-3 relative hover:z-10 transform scale-100 hover:scale-125 transition-all"
                                                                >
                                                                    <img
                                                                        src={avatar?.data?.attributes?.url}
                                                                        className={`size-10 rounded-full bg-${
                                                                            color ?? 'accent'
                                                                        } border border-light dark:border-dark`}
                                                                        alt={name}
                                                                    />
                                                                </Tooltip>
                                                            )
                                                        }
                                                    )}
                                            </div>

                                            <CallToAction to={`/teams/${supportTeam.slug}`} type="secondary" size="xs">
                                                Learn about this team
                                            </CallToAction>
                                        </div>
                                    </div>
                                </div>

                                <p>
                                    We’ve also got dedicated support people - they’ve all got engineering backgrounds
                                    too. If they can’t answer, you get the OG engineers mentioned above. Frankly our
                                    support engineers answer most stuff when it gets deep. We don’t want you waiting on
                                    our triage.
                                </p>

                                <p>
                                    Even our marketing team is mostly engineers. Our salespeople can all write code,
                                    too.
                                </p>

                                <p>
                                    <em>“Everybody codes”</em> has made it to{' '}
                                    <Link href="/handbook/values">our list of values</Link>.
                                </p>

                                <h2 id="posthog-is-more-popular-than-every-other-product">
                                    PostHog is more popular than every other product
                                </h2>
                                <p>
                                    Nobody wants to be a sheep, but it's probably a good sign when something is very popular.
                                </p>
                                <p>
                                    We have over 100,000 customers using our products. Just under a quarter of a million
                                    engineers use us. That's far, far more than any other vendor – most have around 1-3k
                                    customers. It's what happens when the internet loves you.
                                </p>
                                <p>
                                    65% of every Y Combinator batch (the world's best accelerator for startups) use our
                                    products.
                                </p>

                                <h2 id="all-your-user-context-in-one-place">
                                    All your user context in one place
                                </h2>
                            
                                <p>
                                    We put all the context you need in one place, so you can focus on your users instead
                                    of fixing endless data integrations.
                                </p>
                                <p>
                                    <strong>We have {PRODUCT_COUNT}+ products today,</strong> but even if we don't offer
                                    it <em>yet</em>, we will eventually.
                                </p>
                                <p>
                                    We're going to build every piece of SaaS you need to make your product successful.
                                    You read that right. We've already got the world's best track record at delivering
                                    them by being the widest with so many customers.
                                </p>
                                <p>
                                    You've probably already seen the products we do have. For the stuff we don't, you
                                    can <Link to="/roadmap">see our entire public roadmap</Link> and ask for what you
                                    need.
                                </p>
                                
                                <RoadmapPreview />

                                <div className="text-center mb-8">
                                    <Link
                                        href="/roadmap"
                                        className="border border-b-3 border-light dark:border-dark p-2 rounded text-center text-sm w-full block hover:bg-white hover:dark:bg-accent-dark hover:border-border hover:dark:border-border-dark hover:border-b-3 relative hover:-top-px active:top-px"
                                    >
                                        Explore the roadmap
                                    </Link>
                                </div>

                                <h2 id="who-doesnt-posthog-work-well-for">Who doesn't PostHog work well for?</h2>
                                <p>
                                    People who don't like letting their engineering teams make decisions. If you are
                                    happy to let engineering drive in your organization, then we're usually a slam dunk.
                                </p>
                                <p>
                                    Sometimes we might not have <em>every</em> feature compared to a leading competitor,
                                    but we've seen pretty much no one cares about that compared to the advantages of
                                    having everything in one place – and we'll always keep building!
                                </p>

                                <h2 id="every-product-has-a-huge-free-tier">Every product has a huge free tier</h2>
                                <p>
                                    Just try it. You don't even need to put in a credit card. We give away more free
                                    stuff than anyone else. What you'd pay $100s for on other platforms, you get here
                                    for free, every month.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 mt-8">
                                    <CallToAction to="https://app.posthog.com/signup">Get started - free</CallToAction>
                                    <CallToAction to="/product-analytics" type="secondary">
                                        Explore products
                                    </CallToAction>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </PostLayout>
        </Layout>
    )
}

export default Teams
