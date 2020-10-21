import React, { useState, useEffect } from 'react'
import location_factor from '../pages-content/compensation_data/location_factor'
import sf_benchmark from '../pages-content/compensation_data/sf_benchmark'
import { Select, Statistic, Tag, Radio } from 'antd'
import unique from 'array-unique'
import level_modifier from '../pages-content/compensation_data/level_modifier'
import 'antd/lib/statistic/style/css'
import 'antd/lib/tag/style/css'
import 'antd/lib/radio/style/css'
import step_modifier from '../pages-content/compensation_data/step_modifier'

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
})

let formatCur = (val) => formatter.format(val).replace('.00', '')

const CompensationPage = () => {
    useEffect(() => {
        if (window) {
            setJob(localStorage.getItem('job'))
            setRegion(localStorage.getItem('region'))
            setLevel(localStorage.getItem('level'))
            setStep(localStorage.getItem('step'))
        }
    }, [])

    const [job, setJob] = useState()
    const [country, setCountry] = useState('United States')
    const [region, setRegion] = useState('San Francisco, California')
    const [level, setLevel] = useState('Senior')
    const [step, setStep] = useState('Thriving')

    const setItem = (type) => {
        return (value) => {
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
            localStorage.setItem(type, value)
        }
    }

    const calculatedLocationFactor =
        country &&
        region &&
        region !== 'false' &&
        location_factor.filter((location) => location.country === country && location.area === region)[0].locationFactor

    let countries = unique(location_factor.map((l) => l.country))
    return (
        <div style={{ fontSize: '0.85rem' }}>
            Select a role
            <Radio.Group
                style={{ width: '100%', marginBottom: '0.75rem' }}
                value={job}
                buttonStyle="solid"
                onChange={(e) => setItem('job')(e.target.value)}
            >
                {Object.keys(sf_benchmark).map((job) => (
                    <Radio.Button value={job} key={job}>
                        {job}
                    </Radio.Button>
                ))}
            </Radio.Group>
            Country
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
            Region
            <Select
                showSearch
                style={{ width: '100%', marginBottom: '0.75rem' }}
                value={region}
                onChange={setItem('region')}
            >
                {location_factor
                    .filter((location) => location.country === country)
                    .map((region) => (
                        <Select.Option value={region.area} key={region.area}>
                            {region.area} <span>{region.locationFactor}</span>
                        </Select.Option>
                    ))}
            </Select>
            Level
            <Radio.Group
                style={{ width: '100%', marginBottom: '0.75rem' }}
                value={level}
                buttonStyle="solid"
                onChange={(e) => setItem('level')(e.target.value)}
            >
                {Object.entries(level_modifier).map(([level, modifier]) => (
                    <Radio.Button value={level} key={level}>
                        {level} <span>{modifier}</span>
                    </Radio.Button>
                ))}
            </Radio.Group>
            Step
            <Radio.Group
                style={{ width: '100%', marginBottom: '0.75rem' }}
                value={step}
                buttonStyle="solid"
                onChange={(e) => setItem('step')(e.target.value)}
            >
                {Object.entries(step_modifier).map(([step, modifier]) => (
                    <Radio.Button value={step} key={step}>
                        {step} <span>{modifier}</span>
                    </Radio.Button>
                ))}
            </Radio.Group>
            <Statistic
                title="Base salary"
                value={
                    job && country && region
                        ? formatCur(
                              sf_benchmark[job] * calculatedLocationFactor * level_modifier[level] * step_modifier[step]
                          )
                        : '--'
                }
            />
            {job && country && region && (
                <div>
                    <Tag>SF Benchmark: {formatCur(sf_benchmark[job])}</Tag> x{' '}
                    <Tag>Location factor: {calculatedLocationFactor}</Tag> x{' '}
                    <Tag>Level modifier: {level_modifier[level]}</Tag>x <Tag>Step modifier: {step_modifier[step]}</Tag>
                </div>
            )}
        </div>
    )
}
export default CompensationPage
