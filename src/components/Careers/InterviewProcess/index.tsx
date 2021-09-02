import React, { useState, useRef } from 'react'

import { Structure } from '../../Structure'
import { mergeClassList } from '../../../lib/utils'
import Slider from 'react-slick'
import application from './images/application.svg'
import culture from './images/culture.svg'
import technical from './images/technical.svg'
import superday from './images/superday.svg'
import offer from './images/offer.svg'
import SliderNav from '../../SliderNav'
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

const SliderItem = ({ image, title, subtitle, description }) => {
    return (
        <div className="flex flex-col max-w-xs py-5 px-10 items-start border-r border-dashed border-gray-accent-light">
            <img className="mb-9" src={image} />
            <h4 className="text-primary m-0">{title}</h4>
            <h5 className="text-primary font-semibold mb-3 leading-tight">{subtitle}</h5>
            <p className="text-[15px] text-primary m-0">{description}</p>
        </div>
    )
}

export const InterviewProcess = () => {
    const sliderRef = useRef(null)
    const [currentSlide, setCurrentSlide] = useState(0)
    const sliderSettings = {
        dots: false,
        infinite: false,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        variableWidth: true,
    }
    const handleChange = (_oldIndex, newIndex) => {
        setCurrentSlide(newIndex)
    }
    return (
        <div className="pt-24 mb-16 text-center" id="interview-process">
            <Structure.Section width="3xl">
                <Structure.SectionHeader
                    title="Interview process"
                    titleTag="h2"
                    leadText="You can expect a fast, yet thorough process. While it differs by role, we usually follow a structure of the following stages:"
                    leadTextClassName="opacity-80"
                />
            </Structure.Section>
            <SliderNav
                handlePrevious={() => sliderRef.current.slickPrev()}
                handleNext={() => sliderRef.current.slickNext()}
                currentIndex={currentSlide}
                length={4}
            />
            <Slider beforeChange={handleChange} className="text-left" ref={sliderRef} {...sliderSettings}>
                <SliderItem
                    image={application}
                    title="1. Application"
                    subtitle="Our talent team will review your application"
                    description="We’re looking to see how your skills and experience align with our needs."
                />
                <SliderItem
                    image={culture}
                    title="2. Culture interview"
                    subtitle="A 30-minute video call"
                    description="Our goal is to explore your motivations to join our team, learn why you’d be a great fit, and answer questions about us."
                />
                <SliderItem
                    image={technical}
                    title="3. Technical interview"
                    subtitle="45 minutes, varies by role"
                    description="You'll meet the hiring team who will evaluate skills needed to be successful in your role."
                />
                <SliderItem
                    image={superday}
                    title="4. PostHog SuperDay"
                    subtitle="Paid day of work"
                    description="You’ll join standup, meet the team, and work on a task related to your role, offering a realistic view of what it’s like working at PostHog."
                />
                <SliderItem
                    image={offer}
                    title="5. Offer"
                    subtitle="Pop the champagne (after you sign)"
                    description="If everyone’s happy, we’ll make you an offer to join us - YAY!"
                />
            </Slider>
        </div>
    )
}
