import { Avatar, Question } from 'components/Squeak'
import Button from 'components/Squeak/components/Button'
import RichText from 'components/Squeak/components/RichText'
import getAvatarURL from 'components/Squeak/util/getAvatar'
import transformValues from 'components/Squeak/util/transformValues'
import Toggle from 'components/Toggle'
import { useFormik } from 'formik'
import { useUser } from 'hooks/useUser'
import React, { useEffect, useState } from 'react'
import qs from 'qs'
import RoadmapSelect from 'components/RoadmapSelect'

type Update = {
    thingOfTheWeek: boolean
    roadmap: boolean
    roadmapID: number | null
    question: number
    team: number
}

export default function TeamUpdate({ teamName }: { teamName: string }) {
    const [teamID, setTeamID] = useState<number | null>(null)
    const [updates, setUpdates] = useState<Update[]>([])
    const { getJwt, user } = useUser()
    const { handleSubmit, values, setFieldValue, initialValues, submitForm, isSubmitting } = useFormik({
        validateOnMount: false,
        initialValues: {
            body: '',
            thingOfTheWeek: false,
            roadmap: false,
            roadmapID: null,
            images: [],
        },
        onSubmit: async ({ body, thingOfTheWeek, roadmap, roadmapID, images }) => {
            if (!teamID) return
            try {
                const jwt = await getJwt()
                const profileID = user?.profile?.id
                if (!profileID || !jwt) return
                const transformedValues = await transformValues({ body, images: images ?? [] }, profileID, jwt)
                const {
                    data: { id: questionID },
                } = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/questions`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwt}`,
                    },
                    body: JSON.stringify({
                        data: {
                            subject: '',
                            body: transformedValues?.body,
                            slugs: [],
                            permalink: '',
                        },
                    }),
                }).then((res) => res.json())

                await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/team-updates`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwt}`,
                    },
                    body: JSON.stringify({
                        data: {
                            thingOfTheWeek,
                            question: {
                                connect: [questionID],
                            },
                            team: {
                                connect: [teamID],
                            },
                            ...(roadmap && roadmapID
                                ? {
                                      roadmap: {
                                          connect: [roadmapID],
                                      },
                                  }
                                : null),
                        },
                    }),
                }).then((res) => res.json())

                setUpdates([{ thingOfTheWeek, question: questionID, team: teamID, roadmap, roadmapID }, ...updates])
            } catch (err) {
                console.error(err)
            }
        },
    })

    const fetchUpdates = async () => {
        const {
            data: [{ id: teamID }],
        } = await fetch(
            `${process.env.GATSBY_SQUEAK_API_HOST}/api/teams?${qs.stringify(
                {
                    filters: {
                        name: {
                            $eqi: teamName,
                        },
                    },
                },
                { encodeValuesOnly: true }
            )}`
        ).then((res) => res.json())
        setTeamID(teamID)
        const { data } = await fetch(
            `${process.env.GATSBY_SQUEAK_API_HOST}/api/team-updates?${qs.stringify(
                {
                    populate: ['question.id', 'roadmap.id', 'team.id'],
                    sort: ['createdAt:desc'],
                    filters: {
                        team: {
                            id: {
                                $eq: teamID,
                            },
                        },
                    },
                },
                { encodeValuesOnly: true }
            )}`
        ).then((res) => res.json())

        const updates = data?.map(({ attributes: { thingOfTheWeek, roadmap, question, team } }) => {
            return {
                thingOfTheWeek,
                roadmap: roadmap?.data?.id,
                question: question?.data.id,
                team: team?.data?.id,
            }
        })
        setUpdates(updates)
    }

    useEffect(() => {
        fetchUpdates()
    }, [])

    return (
        <div>
            {user?.role?.type === 'moderator' && user?.profile?.teams?.some(({ id }) => id === teamID) && (
                <form onSubmit={handleSubmit} className="m-0 mb-8 pb-8 border-b border-border dark:border-dark">
                    <Avatar className="w-[40px] mr-[10px]" image={getAvatarURL(user?.profile)} />
                    <div className="ml-[50px]">
                        <div className="bg-white dark:bg-accent-dark border border-light dark:border-dark rounded-md overflow-hidden mb-4">
                            <div className="leading-[0]">
                                <RichText
                                    onSubmit={submitForm}
                                    autoFocus
                                    setFieldValue={setFieldValue}
                                    initialValue={initialValues?.body}
                                    values={values}
                                />
                            </div>
                        </div>
                        <Toggle
                            checked={values.thingOfTheWeek}
                            onChange={(checked) => setFieldValue('thingOfTheWeek', checked)}
                            label="Thing of the week"
                        />
                        <div className="mt-4 mb-6">
                            <Toggle
                                checked={values.roadmap}
                                onChange={(checked) => setFieldValue('roadmap', checked)}
                                label="This is connected to a roadmap item"
                            />
                            {values.roadmap && teamID && (
                                <div className="border border-border dark:border-dark rounded-md mt-4">
                                    <RoadmapSelect
                                        teamID={teamID}
                                        onChange={(value) => setFieldValue('roadmapID', value)}
                                        value={values.roadmapID}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <span className="ml-[50px]">
                        <Button
                            loading={isSubmitting}
                            disabled={isSubmitting}
                            type="submit"
                            className="w-[calc(100%_-_50px)]"
                        >
                            Post update
                        </Button>
                    </span>
                </form>
            )}
            {updates?.length > 0 && (
                <div className="mb-8 pb-2 border-b border-border dark:border-dark">
                    <h3>Team updates</h3>
                    <ul className="m-0 p-0 list-none mb-6">
                        {updates.map(({ question }) => {
                            return (
                                <li key={question} className="py-4 first:pt-0">
                                    <Question showActions={false} buttonText="Reply" id={question} />
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )}
        </div>
    )
}
