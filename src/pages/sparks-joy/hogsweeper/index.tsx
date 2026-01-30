import React from 'react'
import Explorer from 'components/Explorer'
import SEO from 'components/seo'
import Minesweeper from 'components/Minesweeper'

export default function MinesweeperPage(): JSX.Element {
    return (
        <>
            <SEO
                title="Hogsweeper - PostHog"
                description="The classic Minesweeper game, PostHog style."
                image={`/images/og/default.png`}
            />
            <Explorer template="generic" slug="hogsweeper" title="Hogsweeper" fullScreen>
                <div className="@container flex flex-col h-full">
                    <Minesweeper />
                </div>
            </Explorer>
        </>
    )
}
