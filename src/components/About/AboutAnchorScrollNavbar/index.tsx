import React from 'react'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import NotProductIcons from 'components/NotProductIcons'
import AnchorScrollNavbar from 'components/AnchorScrollNavbar'

const menu = [
    {
        name: 'Our story',
        url: 'our-story',
        icon: NotProductIcons.story,
    },
    {
        name: "Why we're different",
        url: 'transparency',
        icon: NotProductIcons.transparency,
    },
    {
        name: 'Core team',
        url: 'team',
        icon: NotProductIcons.coreTeam,
    },
    {
        name: 'Investors',
        url: 'investors',
        icon: NotProductIcons.investors,
    },
]

export const AboutAnchorScrollNavbar = () => {
    const breakpoints = useBreakpoint()
    return (
        <div className="bg-tan/90 backdrop-blur py-2 sticky -top-1 z-10 mb-6 border-y border-dashed border-gray-accent-light about-nav">
            <AnchorScrollNavbar autoScroll={breakpoints.md} className="max-w-screen-xl mx-auto lg:px-8" menu={menu} />
        </div>
    )
}
