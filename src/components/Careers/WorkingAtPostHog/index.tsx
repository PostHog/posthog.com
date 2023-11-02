import React from 'react'
import { Structure } from '../../Structure'
import { mergeClassList } from '../../../lib/utils'

export const WorkingAtPostHog = () => {
    return (
        <div id="working-at-posthog">
            <Structure.Section width="4xl" className="py-12 md:flex items-center">
                <div className="flex-0 text-center mb-12 md:mb-0 md:text-left md:max-w-xs md:mr-4">
                    <h3 className="text-4xl">
                        Find out what it's like working at PostHog according to{' '}
                        <span className="text-red">our team!</span>
                    </h3>
                </div>
                <div className="flex-1">
                    <div className="h-0 pb-fluid-video relative">
                        <iframe
                            src="https://www.youtube-nocookie.com/embed/WOBH1Qy0xhA"
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
