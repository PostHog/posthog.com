import Link from 'components/Link'
import Tooltip from 'components/Tooltip'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import { IContributor } from './types'

export const ContributorImageSmall = ({ image, name, className = '', imgClassName = '' }) => {
    const gatsbyImage = image && getImage(image)
    return (
        <div
            className={`w-[32px] h-[32px] relative rounded-full overflow-hidden border-2 border-tan dark:border-primary transition-all ${className}`}
        >
            {typeof image === 'string' ? (
                <img className={`rounded-full bg-gray-accent dark:bg-gray-accent-dark ${imgClassName}`} src={image} />
            ) : gatsbyImage ? (
                <GatsbyImage
                    imgClassName={`rounded-full ${imgClassName}`}
                    image={gatsbyImage}
                    alt={name}
                    className="bg-gray-accent dark:bg-gray-accent-dark"
                />
            ) : (
                <svg width="38" height="38" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M20.0782 41.0392H5.42978C4.03134 41.0392 3.1173 40.1642 3.09386 38.7736C3.07823 37.7814 3.07042 36.797 3.10948 35.8048C3.15636 34.6329 3.72668 33.7345 4.74228 33.1798C8.0782 31.3595 11.4299 29.5783 14.7659 27.7658C15.0081 27.633 15.1565 27.758 15.3362 27.8517C18.1878 29.3439 21.0942 29.4689 24.0626 28.2267C24.1485 28.1955 24.2423 28.1721 24.3126 28.1096C24.9298 27.5861 25.4845 27.7971 26.1251 28.1486C29.1173 29.7971 32.1331 31.4143 35.1487 33.0238C36.4534 33.7191 37.094 34.766 37.0706 36.2426C37.0549 37.0785 37.0706 37.9067 37.0706 38.7426C37.0628 40.1254 36.1409 41.0395 34.7659 41.0395H20.0783L20.0782 41.0392Z"
                        fill="#BFBFBC"
                    />
                    <path
                        d="M19.8359 27.0625C17.0859 26.9687 14.8047 25.6094 13.1251 23.1953C10.3751 19.2344 10.7032 13.6093 13.8516 10.0001C17.2735 6.08599 22.9452 6.10943 26.336 10.0469C29.9376 14.2345 29.711 20.8437 25.8126 24.6405C24.2188 26.1952 22.3126 27.0312 19.8362 27.0624L19.8359 27.0625Z"
                        fill="#BFBFBC"
                    />
                </svg>
            )}
        </div>
    )
}

export const ContributorImage = ({ image, name, className = '', imgClassName = '' }) => {
    const gatsbyImage = image && getImage(image)
    return (
        <figure className="m-0 -mt-8 p-0 absolute right-0 bottom-0">
            {typeof image === 'string' ? (
                <img className="w-24 h-24" src={image} />
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
    size,
}: IContributor & { text?: boolean; url?: string; size?: string }) => {
    const Container = url ? Link : 'div'
    return (
        <Container
            {...(url ? { to: url, state } : {})}
            className="flex bg-accent dark:bg-accent-dark border border-light dark:border-dark md:mx-4 rounded relative hover:-translate-y-0.5 active:translate-y-0 hover:transition-all hover:border-b-[4px] active:border-b-1 active:top-[2px] justify-between text-primary dark:text-primary-dark hover:text-primary dark:hover:text-primary-dark"
        >
            <div className="pr-20">
                <div className="flex flex-col justify-between px-4 py-2 w-full">
                    <h3 className="mb-0 text-base leading-tight">{text && <span>{name}</span>}</h3>
                    {role && <p className="text-primary/50 text-sm dark:text-primary-dark/50 m-0">{role}</p>}
                </div>
            </div>
            {size === 'sm' ? (
                <ContributorImageSmall
                    image={image}
                    name={name}
                    className={url ? 'hover:border-red hover:z-10 dark:hover:border-red' : ''}
                />
            ) : (
                <ContributorImage
                    className={url ? 'hover:border-red hover:z-10 dark:hover:border-red' : ''}
                    image={image}
                    name={name}
                />
            )}
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
                                        <Contributor size="sm" image={image} name={name} url={url} state={state} />
                                    </span>
                                </Tooltip>
                            ) : (
                                <Contributor size="sm" image={image} name={name} url={url} state={state} text />
                            )}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
