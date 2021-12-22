import React from 'react'
import { Quote as QuoteComponent } from '.'

export default {
    component: QuoteComponent,
    title: 'Components/Quote',
    argTypes: {
        size: {
            defaultValue: 'lg',
            options: ['md', 'lg'],
            control: { type: 'select' },
            table: {
                type: {
                    summary: 'Determines font, spacing, and image size',
                },
                defaultValue: { summary: 'lg' },
            },
        },
        imageSource: {
            table: {
                type: {
                    summary: 'Headshot image URL',
                },
            },
        },
        name: {
            table: {
                type: {
                    summary: 'Name of the person/company making the quote',
                },
            },
        },
        title: {
            table: {
                type: {
                    summary: 'Job title of the person/company making the quote',
                },
            },
        },
    },
}

export const Quote = (args) => <QuoteComponent {...args} />
Quote.args = {
    imageSource: '/images/customers/anca.png',
    name: 'Anca Filip',
    title: 'Head of Product, Mention Me',
    quote: `"PostHog has helped us improve our product and get a much better understanding of our users than we've ever been able to before."`,
}
