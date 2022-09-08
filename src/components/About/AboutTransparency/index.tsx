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
        <li className="border-r border-dashed border-gray-accent-dark last:border-r-0 list-none">
            <Link to={url} className="text-white flex flex-col items-center hover:bg-white/10 rounded p-4">
                <div className="w-12 h-12 rounded-full">{icon}</div>
                <h4 className="text-center">{label}</h4>
            </Link>
        </li>
    )
}

export const AboutTransparency = () => {
    return (
        <section className="bg-black pt-8 relative">
            <div className="flex gap-8 max-w-5xl mx-auto text-white">
                <aside className="grow-0 shrink-0 basis-[60%]">
                    <StaticImage
                        src="./images/xray.png"
                        width={651}
                        height={289}
                        alt="A hedgehog getting an x-ray as an analogy of how transparent we try to be"
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
