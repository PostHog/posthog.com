import React, { useCallback, useEffect, useState } from 'react'
import ReaderView from 'components/ReaderView'
import SEO from 'components/seo'
import Picker from 'components/ScalePrototype/Picker'
import Combined from 'components/ScalePrototype/variants/Combined'
import Compare from 'components/ScalePrototype/variants/Compare'

const variants = [
    { name: 'Combined', Component: Combined },
    { name: 'You vs. PostHog', Component: Compare },
]

export default function ScalePrototypePage(): JSX.Element {
    const [current, setCurrent] = useState(0)
    const [run, setRun] = useState(0)

    useEffect(() => {
        const initial = (parseInt(new URLSearchParams(window.location.search).get('v') ?? '', 10) || 1) - 1
        if (initial > 0 && initial < variants.length) {
            setCurrent(initial)
        }
    }, [])

    const select = useCallback((index: number) => {
        setCurrent(index)
        setRun((value) => value + 1)
        const url = new URL(window.location.href)
        url.searchParams.set('v', String(index + 1))
        window.history.replaceState(window.history.state, '', url)
    }, [])

    const replay = useCallback(() => setRun((value) => value + 1), [])

    const { Component } = variants[current]

    return (
        <>
            <SEO title="Scale prototype" description="Prototype variants for the scale and reliability page." noindex />
            <ReaderView
                hideLeftSidebar
                hideRightSidebar
                showQuestions={false}
                title="scale.prototype"
                hideTitle
                className="overflow-x-hidden"
            >
                <div className="not-prose @container pb-20" data-scheme="primary">
                    <Component key={`${current}-${run}`} />
                </div>
            </ReaderView>
            <Picker
                names={variants.map((variant) => variant.name)}
                current={current}
                onSelect={select}
                onReplay={replay}
            />
        </>
    )
}
