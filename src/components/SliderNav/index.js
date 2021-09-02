import React from 'react'
import { SliderNavArrow } from 'components/Icons/Icons'

export const SliderNavButton = ({ onClick, disabled, previous }) => {
    return (
        <button disabled={disabled} onClick={onClick}>
            <SliderNavArrow
                className={previous ? 'transform rotate-180' : ''}
                bgColor={disabled ? '#E5E7E0' : 'black'}
                arrowColor={disabled ? '#BFBFBC' : '#EEEFE9'}
            />
        </button>
    )
}

export default function SliderNav({ handlePrevious, handleNext, currentIndex, length }) {
    return (
        <div className="flex justify-center space-x-2 my-8">
            <SliderNavButton previous disabled={currentIndex <= 0} onClick={handlePrevious} />
            <SliderNavButton disabled={currentIndex >= length} onClick={handleNext} />
        </div>
    )
}
