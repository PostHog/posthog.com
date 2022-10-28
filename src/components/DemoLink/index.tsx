import React from 'react'
import { Link } from 'gatsby'
import { CallToAction } from 'components/CallToAction'

export const DemoLink = ({ dark = false, className = '' }: { dark?: boolean; className?: string }): JSX.Element => {
    return dark ? (
        <CallToAction
            type="secondary"
            to="/book-a-demo"
            className={` ${className} text-[15px] group justify-center font-semibold text-white py-2 px-3 rounded-sm hover:!text-white bg-white/0 border border-solid border-white/20 hover:bg-white/30 inline-flex space-x-2 items-center relative active:top-[0.5px] active:scale-[.98] !w-full md:!w-44 shadow-xl`}
        >
            <span>Schedule a call</span>
        </CallToAction>
    ) : (
        <CallToAction
            type="secondary"
            to="/book-a-demo"
            className={` ${className} text-[15px] group justify-center font-semibold py-2 px-3 rounded-sm inline-flex space-x-2 items-center relative active:top-[0.5px] active:scale-[.98]  !w-full md:!w-44 shadow-xl`}
        >
            <span>Schedule a call</span>
        </CallToAction>
    )
}
