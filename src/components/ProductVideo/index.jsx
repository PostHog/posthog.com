import React from 'react'

export const ProductVideo = ({
    videoLight,
    videoDark,
    autoPlay = true,
    muted = true,
    loop = true,
    classes = '',
    background = true,
}) => {
    return (
        <div className={`mb-4 rounded ${background ? 'border border-primary bg-accent' : ''}`}>
            <video
                autoPlay={autoPlay}
                loop={loop}
                muted={muted}
                playsInline
                src={videoLight}
                className={`my-0 ${videoDark ? 'dark:hidden' : ''} ${classes}`}
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
