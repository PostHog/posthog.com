import React, { useRef, useState } from 'react'
import Slider from 'react-slick'
import { Link } from 'react-scroll'

const sliderSettings = {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToScroll: 1,
    autoplay: false,
    variableWidth: true,
}

interface IProps {
    menu: {
        name: string
        url: string
        icon: React.ReactNode
    }[]
    className?: string
    autoScroll?: boolean
}

export default function AnchorScrollNavbar({ menu, autoScroll = true, className = '' }: IProps) {
    const sliderRef = useRef()
    const [activeSliderIndex, setActiveSliderIndex] = useState(0)
    return (
        <div className={className}>
            <div>
                <Slider ref={sliderRef} {...sliderSettings}>
                    {menu.map(({ name, icon, url }, index) => {
                        return (
                            <div key={name}>
                                <Link
                                    smooth
                                    duration={300}
                                    offset={-57}
                                    to={url}
                                    hashSpy
                                    className={`mr-1 cursor-pointer flex items-center space-x-2 text-[14px] font-semibold px-3 py-2 rounded-md hover:bg-gray-accent-light text-black hover:text-black ${
                                        activeSliderIndex === index ? 'bg-gray-accent-light' : ''
                                    }`}
                                    spy
                                    onClick={() => {
                                        if (autoScroll) {
                                            sliderRef?.current?.slickGoTo(index)
                                        }
                                    }}
                                    onSetActive={() => {
                                        setActiveSliderIndex(index)
                                        if (autoScroll) {
                                            sliderRef?.current?.slickGoTo(index)
                                        }
                                    }}
                                >
                                    <span className="w-[25px]">{icon}</span>
                                    <span>{name}</span>
                                </Link>
                            </div>
                        )
                    })}
                </Slider>
            </div>
        </div>
    )
}
