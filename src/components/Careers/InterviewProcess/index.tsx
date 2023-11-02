import React, { useState, useRef } from 'react'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import { Structure } from '../../Structure'
import Slider from 'react-slick'
import SliderNav from '../../SliderNav'

import './index.css'
import { Application, Culture, Offer, Superday, Technical } from '../Images'

const SliderItem = ({ Image, title, subtitle, description }) => {
    return (
        <div className="flex sm:max-w-[calc(100vw/2+50px)] md:max-w-[calc(100vw/3+50px)] xl:max-w-[calc(100vw/4+50px)] 2xl:max-w-[calc(100vw/5+50px)] flex-col py-5 px-10 items-start">
            <Image className="mb-9 w-16 h-16" />
            <h4 className="m-0">{title}</h4>
            <h5 className="font-semibold mb-3 leading-tight">{subtitle}</h5>
            <p className="text-[15px] m-0">{description}</p>
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
        slidesToScroll: 1,
        autoplay: false,
        variableWidth: true,
        responsive: [
            {
                breakpoint: 639,
                settings: {
                    variableWidth: false,
                },
            },
        ],
    }
    const breakpoints = useBreakpoint()
    const slidesToShow = breakpoints.md ? 1 : breakpoints.lg ? 2 : breakpoints.xl ? 3 : 4
    const handleChange = (_oldIndex, newIndex) => {
        setCurrentSlide(newIndex)
    }
    return (
        <div className="pt-24 mb-16 text-center" id="interview-process">
            <Structure.Section width="5xl">
                <Structure.SectionHeader
                    title="Get paid to try working here"
                    titleTag="h2"
                    leadText="We do 2-3 short interviews, then pay you to do some real life, or close to real life, work:"
                    leadTextClassName=""
                />
            </Structure.Section>
            <SliderNav
                handlePrevious={() => sliderRef.current.slickPrev()}
                handleNext={() => sliderRef.current.slickNext()}
                currentIndex={currentSlide}
                length={5 - slidesToShow}
            />
            <Slider
                beforeChange={handleChange}
                className="text-left careers-slider"
                ref={sliderRef}
                slidesToShow={slidesToShow}
                {...sliderSettings}
            >
                <SliderItem
                    Image={Application}
                    title="1. Application"
                    subtitle="Our talent team will review your application"
                    description="We’re looking to see how your skills and experience align with our needs."
                />
                <SliderItem
                    Image={Culture}
                    title="2. Culture interview"
                    subtitle="A 30-minute video call"
                    description="Our goal is to explore your motivations to join our team, learn why you’d be a great fit, and answer questions about us."
                />
                <SliderItem
                    Image={Technical}
                    title="3. Technical interview"
                    subtitle="45 minutes, varies by role"
                    description="You'll meet the hiring team who will evaluate skills needed to be successful in your role. No live coding."
                />
                <SliderItem
                    Image={Superday}
                    title="4. PostHog SuperDay"
                    subtitle="Paid day of work"
                    description="You’ll join a standup, meet the team, and work on a task related to your role, offering a realistic view of what it’s like working at PostHog."
                />
                <SliderItem
                    Image={Offer}
                    title="5. Offer"
                    subtitle="Pop the champagne (after you sign)"
                    description="If everyone’s happy, we’ll make you an offer to join us - YAY!"
                />
            </Slider>
        </div>
    )
}
