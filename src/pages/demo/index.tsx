import React, { useState, useEffect } from 'react'
import Explorer from 'components/Explorer'
import { Link } from 'gatsby'
import { CallToAction } from 'components/CallToAction'
import CloudinaryImage from 'components/CloudinaryImage'
import SEO from 'components/seo'
import { IconDice, IconFullScreen } from 'components/OSIcons/Icons'
import { Accordion } from 'components/RadixUI/Accordion'
import { IconFastForward, IconPauseFilled, IconPlayFilled } from '@posthog/icons'

// Add types for YouTube API to avoid TS errors
declare global {
    interface Window {
        YT: any;
        onYouTubeIframeAPIReady: (() => void) | null;
    }
}

function CustomVideoSection() {
    const [playerState, setPlayerState] = useState({
        isPlaying: true,
        player: null as any,
        volume: 100,
        isMuted: false,
        currentTime: 0,
        duration: 0,
        playbackRate: 1
    });
    const [isScrubbing, setIsScrubbing] = useState(false);
    const [scrubTime, setScrubTime] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (playerState.player && playerState.isPlaying && !isScrubbing) {
            interval = setInterval(() => {
                const currentTime = playerState.player.getCurrentTime();
                setPlayerState(prev => ({ ...prev, currentTime }));
            }, 250);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [playerState.player, playerState.isPlaying, isScrubbing]);

    useEffect(() => {
        window.onYouTubeIframeAPIReady = () => {
            const player = new window.YT.Player("youtube-player-demo", {
                host: "https://www.youtube-nocookie.com",
                videoId: "2jQco8hEvTI",
                playerVars: {
                    autoplay: 1,
                    controls: 0,
                    modestbranding: 1,
                    rel: 0
                },
                events: {
                    onStateChange: (event: any) => {
                        setPlayerState((prev: any) => ({
                            ...prev,
                            isPlaying: event.data === window.YT.PlayerState.PLAYING
                        }));
                    },
                    onReady: (event: any) => {
                        setPlayerState((prev: any) => ({
                            ...prev,
                            player: event.target,
                            duration: event.target.getDuration(),
                            currentTime: event.target.getCurrentTime()
                        }));
                        event.target.playVideo();
                    },
                    onPlaybackRateChange: (event: any) => {
                        setPlayerState((prev: any) => ({
                            ...prev,
                            playbackRate: event.target.getPlaybackRate()
                        }));
                    }
                }
            });
        };
        if (!window.YT) {
            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName("script")[0];
            if (firstScriptTag && firstScriptTag.parentNode) {
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            } else {
                document.body.appendChild(tag);
            }
        } else if (window.YT && window.YT.Player) {
            window.onYouTubeIframeAPIReady();
        }
        return () => {
            window.onYouTubeIframeAPIReady = null;
        };
    }, []);

    const handlePlayPause = () => {
        if (playerState.player) {
            if (playerState.isPlaying) {
                playerState.player.pauseVideo();
            } else {
                playerState.player.playVideo();
            }
        }
    };

    const handleSeek = (seconds: number) => {
        if (playerState.player) {
            const currentTime = playerState.player.getCurrentTime();
            playerState.player.seekTo(currentTime + seconds, true);
        }
    };

    const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const volume = Number(event.target.value);
        if (playerState.player) {
            playerState.player.setVolume(volume);
            setPlayerState((prev: any) => ({
                ...prev,
                volume,
                isMuted: volume === 0
            }));
        }
    };

    const toggleMute = () => {
        if (playerState.player) {
            if (playerState.isMuted) {
                playerState.player.unMute();
            } else {
                playerState.player.mute();
            }
            setPlayerState((prev: any) => ({
                ...prev,
                isMuted: !prev.isMuted
            }));
        }
    };

    const toggleFullscreen = () => {
        const iframe = document.getElementById("youtube-player-demo") as any;
        if (iframe?.requestFullscreen) {
            iframe.requestFullscreen();
        } else if (iframe?.mozRequestFullScreen) {
            iframe.mozRequestFullScreen();
        } else if (iframe?.webkitRequestFullscreen) {
            iframe.webkitRequestFullscreen();
        } else if (iframe?.msRequestFullscreen) {
            iframe.msRequestFullscreen();
        }
    };

    const handlePlaybackRateChange = (rate: number) => {
        if (playerState.player) {
            playerState.player.setPlaybackRate(rate);
            setPlayerState((prev: any) => ({
                ...prev,
                playbackRate: rate
            }));
        }
    };

    // Scrubbing handlers
    const handleScrubStart = () => {
        setIsScrubbing(true);
        setScrubTime(playerState.currentTime);
    };
    const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
        setScrubTime(Number(e.target.value));
    };
    const handleScrubEndMouse = (e: React.MouseEvent<HTMLInputElement>) => {
        const newTime = Number((e.target as HTMLInputElement).value);
        setIsScrubbing(false);
        setScrubTime(newTime);
        if (playerState.player) {
            playerState.player.seekTo(newTime, true);
        }
    };
    const handleScrubEndTouch = (e: React.TouchEvent<HTMLInputElement>) => {
        const newTime = Number((e.target as HTMLInputElement).value);
        setIsScrubbing(false);
        setScrubTime(newTime);
        if (playerState.player) {
            playerState.player.seekTo(newTime, true);
        }
    };

    return (
        <section className="bg-accent p-2">
            {/* Main video area */}
            <div className="flex-1 flex flex-col justify-center items-center bg-primary mb-2">
                <div id="youtube-player-demo" className="rounded w-full aspect-video" />
            </div>

            {/* Scrubbing bar */}
            <div className="w-full px-2 pt-2 pb-1 bg-[#EFF7DE] border-t border-primary dark:border-primary-dark flex items-center gap-2">
                <span className="text-sm font-semibold text-right dark:text-yellow w-28">
                    {Math.floor((isScrubbing ? scrubTime : playerState.currentTime) / 60)}:{Math.floor((isScrubbing ? scrubTime : playerState.currentTime) % 60).toString().padStart(2, '0')} / {Math.floor(playerState.duration / 60)}:{Math.floor(playerState.duration % 60).toString().padStart(2, '0')}
                </span>
                <input
                    type="range"
                    min={0}
                    max={playerState.duration || 0}
                    value={isScrubbing ? scrubTime : playerState.currentTime}
                    onMouseDown={handleScrubStart}
                    onTouchStart={handleScrubStart}
                    onChange={handleScrub}
                    onMouseUp={handleScrubEndMouse}
                    onTouchEnd={handleScrubEndTouch}
                    className="flex-1"
                    step={0.1}
                />
            </div>

            {/* Control bar */}
            <div className="grid grid-cols-12 px-4 py-2 bg-accent border-t border-primary gap-2">
                <div className="col-span-3 flex flex-row gap-2 items-center">
                  <button onClick={toggleMute} className="text-sm font-semibold text-right dark:text-yellow">{playerState.isMuted ? "Unmute" : "Mute"}</button>
                  <input type="range" min="0" max="100" value={playerState.volume} onChange={handleVolumeChange} className="w-20" />
                </div>
                <div className="col-span-6 flex flex-row gap-2 items-center justify-center">

                    <button onClick={() => handleSeek(-10)} className="size-12 rounded-full border-2 border-primary bg-primary flex justify-center items-center text-secondary hover:text-primary"><IconFastForward className="size-8 scale-x-[-1]" /></button>
                    <button onClick={handlePlayPause} className="size-16 rounded-full border-2 border-primary bg-primary flex items-center text-secondary hover:text-primary justify-center">{playerState.isPlaying ? <IconPauseFilled className="size-10" /> : <IconPlayFilled className="size-10" />}</button>
                    <button onClick={() => handleSeek(10)} className="size-12 rounded-full border-2 border-primary bg-primary flex justify-center items-center text-secondary hover:text-primary"><IconFastForward className="size-8" /></button>
                </div>
                <div className="col-span-3 flex flex-row gap-2 justify-end items-center">
                    <select value={playerState.playbackRate} onChange={(e) => handlePlaybackRateChange(parseFloat(e.target.value))} className="text-sm font-semibold text-right dark:text-yellow">
                        <option value="0.5">0.5x</option>
                        <option value="1">1x</option>
                        <option value="1.5">1.5x</option>
                        <option value="2">2x</option>
                    </select>
                    <button onClick={toggleFullscreen} className="text-sm font-semibold text-right dark:text-yellow"><IconFullScreen className="size-5" /></button>
                </div>
            </div>
        </section>
    );
}

export default function Demo(): JSX.Element {
    return (
        <>
            <SEO
                title="Demo - PostHog"
                description="PostHog is the only product analytics platform built to natively work with Session Replay, Feature Flags, Experiments, and Surveys."
                image={`/images/og/product-analytics.jpg`}
            />
            <Explorer
                template="generic"
                slug="demo"
                title="Demo"
                // options below only needed to override matching the slug
                // teamName="product-analytics"
                // roadmapCategory="product-analytics"
                // changelogCategory="product-analytics"
                fullScreen
            >
                <CustomVideoSection />
            </Explorer>
        </>
    )
}
