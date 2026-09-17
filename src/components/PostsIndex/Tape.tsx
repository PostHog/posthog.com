import React from 'react'

// Torn-off strip outline, reused for both the fill and the edge stroke
const TAPE_PATH = 'M6 2 L114 1 L119 7 L115 13 L120 20 L116 27 L119 34 L113 41 L5 42 L1 34 L5 26 L0 19 L4 12 L1 6 Z'

/** Translucent strip of masking tape with torn ends. */
export default function Tape({ className = '' }: { className?: string }): JSX.Element {
    return (
        <svg viewBox="0 0 120 42" fill="none" className={`drop-shadow-sm ${className}`} aria-hidden="true">
            <path d={TAPE_PATH} fill="#FFFDF2" fillOpacity="0.68" />
            <path d={TAPE_PATH} stroke="#000" strokeOpacity="0.06" strokeWidth="1" />
            {/* sheen along the top edge */}
            <path d="M6 2 L114 1 L116 4 L7 5 Z" fill="#fff" fillOpacity="0.5" />
        </svg>
    )
}
