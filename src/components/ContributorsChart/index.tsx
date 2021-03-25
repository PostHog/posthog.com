import React, { useRef, useEffect } from 'react'
import Chart from 'chart.js'
import { useValues } from 'kea'
import { contributorStatsLogic } from './contributorStatsLogic'

export const ContributorsChart = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const { datasets } = useValues(contributorStatsLogic)

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
                            display: true,
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

    return <canvas ref={canvasRef} style={{ maxWidth: 1000, maxHeight: 800 }} className="center centered" />
}

//https://app.posthog.com/shared_dashboard/zNJCq1F_hNWClJknv2csag2I9XypOQ
