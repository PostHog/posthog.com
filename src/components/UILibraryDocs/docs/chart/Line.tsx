import React from 'react'
import { LineChart } from 'components/UI/Chart'

const weeks = ['Sep 1', 'Sep 8', 'Sep 15', 'Sep 22', 'Sep 29', 'Oct 6', 'Oct 13', 'Oct 20']

const series = [
    { key: 'signups', label: 'Signups', data: [320, 410, 380, 520, 610, 590, 720, 810] },
    { key: 'activated', label: 'Activated', data: [140, 190, 170, 260, 300, 310, 390, 450] },
]

export default function ChartLine(): JSX.Element {
    return <LineChart className="h-64" labels={weeks} series={series} />
}
