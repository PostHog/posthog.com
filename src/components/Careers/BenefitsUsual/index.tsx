import React from 'react'
import Pto from './images/pto.svg'
import TrainingBudget from './images/training-budget.svg'
import Retirement from './images/retirement.svg'
import CarbonOffsetting from './images/carbon-offsetting.svg'
import HomeOffice from './images/home-office.svg'
import Insurance from './images/insurance.svg'

export const benefits = [
  {
    title: 'Unlimited paid time off (25 days minimum!)',
    details:
      "You're required to take at least 25 days off per year. This doesn't come out of your sick leave or generous parental leave.",
    icon: Pto
  },
  {
    title: 'Training budget',
    details: 'Pick up new skills on the job with an annual training budget, plus free books and an Audible subscription.',
    icon: TrainingBudget
  },
  {
    title: '401k matching or pension plan',
    details: `Up to 4% matching for U.S. employees`,
    icon: Retirement
  },
  {
    title: 'Carbon offsetting',
    details: 'We contribute to Project Wren when we travel for work.',
    icon: CarbonOffsetting
  },
  {
    title: 'Home office',
    details: 'Get whatever you need to have an ergonomic setup at home so you can do the best work of your life.',
    icon: HomeOffice
  },
  {
    title: 'Private health, dental, and vision insurance',
    details: 'US, Canada, & UK only',
    icon: Insurance
  },
]

const Icon: React.FC<{ src: string; className?: string }> = ({ src, className }) => {
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{
        __html: atob(src.split(',')[1])
      }}
    />
  )
}

interface BenefitProps {
  icon: string
  title: string
  details: string
  className?: string
}

const Benefit = ({ icon, title, details, className = '' }: BenefitProps) => {
  return (
    <div className={`flex${className}`}>
      <div className="w-12">
        <Icon src={icon} className="size-8 fill-current opacity-40" />
      </div>
      <div className="flex-1 flex-grow">
        <h4 className="mb-0 text-lg leading-tight">{title}</h4>
        <p className="mt-2">{details}</p>
      </div>
    </div>
  )
}

const BenefitsUsual: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-2 lg:gap-8">
      <div className="">
        <h2 className="text-3xl xl:text-4xl font-bold mb-2">The usual benefits</h2>
        <p>Everybody offers healthcare, paid time off, and a laptop, so we organized our benefits by awesomeness (and put the typical benefits near the bottom.</p>

        <p>The one exception is equity (which you get), but is so unique that it deserves its own section below.</p>
      </div>
      <div>
        <div className="grid gap-2">
          {benefits.map((benefit) => (
            <Benefit key={benefit.title} {...benefit} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default BenefitsUsual
