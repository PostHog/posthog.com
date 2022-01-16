import React from 'react'
import { Structure } from '../../Structure'
import BlogAuthor from '../BlogAuthor'
import { FeaturedImageFull, FeaturedImageStandard } from '../BlogFeaturedImage'

export function PlainIntro({ pageTitle, blogDate, blogUpdatedDate, authorDetails }) {
    return (
        <>
            <Structure.Section width="xl" className="text-center leading-tight mb-6">
                <p className="mt-8 mb-2 opacity-50">
                    {blogDate === blogUpdatedDate ? blogDate : `Last updated: ${blogUpdatedDate}`}
                </p>
                <Structure.SectionHeader titleTag="h1" title={pageTitle} titleClassName="text-center leading-tight" />
            </Structure.Section>
            {authorDetails && authorDetails.length > 0 && (
                <Structure.Section width="xl" className="mb-12">
                    <ul className="list-none m-0 p-0 flex items-center flex-wrap justify-center">
                        {authorDetails.map((author, index) => (
                            <li key={index} className="mr-4 mt-4">
                                <BlogAuthor
                                    className="flex flex-col space-y-4 justify-center text-center"
                                    direction="column"
                                    authorDetails={author}
                                />
                            </li>
                        ))}
                    </ul>
                </Structure.Section>
            )}
        </>
    )
}

export function BlogIntro(props) {
    const { featuredImageType, ...other } = props
    return props.featuredImage ? (
        <>
            {featuredImageType === 'full' && <FeaturedImageFull {...other} />}
            {(featuredImageType === 'standard' || !featuredImageType) && <FeaturedImageStandard {...other} />}
        </>
    ) : (
        <PlainIntro {...other} />
    )
}
