import { CallToAction } from 'components/CallToAction'
import SliderNav from 'components/SliderNav'
import { StaticImage } from 'gatsby-plugin-image'
import React, { useRef, useState } from 'react'
import Slider from 'react-slick'
import { heading, section } from './classes'

const FeatureButton = ({ title, index, activeFeature, sliderRef }) => {
    const borderColor = index === activeFeature ? 'red' : 'gray'
    const textColor = index === activeFeature ? 'red' : 'primary'
    const handClick = () => {
        sliderRef.current.slickGoTo(index)
    }
    return (
        <button className={`border-b-3 border-${borderColor} text-${textColor}`} onClick={handClick}>
            {title}
        </button>
    )
}

const SliderItem = ({ image, description, icon, feature }) => {
    return (
        <div>
            <div className="p-6 sm:p-10 max-w-lg md:max-w-2xl lg:max-w-4xl w-full">{image}</div>
        </div>
    )
}

export default function Features({ title }) {
    const [activeFeature, setActiveFeature] = useState(0)
    const sliderRef = useRef(null)

    const sliderSettings = {
        dots: false,
        infinite: false,
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
    }

    const handleChange = (oldIndex, newIndex) => {
        setActiveFeature(newIndex)
    }

    return (
        <section className={section()}>
            <div>
                <h2 className={heading('lg', 'primary', 'max-w-[1100px] mx-auto')}>{title}</h2>
                <h3 className="text-lg md:text-2xl text-center md:px-8 mt-4 md:mt-8">
                    One platform for{' '}
                    <FeatureButton
                        sliderRef={sliderRef}
                        activeFeature={activeFeature}
                        index={0}
                        title="product analytics"
                    />
                    ,{' '}
                    <FeatureButton
                        sliderRef={sliderRef}
                        activeFeature={activeFeature}
                        index={1}
                        title="funnel analysis"
                    />
                    ,{' '}
                    <FeatureButton
                        sliderRef={sliderRef}
                        activeFeature={activeFeature}
                        title="session recording"
                        index={2}
                    />
                    , <br className="hidden lg:block" />
                    <FeatureButton
                        sliderRef={sliderRef}
                        activeFeature={activeFeature}
                        index={3}
                        title="feature flags"
                    />
                    ,{' '}
                    <FeatureButton
                        sliderRef={sliderRef}
                        activeFeature={activeFeature}
                        title="experimentation"
                        index={4}
                    />
                    ,{' '}
                    <FeatureButton
                        sliderRef={sliderRef}
                        activeFeature={activeFeature}
                        index={5}
                        title="collaboration"
                    />
                    , & <FeatureButton sliderRef={sliderRef} activeFeature={activeFeature} index={6} title="more" />
                </h3>
            </div>
            <SliderNav
                handlePrevious={() => sliderRef.current.slickPrev()}
                handleNext={() => sliderRef.current.slickNext()}
                currentIndex={activeFeature}
                length={6}
            />
            <div className="max-w-screen-2xl mx-auto">
                <Slider beforeChange={handleChange} ref={sliderRef} {...sliderSettings}>
                    <SliderItem image={<StaticImage {...sliderImageProps} src="./images/slide-trends.png" />} />
                    <SliderItem image={<StaticImage {...sliderImageProps} src="./images/slide-funnels.png" />} />
                    <SliderItem
                        image={<StaticImage {...sliderImageProps} src="./images/slide-session-recordings.png" />}
                    />
                    <SliderItem image={<StaticImage {...sliderImageProps} src="./images/slide-feature-flags.png" />} />
                    <SliderItem
                        image={<StaticImage {...sliderImageProps} src="./images/slide-experimentation-suite.png" />}
                    />
                    <SliderItem image={<StaticImage {...sliderImageProps} src="./images/slide-collaboration.png" />} />
                    <SliderItem image={<StaticImage {...sliderImageProps} src="./images/slide-plugins.png" />} />
                </Slider>
            </div>
            <div className="px-4 text-center my-16">
                <h4 className="text-3xl font-bold mb-8">
                    <span className="opacity-40">Plus</span> cohorts, user paths, retention,
                    <br />{' '}
                    <span className="text-xl block leading-tight mt-2">
                        & synced annotations <span className="opacity-40">across every view in the platform</span>
                    </span>
                </h4>
                <CallToAction width="56" type="outline" to="/product">
                    Explore all features
                </CallToAction>
            </div>
        </section>
    )
}
