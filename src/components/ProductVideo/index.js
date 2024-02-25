import React from 'react'

export const ProductVideo = ({ videoLight, videoDark, alt, classes }) => {
    return (
        <div
            className={`mb-4 border border-light dark:border-dark rounded p-4 bg-accent dark:bg-accent-dark ${classes}`}
        >
            {videoLight && (
                <video
                    src={videoLight}
                    alt={alt}
                    className={`dark:hidden max-w-full ${classes}`}
                    loop
                    autoPlay
                    muted
                    //controls
                />
            )}
            {videoDark && (
                <video
                    src={videoDark}
                    alt={alt}
                    className={`hidden dark:block max-w-full ${classes}`}
                    loop
                    autoPlay
                    muted
                    //controls
                />
            )}
        </div>
    )
}
