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
        <div className="bg-tan py-2 sticky top-0 z-10 mb-6 about-nav">
            <AnchorScrollNavbar
                autoScroll={breakpoints.md}
                className="max-w-screen-xl mx-auto lg:px-8 px-4"
                menu={menu}
            />
        </div>
    )
}
