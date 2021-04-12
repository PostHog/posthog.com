import React from 'react'

import { Structure } from '../../Structure'
import { mergeClassList } from '../../../lib/utils'
import compensationImg from './images/compensation.svg'
import equityImg from './images/equity.svg'
import ptoImg from './images/pto.svg'
import unlimitedTimeOffImg from './images/unlimited-time-off.svg'
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
    const classList = mergeClassList('w-full md:w-1/2 lg:w-1/4 p-2 md:p-4 mb-8 md:mb-0', className)

    return (
        <div className={classList}>
            <div className="mx-auto flex justify-center items-center w-24 h-24 p-2 bg-gray-100 bg-opacity-10 rounded border-3 border-white border-opacity-30 border-solid">
                <img src={image} alt={title} className="max-w-full block mb-0" />
            </div>
            <div className="flex-grow mt-4">
                <h4 className="mb-0 font-sans font-normal text-base leading-tight">{title}</h4>

                <div className="text-opacity-80 text-gray-100 mt-2">{details}</div>
            </div>
        </div>
    )
}

export const Benefits = () => {
    return (
        <div className="careers-benefits pt-24 text-white text-center" id="benefits">
            <Structure.Section>
                <Structure.SectionHeader
                    title="Benefits"
                    titleTag="h2"
                    leadText="We’re always looking to expand our benefits to offer meaningful value to our team who make all of this possible."
                    leadTextClassName="opacity-80"
                />

                <div className="flex flex-col md:flex-row md:flex-wrap">
                    <Benefit
                        image={compensationImg}
                        title="Generous, transparent compensation"
                        details="We hire the best talent and pay accordingly"
                    />
                    <Benefit
                        image={equityImg}
                        title="Equity"
                        details="It’s important to us that all PostHog employees can feel invested in the company’s success, so all employees receive equity in PostHog (with very employee-friendly terms)!"
                    />
                    <Benefit
                        image={ptoImg}
                        title="Paid time off"
                        details="Time away from work is important, so we’ve got unlimited time off (25 days per year minimum required!), sick leave and generous parental leave."
                    />
                    <Benefit
                        image={unlimitedTimeOffImg}
                        title="Unlimited time off"
                        details="25 days per year minimum required!"
                    />

                    <Benefit
                        image={insuranceImg}
                        title="Medical, Dental and Vision Insurance"
                        details="US & UK only."
                    />
                    <Benefit image={trainingBudgetImg} title="Training budget" details="and free books" />
                    <Benefit
                        image={coworkingCreditImg}
                        title="Coworking Credit"
                        details="$200/month budget towards co-working or café working"
                    />
                    <Benefit
                        image={homeOfficeImg}
                        title="Home office"
                        details="We provide all equipment needed have an ergonomic setup at home to be as productive as possible"
                    />

                    <Benefit
                        image={carbonOffsettingImg}
                        title="Carbon offsetting"
                        details="for work travel with Project Wren"
                    />
                    <Benefit
                        image={retirementImg}
                        title="401k/pension contributions"
                        details="We care about you, so investing in your future is important to us. "
                    />
                    <Benefit
                        image={spillMentalHealthImg}
                        title="Spill mental health chat"
                        details="Sometimes it’s good to chat to someone if you aren’t feeling yourself. "
                    />
                    <Benefit
                        image={companyOffsitesImg}
                        title="Company offsites"
                        details="Each year we organise fully paid company offsites- last year we went to a villa in Italy! Sometimes it’s good to speak face to face."
                    />
                </div>
            </Structure.Section>
        </div>
    )
}
