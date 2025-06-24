import { Check } from 'components/Icons/Icons'
import Modal from 'components/Modal'
import React from 'react'

const features = [
    {
        title: 'Customer data never leaves your infrastructure',
        description: 'Self-hosting PostHog makes it much easier to meet HIPAA, GDPR, and SOC 2 requirements.',
    },
    {
        title: 'Capture up to 30% more events than PostHog Cloud',
        description: 'First-party cookie means privacy trackers don’t block PostHog like a third-party script.',
    },
    {
        title: 'Easy deploy instructions for most private cloud platforms',
        description:
            'Step-by-step instructions for hosting on AWS, DigitalOcean, Google Cloud, or deploying with Helm Chart',
    },
]

export default function SelfHost({ setOpen, open }: { setOpen: (open: boolean) => void; open: boolean }) {
    return (
        <Modal setOpen={setOpen} open={open}>
            <div className="bg-white p-9 w-full max-w-lg h-full ml-auto relative z-10">
                <div className="flex items-end justify-between">
                    <h2 className="text-3xl m-0">Self-hosting</h2>
                    <button onClick={() => setOpen(false)}>
                        <svg width="56" height="46" viewBox="0 0 56 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_d_4902_123054)">
                                <rect width="56" height="44" rx="4" fill="white" shapeRendering="crispEdges" />
                                <g opacity="0.6">
                                    <path
                                        d="M33.3045 20.08L38.6567 14.7278C39.5445 13.8399 39.6889 12.4234 38.8967 11.4633C37.9845 10.3589 36.3523 10.3111 35.369 11.2955L29.9203 16.7199C28.8646 17.7756 27.1603 17.7756 26.1047 16.7199L20.7525 11.3677C19.8647 10.4799 18.4481 10.3355 17.488 11.1277C16.3602 12.0399 16.3124 13.6722 17.2958 14.6555L22.7203 20.0799C23.7759 21.1356 23.7759 22.8399 22.7203 23.8955L17.2958 29.3442C16.3602 30.2798 16.3602 31.7919 17.2958 32.7287C17.7514 33.1843 18.3758 33.4243 18.9758 33.4243C19.5758 33.4243 20.2002 33.1843 20.6558 32.7287L26.1045 27.2799C27.1602 26.2243 28.8645 26.2243 29.9201 27.2799L35.3445 32.7044C35.8002 33.16 36.4245 33.4 37.0245 33.4C37.6002 33.4 38.2002 33.1844 38.6567 32.7522C39.6411 31.8166 39.5924 30.2078 38.6324 29.2478L33.3046 23.92C32.2481 22.8644 32.2481 21.1355 33.3046 20.08L33.3045 20.08Z"
                                        fill="black"
                                    />
                                </g>
                                <rect
                                    x="0.5"
                                    y="0.5"
                                    width="55"
                                    height="43"
                                    rx="3.5"
                                    stroke="#E5E7E0"
                                    shapeRendering="crispEdges"
                                />
                            </g>
                            <defs>
                                <filter
                                    id="filter0_d_4902_123054"
                                    x="0"
                                    y="0"
                                    width="56"
                                    height="46"
                                    filterUnits="userSpaceOnUse"
                                    colorInterpolationFilters="sRGB"
                                >
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <feColorMatrix
                                        in="SourceAlpha"
                                        type="matrix"
                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                        result="hardAlpha"
                                    />
                                    <feOffset dy="2" />
                                    <feComposite in2="hardAlpha" operator="out" />
                                    <feColorMatrix
                                        type="matrix"
                                        values="0 0 0 0 0.898039 0 0 0 0 0.905882 0 0 0 0 0.878431 0 0 0 1 0"
                                    />
                                    <feBlend
                                        mode="normal"
                                        in2="BackgroundImageFix"
                                        result="effect1_dropShadow_4902_123054"
                                    />
                                    <feBlend
                                        mode="normal"
                                        in="SourceGraphic"
                                        in2="effect1_dropShadow_4902_123054"
                                        result="shape"
                                    />
                                </filter>
                            </defs>
                        </svg>
                    </button>
                </div>
                <h3 className="text-[18px] !text-bold/50 m-0 mt-2">Host on-prem so customer data stays private.</h3>
                <ul className="list-none m-0 p-0 mt-6">
                    {features.map((feature) => {
                        return (
                            <li
                                key={feature.title}
                                className="flex items-start space-x-2 text-gray-accent-light border-t first:border-t-0 border-dashed border-primary-accent mt-4 pt-4 first:mt-0 first:pt-0"
                            >
                                <Check className="w-[20px] flex-shrink-0" />
                                <div>
                                    <h4 className="text-lg m-0">{feature.title}</h4>
                                    <p className="text-[15px] font-semibold m-0 leading-snug text-black/50">
                                        {feature.description}
                                    </p>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </Modal>
    )
}
