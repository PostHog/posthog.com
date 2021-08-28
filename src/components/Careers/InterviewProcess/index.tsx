import React from 'react'

import { Structure } from '../../Structure'
import { mergeClassList } from '../../../lib/utils'
import applicationImg from './images/application.svg'
import cultureInterviewImg from './images/culture-interview.svg'
import technicalInterviewImg from './images/technical-interview.svg'
import superdayImg from './images/superday.svg'
import offerImg from './images/offer.svg'

interface InterviewStepProps {
    image: string
    title: string
    children: any
    titleColor: string
    className?: string
}

const InterviewStep = ({ image, title, children, titleColor, className = '' }: InterviewStepProps) => {
    const classList = mergeClassList(
        'flex flex-col md:flex-row w-full justify-between md:items-center text-center md:text-left',
        className
    )

    return (
        <div className={classList}>
            <div className="flex-shrink-0 mx-auto md:mr-8 flex justify-center items-center w-auto bg-gray-100 bg-opacity-10 rounded border-3 border-white border-opacity-30 border-solid">
                <img src={image} alt={title} className="max-w-full block mb-0 h-24 w-24 p-4" />
            </div>
            <div className="flex-grow text-left">
                <h4 className="mb-0 font-sans font-normal text-lg mt-4 md:mt-0" style={{ color: titleColor }}>
                    {title}
                </h4>

                {children}
            </div>
        </div>
    )
}

export const InterviewProcess = () => {
    return (
        <div className="pt-24 mb-16 text-white text-center" id="interviewing">
            <Structure.Section width="3xl">
                <Structure.SectionHeader
                    title="Interview process"
                    titleTag="h2"
                    leadText="You can expect a fast, yet thorough process. While it differs by role, we usually follow a structure of the following stages:"
                    leadTextClassName="opacity-80"
                />

                <div className="w-full bg-black bg-opacity-20 rounded-lg p-4 md:p-8 lg:p-12 text-left grid sm:grid-cols-2 md:grid-cols-1 sm:gap-12 md:gap-8">
                    <InterviewStep title="1. Application" titleColor="#E83DEC" image={applicationImg}>
                        <p className="mb-0 text-opacity-75">
                            Our talent team will review your application to see how your skills and experience align
                            with our needs.
                        </p>
                    </InterviewStep>

                    <InterviewStep
                        title="2. Culture interview"
                        titleColor="#FF2F93"
                        image={cultureInterviewImg}
                        className="mt-12 md:mt-0"
                    >
                        <p className="text-opacity-75 mb-2">
                            If we think there could be a fit, we’ll set up a 30-minute video call.
                        </p>
                        <p className="mb-0 text-white text-opacity-75">
                            Our goal is to explore your motivations to join our team, learn why you’d be a great fit,
                            and answer questions about us.
                        </p>
                    </InterviewStep>

                    <InterviewStep
                        title="3. Technical interview"
                        titleColor="#E74B12"
                        image={technicalInterviewImg}
                        className="mt-12 md:mt-0"
                    >
                        <p className="mb-0 text-white text-opacity-75">
                            Next is a 45-minute technical interview, depending on role. You'll meet the hiring team who
                            will evaluate skills needed to be successful in your role.
                        </p>
                    </InterviewStep>

                    <InterviewStep
                        title="4. PostHog SuperDay"
                        titleColor="#B25F20"
                        image={superdayImg}
                        className="mt-12 md:mt-0"
                    >
                        <p className="mb-0 text-white text-opacity-75">
                            The final stage is a paid SuperDay! You’ll join standup, meet the team, and work on a task
                            related to your role, offering a realistic view of what it’s like working at PostHog.
                        </p>
                    </InterviewStep>

                    <InterviewStep title="5. Offer" titleColor="#F7A501" image={offerImg} className="mt-12 md:mt-0">
                        <p className="mb-0 text-white text-opacity-75">
                            That’s it! If everyone’s happy, we’ll make you an offer to join us - YAY!
                        </p>
                    </InterviewStep>
                </div>
            </Structure.Section>
        </div>
    )
}
