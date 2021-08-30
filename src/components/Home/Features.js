import React, { useState, useRef } from 'react'
import Slider from 'react-slick'
import { StaticImage } from 'gatsby-plugin-image'
import Icon from './Icon'
import { SliderNav } from 'components/Icons/Icons'
import { CallToAction } from 'components/CallToAction'
import { section, heading } from './classes'

const FeatureButton = ({ title, index, activeFeature, sliderRef }) => {
    const borderColor = index === activeFeature ? 'red' : 'gray'
    const textColor = index === activeFeature ? 'red' : 'primary'
    const handClick = () => {
        sliderRef.current.slickGoTo(index)
    }
    return (
        <button className={`border-b-4 border-${borderColor} text-${textColor}`} onClick={handClick}>
            {title}
        </button>
    )
}

const SliderItem = ({ image, description, icon, feature }) => {
    return (
        <div>
            <div className="p-6 sm:p-10 border-r border-dashed max-w-lg md:max-w-2xl lg:max-w-4xl w-full border-gray-accent-light">
                {image}
                <p className="font-semibold mt-2 before:border-l-4 before:border-gray before:rounded before:mr-2 mb-0">
                    {description} <Icon className="w-8 h-8 inline-block" name={icon} /> {feature}
                </p>
            </div>
        </div>
    )
}

export default function Features() {
    const [activeFeature, setActiveFeature] = useState(0)
    const sliderRef = useRef(null)

    const sliderSettings = {
        dots: false,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        variableWidth: true,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 639,
                settings: {
                    variableWidth: false,
                },
            },
        ],
    }

    const sliderImageProps = {
        quality: 100,
        height: 500,
        width: 890,
    }

    const handleChange = (oldIndex, newIndex) => {
        setActiveFeature(newIndex)
    }

    return (
        <section className={section()}>
            <div>
                <h2 className={heading('lg', 'primary', 'max-w-[1100px] mx-auto')}>
                    Everything product-led teams need <span className="text-yellow">in one place</span>
                </h2>
                <h3 className="text-base md:text-2xl text-center mt-4 md:mt-8">
                    One platform for{' '}
                    <FeatureButton
                        sliderRef={sliderRef}
                        activeFeature={activeFeature}
                        index={0}
                        title="funnel analysis"
                    />
                    ,{' '}
                    <FeatureButton
                        sliderRef={sliderRef}
                        activeFeature={activeFeature}
                        index={1}
                        title="product usage trends"
                    />
                    ,{' '}
                    <FeatureButton
                        sliderRef={sliderRef}
                        activeFeature={activeFeature}
                        title="session recordings"
                        index={2}
                    />{' '}
                    &{' '}
                    <FeatureButton
                        sliderRef={sliderRef}
                        activeFeature={activeFeature}
                        index={3}
                        title="feature flags"
                    />
                </h3>
            </div>

            <div className="flex justify-center space-x-2 my-8">
                <button onClick={() => sliderRef.current.slickPrev()}>
                    <SliderNav className="transform rotate-180" bgColor="#E5E7E0" arrowColor="#BFBFBC" />
                </button>
                <button onClick={() => sliderRef.current.slickNext()}>
                    <SliderNav bgColor="black" arrowColor="#EEEFE9" />
                </button>
            </div>
            <div className="max-w-screen-2xl mx-auto border-t border-b border-dashed border-gray-accent-light">
                <Slider beforeChange={handleChange} ref={sliderRef} {...sliderSettings}>
                    <SliderItem
                        image={<StaticImage {...sliderImageProps} src="../../images/funnels-slide.jpg" />}
                        description="Identify dropoff and prioritize product changes with"
                        icon="funnels"
                        feature="Funnels"
                    />
                    <SliderItem
                        width={890}
                        image={<StaticImage {...sliderImageProps} src="../../images/trends-slide.jpg" />}
                        description="See changes in product usage with"
                        icon="trends"
                        feature="Trends"
                    />
                    <SliderItem
                        width={890}
                        image={<StaticImage {...sliderImageProps} src="../../images/session-recordings-slide.jpg" />}
                        description="Understand why with"
                        icon="session-recordings-with-bg"
                        feature="Session recordings"
                    />
                    <SliderItem
                        width={890}
                        image={<StaticImage {...sliderImageProps} src="../../images/feature-flags-slide.jpg" />}
                        description="Roll out changes safely with"
                        icon="feature-flags-with-bg"
                        feature="Feature flags"
                    />
                </Slider>
            </div>
            <div className="px-4 text-center my-16">
                <h4 className="text-3xl font-bold mb-8">
                    <span className="opacity-40">Plus</span> cohorts, user paths, retention, session browsing
                    <br />{' '}
                    <span className="text-xl">
                        & synced annotations <span className="opacity-40">across every view in the platform</span>
                    </span>
                </h4>
                <CallToAction
                    type="button"
                    outline
                    to="/docs/user-guides"
                    className="bg-tan text-primary hover:text-primary"
                >
                    Explore all features
                </CallToAction>
            </div>
        </section>
    )
}
