import React from 'react'
import { Structure } from '../../Structure'
import { mergeClassList } from '../../../lib/utils'

export const WorkingAtPostHog = () => {
    return (
        <div id="working-at-posthog">
            <Structure.Section
                width="4xl"
                className="py-12 border-gray-accent-light border-dashed border-l-0 border-r-0 border-t border-b flex items-center"
            >
                <div className="flex-0 max-w-xs mr-4">
                    <h3 className="text-4xl">
                        Watch a day in the life of our graphic designer, <span className="text-orange">Lottie!</span>
                    </h3>
                </div>
                <div className="flex-1">
                    <div className="h-0 pb-fluid-video relative">
                        <iframe
                            src="https://www.youtube.com/embed/xlODCLrZyvM"
                            className="absolute top-0 left-0 w-full h-full rounded-lg"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen=""
                            frameBorder="0"
                        ></iframe>
                    </div>
                </div>
            </Structure.Section>
        </div>
    )
}
