import CloudinaryImage from 'components/CloudinaryImage'
import { Quote } from 'components/Pricing/Quote'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import Card from './Card'

export default function Intro({ name }: { name: string }) {
    return (
        <Card className="bg-white">
            <h3>Hey {name} team! 👋</h3>
            <p className="text-[17px] leading-[1.7]">
                We’ve created this handy guide to answer common questions you or your team may have.
            </p>
            <p className="text-[17px] leading-[1.7]">
                If you have questions that aren’t covered here, just shoot us an email!
            </p>
            <Quote
                name="James Hawkins"
                title="Co-founder & CEO"
                image={<CloudinaryImage alt="James Hawkins" width={80} src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/james.png" />}
            />
        </Card>
    )
}
