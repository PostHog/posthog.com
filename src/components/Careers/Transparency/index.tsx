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
                <h4 className="mb-0">{title}</h4>
                <p className="opacity-75">{description}</p>
            </div>
        </div>
    )
}

const TransparencyFeature = ({ image, title, children, className = '' }: TransparencyFeatureProps) => {
    const classList = mergeClassList('flex flex-col w-full justify-between items-start', className)

    return (
        <div className={classList}>
            <div className="flex-shrink-0 flex justify-center items-start w-auto">
                <img src={image} alt={title} className="max-w-full block mb-0 h-24 w-24 p-4" />
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
        <div className="careers-transparency pt-24 text-center" id="transparency">
            <Structure.Section width="4xl">
                <Structure.SectionHeader
                    title="The most transparent company, ever"
                    titleClassName="text-4xl"
                    titleTag="h2"
                    leadText="We're open-source and fully remote. In order to enable teams to make great decisions, we share as much information as we can. This includes:"
                    leadTextClassName="opacity-80"
                />

                <div className="w-full mb-16 md:p-8 lg:p-12 text-left grid sm:grid-cols-2 gap-12">
                    <TransparencyFeature title="Compensation" image={compensationImg}>
                        <p className="mb-0">
                            We pay top of the market and built a{' '}
                            <a href="/handbook/people/compensation" style={{ color: '#FFB053' }}>
                                compensation calculator
                            </a>{' '}
                            to keep salary discussions simple and fair. You’ll know your approximate starting salary
                            before you even apply.
                        </p>
                    </TransparencyFeature>

                    <TransparencyFeature title="Board meetings" image={boardMeetingsImg} className="">
                        <p className="mb-0">
                            We share slides from each board meeting internally. When everyone knows the direction we're
                            headed and the obstacles we face, they can decide where their time is best spent.
                        </p>
                    </TransparencyFeature>

                    <TransparencyFeature title="Fundraising & finances" image={financesImg} className="">
                        <p className="mb-0">
                            We keep our team informed about fundraising and share a monthly report covering revenue,
                            runway, and more. It's nice when you can see your hard work paying off (literally).
                        </p>
                    </TransparencyFeature>

                    <TransparencyFeature title="Constructive feedback" image={feedbackImg} className="">
                        <p className="mb-0">
                            Transparency is a two-way street. We encourage individual feedback and run regular
                            360-degree group sessions with the whole company, so everyone can improve.
                        </p>
                    </TransparencyFeature>
                </div>

                <div className="pb-16">
                    <h3 className="mb-8">Why transparency matters</h3>

                    <div className="grid sm:grid-cols-3 sm:gap-8">
                        <TransparencyMattersItem
                            title="Trust"
                            description="A fully remote environment only works when we all trust each other."
                        />
                        <TransparencyMattersItem
                            title="Inclusivity"
                            description="Sharing information means all of us can have a voice in PostHog's future."
                        />
                        <TransparencyMattersItem
                            title="Growth"
                            description="We enable everyone to make informed decisions about what they spend time on."
                        />
                    </div>
                </div>
            </Structure.Section>
        </div>
    )
}
