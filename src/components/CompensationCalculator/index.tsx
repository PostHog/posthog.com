import React from 'react'
import { RadioGroup } from '@headlessui/react'
import Combobox from './Combobox'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import { locationFactor } from './compensation_data/location_factor'
import { sfBenchmark } from './compensation_data/sf_benchmark'
import { levelModifier } from './compensation_data/level_modifier'
import { stepModifier } from './compensation_data/step_modifier'
import { currencyData } from './compensation_data/currency'
import { IconInfo, IconMultiply } from '@posthog/icons'
import Tooltip from 'components/Tooltip'

const formatCur = (val: number, currency = 'USD') => {
    currency = currencyData[currency] ? currency : 'USD'
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
    })

    return formatter.format(Math.round(val * (currencyData[currency] || 1))).replace('.00', '')
}

const Section = ({
    title,
    subtitle,
    description,
    children,
    hideTitle = false,
}: {
    title: string
    subtitle?: string
    description?: string
    children: React.ReactNode
    hideTitle?: boolean
}) => {
    return (
        <div>
            <div className="flex items-baseline gap-1">
                {!hideTitle && <h3 className="!text-[15px] !m-0">{title}</h3>}
                {subtitle && <span className="text-sm text-black/70 dark:text-white/70">{subtitle}</span>}
                {description && <Tooltip placement="top" content={() => <div className="max-w-xs">{description}</div>}>
                    <span className="inline-block p-0.5 opacity-60 hover:opacity-100 cursor-help relative -top-px -left-0.5">
                        <IconInfo className="size-4 inline-block" />
                    </span>
                </Tooltip>
                }
            </div>
            {children}
        </div>
    )
}

const Factor: React.FC = (props) => {
    return (
        <li className="flex-col @sm:flex-row list-none px-1 py-1 flex !text-[15px] justify-between border-t border-light dark:border-dark first:border-none !leading-snug">
            {props.children}
        </li>
    )
}

export const CompensationCalculator = ({
    hideFormula = false,
    hideRole = false,
    initialJob,
    descriptions = {
        role: null,
        location: 'The benchmark for each role we are hiring for is based on the market rate in San Francisco.',
        level: 'We pay more experienced team members a greater amount since it is reasonable to expect this correlates with an increase in skill',
        step: "We hire into the Established step by default and believe there's a place to have incremental steps to allow for more flexibility.",
    },
}: {
    hideFormula?: boolean
    hideRole?: boolean
    initialJob?: undefined | null | string
    descriptions?: {
        role?: string | null
        location?: string | null
        level?: string | null
        step?: string | null
    }
}) => {
    const breakpoints = useBreakpoint()
    const [job, setJob] = React.useState<string | null>(initialJob || 'Product Engineer')
    const [country, setCountry] = React.useState<string | null>('United States')
    const [region, setRegion] = React.useState<string | null>('San Francisco, California')
    const [level, setLevel] = React.useState<string | null>('Senior')
    const [step, setStep] = React.useState<string | null>('Established')

    React.useEffect(() => {
        if (typeof window !== undefined) {
            const savedState: {
                job?: string | null
                country?: string | null
                region?: string | null
                level?: string | null
                step?: string | null
            } = JSON.parse(localStorage.getItem('posthog-saved-compensation') || '{}')

            if (!initialJob && savedState?.job && sfBenchmark[savedState.job]) {
                setJob(savedState?.job || null)
            }

            if (savedState?.country) {
                setCountry(savedState?.country || null)

                if (savedState?.region) {
                    setRegion(savedState?.region || null)
                }
            }

            if (savedState?.level && levelModifier[savedState.level]) {
                setLevel(savedState?.level || null)
            }

            if (savedState?.step && stepModifier[savedState.step]) {
                setRegion(savedState?.region || null)
            }
        }
    }, [])

    React.useEffect(() => {
        setJob(initialJob)
    }, [initialJob])

    const setItem = (type: string) => {
        return (value: any) => {
            if (type === 'job') setJob(value)
            if (type === 'country') {
                setCountry(value)
                setRegion(null)
            }
            if (type === 'region') setRegion(value)
            if (type === 'level') setLevel(value)
            if (type === 'step') setStep(value)

            const state = {
                job,
                country,
                region,
                level,
                step,
                [type]: value,
            }

            if (type === 'country') {
                state.region = null
            }

            localStorage.setItem('posthog-saved-compensation', JSON.stringify(state))
        }
    }

    const findLocation = (country: string | null, region: string | null) => {
        return region && country
            ? locationFactor.find((location) => location.country === country && location.area === region)
            : null
    }

    const currentLocation = findLocation(country, region)

    const countries = Array.from(new Set(locationFactor.map((l) => l.country)))
    return (
        <div className="@container ph-no-capture space-y-3 mb-4">
            {!hideRole && (
                <Section title="Role" description={descriptions['role'] && descriptions['role']}>
                    <Combobox value={job} onChange={setItem('job')} options={Object.keys(sfBenchmark)} />
                </Section>
            )}
            <Section
                title={'Location'}
                subtitle={'(based on market rates)'}
                description={descriptions['location'] && descriptions['location']}
            >
                <div className="grid @sm:grid-cols-2 gap-x-4 @sm:gap-2 @md:gap-4 @lg:gap-6">
                    <Combobox
                        label="Country"
                        hideLabel
                        value={country}
                        onChange={setItem('country')}
                        options={countries.sort()}
                    />
                    <Combobox
                        label="Region"
                        hideLabel
                        value={region}
                        onChange={setItem('region')}
                        options={locationFactor
                            .filter((location) => location.country === country)
                            .map((location) => location.area)
                            .sort()}
                        display={(area) => (area ? area : '')}
                    />
                </div>
            </Section>
            <div className="grid @sm:grid-cols-2 gap-4 @sm:gap-2 @md:gap-4 @lg:gap-6 !pb-1">
                <div>
                    <Section title="Level" description={descriptions['level'] && descriptions['level']}>
                        {breakpoints.sm ? (
                            <RadioGroup as="div" className="block" value={level} onChange={setItem('level')}>
                                <div className="w-full inline-flex flex-col items-stretch md:flex-row md:items-center bg-white dark:bg-gray-accent-dark rounded divide-y md:divide-y-0 md:divide-x divide-black/10 overflow-hidden shadow-sm border border-black/10 text-sm mt-1.5">
                                    {Object.entries(levelModifier).map(([level, modifier]) => (
                                        <RadioGroup.Option
                                            as="button"
                                            key={level}
                                            value={level}
                                            className={({ checked }) => `
                                px-4 py-1.5 whitespace-nowrap text-left md:text-center
                              ${checked ? 'bg-orange text-white' : 'hover:bg-black/10'}
                            `}
                                        >
                                            {level} <span>{modifier}</span>
                                        </RadioGroup.Option>
                                    ))}
                                </div>
                            </RadioGroup>
                        ) : (
                            <Combobox
                                value={level}
                                onChange={setItem('level')}
                                options={Object.keys(levelModifier)}
                                display={(level) => `${level} (${levelModifier[level]})`}
                            />
                        )}
                    </Section>
                </div>
                <div>
                    <Section title="Step" description={descriptions['step'] && descriptions['step']}>
                        <Combobox
                            value={step}
                            onChange={setItem('step')}
                            options={Object.keys(stepModifier)}
                            display={(step: string) => `${step} (${stepModifier[step]?.[0]} - ${stepModifier[step]?.[1]})`}
                        />
                    </Section>
                </div>
            </div>
            {job && country && region && currentLocation && level && step ? (
                <Section title="Salary calculator" hideTitle={hideFormula}>
                    <div className={` ${hideFormula ? '' : 'px-4 py-2 my-2 max-w-lg border border-light dark:border-dark rounded'}`}>
                        {!hideFormula && job && country && currentLocation && level && step && (
                            <ol className="ml-0 !mb-2 p-0 border-b-2 border-light dark:border-dark">
                                <Factor>
                                    <span>
                                        Benchmark ({currentLocation.country} - {currentLocation.area})
                                    </span>{' '}
                                    <span>
                                        {formatCur(
                                            sfBenchmark[job] * (currentLocation.locationFactor || 1),
                                            currentLocation?.currency
                                        )}
                                    </span>
                                </Factor>
                                <Factor>
                                    <span>
                                        <IconMultiply className="w-6 h-6 inline-flex -ml-1" /> Level modifier
                                    </span>{' '}
                                    <span>{levelModifier[level]}</span>
                                </Factor>
                                <Factor>
                                    <span>
                                        <IconMultiply className="w-6 h-6 inline-flex -ml-1" /> Step modifier
                                    </span>{' '}
                                    <span>
                                        {stepModifier[step][0]} - {stepModifier[step][1]}
                                    </span>
                                </Factor>
                            </ol>
                        )}
                        <div className={`rounded flex ${hideFormula ? 'border-t-2 justify-between border-light dark:border-dark pt-2' : 'justify-between'}`} id="compensation">
                            <span className="font-bold">{hideFormula ? <span>Total</span> : 'Salary'}&nbsp;</span>
                            <span className={`flex ${hideFormula ? 'gap-1 items-baseline' : 'flex-col justify-end text-right'}`}>
                                <span className="font-bold">
                                    {formatCur(
                                        sfBenchmark[job] *
                                        currentLocation.locationFactor *
                                        levelModifier[level] *
                                        stepModifier[step][0],
                                        currentLocation.currency
                                    ) +
                                        ' - ' +
                                        formatCur(
                                            sfBenchmark[job] *
                                            currentLocation.locationFactor *
                                            levelModifier[level] *
                                            stepModifier[step][1],
                                            currentLocation.currency
                                        )}
                                </span>
                                <span className="text-sm opacity-60">plus equity</span>
                            </span>
                        </div>
                    </div>
                </Section>
            ) : null}
        </div >
    )
}
