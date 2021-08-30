import React from 'react'
import SectionLink from './SectionLink'

export default function NextArticle({ hideAnchor, breakpoints, next, previous }) {
    return (
        <>
            <section>
                <hr
                    style={{
                        width:
                            hideAnchor || breakpoints.lg
                                ? '100%'
                                : `calc(100% + ${breakpoints.xl ? '224px + 8rem' : '224px + 16rem'})`,
                        marginLeft:
                            hideAnchor || breakpoints.lg
                                ? '0px'
                                : `calc(${breakpoints.xl ? '-224px - 4rem' : '-224px - 8rem'})`,
                    }}
                    className="my-9 bg-transparent border-t-2 border-r-0 border-l-0 border-b-0 border-dashed border-gray-accent-light dark:border-gray-accent-dark"
                />
                <div className="flex justify-between">
                    <SectionLink link={previous} previous />
                    <SectionLink link={next} />
                </div>
            </section>
        </>
    )
}
