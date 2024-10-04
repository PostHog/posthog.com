import React from 'react'

export const ProductVideo = ({ videoLight, videoDark, autoPlay = true, classes = '' }) => {
    return (
        <div className="mb-4 border border-light dark:border-dark rounded bg-accent dark:bg-accent-dark">
            <video
                autoPlay={autoPlay}
                loop
                muted
                playsInline
                src={videoLight}
                className={`${videoDark ? 'dark:hidden' : ''} ${classes}`}
                controls={!autoPlay}
            ></video>
            {videoDark && (
                <video
                    autoPlay={autoPlay}
                    loop
                    muted
                    playsInline
                    src={videoDark}
                    className={`hidden dark:block ${classes}`}
                    controls={!autoPlay}
                ></video>
            )}
        </div>
    )
}
