import React from 'react'
import { Investors } from 'components/NotProductIcons'
import { useValues } from 'kea'
import { layoutLogic } from 'logic/layoutLogic'

interface InvestorProps {
    logo?: string
    logoDark?: string
    width?: number
    height?: number
    photo?: string
    large?: string
    name: string
    role?: string
}

const Investor = ({ logo, logoDark, width, height, photo, large, name, role }: InvestorProps) => {
    const { websiteTheme } = useValues(layoutLogic)

    return (
        <div className="flex flex-col text-center justify-center items-center">
            {logo ? (
                <div className="py-8 px-4">
                    {/* if logo (not angel) is png, specify 50% dimensions (all images @2x) */}
                    <figure className="mb-0 text-center">
                        <img
                            src={logoDark && websiteTheme === 'dark' ? logoDark : logo}
                            width={width}
                            height={height}
                            alt={name}
                        />
                    </figure>
                </div>
            ) : photo ? (
                <div className="py-4 px-4 flex flex-col justify-center">
                    {/* if a photo instead of a logo (angel)... */}
                    <figure className="mb-2 mx-auto p-[2px] rounded-full bg-white border border-solid border-gray">
                        {large ? (
                            <img src={photo} width={80} height={80} alt={name} className="rounded-full " />
                        ) : (
                            <img src={photo} width={50} height={50} alt={name} className="rounded-full " />
                        )}
                    </figure>
                    <h5 className="mb-0">{name}</h5>
                    <p className="text-sm opacity-60 mb-0">{role}</p>
                </div>
            ) : (
                <div className="px-6 sm:px-12 py-8">
                    {/* if there's no image at all... */}
                    <h5 className="uppercase font-semibold mb-0 leading-tight sm:text-base text-sm">{name}</h5>
                </div>
            )}
        </div>
    )
}

export const AboutInvestors = () => {
    return (
        <section id="investors" className="-mt-16 mb-12">
            <h3 className="text-5xl mb-1 text-center">Investors</h3>
            <h4 className="font-semibold opacity-70 text-center mb-12">
                Thanks a million! <br className="lg:hidden" />
                ($27.125 million, to be exact...)
            </h4>

            <div className="grid grid-cols-2 lg:grid-cols-4 ">
                <Investor name="Y Combinator" logo="/images/investors/yc.svg" width={81} height={81} />
                <Investor
                    name="GV"
                    logo="/images/investors/gv.svg"
                    logoDark="/images/investors/gv_dark.svg"
                    width={130}
                    height={81}
                />
                <Investor name="1984 Ventures" logo="/images/investors/1984.svg" width={50} height={80} />
                <Investor name="Tapas Capital" logo="/images/investors/tapas-capital.png" width={172} height={59} />
                <Investor name="Jason Warner" role="GitHub CTO" photo="/images/investors/jason-warner.jpg" large />
                <Investor name="Unusual Ventures" logo="/images/investors/unusual.svg" width={167} height={22} />
                <Investor name="L2 Ventures" logo="/images/investors/l2-ventures.png" width={166} height={71} />
                <Investor name="Kima Ventures" logo="/images/investors/kima-ventures.png" width={118} height={66} />
                <Investor name="Sunflower Ventures" />
                <Investor name="Uncorrelated Ventures" />
                <Investor name="SV Angel" logo="/images/investors/sv-angel.png" width={134} height={80} />
                <Investor name="twentytwo" logo="/images/investors/twentytwo.png" width={172} height={54} />
                <Investor name="David Buxton" role="Arachnys Founder" photo="/images/investors/david-buxton.jpg" />
                <Investor
                    name="Dalton Caldwell"
                    role="Imeem Founder, YC Admissions"
                    photo="/images/investors/dalton-caldwell.jpg"
                />
                <Investor name="David Cramer" role="Sentry Founder" photo="/images/investors/david-cramer.jpg" />
                <Investor
                    name="Brad Flora"
                    role="Perfect Audience Founder, YC Group Partner"
                    photo="/images/investors/brad-flora.jpg"
                />
                <Investor name="Adam Goldsteim" role="Hipmunk Founder" photo="/images/investors/adam-goldstein.jpg" />
                <Investor name="Solomon Hykes" role="Docker Founder" photo="/images/investors/solomon-hykes.jpg" />
                <Investor name="Rujul Zaparde" role="Flightcar Founder" photo="/images/investors/rujul-zaparde.jpg" />

                <div className="py-4 px-4 flex flex-col justify-center">
                    <figure className="mb-2 mx-auto p-[2px] rounded-full bg-gray-accent-light border border-solid border-gray w-[50px] h-[50px] flex justify-center items-center">
                        <span className="inline-block w-8 h-8">
                            <Investors />
                        </span>
                    </figure>
                    <h5 className="mb-0 text-center">+ many more</h5>
                    <p className="text-sm opacity-60 mb-0 text-center font-medium">
                        (Add yourself with a{' '}
                        <a href="https://github.com/PostHog/posthog.com/tree/master/src/components/About/AboutInvestors/index.tsx">
                            pull request
                        </a>
                        !)
                    </p>
                </div>
            </div>
        </section>
    )
}
