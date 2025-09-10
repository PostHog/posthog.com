import React from 'react'
import Link from 'components/Link'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

export default function ResourceItem({ title, description, Image, gatsbyImage, url, type }) {
    return (
        <li className="">
            <Link to={url} className="block" state={{ newWindow: true }}>
                <div className={`${Image ? 'pb-0' : ''}`}>
                    {type && <h6 className="text-xs text-muted font-medium mb-1 p-0">{type}</h6>}
                    <h4 className="font-semibold my-0">{title}</h4>
                    <p className="text-secondary text-sm">{description}</p>
                </div>
                {Image && (
                    <div className="flex justify-end w-full h-24">
                        <div className="w-48 h-24 md:absolute bottom-0">{Image}</div>
                    </div>
                )}
            </Link>
        </li>
    )
}
