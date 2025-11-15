import React from 'react'

interface GetCroissantLogoProps {
    className?: string
}

export default function GetCroissantLogo({ className = '' }: GetCroissantLogoProps) {
    return (
        <img
            className={className}
            src="https://res.cloudinary.com/dmukukwp6/image/upload/getcroissant_logo_0f5be0b73d.webp"
            alt="GetCroissant"
        />
    )
}
