import React from 'react'
import AnimateIntoView from './AnimateIntoView'

export default function Section({ children, ...other }) {
    return (
        <AnimateIntoView>
            <section {...other} className="my-12 md:my-24 px-5 max-w-[960px] mx-auto justify-between">
                <div className="flex items-center md:space-x-4 space-y-6 md:space-y-0 flex-col md:flex-row">
                    {children}
                </div>
            </section>
        </AnimateIntoView>
    )
}
