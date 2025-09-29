import CloudinaryImage from 'components/CloudinaryImage'
import React from 'react'

interface SalesRep {
    name: string
    title: string
    email: string
    photo: string
    color: string
}

export default function SalesRep({ salesRep }: { salesRep: SalesRep }) {
    return (
        <div className="flex items-center gap-3">
            <CloudinaryImage
                src={salesRep.photo as `https://res.cloudinary.com/${string}`}
                alt={salesRep.name}
                className={`size-20 rounded-full overflow-hidden border-2 border-${salesRep.color} p-[1.5px]`}
                imgClassName={`object-cover rounded-full bg-${salesRep.color}`}
                width={116}
            />
            <div className="text-left">
                <div className="text-2xl font-semibold @2xl:leading-tight">{salesRep.name}</div>
                <div className="text-xl opacity-75 @2xl:leading-tight">{salesRep.title}</div>
                <a
                    href={`mailto:${salesRep.email}`}
                    className="block pt-0.5 text-lg underline font-semibold @2xl:leading-tight"
                >
                    {salesRep.email}
                </a>
            </div>
        </div>
    )
}
