import React from 'react'

export default function FeatureSnapshot({
    image,
    features,
}: {
    image: string
    features: JSX.Element[] | string[]
}): JSX.Element {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-9 items-center">
            <div className="relative lg:min-h-[400px] col-span-2 overflow-hidden rounded-[10px]">
                <img className="object-cover w-full h-full lg:absolute inset-0" src={image} />
            </div>
            <div>
                <ul className="m-0 p-0 list-none">
                    {features.map((feature, index) => {
                        return (
                            <li
                                className="py-4 border-b border-dashed border-gray-accent-light last:border-b-0"
                                key={index}
                            >
                                {feature}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
