import React from 'react'
import SplitFlap from 'components/SplitFlap'
const featureClasses = `m-0 font-semibold`

const features = [
    {
        to: 4,
        delay: 0.5,
        content: (
            <>
                <p className={featureClasses}>SaaS products in one</p>
                <p className="m-0 text-sm">(All designed to work natively together)</p>
            </>
        ),
    },
    {
        to: 1,
        from: 1000,
        delay: 0.08,
        randomize: true,
        length: 15,
        content: <p className={featureClasses}>Place to send user data</p>,
    },
    {
        to: 1,
        from: 100,
        delay: 0.08,
        randomize: true,
        length: 15,
        content: <p className={featureClasses}> Account to provision</p>,
    },
    {
        to: 0,
        from: 100,
        delay: 0.08,
        randomize: true,
        length: 15,
        content: <p className={featureClasses}>Sales people to deal with</p>,
    },
]

export default function AllInOne() {
    return (
        <section className="my-16 md:my-24 mx-auto max-w-4xl px-4">
            <h2 className="m-0 text-4xl md:text-6xl text-center leading-tight md:leading-none">
                <span className="text-red">Still</span> paying 4+ analytics vendors...{' '}
                <br className="hidden md:block" />
                <span className="text-red inline-block">and</span> tools to connect them all?
            </h2>
            <p className="text-center m-0 mt-4 font-semibold opacity-70 text-base sm:text-lg">
                (They’ll never play together as nicely as this.)
            </p>
            <ul
                className="grid grid-cols-2 sm:grid-cols-4
             list-none p-0 m-0 items-start mt-8 md:mt-12 gap-y-8 md:gap-y-0 gap-x-4"
            >
                {features.map(({ to, from, content, delay, randomize, length }, index) => {
                    return (
                        <li className="text-center flex flex-col items-center justify-center space-y-2" key={index}>
                            <SplitFlap
                                perspective="20rem"
                                randomize={randomize}
                                to={to}
                                from={from}
                                delay={delay}
                                length={length}
                            />
                            <div>{content}</div>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}
