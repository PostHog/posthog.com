import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { Stars } from './Reviews'

export default function Header() {
    const { allReviews } = useStaticQuery(graphql`
        query {
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

    const handleClick = () => {
        const el = document.getElementById('g2-reviews')

        window.scrollTo({
            top: el.getBoundingClientRect().top + window.pageYOffset - 108,
            behavior: 'smooth',
        })
    }

    return (
        <>
            <h1 className="mb-2">PostHog Cloud</h1>
            <button onClick={handleClick} className="flex items-center gap-2 mb-4">
                <Stars rating={totalRating} />
                <span className="text-red dark:text-yellow text-[15px] font-semibold">
                    {allReviews.totalCount} reviews
                </span>
            </button>
        </>
    )
}
