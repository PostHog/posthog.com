import React from 'react'

const featureClasses = `m-0 font-semibold`

const features = [
    {
        number: '4+',
        content: (
            <>
                <p className={featureClasses}>SaaS products in one</p>
                <p className="m-0 text-sm">(All designed to work natively together)</p>
            </>
        ),
    },
    {
        number: '1',
        content: <p className={featureClasses}>Place to send user data</p>,
    },
    {
        number: '1',
        content: <p className={featureClasses}> Account to provision</p>,
    },
    {
        number: '0',
        content: <p className={featureClasses}>Sales people to deal with</p>,
    },
]

const DataSquare = ({ children }) => {
    return (
        <div className="w-20 h-20 flex items-center justify-center bg-black rounded-sm relative before:absolute before:top-0 before:left-0 before:w-full before:bottom-0 before:content-[''] before:bg-gradient-to-b before:from-white/0 before:via-white/20 before:to-white/0 after:content-[''] after:h-[1px] after:left-0 after:w-full after:top-1/2 after:bg-white/25 after:absolute shadow-xl">
            <p className="m-0 text-4xl font-bold text-yellow relative">{children}</p>
        </div>
    )
}

export default function AllInOne() {
    return (
        <section className="my-24 mx-auto max-w-4xl px-4">
            <h2 className="m-0 text-3xl md:text-6xl text-center leading-none">
                <span className="inline-block">
                    <span className="text-red">Still</span> paying 4+ different vendors...
                </span>{' '}
                <span className="inline-block">
                    <span className="text-red inline-block">and</span> tools to connect them all?
                </span>
            </h2>
            <p className="text-center m-0 mt-4 font-semibold opacity-70 text-base sm:text-lg">
                (They’ll never play together as nicely as this.)
            </p>
            <ul
                className="grid grid-cols-2 sm:grid-cols-4
             list-none p-0 m-0 items-start mt-8 md:mt-12 gap-4"
            >
                {features.map(({ number, content }, index) => {
                    return (
                        <li className="text-center flex flex-col items-center justify-center space-y-2" key={index}>
                            <DataSquare>{number}</DataSquare>
                            <div>{content}</div>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}
