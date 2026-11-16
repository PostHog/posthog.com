import React from 'react'
import OSButton from 'components/OSButton'
import LearnTVPlayer from './Player'
import Transcript from './Transcript'
import type { LearnVideo } from './videos'

/** The Learn TV window: the video title, the player, the video details with Up next, and the transcript. */
export default function LearnTV({ video }: { video: LearnVideo }): JSX.Element {
    return (
        <div className="@container w-full h-full flex flex-col min-h-1" data-app="LearnTV">
            {/* The window's title bar (the route has no toolbar), styled like AppWindow's: "Learn TV" on the left,
                the video title centered, and room on the right for the window's close button. */}
            <div className="relative flex min-h-[34px] items-center bg-primary py-0.5 pl-1 pr-10">
                <p className="m-0 ml-1.5 shrink-0 font-rounded text-sm font-semibold text-primary">Learn TV</p>
                <h1 className="pointer-events-none absolute inset-x-24 m-0 truncate text-center font-rounded text-sm font-semibold leading-tight text-primary">
                    {video.title}
                </h1>
            </div>
            <LearnTVPlayer video={video}>
                {(player) => (
                    // Details and transcript, from the Learn TV design
                    <div className="font-rounded bg-primary px-4 pt-5 pb-6 @2xl:px-6 grid gap-6 @2xl:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] items-start">
                        <div className="min-w-0">
                            <p className="m-0 text-xs font-bold text-secondary">{video.series}</p>
                            <p className="m-0 mt-1.5 text-[15px] leading-6 text-secondary">{video.description}</p>
                            {video.next && (
                                <div className="mt-4 rounded-md border border-primary bg-white dark:bg-dark overflow-hidden">
                                    <p className="m-0 px-3 py-2 text-xs font-bold text-secondary bg-accent border-b border-primary">
                                        Up next in the series
                                    </p>
                                    <div className="flex items-center gap-3 px-3 py-2.5">
                                        <p className="m-0 flex-1 min-w-0 text-[15px] font-bold text-primary">
                                            {video.next.title}
                                        </p>
                                        {video.next.url ? (
                                            <OSButton asLink to={video.next.url} variant="primary" size="sm">
                                                Play next
                                            </OSButton>
                                        ) : (
                                            <OSButton variant="primary" size="sm" disabled>
                                                Coming soon
                                            </OSButton>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <Transcript {...player} captionsUrl={video.captions} />
                    </div>
                )}
            </LearnTVPlayer>
        </div>
    )
}
