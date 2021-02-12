import React, { useState, useEffect } from 'react'
import { locationFactor } from './compensation_data/location_factor'
import { sfBenchmark } from './compensation_data/sf_benchmark'
import { Select, Statistic, Tag, Radio } from 'antd'
import { levelModifier } from './compensation_data/level_modifier'
import { stepModifier } from './compensation_data/step_modifier'
import 'antd/lib/statistic/style/css'
import 'antd/lib/tag/style/css'
import 'antd/lib/radio/style/css'
import './style.scss'

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
})

let formatCur = (val: number) => formatter.format(val).replace('.00', '')

export const CompensationCalculator = () => {
    useEffect(() => {
        if (window) {
            if (localStorage.getItem('job')) setJob(localStorage.getItem('job') || '')
            if (localStorage.getItem('country')) setCountry(localStorage.getItem('country') || '')
            if (localStorage.getItem('region')) setRegion(localStorage.getItem('region') || '')
            if (localStorage.getItem('level')) setLevel(localStorage.getItem('level') || '')
            if (localStorage.getItem('step')) setStep(localStorage.getItem('step') || '')
        }
    }, [])

    const [job, setJob] = useState('Engineer')
    const [country, setCountry] = useState('United States')
    const [region, setRegion] = useState('San Francisco, California')
    const [level, setLevel] = useState('Senior')
    const [step, setStep] = useState('Thriving')

    const unique = (arr: string[]) => Array.from(new Set(arr))

    const setItem = (type: string) => {
        return (value: string) => {
            if (type === 'job') setJob(value)
            if (type === 'country') {
                setCountry(value)
                setItem('region')('')
            }
            if (type === 'region') setRegion(value)
            if (type === 'level') {
                setLevel(value)
            }
            if (type === 'step') setStep(value)
            localStorage.setItem(type, value)
        }
    }

    const calculatedLocationFactor =
        country &&
        region &&
        locationFactor.filter((location) => location.country === country && location.area === region)[0].locationFactor

    let countries = unique(locationFactor.map((l) => l.country))
    return (
        <div style={{ fontSize: '0.85rem' }} className="compensation-calculator ph-no-capture">
            <p>Select a role</p>
            <Radio.Group
                style={{ width: '100%', marginBottom: '0.75rem' }}
                value={job}
                buttonStyle="solid"
                onChange={(e) => setItem('job')(e.target.value)}
            >
                {Object.keys(sfBenchmark).map((job) => (
                    <Radio.Button value={job} key={job}>
                        {job}
                    </Radio.Button>
                ))}
            </Radio.Group>
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
                value={region}
                onChange={setItem('region')}
            >
                {locationFactor
                    .filter((location) => location.country === country)
                    .map((region) => (
                        <Select.Option value={region.area} key={region.area}>
                            {region.area} <span>{region.locationFactor}</span>
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
            <Radio.Group
                style={{ width: '100%', marginBottom: '0.75rem' }}
                value={step}
                buttonStyle="solid"
                onChange={(e) => setItem('step')(e.target.value)}
            >
                {Object.entries(stepModifier).map(([step, modifier]) => (
                    <Radio.Button value={step} key={step}>
                        {step} <span>{modifier}</span>
                    </Radio.Button>
                ))}
            </Radio.Group>
            <Statistic
                title={<p>Base salary</p>}
                value={
                    job && country && region && typeof calculatedLocationFactor === 'number'
                        ? formatCur(
                              sfBenchmark[job] * calculatedLocationFactor * levelModifier[level] * stepModifier[step]
                          )
                        : '--'
                }
            />
            {job && country && region && (
                <div>
                    <Tag>SF Benchmark: {formatCur(sfBenchmark[job])}</Tag> x{' '}
                    <Tag>Location factor: {calculatedLocationFactor}</Tag> x{' '}
                    <Tag>Level modifier: {levelModifier[level]}</Tag>x <Tag>Step modifier: {stepModifier[step]}</Tag>
                </div>
            )}
            <br />
        </div>
    )
}
