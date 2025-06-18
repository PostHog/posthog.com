import React from 'react'
import Link from 'components/Link'
import { IconNotebook, IconLightBulb, IconAI, IconHandwave, IconExternal } from '@posthog/icons'
import { CallToAction } from 'components/CallToAction'
import { Hero } from 'components/Products/Hero'
import { Subfeature } from 'components/Products/Subfeature'
import { SEO } from 'components/seo'
import { useLayoutData } from 'components/Layout/hooks'
import CloudinaryImage from 'components/CloudinaryImage'

const product = {
    slug: 'postit-training',
    lowercase: 'postit-training',
    capitalized: 'Post-it Training',
}

const subfeatures = [
    {
        title: 'Peel',
        description:
            "Learn the ancient art of Post-it folding. From simple corners to complex origami, we'll teach you how to make your notes stand out.",
        icon: <IconNotebook />,
    },
    {
        title: 'Stick',
        description:
            'Not all Post-its are created equal. Discover which colors mean what, and how to use them to create visual hierarchies that make sense.',
        icon: <IconLightBulb />,
    },
    {
        title: 'Stay',
        description:
            "Tired of your Post-its falling off? We'll teach you the secret techniques to make your notes stick where they belong, even in the most challenging environments.",
        icon: <IconHandwave />,
    },
]

interface HeroPostItProps {
    icon: React.ReactNode
    color: string
    beta?: boolean
    product: string
    title: string
    description: string
}

const HeroPostIt = ({ color, icon, beta, product, title, description }: HeroPostItProps): JSX.Element => {
    return (
        <section>
            <div className="flex gap-1.5 justify-center items-center mb-3">
                <span className={`w-6 h-6 text-${color}`}>{icon}</span>
                <span className="text-[15px] font-semibold text-opacity-60">{product}</span>
                {beta && (
                    <span className="text-xs font-semibold text-opacity-60 bg-yellow px-1 py-0.5 rounded-sm uppercase text-primary">
                        Beta
                    </span>
                )}
            </div>
            <h1 className="text-5xl md:text-6xl text-center mb-4 md:mb-2 text-balance">
                Master the art of <span className="text-red dark:text-yellow">Post-it</span> notes with our{' '}
                <span className="text-red dark:text-yellow">revolutionary</span> training program
            </h1>
            <p className="text-lg font-semibold text-center text-opacity-75 mb-5">
                This training is essential for all Hackathon participants. Yes, really.
            </p>
            <div className="flex justify-center gap-2 mb-8">
                <CallToAction href="#demo-video" type="primary">
                    Enroll now
                </CallToAction>
            </div>
            <div className="flex justify-center mb-8">
                <div className="rotate-[-2deg] p-1 max-w-[1120px]">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/post_it_history_af4a8de842.png"
                        alt="Post-it note training class"
                        className="w-full max-w-[1120px]"
                    />
                </div>
            </div>
        </section>
    )
}

export const ProductPostItTraining = () => {
    const { fullWidthContent } = useLayoutData()
    return (
        <>
            <SEO
                title="Post-it Training Academy - Master the Art of Sticky Notes"
                description="Learn the ancient art of Post-it mastery from the masters at PostHog."
                image={`/images/og/postit-training.jpg`}
            />
            <div className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl mx-auto'} px-5 pt-10 pb-10`}>
                <HeroPostIt
                    color="yellow"
                    icon={<IconNotebook />}
                    product={product.capitalized}
                    title="Master the art of Post-it notes"
                    description="Because sticky notes deserve respect too."
                />

                <div id="features">
                    <section className="max-w-7xl mx-auto px-5 pb-6">
                        <div className="flex flex-col-reverse items-center md:flex-row gap-8 pt-20 mb-20">
                            <div className="flex-1">
                                <h2 className="text-4xl lg:text-5xl">
                                    Why we have Post-it Training?
                                    <br />
                                    <span className="text-red dark:text-yellow">Because of Marius says.</span>
                                </h2>
                                <p>
                                    Every PostHog hackathon starts with a wall of Post-it notes—each one a new idea
                                    waiting to be built. Unfortunately, new team members don't always know the ancient
                                    art of Post-it placement. Most notes fall off within minutes.
                                </p>
                                <p>
                                    Enter{' '}
                                    <a
                                        href="https://posthog.com/community/profiles/30202"
                                        className="text-red dark:text-yellow font-semibold"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Marius
                                    </a>
                                    : Post-it master and savior of our sticky ideas. He's on a mission to teach proper
                                    technique and restore order to the wall and has prepared this course to help you
                                    learn his ways.
                                </p>
                                <p>That's Marius on the right. He also likes pineapples.</p>
                            </div>
                            <aside className="shrink-0 md:basis-[500px] flex flex-col items-center">
                                <div className="p-1 max-w-[420px]">
                                    <CloudinaryImage
                                        src="https://res.cloudinary.com/dmukukwp6/image/upload/Marius_f38a026214.png"
                                        alt="Marius. Post-it master."
                                        className="w-full max-w-[400px] rounded-[10px]"
                                    />
                                </div>
                            </aside>
                        </div>

                        <section id="demo-video" className="mb-8 pt-10">
                            <h2 className="text-4xl lg:text-5xl text-center mb-8">
                                Ready to become a <span className="text-red dark:text-yellow">Post-it</span> master?
                            </h2>
                            <div className="inline-flex mx-auto relative overflow-hidden w-full aspect-video">
                                <iframe
                                    src="https://www.youtube.com/embed/T9lEd2EpGhw"
                                    className="rounded aspect-video m-0 shadow-xl"
                                    allow="autoplay"
                                />
                            </div>
                        </section>

                        <div className="mb-4">
                            <ul className="list-none p-0 grid md:grid-cols-3 gap-4">
                                {subfeatures.map((subfeature, index) => {
                                    return <Subfeature {...subfeature} key={index} />
                                })}
                            </ul>
                        </div>
                    </section>
                </div>
            </div>

            <section className="py-10">
                <div className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl mx-auto'} px-5`}>
                    <h2 className="text-4xl lg:text-5xl text-center mb-2">
                        Ready to become a <span className="text-red dark:text-yellow">Post-it</span> master?
                    </h2>
                    <h3 className="text-2xl text-center mb-12">Enroll now and get your first pack of Post-its free!</h3>

                    <div className="flex justify-center">
                        <CallToAction href="#enroll" type="primary" size="lg">
                            <>Start Your Journey</>
                        </CallToAction>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProductPostItTraining
