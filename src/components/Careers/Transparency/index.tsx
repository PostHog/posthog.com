import React from 'react'

import { Structure } from '../../Structure'
import { mergeClassList } from '../../../lib/utils'
import { BoardMeetings, Compensation, Feedback, Finances } from 'components/Careers/Images'
import boardMeetingsImg from './images/board-meetings.svg'
import financesImg from './images/finances.svg'
import feedbackImg from './images/feedback.svg'
import Logo from 'components/Logo'
import { StaticImage } from 'gatsby-plugin-image'
import { CallToAction } from 'components/CallToAction'
import CloudinaryImage from 'components/CloudinaryImage'

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
                <Image className="size-16 lg:size-24" />
            </div>
            <div className="flex-grow text-left pt-2">
                <h3 className="my-2 text-xl">{title}</h3>

                {children}
            </div>
        </div>
    )
}

export const Transparency = () => {
    const getPreviousMonth = () => {
        const now = new Date()
        now.setMonth(now.getMonth() - 1)
        return now.toLocaleString('default', { month: 'long', year: 'numeric' })
    }

    const handleOpenReport = () => {
        alert("Nice try... you'll have to join us first!")
    }

    return (
        <div className="careers-transparency py-12">
            <div className="w-11/12 max-w-4xl mx-auto md:text-center">
                <h2 className="text-4xl md:text-5xl">
                    The most transparent company, <em className="text-red dark:text-yellow">ever</em>
                </h2>
                <h4 className="lg:text-center opacity-70 font-medium max-w-2xl mx-auto leading-tight text-lg">
                    We're open-source and fully remote. In order to enable teams to make great decisions, we share as
                    much information as we can. This includes:
                </h4>
            </div>

            <div className="w-full max-w-screen-xl md:px-4 md:mx-auto mt-8 mb-16 text-left grid md:grid-cols-3 gap-4">
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
                            360-degree group sessions during small team off-sites, so everyone can improve.
                        </p>
                    </TransparencyFeature>
                </div>
            </div>

            <h3 className="text-3xl lg:text-4xl mb-4 text-center">Latest monthly financial report</h3>

            <div className="flex justify-center max-w-5xl mx-auto">
                <div className="bg-white aspect-video dark:bg-accent-dark rounded-md p-4 xs:px-6 xl:py-6 xl:px-8 mx-4 xl:mx-8 border border-light dark:border-dark relative w-full">
                    <div className="absolute left-0 top-0 w-full h-full bg-black/40 z-10 rounded-md"></div>
                    <Logo className="h-6 xs:h-8 sm:h-12 -ml-3 xs:ml-0 mb-4 sm:mb-8 md:mb-10" />
                    <div className="text-2xl xs:text-[1.5rem] sm:text-[2rem] md:text-[3rem] lg:text-[4rem] font-extrabold font-['Helvetica','Arial'] mb-1 xs:mb-2 md:mb-4 lg:mb-8">
                        Management report
                    </div>
                    <div className="text-lg xs:text-xl sm:text-2xl lg:text-4xl font-semibold font-['Helvetica','Arial']">
                        {getPreviousMonth()}
                    </div>
                    <div className="absolute top-4 right-4">
                        <span className="bg-black/60 rounded text-white px-2 py-1 text-sm font-semibold">1 of 8</span>
                    </div>
                    <div className="absolute bottom-2 right-2">
                        <CloudinaryImage
                            width={260}
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/business_hog_adb9cf3c35.png"
                            alt="This hog's presenting in a suit and tie"
                            className="w-32 xs:w-32 sm:w-48 md:w-64"
                        />
                    </div>
                    <div className="absolute bottom-3 left-3 xs:bottom-6 xs:left-6">
                        <span className="text-red uppercase border border-red rounded-sm text-xs md:text-sm p-1 font-bold font-['Helvetica','Arial']">
                            Confidential
                        </span>
                    </div>
                    <div className="absolute z-20 left-0 top-0 w-full h-full flex justify-center items-center">
                        <CallToAction type="secondary" onClick={handleOpenReport}>
                            Open report
                        </CallToAction>
                    </div>
                </div>
            </div>
        </div>
    )
}
