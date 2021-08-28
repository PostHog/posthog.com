import React from 'react'
import { Structure } from '../../Structure'
import { mergeClassList } from '../../../lib/utils'

export const WorkingAtPostHog = () => {
    return (
        <div className="pt-24 text-white text-center" id="working-at-posthog">
            <Structure.Section width="5xl">
                <header className="text-white text-lg">Watch a day in the life of our graphic designer, Lottie!</header>
                <div className="mt-8 h-0 pb-fluid-video relative">
                    <iframe
                        src="https://www.youtube.com/embed/xlODCLrZyvM"
                        className="absolute top-0 left-0 w-full h-full rounded-lg"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen=""
                        frameBorder="0"
                    ></iframe>
                </div>
            </Structure.Section>
        </div>
    )
}
