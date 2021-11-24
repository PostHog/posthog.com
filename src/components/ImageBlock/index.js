import React from 'react'

export const ImageBlock = ({ images = [], title }) => {
    return (
        <div className="text-center">
            <h5 className="text-gray text-[18px] m-0 mb-3 font-semibold">{title}</h5>
            <div className="flex space-x-0 flex-col lg:flex-row lg:space-x-12 space-y-4 lg:space-y-0 justify-start lg:justify-evenly flex-wrap items-center">
                {images.map((image, index) => {
                    return <img key={index} src={image} />
                })}
            </div>
        </div>
    )
}
