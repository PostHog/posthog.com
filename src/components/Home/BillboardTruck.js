import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { Quote } from 'components/Pricing/Quote'
import { section } from './classes'
import { Check3, YC } from 'components/Icons'
import { CallToAction } from 'components/CallToAction'

export const Contra = ({ active }) => {
    return (
        <svg fill="none" className="h-6" viewBox="0 0 128 24">
            <g fill="#fff" clipPath="url(#a)">
                <path d="M45.23 16.114c-.865 3.086-3.46 5.143-7.179 5.143-4.757 0-8.043-3.343-8.043-8.4 0-5.314 3.892-9.171 9.513-9.171 2.163 0 3.72.514 4.584.857l.519 4.885h-.346c-1.99-3.085-3.719-5.057-5.19-5.057-1.988 0-3.545 2.4-3.545 6.258 0 4.885 2.595 6.77 5.535 6.77 1.643 0 3.114-.6 3.978-1.37h.173v.085Zm13.578-3.6c0-4.8-.952-8.228-3.46-8.228s-3.46 3.342-3.46 8.143c0 4.8 1.039 8.057 3.46 8.057 2.422 0 3.46-3.258 3.46-8.058m-12.627 0c0-4.714 4.151-8.742 9.167-8.742 5.017 0 9.168 4.114 9.168 8.828 0 4.715-4.151 8.657-9.168 8.657-5.016 0-9.167-3.942-9.167-8.657m27.157 8.229h-7.179v-.172c.52-1.714.865-3 .865-5.914v-3.771c0-2.572-.519-3.943-1.73-5.4L72.3 3.428v3.43h.173c.865-1.372 2.68-3.258 5.708-3.258 3.027 0 5.189 1.886 5.189 4.714v6.343c0 2.829.173 4.286.778 5.914H76.97c.605-1.714.865-3.171.865-5.828V8.657c0-1.457-.692-2.571-2.335-2.571-1.298 0-2.335.857-3.027 1.714v6.857c0 2.829.26 4.286.865 5.914v.172Zm13.578-4.2V4.97h-1.903v-.257l6.92-4.371h.432v3.943h12.281v.685H92.365v11.4c0 2.058 1.124 2.658 2.421 2.658 1.211 0 1.99-.515 1.99-.515h.086c-.778 1.372-2.595 2.657-5.276 2.657-2.767 0-4.67-1.285-4.67-4.628Z" />
                <path d="M98.51 20.743v-.172c.518-1.714.864-3 .864-5.914v-3.771c0-2.572.087-4.629-1.124-6V4.8l6.4-.514v3.343c1.47-1.458 3.114-4.115 6.054-3.943l-.605 5.742h-.173a5.634 5.634 0 0 0-3.546-2.057c-.519 0-1.125.429-1.557 1.029v6.343c0 2.828.259 4.286.865 5.914H98.51v.086ZM119.698 18V12.17c-2.422.686-3.719 2.315-3.719 3.943 0 1.286.778 2.143 2.248 2.143.606 0 1.038-.086 1.471-.343m.086.686c-.951 1.371-2.594 2.571-4.757 2.571-2.075 0-3.892-1.457-3.892-3.942 0-3.686 4.671-4.972 8.563-5.743V9.77c0-2.057-.865-3-3.287-3-1.297 0-2.94.258-4.411.857l-.173-.17c1.73-1.972 4.325-3.772 8.044-3.772 3.632 0 5.275 1.8 5.275 4.457V16.8c0 .857.433 1.543 1.471 1.543.432 0 .864-.086 1.297-.429l.086.172c-.519 1.114-1.729 3.085-4.583 3.085-2.076 0-3.287-1.114-3.633-2.571Z" />
                <path d="M91.243 4.886h13.406v-.857H91.243v.857ZM12.8 11.143h10.81c.174 0 .26 0 .26-.172v-.342c0-.086 0-.172-.173-.172C18.595 9.086 14.617 5.23 13.32.171L12.973 0h-.26c-.086 0-.172.086-.172.257v10.714c0 .086 0 .172.172.172h.087Zm0 12.514h.346l.173-.171c1.384-5.057 5.276-9 10.378-10.286l.173-.257v-.257c0-.086-.086-.257-.26-.257H12.8l-.173.257V23.4c0 .171 0 .257.173.257Zm-1.99 0h.26c.087 0 .173-.086.173-.257V12.686c0-.086 0-.257-.173-.257H.26c-.174 0-.26.171-.26.257v.343c0 .085 0 .171.173.171 5.103 1.286 9.081 5.229 10.378 10.286l.26.171ZM.26 11.143h10.81c.087 0 .173 0 .173-.172V.257c0-.171 0-.257-.173-.257h-.346c-.086 0-.173 0-.173.171-1.383 4.972-5.362 9-10.378 10.286L0 10.714v.257c0 .086.086.172.26.172Z" />
            </g>
            <defs>
                <clipPath id="a">
                    <path fill="#fff" d="M0 0h128v24H0z" />
                </clipPath>
            </defs>
        </svg>
    )
}

export default function BillboardTruck({ leftHandDrive }) {
    return (
        <section className="text-center pb-12">
            <div className="relative mx-auto hidden md:inline-block md:[zoom:.75] mdlg:[zoom:.9] lg:[zoom:1]">
                <StaticImage
                    src="./images/billboard-truck.png"
                    alt=""
                    className={`w-[966px] max-w-screen ${leftHandDrive ? 'transform -scale-x-100' : ''}`}
                    quality={100}
                    formats={['png']}
                />
                <div
                    className={`absolute top-[16.25%] w-[495px] h-[239px] ${
                        leftHandDrive ? 'left-[5.25%]' : 'right-[5.25%]'
                    }`}
                >
                    <div className="relative h-full text-left">
                        <div className={`text-white pt-[1.25rem] pr-5 pl-[10.5rem]`}>
                            <p className="text-[1.4rem] font-bold mb-2">So glad we picked @posthog</p>
                            <p className="font-bold mb-3 leading-[1.3rem]">
                                <span className="text-yellow">Hard to quantify just how much time we've saved</span> by
                                reducing complexity of our data pipeline and{' '}
                                <span className="text-yellow">using a single tool as a source of truth</span> for almost
                                every customer related data question
                            </p>
                            <div className="flex items-center gap-7">
                                <div className="flex flex-col">
                                    <strong>Gajus Kuizinas</strong>
                                    <span className="opacity-50 text-sm">Co-founder, CTO</span>
                                </div>
                                <div className="border-l border-dark pl-6 py-2">
                                    <Contra />
                                </div>
                            </div>
                        </div>
                        <div className="absolute left-0 bottom-0">
                            <StaticImage
                                src="./images/gajus.png"
                                alt=""
                                className="w-[164px] h-[190px]"
                                quality={100}
                                formats={['png']}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
