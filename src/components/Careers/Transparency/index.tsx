import React from 'react'

import { Structure } from '../../Structure'
import { mergeClassList } from '../../../lib/utils'
import { BoardMeetings, Compensation, Feedback, Finances } from 'components/Careers/Images'
import boardMeetingsImg from './images/board-meetings.svg'
import financesImg from './images/finances.svg'
import feedbackImg from './images/feedback.svg'

interface TransparencyFeatureProps {
    Image: any
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
                <h5 className="mb-2">{title}</h5>
                <p className="">{description}</p>
            </div>
        </div>
    )
}

const TransparencyFeature = ({ Image, title, children, className = '' }: TransparencyFeatureProps) => {
    const classList = mergeClassList('flex flex-col w-full justify-between items-start', className)

    return (
        <div className={classList}>
            <div className="flex-shrink-0 flex justify-center items-start w-auto">
                <Image className="w-24 h-24" />
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
        <div className="careers-transparency pt-12 text-center" id="transparency">
            <Structure.Section width="4xl">
                <Structure.SectionHeader
                    title="The most transparent company, ever"
                    titleClassName="text-4xl"
                    titleTag="h2"
                    leadText="We're open-source and fully remote. In order to enable teams to make great decisions, we share as much information as we can. This includes:"
                    leadTextClassName="opacity-80"
                />
            </Structure.Section>

            <div className="w-full max-w-screen-xl md:px-4 md:mx-auto my-16 text-left grid sm:grid-cols-2 gap-4">
                <div className="bg-accent dark:bg-accent-dark mx-4 md:mx-0 px-4 py-8 rounded-lg">
                    <TransparencyFeature title="Compensation" Image={Compensation} className="max-w-md mx-auto">
                        <p className="mb-0 text-base">
                            We pay generously and built a{' '}
                            <a href="/handbook/people/compensation">compensation calculator</a> to keep salary
                            discussions simple and fair. You’ll know your approximate starting salary before you even
                            apply.
                        </p>
                    </TransparencyFeature>
                </div>

                <div className="bg-accent dark:bg-accent-dark mx-4 md:mx-0 px-4 py-8 rounded-lg">
                    <TransparencyFeature title="Board meetings" Image={BoardMeetings} className="max-w-md mx-auto">
                        <p className="mb-0 text-base">
                            We share slides from each board meeting internally. When everyone knows the direction we're
                            headed and the obstacles we face, they can decide where their time is best spent.
                        </p>
                    </TransparencyFeature>
                </div>

                <div className="bg-accent dark:bg-accent-dark mx-4 md:mx-0 px-4 py-8 rounded-lg">
                    <TransparencyFeature title="Fundraising & finances" Image={Finances} className="max-w-md mx-auto">
                        <p className="mb-0 text-base">
                            We keep our team informed about fundraising during the process and share a monthly report
                            covering revenue, runway, and more. It's nice when you can see your hard work paying off
                            (literally).
                        </p>
                    </TransparencyFeature>
                </div>

                <div className="bg-accent dark:bg-accent-dark mx-4 md:mx-0 px-4 py-8 rounded-lg">
                    <TransparencyFeature title="Constructive feedback" Image={Feedback} className="max-w-md mx-auto">
                        <p className="mb-0 text-base">
                            Transparency is a two-way street. We encourage individual feedback and run regular
                            360-degree group sessions with the whole company, so everyone can improve.
                        </p>
                    </TransparencyFeature>
                </div>
            </div>

            <div id="who-we-hire">
                <Structure.Section width="5xl">
                    <Structure.SectionHeader
                        title="Go big"
                        titleTag="h2"
                        leadText="Our mission is to increase the number of successful products in the world."
                        leadTextClassName=""
                    />
                </Structure.Section>
                <div className="pb-16 px-4 md:px-0">
                    <p className="text-base font-semibold max-w-2xl mx-auto mb-12 px-4 text-left md:text-center">
                        In 2026 we aim to go public with $100M revenue. To achieve this, PostHog will need to be the
                        standard devtool for building better products.
                    </p>

                    <h3 className="mb-4 px-4 text-left md:text-center">We look for people who are:</h3>

                    <div className="grid sm:grid-cols-3 sm:gap-8 lg:gap-24 max-w-6xl mx-auto px-4">
                        <TransparencyMattersItem
                            title="Different"
                            description="We look for adventurers. We're here to take a small company to IPO, and beyond. We will only get there if we think differently to everyone else. We're not a fit if you want a predictable career. "
                        />
                        <TransparencyMattersItem
                            title="Individual contributors"
                            description="We think it's more important to hire exceptional people, then give them autonomy and plenty of context. We're not a fit if management responsibility is what motivates you."
                        />
                        <TransparencyMattersItem
                            title="Scrappy"
                            description="Fast, low ego people thrive here. We're informal, we use clear language and get a broad variety of work done fast. We're not a fit if you want process."
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
