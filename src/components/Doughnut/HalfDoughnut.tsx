import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart, ArcElement, ChartData } from 'chart.js'

Chart.register(ArcElement)

interface Props {
    chartData: ChartData<'doughnut'>
    stats: number
}

const HalfDoughnut = ({ chartData, stats }: Props): JSX.Element => {
    return (
        <div className="relative h-[137px] flex justify-center">
            <Doughnut
                data={chartData}
                options={{
                    plugins: {
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            enabled: false,
                        },
                    },
                    rotation: -90,
                    circumference: 180,
                    cutout: '80%',
                    maintainAspectRatio: true,
                    responsive: true,
                }}
            />
            <div className="absolute text-center top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <h3 className="mb-0 text-4xl">{stats}%</h3>
            </div>
        </div>
    )
}

export default HalfDoughnut
