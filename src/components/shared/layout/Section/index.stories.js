import React from 'react'
import { Section as SectionComponent } from '.'

export default {
    component: SectionComponent,
    title: 'Components/Section',
    argTypes: {
        cols: {
            table: {
                type: {
                    summary: 'Number of columns in section',
                },
            },
        },
        title: {
            table: {
                type: {
                    summary: 'H2 that appears above section',
                },
            },
        },
        titleSize: {
            defaultValue: 'sm',
            options: ['sm', 'md', 'lg'],
            control: { type: 'select' },
            table: {
                type: {
                    summary: 'Font size of title',
                },
            },
        },
        size: {
            defaultValue: 'full',
            options: ['full', 'sm', 'md', 'lg'],
            control: { type: 'select' },
            table: {
                type: {
                    summary: 'Width of section',
                },
            },
        },
    },
}

export const Section = (args) => <SectionComponent {...args} />
Section.args = {
    children: (
        <>
            <div>
                <h4>Privacy</h4>
                <p>
                    Keeping data on your existing infrastructure means you never have to send user data to third
                    parties, minimising the risk of breaches.
                </p>
            </div>
            <div>
                <h4>Control</h4>
                <p>
                    Self-hosting means you control everything, from when to deploy updates to where the servers are
                    physically located.
                </p>
            </div>
            <div>
                <h4>Security</h4>
                <p>
                    With self-hosting there’s no need for lengthy compliance or security audits. Just use your existing
                    infrastructure instead.
                </p>
            </div>
        </>
    ),
    cols: 3,
    title: 'Why is it important to self-host your analytics?',
    titleSize: 'md',
}
