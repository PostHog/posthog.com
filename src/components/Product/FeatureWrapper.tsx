import { CallToAction } from 'components/CallToAction'
import Link from 'components/Link'
import React from 'react'

export interface IProps {
    title: string
    subtitle?: string
    icon?: React.ReactNode
    cta?: {
        title: string
        url: string
    }
    disclaimer?: string
    features?: {
        title: string
        icon: React.ReactNode
        url: string
    }[]
    image: React.ReactNode
    id?: string
}

export const FeatureWrapperCol = ({ title, subtitle, icon, cta, disclaimer, features, image, id }: IProps) => {
    return (
        <div
            className="grid grid-cols-1 md:grid-cols-3 space-y-6 md:space-y-0 md:space-x-16 items-center py-8 border-b border-gray-accent-light border-dashed last:border-b-0 max-w-5xl mx-auto px-5 box-content"
            id={id}
        >
            <div>
                {icon && (
                    <span className="w-[45px] h-[45px] bg-gray-accent-light flex justify-center items-center rounded-md mb-3">
                        <span className="w-5">{icon}</span>
                    </span>
                )}
                <h3 className="text-2xl m-0">{title}</h3>
                {subtitle && <p className="my-0 mt-1 text-lg text-black/50 font-semibold">{subtitle}</p>}
                <div className="mt-6">
                    {features && (
                        <ul className="list-none m-0 p-0">
                            {features.map(({ title, icon, url }) => {
                                return (
                                    <li
                                        key={title}
                                        className="border-b border-gray-accent-light border-dashed last:border-b-0"
                                    >
                                        <Link to={url} className="flex space-x-2 items-center text-base py-2 px-1 my-1 rounded group hover:bg-gray-accent-light transition-all relative active:top-[1px] active:scale-[.99]">
                                            <span className="w-[36px] h-[36px] flex items-center justify-center bg-gray-accent-light group-hover:bg-gray-accent/50 rounded-sm">
                                                <span className="w-[20px] text-black">{icon}</span>
                                            </span>
                                            <span>{title}</span>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                    {cta && (
                        <CallToAction size="sm" type="secondary" to={cta.url}>
                            {cta.title}
                        </CallToAction>
                    )}
                    {disclaimer && <p className="text-[15px] text-black/50 italic m-0 mt-7">{disclaimer}</p>}
                </div>
            </div>
            <div className="col-span-2">{image}</div>
        </div>
    )
}

export const FeatureWrapperRow = ({
    title,
    description,
    children,
    cta,
    id,
}: {
    title: string
    description: string | React.ReactNode
    children?: React.ReactNode
    cta?: {
        url: string
        title: string
    }
    id?: string
}) => {
    return (
        <div className="mt-12 md:mt-28" id={id}>
            <div className="max-w-5xl mx-auto px-5 box-content">
                <div className="max-w-[820px]">
                    <h3 className="m-0 text-4xl sm:text-5xl">{title}</h3>
                    <div className="font-semibold text-black/75 mt-3">{description}</div>
                </div>
            </div>
            {children}
            {cta && (
                <div className="max-w-5xl mx-auto px-5 box-content">
                    <CallToAction to={cta?.url} type="secondary" size="sm" className={'mt-6'}>
                        {cta?.title}
                    </CallToAction>
                </div>
            )}
        </div>
    )
}
