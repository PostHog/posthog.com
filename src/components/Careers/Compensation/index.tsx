import React from 'react'
import Link from 'components/Link'
import { CompensationCalculator } from 'components/CompensationCalculator'
import { IconChevronDown } from '@posthog/icons'
import { CallToAction } from 'components/CallToAction'

const Compensation: React.FC = () => {
    const equityTerms = [
        {
            title: '10 years to exercise your options',
            subtitle: '(if you leave)',
            description: 'Most companies give you 90 days.',
        },
        {
            title: 'Double-trigger acceleration',
            description: "You receive all your options in the event you're let go due to the company being acquired.",
        },
        {
            title: 'Employee secondaries',
            subtitle: '(when offered)',
            description:
                'In 2024, we held our first secondary for early employees to sell some of their shares. We executed our first tender offer in 2025, and plan to do more.',
        },
    ]

    return (
        <section id="compensation" className="not-prose @container">
            <h2 className="text-3xl font-bold mb-2">Compensation &amp; equity</h2>
            <p className="mb-4">
                We hire the best talent and pay accordingly. We want everyone to feel invested in the company's success,
                so we offer equity with very employee-friendly terms.
            </p>

            <div data-scheme="secondary" className="grid md:grid-cols-2 gap-6 md:gap-8">
                <div className="bg-primary p-4 md:p-6 rounded">
                    <h3 className="text-xl mb-1">Transparent pay</h3>
                    <p>
                        Use our <Link href="/handbook/people/compensation">full salary calculator</Link> to see what
                        you'll make here. You’ll know your approximate starting salary before you even apply.
                    </p>
                    <CompensationCalculator initialJob="Product Engineer" hideFormula />
                </div>
                <div className="bg-primary p-4 md:p-6 rounded">
                    <h3 className="text-xl mb-4">(Really) employee-friendly equity terms</h3>

                    <ul className="list-none p-0 pb-4 grid gap-3">
                        {equityTerms.map((term, index) => (
                            <li key={index} className="relative pl-7 leading-snug">
                                <IconChevronDown className="w-6 h-6 inline-block -rotate-90 absolute top-0 left-0 opacity-50" />
                                <strong>{term.title}</strong>{' '}
                                {term.subtitle && <span className="opacity-60">{term.subtitle}</span>}
                                <br />
                                <span className="opacity-60 text-[15px]">{term.description}</span>
                            </li>
                        ))}
                    </ul>

                    <CallToAction
                        to="/handbook/people/share-options"
                        type="secondary"
                        size="sm"
                        state={{ newWindow: true }}
                    >
                        Learn more about share options
                    </CallToAction>
                </div>
            </div>
        </section>
    )
}

export default Compensation
