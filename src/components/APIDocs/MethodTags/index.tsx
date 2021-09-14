import React from 'react'
import { Tag } from 'antd'

export type method = 'post' | 'put' | 'patch' | 'get' | 'delete'

interface MethodTagsProps {
    allowedMethods: method[]
}

const methodToColor: Record<method, string> = {
    post: 'green',
    patch: 'purple',
    get: 'blue',
    delete: 'red',
    put: 'gold',
}

const MethodTag = ({ method }: { method: method }) => {
    return <Tag color={methodToColor[method]}>{method.toUpperCase()}</Tag>
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
