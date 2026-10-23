import React from 'react'
import { Carousel } from 'components/UI/Carousel'
import { cardLevels } from 'components/UI/styles'
import testimonials from '../../../../data/testimonials.json'

export default function CustomerQuotes(): JSX.Element {
    return (
        <Carousel label="What customers say" slidesPerView={3} peek>
            {testimonials
                .filter(
                    (item, index, all) => all.findIndex((other) => other.author.name === item.author.name) === index
                )
                .slice(0, 6)
                .map(({ quote, author }, index) => (
                    <figure key={index} className={`${cardLevels[1]} m-0 flex h-full flex-col gap-6 p-5`}>
                        <blockquote className="m-0 grow text-base font-medium">“{quote}”</blockquote>
                        <figcaption className="text-sm">
                            <strong className="block text-primary">{author.name}</strong>
                            <span className="text-secondary">
                                {author.role}, {author.company.name}
                            </span>
                        </figcaption>
                    </figure>
                ))}
        </Carousel>
    )
}
