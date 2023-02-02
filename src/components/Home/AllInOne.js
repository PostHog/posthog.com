import React from 'react'

const featureClasses = `m-0 text-sm font-semibold`

const features = [
    {
        number: '4+',
        content: (
            <>
                <p className={featureClasses}>SaaS products in one</p>
                <p className="m-0 text-xs">(All designed to work natively together)</p>
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
        <div className="w-[45px] h-[45px] flex items-center justify-center bg-black rounded-sm">
            <p className="m-0 text-2xl text-white">{children}</p>
        </div>
    )
}

export default function AllInOne() {
    return (
        <section className="my-16 mx-auto max-w-[850px] px-4">
            <h2 className="m-0 text-3xl md:text-5xl text-center">
                <span className="text-red">Still</span> paying for 4+ different services...{' '}
                <span className="text-red">and</span> tools to connect them all?
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
