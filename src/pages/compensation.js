import React, { useState } from 'react'
import location_factor from './compensation_data/location_factor'
import sf_benchmark from './compensation_data/sf_benchmark'
import { Select, Statistic, Tag, Radio } from 'antd'
import unique from 'array-unique'
import level_modifier from './compensation_data/level_modifier'
import 'antd/lib/statistic/style/css'
import 'antd/lib/tag/style/css'
import 'antd/lib/radio/style/css'
import step_modifier from './compensation_data/step_modifier'

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

let levelToOptionsCash = (level) => level_modifier[level] >= 1 ? 40000 : 20000
let formatCur = (val) => formatter.format(val).replace('.00', '')

const CompensationPage = () => {
    const [job, setJob] = useState(localStorage.getItem('job'))
    const [country, setCountry] = useState(localStorage.getItem('country'))
    const [region, setRegion] = useState(localStorage.getItem('region'))
    const [level, setLevel] = useState(localStorage.getItem('level') || 'Senior')
    const [step, setStep] = useState(localStorage.getItem('step') || 'Thriving')
    const prevOptions = parseInt(localStorage.getItem('options'));
    const [options, setOptions] = useState(prevOptions > -1 ? prevOptions : levelToOptionsCash(level))
    const setItem = (type) => {
        return (value) => {
            if(type === 'job') setJob(value)
            if(type === 'country') { 
                setCountry(value)
                setItem('region')(false)
            }
            if(type === 'region') setRegion(value)
            if(type === 'level') {
                setLevel(value)
                setItem('options')(levelToOptionsCash(value))
            }
            if(type === 'step') setStep(value)
            if(type === 'options') setOptions(value)
            localStorage.setItem(type, value)
        }
    }
    const calculatedLocationFactor = country && region && region !== 'false' && location_factor.filter(location => location.country === country && location.area === region)[0].locationFactor;

    let countries = unique(location_factor.map(l => l.country))
    return (<div style={{fontSize: '0.85rem'}}>
        Select a role
        <Radio.Group
            style={{width: '100%', marginBottom: '0.75rem'}}
            value={job}
            buttonStyle="solid"
            onChange={e => setItem('job')(e.target.value)}
            >
            {Object.keys(sf_benchmark).map(job => <Radio.Button value={job} key={job}>{job}</Radio.Button>)}
        </Radio.Group>
        Country
        <Select
            showSearch
            style={{width: '100%', marginBottom: '0.75rem'}}
            value={country}
            onChange={setItem('country')}
            >
            {countries.map(country => <Select.Option value={country} key={country}>{country}</Select.Option>)}
        </Select>
        Region 
        <Select
            showSearch
            style={{width: '100%', marginBottom: '0.75rem'}}
            value={region}
            onChange={setItem('region')}
            >
            {location_factor.filter(location => location.country === country).map(region => <Select.Option value={region.area} key={region.area}>{region.area} <span>{region.locationFactor}</span></Select.Option>)}
        </Select>
        Level
        <Radio.Group
            style={{width: '100%', marginBottom: '0.75rem'}}
            value={level}
            buttonStyle="solid"
            onChange={e => setItem('level')(e.target.value)}
            >
            {Object.entries(level_modifier).map(([level, modifier]) => <Radio.Button value={level} key={level}>{level} <span>{modifier}</span></Radio.Button>)}
        </Radio.Group>
        Step
        <Radio.Group
            style={{width: '100%', marginBottom: '0.75rem'}}
            value={step}
            buttonStyle="solid"
            onChange={e => setItem('step')(e.target.value)}
            >
            {Object.entries(step_modifier).map(([step, modifier]) => <Radio.Button value={step} key={step}>{step} <span>{modifier}</span></Radio.Button>)}
        </Radio.Group>
        Options (based on seniority)
        <Radio.Group
            style={{width: '100%', marginBottom: '0.75rem'}}
            value={options > 0 ? levelToOptionsCash(level) : 0}
            buttonStyle="solid"
            onChange={e => setItem('options')(e.target.value)}
            >
                {level_modifier[level] >= 1 ?
                    <>
                        <Radio.Button value={40000}>Options + Cash (0.1% + $40k/year)</Radio.Button>
                        <Radio.Button value={0}>All options (0.5%)</Radio.Button>
                    </> :
                    <>
                        <Radio.Button value={20000}>Options + Cash (0.05% + $20k/year)</Radio.Button>
                        <Radio.Button value={0}>All options (0.25%)</Radio.Button>
                    </>
                }
        </Radio.Group>
        <Statistic title="Base salary" value={(job && country && region) ? formatCur(sf_benchmark[job] * calculatedLocationFactor * level_modifier[level] * step_modifier[step] + options) : '--'} />
        {job && country && region && <div>
            <Tag>SF Benchmark: {formatCur(sf_benchmark[job])}</Tag> x <Tag>Location factor: {calculatedLocationFactor}</Tag> x <Tag>Level modifier: {level_modifier[level]}</Tag>
            x <Tag>Step modifier: {step_modifier[step]}</Tag>
            x <Tag>Options: {formatCur(options)}</Tag>
        </div>}
        
    </div>)
}
export default CompensationPage