import React from 'react'
import cntl from 'cntl'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import ReactCountryFlag from 'react-country-flag'

const sizes = {
    sm: 'border-1 w-16 h-16',
    md: 'border-2 w-20 h-20',
    lg: 'border-2 w-32 h-32',
    xl: 'border-3 w-40 h-40',
}

export const circle = (size = 'lg', className = '') => cntl`
    rounded-full 
    relative 
    border-gray-accent-light 
    border-solid 
    inline-block 
    bg-white
    ${sizes[size]}
    ${className}
`

export const Avatar = ({ size = 'lg', className = '', image, country, name, color }) => {
    return (
        <div className={`absolute ${className}`}>
            <div style={{ backgroundColor: color ?? 'white' }} className={`${circle(size)}`}>
                {typeof image === 'string' ? (
                    <img
                        className="w-full h-full border border-solid border-white box-border rounded-full"
                        src={image}
                    />
                ) : (
                    <GatsbyImage
                        alt={name}
                        image={getImage(image)}
                        className="w-full h-full"
                        imgClassName="w-full h-full border border-solid border-white box-border rounded-full"
                    />
                )}
                <div className="absolute -right-2 -bottom-1 bg-white w-8 h-8 rounded-full border-2 text-lg border-gray-accent-light border-solid flex items-center justify-center">
                    <ReactCountryFlag svg countryCode={country} />
                </div>
            </div>
        </div>
    )
}
