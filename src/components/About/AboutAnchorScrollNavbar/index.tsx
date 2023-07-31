import React from 'react'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import { CoreTeam, Investors, Story, Transparency } from 'components/NotProductIcons'
import AnchorScrollNavbar from 'components/AnchorScrollNavbar'

const menu = [
    {
        name: 'Our story',
        url: 'our-story',
        icon: <Story />,
    },
    {
        name: "Why we're different",
        url: 'transparency',
        icon: <Transparency />,
    },
    {
        name: 'Core team',
        url: 'team',
        icon: <CoreTeam />,
    },
    {
        name: 'Investors',
        url: 'investors',
        icon: <Investors />,
    },
]

export const AboutAnchorScrollNavbar = () => {
    const breakpoints = useBreakpoint()
    return (
        <div className="hidden bg-tan/90 backdrop-blur py-2 sticky -top-1 z-10 mb-6 about-nav">
            <AnchorScrollNavbar autoScroll={breakpoints.md} className="max-w-screen-xl mx-auto lg:px-8" menu={menu} />
        </div>
    )
}
