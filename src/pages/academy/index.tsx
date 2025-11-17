import React from 'react'
import Editor from 'components/Editor'
import SEO from 'components/seo'
import { IconNotebook, IconHandMoney, IconHandwave, IconScreen } from '@posthog/icons'
import { CallToAction } from 'components/CallToAction'
import { Subfeature } from 'components/Products/Subfeature'
import CloudinaryImage from 'components/CloudinaryImage'
import PostQuote from 'components/Academy/PostQuote'
import { AppIcon } from 'components/OSIcons/AppIcon'

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

const HeroPostIt = (): JSX.Element => {
    return (
        <section>
            <div className="flex flex-col gap-2 justify-center items-center mb-3">
                <AppIcon name="postIt" />
                <span className="text-[15px] font-semibold text-opacity-60">Post-It training</span>
            </div>
            <h1 className="text-2xl @3xl:text-4xl text-center mb-4 @3xl:mb-2 text-balance">
                Master the art of <span className="text-red dark:text-yellow">Post-It</span> notes with our{' '}
                <span className="text-red dark:text-yellow">revolutionary</span> training program
            </h1>
            <p className="text-base font-semibold text-center text-opacity-75 mb-5">
                This training is required for all PostHog staff. Yes, really.
            </p>
            <div className="flex justify-center gap-2 mb-8">
                <CallToAction href="#demo-video" type="primary" size="md">
                    Get Post-It certified
                </CallToAction>
            </div>
            <div className="flex justify-center mb-8">
                <div className="rotate-[-2deg] p-1 max-w-[1120px]">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/posthead_37b46564aa.png"
                        alt="Post-It note training class"
                        className="w-full max-w-[1520px]"
                    />
                </div>
            </div>
        </section>
    )
}

const AcademyContent = () => {
    // LinkedIn certification URL generation
    const now = new Date()
    const issueYear = now.getFullYear()
    const issueMonth = now.getMonth() + 1
    const expirationYear = issueYear + 100
    const expirationMonth = issueMonth
    const liUrl =
        `https://www.linkedin.com/profile/add?` +
        new URLSearchParams({
            startTask: 'CERTIFICATION_NAME',
            name: 'Post-It Note Certified Applicator',
            organizationId: '37415928',
            issueYear: String(issueYear),
            issueMonth: String(issueMonth),
            expirationYear: String(expirationYear),
            expirationMonth: String(expirationMonth),
            certUrl: 'https://www.posthog.com',
            certId: String(Date.now() + Math.random() * 1000), // Always unique
        }).toString()

    return (
        <div className="max-w-7xl mx-auto px-5 pt-10 pb-10">
            <HeroPostIt />

            <div id="features1">
                <section className="max-w-7xl mx-auto -mt-4 px-5 pb-6">
                    <div className="flex flex-col-reverse items-center @3xl:flex-row gap-8 pt-10">
                        <div
                            className="bg-[#FFFB7D] shadow-2xl border-none aspect-square w-full max-w-[420px] flex flex-col justify-center p-8 rotate-[-2deg] mx-auto"
                            style={{
                                minHeight: '420px', // Ensures it's always square
                                borderRadius: 0,
                            }}
                        >
                            <h2 className="font-extrabold text-3xl mt-0 text-black dark:text-black">
                                Post-Its have a <span className="text-[#FF5A1F] dark:text-[#FF5A1F]">problem</span>
                                ...
                            </h2>
                            <p className="text-black dark:text-black text-base">
                                We love Post-Its. They're a staple of every PostHog hackathon.
                            </p>
                            <p className="text-black dark:text-black text-base">
                                Session replay? Hedgehog mode? DeskHog? They all started as a Post-It.
                            </p>
                            <p className="text-black dark:text-black text-base">
                                Problem is, most Post-Its only stay sticky for a few minutes. We thought: How can we
                                stop them littering the floor like a carpet of multi-coloured genius?
                            </p>
                        </div>
                        <aside className="shrink-0 @3xl:basis-[500px] flex flex-col items-center">
                            <div className="p-1 max-w-[420px]">
                                <CloudinaryImage
                                    src="https://res.cloudinary.com/dmukukwp6/image/upload/postblock_76a0980525.png"
                                    alt="We love Post-Its"
                                    className="w-full max-w-[600px] rounded-[10px]"
                                />
                            </div>
                        </aside>
                    </div>
                </section>
            </div>

            <div id="features2">
                <section className="max-w-7xl mx-auto -mt-6 px-5 pb-6">
                    <div className="flex flex-col-reverse items-center @3xl:flex-row gap-8 mb-20">
                        <div
                            className="bg-[#ff96c2] shadow-2xl border-none aspect-square w-full max-w-[420px] flex flex-col justify-center p-8 rotate-[1deg] mx-auto"
                            style={{
                                minHeight: '420px', // Ensures it's always square
                                borderRadius: 0,
                            }}
                        >
                            <h2 className="font-extrabold text-3xl mt-0 text-black dark:text-black">
                                ... and the problem is you
                            </h2>
                            <p className="text-black dark:text-black text-base">
                                The root of 90% of technology problems is human error, so we developed a training
                                program to help our teams learn correct Post-It procedure.
                            </p>
                            <p className="text-black dark:text-black text-base">
                                It may seem strange, but Post-It training has enabled us to keep our ideas front-of-mind
                                and not top-of-carpet for years. Now, we're sharing it with you.
                            </p>
                        </div>
                        <aside className="shrink-0 @3xl:basis-[500px] flex flex-col items-center">
                            <div className="p-1 max-w-[420px]">
                                <CloudinaryImage
                                    src="https://res.cloudinary.com/dmukukwp6/image/upload/training_63069fae88.png"
                                    alt="We love Post-Its"
                                    className="w-full max-w-[400px] rounded-[10px]"
                                />
                            </div>
                        </aside>
                    </div>

                    <PostQuote
                        title="It's time to meet your instructor"
                        subtitle="His name is Marius and he's really passionate about Post-Its."
                        quote={`It all started at my first PostHog hackathon. So many of our ideas were falling to the floor. I couldn't take it. I had to do something.<br /><br />
                          <strong>Why? Because an idea that's floored is an idea that's ignored.</strong><br /><br />
                          Since then, I've trained over 100 PostHog staff and helped bring to life ideas like '<i>A PostHog videogame</i>', '<i>Better loading animations</i>', and '<i>A crocheted hedgehog</i>'.<br /><br />
                          Now, I'm sharing this training for the first time to help you get Post-It certified.`}
                        authorName="Marius Andra"
                    />

                    <section id="demo-video" className="mb-8 pt-4">
                        <h2 className="text-2xl @3xl:text-4xl text-center mb-8">
                            Ready to get <span className="text-red dark:text-yellow">Post-It certified?</span>
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
                        <ul className="list-none p-0 grid @3xl:grid-cols-3 gap-4">
                            {subfeatures.map((subfeature, index) => {
                                return <Subfeature {...subfeature} key={index} />
                            })}
                        </ul>
                    </div>
                </section>
            </div>

            <section className="py-10 mb-10">
                <h2 className="text-4xl lg:text-5xl text-center mb-2">
                    Congratulations, you are now <span className="text-red dark:text-yellow">Post-It certified</span>
                </h2>
                <h3 className="text-2xl text-center mb-12">
                    Tell the world you're Post-It certified to boost your chances of getting hired here by 20%
                </h3>

                <div className="flex justify-center gap-2">
                    <CallToAction href={liUrl} type="primary" size="lg" externalNoIcon>
                        <>Add to LinkedIn profile</>
                    </CallToAction>
                    <CallToAction
                        href="https://x.com/intent/tweet?text=I just got Post-It certified by @PostHog 📝 — now my ideas actually stick! https://posthog.com/academy"
                        type="primary"
                        size="lg"
                        externalNoIcon
                    >
                        <>Share on X</>
                    </CallToAction>
                </div>
            </section>
        </div>
    )
}

export default function Academy() {
    return (
        <>
            <SEO
                title="Post-It training academy: master the art of sticky notes"
                description="Learn the ancient art of Post-It adhesion from the masters at PostHog."
                image={`/images/og/postit-training.jpg`}
            />
            <Editor
                maxWidth="100%"
                proseSize="base"
                bookmark={{
                    title: 'Academy',
                    description: 'Post-It training academy',
                }}
            >
                <AcademyContent />
            </Editor>
        </>
    )
}
