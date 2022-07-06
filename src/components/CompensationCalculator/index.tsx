import React, { useState, useEffect } from 'react'
import { locationFactor } from './compensation_data/location_factor'
import { sfBenchmark } from './compensation_data/sf_benchmark'
import { Listbox, RadioGroup, Transition } from '@headlessui/react'
import { levelModifier } from './compensation_data/level_modifier'
import { stepModifier } from './compensation_data/step_modifier'
import { currencyData } from './compensation_data/currency'
import { SelectorIcon } from '@heroicons/react/outline'

import './style.scss'

const formatCur = (val: number, currency?: string) => {
    if (!currency) {
        return
    }

    currency = currencyData[currency] ? currency : 'USD'
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
    })

    return formatter.format(Math.round(val * (currencyData[currency] || 1))).replace('.00', '')
}

function classNames(...classes: (string | null | undefined)[]) {
    return classes.filter(Boolean).join(' ')
}

type SelectProps = {
    label: string
    options: any[]
    value: any
    onChange: (option: any) => void
    display?: (option: any) => React.ReactNode
}

const Select = (props: SelectProps) => {
    return (
        <Listbox as="div" className="relative" value={props.value} onChange={props.onChange}>
            {({ open }) => (
                <>
                    <Listbox.Label className="text-sm">{props.label}</Listbox.Label>
                    <Listbox.Button className="relative block w-full max-w-md text-left bg-white px-2.5 py-1.5 rounded border border-gray-accent-light text-xs select-none mt-1.5 focus:ring-1 focus:ring-orange focus:border-orange">
                        {props.display ? props.display(props.value) : props.value}

                        <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <SelectorIcon className="h-4 w-4 text-gray-accent-light" aria-hidden="true" />
                        </span>
                    </Listbox.Button>

                    <Transition
                        show={open}
                        as={React.Fragment}
                        leave="transition ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute top-full mt-1 w-full bg-white rounded z-50 p-0 text-xs max-h-[12rem] overflow-y-scroll py-1 focus:outline-none space-y-1">
                            {props.options.map((option) => (
                                <Listbox.Option
                                    value={option}
                                    key={option}
                                    className={({ active }) => `
                                        list-none px-2.5 cursor-pointer focus:outline-none text-xs py-1
                                        ${active ? 'bg-orange text-white' : ''}
                                    `}
                                >
                                    {({ selected }) => (
                                        <>
                                            <div className="flex items-center">
                                                <span
                                                    className={classNames(
                                                        selected ? 'font-semibold' : 'font-normal',
                                                        'ml-3 block truncate text-xs'
                                                    )}
                                                >
                                                    {props.display ? props.display(option) : option}
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </>
            )}
        </Listbox>
    )
}

const Factor: React.FC = (props) => {
    return (
        <div className="px-1.5 bg-white rounded border border-gray-accent-light text-gray-accent-dark whitespace-nowrap text-2xs">
            {props.children}
        </div>
    )
}

export const CompensationCalculator = () => {
    const [job, setJob] = useState('Full Stack Engineer')
    const [country, setCountry] = useState('United States')
    const [region, setRegion] = useState('San Francisco, California')
    const [level, setLevel] = useState('Senior')
    const [step, setStep] = useState('Thriving')

    useEffect(() => {
        if (window) {
            if (localStorage.getItem('job') && sfBenchmark[localStorage.getItem('job')])
                setJob(localStorage.getItem('job'))
            if (localStorage.getItem('country')) setCountry(localStorage.getItem('country') || 'United States')
            if (localStorage.getItem('region')) setRegion(localStorage.getItem('region') || 'San Francisco, California')
            if (localStorage.getItem('level') && levelModifier[localStorage.getItem('level')])
                setLevel(localStorage.getItem('level') || 'Senior')
            if (localStorage.getItem('step') && stepModifier[localStorage.getItem('step')])
                setStep(localStorage.getItem('step') || 'Thriving')
        }
    }, [])

    const unique = (arr: string[]) => Array.from(new Set(arr))

    const setItem = (type: string) => {
        return (value: any) => {
            if (type === 'job') setJob(value)
            if (type === 'country') {
                setCountry(value)
                setItem('region')(false)
            }
            if (type === 'region') setRegion(value)
            if (type === 'level') {
                setLevel(value)
            }
            if (type === 'step') setStep(value)
            localStorage.setItem(type, String(value))
        }
    }

    const findLocation = (country: string, region: string) => {
        return region === 'false'
            ? undefined
            : locationFactor.find((location) => location.country === country && location.area === region)
    }

    const calculatedLocationFactor = findLocation(country, region)?.locationFactor

    const countries = unique(locationFactor.map((l) => l.country))

    return (
        <div className="compensation-calculator ph-no-capture space-y-4 py-8">
            <Select label="Select a role" value={job} onChange={setItem('job')} options={Object.keys(sfBenchmark)} />

            <Select label="Country" value={country} onChange={setItem('country')} options={countries} />

            <Select
                label="Region"
                value={region === 'false' ? '' : region}
                onChange={setItem('region')}
                options={locationFactor
                    .filter((location) => location.country === country)
                    .map((location) => location.area)}
                display={(area) => (area ? `${area} ${findLocation(country, area)?.locationFactor}` : '--')}
            />

            <RadioGroup as="div" className="block" value={level} onChange={setItem('level')}>
                <RadioGroup.Label className="block text-sm">Level</RadioGroup.Label>
                <div className="inline-flex items-center bg-white rounded divide-x divide-gray-accent-light overflow-hidden border border-gray-accent-light text-xs">
                    {Object.entries(levelModifier).map(([level, modifier]) => (
                        <RadioGroup.Option
                            as="button"
                            key={level}
                            value={level}
                            className={({ checked, active }) => `
                                px-4 py-1.5
                              ${checked ? 'bg-orange text-white' : 'hover:bg-gray-accent-light'}
                              ${active ? '' : ''}
                            `}
                        >
                            {level} <span>{modifier}</span>
                        </RadioGroup.Option>
                    ))}
                </div>
            </RadioGroup>

            <Select
                label="Step"
                value={step}
                onChange={setItem('step')}
                options={Object.keys(stepModifier)}
                display={(step) => `${step} ${stepModifier[step][0]} - ${stepModifier[step][1]}`}
            />

            <div>
                <label className="text-sm" htmlFor="compensation">
                    Base salary
                </label>
                <div className="text-xl mt-1" id="compensation">
                    {job &&
                    country &&
                    region &&
                    findLocation(country, region) &&
                    typeof calculatedLocationFactor === 'number'
                        ? formatCur(
                              sfBenchmark[job] *
                                  calculatedLocationFactor *
                                  levelModifier[level] *
                                  stepModifier[step][0],
                              findLocation(country, region)?.currency
                          ) +
                          ' - ' +
                          formatCur(
                              sfBenchmark[job] *
                                  calculatedLocationFactor *
                                  levelModifier[level] *
                                  stepModifier[step][1],
                              findLocation(country, region)?.currency
                          ) +
                          ' + equity'
                        : '--'}
                </div>
                {job && country && region && (
                    <div className="flex items-center flex-wrap space-x-2 text-gray mt-1">
                        <Factor>SF Benchmark: {formatCur(sfBenchmark[job])}</Factor>
                        <span>&times;</span>
                        <Factor>Location factor: {calculatedLocationFactor}</Factor>
                        <span>&times;</span>
                        <Factor>Level modifier: {levelModifier[level]}</Factor>
                        <span>&times;</span>
                        <Factor>
                            Step modifier: {stepModifier[step][0]} - {stepModifier[step][1]}
                        </Factor>
                    </div>
                )}
            </div>
        </div>
    )
}
