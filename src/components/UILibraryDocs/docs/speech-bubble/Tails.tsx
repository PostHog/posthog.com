import React from 'react'
import { SpeechBubble } from 'components/UI/SpeechBubble'

export default function Tails(): JSX.Element {
    return (
        <div className="@container">
            <div className="grid gap-8 p-4 @sm:grid-cols-2 @xl:grid-cols-3">
                {(['top', 'bottom', 'left', 'right'] as const).flatMap((tail) =>
                    (['start', 'center', 'end'] as const).map((tailAlign) => (
                        <div key={`${tail}-${tailAlign}`} className="min-w-0 space-y-3">
                            <div className="text-sm text-secondary">
                                {tail} / {tailAlign}
                            </div>
                            <SpeechBubble tail={tail} tailAlign={tailAlign} className="min-h-24 text-sm">
                                Replay the session. Find the problem. Check the result.
                            </SpeechBubble>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
