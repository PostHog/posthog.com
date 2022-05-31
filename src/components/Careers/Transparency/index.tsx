import React from 'react'

import { Structure } from '../../Structure'
import { mergeClassList } from '../../../lib/utils'
import compensationImg from './images/compensation.svg'
import boardMeetingsImg from './images/board-meetings.svg'
import financesImg from './images/finances.svg'
import feedbackImg from './images/feedback.svg'

interface TransparencyFeatureProps {
    image: string
    title: string
    children: any
    className?: string
}

interface TransparencyMattersProps {
    title: string
    description: string
    className?: string
}

const TransparencyMattersItem = ({ title, description, className = '' }: TransparencyMattersProps) => {
    const classList = mergeClassList('text-left', className)

    return (
        <div className={classList}>
            <div className="text-left">
                <h5 className="mb-0">{title}</h5>
                <p className="text-base">{description}</p>
            </div>
        </div>
    )
}

const TransparencyFeature = ({ image, title, children, className = '' }: TransparencyFeatureProps) => {
    const classList = mergeClassList('flex flex-col w-full justify-between items-start', className)

    return (
        <div className={classList}>
            <div className="flex-shrink-0 flex justify-center items-start w-auto">
                <img src={image} alt={title} className="max-w-full block h-24 w-24 p-2 pl-0 mb-2" />
            </div>
            <div className="flex-grow text-left">
                <h3 className="my-2 text-xl">{title}</h3>

                {children}
            </div>
        </div>
    )
}

export const Transparency = () => {
    return (
        <div className="careers-transparency pt-12 md:pt-24 text-center" id="transparency">
            <Structure.Section width="4xl">
                <Structure.SectionHeader
                    title="The most transparent company, ever"
                    titleClassName="text-4xl"
                    titleTag="h2"
                    leadText="We're open-source and fully remote. In order to enable teams to make great decisions, we share as much information as we can. This includes:"
                    leadTextClassName="opacity-80"
                />
            </Structure.Section>

            <div className="w-full my-16 text-left grid sm:grid-cols-2 border-gray-accent-light border-dashed border-l-0 border-r-0 border-t border-b">
                <div className="border-gray-accent-light border-dashed border-b-0 border-t-0 sm:border-t-0 sm:border-l px-4 py-8 md:py-12 border-r-0">
                    <TransparencyFeature title="Compensation" image={compensationImg} className="max-w-md mx-auto">
                        <p className="mb-0 text-base text-black font-lightish">
                            We pay generously and built a{' '}
                            <a href="/handbook/people/compensation">compensation calculator</a> to keep salary
                            discussions simple and fair. You’ll know your approximate starting salary before you even
                            apply.
                        </p>
                    </TransparencyFeature>
                </div>

                <div className="border-gray-accent-light border-dashed border-b-0 border-t sm:border-t-0 border-l px-4 py-8 md:py-12 border-r">
                    <TransparencyFeature title="Board meetings" image={boardMeetingsImg} className="max-w-md mx-auto">
                        <p className="mb-0 text-base text-black font-lightish">
                            We share slides from each board meeting internally. When everyone knows the direction we're
                            headed and the obstacles we face, they can decide where their time is best spent.
                        </p>
                    </TransparencyFeature>
                </div>

                <div className="border-gray-accent-light border-dashed border-b-0 border-t border-l px-4 py-8 md:py-12 border-r-0">
                    <TransparencyFeature
                        title="Fundraising & finances"
                        image={financesImg}
                        className="max-w-md mx-auto"
                    >
                        <p className="mb-0 text-base text-black font-lightish">
                            We keep our team informed about fundraising during the process and share a monthly report
                            covering revenue, runway, and more. It's nice when you can see your hard work paying off
                            (literally).
                        </p>
                    </TransparencyFeature>
                </div>

                <div className="border-gray-accent-light border-dashed border-b-0 border-t border-l px-4 py-8 md:py-12 border-r">
                    <TransparencyFeature title="Constructive feedback" image={feedbackImg} className="max-w-md mx-auto">
                        <p className="mb-0 text-base text-black font-lightish">
                            Transparency is a two-way street. We encourage individual feedback and run regular
                            360-degree group sessions with the whole company, so everyone can improve.
                        </p>
                    </TransparencyFeature>
                </div>
            </div>

            <Structure.Section width="4xl">
                <Structure.SectionHeader
                    title="Go big"
                    titleClassName="text-4xl"
                    titleTag="h2"
                    leadText="Our mission is to increase the number of successful products in the world. 
                    In 2026 we aim to go public with $100M revenue. To achieve this, PostHog will need to be the standard devtool for building better products."
                    leadTextClassName="opacity-80"
                />
            </Structure.Section>
            <div className="pb-16 px-4 md:px-0">
                <br />
                <br />
                <h3 className="mb-8">We look for people who are:</h3>

                <div className="grid sm:grid-cols-3 sm:gap-8 lg:gap-24 max-w-6xl mx-auto px-4">
                    <TransparencyMattersItem
                        title="Different"
                        description="We look for adventurers. We're here to take a small company to IPO, and beyond. We won't get there if we all think like everyone else. We're not a fit if you want a predictable career. "
                    />
                    <TransparencyMattersItem
                        title="Individual contributors"
                        description="We think it's more important to give autonomy, plenty of context, and to hire exceptional people, versus hand holding. We're not a fit if you want management responsibility."
                    />
                    <TransparencyMattersItem
                        title="Scrappy"
                        description="Fast, low ego people thrive here. We're informal, we use simple words and get a broad variety of work done fast. We're not a fit if you want process."
                    />
                </div>
            </div>
        </div>
    )
}
