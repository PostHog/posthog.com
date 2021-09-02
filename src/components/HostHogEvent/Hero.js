import React from 'react'
import { CallToAction } from 'components/CallToAction'

export default function Hero() {
    return (
        <section className="flex flex-col justify-center items-center bg-blue rounded-lg mx-10">
            <div className="grid grid-rows-3 grid-cols-2 grid-flow-col text-white">
                <div className="row-span-3 col-span-2">
                    <h1 className="m-16 text-center text-4xl md:text-6xl text-white">HostHog London 2021</h1>
                    <p className="mt-8 m-16 px-16">
                        Our March HostHog will be hosted by Head of Product Marcus Hyett, with guest speakers from the
                        award-winning referral marketing platform, Mention Me.
                    </p>
                </div>
                <div className="flex items-center border-l border-b border-dashed py-2 px-4">22nd March</div>
                <div className="flex items-center border-l border-b border-dashed py-2 px-4">5pm - 10pm</div>
                <div className="grid grid-rows-2 flex items-center border-l border-dashed px-4 pb-2">
                    <div className="py-2">Liverpool Street, London</div>
                    <div className="justify-center py-2">
                        <CallToAction
                            type="button"
                            width="56"
                            className="bg-gray text-black border-2 border-gray"
                            to="#"
                        >
                            Directions
                        </CallToAction>
                    </div>
                </div>
            </div>
        </section>
    )
}
