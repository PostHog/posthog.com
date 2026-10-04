import React from 'react'
import pipelinesJson from '@data/content-cdp-pipelines.json'
import PipelinesList from '../PipelinesList'
import { CallToAction } from '../CallToAction'
import { heading, section } from './classes'

const Listing = ({ name, image, url }) => {
    return (
        <li className="border-t border-l border-dashed border-primary">
            <a href={url} className="flex flex-col items-center text-center px-2 py-6 hover:bg-primary">
                <img className="icon w-8 h-8 mb-2" src={image} />
                <span className="text-primary">{name}</span>
            </a>
        </li>
    )
}

export default function Pipelines() {
    return (
        <section className={section('mt-4 md:mt-8')}>
            <h2 className={heading('lg')}>
                PostHog data connections help you <br className="hidden lg:block" />
                <span className="text-blue">do more with your data</span>
            </h2>
            <p className="my-6 mx-auto text-center text-lg md:text-lg font-semibold mt-2 lg:mt-4 text-primary max-w-2xl opacity-75">
                Or <a href="/docs/cdp">build your own data connection</a>
            </p>
            <div className="mt-8 md:mt-12">
                <PipelinesList hideBuildYourOwn pipelines={pipelinesJson} />

                <footer className="text-center">
                    <CallToAction to="/cdp" type="outline" className="mt-8">
                        Browse 50ish data connections
                    </CallToAction>
                </footer>
            </div>
        </section>
    )
}
