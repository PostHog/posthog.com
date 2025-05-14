import React, { useState, useEffect } from 'react'
import { CallToAction, TrackedCTA } from 'components/CallToAction'
import Link from 'components/Link'
import { useToast } from 'hooks/toast'
import { SEO } from 'components/seo'
import Layout from 'components/Layout'
import { LinkIcon } from 'components/Icons'

interface Link {
    short: string
    long: string
    createdAt: number // Timestamp in milliseconds
    loading?: boolean
}

const LOCAL_STORAGE_KEY = 'posthog_shortened_links'
const DEFAULT_SHORT_URL = 'phog.gg/r/xxxxxx'
const LINK_EXPIRY_DURATION = 24 * 60 * 60 * 1000 // 24 hours in milliseconds
const MAX_LINKS = 5

// Helper function to format remaining time
const formatTimeLeft = (ms: number): string => {
    if (ms <= 0) return 'Expired 😢'
    const totalSeconds = Math.floor(ms / 1000)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)

    if (hours > 0) {
        return `${hours}h ${minutes}m left`
    }

    return `${minutes}m left`
}

const getValidLinks = (): Link[] => {
    const now = Date.now()
    try {
        const storedLinks = localStorage.getItem(LOCAL_STORAGE_KEY)
        console.log('storedLinks', storedLinks)
        if (storedLinks) {
            const links = JSON.parse(storedLinks)
            const parsedLinks: Link[] = links
                .sort((a: Link, b: Link) => b.createdAt - a.createdAt)
                .filter((link: Link) => now - link.createdAt < LINK_EXPIRY_DURATION)
                .slice(0, MAX_LINKS)

            if (links.length !== parsedLinks.length) {
                try {
                    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsedLinks))
                } catch (error) {
                    console.error('Error saving links to localStorage:', error)
                }
            }

            return parsedLinks
        } else {
            return []
        }
    } catch (error) {
        console.error('Error parsing links from localStorage:', error)
    }
    return []
}

const shortenLink = async (long_url: string): Promise<Link> => {
    const response = await fetch('https://phog.gg/shorten', {
        method: 'POST',
        body: JSON.stringify({ long_url }),
    })
    const data = await response.json()
    return data as Link
}

function Hero(): JSX.Element {
    const [longUrl, setLongUrl] = useState('')

    const [links, setLinks] = useState<Link[]>([])
    const [time, setTime] = useState(Date.now())

    const { addToast } = useToast()

    // Effect to load links from localStorage on mount and update them periodically
    useEffect(() => {
        setLinks(getValidLinks())

        const intervalId = setInterval(() => {
            setTime(Date.now()) // Trigger re-render for countdowns
        }, 60000) // Update every minute

        return () => clearInterval(intervalId) // Cleanup on unmount
    }, [])

    const handleShortenLink = () => {
        if (!longUrl) {
            addToast({ message: 'Oops, you forgot to include a short link', error: true })
        }

        // Validate it's a valid URL
        try {
            new URL(longUrl)
        } catch (error) {
            addToast({ message: 'Please enter a valid URL', error: true })
            return
        }

        const temporaryNewLink: Link = {
            short: DEFAULT_SHORT_URL,
            long: longUrl,
            createdAt: Date.now(),
            loading: true,
        }

        const initialLinks = [...links] // Create a copy so that we can revert UI if needed
        const updatedLinks = [temporaryNewLink, ...links].slice(0, MAX_LINKS)
        setLinks(updatedLinks)

        // Run our promise in the background, and then update the links array with the new link
        // once it's finished loading
        shortenLink(temporaryNewLink.long)
            .then((newLink) => {
                const finalLinks = links.map((link) => (link.short === DEFAULT_SHORT_URL ? newLink : link))
                setLinks(finalLinks)
                setLongUrl('')
                addToast({ message: 'Link shortened successfully!' })

                try {
                    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(finalLinks))
                } catch (error) {
                    console.error('Error saving new link to localStorage:', error)
                }
            })
            .catch((error) => {
                console.error('Error shortening link:', error)
                addToast({ message: 'Failed to shorten link. Please try again.', error: true })
                setLinks(initialLinks) // Revert the UI to the original state
            })
    }

    const isShortening = links.some((link) => link.loading)

    return (
        <section className="py-20">
            <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:px-12">
                <h1 className="mb-12 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                    Short links but more fun
                </h1>
                <div className="flex flex-col sm:flex-row gap-1 items-center justify-around mb-12">
                    <div className="flex flex-col gap-2 items-center">
                        <p className="text-lg mb-0 text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                            PostHog includes a modern link management platform for developers, product teams, and
                            marketers.
                        </p>
                        <p className="text-sm mb-0 text-gray-500 lg:text-base sm:px-16 xl:px-48 dark:text-gray-400">
                            These short links only last 24 hours. Sign up for a free account to create customizable
                            permanent links.
                        </p>

                        <TrackedCTA
                            event={{ name: `clicked link tracking get started` }}
                            type="primary"
                            className="max-w-xs mt-2 mb-8"
                            size="sm"
                            to="/signup"
                        >
                            Get started - free
                        </TrackedCTA>
                    </div>
                </div>

                <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2">
                        <div className="relative w-full sm:w-auto flex-grow">
                            <input
                                type="text"
                                value={longUrl}
                                onChange={(e) => setLongUrl(e.target.value)}
                                placeholder="Enter your loooong link..."
                                id="longUrl"
                                className="w-full block !bg-white dark:!bg-white/10 box-border px-3 py-2 rounded-sm focus:shadow-xl border border-black/20 text-[17px] font-medium dark:bg-white box-border/10 dark:text-white"
                                required
                            />
                        </div>

                        <div className="w-full sm:w-auto">
                            <CallToAction
                                onClick={handleShortenLink}
                                className="w-full"
                                size="sm"
                                type="secondary"
                                disabled={isShortening}
                            >
                                {isShortening ? 'Shortening...' : 'Shorten link'}
                            </CallToAction>
                        </div>
                    </div>

                    <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 text-left">
                        {links.length > 0 ? (
                            <ul className="space-y-3 pl-0 list-none">
                                {links.map((link) => {
                                    const timeLeft = LINK_EXPIRY_DURATION - (time - link.createdAt)
                                    return (
                                        <li key={link.short}>
                                            <div
                                                className={`relative bg-white dark:bg-white/10 rounded-md shadow-sm hover:shadow-md transition-shadow relative ${
                                                    timeLeft <= 0 ? 'opacity-50' : ''
                                                } ${
                                                    link.loading ? 'opacity-50' : '' // Slightly fade the content to make spinner more visible
                                                }`}
                                            >
                                                {link.loading && (
                                                    <svg
                                                        className="absolute"
                                                        height="100%"
                                                        width="100%"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <rect
                                                            rx="8"
                                                            ry="8"
                                                            className="animate-svg-stroke-dashoffset-around line stroke-[2px] fill-transparent stroke-orange [stroke-dasharray:260]"
                                                            height="100%"
                                                            width="100%"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                )}

                                                <div className="flex p-3 justify-between items-center">
                                                    <div>
                                                        <div className="flex flex-row items-center gap-1">
                                                            <LinkIcon className="w-[15px] h-[15px] text-red dark:text-yellow" />
                                                            <a
                                                                href={link.loading ? undefined : link.short}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className={`font-semibold ${
                                                                    link.loading
                                                                        ? 'cursor-not-allowed'
                                                                        : 'hover:underline'
                                                                }`}
                                                            >
                                                                {link.short}
                                                            </a>
                                                        </div>

                                                        <p
                                                            className="text-xs text-gray-500 dark:text-gray-400 truncate"
                                                            title={link.long}
                                                        >
                                                            {link.long}
                                                        </p>
                                                    </div>
                                                    <span className="text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
                                                        {link.loading ? '...' : formatTimeLeft(timeLeft)}
                                                    </span>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        ) : (
                            <p className="text-gray-700 dark:text-gray-300 text-center py-4">
                                Your shortened links will appear here for 24 hours.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

function LinkShortener(): JSX.Element {
    return (
        <Layout headerBlur={false}>
            <SEO
                title="PostHog - Link shortener"
                description="Create short, trackable links that expire after 24 hours. Perfect for sharing on social media or tracking campaign performance."
            />
            <Hero />
        </Layout>
    )
}

export default LinkShortener
