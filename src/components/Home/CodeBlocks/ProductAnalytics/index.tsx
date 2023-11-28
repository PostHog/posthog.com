import CodeBlock from 'components/Home/CodeBlock'
import React from 'react'
import HoverTooltip from 'components/Tooltip'

function DataAttributes() {
    return (
        <div className="-mt-5">
            <p className="leading-tight">
                Record data from a webpage when a button is clicked. Using only HTML, you can enrich autocaptured events
                with details that will make analysis more useful - both in aggregate and when learning about an
                individual user.
            </p>
            <div className="flex flex-col lg:flex-row">
                <div className="min-w-[300px]">
                    <h4 className="text-xl">Your website</h4>
                    <div className="bg-accent dark:bg-accent-dark border border-light dark:border-dark rounded p-4 space-y-2 font-os">
                        <div className="text-center pb-2">
                            <svg
                                className="mx-auto h-[30px]"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 67 20"
                                fill="none"
                            >
                                <path
                                    fill="#B9090B"
                                    fillRule="evenodd"
                                    d="M26.18 16.33h.14c1.317 0 2.322-.371 3.014-1.113.692-.758 1.037-1.837 1.037-3.237V7.783h-3.928v2.471h1.359v1.924c0 1.12-.47 1.68-1.409 1.68-.939 0-1.408-.161-1.408-1.282v-8.4c0-1.137.47-1.705 1.408-1.705.94 0 1.409.568 1.409 1.705V5.83h2.57V4.35c0-1.4-.346-2.471-1.038-3.212C28.642.379 27.637 0 26.319 0s-2.322.379-3.014 1.137c-.692.74-1.038 1.812-1.038 3.212v8.03c0 1.4.346 2.479 1.038 3.237.667.715 1.626.714 2.876.713ZM38.642 6.38h-3.839V2.805h5.084V0H32.05v15.55h2.752V9.185h3.84V6.38Zm9.296 6.883a88.313 88.313 0 0 0-3.493-.169V0h-2.805v15.742c2.56.053 5.066.21 7.573.368v-2.77c-.422-.023-.847-.05-1.275-.076Zm3.789 3.048-.148-.009V0h2.753v16.514c-.862-.1-1.755-.152-2.605-.202ZM63.06 8.537 66.62 0h-3.068l-1.964 4.716L59.748 0h-3.015l3.26 8.432-3.611 8.222c.42.058.835.1 1.248.144.586.06 1.17.121 1.767.224l2.051-4.768 2.016 5.189c.262.043.525.088.787.133h.001c.79.135 1.578.27 2.368.375l-3.56-9.414ZM3.039.061H0v19.342l3.04-.399V10.7H6.3v7.907l3.04-.399V.061H6.3v7.875H3.04V.06Zm12.323 17.36c-.938.047-1.684.084-2.24-.511-.716-.766-1.074-1.848-1.074-3.247v-9.19c0-1.399.358-2.481 1.074-3.247C13.838.46 14.87.077 16.218.077c1.349 0 2.381.383 3.097 1.149.716.766 1.074 1.848 1.074 3.247v8.925c0 1.398-.358 2.082-1.074 2.848-.716.766-1.748 1.149-3.097 1.149-.3 0-.586.014-.856.027Zm.856-2.524c.95 0 1.424-.176 1.424-1.325V4.299c0-1.149-.475-1.723-1.424-1.723s-1.423.574-1.423 1.723v9.54c0 1.069.41 1.066 1.23 1.06h.193Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="flex justify-between">
                            <span>Standard (monthly)</span>
                            <strong>$12.99</strong>
                        </div>
                        <ul className="list-none opacity-75 pl-4 pb-2">
                            <li className="!text-sm">Quality: HD</li>
                            <li className="!text-sm">Seats: 2</li>
                            <li className="!text-sm">Downloads: None</li>
                        </ul>
                        <HoverTooltip
                            content={() => <div className="">Silly goose, this button is just for show!</div>}
                        >
                            <div className="border-[1.5px] border-blue p-2 rounded cursor-not-allowed">
                                <div className="bg-red text-white p-4 rounded text-center font-bold relative">
                                    Start trial
                                    <span className="text-black dark:text-white">
                                        <svg
                                            className="absolute right-8 -bottom-4 fill-current"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="44"
                                            height="44"
                                            fill="none"
                                        >
                                            <path d="M14.431 12.02c-1.505-.561-2.974.907-2.412 2.413l8.393 22.492a1.875 1.875 0 0 0 3.082.67l6.255-6.254 9.33 9.33a1.125 1.125 0 1 0 1.59-1.591l-9.33-9.33 6.255-6.254a1.875 1.875 0 0 0-.67-3.083L14.43 12.02ZM13.5 0c.621 0 1.125.504 1.125 1.125V3.75a1.125 1.125 0 0 1-2.25 0V1.125C12.375.504 12.879 0 13.5 0ZM23.155 3.844c.44.44.44 1.151 0 1.59l-1.966 1.967a1.125 1.125 0 0 1-1.591-1.591l1.966-1.966c.44-.44 1.151-.44 1.59 0ZM7.402 21.19a1.125 1.125 0 0 0-1.591-1.592l-1.966 1.966a1.125 1.125 0 0 0 1.59 1.591l1.967-1.966ZM4.875 13.5c0 .621-.504 1.125-1.125 1.125H1.125a1.125 1.125 0 0 1 0-2.25H3.75c.621 0 1.125.504 1.125 1.125ZM5.81 7.402A1.125 1.125 0 1 0 7.403 5.81L5.436 3.845a1.125 1.125 0 1 0-1.591 1.59L5.81 7.403Z" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </HoverTooltip>
                    </div>
                </div>
                <div className="flex justify-center lg:items-end lg:mb-12 lg:ml-[calc(-1rem_-_1px)]">
                    <svg
                        className="hidden lg:block"
                        xmlns="http://www.w3.org/2000/svg"
                        width="62"
                        height="77"
                        fill="none"
                    >
                        <path
                            fill="#2F80FA"
                            fillRule="evenodd"
                            d="M37.382 1.75A2.25 2.25 0 0 0 35.132 4v69a3.75 3.75 0 0 1-3.75 3.75H0v-1.5h31.382a2.25 2.25 0 0 0 2.25-2.25V4a3.75 3.75 0 0 1 3.75-3.75H62v1.5H37.382Z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <div className="lg:hidden w-[1.5px] bg-blue h-24 mt-[calc(-1rem_-_1px)] -mb-14"></div>
                </div>
                <div className="flex-1">
                    <h4 className="text-xl">Your code</h4>
                    <div className="border-[1.5px] border-blue p-2 rounded">
                        <div className="-mt-2 -mb-4">
                            <CodeBlock
                                lineNumberStart={301}
                                code={`<button
  data-ph-capture-attribute-plan-price="12.99"
  data-ph-capture-attribute-plan-id="XYZ12345"
  data-ph-capture-attribute-plan-term="monthly"
  data-ph-capture-attribute-plan-feature-quality="HD"
  data-ph-capture-attribute-plan-feature-seats="2"
  data-ph-capture-attribute-plan-feature-downloads
>
  Subscribe
</button>`}
                                language="html"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function DataCapture() {
    return (
        <div className="-mt-5">
            <p className="leading-tight">
                For privacy, PostHog already doesn't track values of <code>input</code> fields. If you want to block
                capturing of sensitive data in other places, just add the <code>.ph-no-capture</code> CSS class to any
                DOM element.
            </p>
            <div>
                <h4 className="text-xl">Your code</h4>
                <CodeBlock code={`<button class='ph-no-capture'>Sensitive information here</button>`} language="html" />
            </div>
        </div>
    )
}

export default [
    {
        title: 'Send data attributes with autocaptured events',
        body: DataAttributes,
        bodyType: 'component',
        code: ['data-ph-capture-attribute'],
    },
    {
        title: 'Prevent sensitive data capture',
        body: DataCapture,
        bodyType: 'component',
        code: ['ph-no-capture'],
    },
]
