import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import CallToAction from 'components/MainNav/Submenus/CallToAction'
import { Link } from 'gatsby'

interface PopularPageProps {
    icon: string
    label: string
    url: string
}

const PopularPage = ({ icon, label, url }: PopularPageProps) => {
    return (
        <li
            className="border-r border-dashed border-gray-accent-dark last:border-r-0 pr-1 last:pr-0 list-none
        [&:nth-child(1)>a>div]:!bg-red
        [&:nth-child(2)>a>div]:!bg-blue
        [&:nth-child(3)>a>div]:!bg-yellow
        "
        >
            <Link to={url} className="text-white flex flex-col items-center hover:bg-white/10 rounded p-4">
                <div
                    className="w-12 h-12 rounded-full mb-2 hover:text-white
                
                "
                >
                    {icon}
                </div>
                <h4 className="text-center text-base leading-tight font-semibold">{label}</h4>
            </Link>
        </li>
    )
}

const Star = () => {
    return (
        <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="w-5 h-5">
            <path
                d="M19.669 8.027 14.845 12l2.377 6.79c.126.36.014.76-.281 1.003a.906.906 0 0 1-1.038.08L10 16.403l-5.903 3.472A.91.91 0 0 1 2.78 18.79L5.155 12 .33 8.027a.909.909 0 0 1 .578-1.61h6.2L9.142.609a.91.91 0 0 1 1.716 0l2.033 5.808h6.2a.91.91 0 0 1 .578 1.61Z"
                fill="#F1A82C"
            />
        </svg>
    )
}

export const AboutTransparency = () => {
    return (
        <section id="transparency" className="bg-black pt-12 relative px-4 lg:px-8">
            <div className="flex flex-col-reverse lg:flex-row items-center gap-8 max-w-5xl mx-auto text-white">
                <aside className="basis-[60%] flex flex-col relative h-full">
                    <div className="border-2 border-white/50 border-solid px-8 py-6 max-w-sm">
                        <div className="flex items-center justify-between border-b border-dashed border-gray-accent-light pb-3 mb-3">
                            <h4 className="text-xl mb-0">Transparency</h4>
                            <div className="flex space-x-1">
                                <Star />
                                <Star />
                                <Star />
                                <Star />
                                <Star />
                            </div>
                        </div>
                        <p className="text-white/70 text-[15px]">Most embraced company value</p>
                        <p className="font-bold text-sm mb-0">- As voted by employees</p>
                    </div>

                    <StaticImage
                        src="./images/xray.png"
                        width={651}
                        height={289}
                        alt="A hedgehog getting an x-ray as an analogy of how transparent we try to be"
                        className="-mx-4 lg:-mx-0 -mt-6 lg:-mt-10"
                    />
                </aside>
                <div className="flex-1">
                    <h3 className="text-4xl mb-2">Why we're different</h3>
                    <h4 className="font-semibold opacity-70">
                        Being open source, we operate in public as much as we can.
                    </h4>
                    <p className="opacity-70">Here are some popular pages from our company handbook:</p>
                    <ul className="p-0 m-0 gap-x-1 grid grid-cols-3">
                        <PopularPage icon="icon name" label="Compensation calculator" url="/handbook/compensation" />
                        <PopularPage icon="icon name" label="Company strategy" url="/handbook/strategy" />
                        <PopularPage icon="icon name" label="Business model" url="/handbook/company/strategy" />
                    </ul>
                </div>
            </div>
        </section>
    )
}
