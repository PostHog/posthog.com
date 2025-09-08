import React from 'react'

export const ProductVideo = ({ videoLight, videoDark, autoPlay = true, muted = true, loop = true, classes = '' }) => {
    return (
        <div className="mb-4 border border-primary rounded bg-accent">
            <video
                autoPlay={autoPlay}
                loop={loop}
                muted={muted}
                playsInline
                src={videoLight}
                className={`${videoDark ? 'dark:hidden' : ''} ${classes}`}
                controls={!autoPlay}
            ></video>
            {videoDark && (
                <video
                    autoPlay={autoPlay}
                    loop={loop}
                    muted={muted}
                    playsInline
                    src={videoDark}
                    className={`hidden dark:block ${classes}`}
                    controls={!autoPlay}
                ></video>
            )}
        </div>
    )
}
