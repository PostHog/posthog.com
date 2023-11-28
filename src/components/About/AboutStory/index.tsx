import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import GitHubButton from 'react-github-btn'
import { YCBadge } from './yc-badge'
import { CallToAction } from 'components/CallToAction'
import { James, Tim } from 'components/Signatures'

export const AboutStory = () => {
    return (
        <section id="story" className="flex flex-col md:flex-row max-w-screen-xl mx-auto px-4 md:pl-8 md:pr-6">
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <h2 className="text-4xl">Our story</h2>
                    <h4>PostHog was hatched in Y Combinator's W20 batch.</h4>
                    <YCBadge className="float-right md:hidden ml-4 mb-2 mr-2 w-[95px] h-[63px] md:mr-12" />
                    <p>We launched on Hacker News with our MVP – just 4 weeks after we started writing code.</p>
                    <p>
                        The response was overwhelmingly positive. We had over 300 deployments in a couple of days. 2
                        weeks later, we'd gone past 1,500 stars on GitHub.
                    </p>

                    <CallToAction to="/handbook/story#timeline" className="w-full mdlg:w-auto">
                        Continue reading
                    </CallToAction>
                </div>
                <div className="inline-flex sm:flex-col mdlg:flex-row border-t border-primary/25 gap-8 sm:gap-2 mdlg:gap-8 items-center sm:items-start mdlg:items-center pt-3 pb-5 mt-6 sm:mr-12 mdlg:mr-24">
                    <p className="pb-0 mb-0 text-sm opacity-75">Want to be our next star?</p>
                    <span className="h-[28px] w-[125px]">
                        <GitHubButton
                            className="text-red hover:text-red"
                            href="https://github.com/posthog/posthog"
                            data-size="large"
                            data-show-count="true"
                            aria-label="Star posthog/posthog on GitHub"
                        >
                            Star
                        </GitHubButton>
                    </span>
                </div>
            </div>
            <aside className="grow-0 shrink-0 lg:basis-[calc(730px-4rem)] relative">
                <div className="hidden md:flex justify-end text-primary dark:text-primary-dark">
                    <YCBadge className="w-[95px] h-[63px] md:mr-12 lg:top-0" />
                </div>
                <div className="flex justify-end relative">
                    <StaticImage
                        src="./images/hn-screenshot.png"
                        width={620}
                        height={397.5}
                        alt="PostHog launches on HackerNews"
                        objectFit="contain"
                        className="rotate-2 -mb-8 md:-mb-4 md:-right-4 lg:right-0 -mx-4 md:mx-0 box-border md:w-[500px] lg:w-auto md:h-full lg:h-auto"
                    />
                    <div className="bg-gradient-to-b from-transparent to-tan dark:to-dark absolute w-full h-[60%] md:h-full md:top-12 lg:top-[initial] lg:h-[60%] bottom-0" />
                </div>
                <div className="absolute -bottom-8 lg:-bottom-16 left-4 md:-left-4 lg:-left-4">
                    <StaticImage
                        breakpoints={[750, 1080, 1366, 1920]}
                        src="./images/james.png"
                        width={385.5}
                        height={366}
                        quality={100}
                        alt="James Hawkins, CEO, Co-founder"
                        placeholder="none"
                        objectFit="contain"
                        className="w-[55vw] md:w-[300px] lg:w-auto"
                    />
                </div>
                <div className="text-primary dark:text-primary-dark absolute bottom-6 md:bottom-12 lg:bottom-6 left-4 md:-left-16 leading-tight">
                    <James />
                    <strong>James Hawkins</strong>
                    <span className="block text-sm">CEO, Co-founder</span>
                </div>
                <div className="absolute bottom-0 lg:-bottom-2 right-0 sm:right-12 lg:right-8">
                    <StaticImage
                        breakpoints={[750, 1080, 1366, 1920]}
                        src="./images/tim.png"
                        width={285}
                        height={320}
                        quality={100}
                        alt="Tim Glaser, CTO, Co-founder"
                        placeholder="none"
                        objectFit="contain"
                        className="w-[40vw] md:w-[230px] lg:w-auto"
                    />
                </div>
                <div className="absolute bottom-8 md:bottom-16 lg:bottom-16 -right-4 text-primary dark:text-primary-dark leading-tight">
                    <Tim />
                    <strong>Tim Glaser</strong>
                    <span className="block text-sm">CTO, Co-founder</span>
                </div>
            </aside>
        </section>
    )
}
