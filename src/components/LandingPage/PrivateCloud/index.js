import React from 'react'
import { CallToAction } from '../../CallToAction'
import { Roadmap } from '../Roadmap'
import checkImg from '../images/green-check.svg'

const FeatureBenefit = ({ feature, benefit }) => {
    return (
        <div className="w-full md:w-1/3 px-3 text-left my-5 flex items-start">
            <img src={checkImg} className="mr-2 h-4 mt-1" alt={feature} />
            <div>
                <header className="text-green-300 font-bold mt-0">{feature}</header>
                <main className="text-white opacity-80">{benefit}</main>
            </div>
        </div>
    )
}

export const PrivateCloud = () => {
    return (
        <div className="private-cloud pt-24 text-white text-center">
            <div className="w-11/12 max-w-5xl mx-auto">
                <h2>Host on your own private cloud</h2>
                <p className="opacity-80 mt-1 text-center max-w-4xl mx-auto">
                    Optionally host PostHog yourself with a private cloud deployment - a great solution for
                    privacy-conscious and compliance-oriented companies.
                </p>

                <div className="flex justify-between items-stretch flex-col md:flex-row flex-wrap">
                    <FeatureBenefit
                        feature="Built to scale"
                        benefit="Private cloud deployments are capable of supporting hundreds of millions of users"
                    />
                    <FeatureBenefit
                        feature="Unlimited usage, no surprises"
                        benefit="No limits or overages with a flat fee licensing model for our largest customers"
                    />
                    <FeatureBenefit
                        feature="Managed deployments"
                        benefit="Get PostHog updates automatically, without giving us access to your data"
                    />
                    <FeatureBenefit
                        feature="Ad blocker-resistant"
                        benefit="Eliminate dependencies on 3rd party solutions that are flagged for tracking"
                    />
                    <FeatureBenefit
                        feature="Compliance comes standard"
                        benefit="Makes HIPAA and SOC2 audits a breeze when you host on your own stack"
                    />
                    <FeatureBenefit
                        feature="Dedicated support"
                        benefit="Connect with our team for getting the best value or regular touch points"
                    />
                </div>

                <div className="mt-24">
                    <div
                        style={{ background: 'rgba(255,255,255,.6)' }}
                        className="rounded-lg p-12 flex flex-col md:flex-row justify-between items-center"
                    >
                        <div className="w-full md:w-1/2 md:mr-4 lg:w-5/12">
                            <h3 className="text-purpleish text-3xl font-semibold">Open-source to our core</h3>
                            <p className="text-purpleish text-center">
                                Our workflow, strategy, internal policies, handbook, and brand book are public and open
                                source.
                            </p>

                            <CallToAction
                                type="custom"
                                className="bg-purpleish brackets border-3 text-white hover:text-white hover:bg-purpleish-dark border-purpleish-dark"
                                icon="github"
                                width="full"
                                href="https://github.com/posthog"
                            >
                                Browse GitHub
                            </CallToAction>
                            <CallToAction
                                type="custom"
                                icon="handbook"
                                width="full"
                                className="text-purpleish border-purpleish border-2 mt-2 hover:bg-white hover:bg-opacity-20 hover:text-purpleish"
                                to="/handbook"
                            >
                                Explore Handbook
                            </CallToAction>
                        </div>

                        <div className="w-full mt-12 md:mt-0 md:w-1/2 md:ml-4 lg:w-7/12">
                            <div className="w-full flex flex-wrap justify-center contributor-images">
                                <a href="https://github.com/bhavish-agarwal">
                                    <img
                                        src="https://avatars.githubusercontent.com/u/14195048?v=4"
                                        title="bhavish-agarwal"
                                        width="50"
                                        height="50"
                                    />
                                </a>
                                <a href="https://github.com/Tannergoods">
                                    <img
                                        src="https://avatars.githubusercontent.com/u/60791437?v=f"
                                        title="Tannergoods"
                                        width="50"
                                        height="50"
                                    />
                                </a>
                                <a href="https://github.com/ungless">
                                    <img
                                        src="https://avatars.githubusercontent.com/u/8397061?v=4"
                                        title="ungless"
                                        width="50"
                                        height="50"
                                    />
                                </a>
                                <a href="https://github.com/gzog">
                                    <img
                                        src="https://avatars.githubusercontent.com/u/1487006?v=4"
                                        title="gzog"
                                        width="50"
                                        height="50"
                                    />
                                </a>
                                <a href="https://github.com/Tmunayyer">
                                    <img
                                        src="https://avatars.githubusercontent.com/u/29887304?v=4"
                                        title="Tmunayyer"
                                        width="50"
                                        height="50"
                                    />
                                </a>
                                <a href="https://github.com/adamb70">
                                    <img
                                        src="https://avatars.githubusercontent.com/u/11885987?v=4"
                                        title="adamb70"
                                        width="50"
                                        height="50"
                                    />
                                </a>
                                <a href="https://github.com/samcaspus">
                                    <img
                                        src="https://avatars.githubusercontent.com/u/19220113?v=4"
                                        title="samcaspus"
                                        width="50"
                                        height="50"
                                    />
                                </a>
                                <a href="https://github.com/SanketDG">
                                    <img
                                        src="https://avatars.githubusercontent.com/u/8980971?v=4"
                                        title="SanketDG"
                                        width="50"
                                        height="50"
                                    />
                                </a>
                                <a href="https://github.com/dependabot[bot]">
                                    <img
                                        src="https://avatars.githubusercontent.com/in/29110?v=4"
                                        title="dependabot[bot]"
                                        width="50"
                                        height="50"
                                    />
                                </a>
                                <a href="https://github.com/J0">
                                    <img
                                        src="https://avatars.githubusercontent.com/u/8011761?v=4"
                                        title="J0"
                                        width="50"
                                        height="50"
                                    />
                                </a>
                                <a href="https://github.com/14MR">
                                    <img
                                        src="https://avatars.githubusercontent.com/u/5824170?v=4"
                                        title="14MR"
                                        width="50"
                                        height="50"
                                    />
                                </a>
                                <a href="https://github.com/03difoha">
                                    <img
                                        src="https://avatars.githubusercontent.com/u/8876615?v=4"
                                        title="03difoha"
                                        width="50"
                                        height="50"
                                    />
                                </a>
                                <a href="https://github.com/ahtik">
                                    <img
                                        src="https://avatars.githubusercontent.com/u/140952?v=4"
                                        title="ahtik"
                                        width="50"
                                        height="50"
                                    />
                                </a>
                                <a href="https://github.com/Algogator">
                                    <img
                                        src="https://avatars.githubusercontent.com/u/1433469?v=4"
                                        title="Algogator"
                                        width="50"
                                        height="50"
                                    />
                                </a>
                                <a href="https://github.com/GalDayan">
                                    <img
                                        src="https://avatars.githubusercontent.com/u/24251369?v=4"
                                        title="GalDayan"
                                        width="50"
                                        height="50"
                                    />
                                </a>
                                <a href="https://github.com/Kacppian">
                                    <img
                                        src="https://avatars.githubusercontent.com/u/14990078?v=4"
                                        title="Kacppian"
                                        width="50"
                                        height="50"
                                    />
                                </a>
                                <a href="https://github.com/FUSAKLA">
                                    <img
                                        src="https://avatars.githubusercontent.com/u/6112562?v=4"
                                        title="FUSAKLA"
                                        width="50"
                                        height="50"
                                    />
                                </a>
                                <a href="https://github.com/iMerica">
                                    <img
                                        src="https://avatars.githubusercontent.com/u/487897?v=4"
                                        title="iMerica"
                                        width="50"
                                        height="50"
                                    />
                                </a>
                                <a href="https://github.com/pedroapfilho">
                                    <img
                                        src="https://avatars.githubusercontent.com/u/13142568?v=4"
                                        title="pedroapfilho"
                                        width="50"
                                        height="50"
                                    />
                                </a>
                                <a href="https://github.com/eLRuLL">
                                    <img
                                        src="https://avatars.githubusercontent.com/u/1459486?v=4"
                                        title="eLRuLL"
                                        width="50"
                                        height="50"
                                    />
                                </a>
                                <a href="https://github.com/stevenphaedonos">
                                    <img
                                        src="https://avatars.githubusercontent.com/u/12955616?v=4"
                                        title="stevenphaedonos"
                                        width="50"
                                        height="50"
                                    />
                                </a>
                                <a href="https://github.com/tapico-weyert">
                                    <img
                                        src="https://avatars.githubusercontent.com/u/70971917?v=4"
                                        title="tapico-weyert"
                                        width="50"
                                        height="50"
                                    />
                                </a>
                                <a href="https://github.com/adamschoenemann">
                                    <img
                                        src="https://avatars.githubusercontent.com/u/2095226?v=4"
                                        title="adamschoenemann"
                                        width="50"
                                        height="50"
                                    />
                                </a>
                                <a href="https://github.com/AlexandreBonaventure">
                                    <img
                                        src="https://avatars.githubusercontent.com/u/4596409?v=4"
                                        title="AlexandreBonaventure"
                                        width="50"
                                        height="50"
                                    />
                                </a>
                                <a href="https://github.com/dan-dr">
                                    <img
                                        src="https://avatars.githubusercontent.com/u/6669808?v=4"
                                        title="dan-dr"
                                        width="50"
                                        height="50"
                                    />
                                </a>
                                <a href="https://github.com/dts">
                                    <img
                                        src="https://avatars.githubusercontent.com/u/273856?v=4"
                                        title="dts"
                                        width="50"
                                        height="50"
                                    />
                                </a>
                                <a href="https://github.com/jamiehaywood">
                                    <img
                                        src="https://avatars.githubusercontent.com/u/26779712?v=4"
                                        title="jamiehaywood"
                                        width="50"
                                        height="50"
                                    />
                                </a>
                                <a href="https://github.com/dependabot-preview[bot]">
                                    <img
                                        src="https://avatars.githubusercontent.com/in/2141?v=4"
                                        title="dependabot-preview[bot]"
                                        width="50"
                                        height="50"
                                    />
                                </a>
                                <a href="https://github.com/rushabhnagda11">
                                    <img
                                        src="https://avatars.githubusercontent.com/u/3235568?v=4"
                                        title="rushabhnagda11"
                                        width="50"
                                        height="50"
                                    />
                                </a>
                                <a href="https://github.com/weyert">
                                    <img
                                        src="https://avatars.githubusercontent.com/u/7049?v=4"
                                        title="weyert"
                                        width="50"
                                        height="50"
                                    />
                                </a>
                                <a href="https://github.com/casio">
                                    <img
                                        src="https://avatars.githubusercontent.com/u/29784?v=4"
                                        title="casio"
                                        width="50"
                                        height="50"
                                    />
                                </a>
                                <a href="https://github.com/Hungsiro506">
                                    <img
                                        src="https://avatars.githubusercontent.com/u/10346923?v=4"
                                        title="Hungsiro506"
                                        width="50"
                                        height="50"
                                    />
                                </a>
                            </div>

                            <div className="mt-6 text-purpleish text-center">
                                <p className="text-sm mb-1">
                                    Here’s a handful of the <strong>263 people</strong> we have to thank for our
                                    success.
                                </p>
                                <p className="text-xs opacity-80">Based on contributions to PostHog Github libraries</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Roadmap />
        </div>
    )
}
