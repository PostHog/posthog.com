import React, { useRef, useState } from 'react'
import ScrollArea from 'components/RadixUI/ScrollArea'
import OSButton from 'components/OSButton'
import BrowserFrame from './BrowserFrame'
import SnufflSite from './Snuffl'
import ChatWidget from './Snuffl/ChatWidget'
import SurveyPopover from './Snuffl/SurveyPopover'
import InstrumentationOverlay from './overlay/InstrumentationOverlay'
import { SnufflPageId } from './overlay/types'
import './snuffl.css'

export default function HowPostHogWorks(): JSX.Element {
    const [page, setPage] = useState<SnufflPageId>('ride')
    const [overlayOn, setOverlayOn] = useState(false)
    const viewportRef = useRef<HTMLDivElement | null>(null)
    // The frame body doubles as the overlay's coordinate stage and the query
    // root for annotation targets (it contains the scrolled site content and
    // the floating chat/survey widgets).
    const frameBodyRef = useRef<HTMLDivElement | null>(null)

    const navigate = (next: SnufflPageId) => {
        setPage(next)
        viewportRef.current?.scrollTo({ top: 0 })
    }

    return (
        <div className="@container flex flex-col h-full">
            <div
                data-scheme="secondary"
                className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 border-b border-primary bg-primary shrink-0"
            >
                <div className="flex-1 basis-96">
                    <h1 className="text-base font-bold m-0">How PostHog works</h1>
                    <p className="text-sm text-secondary m-0">
                        Meet Snuffl (Uber for hedgehogs). It's fake, but it's instrumented with PostHog exactly like a
                        real product. Toggle the overlay to see what's measured, why, and the code behind it.
                    </p>
                </div>
                <OSButton variant="primary" size="md" onClick={() => setOverlayOn((on) => !on)}>
                    {overlayOn ? 'Hide instrumentation' : 'Show instrumentation'}
                </OSButton>
            </div>
            <BrowserFrame bodyRef={frameBodyRef} className="flex-1 min-h-0 m-2">
                <ScrollArea viewportRef={viewportRef}>
                    <div className="snuffl-root sn-site">
                        <SnufflSite page={page} onNavigate={navigate} />
                    </div>
                </ScrollArea>
                {page === 'ride' && <ChatWidget />}
                {page === 'highway' && <SurveyPopover />}
                <InstrumentationOverlay on={overlayOn} setOn={setOverlayOn} page={page} stageRef={frameBodyRef} />
            </BrowserFrame>
        </div>
    )
}
