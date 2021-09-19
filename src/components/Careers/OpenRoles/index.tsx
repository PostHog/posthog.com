import { WorkableSnippet } from 'components/WorkableSnippet'
import React, { useEffect } from 'react'
import { Structure } from '../../Structure'

interface WorkableWindow extends Window {
    whr_embed: (id: number, options: Record<string, string>) => void
    whr: (document: Document) => any
}

declare const window: WorkableWindow

export const OpenRoles = () => {
    useEffect(() => {
        if (window && window.whr) {
            window.whr(document).ready(function () {
                window.whr_embed(456332, { detail: 'titles', base: 'departments', zoom: 'country' })
            })
        }
    })

    // Some of the styling overrides here lives in src/styles/workable-overrides.css
    return (
        <div id="open-roles">
            <Structure.Section width="5xl" className="">
                <h2 className="text-center mb-12">Open roles</h2>

                <div className="md:flex">
                    <div className="flex-1 max-w-md md:mr-16 md:mt-4 mb-12 md:mb-0 mx-auto">
                        <p>We take exceptional people when they come along - and we really mean that!</p>
                        <p>
                            <strong>Don’t see a specific role listed?</strong> That doesn't mean we won't have a spot
                            for you.
                        </p>
                        <p className="mt-2">
                            We take applications seriously - you won't just end up in a candidate database. We make
                            quick decisions, and if the timing isn’t quite right, we’ll do our best to provide insight
                            into a better time to apply.
                        </p>
                        <p>
                            <em>
                                When you click through some of these jobs might say 'San Francisco' or 'London', but
                                we're hiring all over the world.
                            </em>
                        </p>
                    </div>
                    <div className="flex-1 max-w-md mx-auto">
                        <WorkableSnippet />
                    </div>
                </div>
            </Structure.Section>
        </div>
    )
}
