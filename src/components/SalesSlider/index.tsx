import React, { useState } from 'react'

function SalesSlider({ slides }) {
    const [currentSlide, setCurrentSlide] = useState(0)

    const handleClick = (index) => {
        setCurrentSlide(index)
    }

    return (
        <div className="grid grid-cols-4">
            <div>
                <ul className="m-0 p-0 list-none">
                    {slides.map((slide, index) => (
                        <li
                            key={index}
                            className={`trigger-${index + 1} ${currentSlide === index ? 'font-bold' : ''}`}
                            onClick={() => handleClick(index)}
                        >
                            <span>{slide.title}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="col-span-3 relative">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`slide-${
                            index + 1
                        } bg-accent dark:bg-accent-dark rounded p-4 absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out ${
                            currentSlide === index ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        {slide.children}
                        {index !== slides.length - 1 && (
                            <span className="next-button" onClick={() => handleClick(index + 1)}>
                                Next slide
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SalesSlider
