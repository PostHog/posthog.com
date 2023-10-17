import Link from 'components/Link'
import Tooltip from 'components/Tooltip'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import { IContributor } from './types'

export const ContributorImage = ({ image, name, className = '', imgClassName = '' }) => {
    const gatsbyImage = image && getImage(image)
    return (
        <figure className="m-0 -mt-8 p-0 absolute right-0 bottom-0">
            {typeof image === 'string' ? (
                <img src={image} />
            ) : gatsbyImage ? (
                <GatsbyImage image={gatsbyImage} alt={name} className="w-24 h-24" />
            ) : (
                ''
            )}
        </figure>
    )
}

export const Contributor = ({
    image,
    name,
    url,
    state,
    text = false,
    role,
}: IContributor & { text?: boolean; url?: string }) => {
    const Container = url ? Link : 'div'
    return (
        <Container
            {...(url ? { to: url, state } : {})}
            className="flex bg-accent dark:bg-accent-dark border border-light dark:border-dark md:mx-4 rounded relative hover:-translate-y-0.5 active:translate-y-0 hover:transition-all hover:border-b-[4px] active:border-b-1 active:top-[2px] justify-between text-primary dark:text-primary-dark hover:text-primary dark:hover:text-primary-dark"
        >
            <div className="pr-24">
                <div className="flex flex-col justify-between px-4 py-2 w-full">
                    <h3 className="mb-0 text-base leading-tight">{text && <span>{name}</span>}</h3>
                    {role && <p className="text-primary/50 text-sm dark:text-primary-dark/50 m-0">{role}</p>}
                </div>

                {/*
                <span className="flex items-center gap-2">
                    {country === 'world' ? '🌎' : <ReactCountryFlag svg countryCode={country} />}
                    <span className="opacity-50 text-sm">
                        {country === 'world' ? 'Planet Earth' : location || country}
                    </span>
                </span>
                */}
            </div>

            <ContributorImage
                className={url ? 'hover:border-red hover:z-10 dark:hover:border-red' : ''}
                image={image}
                name={name}
            />
        </Container>
    )
}

export default function Contributors({
    contributors,
    className = '',
}: {
    contributors: IContributor[]
    className?: string
}) {
    const multiple = contributors?.length > 1
    const maxContributorsToShow = 4
    return (
        <div className="flex space-x-2 items-center justify-between">
            {multiple && (
                <h3 className="text-black dark:text-white font-semibold opacity-25 m-0 text-sm flex space-x-1 items-center">
                    <span>Contributors</span>
                    <span
                        className={`w-[24px] h-[24px] bg-black/40 dark:bg-white/40 flex items-center justify-center ${
                            contributors.length > maxContributorsToShow ? 'text-xs' : ''
                        }`}
                    >
                        {contributors.length > maxContributorsToShow
                            ? `${maxContributorsToShow}+`
                            : contributors.length}
                    </span>
                </h3>
            )}
            <ul className={`list-none m-0 p-0 flex ${className}`}>
                {contributors.slice(0, maxContributorsToShow).map(({ image, name, url, state }) => {
                    return (
                        <li className="first:-ml-0 -ml-2" key={name}>
                            {multiple ? (
                                <Tooltip
                                    placement="top-end"
                                    className="whitespace-nowrap"
                                    content={() => (
                                        <div className="flex space-x-1 items-center">
                                            <span className="text-xs font-semibold">{name}</span>
                                        </div>
                                    )}
                                >
                                    <span className="relative">
                                        <Contributor image={image} name={name} url={url} state={state} />
                                    </span>
                                </Tooltip>
                            ) : (
                                <Contributor image={image} name={name} url={url} state={state} text />
                            )}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
