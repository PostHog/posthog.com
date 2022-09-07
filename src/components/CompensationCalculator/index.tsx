import React from 'react'
import { RadioGroup } from '@headlessui/react'
import Combobox from './Combobox'

import { locationFactor } from './compensation_data/location_factor'
import { sfBenchmark } from './compensation_data/sf_benchmark'
import { levelModifier } from './compensation_data/level_modifier'
import { stepModifier } from './compensation_data/step_modifier'
import { currencyData } from './compensation_data/currency'

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
            {description && <p className="text-sm mb-2 text-black/70">{description}</p>}
            {children}
        </div>
    )
}

const Factor: React.FC = (props) => {
    return (
        <div className="px-1.5 bg-white dark:bg-gray-accent-dark rounded border border-black/10 text-gray-accent-dark dark:text-gray whitespace-nowrap text-2xs my-1">
            {props.children}
        </div>
    )
}

export const CompensationCalculator = ({
    hideFormula = false,
    hideJob = false,
    initialJob,
    descriptions = { role: null, location: null, level: null, step: null },
}: {
    hideFormula?: boolean
    initialJob?: undefined | null | string
    hideJob?: boolean
    descriptions?: {
        role?: string | null
        location?: string | null
        level?: string | null
        step?: string | null
    }
}) => {
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
        <div className="ph-no-capture space-y-4">
            {!hideJob && (
                <Section title="Role" description={descriptions['role'] && descriptions['role']}>
                    <Combobox value={job} onChange={setItem('job')} options={Object.keys(sfBenchmark)} />
                </Section>
            )}
            <Section title={'Location'} description={descriptions['location'] && descriptions['location']}>
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
                <RadioGroup as="div" className="block" value={level} onChange={setItem('level')}>
                    <div className="w-full max-w-xs md:max-w-full md:w-auto inline-flex flex-col items-stretch md:flex-row md:items-center bg-white dark:bg-gray-accent-dark rounded divide-y md:divide-y-0 md:divide-x divide-black/10 overflow-hidden shadow-sm border border-black/10 text-sm mt-1.5">
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
            </Section>
            <Section title="Step" description={descriptions['step'] && descriptions['step']}>
                <Combobox
                    value={step}
                    onChange={setItem('step')}
                    options={Object.keys(stepModifier)}
                    display={(step: string) => `${step} ${stepModifier[step]?.[0]} - ${stepModifier[step]?.[1]}`}
                />
            </Section>

            <Section title="Base salary">
                <div className="text-2xl mt-1" id="compensation">
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
                          ) +
                          ' + equity'
                        : '--'}
                </div>
                {!hideFormula && job && country && currentLocation && level && step && (
                    <div className="flex items-center flex-wrap space-x-2 text-gray">
                        <Factor>SF Benchmark: {formatCur(sfBenchmark[job], currentLocation?.currency)}</Factor>&nbsp;
                        <span>&times;</span>
                        <Factor>Location factor: {currentLocation?.locationFactor}</Factor>&nbsp;<span>&times;</span>
                        <Factor>Level modifier: {levelModifier[level]}</Factor>&nbsp;<span>&times;</span>
                        <Factor>
                            Step modifier: {stepModifier[step][0]} - {stepModifier[step][1]}
                        </Factor>
                    </div>
                )}
            </Section>
        </div>
    )
}
