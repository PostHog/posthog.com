import React from 'react'

export const FloatedImage = ({ align = 'right', image, className = '', ...other }) => {
    return <img className={`w-full lg:w-1/2 mb-4 ${className}`} src={image} style={{ float: align }} {...other} />
}
