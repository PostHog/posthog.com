import React from 'react'

export const ProductVideo = ({ videoLight, videoDark, alt, classes }) => {
    return (
        <div className="mb-4 border border-light dark:border-dark rounded bg-accent dark:bg-accent-dark">
            <video
                autoPlay
                loop
                muted
                playsInline
                src={videoLight}
                className={`${videoDark ? 'dark:hidden' : ''} ${classes}`}
            ></video>
            {videoDark && (
                <video
                    autoPlay
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
