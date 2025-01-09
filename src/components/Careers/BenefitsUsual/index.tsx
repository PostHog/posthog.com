import React from 'react'

export const benefits = [
    {
        title: 'Unlimited paid time off (25 days minimum!)',
        details:
            "You're required to take at least 25 days off per year. (If you don't, you will be locked out of Slack. Just kidding.) This doesn't come out of your sick leave or generous parental leave.",
        icon: 'https://res.cloudinary.com/dmukukwp6/image/upload/pto_f32814b5f6.svg',
    },
    {
        title: 'Training budget',
        details:
            'Pick up new skills on the job with an annual training budget, plus free books and an Audible subscription.',
        icon: 'https://res.cloudinary.com/dmukukwp6/image/upload/training_budget_8204ae2beb.svg',
    },
    {
        title: '401k matching or pension plan',
        details: `Up to 4% matching for U.S. employees`,
        icon: 'https://res.cloudinary.com/dmukukwp6/image/upload/retirement_b889169869.svg',
    },
    {
        title: 'Carbon offsetting',
        details: 'We contribute to Project Wren when we travel for work.',
        icon: 'https://res.cloudinary.com/dmukukwp6/image/upload/carbon_offsetting_9c9443e012.svg',
    },
    {
        title: 'Home office',
        details: 'Get whatever you need to have an ergonomic setup at home so you can do the best work of your life.',
        icon: 'https://res.cloudinary.com/dmukukwp6/image/upload/home_office_24afbd2c6a.svg',
    },
    {
        title: 'Private health, dental, and vision insurance',
        details: 'US, Canada, & UK only',
        icon: 'https://res.cloudinary.com/dmukukwp6/image/upload/insurance_bf6481e929.svg',
    },
]

const Icon: React.FC<{ src: string; className?: string }> = ({ src, className }) => {
    return <img src={src} className={className} />
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
                <Icon src={icon} className="size-8 fill-current" />
            </div>
            <div className="flex-1 flex-grow">
                <h4 className="mb-0 text-lg leading-tight">{title}</h4>
                <p className="mt-1">{details}</p>
            </div>
        </div>
    )
}

const BenefitsUsual: React.FC = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-2 lg:gap-8">
            <div className="">
                <h2 className="text-4xl font-bold mb-2">
                    The <em>boring</em> benefits
                </h2>
                <p>
                    Everybody offers healthcare, paid time off, and a laptop, so we organized our benefits by
                    awesomeness. (Would we even be a tech startup without these?)
                </p>

                <p className="mb-0">
                    The one exception is equity (which you get), but is so unique that it deserves its own section
                    below.
                </p>
            </div>
            <div className="pt-12">
                <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-2 md:gap-6 lg:gap-2">
                    {benefits.map((benefit) => (
                        <Benefit key={benefit.title} {...benefit} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default BenefitsUsual
