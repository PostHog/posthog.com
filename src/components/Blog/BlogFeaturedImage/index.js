import React from 'react'
import { Structure } from '../../Structure'
import BlogAuthor from '../BlogAuthor'
import { PlainIntro } from '../BlogIntro'

export function FeaturedImageStandard({ pageTitle, featuredImage, blogDate, authorDetails }) {
    return (
        <>
            <Structure.Section width="3xl -mt-6 md:-mt-2">
                <img src={featuredImage} className="w-full shadow-lg" alt={pageTitle} />
            </Structure.Section>
            <PlainIntro blogDate={blogDate} pageTitle={pageTitle} authorDetails={authorDetails} />
        </>
    )
}

export function FeaturedImageFull({ pageTitle, featuredImage, blogDate, authorDetails }) {
    return (
        <div className="w-full h-full relative flex items-center justify-center md:pt-1/2 blog-image">
            <img className="h-full w-full absolute object-cover top-0" src={featuredImage} />

            <div className="md:absolute p-8 top-0 w-full left-0 bottom-0 leading-tight z-10 flex justify-center items-center flex-col ">
                <time className="opacity-50 text-base w-full max-w-xl mb-2 text-white">{blogDate}</time>
                <Structure.SectionHeader
                    titleTag="h1"
                    title={pageTitle}
                    titleClassName="font-sans normal-case leading-tight w-full max-w-xl my-0 text-white text-2xl md:text-4xl"
                />

                {authorDetails?.handle && (
                    <div className="w-full max-w-xl mt-2 md:mt-6">
                        <BlogAuthor className="flex space-x-4 text-white" authorDetails={authorDetails} />
                    </div>
                )}
            </div>
        </div>
    )
}
