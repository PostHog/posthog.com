import React from 'react'
import ReaderView from 'components/ReaderView'
import CloudinaryImage from 'components/shared/media/CloudinaryImage'
import SEO from 'components/seo'
import { AppLink } from 'components/OSIcons/AppIcon'
import { explorerGridColumns } from '../../constants'

export default function FeetPics(): JSX.Element {
    return (
        <>
            <SEO
                title="Feet pics - PostHog"
                description="PostHog is the only developer platform built to natively work with Session Replay, Feature Flags, Experiments, and Surveys."
                image={`/images/og/default.png`}
            />
            <ReaderView
                className="border-t border-primary"
                hideAppOptions
                hideRightSidebar
                hideLeftSidebar
                showQuestions={false}
            >
                <div
                    className={`@md:pl-4 grid ${explorerGridColumns} gap-y-4 items-start justify-items-center gap-x-1 @md:gap-x-4 relative [&>div]:mx-auto [&_figure]:text-center`}
                >
                    <AppLink
                        label="employee #30200.jpg"
                        Icon={
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/feet_closeup_tulum_f6092da65d.jpg"
                                alt="employee #30200.jpg"
                                className="w-full h-full object-cover"
                                imgClassName="size-24"
                            />
                        }
                        className="size-24"
                    ></AppLink>

                    <AppLink
                        label="employee #30174.jpg"
                        Icon={
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/feet_closeup_mykonos_bd4fe1a4dc.jpg"
                                alt="employee #30174.jpg"
                                className="w-full h-full object-cover"
                                imgClassName="size-24"
                            />
                        }
                        className="size-24"
                    ></AppLink>

                    <AppLink
                        label="plenty of feet.jpg"
                        Icon={
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/plenty_of_feet_49ae3ecedc.jpg"
                                alt="plenty of feet.jpg"
                                className="w-full h-full object-cover"
                                imgClassName="size-24"
                            />
                        }
                        className="size-24"
                    ></AppLink>

                    <AppLink
                        label="questionable decisions.jpg"
                        Icon={
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/20220401_224015_ef582b00c1.jpg"
                                alt="questionable decisions.jpg"
                                className="w-full h-full object-cover"
                                imgClassName="size-24"
                            />
                        }
                        className="size-24"
                    ></AppLink>

                    <AppLink
                        label="lobster toes.png"
                        url="#"
                        Icon={
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/image_8_b6c1a80c8d.png"
                                alt="lobster toes.png"
                                className="w-full h-full object-cover"
                                imgClassName="size-24"
                            />
                        }
                        className="size-24"
                    ></AppLink>

                    <AppLink
                        label="broken bone (real).jpg"
                        Icon={
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/h_1000,c_limit,q_auto,f_auto/IMG_7213_487294168e.jpg"
                                alt="broken bone (real).jpg"
                                className="w-full h-full object-cover"
                                imgClassName="size-24"
                            />
                        }
                        className="size-24"
                    ></AppLink>

                    <AppLink
                        label="employee #30264.jpg"
                        Icon={
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/a_90,h_1000,c_limit,q_auto,f_auto/A004066_R1_19_6_8bd7f1c686.JPG"
                                alt="employee #30264.jpg"
                                className="w-full h-full object-cover"
                                imgClassName="size-24"
                            />
                        }
                        className="size-24"
                    ></AppLink>

                    <AppLink
                        label="GO AWAY BEAR.png"
                        Icon={
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/h_1000,c_limit,q_auto,f_auto/Clean_Shot_2026_07_23_at_10_11_01_7e640950df.png"
                                alt="GO AWAY BEAR.png"
                                className="w-full h-full object-cover"
                                imgClassName="size-24"
                            />
                        }
                        className="size-24"
                    ></AppLink>
                </div>
            </ReaderView>
        </>
    )
}
