import { SliderNavArrow } from 'components/Icons/Icons'
import React from 'react'

export const SliderNavButton = ({ onClick, disabled, previous }) => {
    return (
        <button disabled={disabled} onClick={onClick}>
            <SliderNavArrow
                className={`${
                    previous ? 'rotate-180' : ''
                } relative hover:scale-[1.05] top-[-.5px] active:scale-[1] active:top-[.5px]`}
                bgColor={disabled ? '#E5E7E0' : 'black'}
                arrowColor={disabled ? '#BFBFBC' : '#EEEFE9'}
            />
        </button>
    )
}

export default function SliderNav({ handlePrevious, handleNext, currentIndex, length, className = '' }) {
    return (
        <div className={`flex justify-center space-x-2 my-8 ${className}`}>
            <SliderNavButton previous disabled={currentIndex <= 0} onClick={handlePrevious} />
            <SliderNavButton disabled={currentIndex >= length} onClick={handleNext} />
        </div>
    )
}
