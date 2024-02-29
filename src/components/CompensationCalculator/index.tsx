import React from 'react'
import { RadioGroup } from '@headlessui/react'
import Combobox from './Combobox'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import { locationFactor } from './compensation_data/location_factor'
import { sfBenchmark } from './compensation_data/sf_benchmark'
import { levelModifier } from './compensation_data/level_modifier'
import { stepModifier } from './compensation_data/step_modifier'
import { currencyData } from './compensation_data/currency'
import { IconMultiply } from '@posthog/icons'

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
    description,
    children,
}: {
    title: string
    description?: string
    children: React.ReactNode
}) => {
    return (
        <div>
            <h3 className="text-lg m-0 mt-5">{title}</h3>
            {description && <p className="text-sm mb-2 text-black/70 dark:text-white/70">{description}</p>}
            {children}
        </div>
    )
}

const Factor: React.FC = (props) => {
    return (
        <li className="list-none px-1 py-1 flex !text-[15px] justify-between border-t border-light dark:border-dark first:border-none">
            {props.children}
        </li>
    )
}

export const CompensationCalculator = ({
    hideFormula = false,
    hideRole = false,
    initialJob,
    descriptions = { role: null, location: null, level: null, step: null },
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
    const [job, setJob] = React.useState<string | null>(initialJob || 'Full Stack Engineer')
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
        <div className="ph-no-capture space-y-4 mb-8">
            {!hideRole && (
                <Section title="Role" description={descriptions['role'] && descriptions['role']}>
                    <Combobox value={job} onChange={setItem('job')} options={Object.keys(sfBenchmark)} />
                </Section>
            )}
            <Section
                title={'Location (based on market rates)'}
                description={descriptions['location'] && descriptions['location']}
            >
                <div className="grid grid-cols-2 gap-x-4">
                    <Combobox label="Country" value={country} onChange={setItem('country')} options={countries} />
                    <Combobox
                        label="Region"
                        value={region}
                        onChange={setItem('region')}
                        options={locationFactor
                            .filter((location) => location.country === country)
                            .map((location) => location.area)}
                        display={(area) => (area ? `${area} ${findLocation(country, area)?.locationFactor}` : '')}
                    />
                </div>
            </Section>
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
                        display={(level) => `${level} ${levelModifier[level]}`}
                    />
                )}
            </Section>
            <Section title="Step" description={descriptions['step'] && descriptions['step']}>
                <Combobox
                    value={step}
                    onChange={setItem('step')}
                    options={Object.keys(stepModifier)}
                    display={(step: string) => `${step} ${stepModifier[step]?.[0]} - ${stepModifier[step]?.[1]}`}
                />
            </Section>

            <Section title="Salary calculator">
                <div className="px-4 py-2 my-2 max-w-lg border border-light dark:border-dark rounded">
                    {!hideFormula && job && country && currentLocation && level && step && (
                        <ol className="ml-0 !mb-2 p-0 border-b-2 border-light dark:border-dark">
                            <Factor>
                                <span>Benchmark ({currentLocation.country} - {currentLocation.area})</span>{' '}
                                <span>{formatCur(sfBenchmark[job]*(currentLocation.locationFactor || 1), currentLocation?.currency)}</span>
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
                    <div className="rounded flex justify-between" id="compensation">
                        <span className="font-bold">Base salary</span>
                        <span className="flex justify-end flex-col text-right">
                            <span className="font-bold">
                                {job && country && region && currentLocation && level && step
                                    ? formatCur(
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
                                      )
                                    : '--'}
                            </span>
                            <span className="text-sm">
                                {job && country && region && currentLocation && level && step ? 'plus equity' : ''}
                            </span>
                        </span>
                    </div>
                </div>
            </Section>
        </div>
    )
}
