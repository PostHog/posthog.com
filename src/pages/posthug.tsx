import React, { useCallback } from 'react'
import Explorer from 'components/Explorer'
import Link from 'components/Link'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { SEO } from 'components/seo'
import Particles from 'react-tsparticles'
import { loadStarsPreset } from 'tsparticles-preset-stars'
import { Logo } from '@posthog/brand/logo'

const PostHugPage = (): JSX.Element => {
    const particlesInit = useCallback(async (engine) => {
        await loadStarsPreset(engine)
    }, [])

    return (
        <>
            <SEO title="PostHug" description="Free hedgehugs." image={`/images/about.png`} />
            <Explorer
                template="generic"
                slug="posthug"
                title="PostHug"
                showAddressBar={false}
                headerBarOptions={[]}
                fullScreen
            >
                {/* The stars fill the whole window, behind the content */}
                <Particles
                    id="posthug-stars"
                    init={particlesInit}
                    className="absolute inset-0"
                    options={{
                        preset: 'stars',
                        fullScreen: false,
                        background: { color: 'transparent' },
                        interactivity: { enable: false },
                        particles: {
                            color: { value: '#FF0000' },
                            move: { speed: 5 },
                            number: { value: 200 },
                        },
                    }}
                />
                <ScrollArea className="relative h-full" viewportClasses="[&>div]:h-full">
                    <div className="flex min-h-full flex-col items-center justify-center px-4 py-8 text-center text-primary">
                        <h1 className="m-0 text-2xl @md:text-3xl">You were probably looking for</h1>
                        <Link to="/" aria-label="PostHog home" className="my-6 block w-full max-w-xs @md:max-w-sm">
                            <Logo className="w-full dark:hidden" />
                            <Logo variant="mono" color="white" className="hidden w-full dark:block" />
                        </Link>
                        <p className="m-0 font-semibold">Even engineers need hugs every now and again. 🥺</p>
                        <p className="mt-1 mb-4">
                            Seeing as how we can't literally give you a hug, here is the next best thing:
                        </p>
                        {/* Shown at its own size at most, so the GIF does not blur */}
                        <img
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/max_hug_animated_e7732738d5.gif"
                            alt="Two hedgehogs hugging"
                            width={500}
                            height={281}
                            className="h-auto w-full max-w-[500px]"
                        />
                    </div>
                </ScrollArea>
            </Explorer>
        </>
    )
}

export default PostHugPage
