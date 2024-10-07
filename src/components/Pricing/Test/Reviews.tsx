import React from 'react'
import { section, SectionHeader } from './Sections'
import { IconStarFilled, IconStar } from '@posthog/icons'
import Link from 'components/Link'
import { graphql, useStaticQuery } from 'gatsby'

export const Stars = ({ rating }) => {
    return (
        <div className="inline-grid grid-cols-5">
            {Array.from({ length: 5 }, (_, i) => {
                const filled = i + 1 <= rating
                const Icon = filled ? IconStarFilled : IconStar
                const diffPercentage = i + 1 <= Math.ceil(rating) ? (rating % 1) * 100 : 0
                return (
                    <div key={i} className="relative">
                        <Icon className={`size-5 text-yellow`} />
                        {!filled && (
                            <div style={{ width: `${diffPercentage}%` }} className="absolute inset-0 overflow-hidden">
                                <IconStarFilled className="size-5 text-yellow" />
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

const Review = ({
    title,
    star_rating,
    comment_answers: {
        love: { value: love },
        hate: { value: hate },
        benefits: { value: benefits },
    },
}) => {
    return (
        <div className="space-y-4 border-t first:border-t-0 border-light dark:border-dark pt-8 first:pt-0 mb-8">
            <div>
                <p className="text-lg mb-1">
                    <strong>{title}</strong>
                </p>
                <Stars rating={star_rating} />
            </div>

            <div>
                <strong>What do you like best about PostHog?</strong>
                <p>{love}</p>
            </div>

            <div>
                <strong>What do you dislike about PostHog?</strong>
                <p>{hate}</p>
            </div>

            <div>
                <strong>What problems is PostHog solving and how is that benefiting you?</strong>
                <p>{benefits}</p>
            </div>
        </div>
    )
}

export const Reviews = () => {
    const { recentReviews, allReviews } = useStaticQuery(graphql`
        query G2Query {
            recentReviews: allG2Review(
                sort: { fields: attributes___submitted_at, order: DESC }
                filter: { attributes: { star_rating: { gte: 4.5 } } }
                limit: 3
            ) {
                nodes {
                    id
                    attributes {
                        title
                        star_rating
                        submitted_at
                        comment_answers {
                            love {
                                value
                            }
                            hate {
                                value
                            }
                            benefits {
                                value
                            }
                        }
                    }
                }
            }
            allReviews: allG2Review {
                nodes {
                    attributes {
                        star_rating
                    }
                }
                totalCount
            }
        }
    `)

    const totalRating = parseFloat(
        (
            allReviews.nodes.reduce((acc, { attributes: { star_rating } }) => acc + star_rating, 0) /
            allReviews.nodes.length
        ).toFixed(1)
    )

    return (
        <section id="g2-reviews" className={`${section} `}>
            <SectionHeader>
                <h3 className="mb-2">Latest reviews</h3>
            </SectionHeader>
            <div className="grid md:grid-cols-12 gap-4 md:gap-12 my-6">
                <div className="col-span-full md:col-span-3">
                    <label className="block font-semibold opacity-70">Overall rating</label>
                    <div className="flex items-baseline gap-1.5">
                        <h3 className="mb-1">{totalRating}</h3>
                        <span className="opacity-60 text-sm font-semibold">{allReviews.totalCount} reviews</span>
                    </div>
                    <Stars rating={totalRating} />
                    <p className="text-sm mt-2 text-opacity-75">
                        Reviews collected by{' '}
                        <Link href="https://www.g2.com/products/posthog/reviews" external>
                            G2
                        </Link>
                    </p>
                </div>
                <div className="col-span-full md:col-span-9">
                    {recentReviews.nodes.map((review) => (
                        <Review key={review.id} {...review.attributes} />
                    ))}
                </div>
            </div>
        </section>
    )
}
