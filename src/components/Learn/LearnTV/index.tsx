import React from 'react'
import OSButton from 'components/OSButton'
import LearnTVPlayer from './Player'
import Transcript from './Transcript'
import type { LearnVideo } from './videos'

/** The Learn TV window body: the player, the video details with Up next, and the transcript. AppWindow's toolbar shows
 * "Learn TV". */
export default function LearnTV({ video }: { video: LearnVideo }): JSX.Element {
    return (
        <div className="@container w-full h-full flex flex-col min-h-1" data-app="LearnTV">
            {/* The video title is not shown, but screen readers still get a heading for the window. */}
            <h1 className="sr-only">{video.title}</h1>
            {/* The primary scheme, so bg-primary and bg-accent are the panel (#FDFDF8) and chrome (#E5E7E0) neutrals of the
                Learn TV design. Without it, the window's tertiary scheme makes the player chrome a darker grey. */}
            <div data-scheme="primary" className="flex flex-col bg-primary">
                <LearnTVPlayer video={video}>
                    {(player) => (
                        // Details and transcript, from the Learn TV design
                        <div className="font-rounded bg-primary px-4 pt-5 pb-6 @2xl:px-6 grid gap-6 @2xl:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] items-start">
                            <div className="min-w-0">
                                <p className="m-0 text-xs font-bold text-secondary">{video.series}</p>
                                <p className="m-0 mt-1.5 text-[15px] leading-6 text-secondary">{video.description}</p>
                                {video.next && (
                                    <div className="mt-4 rounded-md border border-primary bg-light dark:bg-dark overflow-hidden">
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
        </div>
    )
}
