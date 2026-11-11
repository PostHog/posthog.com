import React from 'react'
import { BarList, PieChart } from 'components/UI/Chart'

const browsers = [
    { key: 'chrome', label: 'Chrome', data: [6120] },
    { key: 'safari', label: 'Safari', data: [2480] },
    { key: 'firefox', label: 'Firefox', data: [910] },
    { key: 'edge', label: 'Edge', data: [640] },
]

export default function ChartShare(): JSX.Element {
    return (
        <div className="grid items-center gap-6 @xl:grid-cols-2">
            <PieChart className="h-56" series={browsers} />
            <BarList series={browsers} />
        </div>
    )
}
