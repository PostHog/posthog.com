import { TabPane } from 'components/Tabs'
import React, { useEffect, useState } from 'react'
import { currencyData } from './compensation_data/currency'
import { levelModifier } from './compensation_data/level_modifier'
import { locationFactor } from './compensation_data/location_factor'
import { sfBenchmark } from './compensation_data/sf_benchmark'
import { stepModifier } from './compensation_data/step_modifier'
import './style.scss'

const formatCur = (val: number, currency: string) => {
    currency = currencyData[currency] ? currency : 'USD'
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
    })
    return formatter.format(Math.round(val * (currencyData[currency] || 1))).replace('.00', '')
}

const Select = ({ children, onChange, ...other }) => {
    const handleChange = (e) => onChange(e.target.value)

    return (
        <select
            className="mt-1 block w-auto box-border pl-3 pr-10 py-2 text-base border-gray-accent-light focus:outline-none focus:ring-blue focus:border-blue sm:text-sm rounded-md"
            onChange={handleChange}
            {...other}
        >
            {children}
        </select>
    )
}

const Tag = ({ children }) => {
    return (
        <span
            className={`text-[11px] py-1 px-2 rounded-sm border border-opacity-50 font-normal leading-none mr-2 dark:!text-white`}
        >
            {children}
        </span>
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
        return (value: string | boolean) => {
            if (type === 'job' && typeof value === 'string') setJob(value)
            if (type === 'country' && typeof value === 'string') {
                setCountry(value)
                setItem('region')(false)
            }
            if (type === 'region') setRegion(String(value))
            if (type === 'level' && typeof value === 'string') {
                setLevel(value)
            }
            if (type === 'step' && typeof value === 'string') setStep(value)
            localStorage.setItem(type, String(value))
        }
    }

    const location =
        country &&
        region &&
        region !== 'false' &&
        locationFactor.filter((location) => location.country === country && location.area === region)[0]
    const calculatedLocationFactor = location.locationFactor

    const countries = unique(locationFactor.map((l) => l.country))

    return (
        <div style={{ fontSize: '0.85rem' }} className="compensation-calculator ph-no-capture">
            <p>Select a role</p>
            <Select style={{ width: '100%', marginBottom: '0.75rem' }} value={job} onChange={setItem('job')}>
                {Object.keys(sfBenchmark).map((job) => (
                    <option value={job} key={job}>
                        {job}
                    </option>
                ))}
            </Select>
            <p>Country</p>
            <Select
                showSearch
                style={{ width: '100%', marginBottom: '0.75rem' }}
                value={country}
                onChange={setItem('country')}
            >
                {countries.map((country) => (
                    <option value={country} key={country}>
                        {country}
                    </option>
                ))}
            </Select>
            <p>Region</p>
            <Select
                showSearch
                style={{ width: '100%', marginBottom: '0.75rem' }}
                value={region === 'false' ? '' : region}
                onChange={setItem('region')}
            >
                {locationFactor
                    .filter((location) => location.country === country)
                    .map((countryRegion) => {
                        console.log(countryRegion)
                        return (
                            <option value={countryRegion.area} key={countryRegion.area}>
                                {countryRegion.area} - {countryRegion.locationFactor}
                            </option>
                        )
                    })}
            </Select>
            <p>Level</p>
            <div
                style={{ marginBottom: '0.75rem' }}
                className="bg-gray-accent-light dark:bg-gray-accent-dark dark:bg-opacity-50 flex flex-col md:inline-block rounded-sm"
            >
                {Object.entries(levelModifier).map(([tabLevel, modifier]) => (
                    <TabPane
                        key={tabLevel}
                        active={level === tabLevel}
                        tab={`${tabLevel} ${modifier}`}
                        onClick={() => setItem('level')(tabLevel)}
                    />
                ))}
            </div>

            <p>Step</p>
            <Select style={{ width: '100%', marginBottom: '0.75rem' }} value={step} onChange={setItem('step')}>
                {Object.entries(stepModifier).map(([step, modifier]) => (
                    <option value={step} key={step}>
                        {step} {modifier[0]} - {modifier[1]}
                    </option>
                ))}
            </Select>
            <p>Base salary</p>
            <h3 className="!m-0 font-semibold">
                {job && country && region && location && typeof calculatedLocationFactor === 'number'
                    ? formatCur(
                          sfBenchmark[job] * calculatedLocationFactor * levelModifier[level] * stepModifier[step][0],
                          location?.currency
                      ) +
                      ' - ' +
                      formatCur(
                          sfBenchmark[job] * calculatedLocationFactor * levelModifier[level] * stepModifier[step][1],
                          location?.currency
                      )
                    : '--'}
            </h3>
            {job && country && region && (
                <div className="mt-2">
                    <Tag>SF Benchmark: {formatCur(sfBenchmark[job])}</Tag> x{' '}
                    <Tag>Location factor: {calculatedLocationFactor}</Tag> x{' '}
                    <Tag>Level modifier: {levelModifier[level]}</Tag>x{' '}
                    <Tag>
                        Step modifier: {stepModifier[step][0]} - {stepModifier[step][1]}
                    </Tag>
                </div>
            )}
            <br />
        </div>
    )
}
