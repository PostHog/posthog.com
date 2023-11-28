import React from 'react'
import scrollTo from 'gatsby-plugin-smoothscroll'
import { useStaticQuery, graphql } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'

import { Header } from '../../Header'
import { CallToAction } from '../../CallToAction'

export const CareersHero = () => {
    const { jobs } = useStaticQuery(query)

    return (
        <div className="careers-hero lg:pt-12 pb-12 md:pb-18">
            <div className="relative rounded">
                <div className="md:absolute -top-8 xl:-top-6 2xl:-top-8 right-0 md:w-1/2 lg:w-[45%] 2xl:w-[45%] max-w-5xl">
                    <StaticImage
                        src="../../../images/construction-hogs-with-text.png"
                        alt="Construction hogs taking a lunch break"
                        className="w-full h-full"
                        placeholder="blurred"
                    />
                </div>

                <div className="text-center md:text-left max-w-7xl mx-auto relative z-10 px-4 md:pr-0 lg:pl-8">
                    <h1 className="mb-0 pt-4 md:pt-0 pb-0 text-4xl leading-none lg:text-5xl 2xl:text-6xl md:w-2/3 lg:w-[55%] xl:[w-2/3]">
                        We're working to increase the number of successful products{' '}
                        <br className="hidden md:block mdlg:hidden" />
                        in the world.
                        <br />
                        <span className="text-red">We could use your help.</span>
                    </h1>

                    <CallToAction
                        onClick={() => scrollTo('#open-roles')}
                        type="primary"
                        width="72"
                        className="my-6 sm:my-12"
                    >
                        Jump to open roles ({jobs.totalCount})
                    </CallToAction>
                </div>
            </div>
        </div>
    )
}

const query = graphql`
    {
        jobs: allAshbyJobPosting {
            totalCount
        }
    }
`
