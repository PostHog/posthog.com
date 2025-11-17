import React from 'react'
import { Link } from 'react-scroll'
import slugify from 'slugify'

export default function DotLeaderLink({ text, number }: { text: string; number: number }) {
    return (
        <Link
            smooth
            to={slugify(text)}
            className="flex items-baseline before:border-b-2 before:border-dotted before:border-primary before:flex-grow before:order-2 before:mx-2 text-primary hover:text-primary font-bold"
        >
            {text}
            <span className="order-3">{number}</span>
        </Link>
    )
}
