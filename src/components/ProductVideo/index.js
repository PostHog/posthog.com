import React from 'react'

export const ProductVideo = ({ videoLight, videoDark, autoplay = true, classes = '' }) => {
    return (
        <div className="mb-4 border border-light dark:border-dark rounded bg-accent dark:bg-accent-dark">
            <video
                autoPlay={autoplay}
                loop
                muted
                playsInline
                src={videoLight}
                className={`${videoDark ? 'dark:hidden' : ''} ${classes}`}
            ></video>
            {videoDark && (
                <video
                    autoPlay={autoplay}
                    loop
                    muted
                    playsInline
                    src={videoDark}
                    className={`hidden dark:block ${classes}`}
                ></video>
            )}
        </div>
    )
}
