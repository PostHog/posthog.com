import cntl from 'cntl'
import React from 'react'
import { Structure } from '../../Structure'
import BlogAuthor from '../BlogAuthor'
import { PlainIntro } from '../BlogIntro'

const bgGradient = cntl`
    before:h-full
    before:left-0
    before:right-0
    before:top-0
    before:z-[1]
    before:absolute
    before:bg-gradient-to-b
    before:from-black/75
    before:to-black/25
`

export function FeaturedImageStandard({ pageTitle, featuredImage, blogDate, blogUpdatedDate, authorDetails }) {
    return (
        <>
            <Structure.Section width="3xl -mt-6 md:-mt-2">
                <img src={featuredImage} className="w-full md:rounded-lg" alt={pageTitle} />
            </Structure.Section>
            <PlainIntro
                blogDate={blogDate}
                blogUpdatedDate={blogUpdatedDate}
                pageTitle={pageTitle}
                authorDetails={authorDetails}
            />
        </>
    )
}

export function FeaturedImageFull({ pageTitle, featuredImage, blogDate, blogUpdatedDate, authorDetails }) {
    return (
        <div className="md:mx-8 md:rounded-lg md:overflow-hidden">
            <div className={`w-full h-full relative flex items-center justify-center md:pt-1/2 ${bgGradient}`}>
                <img className="h-full w-full absolute object-cover top-0 shadow-lg" src={featuredImage} />

                <div className="md:absolute p-8 top-0 w-full left-0 bottom-0 leading-tight z-10 flex justify-center items-center flex-col">
                    <time className="opacity-50 text-base w-full max-w-xl mb-2 text-white">
                        {blogDate === blogUpdatedDate ? blogDate : `Last updated: ${blogUpdatedDate}`}
                    </time>
                    <Structure.SectionHeader
                        titleTag="h1"
                        title={pageTitle}
                        titleClassName="font-sans normal-case leading-tight w-full max-w-xl my-0 text-white text-2xl md:text-4xl"
                    />

                    {authorDetails.length > 0 && (
                        <div className="w-full max-w-xl mt-2 md:mt-6">
                            <ul className="list-none m-0 p-0 flex items-center flex-wrap">
                                {authorDetails.map((author, index) => (
                                    <li key={index} className="mr-4">
                                        <BlogAuthor
                                            className="flex space-x-4"
                                            color={'primary-dark'}
                                            colorDark={'primary-dark'}
                                            authorDetails={author}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
