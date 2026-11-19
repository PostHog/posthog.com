import React from 'react'

/**
 * The trap, drawn: you ask for `/home`, you get bounced to onboarding, and the step you're bounced
 * to won't let you past. Loops on a CSS timeline so the figure tells the story without a caption
 * doing the work.
 *
 * Animation is CSS rather than framer-motion because nothing here reacts to the reader – it just
 * runs. `prefers-reduced-motion` freezes it on the state that matters: stuck, with the error up.
 */
export default function RedirectLoop(): JSX.Element {
    return (
        <div className="@container">
            <style>{`
                @keyframes ph-url { 0%,18% { opacity:1 } 22%,100% { opacity:0 } }
                @keyframes ph-redirected { 0%,18% { opacity:0 } 22%,100% { opacity:1 } }
                @keyframes ph-press { 0%,54% { transform:none } 58%,64% { transform:scale(.96) } 68%,100% { transform:none } }
                @keyframes ph-cursor {
                    0%,30% { opacity:0; transform:translate(-1.5rem,1rem) }
                    38%,52% { opacity:1; transform:translate(0,0) }
                    56%,72% { opacity:1; transform:translate(0,.15rem) }
                    80%,100% { opacity:0; transform:translate(0,0) }
                }
                @keyframes ph-error { 0%,66% { opacity:0 } 72%,92% { opacity:1 } 100% { opacity:0 } }
                @media (prefers-reduced-motion: reduce) {
                    .ph-loop * { animation: none !important }
                    .ph-loop .ph-was { opacity: 0 }
                }
            `}</style>

            <div className="ph-loop rounded border border-primary bg-accent p-3 dark:bg-accent-dark @md:p-4">
                {/* The address bar: what you asked for, replaced by where you ended up. */}
                <div className="relative mb-3 rounded border border-primary bg-primary px-2 py-1 font-code text-[0.7em] leading-snug">
                    <span className="ph-was text-secondary line-through" style={{ animation: 'ph-url 6s infinite' }}>
                        /home
                    </span>
                    <span
                        className="absolute inset-0 flex items-center px-2 text-primary"
                        style={{ animation: 'ph-redirected 6s infinite' }}
                    >
                        /onboarding/step-1
                        <span className="ml-2 text-[0.85em] not-italic text-secondary">← redirected</span>
                    </span>
                </div>

                <span className="block text-[0.75em] font-bold text-primary">Name your workspace</span>

                <div className="mt-1 rounded border border-primary bg-primary px-2 py-1 text-[0.75em] text-primary">
                    Acme
                </div>

                <span
                    className="mt-1 block text-[0.7em] leading-snug text-red"
                    style={{ animation: 'ph-error 6s infinite' }}
                >
                    That name is already taken
                </span>

                <div className="relative mt-2 inline-block">
                    <span
                        className="inline-flex select-none items-center rounded border border-primary bg-accent px-2 py-1 text-[0.7em] font-bold text-primary dark:bg-accent-dark"
                        style={{ animation: 'ph-press 6s infinite' }}
                    >
                        Next
                    </span>
                    {/* The pointer, arriving and clicking on the same beat as the press. */}
                    <svg
                        viewBox="0 0 12 16"
                        aria-hidden="true"
                        className="absolute -bottom-2 -right-1 w-3 fill-primary stroke-white stroke-1"
                        style={{ animation: 'ph-cursor 6s infinite' }}
                    >
                        <path d="M1 1l9.5 7-4 .6 2.2 4.6-2 1-2.2-4.6L1 12z" />
                    </svg>
                </div>
            </div>
        </div>
    )
}
