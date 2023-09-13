import React from 'react'

export const Emoji = ({ name, src }) => {
    return (
        <>
            <img src={src} alt={`${name} emoji`} className="inline-block w-6 rounded-[2px]" />{' '}
            <span className="text-inherit p-1 rounded bg-accent dark:bg-accent-dark border border-light dark:border-dark font-code !text-[13px]">
                :{name}:
            </span>
        </>
    )
}
