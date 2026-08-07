import React from 'react'

const LOGO_SRC = 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/build_mode_button_79d51b3276.png'

/** build mode wordmark plus the standing tagline. */
export default function Masthead(): JSX.Element {
    return (
        <div className="flex shrink-0 flex-col items-start gap-4 @3xl:w-44 @3xl:pt-2">
            <img src={LOGO_SRC} alt="build mode" className="h-auto w-36 @3xl:w-40" />
            <p className="m-0 text-sm font-bold leading-snug">
                Tools, tactics, and taste
                <br />
                for <span className="text-red">product builders.</span>
            </p>
        </div>
    )
}
