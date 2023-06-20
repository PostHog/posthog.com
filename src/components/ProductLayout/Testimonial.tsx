import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image'
import React from 'react'
import { SectionWrapper } from './Section'
import { ITestimonial } from './types'
import { useValues } from 'kea'
import { layoutLogic } from 'logic/layoutLogic'

function Quote({ children, className = '' }: { children: React.ReactNode[]; className?: string }) {
    return (
        <div
            className={`grid py-10 px-5 md:px-16 -mx-5 md:-mx-12 border-y border-light dark:border-dark bg-accent dark:bg-accent-dark md:grid-cols-2 gap-y-8 md:gap-y-0 md:gap-x-8 lg:gap-x-12 xl:gap-x-16 ${className}`}
        >
            <div>{children[0]}</div>
            <div className="-mt-16">{children[1]}</div>
        </div>
    )
}

export default function Testimonial({ author, image, quote }: ITestimonial & { image: ImageDataLike }) {
    const { websiteTheme } = useValues(layoutLogic)
    const gatsbyImage = image && getImage(image)
    const logo = websiteTheme === 'dark' ? author.company.imageDark || author.company.image : author.company.image
    return (
        <SectionWrapper className="!pt-0 mt-0 relative">
            <Quote className="items-end">
                <div>
                    <img className="text-black max-h-[45px]" src={logo} />
                    <p className="my-6 text-[17px]" dangerouslySetInnerHTML={{ __html: quote }} />

                    <div className="flex space-x-4 items-center">
                        <img className="rounded-full max-w-[50px]" src={author.image} />
                        <div>
                            <p className="m-0 font-bold">{author.name}</p>
                            <p className="m-0 opacity-70">
                                {author.role}, {author.company.name}
                            </p>
                        </div>
                    </div>
                </div>
                <div>{gatsbyImage && <GatsbyImage alt="" image={gatsbyImage} />}</div>
            </Quote>
        </SectionWrapper>
    )
}
