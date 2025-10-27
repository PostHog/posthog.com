import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { Stars } from './Reviews'
import { Link as ScrollLink } from 'react-scroll'
import { DebugContainerQuery } from 'components/DebugContainerQuery'

export default function Header() {
    // const { allReviews } = useStaticQuery(graphql`
    //     query {
    //         allReviews: allG2Review {
    //             nodes {
    //                 attributes {
    //                     star_rating
    //                 }
    //             }
    //             totalCount
    //         }
    //     }
    // `)

    // const totalRating = parseFloat(
    //     (
    //         allReviews.nodes.reduce((acc, { attributes: { star_rating } }) => acc + star_rating, 0) /
    //         allReviews.nodes.length
    //     ).toFixed(1)
    // )

    return (
        <>
            <h1 className="text-2xl mb-1">PostHog Cloud</h1>
            {/* <ScrollLink to="g2-reviews" offset={-120} smooth className="flex items-center gap-2 mb-4 cursor-pointer">
                <Stars rating={totalRating} />
                <span className="text-[15px]">{allReviews.totalCount} reviews</span>
            </ScrollLink> */}
        </>
    )
}
