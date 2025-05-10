import React, { Fragment, useState, useEffect } from 'react'
import SEO from 'components/seo'
import Wizard from 'components/Wizard'
import { CallToAction } from 'components/CallToAction'
import { productMenu } from '../../navs'
import * as Icons from '@posthog/icons'
import Link from 'components/Link'
import { IconBold, IconLink } from 'components/OSIcons'
import ScrollArea from 'components/RadixUI/ScrollArea'
import Logo from 'components/Logo'
import { RadioGroup } from 'components/RadixUI/RadioGroup'
import { navigate } from 'gatsby'
import usePostHog from '../../hooks/usePostHog'
import { useApp } from '../../context/App'
import { useWindow } from '../../context/Window'
import CodeBlock from './CodeBlock'
import ContactForm from './ContactForm'

const MainContent = ({ selectedOption, setSelectedOption, options }) => (
    <div className="flex flex-1 w-full border-y border-primary">
        <div data-scheme="primary" className="w-[40%] flex items-center justify-center p-2 border-r border-primary">
            <div className="w-full bg-accent flex items-center justify-center h-full text-sm relative border border-primary overflow-hidden">
                <img src="https://res.cloudinary.com/dmukukwp6/image/upload/3000_773e0d4c49.png" className="" />
                <img
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/yc_approved_347c12b8e6.png"
                    className="absolute -right-24 top-6 rotate-[45deg]"
                />
            </div>
        </div>
        <div className="w-[60%] flex flex-col justify-center px-8 py-4">
            <Logo className="h-10 mb-4" />
            <h1 className="text-xl font-bold mb-1">The toolkit for building successful products</h1>
            <p className="text-secondary text-[15px]">
                PostHog is the single platform to build products, talk to users, and ship new features
            </p>
            <div className="mt-4">
                <RadioGroup
                    title="Menu options"
                    options={options}
                    value={selectedOption}
                    onValueChange={setSelectedOption}
                />

                <div className="mt-6 text-sm border-t border-primary pt-6">
                    You can also{' '}
                    <Link to="/tour" className="font-semibold text-right dark:text-yellow">
                        take a tour
                    </Link>{' '}
                    or learn{' '}
                    <Link to="/#" className="font-semibold text-right dark:text-yellow">
                        why our website looks like this
                    </Link>
                </div>
            </div>
        </div>
    </div>
)

const AIInstallContent = () => (
    <div className="pt-8 px-8 flex flex-col items-center w-full mb-8">
        <h2 className="text-xl font-bold mb-1">Integrate PostHog in 90 seconds</h2>
        <p className="text-[15px] text-secondary text-center mb-10">
            Let's integrate PostHog. Run the following command; don't write any code until it completes:
        </p>

        <div className="w-full max-w-2xl">
            <CodeBlock
                code="npx --yes @posthog/wizard@latest --default --region us"
                language="bash"
                hideNumbers={false}
            />
        </div>
        <p className="text-[13px] text-primary/85 dark:text-primary-dark/85 m-0 -mt-0.5">
            Works with agent-based coding tools like Cursor and Bolt. Supports Next.js, React, React Native, Svelte, and
            Astro.{' '}
            <Link to="/docs/getting-started/install?tab=wizard" className="font-semibold text-right dark:text-yellow">
                More on the way!
            </Link>
        </p>
    </div>
)

const VideoSection = () => {
    const [playerState, setPlayerState] = useState({
        isPlaying: true,
        player: null,
        volume: 100,
        isMuted: false,
        currentTime: 0,
        duration: 0,
        playbackRate: 1
    });
    const [isScrubbing, setIsScrubbing] = useState(false);
    const [scrubTime, setScrubTime] = useState(0);

    // Poll current time
    useEffect(() => {
        let interval = null;
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
            const player = new window.YT.Player("youtube-player", {
                host: "https://www.youtube-nocookie.com",
                videoId: "2jQco8hEvTI",
                playerVars: {
                    autoplay: 1,
                    controls: 0,
                    modestbranding: 1,
                    rel: 0
                },
                events: {
                    onStateChange: (event) => {
                        setPlayerState(prev => ({
                            ...prev,
                            isPlaying: event.data === window.YT.PlayerState.PLAYING
                        }));
                    },
                    onReady: (event) => {
                        setPlayerState(prev => ({
                            ...prev,
                            player: event.target,
                            duration: event.target.getDuration(),
                            currentTime: event.target.getCurrentTime()
                        }));
                        event.target.playVideo();
                    },
                    onPlaybackRateChange: (event) => {
                        setPlayerState(prev => ({
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
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
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

    const handleSeek = (seconds) => {
        if (playerState.player) {
            const currentTime = playerState.player.getCurrentTime();
            playerState.player.seekTo(currentTime + seconds, true);
        }
    };

    const handleVolumeChange = (event) => {
        const volume = event.target.value;
        if (playerState.player) {
            playerState.player.setVolume(volume);
            setPlayerState(prev => ({
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
            setPlayerState(prev => ({
                ...prev,
                isMuted: !prev.isMuted
            }));
        }
    };

    const toggleFullscreen = () => {
        const iframe = document.getElementById("youtube-player");
        if (iframe.requestFullscreen) {
            iframe.requestFullscreen();
        } else if (iframe.mozRequestFullScreen) {
            iframe.mozRequestFullScreen();
        } else if (iframe.webkitRequestFullscreen) {
            iframe.webkitRequestFullscreen();
        } else if (iframe.msRequestFullscreen) {
            iframe.msRequestFullscreen();
        }
    };

    const handlePlaybackRateChange = (rate) => {
        if (playerState.player) {
            playerState.player.setPlaybackRate(rate);
            setPlayerState(prev => ({
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
    const handleScrub = (e) => {
        setScrubTime(Number(e.target.value));
    };
    const handleScrubEnd = (e) => {
        const newTime = Number(e.target.value);
        setIsScrubbing(false);
        setScrubTime(newTime);
        if (playerState.player) {
            playerState.player.seekTo(newTime, true);
        }
    };

    return (
        <section
            id="demo-video"
            className="overflow-hidden transition-all duration-300 h-auto max-h-[90vh] border border-light dark:border-dark rounded leading-[0] shadow-xl mb-8"
        >
            {/* Scrubbing bar */}
            <div className="w-full px-4 pt-2 pb-1">
                <input
                    type="range"
                    min={0}
                    max={playerState.duration || 0}
                    value={isScrubbing ? scrubTime : playerState.currentTime}
                    onMouseDown={handleScrubStart}
                    onTouchStart={handleScrubStart}
                    onChange={handleScrub}
                    onMouseUp={handleScrubEnd}
                    onTouchEnd={handleScrubEnd}
                    className="w-full"
                    step={0.1}
                />
            </div>
            <div className="p-2 bg-accent dark:bg-accent-dark border-b border-light dark:border-dark flex justify-center gap-4">
                <button 
                    onClick={() => handleSeek(-10)} 
                    className="text-sm font-semibold text-right dark:text-yellow"
                >
                    Back 10s
                </button>
                <button 
                    onClick={handlePlayPause} 
                    className="text-sm font-semibold text-right dark:text-yellow"
                >
                    {playerState.isPlaying ? "Pause" : "Play"}
                </button>
                <button 
                    onClick={() => handleSeek(10)} 
                    className="text-sm font-semibold text-right dark:text-yellow"
                >
                    Forward 10s
                </button>
                <button 
                    onClick={toggleMute} 
                    className="text-sm font-semibold text-right dark:text-yellow"
                >
                    {playerState.isMuted ? "Unmute" : "Mute"}
                </button>
                <button 
                    onClick={toggleFullscreen} 
                    className="text-sm font-semibold text-right dark:text-yellow"
                >
                    Fullscreen
                </button>
                <div className="flex items-center">
                    <span className="text-sm font-semibold text-right dark:text-yellow mr-2">Volume:</span>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={playerState.volume} 
                        onChange={handleVolumeChange} 
                        className="w-24"
                    />
                </div>
                <div className="flex items-center">
                    <span className="text-sm font-semibold text-right dark:text-yellow mr-2">Speed:</span>
                    <select 
                        value={playerState.playbackRate} 
                        onChange={(e) => handlePlaybackRateChange(parseFloat(e.target.value))} 
                        className="text-sm font-semibold text-right dark:text-yellow"
                    >
                        <option value="0.5">0.5x</option>
                        <option value="1">1x</option>
                        <option value="1.5">1.5x</option>
                        <option value="2">2x</option>
                    </select>
                </div>
                <div className="flex items-center">
                    <span className="text-sm font-semibold text-right dark:text-yellow mr-2">Time:</span>
                    <span className="text-sm font-semibold text-right dark:text-yellow">
                        {Math.floor((isScrubbing ? scrubTime : playerState.currentTime) / 60)}:{Math.floor((isScrubbing ? scrubTime : playerState.currentTime) % 60).toString().padStart(2, '0')} / {Math.floor(playerState.duration / 60)}:{Math.floor(playerState.duration % 60).toString().padStart(2, '0')}
                    </span>
                </div>
            </div>
            <div id="youtube-player" className="rounded w-full aspect-video m-0"></div>
        </section>
    );
};

const TalkToHumanDemo = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className="pt-8 px-8 flex flex-col items-center w-full mb-8">
            <h2 className="text-xl font-bold mb-1">Watch a demo first</h2>
            <p className="text-[15px] text-secondary text-center mb-10">
                See how PostHog can help your team build better products
            </p>

            {!isMobile && <VideoSection />}

            {isMobile && <VideoSection />}
        </div>
    );
};

const TalkToHumanContact = ({ onClose, onFormSubmit }) => {
    const [formSubmitted, setFormSubmitted] = useState(false)

    const handleFormSubmit = () => {
        setFormSubmitted(true)
        onFormSubmit()
    }

    return (
        <div className="pt-8 px-8 flex flex-col items-center w-full mb-8">
            <h2 className="text-xl font-bold mb-1">Contact our team</h2>
            <p className="text-[15px] text-secondary text-center mb-10">
                Fill out this form and we'll get back to you shortly
            </p>
            <div className="w-full max-w-2xl">
                <ContactForm
                    onSubmit={handleFormSubmit}
                    hideSubmitButton={true}
                    buttonText="Submit"
                    successMessage="Message received. We'll be in touch!"
                />
                {formSubmitted && (
                    <div className="mt-4 flex justify-center">
                        <CallToAction type="primary" size="sm" onClick={onClose}>
                            Close
                        </CallToAction>
                    </div>
                )}
            </div>
        </div>
    )
}

export default function Home() {
    const posthog = usePostHog()
    const { closeWindow } = useApp()
    const { appWindow } = useWindow()
    const [selectedOption, setSelectedOption] = useState('free-signup')
    const [currentFlow, setCurrentFlow] = useState('main')
    const [currentSlide, setCurrentSlide] = useState(0)
    const [contactFormSubmitted, setContactFormSubmitted] = useState(false)

    const handleClose = () => {
        closeWindow(appWindow)
    }

    const handleContactFormSubmit = () => {
        setContactFormSubmitted(true)
    }

    // Define the wizard flows
    const flows = {
        main: {
            component: MainContent,
            props: {
                selectedOption,
                setSelectedOption,
                options: [
                    {
                        label: 'Get started – free',
                        value: 'free-signup',
                        default: true,
                    },
                    {
                        label: 'Install with AI',
                        value: 'install-with-ai',
                    },
                    {
                        label: 'Talk to a human',
                        value: 'talk-to-a-human',
                    },
                ],
            },
            navigation: {
                forward: {
                    label: 'Continue',
                    action: () => {
                        if (selectedOption === 'free-signup') {
                            window.open('https://app.posthog.com/signup', '_blank')
                        } else if (selectedOption === 'install-with-ai') {
                            setCurrentFlow('install-with-ai')
                        } else if (selectedOption === 'talk-to-a-human') {
                            setCurrentFlow('talk-to-a-human')
                        }
                    },
                },
            },
        },
        'install-with-ai': {
            component: AIInstallContent,
            navigation: {
                back: {
                    label: 'Back',
                    action: () => setCurrentFlow('main'),
                },
                forward: {
                    label: 'Open docs',
                    action: () => navigate('/docs/getting-started/install?tab=snippet', { state: { newWindow: true } }),
                },
            },
        },
        'talk-to-a-human': {
            slides: [
                {
                    component: TalkToHumanDemo,
                    navigation: {
                        back: {
                            label: 'Back',
                            action: () => {
                                setCurrentFlow('main')
                                setCurrentSlide(0)
                            },
                        },
                        forward: {
                            label: 'Continue',
                            action: () => setCurrentSlide(1),
                        },
                    },
                },
                {
                    component: TalkToHumanContact,
                    props: {
                        onClose: handleClose,
                        onFormSubmit: handleContactFormSubmit,
                    },
                    navigation: {
                        back: {
                            label: 'Back',
                            action: () => setCurrentSlide(0),
                        },
                        forward: contactFormSubmitted
                            ? null
                            : {
                                  label: 'Submit form',
                                  action: () => {
                                      // Trigger form submission programmatically via the exposed window function
                                      if (typeof window !== 'undefined' && window.submitContactForm) {
                                          window.submitContactForm()
                                      }
                                  },
                              },
                    },
                },
            ],
        },
    }

    // Get the current flow configuration
    const currentFlowConfig = flows[currentFlow]

    // For talk-to-a-human flow, get the current slide
    const currentSlideConfig = currentFlow === 'talk-to-a-human' ? currentFlowConfig.slides[currentSlide] : null

    // Get the component to render
    const ContentComponent = currentSlideConfig ? currentSlideConfig.component : currentFlowConfig.component

    // Get the navigation config
    const navigationConfig = currentSlideConfig ? currentSlideConfig.navigation : currentFlowConfig.navigation

    // Get props to pass to the component
    const componentProps =
        currentSlideConfig && currentSlideConfig.props ? currentSlideConfig.props : currentFlowConfig.props || {}

    // Render left navigation button
    const renderLeftNavigation = () => {
        if (navigationConfig?.back) {
            return (
                <CallToAction type="secondary" size="sm" onClick={navigationConfig.back.action}>
                    {navigationConfig.back.label}
                </CallToAction>
            )
        }
        return null
    }

    // Render right navigation button
    const renderRightNavigation = () => {
        if (navigationConfig?.forward) {
            if (typeof navigationConfig.forward === 'object') {
                if (navigationConfig.forward.action && typeof navigationConfig.forward.action === 'function') {
                    return (
                        <CallToAction type="primary" size="sm" onClick={navigationConfig.forward.action}>
                            {navigationConfig.forward.label}
                        </CallToAction>
                    )
                } else if (navigationConfig.forward.to) {
                    return (
                        <Link to={navigationConfig.forward.to} state={{ newWindow: true }}>
                            <CallToAction type="primary" size="sm">
                                {navigationConfig.forward.label}
                            </CallToAction>
                        </Link>
                    )
                }
            }
        }
        return null
    }

    return (
        <>
            <SEO
                title="PostHog - How developers build successful products"
                description="PostHog is the only all-in-one platform for product analytics, feature flags, session replays, experiments, and surveys that's built for developers."
                image={`/images/home.png`}
            />
            <Wizard leftNavigation={renderLeftNavigation()} rightNavigation={renderRightNavigation()}>
                {currentFlow === 'main' ? (
                    <ContentComponent {...componentProps} />
                ) : (
                    <ScrollArea className="flex-1 w-full border-y border-primary flex flex-col items-center">
                        <ContentComponent {...componentProps} />
                    </ScrollArea>
                )}
            </Wizard>
        </>
    )
}
