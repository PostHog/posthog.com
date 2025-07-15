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
            <div className="absolute inset-0">
                <div className="text-center">
                    {/* <WordArt text="PostHog" theme="rainbow" fontSize={60} />
                    <WordArt text="Analytics" theme="superhero" fontSize={40} /> */}

                    <WordArt text="If you were looking for a sign..." theme="superhero" fontSize={64} />

                    {/*                     
                    <WordArt text="If you were looking for a sign..." theme="rainbow" fontSize={40} />
                    <WordArt text="If you were looking for a sign..." theme="blues" fontSize={40} />
                    <WordArt text="If you were looking for a sign..." theme="radial" fontSize={40} />
                    <WordArt text="If you were looking for a sign..." theme="tilt" fontSize={40} />
                    <WordArt text="If you were looking for a sign..." theme="purple" fontSize={40} />
                    <WordArt text="If you were looking for a sign..." theme="horizon" fontSize={40} />
                    <WordArt text="If you were looking for a sign..." theme="italicOutline" fontSize={40} />
                    <WordArt text="If you were looking for a sign..." theme="slate" fontSize={40} /> */}
                </div>
            </div>
        </div>
    )
}
