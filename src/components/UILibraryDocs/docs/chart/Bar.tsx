import React from 'react'
import { BarChart } from 'components/UI/Chart'

const products = ['Analytics', 'Replay', 'Flags', 'Tests', 'Surveys']

const series = [{ key: 'teams', label: 'Teams', data: [9200, 6100, 4800, 2300, 1900] }]

export default function ChartBar(): JSX.Element {
    return <BarChart className="h-64" labels={products} series={series} />
}
