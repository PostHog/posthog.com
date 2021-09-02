import React from 'react'

export default function Icon({ name, className }) {
    return (
        <svg className={className}>
            <use xlinkHref={`/images/home-sprite.svg#${name}`}></use>
        </svg>
    )
}
