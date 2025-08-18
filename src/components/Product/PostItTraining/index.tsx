import React from 'react'
import Link from 'components/Link'
import { IconPencil, IconNotebook, IconHandMoney, IconHandwave, IconScreen, IconExternal } from '@posthog/icons'
import { CallToAction } from 'components/CallToAction'
import { Hero } from 'components/Products/Hero'
import { Subfeature } from 'components/Products/Subfeature'
import { SEO } from 'components/seo'
import { useLayoutData } from 'components/Layout/hooks'
import CloudinaryImage from 'components/CloudinaryImage'
import PostQuote from './PostQuote'

const product = {
    slug: 'postit-training',
    lowercase: 'postit-training',
    capitalized: 'Post-it Training',
}

const subfeatures = [
    {
        title: 'Step 1: Peel it from the side',
        description:
            "Don't peel from the bottom. That's wrong. You need to peel from the side, or you'll end up with a curve that minimizes the sticky surface area.",
        icon: <IconHandwave />,
    },
    {
        title: 'Step 2: Press it flat to the wall',
        description:
            "Next, you need to press it down firmly, but with respect. You don't want to smudge the ink or damage the wall, do you?",
        icon: <IconScreen />,
    },
    {
        title: 'Step 3: Increase shareholder value',
        description:
            'Congratulations, you just increased shareholder value while also increasing operational efficiency. Take a moment to pat yourself on the back.',
        icon: <IconHandMoney />,
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
                This training is required for all PostHog staff. Yes, really.
            </p>
            <div className="flex justify-center gap-2 mb-8">
                <CallToAction href="#demo-video" type="primary">
                    Get Post-it certified
                </CallToAction>
            </div>
            <div className="flex justify-center mb-8">
                <div className="rotate-[-2deg] p-1 max-w-[1120px]">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/posthead_37b46564aa.png"
                        alt="Post-it note training class"
                        className="w-full max-w-[1520px]"
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

                <div id="features1">
                    <section className="max-w-7xl mx-auto -mt-4 px-5 pb-6">
                        <div className="flex flex-col-reverse items-center md:flex-row gap-8 pt-10">
                            <div
                                className="bg-[#FFFB7D] shadow-2xl border-none aspect-square w-full max-w-[420px] flex flex-col justify-center p-8 rotate-[-2deg] mx-auto"
                                style={{
                                    minHeight: '420px', // Ensures it's always square
                                    borderRadius: 0,
                                }}
                            >
                                <h2 className="font-extrabold text-4xl text-black dark:text-black">
                                    Post-its have a <span className="text-[#FF5A1F] dark:text-[#FF5A1F]">problem</span>
                                    ...
                                </h2>
                                <p className="text-black dark:text-black text-lg mb-2">
                                    We love Post-its. They're a staple of every PostHog hackathon.
                                </p>
                                <p className="text-black dark:text-black text-lg mb-2">
                                    Session replay? Hedgehog mode? DeskHog? They all started as a Post-it.
                                </p>
                                <p className="text-black dark:text-black text-lg">
                                    Problem is, most Post-its only stay sticky for a few minutes. We thought: How can we
                                    stop them littering the floor like a carpet of multi-coloured genius?
                                </p>
                            </div>
                            <aside className="shrink-0 md:basis-[500px] flex flex-col items-center">
                                <div className="p-1 max-w-[420px]">
                                    <CloudinaryImage
                                        src="https://res.cloudinary.com/dmukukwp6/image/upload/postblock_76a0980525.png"
                                        alt="We love post-its"
                                        className="w-full max-w-[600px] rounded-[10px]"
                                    />
                                </div>
                            </aside>
                        </div>
                    </section>
                </div>

                <div id="features2">
                    <section className="max-w-7xl mx-auto -mt-6 px-5 pb-6">
                        <div className="flex flex-col-reverse items-center md:flex-row gap-8 mb-20">
                            <div
                                className="bg-[#ff96c2] shadow-2xl border-none aspect-square w-full max-w-[420px] flex flex-col justify-center p-8 rotate-[1deg] mx-auto"
                                style={{
                                    minHeight: '420px', // Ensures it's always square
                                    borderRadius: 0,
                                }}
                            >
                                <h2 className="font-extrabold text-4xl mb-4 text-black dark:text-black">
                                    ...And the problem is you
                                </h2>
                                <p className="text-black dark:text-black text-lg mb-2">
                                    The root of 90% of technology problems is human error, so we developed a training
                                    program to help our teams learn correct Post-it procedure.
                                </p>
                                <p className="text-black dark:text-black text-lg mb-2">
                                    It may seem strange, but Post-it training has enabled us to keep our ideas
                                    front-of-mind and not top-of-carpet for years. Now, we're sharing it with you.
                                </p>
                            </div>
                            <aside className="shrink-0 md:basis-[500px] flex flex-col items-center">
                                <div className="p-1 max-w-[420px]">
                                    <CloudinaryImage
                                        src="https://res.cloudinary.com/dmukukwp6/image/upload/training_63069fae88.png"
                                        alt="We love post-its"
                                        className="w-full max-w-[400px] rounded-[10px]"
                                    />
                                </div>
                            </aside>
                        </div>

                        <PostQuote
                            title="It's time to meet your instructor"
                            subtitle="His name is Marius and he's really passionate about Post-its."
                            quote={`It all started at my first PostHog hackathon. So many of our ideas were falling to the floor. I couldn't take it. I had to do something.<br /><br />
                            <strong>Why? Because an idea that's floored is an idea that's ignored.</strong><br /><br />
                            Since then, I've trained over 100 PostHog staff and helped bring to life ideas like '<i>A PostHog videogame</i>', '<i>Better loading animations</i>', and '<i>A crocheted hedgehog</i>'.<br /><br />
                            Now, I'm sharing this training for the first time to help you get Post-it certified.`}
                            authorName="Marius Andra"
                        />

                        <section id="demo-video" className="mb-8 pt-10">
                            <h2 className="text-4xl lg:text-5xl text-center mb-8">
                                Ready to get <span className="text-red dark:text-yellow">Post-it certified?</span>
                            </h2>

                            <div className="relative mx-auto w-full overflow-hidden rounded shadow-xl aspect-video">
                                <iframe
                                    title="PostHog Demo"
                                    src="https://www.youtube-nocookie.com/embed/_eLZqBVkxCc?rel=0"
                                    className="absolute inset-0 h-full w-full"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="strict-origin-when-cross-origin"
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

            <section className="py-10 mb-10">
                <div className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl mx-auto'} px-5`}>
                    <h2 className="text-4xl lg:text-5xl text-center mb-2">
                        Congratulations, you are now{' '}
                        <span className="text-red dark:text-yellow">Post-it certified</span>
                    </h2>
                    <h3 className="text-2xl text-center mb-12">
                        Tell the world you're Post-it certified to boost your chances of getting hired here by 20%
                    </h3>

                    <div className="flex justify-center gap-2">
                        <CallToAction
                            href="https://www.linkedin.com/in/me/edit/forms/certification/new/"
                            type="primary"
                            size="lg"
                            externalNoIcon
                        >
                            <>Share on LinkedIn</>
                        </CallToAction>
                        <CallToAction
                            href="https://twitter.com/intent/tweet?text=I just got Post-it certified by @PostHog 📝 — now my ideas actually stick! https://posthog.com/post-it-training"
                            type="primary"
                            size="lg"
                            externalNoIcon
                        >
                            <>Share on Twitter</>
                        </CallToAction>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProductPostItTraining
