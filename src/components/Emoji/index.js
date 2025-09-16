import React from 'react'

export const Emoji = ({ name, src }) => {
    return (
        <>
            <img src={src} alt={`${name} emoji`} className="inline-block w-6 rounded-[2px]" />{' '}
            <span
                data-scheme="secondary"
                className="text-inherit p-1 rounded bg-primary border border-primary font-code !text-[13px]"
            >
                :{name}:
            </span>
        </>
    )
}
