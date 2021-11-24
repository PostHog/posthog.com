import { CallToAction } from 'components/CallToAction'
import SliderNav from 'components/SliderNav'
import { StaticImage } from 'gatsby-plugin-image'
import React, { useRef, useState } from 'react'
import Slider from 'react-slick'
import { heading, section } from './classes'
import Icon from './Icon'

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
            </div>
        </div>
    )
}

export default function Features() {
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
                <h2 className={heading('lg', 'primary', 'max-w-[1100px] mx-auto')}>
                    Everything product-led teams need <span className="text-yellow">in one place</span>
                </h2>
                <h3 className="text-lg md:text-2xl text-center mt-4 md:mt-8">
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
                        title="session recordings"
                        index={2}
                    />{' '}
                    <FeatureButton
                        sliderRef={sliderRef}
                        activeFeature={activeFeature}
                        index={3}
                        title="feature flags"
                    />{' '}
                    & <FeatureButton sliderRef={sliderRef} activeFeature={activeFeature} index={4} title="more" />
                </h3>
            </div>
            <SliderNav
                handlePrevious={() => sliderRef.current.slickPrev()}
                handleNext={() => sliderRef.current.slickNext()}
                currentIndex={activeFeature}
                length={4}
            />
            <div className="max-w-screen-2xl mx-auto border-t border-b border-dashed border-gray-accent-light">
                <Slider beforeChange={handleChange} ref={sliderRef} {...sliderSettings}>
                    <SliderItem image={<StaticImage {...sliderImageProps} src="./images/slide-trends.png" />} />
                    <SliderItem image={<StaticImage {...sliderImageProps} src="./images/slide-funnels.png" />} />
                    <SliderItem
                        image={<StaticImage {...sliderImageProps} src="./images/slide-session-recordings.png" />}
                    />
                    <SliderItem image={<StaticImage {...sliderImageProps} src="./images/slide-feature-flags.png" />} />
                    <SliderItem image={<StaticImage {...sliderImageProps} src="./images/slide-plugins.png" />} />
                </Slider>
            </div>
            <div className="px-4 text-center my-16">
                <h4 className="text-3xl font-bold mb-8">
                    <span className="opacity-40">Plus</span> cohorts, user paths, retention, session browsing
                    <br />{' '}
                    <span className="text-xl block leading-tight mt-2">
                        & synced annotations <span className="opacity-40">across every view in the platform</span>
                    </span>
                </h4>
                <CallToAction width="56" type="outline" to="/docs/user-guides">
                    Explore all features
                </CallToAction>
            </div>
        </section>
    )
}
