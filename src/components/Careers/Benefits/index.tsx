import React from 'react'

import { Structure } from '../../Structure'
import { mergeClassList } from '../../../lib/utils'
import compensationImg from './images/compensation.svg'
import hackerHouseImg from './images/hacker-house.svg'
import ptoImg from './images/pto.svg'
import meetingFreeDaysImg from './images/meeting-free-days.svg'
import insuranceImg from './images/insurance.svg'
import trainingBudgetImg from './images/training-budget.svg'
import coworkingCreditImg from './images/coworking-credit.svg'
import homeOfficeImg from './images/home-office.svg'
import carbonOffsettingImg from './images/carbon-offsetting.svg'
import retirementImg from './images/retirement.svg'
import spillMentalHealthImg from './images/spill-mental-health.svg'
import companyOffsitesImg from './images/company-offsites.svg'

interface BenefitProps {
    image: string
    title: string
    details: string
    className?: string
}

const Benefit = ({ image, title, details, className = '' }: BenefitProps) => {
    const classList = mergeClassList('p-8', className)

    return (
        <div className={`bg-accent dark:bg-accent-dark rounded-lg ${classList}`}>
            <div className="flex w-16 h-16">
                <img src={image} alt={title} className="max-w-full block mb-0" />
            </div>
            <div className="flex-grow mt-4">
                <h4 className="mb-0 text-lg leading-tight">{title}</h4>

                <p className="mt-2">{details}</p>
            </div>
        </div>
    )
}

export const benefits = [
    {
        title: 'Generous, transparent compensation & equity',
        details:
            "We hire the best talent and pay accordingly. We want everyone to feel invested in the company's success, so we offer equity with very employee-friendly terms.",
        image: compensationImg,
    },
    {
        title: 'Unlimited vacation (with a minimum!)',
        details:
            'Time away from work is important, so we’ve got unlimited time off (25 days per year minimum required!), plus sick leave and generous parental leave.',
        image: ptoImg,
    },
    {
        title: 'Two meeting-free days per week',
        details: 'Distracted by a calendar full of meetings? Not anymore.',
        image: meetingFreeDaysImg,
    },
    {
        title: 'Home office',
        details: 'We provide all equipment needed have an ergonomic setup at home to be as productive as possible.',
        image: homeOfficeImg,
    },
    {
        title: 'Coworking credit',
        details: 'Generous budget towards co-working or café working.',
        image: coworkingCreditImg,
    },
    {
        title: 'Private health, dental, and vision insurance.',
        details: 'US, Canada, & UK only',
        image: insuranceImg,
    },
    {
        title: 'Training budget',
        details: 'Generous annual budget, plus free books and Audible subscription.',
        image: trainingBudgetImg,
    },
    {
        title: 'Access to our Hedge House',
        details: 'Work with co-workers (or by yourself) in Cambridge, UK and stay for free whenever you want.',
        image: hackerHouseImg,
    },
    {
        title: 'Carbon offsetting',
        details: 'We protect the environment when we travel for work with Project Wren.',
        image: carbonOffsettingImg,
    },
    {
        title: 'Pension & 401k contributions',
        details: `Because one day you'll need it.`,
        image: retirementImg,
    },
    {
        title: 'We hire and pay locally',
        details: 'Get hired through a local subsidiary in most countries via Deel EOR.',
        image: spillMentalHealthImg,
    },
    {
        title: 'Company offsites',
        details: `Each year we organize fully paid company offsites - this year it's Aruba! Sometimes it’s good to speak face to face.`,
        image: companyOffsitesImg,
    },
]

export const Benefits = () => {
    return (
        <div className="pt-24" id="benefits">
            <Structure.Section width="8xl">
                <div className="text-center">
                    <Structure.SectionHeader
                        title="Benefits"
                        titleTag="h2"
                        leadText="We're always looking to expand our benefits to offer meaningful value to our team who make all of this possible."
                        leadTextClassName="mb-8"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 grid-rows-auto gap-2">
                    {benefits.map((benefit) => (
                        <Benefit key={benefit.title} {...benefit} />
                    ))}
                </div>
            </Structure.Section>
        </div>
    )
}
