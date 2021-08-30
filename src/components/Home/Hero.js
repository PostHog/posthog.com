import React from 'react'
import { CallToAction } from '../CallToAction'
import Icon from './Icon'
import Link from '../Link'
import { heading } from './classes'
import Slider from 'react-slick'

const Feature = ({ title, icon }) => {
    return (
        <div className="flex px-2 py-4 md:py-6 space-x-1 md:space-x-4 font-bold items-center justify-center border-r-2 border-dashed border-gray-accent-light">
            <Icon className={'w-6 h-6'} name={icon} />
            <span className="text-[12px] md:text-[16px]">{title}</span>
        </div>
    )
}

export default function Hero() {
    const sliderSettings = {
        dots: false,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 1090,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 650,
                settings: {
                    slidesToShow: 2,
                },
            },
        ],
    }
    return (
        <section className="md:h-[calc(100vh-87px)] flex flex-col justify-center items-center">
            <div className="text-center mt-6 md:mt-auto px-4">
                <h1 className={heading()}>
                    Host your own
                    <br /> product analytics suite
                </h1>
                <h2 className={heading('sm', 'primary', 'my-6')}>
                    With our open source platform, customer data never has to leave your infrastructure
                </h2>
                <div className="flex flex-col justify-center items-center space-y-2 md:space-y-4">
                    <CallToAction type="button" className="bg-primary border border-primary" width="56" to="/sign-up">
                        Get started
                    </CallToAction>
                    <CallToAction
                        type="button"
                        width="56"
                        outline
                        to="/schedule-demo"
                        className="bg-tan text-primary hover:text-primary"
                    >
                        Schedule a demo
                    </CallToAction>
                </div>
            </div>
            <p className="md:mt-auto my-10 md:mb-12 font-semibold">
                Don’t need to self host? Try <Link to="/sign-up">PostHog Cloud</Link>
            </p>
            <div className="bg-[#DFE0DA] bg-opacity-70 w-full">
                <Slider {...sliderSettings} className="list-none m-0 p-0">
                    <Feature icon="event-pipelines" title="Event pipelines" />
                    <Feature icon="analytics" title="Analytics" />
                    <Feature icon="session-recordings" title="Session recordings" />
                    <Feature icon="feature-flags" title="Feature flags" />
                    <Feature icon="data-warehouse" title="Export to data warehouse" />
                </Slider>
            </div>
        </section>
    )
}
