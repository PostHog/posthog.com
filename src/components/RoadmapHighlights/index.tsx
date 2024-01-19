import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import qs from 'qs'
import DateTable from 'components/DateTable'
import groupBy from 'lodash.groupby'

const query = (team?: string) =>
    qs.stringify(
        {
            sort: ['dateCompleted:desc'],
            populate: ['image', 'cta'],
            filters: {
                thingOfTheWeek: {
                    $eq: true,
                },
                ...(team
                    ? {
                          teams: {
                              name: {
                                  $eqi: team,
                              },
                          },
                      }
                    : null),
            },
        },
        { encodeValuesOnly: true }
    )

export default function RoadmapHighlights({ team }: { team?: string }) {
    const [changesByDate, setChangesByDate] = useState([])

    useEffect(() => {
        fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/roadmaps?${query(team)}`)
            .then((res) => res.json())
            .then(({ data }) => {
                const changes = data.map(
                    ({ attributes: { title, description, dateCompleted, image, category, cta } }) => ({
                        title,
                        description,
                        media: image,
                        date: dateCompleted,
                        label: category,
                        cta,
                    })
                )
                const changesByDate = groupBy(changes, (change) => {
                    const date = new Date(change.date)
                    return dayjs().month(date.getMonth()).year(date.getFullYear())
                })
                setChangesByDate(changesByDate)
            })
    }, [])

    return <DateTable dataByDate={changesByDate} />
}
