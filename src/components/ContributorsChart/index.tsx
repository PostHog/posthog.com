import React, { useRef, useEffect } from 'react'
import Chart from 'chart.js'
import { useValues } from 'kea'
import { contributorStatsLogic } from './contributorStatsLogic'
import { Spacer } from 'components/Spacer'
import { Link } from 'gatsby'

export const ContributorsChart = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const { datasets, datasetsLoading } = useValues(contributorStatsLogic)

    const lineColorsList = [
        '#CCA6FF',
        '#BD8AFF',
        '#AC6CFF',
        '#9A4EFF',
        '#892FFF',
        '#7811FF',
        '#6900F2',
        '#5C00D4',
        '#4F00B5',
        '#420097',
        '#340079',
        '#DCC1FF',
        '#E3CDFF',
        '#D1AEFF',
        '#D8BBFF',
    ]

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current
            const context = canvas.getContext('2d')
            if (context && datasets.length > 0) {
                const datasetList = []
                let i = 0
                for (const set of datasets) {
                    if (i === lineColorsList.length) {
                        break
                    }
                    datasetList.push({
                        label: set.breakdown_value,
                        data: set.data,
                        fill: false,
                        showLine: true,
                        backgroundColor: lineColorsList[i],
                        borderColor: lineColorsList[i],
                        borderWidth: 1,
                    })
                    ++i
                }

                const labels = datasets[0].labels.map((label: string) => {
                    const splitLabel = label.split(' ')
                    return splitLabel[splitLabel.length - 1]
                })

                new Chart(context, {
                    type: 'line',

                    data: {
                        labels: labels,
                        datasets: datasetList,
                    },
                    options: {
                        responsive: true,
                        title: {
                            display: false,
                            text: 'Top 15 PostHog Contributors',
                            fontColor: '#dedede',
                            fontSize: 18,
                        },
                        tooltips: {
                            mode: 'index',
                            intersect: false,
                        },
                        hover: {
                            mode: 'nearest',
                            intersect: true,
                        },
                        scales: {
                            xAxes: [
                                {
                                    display: true,
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Month',
                                    },
                                },
                            ],
                            yAxes: [
                                {
                                    display: true,
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Value',
                                    },
                                },
                            ],
                        },
                    },
                })
            }
        }
    }, [datasets])

    return (
        <>
            {datasetsLoading ? (
                <Spacer height={800} />
            ) : (
                <>
                    <h5 style={{ margin: 0, color: '#efefef' }}>Top 15 PostHog Contributors</h5>
                    <Link to="/docs/contribute/recognizing-contributions">
                        <small style={{ color: '#dedede' }}>
                            ⚠️ Only displaying contributions from after 29/03/2021
                        </small>
                    </Link>
                    <Spacer height={10} />
                    <canvas ref={canvasRef} style={{ maxWidth: 1000, maxHeight: 800 }} className="center centered" />
                </>
            )}
        </>
    )
}
