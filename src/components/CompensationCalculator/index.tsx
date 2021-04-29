import React, { useState, useEffect } from 'react'
import { locationFactor } from './compensation_data/location_factor'
import { sfBenchmark } from './compensation_data/sf_benchmark'
import { Select, Statistic, Tag, Radio } from 'antd'
import { levelModifier } from './compensation_data/level_modifier'
import { stepModifier } from './compensation_data/step_modifier'
import { currencyData } from './compensation_data/currency'

import 'antd/lib/statistic/style/css'
import 'antd/lib/tag/style/css'
import 'antd/lib/radio/style/css'
import './style.scss'

const formatCur = (val: number, currency: string) => {
    currency = currencyData[currency] ? currency : 'USD'
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
    })
    return formatter.format(Math.round(val * (currencyData[currency] || 1))).replace('.00', '')
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
                    <Select.Option value={job} key={job}>
                        {job}
                    </Select.Option>
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
                    <Select.Option value={country} key={country}>
                        {country}
                    </Select.Option>
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
                    .map((countryRegion) => (
                        <Select.Option value={countryRegion.area} key={countryRegion.area}>
                            {countryRegion.area} <span>{countryRegion.locationFactor}</span>
                        </Select.Option>
                    ))}
            </Select>
            <p>Level</p>
            <Radio.Group
                style={{ width: '100%', marginBottom: '0.75rem' }}
                value={level}
                buttonStyle="solid"
                onChange={(e) => setItem('level')(e.target.value)}
            >
                {Object.entries(levelModifier).map(([level, modifier]) => (
                    <Radio.Button value={level} key={level}>
                        {level} <span>{modifier}</span>
                    </Radio.Button>
                ))}
            </Radio.Group>
            <p>Step</p>
            <Select style={{ width: '100%', marginBottom: '0.75rem' }} value={step} onChange={setItem('step')}>
                {Object.entries(stepModifier).map(([step, modifier]) => (
                    <Select.Option value={step} key={step}>
                        {step} {modifier[0]} - {modifier[1]}
                    </Select.Option>
                ))}
            </Select>
            <Statistic
                title={<p>Base salary</p>}
                value={
                    job && country && region && location && typeof calculatedLocationFactor === 'number'
                        ? formatCur(
                              sfBenchmark[job] *
                                  calculatedLocationFactor *
                                  levelModifier[level] *
                                  stepModifier[step][0],
                              location?.currency
                          ) +
                          ' - ' +
                          formatCur(
                              sfBenchmark[job] *
                                  calculatedLocationFactor *
                                  levelModifier[level] *
                                  stepModifier[step][1],
                              location?.currency
                          )
                        : '--'
                }
            />
            {job && country && region && (
                <div>
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
