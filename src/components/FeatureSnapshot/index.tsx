import React from 'react'

export function FeatureSnapshot({
    image,
    features = [],
    reverse,
}: {
    image: string
    features: JSX.Element[] | string[]
    reverse: boolean
}): JSX.Element {
    return (
        <div
            className={`flex flex-col space-x-0 space-y-4 lg:space-x-9 lg:space-y-0 items-center ${
                reverse ? 'lg:flex-row-reverse lg:space-x-reverse' : 'lg:flex-row'
            }`}
        >
            <div className="relative lg:min-h-[400px] col-span-2 overflow-hidden rounded-[10px] bg-gray-accent-light w-full lg:w-2/3">
                {image && <img className="object-contain w-full h-full lg:absolute inset-0" alt="" src={image} />}
            </div>
            <div className="w-full lg:w-1/3">
                <ul className="m-0 p-0 list-none">
                    {features.map((feature, index) => {
                        return (
                            <li className="py-4" key={index}>
                                {feature}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
