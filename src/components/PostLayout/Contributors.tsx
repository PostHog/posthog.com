import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { IContributor } from './types'

import Link from 'components/Link'

type ContributorImageProps = {
    image: IContributor['image']
    name: IContributor['name']
    className?: string
    imgClassName?: string
}

export const ContributorImage: React.FC<ContributorImageProps> = ({
    image,
    name,
    className = '',
    imgClassName = '',
}) => {
    const gatsbyImage = image && getImage(image)

    return (
        <div className={`w-[38px] h-[38px] relative rounded-full overflow-hidden ${className}`}>
            {gatsbyImage ? (
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

export const Contributor: React.FC<IContributor> = ({ image, name }) => {
    return (
        <>
            <ContributorImage image={image} name={name} />
            <span className="author text-[14px] font-semibold">{name}</span>
        </>
    )
}

type ContributorsProps = {
    contributors: IContributor[]
    className?: string
}

export const Contributors: React.FC<ContributorsProps> = ({ contributors, className = '' }) => {
    const classes = 'flex space-x-2 items-center no-underline'
    return (
        <ul className={`list-none m-0 p-0 ${className}`}>
            {contributors.slice(0, 3).map(({ image, name, url, state }) => {
                return (
                    <li key={name}>
                        {url ? (
                            <Link state={state} className={classes} to={url}>
                                <Contributor image={image} name={name} />
                            </Link>
                        ) : (
                            <span className={classes}>
                                <Contributor image={image} name={name} />
                            </span>
                        )}
                    </li>
                )
            })}
        </ul>
    )
}
