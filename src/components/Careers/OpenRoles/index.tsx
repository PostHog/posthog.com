import { WorkableSnippet } from 'components/WorkableSnippet'
import React, { useEffect } from 'react'
import { Structure } from '../../Structure'
import './style.scss'

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
        <div className="pt-24 text-white text-center" id="open-roles">
            <Structure.Section width="5xl" className="bg-black bg-opacity-20 rounded-lg p-6 md:p-12 lg:py-24 lg:px-12">
                <Structure.SectionHeader
                    title="Open roles"
                    titleTag="h2"
                    leadText="When you click through some of these jobs might say 'San Francisco' or 'London', but we're hiring all over the world. Our team is proactively looking for the following:"
                    leadTextClassName="opacity-80"
                />

                <WorkableSnippet />
                <div className="clear-both"></div>

                <div className="mt-12 max-w-xl mx-auto text-gray-100 text-opacity-90 text-black p-16">
                    <p>
                        We take exceptional people when they come along - and we really mean that! Don’t see a specific
                        role listed? That doesn't mean we won't have a spot for you.
                    </p>
                    <p className="mt-2">
                        We take applications seriously - you won't just end up in a candidate database. We make quick
                        decisions, and if the timing isn’t quite right, we’ll do our best to provide insight into a
                        better time to apply.
                    </p>
                </div>
            </Structure.Section>
        </div>
    )
}
