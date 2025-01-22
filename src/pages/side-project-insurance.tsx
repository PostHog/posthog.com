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
import CloudinaryImage from 'components/CloudinaryImage'
import { useLayoutData } from 'components/Layout/hooks'

const Teams: React.FC = () => {
    const { fullWidthContent } = useLayoutData()
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
        }
    `)
    return (
        <Layout>
            <SEO
                title="Side project insurance"
                description="If you get hit with an unexpectedly large bill in your first month because of a spike in volume, we'll refund it."
                image={`/images/og/side-project-insurance.png`}
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
            >
                <section className="mx-auto">
                    <div className="flex flex-col md:items-center md:justify-end md:flex-row-reverse gap-8 md:gap-2">
                        <div className="md:flex-1">
                            <div className="@container article-content">
                                <div className="opacity-70 text-[15px] font-medium">Unexpected stardom?</div>
                                <h1 className="text-2xl">Side project insurance</h1>
                                <p>
                                    So you got your first bill from PostHog – <em>and it came out of nowhere?!</em>{' '}
                                    <strong>(Rest assured, we’ll get this worked out.)</strong>
                                </p>
                                <CloudinaryImage
                                    src="https://res.cloudinary.com/dmukukwp6/image/upload/money_f6cb7907a3.png"
                                    width={600}
                                    className={`w-full md:w-96 md:float-right md:ml-4 ${
                                        fullWidthContent ? '' : 'md:-mr-12'
                                    }`}
                                />
                                <p>
                                    We often see this happen with a side project that unexpectedly goes viral (like{' '}
                                    <Link href="https://x.com/jxnlco/status/1777673854770463072" external>
                                        this one
                                    </Link>{' '}
                                    or{' '}
                                    <Link href="https://x.com/gabriel__xyz/status/1876188221983633535" external>
                                        this one
                                    </Link>
                                    ).
                                </p>
                                <p>
                                    First, congrats on your unexpected stardom! It’s the best kind of problem to have –
                                    and hopefully the beginning of great things to come.
                                </p>
                                <p>
                                    Let’s face it, PostHog isn’t successful because we nickel and dime builders with
                                    hobby projects. We’re here to grow with you for the long-term.
                                </p>
                                <p>
                                    That’s why{' '}
                                    <strong>
                                        if you get hit with an unexpectedly large bill in your first month because of a
                                        spike in volume, we'll refund it.
                                    </strong>
                                </p>
                                <p>Here’s the criteria:</p>
                                <ul>
                                    <li>
                                        It’s your first bill of &gt;$1 or usage spiked &gt;200% compared to average use
                                        over the past three months
                                    </li>
                                    <li>You or your company doesn’t have revenue, or is a hobby project</li>
                                </ul>
                                <p>
                                    Just reach out using the in-app Help button and we'll get you sorted out. You may
                                    also be interested in{' '}
                                    <Link href="/docs/billing/estimating-usage-costs#how-to-reduce-your-posthog-costs">
                                        ways to reduce your costs
                                    </Link>{' '}
                                    going forward.
                                </p>

                                <p>Keep building amazing things. We can't wait to see what you do next! 💫</p>

                                <hr className="my-8" />
                                <p className="!text-sm">
                                    Please note: this is not an <em>actual insurance policy</em>. We offer this out of
                                    the goodness of our hearts and reserve the right to make the final call on any
                                    refunds.
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
