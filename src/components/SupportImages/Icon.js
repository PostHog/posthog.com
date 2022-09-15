import React from 'react'

export default function Icon({ name, className }) {
    return (
        <svg className={className}>
            <use xlinkHref={`/images/support-sprite.svg#${name}`}></use>
        </svg>
    )
}
