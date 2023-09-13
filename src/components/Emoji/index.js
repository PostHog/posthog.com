import React from 'react'

export const Emoji = ({ name, src }) => {
    return (
        <>
            <img src={src} alt={`${name} emoji`} className="inline-block w-6 rounded-[2px]" /> <strong>:{name}:</strong>
        </>
    )
}
