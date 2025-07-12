import React from 'react'
import CTA from 'components/Home/CTA'
import ReactPaint from 'components/ReactPaint'
import WordArt, { wordArtThemes } from 'components/WordArt'

export default function GettingStartedSlide() {
    return (
        <div className="h-full p-12 flex flex-col justify-center bg-light dark:bg-dark text-primary">
            {/* <CTA /> */}
            <div className="mt-8 space-y-8">
                {/* <div className="text-center">
                    <WordArt text="PostHog" theme="rainbow" fontSize={60} />
                    <WordArt text="Analytics" theme="superhero" fontSize={40} />
                </div> */}
                <div className="reactpaint w-full h-full">
                    <ReactPaint />
                </div>
            </div>
        </div>
    )
}
