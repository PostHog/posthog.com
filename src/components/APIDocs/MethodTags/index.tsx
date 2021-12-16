import React from 'react'

export type method = 'post' | 'put' | 'patch' | 'get' | 'delete'

interface MethodTagsProps {
    allowedMethods: method[]
}

const methodToColor: Record<method, string> = {
    post: 'border-[#2ac276] text-[#2ac276]',
    patch: 'border-[#8a008a] text-[#8a008a]',
    get: 'border-blue text-blue',
    delete: 'border-red text-red',
    put: 'border-yellow text-yellow',
}

const MethodTag = ({ method }: { method: method }) => {
    return (
        <span
            className={`text-[11px] py-1 px-2 rounded-sm border border-opacity-50 font-normal leading-none ${methodToColor[method]} mr-2`}
        >
            {method.toUpperCase()}
        </span>
    )
}

export const MethodTags = ({ allowedMethods }: MethodTagsProps) => {
    return (
        <>
            {allowedMethods.map((method) => (
                <MethodTag method={method.toLowerCase() as method} key={method} />
            ))}
        </>
    )
}
