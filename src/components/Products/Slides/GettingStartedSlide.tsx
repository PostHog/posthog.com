import React from 'react'
import CTA from 'components/Home/CTA'
import WordArt, { wordArtThemes } from 'components/WordArt'
import MSPaint from 'components/MSPaint'
import StopImage from '../../../../static/images/stop.png'

export default function GettingStartedSlide({ initialState }: { initialState: any }) {
    const coloringPageImage = StopImage

    return (
        <div className="h-full flex flex-col justify-center bg-light dark:bg-dark text-primary relative">
            <MSPaint
                // Pass the image URL to preload it as line art
                initialImage={coloringPageImage}
                canvasSize={{ width: 1066, height: 614 }}
                initialState={initialState}
            />
            {/* <WordArt text="PostHog" theme="rainbow" fontSize={60} />
                    <WordArt text="Analytics" theme="superhero" fontSize={40} /> */}

            <div className="size-12 bg-red inline-block absolute top-0 left-0"></div>
            <WordArt text="Get started!!" theme="superhero" fontSize={48} className="absolute top-16 left-24" />
            <WordArt
                text="If you were looking for a sign..."
                theme="rainbow"
                fontSize={40}
                className="absolute top-24 left-48"
            />
            <WordArt text="Follow your dreams" theme="blues" fontSize={40} className="absolute top-36 right-12" />
            <WordArt text="AI installation" theme="italicOutline" fontSize={24} className="absolute top-72 left-24" />
            <WordArt text="Not AI install" theme="italicOutline" fontSize={24} className="absolute top-72 right-24" />

            {/*                     
                    <WordArt text="If you were looking for a sign..." theme="rainbow" fontSize={40} />
                    <WordArt text="If you were looking for a sign..." theme="radial" fontSize={40} />
                    <WordArt text="If you were looking for a sign..." theme="tilt" fontSize={40} />
                    <WordArt text="If you were looking for a sign..." theme="purple" fontSize={40} />
                    <WordArt text="If you were looking for a sign..." theme="horizon" fontSize={40} />
                    <WordArt text="If you were looking for a sign..." theme="italicOutline" fontSize={40} />
                    <WordArt text="If you were looking for a sign..." theme="slate" fontSize={40} /> */}
        </div>
    )
}
